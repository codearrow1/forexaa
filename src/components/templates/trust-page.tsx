import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { ScrollScene } from "@/components/story/primitives";
import { CTAS } from "@/config/ctas";

/**
 * Trust page template (Rule 34-39). Visual-first, concise, no unsupported
 * certification claims. Clearly distinguishes website security, software
 * security, customer infrastructure and third-party services.
 * Phase 13: type-product-hero scale + restrained final CTA panel.
 */
export function TrustPage({
  current,
  eyebrow,
  title,
  lead,
  children,
}: {
  current: string;
  eyebrow: string;
  title: string;
  lead: string;
  children: ReactNode;
}) {
  const primary = CTAS["build-brokerage"]!;
  const secondary = CTAS["talk-to-forexaa"]!;

  return (
    <>
      <Section spacing="default" className="!pt-10">
        <div className="flex flex-col gap-6">
          <Breadcrumbs current={current} />
          <div className="flex flex-col gap-4">
            <Badge tone="primary">{eyebrow}</Badge>
            <h1 className="type-product-hero">{title}</h1>
            <p className="type-lead max-w-2xl text-text-muted">{lead}</p>
          </div>
        </div>
      </Section>
      {children}
      <ScrollScene className="!py-16">
        <Container>
          <div className="rounded-2xl border border-border-accent/60 bg-surface-elevated/60 p-8 text-center md:p-12">
            <h2 className="type-product-hero mx-auto max-w-3xl">
              Ready to build your brokerage?
            </h2>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <ButtonLink href={primary.href} variant="primary" size="lg">
                {primary.label}
              </ButtonLink>
              <ButtonLink href={secondary.href} variant="ghost" size="lg">
                {secondary.label}
              </ButtonLink>
            </div>
          </div>
        </Container>
      </ScrollScene>
    </>
  );
}

/** Reusable trust section with visual + explanation. */
export function TrustSection({
  eyebrow,
  title,
  description,
  items,
}: {
  eyebrow: string;
  title: string;
  description: string;
  items: readonly { label: string; detail: string; href?: string }[];
}) {
  return (
    <ScrollScene className="!py-16">
      <Container className="flex flex-col gap-8">
        <div className="flex flex-col gap-3">
          <span className="type-label text-primary">{eyebrow}</span>
          <h2 className="type-section">{title}</h2>
          <p className="max-w-2xl type-body text-text-muted">{description}</p>
        </div>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <Card
              key={item.label}
              variant="elevated"
              interactive={Boolean(item.href)}
              className="flex flex-col gap-2 p-5"
            >
              <h3 className="type-body font-semibold text-text">{item.label}</h3>
              <p className="flex-1 type-small text-text-muted">{item.detail}</p>
              {item.href ? (
                <ButtonLink
                  href={item.href}
                  variant="ghost"
                  size="sm"
                  className="-mx-2 px-2"
                >
                  Open {item.label} →
                </ButtonLink>
              ) : null}
            </Card>
          ))}
        </div>
      </Container>
    </ScrollScene>
  );
}
