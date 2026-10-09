/**
 * Keyword map (machine-readable mirror of docs/seo/KEYWORD-MAP.md).
 *
 * One owner per query (no cannibalization). `target` must be a known
 * registry path (live or planned). Status: "mapped" = decision made,
 * page not yet built; "built" = page exists with real content.
 *
 * SERP observation (see docs/seo/KEYWORD-MAP.md for method): top results
 * for these queries are B2Broker, Leverate, UpTrader, Soft-FX, GTC,
 * FXSOFT, Match-Trader, Finalto, MetaQuotes, cTrader/Spotware. They win on
 * product depth, pricing transparency, awards/testimonials and hub +
 * deep-link IA. Forexxa's gap: clear product separation + an honest
 * "what's in the stack" story without unverifiable stats.
 */

export interface KeywordTopic {
  readonly primary: string;
  readonly intent: string;
  readonly target: string;
  readonly secondary: readonly string[];
  readonly serp: readonly string[];
  readonly priority: "high" | "medium" | "low";
  readonly status: "built" | "mapped";
}

export const KEYWORD_TOPICS: readonly KeywordTopic[] = [
  {
    primary: "forex CRM / forex broker CRM / forex CRM software",
    intent: "commercial-investigation",
    target: "/broker-technology",
    secondary: ["forex back office", "MT5 CRM", "MT4 CRM", "forex CRM features"],
    serp: ["b2broker (B2CORE)", "leverate (turnkey-forex)", "fxsoft", "soft-fx", "gtc"],
    priority: "high",
    status: "built",
  },
  {
    primary: "forex white label / MT5 white label / MT4 white label",
    intent: "commercial-investigation",
    target: "/platforms",
    secondary: [
      "MT7 white label",
      "cTrader white label",
      "white label forex broker",
      "white label vs full license",
    ],
    serp: ["b2broker", "leverate", "uptrader", "match-trader", "fxsoft"],
    priority: "high",
    status: "built",
  },
  {
    primary: "forex liquidity / forex liquidity provider",
    intent: "commercial-investigation",
    target: "/infrastructure",
    secondary: ["forex liquidity solutions", "liquidity aggregation", "A-book B-book"],
    serp: ["b2broker (liquidity)", "leverate prime", "justfx", "finalto"],
    priority: "high",
    status: "built",
  },
  {
    primary: "forex broker technology / brokerage software",
    intent: "commercial-investigation",
    target: "/",
    secondary: ["forex broker platform", "brokerage technology stack", "launch forex broker"],
    serp: ["b2broker", "leverate", "uptrader", "devexperts", "metaquotes"],
    priority: "high",
    status: "built",
  },
  {
    primary: "prop trading CRM / prop firm technology",
    intent: "commercial-investigation",
    target: "/solutions",
    secondary: ["prop firm software", "challenge platform"],
    serp: ["leverate (prop)", "b2broker prop"],
    priority: "medium",
    status: "mapped",
  },
  {
    primary: "forex IB software / affiliate system",
    intent: "commercial-investigation",
    target: "/broker-technology/ib-affiliate",
    secondary: ["multi-level IB commissions"],
    serp: ["leverate", "soft-fx", "fxsoft"],
    priority: "medium",
    status: "built",
  },
  {
    primary: "how to start a forex broker / launch a forex brokerage",
    intent: "problem-solving",
    target: "/solutions",
    secondary: ["forex brokerage setup", "forex broker compliance"],
    serp: ["leverate blog", "b2broker articles", "finalto guides"],
    priority: "medium",
    status: "mapped",
  },
  {
    primary: "FOREXAA (navigational)",
    intent: "navigational",
    target: "/",
    secondary: ["forexaa login", "forexaa pricing", "forexaa contact"],
    serp: [],
    priority: "high",
    status: "built",
  },
  {
    primary: "forex CRM pricing",
    intent: "transactional",
    target: "/pricing",
    secondary: ["white label cost", "brokerage software pricing"],
    serp: ["b2broker (public pricing)", "leverate (public pricing)"],
    priority: "medium",
    status: "built",
  },
  {
    primary: "social trading / PAMM MAM / copy trading platform",
    intent: "commercial-investigation",
    target: "/solutions/social-copy",
    secondary: ["PAMM software", "MAM allocation", "copy trading for brokers"],
    serp: ["b2broker (B2COPY)", "leverate (social trading)"],
    priority: "medium",
    status: "built",
  },
  {
    primary: "launch a new forex brokerage / start a forex broker",
    intent: "problem-solving",
    target: "/solutions/new-brokerage",
    secondary: ["forex broker setup", "brokerage technology stack", "forex broker launch"],
    serp: ["leverate blog", "b2broker articles", "finalto guides"],
    priority: "high",
    status: "built",
  },
  {
    primary: "forex broker migration / upgrade brokerage technology",
    intent: "problem-solving",
    target: "/solutions/existing-broker",
    secondary: ["broker CRM migration", "replace broker platform", "brokerage modernization"],
    serp: ["leverate", "b2broker", "gtc"],
    priority: "medium",
    status: "built",
  },
  {
    primary: "prop firm technology / prop trading platform",
    intent: "commercial-investigation",
    target: "/solutions/prop-firm",
    secondary: ["prop firm software", "challenge evaluation", "prop trading infrastructure"],
    serp: ["leverate (prop)", "b2broker prop"],
    priority: "medium",
    status: "built",
  },
  {
    primary: "multi-asset brokerage / forex crypto metals",
    intent: "commercial-investigation",
    target: "/solutions/multi-asset",
    secondary: ["multi-asset platform", "forex crypto broker", "CFD brokerage"],
    serp: ["b2broker", "leverate", "devexperts"],
    priority: "medium",
    status: "built",
  },
  {
    primary: "FOREXAA trust / security / compliance",
    intent: "navigational",
    target: "/trust",
    secondary: ["FOREXAA security", "FOREXAA privacy", "FOREXAA compliance"],
    serp: [],
    priority: "low",
    status: "built",
  },
  {
    primary: "FOREXAA partners / integrations",
    intent: "navigational",
    target: "/company/partners",
    secondary: ["FOREXAA integrations", "FOREXAA technology partners"],
    serp: [],
    priority: "low",
    status: "built",
  },
] as const;
