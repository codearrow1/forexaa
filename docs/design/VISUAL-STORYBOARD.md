# VISUAL STORYBOARD — Phase 4

The homepage tells the story of how a modern brokerage works, in 10 scenes.
The visitor should feel: "I am seeing how a modern brokerage works" → "I can
see where FOREXAA fits" → "I want to explore the technology" → "I want to
talk to them."

## Scene 01 — Market (Hero)
- **Purpose:** Establish the world — the market.
- **Visual:** Dark obsidian field, animated market grid, cyan/violet data
  trails, floating FOREXAA operating console with 5 connected nodes (CRM,
  Trading, Liquidity, Payments, Risk).
- **Animation:** Staged load sequence (grid → trails → nodes → console →
  headline → CTA). Fast enough that users aren't forced to wait.
- **Copy:** "The Technology Behind Modern Brokerages." + 1-2 line support.
- **CTA:** Explore the Ecosystem / Book a Demo.
- **Mobile:** Stacked, reduced particles, static console fallback.
- **Reduced motion:** All elements visible instantly, no animation.
- **Performance risk:** Hero is LCP — preload only the console asset.

## Scene 02 — Brokerage (System)
- **Purpose:** "A modern brokerage is more than a trading platform."
- **Visual:** 7 layers (CLIENT → OPERATIONS → TRADING → LIQUIDITY → PAYMENTS →
  RISK → PARTNERS) assemble as the user scrolls.
- **Animation:** Scroll-triggered assembly, alternating slide directions.
- **Copy:** Minimal — one headline + one supporting line.
- **CTA:** None (storytelling scene).
- **Mobile:** Vertical stack, no slide animation.
- **Reduced motion:** All layers visible instantly.
- **Performance risk:** Low — static HTML + CSS animation.

## Scene 03 — Client (Trader's Room)
- **Purpose:** Show the client-facing experience.
- **Visual:** Trader's Room interface — registration → KYC → dashboard →
  account → deposit → trading → support.
- **Animation:** Interface states evolve on scroll.
- **Copy:** "Give clients one connected digital experience."
- **CTA:** None.
- **Mobile:** Stacked states, no morph.
- **Reduced motion:** All states visible.
- **Performance risk:** Medium — synthetic UI, no real images.

## Scene 04 — Operations (CRM)
- **Purpose:** Transition from client interface to CRM.
- **Visual:** Synthetic CRM dashboard — lead → client → account → deposit →
  trade → support.
- **Animation:** Workflow steps connect on scroll.
- **Copy:** "The CRM that runs the client lifecycle."
- **CTA:** Explore the CRM.
- **Mobile:** Vertical workflow.
- **Reduced motion:** Static workflow.
- **Performance risk:** Low.

## Scene 05 — Trading (Platforms)
- **Purpose:** Platform choice without 6 boring cards.
- **Visual:** Platform selector — MT4/MT5, MT7, cTrader, Web, Mobile.
  Clicking/hovering shifts the active platform and shows its detail.
- **Animation:** Tab transition with content crossfade.
- **Copy:** "Choose the trading experience your clients get."
- **CTA:** Compare platforms.
- **Mobile:** Accordion.
- **Reduced motion:** Instant tab switch.
- **Performance risk:** Low.

## Scene 06 — Liquidity
- **Purpose:** The cinematic technical scene.
- **Visual:** LP streams → FOREXAA connectivity → pricing/aggregation →
  risk/routing → execution → platforms. Animated flow lines.
- **Animation:** Scroll-linked data flow, nodes pulse as flow passes.
- **Copy:** "Liquidity is what makes a platform a business."
- **CTA:** Discuss your liquidity architecture.
- **Mobile:** Vertical flow, reduced animation.
- **Reduced motion:** Static diagram.
- **Performance risk:** Medium — SVG animation, keep it light.

## Scene 07 — Risk
- **Purpose:** The risk layer between operations and market.
- **Visual:** Exposure, margin, positions, accounts, risk controls. Synthetic
  charts/indicators. Animated threshold change.
- **Animation:** Risk indicator animates to show threshold breach.
- **Copy:** "Risk sits between your operations and the market."
- **CTA:** None.
- **Mobile:** Stacked indicators.
- **Reduced motion:** Static indicators.
- **Performance risk:** Low.

## Scene 08 — Partners
- **Purpose:** The broker's network.
- **Visual:** Broker → IBs → Affiliates → Traders → Liquidity → Payments →
  Technology. Nodes connect on scroll.
- **Animation:** Network assembly.
- **Copy:** "Your network is your reach."
- **CTA:** None.
- **Mobile:** Vertical network.
- **Reduced motion:** Static network.
- **Performance risk:** Low.

## Scene 09 — Complete Stack
- **Purpose:** The emotional payoff — everything converges.
- **Visual:** All systems converge into "FOREXAA BROKERAGE OS" — CRM,
  Trading, Liquidity, Risk, Payments, IB, Client, Analytics.
- **Animation:** Radial convergence.
- **Copy:** "FOREXAA connects the entire brokerage operation."
- **CTA:** Book a Demo.
- **Mobile:** Grid layout.
- **Reduced motion:** Static grid.
- **Performance risk:** Low.

## Scene 10 — Conversion
- **Purpose:** Clean CTA after the complex system.
- **Visual:** Dark background, minimal copy, strong CTA.
- **Animation:** Subtle fade-in.
- **Copy:** "Build the technology behind your brokerage."
- **CTA:** Book a Demo / Explore the Platform.
- **Mobile:** Same.
- **Reduced motion:** Instant.
- **Performance risk:** Low.

## Product page storyboards

Each product page follows the same 6-scene structure (Rule 27):
1. Hero visual (InteractiveDashboard with product's visualStates)
2. Major product scene (capabilities as visual cards)
3. Workflow scene (ArchitectureFlow)
4. Integration scene (HorizontalStory)
5. CTA scene

See `docs/design/PRODUCT-UI.md` for the product visual language.
