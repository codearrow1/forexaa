/**
 * Rate-limiting abstraction.
 *
 * Phase 1 defines the interface and an in-memory implementation for local
 * development. Phase 5 adds a production-compatible interface that supports
 * Redis, Upstash, or any shared KV store.
 *
 * Anti-automation baseline: per-IP keying, generous defaults for marketing
 * pages, strict defaults for PII-bearing forms.
 */

export interface RateLimitResult {
  readonly allowed: boolean;
  readonly limit: number;
  readonly remaining: number;
  readonly resetAt: Date;
}

export interface RateLimiter {
  /**
   * @param key stable, low-cardinality key (e.g. hashed IP bucket).
   * @param limit max requests in the window.
   * @param windowMs sliding-window size.
   */
  consume(key: string, limit: number, windowMs: number): Promise<RateLimitResult>;
}

export class InMemoryRateLimiter implements RateLimiter {
  private readonly hits = new Map<string, number[]>();

  constructor(private readonly now: () => number = Date.now) {}

  async consume(
    key: string,
    limit: number,
    windowMs: number,
  ): Promise<RateLimitResult> {
    const timestamp = this.now();
    const windowStart = timestamp - windowMs;

    const recent = (this.hits.get(key) ?? []).filter((t) => t > windowStart);
    const allowed = recent.length < limit;
    if (allowed) recent.push(timestamp);
    this.hits.set(key, recent);

    const oldest = recent[0];
    const resetAt =
      oldest !== undefined ? new Date(oldest + windowMs) : new Date(timestamp);

    return {
      allowed,
      limit,
      remaining: Math.max(0, limit - recent.length),
      resetAt,
    };
  }
}

/**
 * A pluggable, vendor-agnostic shared backend for multi-instance rate
 * limiting. A concrete vendor integration (Redis, Upstash, edge KV, ...)
 * implements this interface and registers itself at startup via
 * registerRateLimitBackend(). No specific vendor is hard-coded here.
 */
export interface RateLimitBackend {
  /**
   * Record one hit for `key` within a sliding `windowMs` and report the
   * hit count before this one (`previous`), plus when the window resets.
   * Implementations manage their own pruning / TTL.
   */
  record(
    key: string,
    windowMs: number,
  ): Promise<{ previous: number; current: number; resetAt: Date }>;
}

let registeredBackend: RateLimitBackend | null = null;

/** Register a shared rate-limit backend (called by a vendor wiring module). */
export function registerRateLimitBackend(backend: RateLimitBackend): void {
  registeredBackend = backend;
}

/**
 * A Redis-REST shared backend (works with Upstash or any Redis-compatible
 * REST endpoint / edge KV). Deliberately dependency-free: it uses the global
 * `fetch`, so it runs in both Node server actions and edge runtimes.
 *
 * Environment (server-only, never client-exposed):
 *   RATE_LIMIT_PROVIDER  informational label (e.g. "upstash-rest")
 *   RATE_LIMIT_URL       REST base URL (https)
 *   RATE_LIMIT_TOKEN     bearer token
 *
 * Uses a fixed-window INCR + PEXPIRE counter per (key, window). Business
 * logic never touches the provider directly.
 */
export class RedisRestRateLimitBackend implements RateLimitBackend {
  constructor(
    private readonly url: string,
    private readonly token: string,
  ) {}

  async record(
    key: string,
    windowMs: number,
  ): Promise<{ previous: number; current: number; resetAt: Date }> {
    const now = Date.now();
    const windowIndex = Math.floor(now / windowMs);
    const winKey = `rl:${key}:${windowIndex}`;

    const res = await fetch(`${this.url.replace(/\/$/, "")}/pipeline`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify([
        ["incr", winKey],
        ["pexpire", winKey, String(windowMs)],
      ]),
    });

    if (!res.ok) {
      throw new Error(`rate-limit backend responded ${res.status}`);
    }

    const results = (await res.json()) as Array<{ result: number }>;
    const count = results[0]?.result ?? 0;

    return {
      previous: Math.max(0, count - 1),
      current: count,
      resetAt: new Date((windowIndex + 1) * windowMs),
    };
  }
}

/**
 * Wire the shared backend from environment configuration. Idempotent; call at
 * module load in server code. No-op (in-memory) when the env vars are absent.
 */
export function setupRateLimiter(): void {
  const url = process.env.RATE_LIMIT_URL?.trim();
  const token = process.env.RATE_LIMIT_TOKEN?.trim();
  if (url && token) {
    registerRateLimitBackend(new RedisRestRateLimitBackend(url, token));
  }
}

/**
 * Production rate limiter. Delegates to a registered shared backend when one
 * exists; otherwise it operates in a documented degraded mode (single-instance,
 * in-memory) and warns.
 */
export class ProductionRateLimiter implements RateLimiter {
  private readonly fallback = new InMemoryRateLimiter();

  constructor(
    private readonly getBackend: () => RateLimitBackend | null = () => registeredBackend,
  ) {}

  async consume(
    key: string,
    limit: number,
    windowMs: number,
  ): Promise<RateLimitResult> {
    const backend = this.getBackend();
    if (!backend) {
      console.warn(
        "[rate-limit] No shared backend registered; using in-memory fallback (degraded, single-instance).",
      );
      return this.fallback.consume(key, limit, windowMs);
    }

    try {
      const { previous, resetAt } = await backend.record(key, windowMs);
      const allowed = previous < limit;
      return {
        allowed,
        limit,
        remaining: Math.max(0, limit - previous - 1),
        resetAt,
      };
    } catch (error) {
      console.error("[rate-limit] Shared backend error; using in-memory fallback:", error);
      return this.fallback.consume(key, limit, windowMs);
    }
  }
}

/**
 * Get the appropriate rate limiter for the current environment.
 * Production uses a registered shared backend when one exists; otherwise it
 * runs a single-instance in-memory limiter and logs a deployment warning.
 */
export function getRateLimiter(): RateLimiter {
  const isProduction = process.env.NODE_ENV === "production";

  if (isProduction && registeredBackend) {
    return new ProductionRateLimiter();
  }

  if (isProduction && !registeredBackend) {
    console.warn(
      "[rate-limit] Production mode without a registered shared backend. " +
        "Register one (Redis / edge KV) at startup for multi-instance safety; " +
        "falling back to single-instance in-memory only.",
    );
  }

  return new InMemoryRateLimiter();
}

/**
 * Sensible defaults. Contact/demo (PII-bearing) get strict limits; search gets
 * moderate; authenticated endpoints get per-user limits.
 */
export const RATE_LIMIT_PROFILES = {
  contact: { limit: 5, windowMs: 10 * 60 * 1000 },
  demo: { limit: 10, windowMs: 60 * 60 * 1000 },
  search: { limit: 30, windowMs: 60 * 1000 },
  api: { limit: 120, windowMs: 60 * 1000 },
  /** PII-bearing / marketing mutations — strict but not user-hostile. */
  newsletter: { limit: 3, windowMs: 60 * 60 * 1000 },
  /** Auth attempts — strictest window to blunt credential stuffing. */
  auth: { limit: 10, windowMs: 60 * 60 * 1000 },
} as const;

export type RateLimitProfile = keyof typeof RATE_LIMIT_PROFILES;
