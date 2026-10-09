import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ButtonLink } from "@/components/ui/button";
import { ScrollScene } from "@/components/story/primitives";
import { VisualReveal } from "@/components/story/reveals";
import { ArchitectureFlow } from "@/components/story/scenes";
import { FaqAccordion } from "@/components/product/faq-accordion";

/**
 * SolutionPage template (Rule 4). Composes the standard solution IA:
 *
 *   Hero / Business Situation / Visual Story / Recommended Stack /
 *   How the System Works / Product Components / Implementation Journey /
 *   Optional Add-ons / Who It Fits / Common Questions / CTA
 *
 * Pages customize the story — no copy is duplicated with nouns swapped.
 */
export function SolutionPage({
  path,
  eyebrow,
  title,
  lead,
  situation,
  visual,
  visualAnchorId,
  stack,
  howItWorks,
  components,
  journey,
  addOns,
  whoItFits,
  faq,
  cta,
  ctaHeading,
}: {
  path: string;
  eyebrow: string;
  title: string;
  lead: string;
  situation: { heading: string; body: string };
  /** Solution visual — rendered right in the hero (Phase 13 §4). */
  visual?: ReactNode;
  /** Optional anchor id on the hero visual (e.g. #stack-builder). */
  visualAnchorId?: string;
  stack: { label: string; items: readonly string[] }[];
  howItWorks: { title?: string; steps: readonly string[]; note?: string };
  components: readonly { name: string; description: string }[];
  journey: readonly string[];
  addOns?: readonly string[];
  whoItFits: readonly string[];
  faq: readonly { question: string; answer: string }[];
  cta: { primary: string; primaryHref: string; secondary?: string; secondaryHref?: string };
  /** Statement heading for the final CTA panel (defaults to cta.primary). */
  ctaHeading?: string;
}) {
  return (
    <>
      {/* Hero */}
      <Section spacing="default" className="!pt-10">
        <div className="flex flex-col gap-6">
          <Breadcrumbs current={path} />
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div className="flex flex-col gap-4">
              <Badge tone="primary">{eyebrow}</Badge>
              <h1 className="type-product-hero">{title}</h1>
              <p className="type-lead max-w-xl text-text-muted">{lead}</p>
              <div className="mt-2 flex flex-wrap gap-3">
                <ButtonLink href={cta.primaryHref} variant="primary" size="lg">
                  {cta.primary}
                </ButtonLink>
                {cta.secondary ? (
                  <ButtonLink href={cta.secondaryHref ?? "/platforms"} variant="secondary" size="lg">
                    {cta.secondary}
                  </ButtonLink>
                ) : null}
              </div>
            </div>
            {visual ? (
              <div id={visualAnchorId}>
                <VisualReveal type="scale">{visual}</VisualReveal>
              </div>
            ) : null}
          </div>
        </div>
      </Section>

      {/* Business Situation */}
      <ScrollScene className="!py-16">
        <Container className="flex flex-col gap-4">
          <h2 className="type-section">{situation.heading}</h2>
          <p className="type-lead max-w-2xl text-text-muted">{situation.body}</p>
        </Container>
      </ScrollScene>

      {/* Recommended Technology Stack */}
      <ScrollScene className="!py-16">
        <Container className="flex flex-col gap-8">
          <Heading eyebrow="Recommended stack" level={2}>
            The technology this solution is built on
          </Heading>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {stack.map((layer) => (
              <Card key={layer.label} variant="elevated" className="flex flex-col gap-3 p-5">
                <h3 className="type-h3">{layer.label}</h3>
                <ul className="flex flex-col gap-1.5">
                  {layer.items.map((item) => (
                    <li key={item} className="type-small text-text-muted">
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </Container>
      </ScrollScene>

      {/* How the System Works */}
      <ScrollScene className="!py-16">
        <Container className="flex flex-col gap-5">
           <Heading eyebrow="How it works" level={2}>
             {howItWorks.title ?? "The system behind the solution"}
           </Heading>
          <Card variant="glass" className="p-6">
            <ArchitectureFlow
              layers={[
                { label: "Client", detail: "Where the journey starts", tone: "cyan" as const },
                ...howItWorks.steps.slice(0, -1).map((step) => ({
                  label: step,
                  tone: "violet" as const,
                })),
                {
                  label: howItWorks.steps[howItWorks.steps.length - 1] ?? "Complete",
                  detail: howItWorks.note,
                  tone: "mint" as const,
                },
              ]}
            />
          </Card>
        </Container>
      </ScrollScene>

      {/* Product Components */}
      <ScrollScene className="!py-16">
        <Container className="flex flex-col gap-5">
          <Heading eyebrow="Components" level={2}>
            What the solution includes
          </Heading>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {components.map((component) => (
              <Card key={component.name} variant="elevated" className="flex flex-col gap-2 p-5">
                <h3 className="type-body font-semibold text-text">{component.name}</h3>
                <p className="type-small text-text-muted">{component.description}</p>
              </Card>
            ))}
          </div>
        </Container>
      </ScrollScene>

      {/* Implementation Journey */}
      <ScrollScene className="!py-16">
        <Container className="flex flex-col gap-5">
          <Heading eyebrow="Implementation" level={2}>
            What implementation looks like
          </Heading>
          <Card variant="glass" className="p-6">
            <ol className="flex flex-wrap items-center gap-2">
              {journey.map((step, i) => (
                <li key={step} className="flex items-center gap-2">
                  <span className="flex items-center gap-2 rounded-lg border border-border bg-surface-elevated px-3 py-2 type-small text-text">
                    <span className="type-caption font-mono text-primary">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {step}
                  </span>
                  {i < journey.length - 1 ? (
                    <span aria-hidden="true" className="text-text-muted">
                      →
                    </span>
                  ) : null}
                </li>
              ))}
            </ol>
          </Card>
        </Container>
      </ScrollScene>

      {/* Optional Add-ons */}
      {addOns && addOns.length > 0 ? (
        <ScrollScene className="!py-16">
          <Container className="flex flex-col gap-5">
            <Heading eyebrow="Add-ons" level={2}>
              Optional extensions
            </Heading>
            <div className="flex flex-wrap gap-2">
              {addOns.map((addOn) => (
                <span
                  key={addOn}
                  className="rounded-pill border border-border bg-surface px-3.5 py-1.5 type-small font-medium text-text-muted"
                >
                  {addOn}
                </span>
              ))}
            </div>
          </Container>
        </ScrollScene>
      ) : null}

      {/* Who It Fits */}
      <ScrollScene className="!py-16">
        <Container className="flex flex-col gap-5">
          <Heading eyebrow="Fit" level={2}>
            Who this solution is for
          </Heading>
          <div className="grid gap-3 md:grid-cols-2">
            {whoItFits.map((fit) => (
              <div key={fit} className="rounded-xl border border-border bg-surface p-5">
                <p className="type-body text-text">{fit}</p>
              </div>
            ))}
          </div>
        </Container>
      </ScrollScene>

      {/* Common Questions */}
      {faq.length > 0 ? (
        <ScrollScene className="!py-16">
          <Container>
            <FaqAccordion items={faq} />
          </Container>
        </ScrollScene>
      ) : null}

      {/* CTA */}
      <ScrollScene className="!py-16">
        <Container>
          <div className="rounded-2xl border border-border-accent/60 bg-surface-elevated/60 p-8 text-center md:p-12">
            <h2 className="type-product-hero mx-auto max-w-3xl">{ctaHeading ?? cta.primary}</h2>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <ButtonLink href={cta.primaryHref} variant="primary" size="lg">
                {cta.primary}
              </ButtonLink>
              {cta.secondary ? (
                <ButtonLink href={cta.secondaryHref ?? "/platforms"} variant="ghost" size="lg">
                  {cta.secondary}
                </ButtonLink>
              ) : null}
            </div>
          </div>
        </Container>
      </ScrollScene>
    </>
  );
}
