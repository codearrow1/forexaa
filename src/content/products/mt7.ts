import type { ProductContent } from "@/types/content";

/**
 * MT7 / MobiusTrader. Explains what MT7 is in the FOREXAA ecosystem and the
 * intended broker use. No copying of legacy wording; no unverified specs
 * (leverage, pips, trader counts are all gated in the claims registry).
 */
export const mt7: ProductContent = {
  slug: "mt7",
  name: "MobiusTrader 7 (MT7)",
  category: "platform",
  tagline: "A next-generation multi-market terminal for your clients.",
  eyebrow: "Platforms",
  title: "Offer clients a next-generation trading terminal",
  lead: "MobiusTrader 7 is a modern trading platform that combines multi-market access, fast order execution and social trading in one terminal. In the FOREXAA ecosystem it is one of the platforms you can deploy alongside your CRM and liquidity.",
  overview: [
    "What MT7 is in the FOREXAA ecosystem: a white-label trading platform you deploy for your clients, connected to the same CRM, back office and liquidity as the rest of the stack.",
    "Intended broker use: multi-market FX/CFD brokerages that want a newer terminal experience, including clients who trade across markets from one place.",
    "What the broker operates: account management, the trading workflow, platform capabilities, social features where enabled in your deployment, and integrations.",
  ],
  targetAudience: [
    "Multi-market brokerages",
    "Brokers offering a newer terminal experience",
    "Brokers adding social trading",
  ],
  capabilities: [
    {
      group: "Trading workflow",
      items: [
        "A modern terminal with fast order entry",
        "Multiple markets from one terminal",
        "Web, desktop and mobile access",
      ],
    },
    {
      group: "Account management",
      items: [
        "Demo and live accounts under your brand",
        "Balances and position visibility for clients",
        "Consistent experience across devices",
      ],
    },
    {
      group: "Social capability",
      items: [
        "Strategy visibility and copy-style flows where enabled",
        "Works together with the PAMM / MAM model",
        "Scope confirmed for your deployment",
      ],
    },
    {
      group: "White-label & integrations",
      items: [
        "Your branding across the terminal",
        "Connects to the FOREXAA CRM and back office",
        "Liquidity and API connectivity into your stack",
      ],
    },
  ],
  integrations: ["FOREXAA CRM", "Back Office", "Trader's Room", "Liquidity", "PAMM / MAM"],
    scene: {
    eyebrow: "Inside the product",
    title: "The MobiusTrader 7 terminal, connected end to end.",
    lead: "Multi-market access, social features where enabled, and CRM sync on the same client record.",
  },
  relatedProducts: ["social-copy", "liquidity", "white-label"],
  relatedHubs: ["/platforms", "/infrastructure"],
  faq: [
    {
      question: "What can MT7 do that MT4/5 does not?",
      answer:
        "MT7 is a newer multi-market terminal with a modern experience and built-in social capability. The exact feature set available to you is confirmed for your deployment; we describe it factually rather than marketing a delta.",
    },
    {
      question: "Does it support social trading?",
      answer:
        "Social capability is part of the platform and can be enabled as part of your deployment, alongside the PAMM/MAM model. The scope is confirmed when we scope your build.",
    },
    {
      question: "What leverage can we offer?",
      answer:
        "Leverage is set by your structure and regulatory context. We do not state a fixed maximum on this page; it is confirmed during implementation.",
    },
  ],
  cta: {
    primary: "Build Your Brokerage",
    primaryHref: "/contact?intent=platform",
    secondary: "See social & copy trading",
    secondaryHref: "/solutions/social-copy",
    footer: "Give clients a terminal that matches where the market is moving.",
  },
  claimKeys: [],
  governance: {
    lastReviewedAt: "2026-09-30",
    contentOwner: "content@forexaa (TBD owner)",
    claimReviewState: "verified",
  },
};
