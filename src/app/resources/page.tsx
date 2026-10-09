import { buildPageSeo, getRoute } from "@/lib/seo/page-meta";
import { HubPage } from "@/components/templates/hub-page";

const route = getRoute("/resources");
const seo = buildPageSeo(route);
export const metadata = seo.metadata;

/**
 * /resources — NOINDEX scaffold until genuinely useful resources are
 * published. No thin programmatic content (Rule 66).
 */
export default function ResourcesPage() {
  return (
    <HubPage
      path="/resources"
      eyebrow="Resources"
      title="Resources"
      description="Guides, comparisons and reference material for building and running a brokerage. New material is added here as it is published."
      related={[
        { label: "Solutions", href: "/solutions" },
        { label: "Platforms", href: "/platforms" },
      ]}
      cta={{ label: "Explore the technology", href: "/platforms" }}
    >
      <p className="type-body text-text-muted">
        The resource hub (launch guides, platform comparisons, glossary) is
        being filled with editorial material. Nothing is published here
        until it is genuinely useful.
      </p>
    </HubPage>
  );
}
