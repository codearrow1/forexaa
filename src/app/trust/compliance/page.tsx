import { buildPageSeo, getRoute } from "@/lib/seo/page-meta";
import { JsonLdGraph } from "@/components/shared/json-ld";
import { TrustPage, TrustSection } from "@/components/templates/trust-page";

const route = getRoute("/trust/compliance");
const seo = buildPageSeo(route);
export const metadata = seo.metadata;

/**
 * /trust/compliance — Compliance page (Rule 39).
 * No fabricated licenses or regulatory status. Clear distinctions.
 */
export default function CompliancePage() {
  return (
    <>
      <JsonLdGraph nodes={seo.jsonLd} />
      <TrustPage
        current="/trust/compliance"
        eyebrow="Compliance"
        title="Regulatory clarity, not marketing claims"
        lead="FOREXAA is a technology provider. We do not provide brokerage, investment, financial, exchange, asset-management or advisory services, and we do not accept, hold, manage or control client funds. Regulatory obligations remain with each customer and its entity."
      >
        <TrustSection
          eyebrow="What we are"
          title="A technology provider"
          description="FOREXAA builds and operates the software platform: CRM, back office, trading connectivity, and integrations. We do not act as a broker, dealer, or financial advisor."
          items={[
            { label: "Software capability", detail: "CRM, back office, trading platform connectivity, and integrations." },
            { label: "Partner capability", detail: "Regulated services delivered through licensed partners." },
            { label: "Client responsibility", detail: "Each brokerage owns its licensing, compliance obligations, and client disclosures." },
          ]}
        />
        <TrustSection
          eyebrow="What we are not"
          title="Not a regulated entity"
          description="We do not hold client funds, execute trades, or provide investment advice. We do not claim licenses, registrations, or certifications we do not possess."
          items={[
            { label: "Not a broker", detail: "We do not accept deposits, execute trades, or hold client funds." },
            { label: "Not an advisor", detail: "We do not provide investment, financial, or legal advice." },
            { label: "Not a custodian", detail: "Client funds are held by the customer's entity and its payment providers." },
          ]}
        />
        <TrustSection
          eyebrow="How compliance works"
          title="Shared responsibility"
          description="Compliance is a shared model: FOREXAA provides the technology, partners provide regulated services, and customers own their obligations."
          items={[
            { label: "Customer entity", detail: "The brokerage entity is responsible for its licenses, KYC/AML, and regulatory reporting." },
            { label: "Licensed partners", detail: "Payment, KYC/AML, and legal services are delivered through licensed partners." },
            { label: "Technology layer", detail: "FOREXAA provides the tools to manage compliance workflows, not the compliance itself." },
          ]}
        />
      </TrustPage>
    </>
  );
}
