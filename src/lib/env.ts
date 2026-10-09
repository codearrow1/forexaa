/**
 * Server-side environment access.
 *
 * - Only import this module from server components, route handlers, or the
 *   proxy. NEVER import from a client component.
 * - No secrets ever ship to the browser. Anything that must be public is
 *   read directly from process.env.NEXT_PUBLIC_* with static analysis.
 *
 * See docs/security/SECURITY-BASELINE.md ("Secrets").
 */

const levelValues = ["trace", "debug", "info", "warn", "error"] as const;
type LogLevel = (typeof levelValues)[number];

export interface ServerEnv {
  readonly nodeEnv: "development" | "production" | "test";
  /** Origins allowed into the production CSP. Empty string = none. */
  readonly cspAllowedOrigins: string[];
  readonly logLevel: LogLevel;
  /** True when running under the production server (next start). */
  readonly isProduction: boolean;
}

function parseLevel(value: string | undefined): LogLevel {
  const normalized = (value ?? "info").toLowerCase();
  return levelValues.includes(normalized as LogLevel)
    ? (normalized as LogLevel)
    : "info";
}

function parseOrigins(value: string | undefined): string[] {
  if (!value || !value.trim()) return [];
  return value
    .split(",")
    .map((origin) => origin.trim())
    .filter((origin): origin is string => {
      if (!origin) return false;
      try {
        const url = new URL(origin);
        return url.protocol === "https:";
      } catch {
        return false;
      }
    });
}

export function loadServerEnv(): ServerEnv {
  const nodeEnvRaw = process.env.NODE_ENV;
  const nodeEnv: ServerEnv["nodeEnv"] =
    nodeEnvRaw === "production"
      ? "production"
      : nodeEnvRaw === "test"
        ? "test"
        : "development";

  return {
    nodeEnv,
    isProduction: nodeEnv === "production",
    cspAllowedOrigins: parseOrigins(process.env.CSP_ALLOWED_ORIGINS),
    logLevel: parseLevel(process.env.LOG_LEVEL),
  };
}

export function publicSiteUrl(): string {
  // NEXT_PUBLIC_ vars are inlined at build time; this value is intentionally
  // non-secret.
  return process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
}
