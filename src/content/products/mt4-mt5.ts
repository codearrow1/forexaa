import type { ProductContent } from "@/types/content";

/**
 * MT4 / MT5 platform page. Factual, white-label brokerage deployment focus.
 * No MetaQuotes partnership claim, no market-share claim (Rule 22).
 */
export const mt4Mt5: ProductContent = {
  slug: "mt4-mt5",
  name: "MetaTrader 4 / 5",
  category: "platform",
  tagline: "The most common starting point for a forex brokerage.",
  eyebrow: "Platforms",
  title: "Launch a brokerage on MetaTrader 4 or 5",
  lead: "MetaTrader 4 and 5 are the platforms most retail and institutional clients already know. FOREXAA connects them to your CRM, back office and liquidity, so you can offer a familiar trading experience on modern infrastructure.",
  overview: [
    "What it is: white-label deployment of MetaTrader 4 or 5 for your brokerage, wired into the FOREXAA operational stack.",
    "What it solves: running MetaTrader means owning a lot of glue — CRM, money, partners, risk. FOREXAA is that glue, so the platform does what it does best and everything around it stays connected.",
    "What's in scope: your branded trading environment, broker operations, the CRM relationship, back office, liquidity connectivity and customization.",
  ],
  targetAudience: [
    "Brokers whose clients expect MetaTrader",
    "New brokerages choosing a first platform",
    "Existing MT brokers standardizing operations",
  ],
  capabilities: [
    {
      group: "White-label deployment",
      items: [
        "Your brand on the trading experience",
        "Your trading conditions and account types",
        "Deployment configured to your structure",
      ],
    },
    {
      group: "Trading environment",
      items: [
        "The charting, order types and automation your clients know",
        "Demo and live account types",
        "The ecosystem of tools traders expect",
      ],
    },
    {
      group: "Broker operations",
      items: [
        "Accounts, money and clients managed in the FOREXAA back office",
        "CRM records stay in sync with platform accounts",
        "Partners and IBs attributed against real activity",
      ],
    },
    {
      group: "Connectivity",
      items: [
        "Liquidity connectivity into the platform",
        "API and integration points for your systems",
        "Customization where your operation needs it",
      ],
    },
  ],
  integrations: ["FOREXAA CRM", "Back Office", "Trader's Room", "Liquidity", "Payments"],
    scene: {
    eyebrow: "Inside the product",
    title: "MetaTrader deployment, wired into the rest of the stack.",
    lead: "Servers, accounts, branding and CRM sync - configured for your operation.",
  },
  relatedProducts: ["crm", "liquidity", "white-label"],
  relatedHubs: ["/infrastructure", "/services"],
  faq: [
    {
      question: "Do we bring the MetaTrader license or is it included?",
      answer:
        "The licensing model depends on your deployment. Bring-your-own-license and managed options are both scoped during a conversation with the team — it is confirmed, not assumed.",
    },
    {
      question: "Can clients keep using the tools they know?",
      answer:
        "Yes. MetaTrader 4 and 5 preserve the trading environment, charting and automation ecosystem traders are used to. What changes is the operational infrastructure behind it.",
    },
    {
      question: "How does the CRM connect to MetaTrader?",
      answer:
        "Platform accounts and activity are reflected in the FOREXAA CRM and back office, so client records, money and partners stay in sync with the trading side.",
    },
  ],
  cta: {
    primary: "Build Your Brokerage",
    primaryHref: "/contact?intent=platform",
    secondary: "Compare Platforms",
    secondaryHref: "/platforms",
    footer: "Run the platform your clients know on infrastructure that stays in sync.",
  },
  claimKeys: [],
  governance: {
    lastReviewedAt: "2026-09-30",
    contentOwner: "content@forexaa (TBD owner)",
    claimReviewState: "verified",
  },
};
