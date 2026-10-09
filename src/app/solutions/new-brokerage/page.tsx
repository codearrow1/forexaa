import { buildPageSeo, getRoute } from "@/lib/seo/page-meta";
import { JsonLdGraph } from "@/components/shared/json-ld";
import { SolutionPage } from "@/components/templates/solution-page";
import { BrokerageStackBuilder } from "@/components/product/stack-builder";

const route = getRoute("/solutions/new-brokerage");
const seo = buildPageSeo(route);
export const metadata = seo.metadata;

/**
 * /solutions/new-brokerage — "Build the technology foundation for a new brokerage."
 *
 * Story: A brokerage being constructed in front of the visitor. The
 * BrokerageStackBuilder lets them assemble their stack conceptually.
 */
export default function NewBrokeragePage() {
  return (
    <>
      <JsonLdGraph nodes={seo.jsonLd} />
      <SolutionPage
        path="/solutions/new-brokerage"
        eyebrow="New Brokerage"
        title="Build the technology foundation for your brokerage"
        lead="Launching a brokerage means assembling the right technology stack from day one. FOREXAA gives you the platform, CRM, liquidity, payments, and compliance tools — connected from the start, not bolted on later."
        situation={{
          heading: "You have a brokerage idea. Now you need the technology to run it.",
          body: "Most new brokers piece together a platform from one vendor, a CRM from another, and payments from a third — then spend months wiring them together. FOREXAA is the connected alternative: every component designed to work as one system, so you can focus on your clients, not your integration backlog.",
        }}
        stack={[
          {
            label: "Foundation",
            items: ["Business model definition", "Regulatory context", "Brand identity"],
          },
          {
            label: "Trading",
            items: ["MetaTrader 4 / 5", "MT7 / MobiusTrader", "cTrader"],
          },
          {
            label: "Operations",
            items: ["FOREXAA CRM", "Back Office", "Trader's Room"],
          },
          {
            label: "Infrastructure",
            items: ["Liquidity aggregation", "Payments rails", "Risk management"],
          },
          {
            label: "Growth",
            items: ["IB / Affiliate system", "Social trading", "Analytics"],
          },
        ]}
        howItWorks={{
          title: "From business model to a connected brokerage stack",
          steps: [
            "Business Model",
            "Brand",
            "Trading Platform",
            "CRM",
            "Trader's Room",
            "Liquidity",
            "Payments",
            "Compliance",
            "Launch",
          ],
          note: "Each step is scoped to your structure — the plan is confirmed before it runs.",
        }}
        components={[
          { name: "Trading Platform", description: "Your choice across MetaTrader 4/5, MT7, and cTrader — deployed under your brand." },
          { name: "FOREXAA CRM", description: "The client lifecycle system: leads, registration, KYC, accounts, finance, and support." },
          { name: "Trader's Room", description: "Your clients' portal: accounts, balances, money movement, documents, and platform access." },
          { name: "Back Office", description: "The operations console: clients, accounts, transactions, partners, risk, and reports." },
          { name: "IB / Affiliate", description: "Your partner network: hierarchy, attribution, commission, and partner-visible reporting." },
        ]}
        journey={[
          "Discovery & scope",
          "Stack selection",
          "Environment build",
          "Integrations & data",
          "Branding & portal",
          "Testing & training",
          "Go-live",
          "Handover",
        ]}
        addOns={[
          "Social & Copy Trading",
          "PAMM / MAM allocation",
          "Custom development",
          "Migration assistance",
          "Ongoing support",
        ]}
        whoItFits={[
          "Founders launching their first brokerage",
          "Operators who want one connected stack from day one",
          "Groups planning multiple brands",
          "Teams who value implementation speed over DIY assembly",
        ]}
        faq={[
          {
            question: "Can I start with just the CRM and add a platform later?",
            answer:
              "Yes. The FOREXAA CRM can run alongside the platform you already use, and you can add a white-label trading platform when you're ready. The architecture is designed to connect, not replace everything at once.",
          },
          {
            question: "How long does a new brokerage deployment take?",
            answer:
              "We do not publish a fixed timeline. The duration depends on your platform choice, integration scope, and compliance work — it is confirmed in your plan.",
          },
          {
            question: "Do you help with licensing and jurisdiction selection?",
            answer:
              "Legal and compliance support is available through licensed partners. We help you understand the landscape; your entity and its obligations remain your responsibility.",
          },
        ]}
        cta={{
          primary: "Build Your Brokerage",
          primaryHref: "/contact?intent=white-label",
          secondary: "Build Your Stack",
          secondaryHref: "#stack-builder",
        }}
        ctaHeading="Plan Your Brokerage Launch"
        visual={<BrokerageStackBuilder />}
        visualAnchorId="stack-builder"
      />
    </>
  );
}
