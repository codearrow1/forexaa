import { getRoute, buildPageSeo } from "@/lib/seo/page-meta";
import { JsonLdGraph } from "@/components/shared/json-ld";
import { HeroV2 } from "@/components/marketing/home-v2/hero";
import { BrokerageOS } from "@/components/marketing/home-v2/brokerage-os";
import {
  ProblemSection,
  ClientExperienceSection,
  CRMSection,
  TradingSection,
  LiquiditySection,
  RiskSection,
  PartnersSection,
  OperationsSection,
  CompleteStackSection,
  FinalCTASection,
} from "@/components/marketing/home-v2/sections";

/**
 * Homepage V2 (Phase 12A) — premium B2B brokerage-infrastructure transformation.
 *
 * Narrative: Market/Hero → Problem → Brokerage OS → Client Experience → CRM →
 * Trading → Liquidity → Risk → Partners → Operations → Complete Stack → CTA.
 * 12 varied sections; product UI is the star. Server-rendered with small
 * client islands (hero visual, Brokerage OS interaction).
 */
const seo = buildPageSeo(getRoute("/"));

export const metadata = seo.metadata;

export default function Home() {
  return (
    <>
      <JsonLdGraph nodes={seo.jsonLd} />
      <HeroV2 />
      <ProblemSection />
      <BrokerageOS />
      <ClientExperienceSection />
      <CRMSection />
      <TradingSection />
      <LiquiditySection />
      <RiskSection />
      <PartnersSection />
      <OperationsSection />
      <CompleteStackSection />
      <FinalCTASection />
    </>
  );
}
