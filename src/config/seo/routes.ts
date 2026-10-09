import type { SiteRoute } from "@/config/seo/types";

/**
 * Route registry — the full URL architecture (Rule 11) with an explicit
 * indexation decision for every route (Rule 5 of the brief).
 *
 * PHASE 2 DECISIONS
 * ==================
 * INDEX: home, /solutions, /platforms, /broker-technology,
 *        /infrastructure, /pricing (now meaningful, no fabricated numbers)
 * NOINDEX: /services, /resources, /company (thin scaffolds until real
 *        content lands; crawlable, just not indexable)
 * PLANNED (architecture-only, no folder yet — do NOT make thin pages):
 *        the nested sub-routes below. They are registered so internal
 *        linking, sitemaps and redirects can target them, but they must not
 *        be published as thin indexable pages (Rule 66).
 *
 * Sitemap + robots meta + canonicals are all generated from this registry.
 */
export const ROUTE_REGISTRY: readonly SiteRoute[] = [
  {
    path: "/",
    label: "Home",
    indexation: "index",
    status: "live",
    contentType: "homepage",
    primaryTopic: "FOREXAA brokerage technology (entity + product ecosystem)",
    intent: "navigational",
    breadcrumb: ["Home"],
    schema: ["Organization", "WebSite"],
    title: "The Technology Behind Modern Brokerages",
    description:
      "FOREXAA is one connected brokerage technology stack: CRM, trading platforms, liquidity, payments, risk and client operations for forex, multi-asset and prop-trading businesses.",
  },
  {
    path: "/solutions",
    label: "Solutions",
    indexation: "index",
    status: "live",
    contentType: "hub",
    primaryTopic: "Forex brokerage solutions by business model",
    intent: "commercial-investigation",
    breadcrumb: ["Home", "Solutions"],
    schema: ["BreadcrumbList"],
    title: "Brokerage Solutions for Every Business Model",
    description:
      "Solutions for launching a new brokerage, upgrading an existing broker, running a prop firm, multi-asset brokers and investment platforms — built on one connected technology stack.",
  },
  {
    path: "/platforms",
    label: "Platforms",
    indexation: "index",
    status: "live",
    contentType: "hub",
    primaryTopic: "Trading platforms for brokerages (MT4/MT5, MT7, cTrader, web, mobile)",
    intent: "commercial-investigation",
    breadcrumb: ["Home", "Platforms"],
    schema: ["BreadcrumbList", "SoftwareApplication"],
    title: "Trading Platforms: MT4, MT5, MT7, cTrader, Web & Mobile",
    description:
      "Run your brokerage on MetaTrader 4 and 5, MobiusTrader 7 (MT7), cTrader, or web and mobile trading — connected to one back office, CRM and liquidity layer.",
  },
  {
    path: "/broker-technology",
    label: "Broker Technology",
    indexation: "index",
    status: "live",
    contentType: "hub",
    primaryTopic: "Forex CRM and back office for brokers",
    intent: "commercial-investigation",
    breadcrumb: ["Home", "Broker Technology"],
    schema: ["BreadcrumbList", "Service"],
    title: "Forex CRM, Back Office & Trader's Room",
    description:
      "Broker-focused CRM, back office, trader's room and IB/affiliate management that run your client relationships, accounts and operations from one system.",
  },
  {
    path: "/infrastructure",
    label: "Infrastructure",
    indexation: "index",
    status: "live",
    contentType: "hub",
    primaryTopic: "Forex liquidity, payments, risk and APIs",
    intent: "commercial-investigation",
    breadcrumb: ["Home", "Infrastructure"],
    schema: ["BreadcrumbList", "Service"],
    title: "Liquidity, Payments, Risk & APIs",
    description:
      "Connect your brokerage to liquidity, payments, risk monitoring and open APIs — the infrastructure layer behind a modern, multi-asset broker.",
  },
  {
    path: "/pricing",
    label: "Pricing",
    indexation: "index",
    status: "live",
    contentType: "pricing",
    primaryTopic: "FOREXAA pricing structure",
    intent: "transactional",
    breadcrumb: ["Home", "Pricing"],
    schema: ["BreadcrumbList"],
    title: "Pricing",
    description:
      "How FOREXAA pricing works: what is included in each tier, how white-label and CRM plans are structured, and how to get a quote for your brokerage.",
  },
  {
    path: "/services",
    label: "Services",
    indexation: "noindex",
    status: "live",
    contentType: "service",
    primaryTopic: "Brokerage services (white label, legal, migration, support)",
    intent: "commercial-investigation",
    breadcrumb: ["Home", "Services"],
    schema: [],
    title: "Services",
    description:
      "White-label setup, legal and compliance support, migration and ongoing support for brokerage businesses.",
    indexableWhen:
      "White-label, legal-compliance, migration and support pages have substantial, verified content.",
  },
  {
    path: "/resources",
    label: "Resources",
    indexation: "noindex",
    status: "live",
    contentType: "resource",
    primaryTopic: "Brokerage knowledge resources",
    intent: "informational",
    breadcrumb: ["Home", "Resources"],
    schema: [],
    title: "Resources",
    description:
      "Guides, comparisons and reference material for building and operating a brokerage.",
    indexableWhen:
      "At least a few genuinely useful resources (guides, comparisons, glossary) are published.",
  },
  {
    path: "/company",
    label: "Company",
    indexation: "noindex",
    status: "live",
    contentType: "company",
    primaryTopic: "About FOREXAA, team, contact",
    intent: "navigational",
    breadcrumb: ["Home", "Company"],
    schema: ["Organization"],
    title: "Company",
    description: "About FOREXAA and how to reach the team.",
    indexableWhen:
      "Company facts, team, address/contact details and history are verified and written up.",
  },
  {
    path: "/company/partners",
    label: "Partners",
    indexation: "noindex",
    status: "live",
    contentType: "company",
    primaryTopic: "FOREXAA technology and infrastructure partners",
    intent: "navigational",
    breadcrumb: ["Home", "Company", "Partners"],
    schema: [],
    title: "Technology Partners",
    description:
      "Verified technology and infrastructure partners across trading platforms, liquidity, payments and compliance.",
    indexableWhen:
      "At least one partner relationship is verified and its logo is approved for public display.",
  },

  {
    path: "/legal/privacy",
    label: "Privacy",
    indexation: "noindex",
    status: "live",
    contentType: "company",
    primaryTopic: "Privacy policy",
    intent: "navigational",
    breadcrumb: ["Home", "Privacy"],
    schema: [],
    title: "Privacy Policy",
    description: "How FOREXAA handles personal information. Policy text is in final review.",
    indexableWhen: "Approved privacy policy text.",
  },
  {
    path: "/legal/terms",
    label: "Terms",
    indexation: "noindex",
    status: "live",
    contentType: "company",
    primaryTopic: "Terms of service",
    intent: "navigational",
    breadcrumb: ["Home", "Terms"],
    schema: [],
    title: "Terms",
    description: "Terms of service for using FOREXAA. Policy text is in final review.",
    indexableWhen: "Approved terms text.",
  },
  {
    path: "/legal/risk-disclosure",
    label: "Risk Disclosure",
    indexation: "noindex",
    status: "live",
    contentType: "company",
    primaryTopic: "Risk disclosure",
    intent: "navigational",
    breadcrumb: ["Home", "Risk Disclosure"],
    schema: [],
    title: "Risk Disclosure Policy",
    description: "Trading-related risk disclosure. Policy text is in final review.",
    indexableWhen: "Approved risk disclosure text.",
  },

  // ------------------------------------------------------------------
  // PLANNED solution routes (architecture only — not yet built as pages).
  // NOINDEX by default, not in the sitemap until built with real content.
  // (The product/platform/infrastructure routes above were promoted to
  // live + index in Phase 3 when their pages were implemented.)
  // ------------------------------------------------------------------
  {
    path: "/solutions/new-brokerage",
    label: "New Brokerage",
    indexation: "index",
    status: "live",
    contentType: "solution",
    primaryTopic: "Launching a new forex brokerage",
    intent: "problem-solving",
    breadcrumb: ["Home", "Solutions", "New Brokerage"],
    schema: ["BreadcrumbList", "Service"],
    title: "Launch a New Forex Brokerage",
    description: "Build the technology foundation for a new brokerage: platform, CRM, liquidity, payments, compliance and launch — in one connected deployment.",
  },
  {
    path: "/solutions/existing-broker",
    label: "Existing Brokerage",
    indexation: "index",
    status: "live",
    contentType: "solution",
    primaryTopic: "Upgrading an existing brokerage",
    intent: "problem-solving",
    breadcrumb: ["Home", "Solutions", "Existing Brokerage"],
    schema: ["BreadcrumbList", "Service"],
    title: "Modernize an Existing Brokerage",
    description: "Migrate and modernize an operating brokerage onto FOREXAA — replace individual components or connect to infrastructure you already run.",
  },
  {
    path: "/solutions/prop-firm",
    label: "Prop Firm",
    indexation: "index",
    status: "live",
    contentType: "solution",
    primaryTopic: "Prop firm technology",
    intent: "commercial-investigation",
    breadcrumb: ["Home", "Solutions", "Prop Firm"],
    schema: ["BreadcrumbList", "Service"],
    title: "Prop Firm Technology",
    description: "Run a prop-trading business with challenge workflows, CRM, risk rules and profit/payout operations on the FOREXAA stack.",
  },
  {
    path: "/solutions/multi-asset",
    label: "Multi-Asset Broker",
    indexation: "index",
    status: "live",
    contentType: "solution",
    primaryTopic: "Multi-asset brokerage",
    intent: "commercial-investigation",
    breadcrumb: ["Home", "Solutions", "Multi-Asset"],
    schema: ["BreadcrumbList", "Service"],
    title: "Multi-Asset Brokerage",
    description:       "Offer forex, CFD, metals and crypto from one connected stack, with shared client records, risk and operations.",
  },
  {
    path: "/solutions/investment-platform",
    label: "Investment Platform",
    indexation: "noindex",
    status: "planned",
    contentType: "solution",
    primaryTopic: "Investment platform",
    intent: "commercial-investigation",
    breadcrumb: ["Home", "Solutions", "Investment Platform"],
    schema: ["BreadcrumbList", "Service"],
    title: "Investment Platform",
    description: "Structured and advisory-style offerings on shared infrastructure.",
    indexableWhen: "Investment platform scope verified.",
  },
  {
    path: "/contact",
    label: "Contact",
    indexation: "index",
    status: "live",
    contentType: "company",
    primaryTopic: "Contact FOREXAA / book a demo",
    intent: "transactional",
    breadcrumb: ["Home", "Contact"],
    schema: ["BreadcrumbList"],
    title: "Contact",
    description:
      "Talk to the FOREXAA team: book a demo, request pricing, or ask about a deployment. Tell us what you are building and we will respond.",
  },
  {
    path: "/solutions/social-copy",
    label: "Social & Copy",
    indexation: "index",
    status: "live",
    contentType: "product",
    primaryTopic: "Social trading, copy trading, PAMM and MAM",
    intent: "commercial-investigation",
    breadcrumb: ["Home", "Solutions", "Social & Copy"],
    schema: ["BreadcrumbList", "Service"],
    title: "Social, Copy, PAMM & MAM Trading",
    description:
      "Strategy sharing, automated copy trading, pooled PAMM allocation and segregated MAM management — the managed-trading models in your deployment.",
  },

  // ------------------------------------------------------------------
  // Phase 3 — built product pages (live + indexable).
  // Promoted from `planned` in Phase 3 when the pages were implemented.
  // ------------------------------------------------------------------
  {
    path: "/broker-technology/crm",
    label: "Forex CRM",
    indexation: "index",
    status: "live",
    contentType: "product",
    primaryTopic: "Forex CRM product",
    intent: "commercial-investigation",
    breadcrumb: ["Home", "Broker Technology", "Forex CRM"],
    schema: ["BreadcrumbList", "SoftwareApplication"],
    title: "Forex CRM for Brokers",
    description:
      "The FOREXAA CRM manages the full client lifecycle — leads, registration, KYC, accounts, deposits, partners and support — in one system built around brokerage operations.",
  },
  {
    path: "/broker-technology/traders-room",
    label: "Trader's Room",
    indexation: "index",
    status: "live",
    contentType: "product",
    primaryTopic: "Forex trader's room / client portal",
    intent: "commercial-investigation",
    breadcrumb: ["Home", "Broker Technology", "Trader's Room"],
    schema: ["BreadcrumbList", "SoftwareApplication"],
    title: "Trader's Room for Brokers",
    description:
      "The branded client portal where your clients register, manage accounts, move money, keep documents and reach their trading platforms — in one place.",
  },
  {
    path: "/broker-technology/back-office",
    label: "Back Office",
    indexation: "index",
    status: "live",
    contentType: "product",
    primaryTopic: "Forex back office / broker operations console",
    intent: "commercial-investigation",
    breadcrumb: ["Home", "Broker Technology", "Back Office"],
    schema: ["BreadcrumbList", "SoftwareApplication"],
    title: "Forex Back Office & Operations",
    description:
      "The operations console that runs your day: clients, accounts, transactions, KYC, partners, risk, reports and tickets in one system.",
  },
  {
    path: "/broker-technology/ib-affiliate",
    label: "IB / Affiliate",
    indexation: "index",
    status: "live",
    contentType: "product",
    primaryTopic: "Forex IB & affiliate management",
    intent: "commercial-investigation",
    breadcrumb: ["Home", "Broker Technology", "IB / Affiliate"],
    schema: ["BreadcrumbList", "SoftwareApplication"],
    title: "Forex IB & Affiliate Management",
    description:
      "Model your partner hierarchy, attribute trading activity to the right partner, calculate commission and give partners transparent reporting.",
  },
  {
    path: "/platforms/mt4-mt5",
    label: "MT4 / MT5",
    indexation: "index",
    status: "live",
    contentType: "platform",
    primaryTopic: "MT4 & MT5 white label",
    intent: "commercial-investigation",
    breadcrumb: ["Home", "Platforms", "MT4 / MT5"],
    schema: ["BreadcrumbList", "SoftwareApplication"],
    title: "MT4 & MT5 White Label Brokerage Platform",
    description:
      "Deploy MetaTrader 4 or 5 under your brand, connected to the FOREXAA CRM, back office, trader's room and liquidity layer.",
  },
  {
    path: "/platforms/mt7",
    label: "MT7",
    indexation: "index",
    status: "live",
    contentType: "platform",
    primaryTopic: "MT7 / MobiusTrader white label",
    intent: "commercial-investigation",
    breadcrumb: ["Home", "Platforms", "MT7"],
    schema: ["BreadcrumbList", "SoftwareApplication"],
    title: "MobiusTrader MT7 for Brokers",
    description:
      "Offer clients a next-generation multi-market terminal with social capability, deployed white-label and connected to your FOREXAA stack.",
  },
  {
    path: "/platforms/ctrader",
    label: "cTrader",
    indexation: "index",
    status: "live",
    contentType: "platform",
    primaryTopic: "cTrader white label",
    intent: "commercial-investigation",
    breadcrumb: ["Home", "Platforms", "cTrader"],
    schema: ["BreadcrumbList", "SoftwareApplication"],
    title: "cTrader White Label for Brokers",
    description:
      "Run cTrader under your brand on the FOREXAA operational stack — CRM, back office and liquidity kept in sync with the platform.",
  },
  {
    path: "/infrastructure/liquidity",
    label: "Liquidity",
    indexation: "index",
    status: "live",
    contentType: "product",
    primaryTopic: "Forex liquidity infrastructure",
    intent: "commercial-investigation",
    breadcrumb: ["Home", "Infrastructure", "Liquidity"],
    schema: ["BreadcrumbList", "Service"],
    title: "Forex Liquidity Infrastructure",
    description:
      "The connectivity layer between your liquidity sources and your trading platforms: pricing, aggregation, risk routing and execution flow.",
  },
  {
    path: "/services/white-label",
    label: "White Label",
    indexation: "index",
    status: "live",
    contentType: "service",
    primaryTopic: "White label brokerage solutions",
    intent: "commercial-investigation",
    breadcrumb: ["Home", "Services", "White Label"],
    schema: ["BreadcrumbList", "Service"],
    title: "Forex Broker White Label Solutions",
    description:
      "Launch a brokerage that carries your name: platform, CRM, client portal, liquidity and payments, configured around your structure and your brand.",
  },
  {
    path: "/trust",
    label: "Trust Center",
    indexation: "index",
    status: "live",
    contentType: "company",
    primaryTopic: "Trust, security and transparency",
    intent: "navigational",
    breadcrumb: ["Home", "Trust"],
    schema: ["BreadcrumbList"],
    title: "Trust Center",
    description:
      "Trust, security and transparency at FOREXAA. Explore our security, privacy, compliance and risk disclosure practices.",
  },
  {
    path: "/trust/security",
    label: "Security",
    indexation: "index",
    status: "live",
    contentType: "company",
    primaryTopic: "Security architecture and controls",
    intent: "informational",
    breadcrumb: ["Home", "Trust", "Security"],
    schema: ["BreadcrumbList"],
    title: "Security",
    description:
      "Security architecture and controls at FOREXAA. Website and software security, headers, CSP, dependency management.",
  },
  {
    path: "/trust/privacy",
    label: "Privacy",
    indexation: "noindex",
    status: "live",
    contentType: "company",
    primaryTopic: "Privacy policy",
    intent: "navigational",
    breadcrumb: ["Home", "Trust", "Privacy"],
    schema: [],
    title: "Privacy",
    description:
      "How FOREXAA handles personal information. Policy text is in final review with counsel.",
  },
  {
    path: "/trust/compliance",
    label: "Compliance",
    indexation: "index",
    status: "live",
    contentType: "company",
    primaryTopic: "Regulatory clarity and compliance",
    intent: "informational",
    breadcrumb: ["Home", "Trust", "Compliance"],
    schema: ["BreadcrumbList"],
    title: "Compliance",
    description:
      "Regulatory clarity at FOREXAA. We are a technology provider. No fabricated licenses or regulatory status.",
  },
  {
    path: "/trust/risk-disclosure",
    label: "Risk Disclosure",
    indexation: "index",
    status: "live",
    contentType: "company",
    primaryTopic: "Risk disclosure",
    intent: "informational",
    breadcrumb: ["Home", "Trust", "Risk Disclosure"],
    schema: ["BreadcrumbList"],
    title: "Risk Disclosure",
    description:
      "Trading-related risk disclosure. No legal advice or regulatory assurances.",
  },
] as const;

/** Look up a registry entry by path. */
export function routeByPath(path: string): SiteRoute | undefined {
  return ROUTE_REGISTRY.find((route) => route.path === path);
}

/** All routes that should appear in the production sitemap. */
export const SITEMAP_ROUTES: readonly SiteRoute[] = ROUTE_REGISTRY.filter(
  (route) => route.indexation === "index" && route.status === "live",
);

/** All live (built) routes, indexable or not. */
export const LIVE_ROUTES: readonly SiteRoute[] = ROUTE_REGISTRY.filter(
  (route) => route.status === "live",
);

/**
 * The complete known URL space (live + planned). Internal links must only
 * point at entries here, or at a live route that genuinely exists, to
 * avoid dead links.
 */
export const ALL_KNOWN_PATHS: readonly string[] = ROUTE_REGISTRY.map(
  (route) => route.path,
);

export function isIndexable(path: string): boolean {
  const route = routeByPath(path);
  return route !== undefined && route.indexation === "index" && route.status === "live";
}
