import type { ProductContent } from "@/types/content";

/**
 * IB / Affiliate — partner system. Concept-led: the hierarchy diagram is the
 * hero visual. No claims about max hierarchy depth or payout structures.
 */
export const ibAffiliate: ProductContent = {
  slug: "ib-affiliate",
  name: "IB / Affiliate",
  category: "ib-affiliate",
  tagline: "Run your partner network with attribution you can audit.",
  eyebrow: "Broker Technology",
  title: "The partner system behind your revenue",
  lead: "Introducing brokers and affiliates are how many brokerages grow. The IB / Affiliate system models your partner hierarchy, attributes trading activity to the right partner, and calculates commission against that activity — with reporting your partners can trust.",
  overview: [
    "What it is: the partner-management layer of the platform: onboarding, hierarchy, attribution, commission and partner reporting.",
    "What it solves: partner programs that run on spreadsheets break the moment the hierarchy deepens or attribution gets disputed. A system that owns the model keeps it auditable.",
    "How it works: partners are organized in a hierarchy; each trader is attributed to a partner; commission is calculated on the activity that partner drives; partners see their own numbers.",
  ],
  targetAudience: ["Brokerages with an IB program", "Prop firms funding partners", "Multibrand groups"],
  capabilities: [
    {
      group: "Partner onboarding",
      items: [
        "Add partners with their agreement and commission model",
        "Onboard them into their own reporting view",
        "Keep partner records alongside the clients they bring",
      ],
    },
    {
      group: "Referral structure",
      items: [
        "Model the hierarchy that suits your program",
        "Attribute each trader to the partner who referred them",
        "Re-attribute cleanly when ownership changes",
      ],
    },
    {
      group: "Commission",
      items: [
        "Calculate commission against attributed activity",
        "Track accrued vs. paid amounts per partner",
        "Run payouts on your cycle with full audit history",
      ],
    },
    {
      group: "Partner visibility",
      items: [
        "Partners see the numbers that affect them",
        "Transparent reporting reduces disputes",
        "You keep full control of what is visible",
      ],
    },
  ],
  workflow: {
    title: "How a partner network is modeled",
    steps: ["Broker", "Master Partner", "Partner A / Partner B", "Attributed traders"],
    note:
      "The structure and the commission rules are yours to define; the system holds the model so it stays consistent.",
  },
  integrations: ["FOREXAA CRM", "Back Office", "Trading platforms"],
    scene: {
    eyebrow: "Inside the product",
    title: "Partner hierarchy, attribution and commission - visible.",
    lead: "From broker down to individual referral: every relationship and the activity it drives in one tree.",
  },
  relatedProducts: ["crm", "back-office"],
  relatedHubs: ["/platforms", "/solutions"],
  faq: [
    {
      question: "How deep can the partner hierarchy be?",
      answer:
        "The depth and the commission rules of your hierarchy are defined by your program. We do not state a fixed maximum; the structure is confirmed during implementation.",
    },
    {
      question: "How is commission calculated?",
      answer:
        "Commission is calculated against the trading activity attributed to each partner, on the schedule and rules you define. Partners see the figures that affect them.",
    },
    {
      question: "Can partners see their own reporting?",
      answer:
        "Yes. Each partner has a view of the numbers that affect them — referrals, activity and commission — which reduces disputes and support load.",
    },
  ],
  cta: {
    primary: "Build Your Brokerage",
    primaryHref: "/contact?intent=general",
    secondary: "Explore the back office",
    secondaryHref: "/broker-technology/back-office",
    footer: "Run a partner program you can actually audit.",
  },
  claimKeys: [],
  governance: {
    lastReviewedAt: "2026-09-30",
    contentOwner: "content@forexaa (TBD owner)",
    claimReviewState: "verified",
  },
};
