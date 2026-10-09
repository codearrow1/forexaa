/**
 * Structured logging abstraction.
 *
 * - JSON-lines format, level-sensitive via LOG_LEVEL.
 * - Sensitive keys are always redacted (see REDACTED_KEYS).
 * - Never log: passwords, tokens, API keys, secrets, full PII (name + email
 *   combinations), card data, full request bodies.
 *
 * See docs/security/SECURITY-BASELINE.md ("Logging").
 */

import { loadServerEnv } from "@/lib/env";

export type LogLevel = "trace" | "debug" | "info" | "warn" | "error";

const LEVEL_RANK: Record<LogLevel, number> = {
  trace: 0,
  debug: 1,
  info: 2,
  warn: 3,
  error: 4,
};

const REDACTED_KEYS = [
  "password",
  "passwd",
  "token",
  "accessToken",
  "refreshToken",
  "apiKey",
  "api_key",
  "secret",
  "authorization",
  "cookie",
  "ssn",
  "cardNumber",
] as const;

export interface LogEntry {
  readonly level: LogLevel;
  readonly message: string;
  readonly timestamp: string;
  readonly context?: Record<string, unknown>;
}

type MaybeRecord = Record<string, unknown> | undefined;

function redact(value: unknown, key?: string): unknown {
  if (key !== undefined) {
    const lower = key.toLowerCase();
    if (REDACTED_KEYS.some((r) => lower.includes(r.toLowerCase()))) return "[redacted]";
  }
  if (Array.isArray(value)) {
    return value.map((item) => redact(item, key));
  }
  if (value !== null && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value)) {
      out[k] = redact(v, k);
    }
    return out;
  }
  return value;
}

export interface Logger {
  readonly trace: (message: string, context?: MaybeRecord) => void;
  readonly debug: (message: string, context?: MaybeRecord) => void;
  readonly info: (message: string, context?: MaybeRecord) => void;
  readonly warn: (message: string, context?: MaybeRecord) => void;
  readonly error: (message: string, context?: MaybeRecord) => void;
}

function createLogger(minLevel: LogLevel): Logger {
  const emit = (level: LogLevel, message: string, context?: MaybeRecord) => {
    if (LEVEL_RANK[level] < LEVEL_RANK[minLevel]) return;
    const entry: LogEntry = {
      level,
      message,
      timestamp: new Date().toISOString(),
      ...(context ? { context: redact(context) as Record<string, unknown> } : {}),
    };
    const writer = level === "error" ? console.error : console.log;
    writer(JSON.stringify(entry));
  };

  return {
    trace: (message, context) => emit("trace", message, context),
    debug: (message, context) => emit("debug", message, context),
    info: (message, context) => emit("info", message, context),
    warn: (message, context) => emit("warn", message, context),
    error: (message, context) => emit("error", message, context),
  };
}

let instance: Logger | null = null;

export function getServerLogger(): Logger {
  if (instance === null) {
    instance = createLogger(loadServerEnv().logLevel);
  }
  return instance;
}
