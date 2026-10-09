/**
 * Screenshot replacement system (Rule 29).
 *
 * A future real screenshot replaces a synthetic visual by changing
 * configuration — not by rewriting page components.
 *
 * To replace a synthetic visual with a verified screenshot:
 * 1. Add the screenshot to `public/products/<product>/`
 * 2. Update the product's visual config: set `kind: "verified-screenshot"`,
 *    `src: "/products/<product>/<filename>"`, and fill in verification fields
 * 3. The same component renders either source
 */

import type { ProductVisual } from "@/types/content";

/**
 * Central registry of product visuals.
 * `kind` determines how the visual is labeled and presented.
 */
export const PRODUCT_VISUALS: Record<string, ProductVisual> = {
  crm: {
    kind: "synthetic-ui",
    alt: "FOREXAA CRM dashboard — illustrative interface",
    isSynthetic: true,
    caption: "CRM overview with client pipeline, accounts, and activity.",
  },
  "traders-room": {
    kind: "synthetic-ui",
    alt: "Trader's Room portal — illustrative interface",
    isSynthetic: true,
    caption: "Client portal with accounts, balances, and platform access.",
  },
  "back-office": {
    kind: "synthetic-ui",
    alt: "Back Office console — illustrative interface",
    isSynthetic: true,
    caption: "Operations console with clients, accounts, and risk.",
  },
  "ib-affiliate": {
    kind: "synthetic-ui",
    alt: "IB / Affiliate dashboard — illustrative interface",
    isSynthetic: true,
    caption: "Partner network with hierarchy, activity, and commissions.",
  },
  "mt4-mt5": {
    kind: "synthetic-ui",
    alt: "MetaTrader 4 / 5 deployment — illustrative interface",
    isSynthetic: true,
    caption: "MT4/MT5 white-label deployment with branding and operations.",
  },
  mt7: {
    kind: "synthetic-ui",
    alt: "MobiusTrader 7 terminal — illustrative interface",
    isSynthetic: true,
    caption: "MT7 terminal with charts, orders, and account management.",
  },
  ctrader: {
    kind: "synthetic-ui",
    alt: "cTrader deployment — illustrative interface",
    isSynthetic: true,
    caption: "cTrader white-label deployment with market data and operations.",
  },
  liquidity: {
    kind: "conceptual",
    alt: "Liquidity infrastructure — conceptual architecture",
    isSynthetic: true,
    caption: "Conceptual diagram — exact topology designed for your deployment.",
  },
  "white-label": {
    kind: "conceptual",
    alt: "White-label brokerage stack — conceptual architecture",
    isSynthetic: true,
    caption: "Conceptual diagram — your brand on connected technology.",
  },
  "social-copy": {
    kind: "conceptual",
    alt: "Social / Copy / PAMM / MAM — conceptual architecture",
    isSynthetic: true,
    caption: "Conceptual diagram — strategy sharing and allocation models.",
  },
};

/**
 * Get the visual config for a product slug.
 * Falls back to a generic synthetic visual if not found.
 */
export function getProductVisual(slug: string): ProductVisual {
  return (
    PRODUCT_VISUALS[slug] ?? {
      kind: "synthetic-ui",
      alt: "Product interface — illustrative",
      isSynthetic: true,
    }
  );
}

/**
 * Check if a visual is a verified screenshot (not synthetic).
 */
export function isVerifiedScreenshot(visual: ProductVisual): boolean {
  return visual.kind === "verified-screenshot" && visual.src !== undefined;
}
