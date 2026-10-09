/**
 * Analytics event architecture (Rule 61).
 *
 * Typed event names are defined NOW; no third-party provider is loaded yet
 * (Rule 59). A provider-agnostic `track()` no-ops in Phase 2 and is the
 * single seam later phases use to wire GA4 / GTM / Clarity / consent
 * tooling.
 *
 * Privacy: only stable, non-sensitive event names + a small allowlist of
 * properties. NEVER capture form field values (Rule 61).
 */

export const TRACKED_EVENTS = {
  page_view: "page_view",
  hero_cta_click: "hero_cta_click",
  demo_cta_click: "demo_cta_click",
  product_card_click: "product_card_click",
  platform_tab_view: "platform_tab_view",
  solution_card_click: "solution_card_click",
  pricing_view: "pricing_view",
  contact_view: "contact_view",
  contact_intent_selected: "contact_intent_selected",
  contact_start: "contact_start",
  contact_submit_success: "contact_submit_success",
  contact_submit_error: "contact_submit_error",
  resource_open: "resource_open",
  cta_click: "cta_click",
  solution_selected: "solution_selected",
  product_view: "product_view",
  platform_selected: "platform_selected",
  stack_builder_completed: "stack_builder_completed",
  asset_zoomed: "asset_zoomed",
  video_started: "video_started",
  video_completed: "video_completed",
} as const;

export type TrackedEvent = (typeof TRACKED_EVENTS)[keyof typeof TRACKED_EVENTS];

/** Properties allowed on any tracked event (non-sensitive only). */
export interface EventProps {
  readonly ctaLabel?: string;
  readonly target?: string;
  readonly section?: string;
  readonly platform?: string;
  readonly solution?: string;
  /** Non-sensitive selection metadata only (never form payloads / PII). */
  readonly interest?: string;
  readonly businessType?: string;
  readonly product?: string;
  readonly category?: string;
  readonly option?: string;
  readonly source?: string;
  /** Non-sensitive context entry point (e.g. contact intent enum). */
  readonly context?: string;
}

export interface AnalyticsProvider {
  readonly name: string;
  track(event: TrackedEvent, props?: EventProps): void;
}

/**
 * Default provider: records nothing, safe for all environments.
 * Swap implementations here in later phases (GA4/GTM/Clarity + consent).
 */
export const defaultAnalytics: AnalyticsProvider = {
  name: "noop",
  track() {
    /* intentionally empty until a provider + consent are wired */
  },
};

let provider: AnalyticsProvider = defaultAnalytics;

export function setAnalyticsProvider(next: AnalyticsProvider): void {
  provider = next;
}

/**
 * The only public entry point. Server components may call this inside
 * client event handlers; it never throws and never ships PII.
 */
export function track(event: TrackedEvent, props: EventProps = {}): void {
  provider.track(event, props);
}
