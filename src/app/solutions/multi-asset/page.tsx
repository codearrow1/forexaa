import { buildPageSeo, getRoute } from "@/lib/seo/page-meta";
import { JsonLdGraph } from "@/components/shared/json-ld";
import { SolutionPage } from "@/components/templates/solution-page";
import { MultiAssetVisual } from "@/components/product/solution-visuals";

const route = getRoute("/solutions/multi-asset");
const seo = buildPageSeo(route);
export const metadata = seo.metadata;

/**
 * /solutions/multi-asset — "Offer forex, CFD, metals and crypto from one stack."
 *
 * Story: Markets converging — Forex, Metals, Indices, Crypto, Stocks, Other
 * instruments → Common Client Experience → Trading Infrastructure → Risk →
 * Operations.
 */
export default function MultiAssetPage() {
  return (
    <>
      <JsonLdGraph nodes={seo.jsonLd} />
      <SolutionPage
        path="/solutions/multi-asset"
        eyebrow="Multi-Asset Broker"
        title="Offer forex, CFD, metals and crypto from one connected stack"
        lead="Your clients don't trade in silos — they move between forex, metals, indices, and crypto. A multi-asset brokerage needs one connected stack where every instrument shares the same client record, risk view, and operations."
        situation={{
          heading: "Multi-asset means more than a longer instrument list.",
          body: "Running forex, CFD, metals, and crypto from disconnected systems means re-keying data, reconciling risk across platforms, and giving clients a fragmented experience. FOREXAA connects the instruments so the operation runs as one business, not several.",
        }}
        stack={[
          {
            label: "Markets",
            items: ["Forex", "Metals", "Indices", "Crypto", "Stocks", "Other"],
          },
          {
            label: "Client Experience",
            items: ["One portal", "One account view", "Cross-instrument trading"],
          },
          {
            label: "Trading Infrastructure",
            items: ["MT4 / MT5", "MT7", "cTrader", "Web / Mobile"],
          },
          {
            label: "Risk",
            items: ["Cross-instrument exposure", "Unified limits", "Real-time monitoring"],
          },
          {
            label: "Operations",
            items: ["One back office", "One CRM", "One reporting layer"],
          },
        ]}
        howItWorks={{
          title: "How a multi-asset brokerage fits together",
          steps: [
            "Forex",
            "Metals",
            "Indices",
            "Crypto",
            "Stocks",
            "Common Client Experience",
            "Trading Infrastructure",
            "Risk",
            "Operations",
          ],
          note: "The exact instrument set is confirmed for your deployment — we do not present a fixed list as fact.",
        }}
        components={[
          { name: "Trading Platforms", description: "MT4/MT5, MT7, and cTrader — each connected to the same client record." },
          { name: "FOREXAA CRM", description: "One client lifecycle across every instrument your clients trade." },
          { name: "Trader's Room", description: "A single portal where clients see all accounts, balances, and positions." },
          { name: "Risk Management", description: "Cross-instrument exposure and unified limits across the entire book." },
          { name: "Back Office", description: "One operations console for clients, accounts, money, and partners." },
        ]}
        journey={[
          "Instrument scope",
          "Liquidity & risk",
          "Platform configuration",
          "Client experience",
          "Operations readiness",
          "Go-live",
        ]}
        addOns={[
          "Social & Copy Trading",
          "PAMM / MAM allocation",
          "Custom instrument setup",
          "Multi-brand configuration",
        ]}
        whoItFits={[
          "Brokers expanding beyond forex into CFD and crypto",
          "Multi-asset operators consolidating disconnected systems",
          "Groups running several brands on shared infrastructure",
          "Firms adding new instruments without adding new tools",
        ]}
        faq={[
          {
            question: "Which instruments are actually supported?",
            answer:
              "The instrument set depends on your deployment and liquidity setup. We confirm what is available for your structure rather than presenting a fixed list as fact.",
          },
          {
            question: "Can clients trade forex and crypto from the same account?",
            answer:
              "The architecture supports cross-instrument trading from a single client record. The exact account structure is confirmed during scoping.",
          },
          {
            question: "How is risk managed across instruments?",
            answer:
              "Exposure and limits are monitored across the entire book in real time, so risk is visible per instrument and in aggregate.",
          },
        ]}
        cta={{
          primary: "Build Your Brokerage",
          primaryHref: "/contact?intent=general",
          secondary: "Explore the Platform",
          secondaryHref: "/platforms",
        }}
        ctaHeading="Discuss Multi-Asset Infrastructure"
        visual={<MultiAssetVisual />}
      />
    </>
  );
}
