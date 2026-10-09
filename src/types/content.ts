/**
 * Typed content models for the FOREXAA site.
 *
 * Future content (products, case studies, articles, FAQ, testimonials,
 * statistics, partners, resources) MUST flow through these models — never be
 * hard-coded ad-hoc in JSX. Values marked `verified` are assertions about the
 * factual source; see docs/content/CONTENT-SOURCE-OF-TRUTH.md.
 */

export type ContentStatus = "draft" | "published" | "deprecated";

export interface ContentMeta {
  /** Stable slug. Required, unique per collection. */
  slug: string;
  title: string;
  /** 1–2 sentence summary used in cards and meta description. */
  summary: string;
  status: ContentStatus;
  /** Image reference under public/images (optional). */
  image?: string;
  /** Factual backing for the item (source URL or internal reference). */
  source?: string;
}

export interface Product {
  slug: string;
  name: string;
  category: "crm" | "platform" | "liquidity" | "payments" | "risk" | "social";
  tagline: string;
  features: string[];
  meta: ContentMeta;
}

export interface Platform {
  slug: string;
  name: string;
  /** e.g. "MT5" | "cTrader" | "MobiusTrader 7" | "Web" | "Mobile" */
  family: string;
  supportedAccounts: string[];
  meta: ContentMeta;
}

export interface Solution {
  slug: string;
  name: string;
  description: string;
  outcome: string;
  meta: ContentMeta;
}

export interface Service {
  slug: string;
  name: string;
  description: string;
  meta: ContentMeta;
}

export interface Integration {
  slug: string;
  name: string;
  kind: "payment" | "market-data" | "telecom" | "identity" | "other";
  description: string;
  meta: ContentMeta;
}

export interface Partner {
  slug: string;
  name: string;
  relationship: string;
  /** Partnership claims require verification (see content policy). */
  verified: boolean;
  meta: ContentMeta;
}

export interface CaseStudy {
  slug: string;
  title: string;
  client: string;
  industry: string;
  challenges: string[];
  outcomes: string[];
  /** Every quantitative outcome needs a source. */
  verified: boolean;
  meta: ContentMeta;
}

export interface Faq {
  slug: string;
  question: string;
  answer: string;
}

export interface Article {
  slug: string;
  title: string;
  description: string;
  publishedAt: string; // ISO 8601
  author: string;
  related: string[];
  meta: ContentMeta;
}

export interface Resource {
  slug: string;
  name: string;
  kind: "guide" | "comparison" | "glossary" | "whitepaper";
  meta: ContentMeta;
}

export interface Testimonial {
  slug: string;
  quote: string;
  attribution: string;
  /** Requires client permission on record. */
  verified: boolean;
}

export interface Statistic {
  slug: string;
  label: string;
  value: string;
  /** Claims like broker counts require a factual source. */
  source?: string;
  verified: boolean;
}

export interface PricingTier {
  slug: string;
  name: string;
  price: string;
  cadence: "monthly" | "yearly" | "lifetime" | "quote";
  /** Marketing claims (e.g. "most popular") require a source. */
  highlight?: string;
  features: string[];
}

/* ----------------------------------------------------------------------
 * Phase 3 — structured product content (Rule 43/44).
 * Presentation (JSX) stays separate from content (these data files).
 * All copy is claim-gated: only verified facts; anything else is
 * non-numeric and explicitly "confirmed during a demo / per deployment".
 * -------------------------------------------------------------------- */

export type ProductCategory =
  | "crm"
  | "traders-room"
  | "back-office"
  | "ib-affiliate"
  | "platform"
  | "liquidity"
  | "social"
  | "white-label";

/**
 * Visual kind for product assets (Rule 28/33 of Phase 5).
 * - verified-screenshot: real product capture, source documented
 * - synthetic-ui: clearly labeled illustrative interface
 * - conceptual: abstract architecture diagram
 * - generated-art: original generated artwork
 */
export type ProductVisualKind =
  | "verified-screenshot"
  | "synthetic-ui"
  | "conceptual"
  | "generated-art";

export interface ProductVisual {
  readonly kind: ProductVisualKind;
  readonly src?: string;
  readonly alt: string;
  readonly caption?: string;
  /** For verified screenshots only */
  readonly source?: string;
  readonly verifiedAt?: string;
  readonly approvedBy?: string;
  readonly version?: string;
  /** Synthetic data label — always shown for non-screenshot visuals */
  readonly isSynthetic?: boolean;
}

/**
 * Deep product page content. Consumed by the ProductPage template.
 * `claimKeys` reference the claims registry; the render layer refuses to
 * emit any `pending`/`forbidden` claim (Rule 45).
 */
export interface ProductContent {
  readonly slug: string;
  readonly name: string;
  readonly category: ProductCategory;
  /** Short registry-facing tagline. */
  readonly tagline: string;
  /** Mega-menu / card label. */
  readonly eyebrow: string;
  /** H1. */
  readonly title: string;
  /** One strong factual paragraph under the H1. */
  readonly lead: string;
  /** What it is / who it is for / what it contains. */
  readonly overview: readonly string[];
  readonly targetAudience: readonly string[];
  /** Capability groups (concrete, not "everything you need"). */
  readonly capabilities: ReadonlyArray<{ group: string; items: readonly string[] }>;
  /** Step flow shown as a workflow diagram (CRM lifecycle, IB tree, ...). */
  readonly workflow?: { title: string; steps: readonly string[]; note?: string };
  /** Platform / infrastructure connections. */
  readonly integrations: readonly string[];
  /** Copy header for the full-width interface scene (Phase 13 §5). */
  readonly scene?: { eyebrow: string; title: string; lead?: string };
  /** Related product slugs (must resolve in the product index). */
  readonly relatedProducts: readonly string[];
  readonly relatedHubs: readonly string[];
  /** Small FAQ (genuine buyer questions; concise answers). */
  readonly faq: ReadonlyArray<{ question: string; answer: string }>;
  /** Conversion microcopy (institutional tone, Rule 88). */
  readonly cta: {
    primary: string;
    primaryHref: string;
    secondary: string;
    secondaryHref: string;
    footer: string;
  };
  /** Claim registry slugs this page may reference (verified only). */
  readonly claimKeys: readonly string[];
  /** Governance (Rule 80). */
  readonly governance: {
    lastReviewedAt: string;
    contentOwner: string;
    claimReviewState: "verified" | "pending";
  };
}

/**
 * Product ↔ Platform ↔ Infrastructure ↔ Business Model relationships
 * (Rule 32). Data-only; a future Solution page renders these chains
 * without duplicating content.
 */
export interface SolutionChain {
  readonly slug: string;
  readonly name: string;
  readonly description: string;
  /** Ordered product/platform/infra slugs the model is built from. */
  readonly chain: readonly string[];
}

