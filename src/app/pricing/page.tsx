import { buildPageSeo, getRoute } from "@/lib/seo/page-meta";
import { HubPage } from "@/components/templates/hub-page";
import { Section } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { ButtonLink } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heading } from "@/components/ui/heading";

const route = getRoute("/pricing");
const seo = buildPageSeo(route);
export const metadata = seo.metadata;

/**
 * /pricing — indexable. Explains how pricing works WITHOUT publishing
 * unverified numbers (the legacy site's figures are still `pending` in the
 * claims registry). Positioning: "Pricing available on request."
 */
const TIERS = [
  {
    name: "CRM",
    description:
      "Start with the broker-focused CRM and back office, on top of the trading platform you already run.",
  },
  {
    name: "White Label",
    description:
      "Add a white-label trading platform and infrastructure so you operate under your own brand end to end.",
  },
  {
    name: "All-in-one",
    description:
      "CRM, platform, liquidity, payments and risk as one connected deployment, sized to your business model.",
  },
];

export default function PricingPage() {
  return (
    <HubPage
      path="/pricing"
      eyebrow="Pricing"
      title="Pricing that fits your deployment"
      description="Plans are shaped around scope — what you run today and what you are launching next — not a fixed list of boxes."
      related={[
        { label: "Broker technology", href: "/broker-technology", description: "What the CRM covers" },
        { label: "Platforms", href: "/platforms", description: "What the white label covers" },
        { label: "Infrastructure", href: "/infrastructure", description: "What the all-in-one covers" },
      ]}
      cta={{ label: "Request Pricing", href: "/contact?intent=pricing" }}
    >
      <Section spacing="tight" className="!py-0">
        <div className="flex flex-col gap-6">
          <Heading eyebrow="Plans" level={2}>
            Choose a starting point
          </Heading>

          <div className="flex items-center gap-3">
            <Badge tone="warning">Pricing available on request</Badge>
            <p className="type-small text-text-muted">
              Figures are confirmed with the team, because they depend on
              scope, platforms and support level.
            </p>
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            {TIERS.map((tier) => (
              <Card key={tier.name} variant="elevated" className="flex flex-col gap-3 p-6">
                <h3 className="type-h3">{tier.name}</h3>
                <p className="flex-1 type-small text-text-muted">{tier.description}</p>
                <ButtonLink
                  href="/contact?intent=pricing"
                  variant="secondary"
                  size="sm"
                  className="-mx-2 px-2"
                >
                  Request a quote →
                </ButtonLink>
              </Card>
            ))}
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <Card variant="default" className="p-5">
              <h3 className="type-body font-semibold text-text">What affects price</h3>
              <p className="mt-2 type-small text-text-muted">
                The number of trading platforms in scope, the client volume
                you expect, whether you need white label or bring your own
                platform, and the level of support and migration help you
                want.
              </p>
            </Card>
            <Card variant="default" className="p-5">
              <h3 className="type-body font-semibold text-text">How to get a number</h3>
              <p className="mt-2 type-small text-text-muted">
                Start with a demo. The team will scope your deployment and
                return a quote that matches the tiers above, so you are
                comparing real configuration to real configuration.
              </p>
            </Card>
          </div>
        </div>
      </Section>
    </HubPage>
  );
}
