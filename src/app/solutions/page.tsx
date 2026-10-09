import { buildPageSeo, getRoute } from "@/lib/seo/page-meta";
import { HubPage } from "@/components/templates/hub-page";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { Badge } from "@/components/ui/badge";
import { resolveForLink } from "@/config/seo/internal-links";
import { Card } from "@/components/ui/card";
import { ButtonLink } from "@/components/ui/button";
import { ScrollScene } from "@/components/story/primitives";
import { SolutionsHubScene } from "@/components/product/page-visuals";

const route = getRoute("/solutions");
const seo = buildPageSeo(route);
export const metadata = seo.metadata;

/**
 * /solutions — indexable hub for "brokerage solutions by business model".
 * Four of the five model pages are live; "Investment Platform" is planned
 * (badged "Planned", resolves to this hub — no dead links).
 */
const MODELS = [
  {
    title: "New Brokerage",
    description:
      "Start from zero: pick a model, configure the platform, stand up CRM, liquidity and payments, and go live.",
    target: "/solutions/new-brokerage",
  },
  {
    title: "Existing Brokerage",
    description:
      "Modernize the technology an operating brokerage runs on, with a migration path that keeps you trading through the change.",
    target: "/solutions/existing-broker",
  },
  {
    title: "Prop Firm",
    description:
      "Run challenges, evaluations and funding on infrastructure built for prop-trading workflows.",
    target: "/solutions/prop-firm",
  },
  {
    title: "Multi-Asset Broker",
    description:
      "Offer FX, CFD, metals and crypto from one connected stack rather than several disconnected ones.",
    target: "/solutions/multi-asset",
  },
  {
    title: "Investment Platform",
    description:
      "Deliver structured and advisory-style offerings on the same operational core.",
    target: "/solutions/investment-platform",
  },
];

export default function SolutionsPage() {
  return (
    <HubPage
      path="/solutions"
      eyebrow="Solutions"
      title="Brokerage solutions for every business model"
      description="The FOREXAA stack is configured around how your business operates — not the other way around. Pick the model you run; the technology adapts."
      related={[
        {
          label: "Trading platforms",
          href: "/platforms",
          description: "MT4, MT5, MT7, cTrader, web and mobile",
        },
        {
          label: "Broker technology",
          href: "/broker-technology",
          description: "CRM, back office, trader's room",
        },
        {
          label: "Infrastructure",
          href: "/infrastructure",
          description: "Liquidity, payments, risk, APIs",
        },
        {
          label: "Pricing",
          href: "/pricing",
          description: "How plans and quotes work",
        },
      ]}
      cta={{
        label: "Talk to the team about your model",
        href: "/contact?intent=general",
      }}
      opening={
        <ScrollScene>
          <SolutionsHubScene />
        </ScrollScene>
      }
    >
      <Section spacing="tight" className="!py-0">
        <div className="flex flex-col gap-6">
          <Heading eyebrow="Business models" level={2}>
            Choose your operating model
          </Heading>
          <ScrollScene>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {MODELS.map((model) => (
              <Card
                key={model.title}
                variant="elevated"
                interactive
                className="flex flex-col gap-3 p-5"
              >
                <div className="flex items-center justify-between">
                  <h3 className="type-h3">{model.title}</h3>
                  {resolveForLink(model.target, "/solutions") ===
                  "/solutions" ? (
                    <Badge tone="neutral">Planned</Badge>
                  ) : null}
                </div>
                <p className="flex-1 type-small text-text-muted">
                  {model.description}
                </p>
                {resolveForLink(model.target, "/solutions") === "/solutions" ? (
                  <span className="type-caption text-text-muted">
                    Detail page coming soon — talk to the team meanwhile
                  </span>
                ) : (
                  <ButtonLink
                    href={resolveForLink(model.target, "/solutions")}
                    variant="ghost"
                    size="sm"
                    className="-mx-2 px-2"
                  >
                    {model.title} detail →
                  </ButtonLink>
                )}
              </Card>
            ))}
            </div>
          </ScrollScene>
        </div>
      </Section>
    </HubPage>
  );
}
