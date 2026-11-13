"use server";

import { headers } from "next/headers";
import { type ContactFormData, contactSchema } from "@/lib/validations/contact";
import {
  checkRateLimit,
  getRateLimitKey,
  RATE_LIMITS,
} from "@/lib/security/rate-limiter";
import {
  validateHoneypot,
  validateFormTiming,
  performSpamCheck,
  sanitizeFormData,
} from "@/lib/security/spam-detection";
import { siteConfig } from "@/lib/site";

const TURNSTILE_SITEVERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const EXTERNAL_REQUEST_TIMEOUT_MS = 10_000;

export interface ContactSubmission extends ContactFormData {
  _honeypot?: string;
  _formToken?: string;
  _timestamp?: number;
  _turnstileToken?: string;
}

export interface ContactDeliveryPayload {
  subject: string;
  from_name: string;
  name: string;
  email: string;
  phone: string;
  services: string;
  message: string;
  submitted_at: string;
}

export type ContactErrorCode =
  | "CONTACT_CONFIG_ERROR"
  | "CONTACT_DELIVERY_READY"
  | "CONTACT_RATE_LIMITED"
  | "CONTACT_SECURITY_ERROR"
  | "CONTACT_SPAM_REJECTED"
  | "CONTACT_TIMING_ERROR"
  | "CONTACT_VALIDATION_ERROR";

export type ContactResponse =
  | {
      success: true;
      message: string;
      code: "CONTACT_DELIVERY_READY";
      payload: ContactDeliveryPayload;
      web3formsFormId?: string;
    }
  | {
      success: false;
      message: string;
      code: Exclude<ContactErrorCode, "CONTACT_DELIVERY_READY">;
    };

interface TurnstileVerifyResult {
  success: boolean;
  "error-codes"?: string[];
  challenge_ts?: string;
  hostname?: string;
  action?: string;
  cdata?: string;
}

async function getClientIP(): Promise<string> {
  const headersList = await headers();
  const forwardedFor = headersList.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  const realIP = headersList.get("x-real-ip");
  if (realIP) return realIP;
  const cfConnectingIP = headersList.get("cf-connecting-ip");
  if (cfConnectingIP) return cfConnectingIP;
  return "unknown";
}

function logSecurityEvent(event: string, details: Record<string, unknown>): void {
  console.warn(`[SECURITY] ${event}:`, {
    ...details,
    timestamp: new Date().toISOString(),
  });
}

async function fetchWithTimeout(
  url: string,
  init: RequestInit,
  timeoutMs = EXTERNAL_REQUEST_TIMEOUT_MS
): Promise<Response> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetch(url, {
      ...init,
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeout);
  }
}

async function verifyTurnstileToken(
  token: string | undefined,
  clientIP: string
): Promise<{ valid: boolean; code?: string }> {
  if (!token) {
    return { valid: false, code: "missing-token" };
  }

  if (!process.env.TURNSTILE_SECRET_KEY) {
    console.error("TURNSTILE_SECRET_KEY not configured");
    return { valid: false, code: "missing-secret" };
  }

  try {
    const response = await fetchWithTimeout(TURNSTILE_SITEVERIFY_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        secret: process.env.TURNSTILE_SECRET_KEY,
        response: token,
        remoteip: clientIP,
      }),
    });

    if (!response.ok) {
      console.error("Turnstile verification request failed", {
        status: response.status,
        statusText: response.statusText,
      });
      return { valid: false, code: `request-failed-${response.status}` };
    }

    const result = (await response.json()) as TurnstileVerifyResult;
    if (!result.success) {
      const code = result["error-codes"]?.join(",") || "verification-failed";
      console.warn("Turnstile verification failed", {
        code,
        hostname: result.hostname,
        action: result.action,
      });
      return {
        valid: false,
        code,
      };
    }

    console.info("Turnstile verification passed", {
      hostname: result.hostname,
      action: result.action,
    });

    return { valid: true };
  } catch (error) {
    const code = error instanceof DOMException && error.name === "AbortError"
      ? "request-timeout"
      : "request-error";

    console.error("Turnstile verification request error", {
      code,
      error: error instanceof Error ? error.message : "Unknown",
    });

    return { valid: false, code };
  }
}

