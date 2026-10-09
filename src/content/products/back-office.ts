import type { ProductContent } from "@/types/content";

/**
 * Back Office / Operations — the internal console. Operations-led: heavy on
 * workflow, synthetic admin interface clearly labeled.
 */
export const backOffice: ProductContent = {
  slug: "back-office",
  name: "Back Office",
  category: "back-office",
  tagline: "The operations console that runs your day-to-day.",
  eyebrow: "Broker Technology",
  title: "Run the whole operation from one console",
  lead: "The Back Office is where your teams do the work: approve clients, open accounts, move money, manage partners, monitor risk and answer support. It is the internal mirror of the Trader's Room your clients see.",
  overview: [
    "What it is: the internal operations console covering clients, accounts, transactions, KYC, partners, risk, reports and tickets.",
    "What it solves: brokers usually run operations across a CRM, an email inbox, a spreadsheet and a chat tool. The Back Office gives each workflow a home in one system.",
    "What makes it operational: it is built around the workflows your team repeats every day, so the common path is a handful of steps instead of a tour of tabs.",
  ],
  targetAudience: ["Operations teams", "Compliance & KYC", "Finance", "Support"],
  capabilities: [
    {
      group: "Clients & accounts",
      items: [
        "Client list with search, filters and full history",
        "Open, adjust and close accounts against records",
        "Per-client audit trail of who did what and when",
      ],
    },
    {
      group: "Transactions & KYC",
      items: [
        "Process deposits, withdrawals and adjustments",
        "Review and progress KYC queues to completion",
        "Escalate unusual items with context attached",
      ],
    },
    {
      group: "Partners & risk",
      items: [
        "Manage the IB/partner hierarchy and attribution",
        "Monitor exposure and utilisation across the book",
        "Apply limits and receive alerts when they are approached",
      ],
    },
    {
      group: "Reports & tickets",
      items: [
        "Operational reporting across clients, money and partners",
        "Support tickets tied to the client record",
        "Exports for finance, compliance and partners",
      ],
    },
  ],
  workflow: {
    title: "A typical operations day, one console",
    steps: [
      "Clients",
      "Accounts",
      "Transactions",
      "KYC",
      "Partners",
      "Risk",
      "Reports",
      "Tickets",
    ],
    note: "Each area is a first-class workflow, not a report about a spreadsheet.",
  },
  integrations: ["FOREXAA CRM", "Trader's Room", "Trading platforms", "Liquidity", "Payments"],
    scene: {
    eyebrow: "Inside the product",
    title: "Every operational queue in one console.",
    lead: "KYC review, payouts, exposure and tickets - routed to the right team with state visible at a glance.",
  },
  relatedProducts: ["crm", "ib-affiliate", "traders-room"],
  relatedHubs: ["/platforms", "/infrastructure"],
  faq: [
    {
      question: "What does the Back Office replace?",
      answer:
        "It consolidates the workflows that usually live in a CRM plus spreadsheets, email and separate tools: client and account administration, money movement, KYC, partner management, risk monitoring and support.",
    },
    {
      question: "Is it usable by a small team?",
      answer:
        "The console scales down as well as up. A small operations team can run a full launch with it; larger brokerages extend it across more teams and controls.",
    },
    {
      question: "How is risk monitored?",
      answer:
        "The Back Office exposes exposure and utilisation against the limits you set, with alerts as thresholds are approached. Risk depth is confirmed for your deployment.",
    },
  ],
  cta: {
    primary: "Build Your Brokerage",
    primaryHref: "/contact?intent=general",
    secondary: "Explore the CRM",
    secondaryHref: "/broker-technology/crm",
    footer: "Give your team one console instead of five tools.",
  },
  claimKeys: [],
  governance: {
    lastReviewedAt: "2026-09-30",
    contentOwner: "content@forexaa (TBD owner)",
    claimReviewState: "verified",
  },
};
