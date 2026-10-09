import type { ProductContent } from "@/types/content";

/**
 * Forex Liquidity. Architecture-led: the conceptual connectivity diagram is
 * the hero visual and is clearly labeled conceptual. No "deepest liquidity"
 * superlatives; no invented topology.
 */
export const liquidity: ProductContent = {
  slug: "liquidity",
  name: "Forex Liquidity",
  category: "liquidity",
  tagline: "The layer that turns platforms into a tradable book.",
  eyebrow: "Infrastructure",
  title: "Liquidity infrastructure for your brokerage",
  lead: "Liquidity is what makes a platform a business: it is the connection between your clients' orders and the sources of pricing and execution. The FOREXAA liquidity layer aggregates, prices and routes that flow across the platforms you run.",
  overview: [
    "What it is: the connectivity layer between your liquidity sources and your trading platforms — pricing, execution flow, aggregation and risk routing.",
    "What it solves: a brokerage that runs multiple platforms and multiple liquidity sources needs a consistent way to aggregate them, price them and route orders across them.",
    "What it does: connect your sources, aggregate the pricing, apply your risk and routing rules, and feed the platforms your clients trade on.",
  ],
  targetAudience: [
    "Multi-provider brokerages",
    "Brokers consolidating fragmented liquidity",
    "New brokerages standing up execution",
  ],
  capabilities: [
    {
      group: "Liquidity connectivity",
      items: [
        "Connect your liquidity sources to the platform layer",
        "Multiple sources behind one control plane",
        "Configured to your structure",
      ],
    },
    {
      group: "Pricing & aggregation",
      items: [
        "Aggregate pricing across your sources",
        "Apply your markup and spread rules",
        "Consistent pricing to every connected platform",
      ],
    },
    {
      group: "Execution & risk routing",
      items: [
        "Route orders against your risk settings",
        "Monitor execution quality across sources",
        "Failover and control where your rules require it",
      ],
    },
    {
      group: "Platform connectivity",
      items: [
        "Feed MT4, MT5, MT7 and cTrader from the same layer",
        "Keep execution consistent across platforms",
        "Integrate with your CRM and back office data",
      ],
    },
  ],
  workflow: {
    title: "How liquidity flow is structured (conceptual)",
    steps: [
      "Liquidity sources",
      "FOREXAA connectivity layer",
      "Pricing / aggregation",
      "Risk / routing",
      "MT4 · MT5 · MT7 · cTrader",
    ],
    note: "This is a conceptual diagram. Your exact topology is designed for your deployment.",
  },
  integrations: ["MetaTrader 4 / 5", "MT7", "cTrader", "FOREXAA CRM", "Back Office"],
    scene: {
    eyebrow: "Inside the product",
    title: "Where your liquidity is aggregated and routed.",
    lead: "Sources to aggregation to pricing to risk to execution, in the topology your deployment needs.",
  },
  relatedProducts: ["mt4-mt5", "mt7", "white-label"],
  relatedHubs: ["/platforms", "/broker-technology"],
  faq: [
    {
      question: "Which liquidity sources can we connect?",
      answer:
        "Your sources depend on your structure and agreements. The layer is built to aggregate multiple sources; the exact providers are confirmed during scoping.",
    },
    {
      question: "Do you claim 'deepest liquidity'?",
      answer:
        "No. We describe what the layer does — aggregate, price, route and monitor — and we do not make unverified superlatives about depth.",
    },
    {
      question: "How does risk routing work?",
      answer:
        "Orders are routed against the risk and control settings you define, with monitoring across your sources. The depth of that control is confirmed for your deployment.",
    },
  ],
  cta: {
    primary: "Build Your Brokerage",
    primaryHref: "/contact?intent=liquidity",
    secondary: "Explore the platforms it feeds",
    secondaryHref: "/platforms",
    footer: "Discuss your liquidity architecture with the team.",
  },
  claimKeys: [],
  governance: {
    lastReviewedAt: "2026-09-30",
    contentOwner: "content@forexaa (TBD owner)",
    claimReviewState: "verified",
  },
};
