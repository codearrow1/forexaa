import type { ProductContent } from "@/types/content";

/**
 * cTrader. Uses only general, well-known cTrader facts + FOREXAA
 * integration concepts. No invented licensing terms, times or capabilities
 * (Rule 24).
 */
export const ctrader: ProductContent = {
  slug: "ctrader",
  name: "cTrader",
  category: "platform",
  tagline: "Institutional-grade trading, connected to your operation.",
  eyebrow: "Platforms",
  title: "Offer cTrader-based trading on FOREXAA infrastructure",
  lead: "cTrader is a trading platform known for a clean, institutional feel, level II market depth and strong automation. FOREXAA connects it to your CRM, back office and liquidity so it runs as part of your operation rather than a silo.",
  overview: [
    "What it is: cTrader as a deployable trading platform within the FOREXAA white-label stack.",
    "What it's known for: a modern trading interface, deep market data, and an automation ecosystem traders use for strategy work.",
    "What FOREXAA adds: the operational layer — CRM, back office, partner management and liquidity — around the platform.",
  ],
  targetAudience: [
    "Brokers positioning as institutional-grade",
    "Firms offering advanced market data",
    "Brokers that want a modern terminal",
  ],
  capabilities: [
    {
      group: "Trading experience",
      items: [
        "A clean, professional trading interface",
        "Market depth and data that serious traders expect",
        "Demo and live account types",
      ],
    },
    {
      group: "Automation",
      items: [
        "A platform traders use for strategy and automation",
        "Fits brokerages that serve more advanced clients",
        "Scope confirmed for your deployment",
      ],
    },
    {
      group: "White-label & operations",
      items: [
        "Run cTrader under your brand",
        "CRM and back office stay in sync with platform accounts",
        "Liquidity and API connectivity into your stack",
      ],
    },
  ],
  integrations: ["FOREXAA CRM", "Back Office", "Trader's Room", "Liquidity"],
    scene: {
    eyebrow: "Inside the product",
    title: "A terminal view your clients will recognise.",
    lead: "Watchlist, depth and chart layout connected to your accounts, branding and liquidity.",
  },
  relatedProducts: ["liquidity", "white-label", "mt4-mt5"],
  relatedHubs: ["/platforms", "/infrastructure"],
  faq: [
    {
      question: "Is cTrader licensing included?",
      answer:
        "Licensing and commercial terms are confirmed during scoping. We do not state cTrader terms on this page because they depend on your agreement and deployment.",
    },
    {
      question: "Which clients suit cTrader?",
      answer:
        "It suits brokerages serving clients who want a modern, institutional-grade interface and deeper market data. The right choice depends on your client base.",
    },
    {
      question: "Does it connect to the FOREXAA CRM?",
      answer:
        "Yes. Platform accounts and activity connect to the FOREXAA CRM and back office, keeping client records, money and partners in sync.",
    },
  ],
  cta: {
    primary: "Build Your Brokerage",
    primaryHref: "/contact?intent=platform",
    secondary: "Compare Platforms",
    secondaryHref: "/platforms",
    footer: "Put a serious terminal in front of your clients, on your infrastructure.",
  },
  claimKeys: [],
  governance: {
    lastReviewedAt: "2026-09-30",
    contentOwner: "content@forexaa (TBD owner)",
    claimReviewState: "verified",
  },
};
