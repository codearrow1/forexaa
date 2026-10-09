# Phase 16 — Content Matrix

**Status:** complete
**Date:** 2026-10-08
**Purpose:** one-line strategic summary per route — audience, problem, value, primary CTA, related pages, claim risk. Basis for copy review and future edits; any new page must get a row here first.

**Claim risk:** Low = architecture/descriptive copy only · Medium = capability wording that could drift into performance claims if edited carelessly · High = would require registry claims (none currently published at High).

## Core + hubs

| Route | Audience | Core Problem | Core Value | Primary CTA | Related Pages | Claim risk |
|---|---|---|---|---|---|---|
| `/` | Prospective brokerage operators | Disconnected vendor stack; re-keyed data, fragmented risk | One connected system across all 7 layers | Build Your Brokerage → `/contact?intent=general` | Platforms (secondary) | Low |
| `/solutions` | Operators comparing models | Unclear which technology fits their business model | Solutions shaped per business model, one stack underneath | Build Your Brokerage → `/contact?intent=general` | Platforms, Broker Technology, Infrastructure | Low |
| `/platforms` | Client-facing trading decision | Which terminal(s) to offer clients | MT4/MT5/MT7/cTrader compared honestly; same CRM/back office/liquidity underneath | Request a platform demo → `/contact?intent=demo` | White label, Liquidity, Pricing | Low |
| `/broker-technology` | Operations-led operators | The operating layer is missing or home-grown | CRM, Trader's Room, Back Office, IB/Affiliate as one layer | Talk to the team → `/contact?intent=crm` | Platforms, Liquidity, Pricing | Low |
| `/infrastructure` | Technical/commercial scrollers | Liquidity, payments, risk and APIs sourced separately | One connectivity layer behind the operation | Discuss liquidity → `/contact?intent=liquidity` | Liquidity, Platforms, Pricing | Medium ("real-time", "multi-provider" — keep descriptive) |
| `/services` | Buyers wanting hands-on help | Launch/migration work unowned | Setup, migration, white label, support — verified scope only | Talk to the team → `/contact` | Broker Technology, Pricing | Low |
| `/pricing` | Commercial evaluators | Can't tell how pricing is structured | Three quote-based tiers; scope mapped to deployment | Request Pricing → `/contact?intent=pricing` | Broker Technology, Platforms, Infrastructure | Medium (price numbers are registry-gated; tiers stay "On request") |
| `/resources` | Researchers | Fragmented knowledge of brokerage tech | Guides/comparisons/glossary (published only when useful) | Explore the technology → `/platforms` | Solutions, Platforms | Low |
| `/company` | Due-diligence visitors | Who is behind FOREXAA? | Technology builder, one connected system, honest team framing | Build Your Brokerage → `/contact?intent=general` | Platforms (ghost) | Medium ("licensed partners" → owner confirm) |

## Solutions

| Route | Audience | Core Problem | Core Value | Primary CTA | Related Pages | Claim risk |
|---|---|---|---|---|---|---|
| `/solutions/new-brokerage` | First-time brokerage founders | Assembling vendors from scratch; integration backlog | Platform, CRM, liquidity, payments, compliance connected from day one | Plan Your Brokerage Launch → `/contact?intent=white-label` (secondary: Build Your Stack → `#stack-builder`) | — | Medium ("licensed partners" mention) |
| `/solutions/existing-broker` | Running brokerages | Legacy systems that can't be replaced at once | Modernize component-by-component or migrate wholesale | Build Your Brokerage → `/contact?intent=existing-broker` (secondary: Explore the CRM) | CRM | Low |
| `/solutions/prop-firm` | Prop firm founders | Challenge/payout operations aren't a retail CRM | Prop workflows, risk rules, payout operations on one stack | Build Your Brokerage → `/contact?intent=prop` (secondary: Explore the CRM) | CRM | Low |
| `/solutions/multi-asset` | Multi-asset operators | Instruments split across disconnected systems | One client record, one risk view across instruments | Build Your Brokerage → `/contact?intent=general` (secondary: Explore the Platform) | Platforms | Medium ("real time" wording — descriptive, keep) |
| `/solutions/social-copy` | Brokers adding social/copy | Copy models bolted on, not integrated | Social, copy, PAMM & MAM as a first-class layer | Build Your Brokerage (secondary: platform link) | Platforms, MT7 | Low |
| `/solutions/investment-platform` (planned) | Advisory/structured offering buyers | — | Planned — no detail page, not indexed | — | — | Low |

## Products (`/broker-technology/*`, `/platforms/*`, `/infrastructure/liquidity`, `/services/white-label`)

