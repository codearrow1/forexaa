/**
 * Central asset registry (Rule 74). All image/visual paths live here —
 * components never scatter raw string paths.
 *
 * Phase 4 assets are original SVG/CSS compositions or generated artwork.
 * No stock photography, no competitor imagery (Rule 38/39).
 */

export const ASSETS = {
  brand: {
    logo: "/icons/forexaa-mark.svg",
    logoLight: "/icons/forexaa-mark.svg",
  },
  hero: {
    marketGrid: "/scenes/market-grid.svg",
    dataTrails: "/scenes/data-trails.svg",
    consoleNodes: "/scenes/console-nodes.svg",
  },
  scenes: {
    brokerageSystem: "/scenes/brokerage-system.svg",
    clientPortal: "/scenes/client-portal.svg",
    crmWorkflow: "/scenes/crm-workflow.svg",
    tradingOrbit: "/scenes/trading-orbit.svg",
    liquidityStreams: "/scenes/liquidity-streams.svg",
    riskLayer: "/scenes/risk-layer.svg",
    partnerNetwork: "/scenes/partner-network.svg",
    completeStack: "/scenes/complete-stack.svg",
  },
  products: {
    crm: "/products/crm-dashboard.svg",
    tradersRoom: "/products/traders-room.svg",
    backOffice: "/products/back-office.svg",
    ibAffiliate: "/products/ib-affiliate.svg",
    mt4mt5: "/products/mt4-mt5.svg",
    mt7: "/products/mt7.svg",
    ctrader: "/products/ctrader.svg",
    liquidity: "/products/liquidity.svg",
    whiteLabel: "/products/white-label.svg",
    socialCopy: "/products/social-copy.svg",
  },
  platforms: {
    mt4: "/platforms/mt4.svg",
    mt5: "/platforms/mt5.svg",
    mt7: "/platforms/mt7.svg",
    ctrader: "/platforms/ctrader.svg",
    web: "/platforms/web.svg",
    mobile: "/platforms/mobile.svg",
  },
  infrastructure: {
    liquidity: "/infrastructure/liquidity.svg",
    payments: "/infrastructure/payments.svg",
    api: "/infrastructure/api.svg",
    security: "/infrastructure/security.svg",
  },
  social: {
    ogDefault: "/opengraph-image",
  },
} as const;

export type AssetPath = string;
