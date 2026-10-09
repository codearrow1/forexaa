/**
 * Mega-menu content (Rule 76-79). Only real implemented destinations or
 * approved hubs are shown. Groups keep menus scannable — no 30-link dumps.
 */

export interface MenuLink {
  readonly label: string;
  readonly href: string;
  readonly description?: string;
}

export interface MenuGroup {
  readonly heading: string;
  readonly links: readonly MenuLink[];
}

export interface SectionMenu {
  readonly label: string;
  readonly href: string;
  readonly groups: readonly MenuGroup[];
  /** Short one-line blurb shown in the panel. */
  readonly blurb?: string;
}

export const SECTION_MENUS: readonly SectionMenu[] = [
  {
    label: "Solutions",
    href: "/solutions",
    blurb: "Technology shaped around your business model.",
    groups: [
      {
        heading: "Solutions",
        links: [
          { label: "All solutions", href: "/solutions", description: "New, existing, prop, multi-asset" },
          { label: "Social & copy trading", href: "/solutions/social-copy", description: "Social, copy, PAMM & MAM" },
        ],
      },
    ],
  },
  {
    label: "Platforms",
    href: "/platforms",
    blurb: "The trading experience your clients get.",
    groups: [
      {
        heading: "Platforms",
        links: [
          { label: "MT4 / MT5", href: "/platforms/mt4-mt5", description: "The common starting point" },
          { label: "MT7 / MobiusTrader", href: "/platforms/mt7", description: "Multi-market terminal" },
          { label: "cTrader", href: "/platforms/ctrader", description: "Institutional-grade" },
          { label: "All platforms", href: "/platforms", description: "Compare the options" },
        ],
      },
    ],
  },
  {
    label: "Broker Technology",
    href: "/broker-technology",
    blurb: "The operating layer behind your brokerage.",
    groups: [
      {
        heading: "Systems",
        links: [
          { label: "Forex CRM", href: "/broker-technology/crm", description: "Client lifecycle in one system" },
          { label: "Trader's Room", href: "/broker-technology/traders-room", description: "Your clients' portal" },
          { label: "Back Office", href: "/broker-technology/back-office", description: "The operations console" },
          { label: "IB / Affiliate", href: "/broker-technology/ib-affiliate", description: "Your partner network" },
        ],
      },
      {
        heading: "Explore",
        links: [
          { label: "All broker technology", href: "/broker-technology", description: "Architecture & pillars" },
          { label: "Social / Copy / PAMM / MAM", href: "/solutions/social-copy", description: "Managed trading models" },
        ],
      },
    ],
  },
  {
    label: "Infrastructure",
    href: "/infrastructure",
    blurb: "Liquidity, payments, risk and APIs.",
    groups: [
      {
        heading: "Infrastructure",
        links: [
          { label: "Forex Liquidity", href: "/infrastructure/liquidity", description: "The connectivity layer" },
          { label: "All infrastructure", href: "/infrastructure", description: "Payments, risk, security, monitoring" },
        ],
      },
    ],
  },
  {
    label: "Services",
    href: "/services",
    blurb: "What the team does for you.",
    groups: [
      {
        heading: "Services",
        links: [
          { label: "White Label", href: "/services/white-label", description: "Launch a branded brokerage" },
          { label: "All services", href: "/services", description: "Setup, migration, support" },
        ],
      },
    ],
  },
  {
    label: "Resources",
    href: "/resources",
    blurb: "Guides and reference material.",
    groups: [
      {
        heading: "Resources",
        links: [{ label: "Resource hub", href: "/resources", description: "Guides, comparisons, glossary" }],
      },
    ],
  },
  {
    label: "Company",
    href: "/company",
    blurb: "About FOREXAA.",
    groups: [
      {
        heading: "Company",
        links: [
          { label: "About", href: "/company", description: "Who we are" },
          { label: "Contact", href: "/contact", description: "Talk to the team" },
          { label: "Pricing", href: "/pricing", description: "How plans work" },
        ],
      },
    ],
  },
] as const;

/** Mobile nav priority (Rule 79): not a vertical copy of the mega menu. */
export const MOBILE_MENU = [
  { label: "Talk to FOREXAA", href: "/contact", primary: true },
  { label: "Solutions", href: "/solutions" },
  { label: "Platforms", href: "/platforms" },
  { label: "Broker Technology", href: "/broker-technology" },
  { label: "Infrastructure", href: "/infrastructure" },
  { label: "Services", href: "/services" },
  { label: "Resources", href: "/resources" },
  { label: "Pricing", href: "/pricing" },
] as const;
