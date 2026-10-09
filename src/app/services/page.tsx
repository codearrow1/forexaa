import { buildPageSeo, getRoute } from "@/lib/seo/page-meta";
import { HubPage } from "@/components/templates/hub-page";

const route = getRoute("/services");
const seo = buildPageSeo(route);
export const metadata = seo.metadata;

/**
 * /services — NOINDEX scaffold (indexation decision: noindex until real
 * service content with verified scope lands). Crawlable, not indexable.
 */
export default function ServicesPage() {
  return (
    <HubPage
      path="/services"
      eyebrow="Services"
      title="Services"
      description="White-label setup, legal and compliance support, migration and ongoing support — this section is being written up with verified scope."
      related={[
        { label: "Broker technology", href: "/broker-technology" },
        { label: "Pricing", href: "/pricing" },
      ]}
      cta={{ label: "Talk to the team", href: "/contact" }}
    >
      <p className="type-body text-text-muted">
        Service detail pages (white label, legal &amp; compliance,
        migration, custom development and support) are on the way. Until
        each one has verified scope and real content, they are intentionally
        not indexed.
      </p>
    </HubPage>
  );
}
