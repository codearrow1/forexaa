/**
 * Central CTA configuration (Rule 14).
 *
 * Every CTA on the site references this config. Destinations are validated
 * against the route registry. Tracking events are non-sensitive.
 */

export interface CtaConfig {
  readonly id: string;
  readonly label: string;
  readonly href: string;
  readonly event: string;
  readonly context: string;
}

export const CTAS: Record<string, CtaConfig> = {
  "build-brokerage": {
    id: "build-brokerage",
    label: "Build Your Brokerage",
    href: "/contact?intent=general",
    event: "build_cta_click",
    context: "primary",
  },
  "talk-to-forexaa": {
    id: "talk-to-forexaa",
    label: "Talk to FOREXAA",
    href: "/contact",
    event: "contact_cta_click",
    context: "conversion",
  },
  "talk-to-sales": {
    id: "talk-to-sales",
    label: "Talk to Sales",
    href: "/contact?intent=general",
    event: "sales_cta_click",
    context: "primary",
  },
  "discuss-stack": {
    id: "discuss-stack",
    label: "Discuss Your Stack",
    href: "/contact?intent=general",
    event: "stack_cta_click",
    context: "secondary",
  },
  "explore-platform": {
    id: "explore-platform",
    label: "Explore the Platform",
    href: "/platforms",
    event: "platform_cta_click",
    context: "secondary",
  },
  "explore-crm": {
    id: "explore-crm",
    label: "Explore the CRM",
    href: "/broker-technology/crm",
    event: "crm_cta_click",
    context: "secondary",
  },
  "compare-platforms": {
    id: "compare-platforms",
    label: "Compare Platforms",
    href: "/platforms",
    event: "compare_cta_click",
    context: "secondary",
  },
  "request-pricing": {
    id: "request-pricing",
    label: "Request Pricing",
    href: "/contact?intent=pricing",
    event: "pricing_cta_click",
    context: "primary",
  },
  "plan-launch": {
    id: "plan-launch",
    label: "Plan Your Brokerage Launch",
    href: "/contact?intent=white-label",
    event: "launch_cta_click",
    context: "primary",
  },
  "discuss-liquidity": {
    id: "discuss-liquidity",
    label: "Discuss Your Liquidity Architecture",
    href: "/contact?intent=liquidity",
    event: "liquidity_cta_click",
    context: "primary",
  },
} as const;

export type CtaId = keyof typeof CTAS;

/** Validate that a CTA destination is a known route. */
export function ctaDestinationIsValid(href: string): boolean {
  const path = href.split("?")[0] ?? "";
  return path.startsWith("/");
}
