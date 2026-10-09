import { productPath, PRODUCTS } from "@/content/products";
import { resolveForLink } from "@/config/seo/internal-links";
import { Card } from "@/components/ui/card";
import { ButtonLink } from "@/components/ui/button";

/**
 * Related-technology system (Rule 33): data-driven cross-links from a
 * product page to sibling/related products + hubs.
 */
const HUB_LABELS: Record<string, string> = {
  "/platforms": "Trading platforms",
  "/infrastructure": "Infrastructure",
  "/services": "Services",
  "/solutions": "Solutions",
  "/pricing": "Pricing",
  "/broker-technology": "Broker technology",
};
export function RelatedProducts({
  product,
  heading = "Related technology",
}: {
  product: { slug: string; relatedProducts: readonly string[]; relatedHubs: readonly string[] };
  heading?: string;
}) {
  const related = (product.relatedProducts ?? [])
    .map((slug) => PRODUCTS[slug])
    .filter((p): p is (typeof PRODUCTS)[string] => p !== undefined);
  const hubs = (product.relatedHubs ?? []).filter(
    (hub) => hub !== productPath(product.slug),
  );

  if (related.length === 0 && hubs.length === 0) return null;

  return (
    <section aria-label={heading} className="flex flex-col gap-5">
      <h2 className="type-section">{heading}</h2>
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {related.map((item) => {
          const path = resolveForLink(productPath(item.slug) ?? "/platforms", "/platforms");
          return (
            <Card key={item.slug} variant="elevated" interactive className="flex flex-col gap-2 p-5">
              <span className="type-label text-text-muted">{item.eyebrow}</span>
              <h3 className="type-body font-semibold text-text">{item.name}</h3>
              <p className="flex-1 type-small text-text-muted">{item.tagline}</p>
              <ButtonLink href={path} variant="ghost" size="sm" className="-mx-2 px-2">
                {item.name} →
              </ButtonLink>
            </Card>
          );
        })}
        {hubs.map((hub) => (
          <Card key={hub} variant="default" className="flex flex-col gap-2 p-5">
            <span className="type-label text-text-muted">Explore</span>
            <h3 className="type-body font-semibold text-text">
              {HUB_LABELS[hub] ?? "Hub"}
            </h3>
            <ButtonLink href={hub} variant="ghost" size="sm" className="-mx-2 px-2">
              Open the {HUB_LABELS[hub] ?? "hub"} →
            </ButtonLink>
          </Card>
        ))}
      </div>
    </section>
  );
}
