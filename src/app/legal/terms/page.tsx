import { buildPageSeo, getRoute } from "@/lib/seo/page-meta";
import { JsonLdGraph } from "@/components/shared/json-ld";
import { LegalPlaceholder } from "@/components/templates/legal-placeholder";

const route = getRoute("/legal/terms");
const seo = buildPageSeo(route);
export const metadata = seo.metadata;

export default function TermsPage() {
  return (
    <>
      <JsonLdGraph nodes={seo.jsonLd} />
      <LegalPlaceholder
        current="/legal/terms"
        title="Terms"
        body={
          <>
            <p className="type-body text-text-muted">
              The terms of service for using FOREXAA products and this website
              are being finalized. The full terms will be published here once
              approved.
            </p>
          </>
        }
      />
    </>
  );
}
