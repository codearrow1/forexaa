/**
 * Site-wide configuration.
 *
 * Navigation, footer, and metadata all consume these objects. Do NOT
 * duplicate route definitions in components (Rule 6: data-driven nav).
 *
 * See docs/architecture/ARCHITECTURE.md ("Source of truth").
 */

import type { Faq, PricingTier, Product } from "@/types/content";

export const siteConfig = {
  /** Canonical brand string. Never alternate case (Rule 45 of the brief). */
  name: "FOREXAA",
  description:
    "The Technology Behind Modern Brokerages. One connected stack across CRM, trading platforms, liquidity, payments, risk and operations for brokerage businesses.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",

  navigation: {
    /** Top-level menu items. `children` powers the mega-menu in later phases. */
    main: [
      { label: "Solutions", href: "/solutions", children: [] },
      { label: "Platforms", href: "/platforms", children: [] },
      { label: "Broker Technology", href: "/broker-technology", children: [] },
      { label: "Infrastructure", href: "/infrastructure", children: [] },
      { label: "Services", href: "/services", children: [] },
      { label: "Resources", href: "/resources", children: [] },
      { label: "Company", href: "/company", children: [] },
    ],
  },

  footer: {
    columns: [
      {
        heading: "Solutions",
        links: [
          { label: "All Solutions", href: "/solutions" },
          { label: "Forex CRM", href: "/broker-technology/crm" },
          { label: "Trading Platforms", href: "/platforms" },
          { label: "Social & Copy Trading", href: "/solutions/social-copy" },
          { label: "Prop Trading", href: "/solutions" },
        ],
      },
      {
        heading: "Broker Technology",
        links: [
          { label: "Overview", href: "/broker-technology" },
          { label: "Back Office", href: "/broker-technology/back-office" },
          { label: "Trader's Room", href: "/broker-technology/traders-room" },
          { label: "IB / Affiliate", href: "/broker-technology/ib-affiliate" },
        ],
      },
      {
        heading: "Infrastructure",
        links: [
          { label: "Overview", href: "/infrastructure" },
          { label: "Liquidity", href: "/infrastructure/liquidity" },
          { label: "Payments", href: "/infrastructure" },
          { label: "Risk & Compliance", href: "/infrastructure" },
          { label: "APIs", href: "/infrastructure" },
        ],
      },
      {
        heading: "Company",
        links: [
          { label: "About", href: "/company" },
          { label: "Pricing", href: "/pricing" },
          { label: "Resources", href: "/resources" },
          { label: "Contact", href: "/contact" },
        ],
      },
    ],
    legal: [
      { label: "Privacy", href: "/legal/privacy" },
      { label: "Terms", href: "/legal/terms" },
      { label: "Risk Disclosure", href: "/legal/risk-disclosure" },
      { label: "Contact", href: "/contact" },
    ],
    social: [
      // Socials are placeholders until real profiles are approved (Rule 49).
      { label: "LinkedIn", href: undefined },
      { label: "X", href: undefined },
    ] as Array<{ label: string; href: string | undefined }>,
    copyright: "\u00A9 " + new Date().getFullYear() + " FOREXAA. All rights reserved.",
  },
} as const;

/**
 * Products the FOREXAA platform ecosystem supports.
 * Status reflects Phase 1: architecture supports them all; page content is a
 * later phase (Rule 43).
 */
export const productConfig: readonly Product[] = [
  {
    slug: "forex-crm",
    name: "Forex CRM",
    category: "crm",
    tagline: "Customer relationship management built for brokers.",
    features: ["Client lifecycle", "Onboarding", "IB partner management", "Compliance workflows"],
    meta: {
      slug: "forex-crm",
      title: "Forex CRM",
      summary: "CRM that manages clients, admins and IB partners in one place.",
      status: "draft",
    },
  },
  {
    slug: "traders-room",
    name: "Trader's Room",
    category: "platform",
    tagline: "The professional trading workspace for your clients.",
    features: ["Advanced charting", "Order management", "Position & P&L"],
    meta: {
      slug: "traders-room",
      title: "Trader's Room",
      summary: "A professional trading workspace that scales with your clients.",
      status: "draft",
    },
  },
  {
    slug: "back-office",
    name: "Back Office",
    category: "platform",
    tagline: "Operate every side of the brokerage from one console.",
    features: ["Account management", "Reports & analytics", "Operational controls"],
    meta: {
      slug: "back-office",
      title: "Back Office",
      summary: "A centralized control room for your brokerage operations.",
      status: "draft",
    },
  },
  {
    slug: "liquidity",
    name: "Liquidity",
    category: "liquidity",
    tagline: "Deep, multi-provider liquidity for competitive execution.",
    features: ["Multi-provider aggregation", "FX & crypto", "Low-latency routing"],
    meta: {
      slug: "liquidity",
      title: "Liquidity",
      summary: "Connect clients to deep, reliable liquidity.",
      status: "draft",
    },
  },
  {
    slug: "payments",
    name: "Payments",
    category: "payments",
    tagline: "Deposits, withdrawals and payouts built into the platform.",
    features: ["Card & bank", "Crypto rails", "Fraud-aware checks"],
    meta: {
      slug: "payments",
      title: "Payments",
      summary: "Integrated payment rails for brokerages.",
      status: "draft",
    },
  },
  {
    slug: "risk",
    name: "Risk Management",
    category: "risk",
    tagline: "Real-time exposure monitoring across all accounts.",
    features: ["Position risk", "Counterparty limits", "Automated alerts"],
    meta: {
      slug: "risk",
      title: "Risk Management",
      summary: "See and manage risk across the entire book in real time.",
      status: "draft",
    },
  },
] as const;

export const pricingTiers: PricingTier[] = [
  {
    slug: "crm",
    name: "CRM",
    price: "On request",
    cadence: "quote",
    features: [
      "Back office panel",
      "Account & client management",
      "Compliance workflows",
      "Reporting & analytics",
      "Support",
    ],
  },
  {
    slug: "white-label",
    name: "White Label",
    price: "On request",
    cadence: "quote",
    features: [
      "Branded trading platform",
      "Liquidity & payments integration",
      "MAM / PAMM & copy trading",
      "Deployment support",
    ],
  },
  {
    slug: "all-in-one",
    name: "All-in-one",
    price: "On request",
    cadence: "quote",
    features: [
      "Everything in both tiers",
      "Connected CRM, platform & infrastructure",
      "Migration & onboarding",
      "Priority support",
    ],
  },
  // NOTE: numeric prices are pending verification in the claims registry
  // (pricing-monthly / yearly / lifetime) — do not add them here until
  // confirmed by the business owner.
];

export const faqs: Faq[] = [];

