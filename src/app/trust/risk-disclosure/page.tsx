import { buildPageSeo, getRoute } from "@/lib/seo/page-meta";
import { JsonLdGraph } from "@/components/shared/json-ld";
import { TrustPage, TrustSection } from "@/components/templates/trust-page";

const route = getRoute("/trust/risk-disclosure");
const seo = buildPageSeo(route);
export const metadata = seo.metadata;

/**
 * /trust/risk-disclosure — Risk disclosure (Rule 39).
 * Clearly visible risk disclosure for a financial-technology website.
 * No legal advice or regulatory assurances.
 */
export default function RiskDisclosurePage() {
  return (
    <>
      <JsonLdGraph nodes={seo.jsonLd} />
      <TrustPage
        current="/trust/risk-disclosure"
        eyebrow="Risk Disclosure"
        title="Trading involves significant risk"
        lead="Trading foreign exchange, CFDs, and related products carries a high level of risk and may not be suitable for every investor. You could lose some or all of your invested capital."
      >
        <TrustSection
          eyebrow="Risk warning"
          title="You could lose your capital"
          description="Leveraged trading amplifies both gains and losses. Past performance is not indicative of future results."
          items={[
            { label: "Leverage risk", detail: "High leverage can result in losses exceeding your initial deposit." },
            { label: "Market risk", detail: "Prices can move rapidly and unpredictably due to market conditions." },
            { label: "Liquidity risk", detail: "In fast markets, orders may be executed at prices significantly different from the quoted price." },
            { label: "Counterparty risk", detail: "You are exposed to the creditworthiness of your broker and other financial intermediaries." },
          ]}
        />
        <TrustSection
          eyebrow="Not investment advice"
          title="No recommendations"
          description="FOREXAA is a technology provider. It does not provide brokerage, investment, financial, exchange, asset-management or advisory services, and does not accept, hold, manage or control client funds."
          items={[
            { label: "No advice", detail: "Nothing on this website constitutes investment, financial, or legal advice." },
            { label: "No custody", detail: "FOREXAA does not hold or control client funds or assets." },
            { label: "Your responsibility", detail: "You are solely responsible for your own trading decisions and their outcomes." },
          ]}
        />
        <TrustSection
          eyebrow="Before you trade"
          title="What to consider"
          description="Understand the risks, seek independent advice if needed, and never trade with money you cannot afford to lose."
          items={[
            { label: "Understand the product", detail: "Make sure you fully understand how the product works and the risks involved." },
            { label: "Seek advice", detail: "Consider seeking independent financial or legal advice before trading." },
            { label: "Risk capital only", detail: "Only trade with money you can afford to lose without affecting your financial security." },
          ]}
        />
      </TrustPage>
    </>
  );
}
