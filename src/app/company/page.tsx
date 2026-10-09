import { getRoute, buildPageSeo } from "@/lib/seo/page-meta";
import { JsonLdGraph } from "@/components/shared/json-ld";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { ScrollScene } from "@/components/story/primitives";
import { organizationLd } from "@/lib/seo/jsonld";

const route = getRoute("/company");
const seo = buildPageSeo(route);
export const metadata = seo.metadata;

/**
 * /company — upgraded from placeholder to premium corporate story (Rule 40).
 * Uses verified facts only. No invented history, dates, or milestones.
 */
export default function CompanyPage() {
  return (
    <>
      <JsonLdGraph nodes={[organizationLd(), ...seo.jsonLd]} />
      <Section spacing="default" className="!pt-10">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-6">
            <Breadcrumbs current="/company" />
            <div className="flex flex-col gap-4">
              <Badge tone="primary">Company</Badge>
              <h1 className="type-product-hero">FOREXAA — brokerage technology, connected</h1>
              <p className="type-lead max-w-2xl text-text-muted">
                FOREXAA builds the technology that modern brokerages run on. We
                combine CRM, trading platforms, liquidity, payments, and risk
                into one connected system — so operators can focus on their
                clients, not their infrastructure.
              </p>
            </div>
          </div>

          {/* What FOREXAA builds */}
          <ScrollScene className="!py-16">
            <div className="mx-auto flex max-w-[var(--container-width)] flex-col gap-8">
              <Heading eyebrow="What we build" level={2}>
                One platform, the whole operation
              </Heading>
              <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                {[
                  { title: "Forex CRM", description: "Client lifecycle, partners, finance, and support in one system." },
                  { title: "Trading Platforms", description: "MT4, MT5, MT7, and cTrader — connected to the same back office." },
                  { title: "Liquidity", description: "Multi-provider aggregation and routing for competitive execution." },
                  { title: "Payments", description: "Deposits, withdrawals, and payout rails integrated into the platform." },
                  { title: "Risk Management", description: "Real-time exposure, limits, and controls across every account." },
                  { title: "IB / Affiliate", description: "Multi-level partner networks with automated commission tracking." },
                ].map((item) => (
                  <Card key={item.title} variant="elevated" className="flex flex-col gap-2 p-5">
                    <h3 className="type-body font-semibold text-text">{item.title}</h3>
                    <p className="type-small text-text-muted">{item.description}</p>
                  </Card>
                ))}
              </div>
            </div>
          </ScrollScene>

          {/* Technology philosophy */}
          <ScrollScene className="!py-16">
            <div className="mx-auto flex max-w-[var(--container-width)] flex-col gap-8">
              <Heading eyebrow="Technology philosophy" level={2}>
                Built for how brokers actually work
              </Heading>
              <div className="grid gap-3 md:grid-cols-2">
                {[
                  { title: "Connected, not siloed", description: "Every component shares one client record, so data flows between CRM, trading, and operations without re-entry." },
                  { title: "Flexible, not rigid", description: "The platform adapts to your business model — forex, CFD, crypto, prop, or a mix — rather than forcing you into a fixed workflow." },
                  { title: "Scalable, not fragile", description: "Architecture designed to grow with your operation, from first client to thousands of accounts." },
                  { title: "Secure by default", description: "Input validation, strict browser headers, no secrets in the bundle, and dependency auditing in CI." },
                ].map((item) => (
                  <Card key={item.title} variant="default" className="flex flex-col gap-2 p-5">
                    <h3 className="type-body font-semibold text-text">{item.title}</h3>
                    <p className="type-small text-text-muted">{item.description}</p>
                  </Card>
                ))}
              </div>
            </div>
          </ScrollScene>

          {/* Product ecosystem */}
          <ScrollScene className="!py-16">
            <div className="mx-auto flex max-w-[var(--container-width)] flex-col gap-8">
              <Heading eyebrow="Product ecosystem" level={2}>
                Explore the platform
              </Heading>
              <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
                {[
                  { label: "Forex CRM", href: "/broker-technology/crm" },
                  { label: "Trading Platforms", href: "/platforms" },
                  { label: "Liquidity", href: "/infrastructure/liquidity" },
                  { label: "White Label", href: "/services/white-label" },
                ].map((link) => (
                  <Card key={link.label} variant="elevated" interactive className="p-5">
                    <a href={link.href} className="type-body font-medium text-text hover:text-primary">
                      {link.label} →
                    </a>
                  </Card>
                ))}
              </div>
            </div>
          </ScrollScene>

          {/* CTA */}
          <ScrollScene className="!py-16">
            <div className="rounded-2xl border border-border-accent/60 bg-surface-elevated/60 p-8 text-center md:p-12">
              <h2 className="type-product-hero mx-auto max-w-3xl">
                Ready to see how the stack fits your brokerage?
              </h2>
              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <ButtonLink href="/contact?intent=general" variant="primary" size="lg">
                  Build Your Brokerage
                </ButtonLink>
                <ButtonLink href="/platforms" variant="ghost" size="lg">
                  Explore the Platform
                </ButtonLink>
              </div>
            </div>
          </ScrollScene>
        </div>
      </Section>
    </>
  );
}
