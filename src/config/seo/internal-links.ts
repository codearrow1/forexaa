/**
 * Internal linking model (Rule 24).
 *
 * Data-driven contextual links per section. Ancestors (hub pages) must
 * link to their children; siblings cross-link; every card links with a
 * descriptive anchor (never "click here").
 *
 * `target` must be a known registry path (live or planned-noindex) — tests
 * assert no dead links. Planned targets resolve to their live parent hub
 * until the child page is built.
 */

import { routeByPath, ALL_KNOWN_PATHS } from "@/config/seo/routes";

export interface InternalLink {
  readonly label: string; // descriptive anchor text
  readonly target: string; // registry path
  /** Falls back to this live hub while `target` is still planned. */
  readonly fallback: string;
}

function resolve(target: string, fallback: string): string {
  const route = routeByPath(target);
  // Link directly only to live routes; planned targets fall back to their
  // hub so no dead links ship (Hard blocker: broken internal links).
  if (route && route.status === "live") return target;
  return fallback;
}

export const LINKS = {
  homeTo: {
    crm: link("Forex CRM & back office", "/broker-technology/crm", "/broker-technology"),
    platforms: link("Trading platforms", "/platforms", "/platforms"),
    liquidity: link("Liquidity infrastructure", "/infrastructure/liquidity", "/infrastructure"),
    whiteLabel: link("White label launch", "/services/white-label", "/services"),
    prop: link("Prop firm solution", "/solutions/prop-firm", "/solutions"),
    socialCopy: link("Social & copy trading", "/solutions/social-copy", "/solutions"),
    pricing: link("Pricing & plans", "/pricing", "/pricing"),
    resources: link("Brokerage resources", "/resources", "/resources"),
    contact: link("Contact the team", "/contact", "/contact"),
  },
  crmCluster: {
    siblings: [
      link("Trader's Room", "/broker-technology/traders-room", "/broker-technology"),
      link("Back Office", "/broker-technology/back-office", "/broker-technology"),
      link("IB / Affiliate Management", "/broker-technology/ib-affiliate", "/broker-technology"),
      link("Risk Management", "/infrastructure", "/infrastructure"),
    ],
    related: [
      link("MT5 platform", "/platforms/mt4-mt5", "/platforms"),
      link("Liquidity for brokers", "/infrastructure/liquidity", "/infrastructure"),
      link("CRM pricing", "/pricing", "/pricing"),
    ],
  },
  whiteLabelCluster: {
    siblings: [
      link("MT5 white label", "/platforms/mt4-mt5", "/platforms"),
      link("MT7 white label", "/platforms/mt7", "/platforms"),
      link("cTrader white label", "/platforms/ctrader", "/platforms"),
      link("White label vs full license", "/services", "/services"),
    ],
    related: [link("White label pricing", "/pricing", "/pricing")],
  },
  liquidityCluster: {
    siblings: [
      link("Liquidity aggregation", "/infrastructure/liquidity", "/infrastructure"),
      link("Payments infrastructure", "/infrastructure", "/infrastructure"),
      link("Risk & execution", "/infrastructure", "/infrastructure"),
    ],
    related: [link("Trading platform", "/platforms", "/platforms")],
  },
} as const;

function link(label: string, target: string, fallback: string): InternalLink {
  return { label, target: resolve(target, fallback), fallback };
}

/**
 * Public helper: resolve a planned registry path to its live fallback so
 * homepage cards never ship dead links.
 */
export function resolveForLink(target: string, fallback: string): string {
  return resolve(target, fallback);
}

/** All internal link targets must resolve to a known registry path. */
export function linkTargetsAreKnown(): boolean {
  const all: readonly string[] = [
    ...Object.values(LINKS.homeTo).map((l) => l.target),
    ...LINKS.crmCluster.siblings.map((l) => l.target),
    ...LINKS.crmCluster.related.map((l) => l.target),
    ...LINKS.whiteLabelCluster.siblings.map((l) => l.target),
    ...LINKS.whiteLabelCluster.related.map((l) => l.target),
    ...LINKS.liquidityCluster.siblings.map((l) => l.target),
    ...LINKS.liquidityCluster.related.map((l) => l.target),
  ];
  return all.every((path) => (ALL_KNOWN_PATHS as readonly string[]).includes(path));
}
