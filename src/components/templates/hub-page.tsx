import type { ReactNode } from "react";
import { Section } from "@/components/ui/section";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ButtonLink } from "@/components/ui/button";
import { JsonLdGraph } from "@/components/shared/json-ld";
import { ScrollScene } from "@/components/story/primitives";
import { CTAS } from "@/config/ctas";
import { buildPageSeo, getRoute } from "@/lib/seo/page-meta";

/**
 * Reusable hub-page template — Phase 13 v2 (visual system:
 * PHASE-13-PRODUCT-VISUAL-SYSTEM.md §4).
 *
 * Structure:
 *   Hero (type-product-hero H1 + lead) → optional opening visual
 *   → page children → related → final CTA panel (type-product-hero
 *   statement, primary "Build Your Brokerage" + contextual secondary)
 *
 * Motion via ScrollScene on the template-owned blocks; hub pages wrap
 * their own content blocks. SEO (metadata + JSON-LD) comes from the
 * route registry via buildPageSeo — no hand-rolled metadata.
 */
export interface RelatedLink {
  label: string;
  href: string;
  description?: string;
}

export function HubPage({
  path,
  eyebrow,
  title,
  description,
  opening,
  children,
  related,
  cta,
}: {
  path: string;
  eyebrow: string;
  title: string;
  description: string;
  /** Optional opening visual/diagram, rendered under the hero. */
  opening?: ReactNode;
  children?: ReactNode;
  related?: RelatedLink[];
  /** Contextual secondary CTA for the final panel. */
  cta?: { label: string; href: string };
}) {
  const route = getRoute(path);
  const seo = buildPageSeo(route);
  const primary = CTAS["build-brokerage"]!;
  const showContextual = Boolean(cta && cta.label !== primary.label);

  return (
    <>
      <JsonLdGraph nodes={seo.jsonLd} />
      <Section spacing="default">
        <div className="flex flex-col gap-10">
          {/* Hero */}
          <div className="flex flex-col gap-6">
            <Breadcrumbs current={path} />
            <div className="flex flex-col gap-4">
              <Badge tone="primary">{eyebrow}</Badge>
              <h1 className="type-product-hero">{title}</h1>
              <p className="type-lead max-w-2xl text-text-muted">{description}</p>
            </div>
          </div>

          {opening}

          {children}

          {related && related.length > 0 ? (
            <ScrollScene>
              <div>
                <h2 className="type-section">Related pages</h2>
                <div className="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                  {related.map((item) => (
                    <Card key={item.label} variant="elevated" interactive className="p-5">
                      <div className="type-small font-semibold text-text">{item.label}</div>
                      {item.description ? (
                        <p className="mt-1 type-caption text-text-muted">{item.description}</p>
                      ) : null}
                      <a
                        href={item.href}
                        className="mt-3 inline-block type-small font-medium text-primary hover:underline"
                      >
                        {item.label} →
                      </a>
                    </Card>
                  ))}
                </div>
              </div>
            </ScrollScene>
          ) : null}

          <ScrollScene>
            <div className="rounded-2xl border border-border-accent/60 bg-surface-elevated/60 p-8 text-center md:p-12">
              <h2 className="type-product-hero mx-auto max-w-3xl">
                Ready to build your brokerage?
              </h2>
              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <ButtonLink href={primary.href} variant="primary" size="lg">
                  {primary.label}
                </ButtonLink>
                {showContextual && cta ? (
                  <ButtonLink href={cta.href} variant="ghost" size="lg">
                    {cta.label}
                  </ButtonLink>
                ) : null}
              </div>
            </div>
          </ScrollScene>
        </div>
      </Section>
    </>
  );
}
