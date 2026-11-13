/**
 * Multi-layer spam detection system
 */

const MIN_SUBMISSION_TIME = 5000;
const MAX_SUBMISSION_TIME = 30 * 60 * 1000;

const SPAM_PATTERNS = [
  /\b(viagra|cialis|casino|lottery|winner|congratulations)\b/i,
  /\b(click here|act now|limited time|free money)\b/i,
  /(http|https):\/\/[^\s]+/g,
  /(.)\1{4,}/g,
  /[A-Z]{10,}/g,
];

const SUSPICIOUS_EMAIL_PATTERNS = [
  /^test@/i,
  /^admin@/i,
  /\.ru$/i,
  /\.cn$/i,
  /tempmail/i,
  /throwaway/i,
  /mailinator/i,
  /guerrillamail/i,
  /10minutemail/i,
];

export interface SpamCheckResult {
  isSpam: boolean;
  score: number;
  reasons: string[];
}

export function validateFormTiming(
  token: string | undefined,
  timestamp: number | undefined
): { valid: boolean; reason?: string } {
  if (!token || !timestamp) {
    return { valid: false, reason: "Missing security token" };
  }

  const now = Date.now();
  const elapsed = now - timestamp;

  if (elapsed < MIN_SUBMISSION_TIME) {
    return { valid: false, reason: "Form submitted too quickly" };
  }

  if (elapsed > MAX_SUBMISSION_TIME) {
    return { valid: false, reason: "Form session expired" };
  }

  return { valid: true };
}

export function validateHoneypot(honeypotValue: string | undefined): boolean {
  return !honeypotValue || honeypotValue.trim() === "";
}

function analyzeContent(text: string): { score: number; reasons: string[] } {
  if (!text) return { score: 0, reasons: [] };

  let score = 0;
  const reasons: string[] = [];

  for (const pattern of SPAM_PATTERNS) {
    if (pattern.test(text)) {
      score += 20;
      reasons.push("Suspicious content pattern detected");
      break;
    }
  }

  const specialCharRatio = (text.match(/[^a-zA-Z0-9\s]/g) || []).length / text.length;
  if (specialCharRatio > 0.3) {
    score += 15;
    reasons.push("Unusual character ratio");
  }

  if (text.length < 3) {
    score += 10;
    reasons.push("Content too short");
  }

  return { score, reasons };
}

function analyzeEmail(email: string): { score: number; reasons: string[] } {
  let score = 0;
  const reasons: string[] = [];

  for (const pattern of SUSPICIOUS_EMAIL_PATTERNS) {
    if (pattern.test(email)) {
      score += 25;
      reasons.push("Suspicious email domain");
      break;
    }
  }

  const localPart = email.split("@")[0];
  if (localPart && /^[a-z0-9]{15,}$/i.test(localPart)) {
    score += 15;
    reasons.push("Possibly auto-generated email");
  }

  return { score, reasons };
}

export function performSpamCheck(data: {
  name: string;
  email: string;
  message?: string;
}): SpamCheckResult {
  let totalScore = 0;
  const allReasons: string[] = [];

  const nameCheck = analyzeContent(data.name);
  totalScore += nameCheck.score;
  allReasons.push(...nameCheck.reasons);

  const emailCheck = analyzeEmail(data.email);
  totalScore += emailCheck.score;
  allReasons.push(...emailCheck.reasons);

  if (data.message) {
    const messageCheck = analyzeContent(data.message);
    totalScore += messageCheck.score;
    allReasons.push(...messageCheck.reasons);
  }

  totalScore = Math.min(100, totalScore);

  return {
    isSpam: totalScore >= 50,
    score: totalScore,
    reasons: [...new Set(allReasons)],
  };
}

export function sanitizeInput(input: string): string {
  if (!input) return "";

  return input
    .trim()
    .replace(/\0/g, "")
    .replace(/[\x00-\x09\x0B\x0C\x0E-\x1F\x7F]/g, "")
    .replace(/\s+/g, " ")
    .slice(0, 5000);
}

export function sanitizeFormData<T extends object>(data: T): T {
  const sanitized = { ...data } as Record<string, unknown>;

  for (const key of Object.keys(sanitized)) {
    const value = sanitized[key];
    if (typeof value === "string") {
      sanitized[key] = sanitizeInput(value);
    }
  }

  return sanitized as T;
}
