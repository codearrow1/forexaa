/**
 * SEO data model (Phase 2).
 *
 * Single source of truth for per-route search behavior. Consumed by:
 *  - page metadata builders (src/lib/seo)
 *  - sitemap / robots (src/app)
 *  - the seo:check validator
 *  - unit tests
 *
 * Policy: docs/seo/INDEXATION-POLICY.md. Rules: no thin pages indexable,
 * no query-parameter canonicals, no fabricated claims.
 */

/** How a route should be treated by search engines. */
export type Indexation = "index" | "noindex";

/** Lifecycle of a route in this build. */
export type RouteStatus = "live" | "planned" | "deprecated";

/** Search intent classification (docs/seo/KEYWORD-MAP.md §28). */
export type SearchIntent =
  | "informational"
  | "commercial-investigation"
  | "transactional"
  | "navigational"
  | "problem-solving"
  | "comparison"
  | "enterprise";

export type ContentType =
  | "homepage"
  | "hub"
  | "product"
  | "platform"
  | "solution"
  | "service"
  | "pricing"
  | "article"
  | "case-study"
  | "resource"
  | "company";

/** Breadcrumb trail (visible + JSON-LD must match). */
export type BreadcrumbTrail = readonly string[]; // labels; hrefs derived

/**
 * One entry in the route registry.
 * `path` is the canonical, clean, descriptive URL (Rule 11).
 * `indexation` decides sitemap inclusion + robots meta.
 * `status` separates "built now" from "architecture-only" routes.
 */
export interface SiteRoute {
  readonly path: string;
  readonly label: string;
  readonly indexation: Indexation;
  readonly status: RouteStatus;
  readonly contentType: ContentType;
  /** The primary topic this page owns (no cannibalization: one owner). */
  readonly primaryTopic: string;
  readonly intent: SearchIntent;
  readonly breadcrumb: BreadcrumbTrail;
  /** Schema types emitted for this page (only when content justifies). */
  readonly schema: readonly string[];
  /** Page title (full, without the brand suffix). Unique site-wide. */
  readonly title: string;
  /** Page description. Unique site-wide. No unsupported claims. */
  readonly description: string;
  /** For planned routes: what must be true before it becomes indexable. */
  readonly indexableWhen?: string;
}

/**
 * Typed claim states (Rule 33). A claim in any rendered content must exist
 * in the claims registry and be `verified` to ship. `pending` claims may be
 * referenced in dashboards/docs but must not render as site facts.
 */
export type ClaimState = "verified" | "pending" | "deprecated" | "forbidden";

export interface Claim {
  readonly slug: string;
  /** The exact claim as it would read on the page. */
  readonly statement: string;
  readonly state: ClaimState;
  /** Where this is substantiated (doc link, internal source). */
  readonly source?: string;
  readonly verifiedAt?: string; // ISO date
  readonly reviewedBy?: string;
  /** When the claim must be re-verified. */
  readonly reviewDue?: string;
  /** Set for forbidden claims: why it must never be published. */
  readonly note?: string;
}

/**
 * Per-page SEO overrides (page-level fields from the spec).
 * Kept separate from SiteRoute so content teams can enrich without
 * touching the route registry.
 */
export interface PageSeo {
  readonly path: string;
  readonly secondaryTopics?: readonly string[];
  readonly lastReviewedAt?: string;
  readonly author?: string;
}

/**
 * The full SEO metadata contract (internal). `keywords` is content-planning
 * ONLY and must never be emitted as a <meta name="keywords"> tag.
 */
export interface SeoMetadata {
  title: string;
  description: string;
  canonical: string;
  robots: { index: boolean; follow: boolean };
  ogTitle: string;
  ogDescription: string;
  ogImage?: string;
  twitterCard: "summary_large_image";
  imageAlt?: string;
  /** Internal planning fields — never rendered. */
  internal?: {
    keywords?: readonly string[];
  };
}
