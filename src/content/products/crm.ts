import type { ProductContent } from "@/types/content";

/**
 * FOREXAA CRM — content only. Presented by the ProductPage template.
 * Every capability is concrete; no "everything you need" filler; no
 * unverified figures (Rule 4).
 */
export const crm: ProductContent = {
  slug: "crm",
  name: "FOREXAA CRM",
  category: "crm",
  tagline: "Client, account, partner and finance operations in one system.",
  eyebrow: "Broker Technology",
  title: "The CRM built around brokerage operations",
  lead: "The FOREXAA CRM is organized the way a brokerage actually works: leads become clients, clients open accounts, accounts deposit and trade, and partners (IBs) earn against that flow. It is not a generic sales CRM with trading bolted on.",
  overview: [
    "What it manages: the full client lifecycle — leads, registration, KYC, account opening, deposits, withdrawals, ongoing trading, partner attribution and support.",
    "Who it is for: new brokerages standing up their first operation, and established brokers replacing spreadsheets or disjointed tools with one connected record.",
    "How it fits: it sits beside the trading platforms and liquidity layer, so a client's CRM record, their trading accounts and their money movement are viewable from the same place.",
  ],
  targetAudience: [
    "New brokerage operators",
    "Established brokers consolidating tooling",
    "Operations & compliance teams",
    "Partner/IB managers",
  ],
  capabilities: [
    {
      group: "Lead management",
      items: [
        "Capture leads from campaigns and referrals into one pipeline",
        "Score and assign leads to the right team",
        "Track the journey from first contact to first deposit",
      ],
    },
    {
      group: "Client management",
      items: [
        "A single record per client across regions and account types",
        "Onboarding and document collection workflow",
        "Status, notes and full activity history per client",
      ],
    },
    {
      group: "Account management",
      items: [
        "Open and track accounts across the connected platforms",
        "Link accounts to the responsible client record",
        "View balances and lifecycle state per account",
      ],
    },
    {
      group: "Finance operations",
      items: [
        "Record deposits, withdrawals and adjustments",
        "Reconcile money movement against account activity",
        "Flag unusual flows for review before payout",
      ],
    },
    {
      group: "IB / partner",
      items: [
        "Model your partner hierarchy and attribution",
        "Calculate commission against the activity they drive",
        "Partner-visible reporting on what they earn",
      ],
    },
    {
      group: "Reporting & automation",
      items: [
        "Operational reports across the whole client base",
        "Scheduled and on-demand exports",
        "Automation for routine onboarding and follow-up steps",
      ],
    },
  ],
  workflow: {
    title: "The client lifecycle the CRM follows",
    steps: [
      "Lead",
      "Registration",
      "KYC",
      "Account",
      "Deposit",
      "Trading",
      "Partner / IB",
      "Retention",
      "Support",
    ],
    note: "Each stage has its own records, owners and handoffs, so nothing falls between tools.",
  },
  integrations: [
    "MetaTrader 4 / 5",
    "MT7 / MobiusTrader",
    "cTrader",
    "Liquidity layer",
    "Payments rails",
  ],
  scene: {
    eyebrow: "Inside the product",
    title: "One record per client, from first lead to funded account.",
    lead: "Leads, KYC, accounts, money movement, partner attribution and support — navigable from a single rail.",
  },
  relatedProducts: ["traders-room", "back-office", "ib-affiliate"],
  relatedHubs: ["/platforms", "/infrastructure"],
  faq: [
    {
      question: "What does the FOREXAA CRM manage?",
      answer:
        "The whole client lifecycle: leads, registration and KYC, accounts, deposits and withdrawals, partner (IB) attribution, support and reporting — all in one system built around brokerage operations.",
    },
    {
      question: "Does it work with the trading platforms?",
      answer:
        "Yes. The CRM connects to MetaTrader 4/5, MT7 and cTrader, so a client's CRM record and their trading accounts stay in sync. The exact platform scope is confirmed for your deployment.",
    },
    {
      question: "Does it support partner / IB management?",
      answer:
        "It models your partner hierarchy, attributes activity to the right partner and calculates commission against that activity, with partner-visible reporting.",
    },
    {
      question: "Can existing broker infrastructure be integrated?",
      answer:
        "Where you already run infrastructure, the CRM is designed to connect to it rather than replace everything at once. Integration scope is confirmed per project.",
    },
  ],
  cta: {
    primary: "Build Your Brokerage",
    primaryHref: "/contact?intent=crm",
    secondary: "Explore the back office",
    secondaryHref: "/broker-technology/back-office",
    footer: "See how the FOREXAA CRM fits your brokerage.",
  },
  claimKeys: [],
  governance: {
    lastReviewedAt: "2026-09-30",
    contentOwner: "content@forexaa (TBD owner)",
    claimReviewState: "verified",
  },
};
