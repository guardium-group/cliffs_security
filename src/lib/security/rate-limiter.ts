/**
 * In-memory rate limiter with sliding window algorithm
 * For production with multiple servers, replace with Redis-based solution
 */

interface RateLimitEntry {
  count: number;
  firstRequest: number;
  lastRequest: number;
}

interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

const CLEANUP_INTERVAL = 5 * 60 * 1000;
let lastCleanup = Date.now();

function cleanup(windowMs: number): void {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL) return;

  lastCleanup = now;
  const cutoff = now - windowMs;

  for (const [key, entry] of rateLimitStore.entries()) {
    if (entry.lastRequest < cutoff) {
      rateLimitStore.delete(key);
    }
  }
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetIn: number;
  retryAfter?: number;
}

export function checkRateLimit(
  identifier: string,
  config: RateLimitConfig
): RateLimitResult {
  const now = Date.now();
  cleanup(config.windowMs);

  const entry = rateLimitStore.get(identifier);

  if (!entry) {
    rateLimitStore.set(identifier, {
      count: 1,
      firstRequest: now,
      lastRequest: now,
    });

    return {
      allowed: true,
      remaining: config.maxRequests - 1,
      resetIn: config.windowMs,
    };
  }

  const windowStart = now - config.windowMs;

  if (entry.firstRequest < windowStart) {
    rateLimitStore.set(identifier, {
      count: 1,
      firstRequest: now,
      lastRequest: now,
    });

    return {
      allowed: true,
      remaining: config.maxRequests - 1,
      resetIn: config.windowMs,
    };
  }

  if (entry.count >= config.maxRequests) {
    const resetIn = entry.firstRequest + config.windowMs - now;
    return {
      allowed: false,
      remaining: 0,
      resetIn,
      retryAfter: Math.ceil(resetIn / 1000),
    };
  }

  entry.count++;
  entry.lastRequest = now;
  rateLimitStore.set(identifier, entry);

  return {
    allowed: true,
    remaining: config.maxRequests - entry.count,
    resetIn: entry.firstRequest + config.windowMs - now,
  };
}

export const RATE_LIMITS = {
  contact: {
    windowMs: 15 * 60 * 1000,
    maxRequests: 5,
  },
  contactByEmail: {
    windowMs: 60 * 60 * 1000,
    maxRequests: 3,
  },
  suspicious: {
    windowMs: 30 * 60 * 1000,
    maxRequests: 1,
  },
} as const;

export function getRateLimitKey(type: string, identifier: string): string {
  return `${type}:${identifier}`;
}