| Route | Audience | Core Problem | Core Value | Primary CTA | Related Pages (secondary CTA) | Claim risk |
|---|---|---|---|---|---|---|
| `/broker-technology/crm` | Brokers with scattered client data | Generic sales CRMs don't model brokerage lifecycle | Lead → KYC → funding → trading → retention in one system | Build Your Brokerage → `?intent=crm` | Back office (secondary) | Low |
| `/broker-technology/traders-room` | Brokers owning the client portal | Default portals feel disconnected | Branded client portal: onboarding, funding, trading | Build Your Brokerage → `?intent=general` | Platforms (secondary) | Low |
| `/broker-technology/back-office` | Operations teams | Console sprawl; manual reporting | Account mgmt, reports, operational controls in one console | Build Your Brokerage → `?intent=general` | CRM (secondary) | Low |
| `/broker-technology/ib-affiliate` | Growth-led brokers | Partner relationships tracked off-system | IB/affiliate network on the same client record | Build Your Brokerage → `?intent=general` | Back office (secondary) | Low |
| `/platforms/mt4-mt5` | Brokers starting out | The industry default — but wired separately | MT4/MT5 connected to CRM, back office, liquidity | Build Your Brokerage → `?intent=platform` | Compare Platforms (secondary) | Medium (third-party product naming — no MetaQuotes partnership claims made) |
| `/platforms/mt7` | Multi-market brokers | Beyond-FX coverage | MobiusTrader 7 multi-market terminal on the stack | Build Your Brokerage → `?intent=platform` | Social & copy (secondary) | Medium (third-party; MT7 trader count stays registry-pending) |
| `/platforms/ctrader` | Modern brokers; institutional positioning | Clients expect a modern interface | Institutional-grade interface connected to your operation | Build Your Brokerage → `?intent=platform` | Compare Platforms (secondary) | Low |
| `/infrastructure/liquidity` | Commercial + technical | Fragmented feeds; no unified routing | Providers → aggregation → routing → execution → accounts | Build Your Brokerage → `?intent=liquidity` | Platforms (secondary) | Medium ("low-latency", "deep" — descriptive only, no figures) |
| `/services/white-label` | Founders wanting a branded launch | Launching a brand without building every layer | Branded platform + stack, scoped per project | Build Your Brokerage → `?intent=white-label` | See how pricing works (secondary) | Low |
| `/solutions/social-copy` (product page parity) | Brokers adding copy models | Model trading as afterthought | Social/copy/PAMM/MAM native to the stack | Build Your Brokerage → `?intent=platform` | See the platforms it runs on (secondary) | Low |

## Trust, legal, contact

| Route | Audience | Core Problem | Core Value | Primary CTA | Related Pages | Claim risk |
|---|---|---|---|---|---|---|
| `/trust` | Security/compliance reviewers | "Can I trust this vendor?" | Trust topics in one place, no badge theater | Build Your Brokerage + Talk to FOREXAA (template panel) | Security, Compliance | Low |
| `/trust/security` | Technical reviewers | What is secured, what isn't | Website vs software vs customer vs dependencies — clear split | same template panel | — | Low |
| `/trust/compliance` | Legal-minded buyers | Is FOREXAA regulated? | Stated plainly: technology provider, not a regulated entity; licensed partners deliver regulated services | same template panel | — | Medium (partner licensing phrasing → owner) |
| `/trust/privacy` | Legal | Data handling | Policy in final review — honest placeholder | Contact link | — | Low |
| `/trust/risk-disclosure` | Legal / traders | Trading risk | Standard disclosure, no recommendations | — | — | Low |
| `/legal/privacy`, `/legal/terms`, `/legal/risk-disclosure` | Legal | — | "In final review" badge until owner publishes | Contact link (placeholder) | — | Low |
| `/contact` | All high-intent visitors | Reaching the right person | Intent-aware form; 9 valid intents; unknown → general | Submit (form) | — | Low (validation must not be weakened) |

## Homepage sections (§5–§8 audit summary)

| Section | Job | Verdict |
|---|---|---|
| Hero | Positioning + primary/secondary CTA | Keep H1; CTAs now registry-driven |
| Problem | Fragmented → connected | Strong; no claims |
| Brokerage OS | The signature interactive | Strong; "Not a collection of products" line is the brand thesis |
| Client experience / CRM / Trading / Liquidity / Risk / Partners / Operations | Layer-by-layer value | All descriptive; Partners lead fixed (design-note leak); no numbers |
| Complete stack | Summary of 7 layers | Strong |
| Final CTA | Conversion | Lead de-duplicated from hero; CTAs now registry-driven |
