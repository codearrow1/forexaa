import type { Claim } from "@/config/seo/types";

/**
 * Claims registry (Rule 33 / 34).
 *
 * Only `verified` claims may be rendered in public copy. `pending` claims
 * are tracked so marketing cannot silently re-introduce old unverified
 * numbers, and so the review workflow is visible.
 *
 * Enforcement: `src/lib/seo/claims.ts` provides a `renderableClaim()` guard,
 * and tests/unit/claims.test.ts asserts no non-verified statement string
 * appears in content modules.
 */
export const CLAIMS: readonly Claim[] = [
  {
    slug: "brokers-served",
    statement: "100+ brokerages served",
    state: "pending",
    source: "Legacy forexaa.com claim — requires internal verification",
    note: "Do not publish until an internal source confirms the figure.",
  },
  {
    slug: "traders-enabled",
    statement: "12,500+ traders enabled",
    state: "pending",
    source: "Legacy forexaa.com claim — requires internal verification",
  },
  {
    slug: "mt7-traders",
    statement: "500,000+ professional traders use MT7",
    state: "pending",
    source: "Legacy forexaa.com / MobiusTrader claim",
    note: "Third-party (MetaQuotes) figure — needs a citable source before use.",
  },
  {
    slug: "spreads-pips",
    statement: "Spreads as low as 0.00001 pips",
    state: "forbidden",
    note:
      "Legacy claim is not substantiated; a 0.00001-pip claim is implausible. Do not publish in any form.",
  },
  {
    slug: "rating",
    statement: "4.9/5 customer rating",
    state: "forbidden",
    note:
      "Self-serving aggregate rating without a verifiable review source. Do not fabricate ratings (Google restricts self-serving review rich results).",
  },
  {
    slug: "growth-yoy",
    statement: "95% growth from last year",
    state: "pending",
    source: "Legacy forexaa.com claim",
  },
  {
    slug: "uptime",
    statement: "99.9% uptime",
    state: "pending",
    note: "Requires an actual measured SLA before publication.",
  },
  {
    slug: "leverage-1-1000",
    statement: "Up to 1:1000 leverage",
    state: "pending",
    source: "Legacy forexaa.com MT7 claim — jurisdiction-dependent, verify.",
  },
  {
    slug: "pricing-monthly",
    statement: "CRM from $999/month",
    state: "pending",
    source: "Legacy forexaa.com public price — confirm with current business owner.",
  },
  {
    slug: "pricing-yearly",
    statement: "CRM $9,999/year",
    state: "pending",
    source: "Legacy forexaa.com public price — confirm with current business owner.",
  },
  {
    slug: "pricing-lifetime",
    statement: "CRM lifetime $24,999",
    state: "pending",
    source: "Legacy forexaa.com public price — confirm with current business owner.",
  },
  {
    slug: "company-address",
    statement: "207 Regent St., London W1B 3HH, United Kingdom",
    state: "pending",
    source: "Legacy forexaa.com contact page — verify current registered address.",
  },
] as const;
