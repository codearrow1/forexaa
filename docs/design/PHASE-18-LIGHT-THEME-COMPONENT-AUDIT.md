# PHASE 18 — LIGHT-THEME COMPONENT AUDIT

## Architecture
- src/lib/theme/server-theme.ts — server cookie read
- src/components/theme/theme-controller.tsx — controller
- src/components/theme/theme-toggle.tsx — toggle
- src/app/globals.css — semantic tokens (dark baseline + light)

## Components
| Component | File | Status |
|---|---|---|
| MarketGrid | src/components/marketing/market-grid.tsx | DARK-ONLY (needs light) |
| Hero | home-v2/hero.tsx | DARK-ONLY |
| Sections | home-v2/sections.tsx | DARK-ONLY |
| BrokerageOS | home-v2/brokerage-os.tsx | DARK-ONLY |
| HeroArchitecture | home-v2/hero-architecture.tsx | DARK-ONLY |
| ProductInterface | home-v2/product-interface.tsx | DARK-ONLY |
| PageVisuals | product/page-visuals.tsx | DARK-ONLY (large) |
| SolutionVisuals | product/solution-visuals.tsx | DARK-ONLY |
| Visuals | product/visuals.tsx | DARK-ONLY |
| ContactForm | product/contact-form.tsx | INSPECTION NEEDED |
| IntegrationScene | product/integration-scene.tsx | INSPECTION NEEDED |
| StackBuilder | product/stack-builder.tsx | INSPECTION NEEDED |
| RelatedProducts | product/related-products.tsx | INSPECTION NEEDED |
| FAQAccordion | product/faq-accordion.tsx | INSPECTION NEEDED |
| Card | ui/card.tsx | INSPECTION NEEDED |
| Button | ui/button.tsx | INSPECTION NEEDED |
| Badge | ui/badge.tsx | INSPECTION NEEDED |
| Input | ui/input.tsx | INSPECTION NEEDED |
| Modal | ui/modal.tsx | INSPECTION NEEDED |
| Dropdown | ui/dropdown.tsx | INSPECTION NEEDED |
| Tabs | ui/tabs.tsx | INSPECTION NEEDED |
| Tooltip | ui/tooltip.tsx | INSPECTION NEEDED |
| Layout: AppBackground | layout/app-background.tsx | INSPECTION NEEDED |
| Layout: SiteHeader | layout/site-header.tsx | PARTIAL (toggle done) |
| Layout: SiteFooter | layout/site-footer.tsx | INSPECTION NEEDED |
