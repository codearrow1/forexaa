import type { ProductContent } from "@/types/content";

/**
 * White Label service. Commercial page. Workflow-led: what you get, in what
 * order. No implementation times or commercial terms (Rule 30).
 */
export const whiteLabel: ProductContent = {
  slug: "white-label",
  name: "White Label",
  category: "white-label",
  tagline: "A brokerage under your name, on connected technology.",
  eyebrow: "Services",
  title: "Launch a brokerage that carries your name",
  lead: "White label means you operate a brokerage branded as yours, on underlying technology you do not build yourself. You keep the client relationship and the brand; the platform, CRM, liquidity and operations run underneath.",
  overview: [
    "What white-label brokerage means: a branded trading and operations experience for your clients, delivered on infrastructure you do not have to build from scratch.",
    "What FOREXAA provides: the trading platform, the CRM, the client experience (Trader's Room), the operational back office, and the liquidity and payments connectivity that make it all work.",
    "How it's implemented: as a configured deployment around your structure, your brands and your trading conditions — not a product you assemble from parts.",
  ],
  targetAudience: [
    "Founders launching a first brokerage",
    "Operators rebranding onto their own name",
    "Groups running multiple brands",
  ],
  capabilities: [
    {
      group: "What a white-label deployment includes",
      items: [
        "A trading platform under your brand",
        "The CRM and back office that run your operation",
        "A client-facing Trader's Room in your identity",
        "Liquidity and payments connectivity",
      ],
    },
    {
      group: "Trading platform",
      items: [
        "Your choice across MetaTrader 4/5, MT7, cTrader",
        "Your trading conditions and account types",
        "A familiar or a modern terminal, per your clients",
      ],
    },
    {
      group: "Branding & client experience",
      items: [
        "Your identity across the client experience",
        "Your domain and communications",
        "A client portal that feels like yours, not a reseller's",
      ],
    },
    {
      group: "Operations & integration",
      items: [
        "Client, money and partner workflows in one system",
        "Connectivity to the infrastructure you already run",
        "Migration paths for an existing operation",
      ],
    },
  ],
  workflow: {
    title: "From decision to a branded brokerage",
    steps: [
      "Business model",
      "Platform",
      "CRM",
      "Liquidity",
      "Payments",
      "Compliance",
      "Branding",
      "Launch",
    ],
    note: "Each step is scoped to your structure; we confirm the plan before it runs.",
  },
  integrations: [
    "MetaTrader 4 / 5",
    "MT7",
    "cTrader",
    "FOREXAA CRM",
    "Back Office",
    "Trader's Room",
    "Liquidity",
    "Payments",
  ],
    scene: {
    eyebrow: "Inside the product",
    title: "Your brand across every layer of the stack.",
    lead: "Platform, portal, CRM and reporting - the FOREXAA system wearing your identity.",
  },
  relatedProducts: ["mt4-mt5", "crm", "liquidity"],
  relatedHubs: ["/platforms", "/infrastructure", "/pricing"],
  faq: [
    {
      question: "What does 'white label' actually mean here?",
      answer:
        "It means the brokerage runs under your brand and domain experience, on technology you do not build. You keep the client relationship; the platform and infrastructure sit underneath.",
    },
    {
      question: "How long does implementation take?",
      answer:
        "We do not publish a fixed timeline. The duration depends on your platform choice, integration scope and compliance work; it is confirmed in your plan.",
    },
    {
      question: "Can an existing broker migrate, or is this new-launch only?",
      answer:
        "Both. New launches and migrations of an existing operation are supported; the migration path is scoped to what you run today.",
    },
  ],
  cta: {
    primary: "Build Your Brokerage",
    primaryHref: "/contact?intent=white-label",
    secondary: "See how pricing works",
    secondaryHref: "/pricing",
    footer: "Plan your brokerage launch with the team.",
  },
  claimKeys: [],
  governance: {
    lastReviewedAt: "2026-09-30",
    contentOwner: "content@forexaa (TBD owner)",
    claimReviewState: "verified",
  },
};
