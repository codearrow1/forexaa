import { buildPageSeo, getRoute } from "@/lib/seo/page-meta";
import { JsonLdGraph } from "@/components/shared/json-ld";
import { SolutionPage } from "@/components/templates/solution-page";
import { ExistingBrokerVisual } from "@/components/product/solution-visuals";

const route = getRoute("/solutions/existing-broker");
const seo = buildPageSeo(route);
export const metadata = seo.metadata;

/**
 * /solutions/existing-broker — "Improve the technology around your existing brokerage."
 *
 * Story: Before → Connect → Improve. Focus on migration, integration,
 * replacing individual components, and adding CRM/partner systems.
 */
export default function ExistingBrokerPage() {
  return (
    <>
      <JsonLdGraph nodes={seo.jsonLd} />
      <SolutionPage
        path="/solutions/existing-broker"
        eyebrow="Existing Brokerage"
        title="Modernize the technology around your brokerage"
        lead="You already run a brokerage — your clients are trading, your team is operating. The question is whether your technology is helping or holding you back. FOREXAA connects to your existing infrastructure and improves it piece by piece, without a full rebuild."
        situation={{
          heading: "Your brokerage works. Your technology could work better.",
          body: "Most established brokers run a patchwork: a platform from one vendor, a CRM from another, spreadsheets for partners, and a support inbox. FOREXAA is designed to connect to what you already run — replacing individual components or adding the missing ones, so your operation gets stronger without standing still.",
        }}
        stack={[
          {
            label: "Assessment",
            items: ["Current infrastructure audit", "Gap identification", "Integration mapping"],
          },
          {
            label: "Connect",
            items: ["API integration", "Data migration", "Platform linking"],
          },
          {
            label: "Improve",
            items: ["CRM deployment", "Partner system", "Client experience"],
          },
          {
            label: "Expand",
            items: ["New products", "New markets", "New platforms"],
          },
        ]}
        howItWorks={{
          title: "From existing infrastructure to a connected operation",
          steps: [
            "Existing Infrastructure",
            "Identify Gaps",
            "Integrate FOREXAA",
            "Migrate / Connect",
            "Improve Operations",
            "Expand Products",
          ],
          note: "Migration scope is confirmed per project — we do not imply migration is always risk-free or instant.",
        }}
        components={[
          { name: "FOREXAA CRM", description: "Add a broker-focused CRM that connects to your existing platform accounts." },
          { name: "IB / Affiliate", description: "Add a partner system with hierarchy, attribution, and commission tracking." },
          { name: "Trader's Room", description: "Upgrade your client portal to a branded, connected experience." },
          { name: "Back Office", description: "Consolidate operations into one console — clients, accounts, money, partners." },
          { name: "Risk Tools", description: "Add real-time exposure monitoring and automated alerts." },
        ]}
        journey={[
          "Assessment",
          "Gap analysis",
          "Integration plan",
          "Phased connection",
          "Team enablement",
          "Optimization",
          "Expansion",
        ]}
        addOns={[
          "Social & Copy Trading",
          "PAMM / MAM allocation",
          "Custom development",
          "Priority support",
        ]}
        whoItFits={[
          "Established brokers modernizing their stack",
          "Operators replacing a single component",
          "Brokers adding CRM or partner systems",
          "Firms expanding into new products or markets",
        ]}
        faq={[
          {
            question: "Can FOREXAA connect to the platform we already run?",
            answer:
              "Yes. The architecture is designed to connect to existing operations via APIs and integration points. The exact scope is confirmed per project.",
          },
          {
            question: "Do we need to migrate everything at once?",
            answer:
              "No. You can adopt individual components — CRM, partner system, client portal — and connect them to what you already run. Migration is phased and scoped to your needs.",
          },
          {
            question: "Is migration risk-free?",
            answer:
              "No migration is risk-free. We scope carefully, plan for your operation, and confirm the approach before anything moves. Your brokerage keeps running through the transition.",
          },
        ]}
        cta={{
          primary: "Build Your Brokerage",
          primaryHref: "/contact?intent=existing-broker",
          secondary: "Explore the CRM",
          secondaryHref: "/broker-technology/crm",
        }}
        ctaHeading="Discuss Your Stack"
        visual={<ExistingBrokerVisual />}
      />
    </>
  );
}
