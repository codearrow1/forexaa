import { buildPageSeo, getRoute } from "@/lib/seo/page-meta";
import { JsonLdGraph } from "@/components/shared/json-ld";
import { SolutionPage } from "@/components/templates/solution-page";
import { PropFirmVisual } from "@/components/product/solution-visuals";

const route = getRoute("/solutions/prop-firm");
const seo = buildPageSeo(route);
export const metadata = seo.metadata;

/**
 * /solutions/prop-firm — "Run a prop-trading business."
 *
 * Story: Trader Acquisition → Challenge → Risk Rules → Trading Platform →
 * Trader Dashboard → Monitoring → Profit/Payout Workflow → Scaling.
 */
export default function PropFirmPage() {
  return (
    <>
      <JsonLdGraph nodes={seo.jsonLd} />
      <SolutionPage
        path="/solutions/prop-firm"
        eyebrow="Prop Firm"
        title="Run a prop-trading business on connected technology"
        lead="Prop firms need more than a trading platform — they need challenge workflows, risk rules, trader monitoring, and profit/payout operations. FOREXAA provides the CRM, platform connectivity, and risk tooling to run a prop business end to end."
        situation={{
          heading: "You want to run a prop firm — not just sell a platform.",
          body: "Prop trading is a specific business model: trader acquisition, challenge evaluation, risk enforcement, and profit distribution. FOREXAA gives you the operational stack to run it — CRM for trader lifecycle, platform for trading, risk for enforcement, and back office for payouts.",
        }}
        stack={[
          {
            label: "Acquisition",
            items: ["Trader onboarding", "Challenge sales", "Marketing funnel"],
          },
          {
            label: "Challenge",
            items: ["Challenge rules", "Evaluation workflow", "Progress tracking"],
          },
          {
            label: "Trading",
            items: ["MetaTrader 4 / 5", "MT7 / MobiusTrader", "cTrader"],
          },
          {
            label: "Risk",
            items: ["Exposure limits", "Drawdown rules", "Automated enforcement"],
          },
          {
            label: "Operations",
            items: ["Trader dashboard", "Monitoring", "Profit / payout workflow"],
          },
        ]}
        howItWorks={{
          title: "From trader acquisition to payout",
          steps: [
            "Trader Acquisition",
            "Challenge",
            "Risk Rules",
            "Trading Platform",
            "Trader Dashboard",
            "Monitoring",
            "Profit / Payout",
            "Scaling",
          ],
          note: "The exact workflow is configured to your challenge rules and business model.",
        }}
        components={[
          { name: "FOREXAA CRM", description: "Trader lifecycle: onboarding, challenge progress, communication, and account management." },
          { name: "Trading Platform", description: "MT4/MT5, MT7, or cTrader — where your traders trade." },
          { name: "Risk Rules", description: "Exposure limits, drawdown rules, and automated enforcement across all trader accounts." },
          { name: "Trader Dashboard", description: "Traders see their challenge progress, P&L, and account status in one place." },
          { name: "Back Office", description: "Monitor all traders, manage payouts, and run your prop operation from one console." },
        ]}
        journey={[
          "Model & rules",
          "Platform & dashboard",
          "Risk configuration",
          "Acquisition setup",
          "Monitoring & review",
          "Go-live",
        ]}
        addOns={[
          "Social & Copy Trading",
          "Multi-brand setup",
          "Custom development",
          "Priority support",
        ]}
        whoItFits={[
          "New prop firms launching their first challenge",
          "Existing prop firms modernizing their stack",
          "Brokers adding prop trading as a second business line",
          "Firms scaling from dozens to hundreds of traders",
        ]}
        faq={[
          {
            question: "What trading platforms can prop traders use?",
            answer:
              "Prop traders can use MetaTrader 4/5, MT7/MobiusTrader, or cTrader — depending on your deployment. The platform scope is confirmed for your setup.",
          },
          {
            question: "How are challenge rules enforced?",
            answer:
              "Challenge rules — exposure limits, drawdown thresholds, and evaluation criteria — are configured in the risk layer and enforced across all trader accounts. The exact rules are yours to define.",
          },
          {
            question: "Can we scale from a small challenge to hundreds of traders?",
            answer:
              "Yes. The architecture is designed to scale — from a first challenge with a handful of traders to a large operation with hundreds. Scaling is phased and planned.",
          },
        ]}
        cta={{
          primary: "Build Your Brokerage",
          primaryHref: "/contact?intent=prop",
          secondary: "Explore the CRM",
          secondaryHref: "/broker-technology/crm",
        }}
        ctaHeading="Discuss Your Prop Firm"
        visual={<PropFirmVisual />}
      />
    </>
  );
}