export async function validateContactSubmission(
  rawData: ContactSubmission
): Promise<ContactResponse> {
  const clientIP = await getClientIP();

  try {
    // Layer 1: Honeypot
    if (!validateHoneypot(rawData._honeypot)) {
      logSecurityEvent("HONEYPOT_TRIGGERED", { ip: clientIP });
      return {
        success: false,
        message: "Your message could not be sent. Please call dispatch.",
        code: "CONTACT_SPAM_REJECTED",
      };
    }

    // Layer 2: Timing
    const timingResult = validateFormTiming(rawData._formToken, rawData._timestamp);
    if (!timingResult.valid) {
      logSecurityEvent("TIMING_VIOLATION", { ip: clientIP, reason: timingResult.reason });
      return {
        success: false,
        message: timingResult.reason || "Please try again",
        code: "CONTACT_TIMING_ERROR",
      };
    }

    // Layer 3: Rate limit by IP
    const ipRateLimit = checkRateLimit(
      getRateLimitKey("contact_ip", clientIP),
      RATE_LIMITS.contact
    );
    if (!ipRateLimit.allowed) {
      logSecurityEvent("RATE_LIMIT_IP", {
        ip: clientIP,
        retryAfter: ipRateLimit.retryAfter,
      });
      return {
        success: false,
        message: `Too many requests. Please wait ${Math.ceil((ipRateLimit.retryAfter || 60) / 60)} minutes.`,
        code: "CONTACT_RATE_LIMITED",
      };
    }

    // Layer 4: Zod validation
    const parseResult = contactSchema.safeParse({
      name: rawData.name,
      email: rawData.email,
      phone: rawData.phone,
      message: rawData.message,
      services: rawData.services,
    });
    if (!parseResult.success) {
      return {
        success: false,
        message: parseResult.error.issues[0]?.message ?? "Please check your inputs and try again.",
        code: "CONTACT_VALIDATION_ERROR",
      };
    }

    // Layer 5: Sanitize
    const data = sanitizeFormData(rawData);

    // Layer 6: Rate limit by email
    const emailRateLimit = checkRateLimit(
      getRateLimitKey("contact_email", data.email.toLowerCase()),
      RATE_LIMITS.contactByEmail
    );
    if (!emailRateLimit.allowed) {
      const maskedEmail = data.email.replace(/(.{2})(.*)(@.*)/, "$1***$3");
      logSecurityEvent("RATE_LIMIT_EMAIL", { ip: clientIP, email: maskedEmail });
      return {
        success: false,
        message: "A message was recently sent from this email. Please wait or call us directly.",
        code: "CONTACT_RATE_LIMITED",
      };
    }

    // Layer 7: Spam check
    const spamCheck = performSpamCheck({
      name: data.name,
      email: data.email,
      message: data.message,
    });
    if (spamCheck.isSpam) {
      logSecurityEvent("SPAM_DETECTED", {
        ip: clientIP,
        score: spamCheck.score,
        reasons: spamCheck.reasons,
      });
      checkRateLimit(getRateLimitKey("suspicious", clientIP), RATE_LIMITS.suspicious);
      return {
        success: false,
        message: `Your message could not be sent. Please call us directly at ${siteConfig.phone.display}.`,
        code: "CONTACT_SPAM_REJECTED",
      };
    }

    // Layer 8: Turnstile verification
    const turnstileResult = await verifyTurnstileToken(rawData._turnstileToken, clientIP);
    if (!turnstileResult.valid) {
      logSecurityEvent("TURNSTILE_FAILED", { ip: clientIP, code: turnstileResult.code });
      return {
        success: false,
        message: `Security verification failed. Please refresh and try again, or call ${siteConfig.phone.display}.`,
        code: "CONTACT_SECURITY_ERROR",
      };
    }

    const web3formsFormId =
      process.env.WEB3FORMS_ACCESS_KEY || process.env.NEXT_PUBLIC_WEB3FORMS_FORM_ID;

    if (!web3formsFormId) {
      console.error("Web3Forms form ID not configured");
      return {
        success: false,
        message: `Contact form delivery is not configured. Please call ${siteConfig.phone.display}.`,
        code: "CONTACT_CONFIG_ERROR",
      };
    }

    const submittedAt = new Date().toLocaleString("en-CA", {
      timeZone: "America/Edmonton",
      dateStyle: "full",
      timeStyle: "short",
    });

    return {
      success: true,
      message: "Contact security checks passed.",
      code: "CONTACT_DELIVERY_READY",
      web3formsFormId,
      payload: {
        subject: `New Security Inquiry - ${data.name}`,
        from_name: "Cliffs Security Website",
        name: data.name,
        email: data.email,
        phone: data.phone,
        services: data.services?.join(", ") || "None specified",
        message: data.message,
        submitted_at: submittedAt,
      },
    };
  } catch (error) {
    console.error("Contact submission error:", error);
    logSecurityEvent("SUBMISSION_ERROR", {
      ip: clientIP,
      error: error instanceof Error ? error.message : "Unknown",
    });
    return {
      success: false,
      message: `Contact form validation failed unexpectedly. Please call ${siteConfig.phone.display}.`,
      code: "CONTACT_SECURITY_ERROR",
    };
  }
}
