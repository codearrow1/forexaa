import type { ProductContent } from "@/types/content";

/**
 * Social / Copy / PAMM / MAM hub. One meaningful page that explains the four
 * concepts and how they relate — not four near-identical pages (Rule 31).
 */
export const socialCopy: ProductContent = {
  slug: "social-copy",
  name: "Social & Copy Trading",
  category: "social",
  tagline: "Strategy sharing, allocation and managed portfolios, branded.",
  eyebrow: "Solutions",
  title: "Social, copy, PAMM and MAM trading",
  lead: "These are four related ways clients can follow or pool money behind strategy. Social trading is visibility, copy trading is automated following, PAMM is pooled allocation, and MAM is segregated management. They build on each other.",
  overview: [
    "What this page is: the relationship between the four concepts, so you can choose the model that fits your clients and your operation.",
    "What each one is, in one line: social = traders see strategies; copy = a client's orders mirror a strategy; PAMM = pooled funds allocated by percentage; MAM = a manager running segregated accounts.",
    "What FOREXAA does with them: they run on the platforms in your deployment, with allocation, commission and performance tracking built in.",
  ],
  targetAudience: [
    "Brokers adding social features",
    "Brokers offering managed portfolios",
    "Prop firms running evaluation + funding",
  ],
  capabilities: [
    {
      group: "Social trading",
      items: [
        "Clients see live strategies and their performance",
        "A branded feed of what is available to follow",
        "Discovery and trust signals built in",
      ],
    },
    {
      group: "Copy trading",
      items: [
        "A client's orders mirror a chosen strategy",
        "Sizing follows the client's capital, not the master's",
        "Start, pause and stop control per copy",
      ],
    },
    {
      group: "PAMM",
      items: [
        "Pooled funds managed by a strategy manager",
        "Allocation by percentage of the pool",
        "Commission and profit sharing tracked",
      ],
    },
    {
      group: "MAM",
      items: [
        "A manager runs segregated client accounts",
        "Allocation across accounts without pooling",
        "Performance and risk visible per account",
      ],
    },
  ],
  integrations: ["MetaTrader 4 / 5", "MT7", "cTrader", "FOREXAA CRM", "Back Office"],
    scene: {
    eyebrow: "Inside the product",
    title: "Strategies, allocation and commission in one panel.",
    lead: "Social, copy, PAMM and MAM - how each model allocates and what it earns, side by side.",
  },
  relatedProducts: ["mt7", "mt4-mt5", "crm"],
  relatedHubs: ["/platforms", "/broker-technology"],
  faq: [
    {
      question: "What's the difference between PAMM and MAM?",
      answer:
        "PAMM pools investor funds and allocates by percentage; MAM keeps accounts segregated and a manager allocates across them. PAMM is a shared pool, MAM is one manager running many accounts.",
    },
    {
      question: "How does copy trading work?",
      answer:
        "A client chooses a strategy and their orders mirror it, scaled to their own capital. They control when they follow, and can stop at any time.",
    },
    {
      question: "Is this a separate product or part of the platforms?",
      answer:
        "It runs on the platforms in your deployment. The capability is enabled and configured per deployment; the scope is confirmed when we scope your build.",
    },
  ],
  cta: {
    primary: "Build Your Brokerage",
    primaryHref: "/contact?intent=platform",
    secondary: "See the platforms it runs on",
    secondaryHref: "/platforms",
    footer: "Add strategy sharing to the platforms your clients already use.",
  },
  claimKeys: [],
  governance: {
    lastReviewedAt: "2026-09-30",
    contentOwner: "content@forexaa (TBD owner)",
    claimReviewState: "verified",
  },
};
