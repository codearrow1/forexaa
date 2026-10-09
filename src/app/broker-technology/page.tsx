import { buildPageSeo, getRoute } from "@/lib/seo/page-meta";
import { HubPage } from "@/components/templates/hub-page";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { ArchitectureDiagram, WorkflowDiagram } from "@/components/product/visuals";
import { FaqAccordion } from "@/components/product/faq-accordion";
import { ScrollScene } from "@/components/story/primitives";
import { productBySlug } from "@/content/products";

const route = getRoute("/broker-technology");
const seo = buildPageSeo(route);
export const metadata = seo.metadata;

const PILLARS = ["crm", "traders-room", "back-office", "ib-affiliate", "social-copy"] as const;

/**
 * /broker-technology — pillar page (Rule 10): the operating layer behind a
 * brokerage. Architecture-led layout with product cards + a "what is it"
 * narrative. Links to every product child page.
 */
export default function BrokerTechnologyPage() {
  return (
    <HubPage
        path="/broker-technology"
        eyebrow="Broker Technology"
        title="The operating layer behind your brokerage"
        description="FOREXAA combines client operations, CRM, trading connectivity, partner management and brokerage infrastructure into one connected stack — so the whole operation runs as a system, not a pile of tools."
        related={[
          { label: "Trading platforms", href: "/platforms" },
          { label: "Liquidity infrastructure", href: "/infrastructure/liquidity" },
          { label: "Pricing", href: "/pricing" },
        ]}
        cta={{ label: "Talk to the team", href: "/contact?intent=crm" }}
      >
        <Section spacing="tight" className="!py-8">
          <div className="flex flex-col gap-10">
            <ScrollScene>
            <div className="flex flex-col gap-5">
              <Heading
                eyebrow="What is FOREXAA Broker Technology?"
                description="It is the layer between your clients and your markets: the CRM that knows every client, the back office that runs the day, the partner system that scales reach, and the connectivity that keeps trading, money and data in sync."
              >
                One stack, from first lead to executed trade
              </Heading>
              <p className="type-body max-w-3xl text-text-muted">
                Each piece below is a real page with its own workflow and
                detail. The hub is the map; the product pages are the manual.
              </p>
            </div>
            </ScrollScene>

            {/* Architecture (Rule 12): core info in accessible HTML. */}
            <ScrollScene>
            <ArchitectureDiagram
              caption="Conceptual — the way the layers connect in a FOREXAA deployment."
              layers={[
                { label: "Client", detail: "What your clients touch", items: ["Trader's Room", "Web / Mobile", "KYC"] },
                { label: "Operations", detail: "What your team runs", items: ["CRM", "Back Office", "Finance"] },
                { label: "Partners", detail: "How reach scales", items: ["IB / Affiliate", "Social", "Copy"] },
                { label: "Trading layer", detail: "Where orders execute", items: ["MT4 / MT5", "MT7", "cTrader"] },
                { label: "Infrastructure", detail: "What keeps it running", items: ["Liquidity", "Payments", "APIs"] },
              ]}
            />
            </ScrollScene>

            {/* Product cards → child pages */}
            <ScrollScene>
            <div className="flex flex-col gap-5">
              <Heading eyebrow="The products" level={2}>
                Five systems, one operation
              </Heading>
              <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                {PILLARS.map((slug) => {
                  const product = productBySlug(slug);
                  if (!product) return null;
                  const hrefs: Record<string, string> = {
                    crm: "/broker-technology/crm",
                    "traders-room": "/broker-technology/traders-room",
                    "back-office": "/broker-technology/back-office",
                    "ib-affiliate": "/broker-technology/ib-affiliate",
                    "social-copy": "/solutions/social-copy",
                  };
                  const href = hrefs[slug];
                  if (!href) return null;
                  return (
                    <Card key={slug} variant="elevated" interactive className="flex flex-col gap-3 p-5">
                      <div className="flex items-center justify-between">
                        <h3 className="type-h3">{product.name}</h3>
                        <Badge tone="primary">{product.eyebrow}</Badge>
                      </div>
                      <p className="flex-1 type-small text-text-muted">{product.tagline}</p>
                      <ButtonLink href={href} variant="ghost" size="sm" className="-mx-2 px-2">
                        Open {product.name} →
                      </ButtonLink>
                    </Card>
                  );
                })}
              </div>
            </div>
            </ScrollScene>

            {/* Who it's for */}
            <ScrollScene>
            <div className="flex flex-col gap-5">
              <Heading eyebrow="Who it's for" level={2}>
                For the teams that run the book
              </Heading>
              <div className="grid gap-3 md:grid-cols-2">
                {[
                  "Operations teams who run clients, accounts and money",
                  "Compliance teams who need audit-grade records",
                  "Partner managers scaling an IB or affiliate program",
                  "Founders standardizing a growing brokerage",
                ].map((audience) => (
                  <div key={audience} className="rounded-xl border border-border bg-surface p-5">
                    <p className="type-body text-text">{audience}</p>
                  </div>
                ))}
              </div>
            </div>
            </ScrollScene>

            {/* Integrations */}
            <ScrollScene>
            <div className="flex flex-col gap-5">
              <Heading eyebrow="Integrations" level={2}>
                Connects to the rest of the stack
              </Heading>
              <WorkflowDiagram
                steps={["Trading platforms", "Liquidity", "Payments", "Client portal", "Partner system"]}
                note="The broker-technology layer sits above the infrastructure and beside the platforms, sharing one client record."
              />
            </div>
            </ScrollScene>

            {/* FAQ */}
            <ScrollScene>
              <FaqAccordion
                items={[
                  {
                    question: "Is broker technology a separate purchase from the platforms?",
                    answer:
                      "It is a distinct layer you can adopt alongside the platform you run. You can start with the CRM and back office, or deploy it with a white-label platform as one plan.",
                  },
                  {
                    question: "Can an existing broker adopt it without a full rebuild?",
                    answer:
                      "Yes. It is designed to connect to an existing operation and extend it; migration scope is confirmed per project.",
                  },
                  {
                    question: "What does the architecture look like?",
                    answer:
                      "Client-facing, operations, partner, trading and infrastructure layers share one client record, so data flows between them instead of being re-entered.",
                  },
                ]}
              />
            </ScrollScene>
          </div>
        </Section>
      </HubPage>
  );
}
