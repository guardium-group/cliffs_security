"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { Variants } from "framer-motion";
import { motion } from "framer-motion";
import {
  AlertCircle,
  CheckCircle,
  Clock,
  Loader2,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { Button } from "@/components/ui/button";
import {
  validateContactSubmission,
  type ContactDeliveryPayload,
  type ContactSubmission,
} from "@/lib/actions/contact";
import { serviceOptions } from "@/lib/validations/contact";
import { siteConfig } from "@/lib/site";
import { trackEvent } from "@/lib/analytics";

const WEB3FORMS_SUBMIT_URL = "https://api.web3forms.com/submit";
const DELIVERY_TIMEOUT_MS = 10_000;

type ContactDeliveryResult =
  | { success: true; message: string }
  | { success: false; message: string };

interface Web3FormsResponse {
  success?: boolean;
  message?: string;
  error?: string;
  statusCode?: number;
  body?: {
    message?: string;
  };
}

function generateFormToken(): { token: string; timestamp: number } {
  const timestamp = Date.now();
  const token = btoa(`${timestamp}:${Math.random().toString(36)}`);
  return { token, timestamp };
}

function getWeb3FormsMessage(result: Web3FormsResponse | null): string {
  return result?.message || result?.body?.message || result?.error || "";
}

function formatDeliveryError(
  code: string,
  message: string,
  providerMessage?: string
): string {
  const detail = providerMessage ? ` Provider response: ${providerMessage}` : "";
  return `${message}${detail} Please call ${siteConfig.phone.display}. (${code})`;
}

async function submitToWeb3Forms(
  payload: ContactDeliveryPayload,
  fallbackFormId?: string
): Promise<ContactDeliveryResult> {
  const configuredFormId = process.env.NEXT_PUBLIC_WEB3FORMS_FORM_ID?.trim();
  const formId = configuredFormId || fallbackFormId?.trim();

  if (!formId) {
    return {
      success: false,
      message: formatDeliveryError(
        "CONTACT_CONFIG_ERROR",
        "Contact form is missing its delivery configuration."
      ),
    };
  }

  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), DELIVERY_TIMEOUT_MS);

  try {
    const response = await fetch(WEB3FORMS_SUBMIT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ access_key: formId, ...payload }),
      signal: controller.signal,
    });

    let result: Web3FormsResponse | null = null;
    try {
      result = (await response.json()) as Web3FormsResponse;
    } catch {
      result = null;
    }

    if (response.ok && result?.success !== false) {
      return {
        success: true,
        message: "Message sent successfully. We'll get back to you as soon as possible.",
      };
    }

    const providerMessage = getWeb3FormsMessage(result);

    if (response.status === 429) {
      return {
        success: false,
        message: formatDeliveryError(
          "CONTACT_RATE_LIMITED",
          "Too many form attempts.",
          providerMessage
        ),
      };
    }

    if (response.status >= 500) {
      return {
        success: false,
        message: formatDeliveryError(
          "CONTACT_DELIVERY_UNAVAILABLE",
          "The message provider is temporarily unavailable.",
          providerMessage
        ),
      };
    }

    return {
      success: false,
      message: formatDeliveryError(
        "CONTACT_DELIVERY_REJECTED",
        "The message provider rejected the request.",
        providerMessage
      ),
    };
  } catch (error) {
    const code = error instanceof DOMException && error.name === "AbortError"
      ? "CONTACT_DELIVERY_TIMEOUT"
      : "CONTACT_DELIVERY_UNAVAILABLE";

    return {
      success: false,
      message: formatDeliveryError(
        code,
        "The message provider could not be reached."
      ),
    };
  } finally {
    window.clearTimeout(timeout);
  }
}

function withErrorCode(message: string, code: string): string {
  return message.includes(`(${code})`) ? message : `${message} (${code})`;
}

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const contactCards = [
  {
    icon: Phone,
    title: "Call dispatch",
    description: "Immediate security dispatch, 24/7",
    action: siteConfig.phone.display,
    href: siteConfig.phone.href,
  },
  {
    icon: Mail,
    title: "Email dispatch",
    description: "For service requests and follow-up",
    action: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
  },
  {
    icon: MapPin,
    title: "Head office",
    description: "Edmonton, Alberta",
    action: "Get directions",
    href: siteConfig.address.mapUrl,
  },
  {
    icon: Clock,
    title: "Hours",
    description: "Emergency dispatch never closes",
    action: "24/7 - 365 days",
    href: null,
  },
];

