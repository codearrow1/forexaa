import { buildPageSeo, getRoute } from "@/lib/seo/page-meta";
import { JsonLdGraph } from "@/components/shared/json-ld";
import { LegalPlaceholder } from "@/components/templates/legal-placeholder";

const route = getRoute("/legal/privacy");
const seo = buildPageSeo(route);
export const metadata = seo.metadata;

export default function PrivacyPage() {
  return (
    <>
      <JsonLdGraph nodes={seo.jsonLd} />
      <LegalPlaceholder
        current="/legal/privacy"
        title="Privacy"
        body={
          <>
            <p className="type-body text-text-muted">
              This page will set out how FOREXAA collects, uses and protects
              the personal information you provide when you contact us or use
              the platform. The full policy is in final review.
            </p>
            <p className="type-small text-text-muted">
              In the meantime, the contact form on this site asks only for
              the minimum needed to respond to you, and never requests
              passwords, payment details, identity documents or API keys.
            </p>
          </>
        }
      />
    </>
  );
}
