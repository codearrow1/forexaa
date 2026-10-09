import type { ReactNode } from "react";
import type { ProductContent } from "@/types/content";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ButtonLink } from "@/components/ui/button";
import { RelatedProducts } from "@/components/product/related-products";
import { FaqAccordion } from "@/components/product/faq-accordion";
import { IntegrationScene } from "@/components/product/integration-scene";
import { WorkflowDiagram } from "@/components/product/visuals";
import { ScrollScene } from "@/components/story/primitives";
import { VisualReveal } from "@/components/story/reveals";

/**
 * ProductPage template — Phase 13 v2 (visual system: PHASE-13-PRODUCT-VISUAL-SYSTEM.md).
 *
 * Structure:
 *   Hero (type-product-hero H1 + CTA row + hero visual)
 *   → Full-width interface scene (product.scene + interfaceScene)
 *   → Overview (editorial two-column text)
 *   → Workflow (WorkflowDiagram)
 *   → Capabilities grid
 *   → IntegrationScene (non-pinned topology)
 *   → Audience → Related → FAQ
 *   → Final CTA (centered type-product-hero statement)
 *
 * CTA hierarchy: primary "Build Your Brokerage" (intent href),
 * contextual secondary, conversion handled by the nav/footer CTA.
 */
export function ProductPage({
  path,
  product,
  visual,
  interfaceScene,
  showWorkflow = true,
  showIntegrations = true,
  showAudience = true,
}: {
  path: string;
  product: ProductContent;
  /** Product-specific hero visual (right column). */
  visual: ReactNode;
  /** Full-width interface scene below the hero (paired with product.scene). */
  interfaceScene?: ReactNode;
  showWorkflow?: boolean;
  showIntegrations?: boolean;
  showAudience?: boolean;
}) {
  return (
    <>
      {/* Hero */}
      <Section spacing="default" className="!pt-10">
        <div className="flex flex-col gap-6">
          <Breadcrumbs current={path} />
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div className="flex flex-col gap-4">
              <Badge tone="primary">{product.eyebrow}</Badge>
              <h1 className="type-product-hero">{product.title}</h1>
              <p className="type-lead max-w-xl text-text-muted">{product.lead}</p>
              <div className="mt-2 flex flex-wrap gap-3">
                <ButtonLink href={product.cta.primaryHref} variant="primary" size="lg">
                  {product.cta.primary}
                </ButtonLink>
                <ButtonLink href={product.cta.secondaryHref} variant="secondary" size="lg">
                  {product.cta.secondary}
                </ButtonLink>
              </div>
            </div>
            <VisualReveal type="scale">{visual}</VisualReveal>
          </div>
        </div>
      </Section>

      {/* Full-width interface scene */}
      {interfaceScene && product.scene ? (
        <ScrollScene className="!py-16">
          <Container className="flex flex-col gap-7">
            <Heading
              eyebrow={product.scene.eyebrow}
              level={2}
              description={product.scene.lead}
            >
              {product.scene.title}
            </Heading>
            <VisualReveal type="scale">{interfaceScene}</VisualReveal>
          </Container>
        </ScrollScene>
      ) : null}

      {/* Overview: editorial two-column */}
      <ScrollScene className="!py-16">
        <Container className="grid gap-8 lg:grid-cols-[1fr_2fr]">
          <Heading eyebrow="Overview" level={2}>
            What {product.name} is, and how it fits
          </Heading>
          <div className="flex flex-col gap-4">
            {product.overview.map((para) => (
              <p key={para.slice(0, 24)} className="type-body text-text-muted">
                {para}
              </p>
            ))}
          </div>
        </Container>
      </ScrollScene>

      {/* Workflow */}
      {showWorkflow && product.workflow ? (
        <ScrollScene className="!py-16">
          <Container className="flex flex-col gap-5">
            <Heading eyebrow="How it works" level={2}>
              {product.workflow.title}
            </Heading>
            <Card variant="glass" className="p-6">
              <WorkflowDiagram steps={product.workflow.steps} note={product.workflow.note} />
            </Card>
          </Container>
        </ScrollScene>
      ) : null}

      {/* Capabilities */}
      <ScrollScene className="!py-16">
        <Container className="flex flex-col gap-5">
          <Heading
            eyebrow="Capabilities"
            level={2}
            description="Concrete, grouped by the job it does — not a wall of buzzwords."
          >
            Core capabilities
          </Heading>
          <div className="grid gap-3 md:grid-cols-2">
            {product.capabilities.map((group) => (
              <Card key={group.group} variant="elevated" className="flex flex-col gap-3 p-5">
                <h3 className="type-h3">{group.group}</h3>
                <ul className="flex flex-col gap-2">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 type-small text-text-muted">
                      <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </Container>
      </ScrollScene>

      {/* Integrations */}
      {showIntegrations ? (
        <Container>
          <IntegrationScene name={product.name} items={product.integrations} />
        </Container>
      ) : null}

      {/* Who it's for */}
      {showAudience ? (
        <ScrollScene className="!py-16">
          <Container className="flex flex-col gap-5">
            <Heading eyebrow="Who it's for" level={2}>
              Built for how you run
            </Heading>
            <div className="grid gap-3 md:grid-cols-2">
              {product.targetAudience.map((audience) => (
                <div key={audience} className="rounded-xl border border-border bg-surface p-5">
                  <p className="type-body font-medium text-text">{audience}</p>
                </div>
              ))}
            </div>
          </Container>
        </ScrollScene>
      ) : null}

      {/* Related */}
      <Container>
        <RelatedProducts product={product} />
      </Container>

      {/* FAQ */}
      {product.faq.length > 0 ? (
        <ScrollScene className="!py-16">
          <Container>
            <FaqAccordion items={product.faq} />
          </Container>
        </ScrollScene>
      ) : null}

      {/* Final CTA */}
      <ScrollScene className="!py-16">
        <Container>
          <div className="rounded-2xl border border-border-accent/60 bg-surface-elevated/60 p-8 text-center md:p-12">
            <h2 className="type-product-hero mx-auto max-w-3xl">{product.cta.footer}</h2>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <ButtonLink href={product.cta.primaryHref} variant="primary" size="lg">
                {product.cta.primary}
              </ButtonLink>
              <ButtonLink href={product.cta.secondaryHref} variant="ghost" size="lg">
                {product.cta.secondary}
              </ButtonLink>
            </div>
          </div>
        </Container>
      </ScrollScene>
    </>
  );
}
