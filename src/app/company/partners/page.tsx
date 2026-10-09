import { getRoute, buildPageSeo } from "@/lib/seo/page-meta";
import { JsonLdGraph } from "@/components/shared/json-ld";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { ScrollScene } from "@/components/story/primitives";

const route = getRoute("/company/partners");
const seo = buildPageSeo(route);
export const metadata = seo.metadata;

/**
 * Partners page (Rule 42/43).
 * Only verified partners render. Unverified partners are never shown.
 * No logo wall — each partner has a verified relationship and context.
 */

interface Partner {
  name: string;
  category: string;
  relationship: string;
  verified: boolean;
  description: string;
}

// Phase 5: no verified partners yet. This array stays empty until
// the business owner provides verified partner data with approved logos.
const PARTNERS: Partner[] = [];

const CATEGORIES = [
  "Trading Platforms",
  "Liquidity Providers",
  "Payment Processors",
  "Technology Integrations",
  "Legal & Compliance",
] as const;

export default function PartnersPage() {
  const verifiedPartners = PARTNERS.filter((p) => p.verified);

  return (
    <>
      <JsonLdGraph nodes={seo.jsonLd} />
      <Section spacing="default" className="!pt-10">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-6">
            <Breadcrumbs current="/company/partners" />
            <div className="flex flex-col gap-4">
              <Badge tone="primary">Partners</Badge>
              <h1 className="type-product-hero">Technology & infrastructure partners</h1>
              <p className="type-lead max-w-2xl text-text-muted">
                FOREXAA works with verified partners across trading platforms,
                liquidity, payments, and compliance. Each relationship is
                confirmed and documented.
              </p>
            </div>
          </div>

          <ScrollScene>
          {verifiedPartners.length > 0 ? (
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {verifiedPartners.map((partner) => (
                <Card key={partner.name} variant="elevated" className="flex flex-col gap-3 p-5">
                  <div className="flex items-center justify-between">
                    <h3 className="type-body font-semibold text-text">{partner.name}</h3>
                    <Badge tone="success">Verified</Badge>
                  </div>
                  <p className="type-caption text-text-muted">{partner.category}</p>
                  <p className="type-small text-text-muted">{partner.description}</p>
                </Card>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-surface p-12 text-center">
              <h2 className="type-section">Partner network in development</h2>
              <p className="max-w-md type-body text-text-muted">
                We are confirming partner relationships and preparing approved
                assets. Check back soon, or contact us to discuss a potential
                partnership.
              </p>
              <ButtonLink href="/contact?intent=general" variant="primary" size="lg">
                Build Your Brokerage
              </ButtonLink>
            </div>
          )}
          </ScrollScene>

          {/* Partnership categories */}
          <ScrollScene className="!py-16">
            <div className="mx-auto flex max-w-[var(--container-width)] flex-col gap-8">
              <Heading eyebrow="Categories" level={2}>
                Where partners fit in the stack
              </Heading>
              <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                {CATEGORIES.map((category) => (
                  <Card key={category} variant="default" className="p-5">
                    <h3 className="type-body font-semibold text-text">{category}</h3>
                    <p className="mt-1.5 type-small text-text-muted">
                      {category === "Trading Platforms" && "MT4, MT5, MT7, cTrader — the platforms your clients trade on."}
                      {category === "Liquidity Providers" && "Sources you connect once, aggregated and routed for your execution setup."}
                      {category === "Payment Processors" && "Deposit and payout rails your clients use, integrated with the back office."}
                      {category === "Technology Integrations" && "APIs, data feeds, and internal system connectivity."}
                      {category === "Legal & Compliance" && "Licensing, KYC/AML, and regulatory support through licensed partners."}
                    </p>
                  </Card>
                ))}
              </div>
            </div>
          </ScrollScene>

          {/* CTA */}
          <ScrollScene className="!py-16">
            <div className="rounded-2xl border border-border-accent/60 bg-surface-elevated/60 p-8 text-center md:p-12">
              <h2 className="type-product-hero mx-auto max-w-3xl">
                Ready to build your brokerage?
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