export function ContactPageContent() {
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    services: [] as string[],
  });
  // The token is never rendered, so generating it in the initializer is hydration-safe.
  const [initialToken] = useState(() => generateFormToken());
  const [formToken, setFormToken] = useState(initialToken.token);
  const [formTimestamp, setFormTimestamp] = useState(initialToken.timestamp);
  const [honeypot, setHoneypot] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const turnstileRef = useRef<TurnstileInstance | null>(null);
  const pendingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pendingSubmit, setPendingSubmit] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const clearPendingTimer = () => {
    if (pendingTimerRef.current) {
      clearTimeout(pendingTimerRef.current);
      pendingTimerRef.current = null;
    }
  };

  const resetTurnstile = () => {
    setTurnstileToken(null);
    turnstileRef.current?.reset();
  };

  const resetFormToken = () => {
    const { token, timestamp } = generateFormToken();
    setFormToken(token);
    setFormTimestamp(timestamp);
  };

  const abortPendingVerification = (message: string) => {
    clearPendingTimer();
    setPendingSubmit(false);
    setIsSubmitting(false);
    resetTurnstile();
    setSubmitStatus({ type: "error", message });
  };

  useEffect(() => () => {
    clearPendingTimer();
  }, []);

  const performSubmit = async (token: string) => {
    clearPendingTimer();
    setPendingSubmit(false);
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });
    try {
      const submission: ContactSubmission = {
        ...formData,
        _honeypot: honeypot,
        _formToken: formToken,
        _timestamp: formTimestamp,
        _turnstileToken: token,
      };
      const preflight = await validateContactSubmission(submission);

      if (!preflight.success) {
        resetTurnstile();
        setSubmitStatus({
          type: "error",
          message: withErrorCode(preflight.message, preflight.code),
        });
        return;
      }

      const delivery = await submitToWeb3Forms(
        preflight.payload,
        preflight.web3formsFormId
      );

      if (delivery.success) {
        trackEvent("generate_lead", {
          form: "contact",
          services: formData.services.join(", ") || undefined,
        });
        setSubmitStatus({ type: "success", message: delivery.message });
        setFormData({ name: "", email: "", phone: "", message: "", services: [] });
        setHoneypot("");
        resetTurnstile();
        resetFormToken();
      } else {
        resetTurnstile();
        setSubmitStatus({ type: "error", message: delivery.message });
      }
    } catch {
      resetTurnstile();
      setSubmitStatus({
        type: "error",
        message: `Something went wrong. Please try again or call ${siteConfig.phone.display}.`,
      });
    } finally {
      clearPendingTimer();
      setPendingSubmit(false);
      setIsSubmitting(false);
    }
  };

  // When Turnstile resolves after a pending submit, fire automatically
  useEffect(() => {
    if (pendingSubmit && turnstileToken) {
      if (pendingTimerRef.current) {
        clearTimeout(pendingTimerRef.current);
        pendingTimerRef.current = null;
      }
      // Run the submit from a callback rather than the effect body; performSubmit
      // clears pendingSubmit itself.
      const submitTimer = setTimeout(() => void performSubmit(turnstileToken), 0);
      return () => clearTimeout(submitTimer);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pendingSubmit, turnstileToken]);

  const handleServiceToggle = (service: string) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!turnstileSiteKey) {
      setSubmitStatus({
        type: "error",
        message: `Security verification is unavailable. Please call ${siteConfig.phone.display}.`,
      });
      return;
    }

    if (turnstileToken) {
      void performSubmit(turnstileToken);
    } else {
      // Token not yet ready, so wait for Turnstile to resolve.
      clearPendingTimer();
      setIsSubmitting(true);
      setPendingSubmit(true);
      pendingTimerRef.current = setTimeout(() => {
        abortPendingVerification(
          `Verification timed out. Please try again or call ${siteConfig.phone.display}.`
        );
      }, 15000);
    }
  };

  const inputClass =
    "w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all text-brand-ink placeholder:text-gray-400 text-base outline-none";

  return (
    <>
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="container mx-auto px-5 sm:px-6 max-w-7xl">
          <motion.div
            className="max-w-7xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div className="grid lg:grid-cols-2 gap-6 sm:gap-12">
              <div className="bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 shadow-sm order-2 lg:order-1">
                <h2 className="text-2xl sm:text-3xl font-bold text-brand-ink tracking-tight mb-2">
                  Request a Free Quote
                </h2>
                <p className="text-gray-500 text-sm mb-6">
                  Fill out the form below and we&apos;ll get back to you as
                  soon as possible. For immediate security assistance, call{" "}
                  {siteConfig.phone.display}.
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <input
                    type="text"
                    name="_honey"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    className="absolute -left-[9999px] opacity-0"
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-brand-ink mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                      className={inputClass}
                      placeholder="Your full name"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-brand-ink mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                        className={inputClass}
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-brand-ink mb-2">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))}
                        className={inputClass}
                        placeholder={siteConfig.phone.display}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-brand-ink mb-3">
                      Service Needed
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-2.5 gap-y-1">
                      {serviceOptions.map((service) => (
                        <label
                          key={service}
                          onClick={() => handleServiceToggle(service)}
                          className="flex items-center gap-2 cursor-pointer group min-h-11 px-2 -mx-2 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <div
                            className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all flex-shrink-0 ${
                              formData.services.includes(service)
                                ? "bg-primary border-primary"
                                : "border-gray-300 group-hover:border-primary/50"
                            }`}
                          >
                            {formData.services.includes(service) && (
                              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>
                          <span className="text-sm text-gray-700">{service}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-brand-ink mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
                      rows={4}
                      className={`${inputClass} resize-none`}
                      placeholder="Tell us about your site or event: address, hours you need covered, and any concerns."
                      required
                    />
                  </div>

                  {submitStatus.type && (
                    <div
                      className={`flex items-start gap-2 p-4 rounded-lg ${
                        submitStatus.type === "success"
                          ? "bg-brand-success/10 text-brand-success"
                          : "bg-red-50 text-red-700"
                      }`}
                    >
                      {submitStatus.type === "success" ? (
                        <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                      ) : (
                        <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                      )}
                      <span className="text-sm">{submitStatus.message}</span>
                    </div>
                  )}

                  {turnstileSiteKey ? (
                    <Turnstile
                      ref={turnstileRef}
                      siteKey={turnstileSiteKey}
                      onSuccess={setTurnstileToken}
                      onExpire={() => setTurnstileToken(null)}
                      onError={() =>
                        abortPendingVerification(
                          `Security verification failed. Please refresh the page and try again, or call us directly at ${siteConfig.phone.display}.`
                        )
                      }
                      onTimeout={() =>
                        abortPendingVerification(
                          `Verification timed out. Please try again or call ${siteConfig.phone.display}.`
                        )
                      }
                      options={{ execution: "render", size: "normal", refreshExpired: "auto" }}
                    />
                  ) : (
                    <div className="flex items-start gap-2 p-4 rounded-lg bg-red-50 text-red-700">
                      <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">
                        Security verification is unavailable. Please call {siteConfig.phone.display}.
                      </span>
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-lg py-3 text-base"
                    size="lg"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </Button>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    We use these details to respond to your request and provide the service you ask
                    for. Some of the providers that deliver and store messages are outside Canada.
                    Questions about your information? Contact our Operations Manager at{" "}
                    {siteConfig.email}. See our{" "}
                    <Link href="/privacy-policy" className="text-brand-link underline underline-offset-2 hover:no-underline">
                      Privacy Policy
                    </Link>
                    .
                  </p>
                </form>
              </div>

              <div className="bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-sm h-64 sm:h-80 lg:h-auto lg:min-h-[500px] order-1 lg:order-2">
                <iframe
                  src={`https://www.google.com/maps?q=${encodeURIComponent(siteConfig.address.display)}&output=embed`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Cliffs Security head office in Edmonton, AB"
                  className="w-full h-full"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-white">
        <div className="container mx-auto px-5 sm:px-6 max-w-7xl">
          <motion.div
            className="max-w-7xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {contactCards.map((card) => (
                <div
                  key={card.title}
                  className="bg-gray-50 rounded-xl sm:rounded-2xl p-5 sm:p-6 text-center"
                >
                  <div className="w-11 h-11 bg-red-50 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <card.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-base font-semibold text-brand-ink mb-1">
                    {card.title}
                  </h3>
                  <p className="text-xs text-gray-500 mb-3">{card.description}</p>
                  {card.href ? (
                    <a
                      href={card.href}
                      target={card.href.startsWith("http") ? "_blank" : undefined}
                      rel={card.href.startsWith("http") ? "noreferrer" : undefined}
                      className="inline-block px-4 py-2.5 border border-primary text-primary rounded-lg text-xs font-medium hover:bg-red-50 transition-colors break-words"
                    >
                      {card.action}
                    </a>
                  ) : (
                    <span className="inline-block px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg text-xs font-medium">
                      {card.action}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
