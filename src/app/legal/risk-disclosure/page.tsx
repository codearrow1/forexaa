import { buildPageSeo, getRoute } from "@/lib/seo/page-meta";
import { JsonLdGraph } from "@/components/shared/json-ld";
import { LegalPlaceholder } from "@/components/templates/legal-placeholder";

const route = getRoute("/legal/risk-disclosure");
const seo = buildPageSeo(route);
export const metadata = seo.metadata;

export default function RiskDisclosurePage() {
  return (
    <>
      <JsonLdGraph nodes={seo.jsonLd} />
      <LegalPlaceholder
        current="/legal/risk-disclosure"
        title="Risk Disclosure"
        body={
          <>
            <p className="type-body text-text-muted">
              Trading foreign exchange, CFDs and related products carries
              significant risk of loss and is not suitable for every
              investor. The formal risk disclosure for FOREXAA services is
              being finalized and will be published here.
            </p>
            <p className="type-small text-text-muted">
              FOREXAA is a technology provider. It does not provide brokerage,
              investment, financial, exchange, asset-management or advisory
              services, and does not accept, hold, manage or control client
              funds.
            </p>
          </>
        }
      />
    </>
  );
}
