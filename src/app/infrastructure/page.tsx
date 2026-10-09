import { buildPageSeo, getRoute } from "@/lib/seo/page-meta";
import { HubPage } from "@/components/templates/hub-page";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { ArchitectureDiagram, IllustrativeTag } from "@/components/product/visuals";
import { FaqAccordion } from "@/components/product/faq-accordion";
import { ScrollScene } from "@/components/story/primitives";

const route = getRoute("/infrastructure");
const seo = buildPageSeo(route);
export const metadata = seo.metadata;

/**
 * /infrastructure — infrastructure hub (Rule 27). Map-led: infrastructure
 * map, then liquidity / payments / API / risk / security / monitoring.
 */
export default function InfrastructurePage() {
  return (
    <HubPage
      path="/infrastructure"
      eyebrow="Infrastructure"
      title="The layer that makes a brokerage run"
      description="Liquidity, payments, APIs, risk, security and monitoring — the infrastructure underneath the trading platforms that keeps pricing, money and execution reliable."
      related={[
        { label: "Forex liquidity", href: "/infrastructure/liquidity" },
        { label: "Trading platforms", href: "/platforms" },
        { label: "Pricing", href: "/pricing" },
      ]}
      cta={{ label: "Discuss liquidity", href: "/contact?intent=liquidity" }}
    >
      <Section spacing="tight" className="!py-8">
        <div className="flex flex-col gap-10">
          {/* Infrastructure map */}
          <ScrollScene>
          <div className="flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <Heading eyebrow="Infrastructure map" level={2}>
                What sits under the trading floor
              </Heading>
              <IllustrativeTag label="Conceptual map" />
            </div>
            <ArchitectureDiagram
              caption="A conceptual view — the exact topology is designed for your deployment."
              layers={[
                { label: "Liquidity sources", detail: "Your providers", tone: "violet" },
                { label: "FOREXAA connectivity", detail: "Pricing · aggregation · routing", tone: "cyan" },
                { label: "Risk & execution", detail: "Limits, monitoring, control", tone: "mint" },
                { label: "Trading platforms", items: ["MT4 / MT5", "MT7", "cTrader"], tone: "violet" },
              ]}
            />
          </div>
          </ScrollScene>

          {/* Section cards: each links to its deep page or explains inline */}
          <ScrollScene>
          <div className="flex flex-col gap-5">
            <Heading eyebrow="The layers" level={2}>
              Six responsibilities, one control plane
            </Heading>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Liquidity",
                  body: "Connect your sources, aggregate pricing and route execution across your platforms.",
                  href: "/infrastructure/liquidity",
                  linkLabel: "Open the liquidity page",
                },
                {
                  title: "Payments",
                  body: "Deposits, withdrawals and payout flows, integrated into the back office and tied to the client record.",
                },
                {
                  title: "API / Integration",
                  body: "Open integration points so liquidity, payments and your internal systems connect instead of being re-keyed.",
                },
                {
                  title: "Risk",
                  body: "Exposure, utilisation and limits monitored across the book, with alerts as thresholds are approached.",
                },
                {
                  title: "Security",
                  body: "The platform and site are built with a security baseline: strict browser headers, input validation and no secrets in the bundle.",
                },
                {
                  title: "Monitoring",
                  body: "Operational visibility across clients, money and partners so issues surface before they become incidents.",
                },
              ].map((layer) => (
                <Card key={layer.title} variant="elevated" className="flex flex-col gap-2 p-5">
                  <div className="flex items-center justify-between">
                    <h3 className="type-h3">{layer.title}</h3>
                    <Badge tone="neutral">Layer</Badge>
                  </div>
                  <p className="flex-1 type-small text-text-muted">{layer.body}</p>
                  {"href" in layer && layer.href ? (
                    <ButtonLink href={layer.href} variant="ghost" size="sm" className="-mx-2 px-2">
                      {"linkLabel" in layer ? layer.linkLabel : "Learn more"} →
                    </ButtonLink>
                  ) : null}
                </Card>
              ))}
            </div>
          </div>
          </ScrollScene>

          {/* FAQ */}
          <ScrollScene>
            <FaqAccordion
              items={[
                {
                  question: "Do we connect our own liquidity providers?",
                  answer:
                    "Yes. The layer aggregates the sources you bring; the exact providers are confirmed during scoping. We do not state a fixed provider list.",
                },
                {
                  question: "Is FOREXAA a regulated liquidity provider?",
                  answer:
                    "No. FOREXAA supplies the technology. Regulated capabilities are delivered through partners and your own entity; the distinction is kept clear on every page.",
                },
                {
                  question: "How is risk handled across multiple platforms?",
                  answer:
                    "Exposure and utilisation are monitored across the book against the limits you set, with alerts as thresholds are approached. Depth is confirmed for your deployment.",
                },
              ]}
            />
          </ScrollScene>
        </div>
      </Section>
    </HubPage>
  );
}
