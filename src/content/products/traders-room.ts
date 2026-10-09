import type { ProductContent } from "@/types/content";

/**
 * Trader's Room — the client-facing portal. Operations-led layout: a
 * synthetic client-portal visual, clearly labeled illustrative.
 */
export const tradersRoom: ProductContent = {
  slug: "traders-room",
  name: "Trader's Room",
  category: "traders-room",
  tagline: "The branded portal your clients use for everything but the chart.",
  eyebrow: "Broker Technology",
  title: "One branded portal for every client need",
  lead: "The Trader's Room is where your clients manage everything that surrounds trading: registration, onboarding, accounts, balances, money movement, documents and support — under your brand, not a third-party portal.",
  overview: [
    "What it is: a client-facing portal covering the full non-trading surface of your brokerage.",
    "What it solves: most brokers stitch together a login, a document store, a help desk and separate money pages. The Trader's Room unifies that experience so clients have one place.",
    "What's in it: registration and onboarding, account access and switching, balances, deposits and withdrawals, documents and profile, and direct access into the connected trading platform.",
  ],
  targetAudience: [
    "Brokers launching their first branded portal",
    "Existing brokers retiring fragmented client areas",
  ],
  capabilities: [
    {
      group: "Onboarding",
      items: [
        "Guided registration and document collection",
        "KYC status visible to the client at each step",
        "Progress and next-step prompts, not a black box",
      ],
    },
    {
      group: "Accounts",
      items: [
        "View all accounts, balances and P&L at a glance",
        "Switch between account types without re-login",
        "Deep link straight into the connected trading platform",
      ],
    },
    {
      group: "Money",
      items: [
        "Request deposits and withdrawals from the portal",
        "Transaction history with clear statuses",
        "Payment-rail availability confirmed for your deployment",
      ],
    },
    {
      group: "Documents & profile",
      items: [
        "Store and retrieve contracts, statements and identity documents",
        "Keep contact and profile details current",
        "Audit-safe access to the documents a client owns",
      ],
    },
  ],
  integrations: ["FOREXAA CRM", "Back Office", "MetaTrader 4 / 5", "MT7", "cTrader", "Payments"],
    scene: {
    eyebrow: "Inside the product",
    title: "What your client sees after they sign up.",
    lead: "Accounts, funding, documents and support - under your brand, on the record the CRM already holds.",
  },
  relatedProducts: ["crm", "back-office"],
  relatedHubs: ["/platforms", "/infrastructure"],
  faq: [
    {
      question: "What can a client do in the Trader's Room?",
      answer:
        "Register and complete onboarding, view accounts, balances and P&L, request deposits and withdrawals, manage documents and profile, and go straight into their trading platform.",
    },
    {
      question: "Which payment methods are available to clients?",
      answer:
        "The rails your clients can use depend on your deployment and jurisdiction. What's available is confirmed during scoping — we do not state a fixed list.",
    },
    {
      question: "Is the portal branded to our company?",
      answer:
        "Yes. The Trader's Room runs under your brand and domain experience, not a third-party portal identity.",
    },
  ],
  cta: {
    primary: "Build Your Brokerage",
    primaryHref: "/contact?intent=general",
    secondary: "See the trading platforms",
    secondaryHref: "/platforms",
    footer: "Show your clients a portal that actually works.",
  },
  claimKeys: [],
  governance: {
    lastReviewedAt: "2026-09-30",
    contentOwner: "content@forexaa (TBD owner)",
    claimReviewState: "verified",
  },
};
