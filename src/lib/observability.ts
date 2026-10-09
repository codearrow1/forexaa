/**
 * Safe observability hooks (Phase 7 Rule 40).
 *
 * Emission points for operational failures only. NEVER log form contents,
 * PII, or secret values. The default sink writes a structured, redacted
 * signal; a deployment can swap in an external sink (Datadog, CloudWatch,
 * ...) by registering it — the event contract stays stable.
 */

export type ObservabilityEvent =
  | "contact.failure"
  | "email.failure"
  | "lead-store.failure"
  | "rate-limit.failure"
  | "server-action.error";

export interface Observation {
  readonly event: ObservabilityEvent;
  /** Non-sensitive context only. No PII, no secrets, no form bodies. */
  readonly context?: Record<string, string | number | boolean>;
}

export interface ObservabilitySink {
  readonly name: string;
  record(obs: Observation): void;
}

const sink: ObservabilitySink = {
  name: "console",
  record(obs) {
    // Redacted, structured. Error classes are allowed; details are not.
    console.error(`[observability] ${obs.event}`, obs.context ?? {});
  },
};

let active: ObservabilitySink = sink;

export function registerObservabilitySink(next: ObservabilitySink): void {
  active = next;
}

/** Emit a safe operational signal. Never throws. */
export function observe(event: ObservabilityEvent, context?: Observation["context"]): void {
  try {
    active.record({ event, context });
  } catch {
    /* observability must never break the request path */
  }
}
