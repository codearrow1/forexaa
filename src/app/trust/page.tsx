import { buildPageSeo, getRoute } from "@/lib/seo/page-meta";
import { JsonLdGraph } from "@/components/shared/json-ld";
import { TrustPage, TrustSection } from "@/components/templates/trust-page";

const route = getRoute("/trust");
const seo = buildPageSeo(route);
export const metadata = seo.metadata;

/**
 * /trust — Trust center homepage (Rule 35).
 * Visual tiles linking to Security, Privacy, Compliance, Risk Disclosure.
 * No unsupported certification claims.
 */
export default function TrustPage_() {
  return (
    <>
      <JsonLdGraph nodes={seo.jsonLd} />
      <TrustPage
        current="/trust"
        eyebrow="Trust Center"
        title="Trust, security and transparency"
        lead="What we build, how we protect it, and what we expect from our partners. Clear distinctions between website security, software security, customer infrastructure and third-party services."
      >
        <TrustSection
          eyebrow="Trust center"
          title="Explore trust topics"
          description="Each page explains what is implemented, what is verified, and what remains the responsibility of the customer or third-party providers."
          items={[
            { label: "Security", detail: "Website and software security controls, headers, CSP, dependency management.", href: "/trust/security" },
            { label: "Privacy", detail: "How personal information is handled. Full policy pending counsel approval.", href: "/trust/privacy" },
            { label: "Compliance", detail: "Regulatory distinctions and partner responsibilities. No fabricated licenses.", href: "/trust/compliance" },
            { label: "Risk Disclosure", detail: "Trading-related risk information. No operational promises.", href: "/trust/risk-disclosure" },
          ]}
        />
      </TrustPage>
    </>
  );
}
