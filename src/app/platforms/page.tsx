import { buildPageSeo, getRoute } from "@/lib/seo/page-meta";
import { HubPage } from "@/components/templates/hub-page";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { DataTable, ArchitectureDiagram, IllustrativeTag } from "@/components/product/visuals";
import { FaqAccordion } from "@/components/product/faq-accordion";
import { ScrollScene } from "@/components/story/primitives";

const route = getRoute("/platforms");
const seo = buildPageSeo(route);
export const metadata = seo.metadata;

/**
 * /platforms — platform discovery hub (Rule 20). Comparison-led layout:
 * a factual comparison table (no scoring), per-platform cards, integration
 * architecture, "which is right for you", FAQ.
 */
export default function PlatformsPage() {
  return (
    <HubPage
      path="/platforms"
      eyebrow="Platforms"
      title="Choose the trading experience your clients get"
      description="Run your brokerage on MetaTrader 4 or 5, MobiusTrader 7, cTrader, or web and mobile trading — each connected to the same CRM, back office and liquidity layer."
      related={[
        { label: "White label service", href: "/services/white-label" },
        { label: "Liquidity infrastructure", href: "/infrastructure/liquidity" },
        { label: "Pricing", href: "/pricing" },
      ]}
      cta={{ label: "Request a platform demo", href: "/contact?intent=demo" }}
    >
      <Section spacing="tight" className="!py-8">
        <div className="flex flex-col gap-10">
          <Heading eyebrow="Lineup" level={2}>
            The platforms you can deploy
          </Heading>

          {/* Platform cards */}
          <ScrollScene>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            {[
              { name: "MetaTrader 4 / 5", href: "/platforms/mt4-mt5", note: "The most common starting point" },
              { name: "MobiusTrader 7", href: "/platforms/mt7", note: "Next-generation, multi-market" },
              { name: "cTrader", href: "/platforms/ctrader", note: "Institutional-grade terminal" },
              { name: "Web & Mobile", href: "/platforms", note: "Access across all platforms" },
            ].map((platform) => (
              <Card key={platform.name} variant="elevated" interactive className="flex flex-col gap-3 p-5">
                <div className="flex items-center justify-between">
                  <h3 className="type-body font-semibold text-text">{platform.name}</h3>
                </div>
                <p className="flex-1 type-small text-text-muted">{platform.note}</p>
                {platform.href !== "/platforms" ? (
                  <ButtonLink href={platform.href} variant="ghost" size="sm" className="-mx-2 px-2">
                    Open {platform.name} →
                  </ButtonLink>
                ) : (
                  <span className="type-caption text-text-muted">Covered on this page</span>
                )}
              </Card>
            ))}
          </div>
          </ScrollScene>

          {/* Comparison table (factual, no scoring — Rule 21/46/85) */}
          <ScrollScene>
          <div className="flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <Heading eyebrow="Compare" level={2}>
                Platform comparison
              </Heading>
              <Badge tone="neutral">Technical comparison — not a ranking</Badge>
            </div>
            <DataTable
              caption="Factual comparison of the platforms available in a FOREXAA deployment."
              columns={["Attribute", "MT4 / MT5", "MT7", "cTrader", "Web & Mobile"]}
              rows={[
                ["Typical role", "Forex/CFD retail & institutional", "Multi-market, social", "Institutional-grade", "Cross-platform access"],
                ["Desktop terminal", "Yes", "Yes", "Yes", "—"],
                ["Web trading", "MT5", "Yes", "Yes", "Native"],
                ["Mobile", "Yes", "Yes", "Yes", "Native"],
                ["CRM relationship", "Connected", "Connected", "Connected", "Connected"],
                ["Customization", "High", "High", "High", "Branded"],
                ["API / integration", "MQL / bridge", "API", "cTrader API", "Via platforms"],
              ]}
            />
            <p className="type-small text-text-muted">
              This is a technical comparison, not a recommendation. The right
              platform depends on your client base and structure — it is
              confirmed during scoping, not scored here.
            </p>
          </div>
          </ScrollScene>

          {/* Web + Mobile as sub-section (Rule 25: not separate pages) */}
          <ScrollScene>
          <div className="flex flex-col gap-5">
            <Heading eyebrow="Web & Mobile" level={2}>
              Clients reach every platform from any device
            </Heading>
            <div className="grid gap-3 md:grid-cols-2">
              <Card variant="elevated" className="p-5">
                <h3 className="type-body font-semibold text-text">Web trading</h3>
                <p className="mt-1.5 type-small text-text-muted">
                  Browser-based access across the platforms you deploy, with
                  charts, orders and account management — no install.
                </p>
              </Card>
              <Card variant="elevated" className="p-5">
                <h3 className="type-body font-semibold text-text">Mobile trading</h3>
                <p className="mt-1.5 type-small text-text-muted">
                  iOS and Android access so clients trade, monitor and manage
                  accounts from anywhere, in sync with their desktop session.
                </p>
              </Card>
            </div>
          </div>
          </ScrollScene>

          {/* Integration architecture (Rule 26) */}
          <ScrollScene>
          <div className="flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <Heading eyebrow="Integration architecture" level={2}>
                How platforms connect to your operation
              </Heading>
              <IllustrativeTag label="Conceptual architecture" />
            </div>
            <ArchitectureDiagram
              caption="Every platform sits on the same FOREXAA layer — one CRM record, one liquidity and risk path."
              layers={[
                { label: "Client", items: ["Web", "Mobile", "Desktop"], tone: "cyan" },
                { label: "FOREXAA layer", detail: "CRM · Back office · Risk", tone: "cyan" },
                { label: "Trading", items: ["MT4", "MT5", "MT7", "cTrader"], tone: "violet" },
                { label: "Liquidity", detail: "Pricing, execution, routing", tone: "mint" },
              ]}
            />
          </div>
          </ScrollScene>

          {/* Which platform is right for you */}
          <ScrollScene>
          <div className="flex flex-col gap-5">
            <Heading eyebrow="Fit" level={2}>
              Which platform fits your brokerage
            </Heading>
            <div className="grid gap-3 md:grid-cols-3">
              {[
                {
                  title: "Clients expect MetaTrader",
                  body: "MT4 or MT5 keeps the familiar environment while FOREXAA modernizes the operations underneath.",
                },
                {
                  title: "You want a newer terminal",
                  body: "MT7 and cTrader offer a modern, multi-market or institutional experience, with social capability on MT7.",
                },
                {
                  title: "You serve advanced clients",
                  body: "cTrader's depth and data suit more sophisticated traders; the right choice is confirmed against your client base.",
                },
              ].map((fit) => (
                <Card key={fit.title} variant="default" className="flex flex-col gap-2 p-5">
                  <h3 className="type-body font-semibold text-text">{fit.title}</h3>
                  <p className="type-small text-text-muted">{fit.body}</p>
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
                  question: "Can we run more than one platform at once?",
                  answer:
                    "Yes. A deployment can include multiple platforms behind one CRM, back office and liquidity layer, so clients on different platforms share the same operational data.",
                },
                {
                  question: "Do you say one platform is the best?",
                  answer:
                    "No. The comparison is technical and factual. The best fit depends on your clients and structure, which is why it is confirmed in a demo rather than asserted here.",
                },
                {
                  question: "Are web and mobile separate products?",
                  answer:
                    "They are access modes of the platforms you deploy, not separate products — which is why they are covered on this page rather than on their own.",
                },
              ]}
            />
          </ScrollScene>
        </div>
      </Section>
    </HubPage>
  );
}
