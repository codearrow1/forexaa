# PHASE 10 — RENDERING MATRIX

All routes inherit `export const dynamic = "force-dynamic"` from the root
layout (`src/app/layout.tsx`). No route declares its own `dynamic`,
`revalidate`, `dynamicParams`, `headers()`, or `cookies()`. Only `/contact`
consumes request data (`searchParams`).

| Route | Render mode | Why | Request dep | Client boundary | Cache policy | CSP implication |
| --- | --- | --- | --- | --- | --- | --- |
| `/` | force-dynamic (inherited) | nonce/CSP | none | header, template, scenes | `private, no-cache, no-store` | per-request nonce embedded |
| `/solutions` | force-dynamic (inherited) | nonce/CSP | none | header, template | `private, no-cache, no-store` | per-request nonce embedded |
| `/solutions/new-brokerage` | force-dynamic (inherited) | nonce/CSP | none | header, template, solution-visuals | `private, no-cache, no-store` | per-request nonce embedded |
| `/solutions/existing-broker` | force-dynamic (inherited) | nonce/CSP | none | header, template, solution-visuals | `private, no-cache, no-store` | per-request nonce embedded |
| `/solutions/prop-firm` | force-dynamic (inherited) | nonce/CSP | none | header, template, solution-visuals | `private, no-cache, no-store` | per-request nonce embedded |
| `/solutions/multi-asset` | force-dynamic (inherited) | nonce/CSP | none | header, template, solution-visuals | `private, no-cache, no-store` | per-request nonce embedded |
| `/solutions/social-copy` | force-dynamic (inherited) | nonce/CSP | none | header, template | `private, no-cache, no-store` | per-request nonce embedded |
| `/platforms` | force-dynamic (inherited) | nonce/CSP | none | header, template | `private, no-cache, no-store` | per-request nonce embedded |
| `/platforms/mt4-mt5` | force-dynamic (inherited) | nonce/CSP | none | header, template | `private, no-cache, no-store` | per-request nonce embedded |
| `/platforms/mt7` | force-dynamic (inherited) | nonce/CSP | none | header, template | `private, no-cache, no-store` | per-request nonce embedded |
| `/platforms/ctrader` | force-dynamic (inherited) | nonce/CSP | none | header, template | `private, no-cache, no-store` | per-request nonce embedded |
| `/broker-technology` | force-dynamic (inherited) | nonce/CSP | none | header, template | `private, no-cache, no-store` | per-request nonce embedded |
| `/broker-technology/crm` | force-dynamic (inherited) | nonce/CSP | none | header, template, page-visuals | `private, no-cache, no-store` | per-request nonce embedded |
| `/broker-technology/traders-room` | force-dynamic (inherited) | nonce/CSP | none | header, template | `private, no-cache, no-store` | per-request nonce embedded |
| `/broker-technology/back-office` | force-dynamic (inherited) | nonce/CSP | none | header, template | `private, no-cache, no-store` | per-request nonce embedded |
| `/broker-technology/ib-affiliate` | force-dynamic (inherited) | nonce/CSP | none | header, template | `private, no-cache, no-store` | per-request nonce embedded |
| `/infrastructure` | force-dynamic (inherited) | nonce/CSP | none | header, template | `private, no-cache, no-store` | per-request nonce embedded |
| `/infrastructure/liquidity` | force-dynamic (inherited) | nonce/CSP | none | header, template, solution-visuals | `private, no-cache, no-store` | per-request nonce embedded |
| `/services` | force-dynamic (inherited) | nonce/CSP | none | header, template | `private, no-cache, no-store` | per-request nonce embedded |
| `/services/white-label` | force-dynamic (inherited) | nonce/CSP | none | header, template, solution-visuals | `private, no-cache, no-store` | per-request nonce embedded |
| `/contact` | force-dynamic (inherited) | nonce/CSP **+ genuine** | `searchParams` (intent) | header, template, contact-form | `private, no-cache, no-store` | per-request nonce embedded |
| `/trust` | force-dynamic (inherited) | nonce/CSP | none | header, template | `private, no-cache, no-store` | per-request nonce embedded |
| `/trust/security` | force-dynamic (inherited) | nonce/CSP | none | header, template | `private, no-cache, no-store` | per-request nonce embedded |
| `/trust/compliance` | force-dynamic (inherited) | nonce/CSP | none | header, template | `private, no-cache, no-store` | per-request nonce embedded |
| `/trust/risk-disclosure` | force-dynamic (inherited) | nonce/CSP | none | header, template | `private, no-cache, no-store` | per-request nonce embedded |
| `/trust/privacy` | force-dynamic (inherited) | nonce/CSP | none | header, template | `private, no-cache, no-store` | per-request nonce embedded |
| `/company` | force-dynamic (inherited) | nonce/CSP | none | header, template | `private, no-cache, no-store` | per-request nonce embedded |
| `/company/partners` | force-dynamic (inherited) | nonce/CSP | none | header, template | `private, no-cache, no-store` | per-request nonce embedded |
| `/pricing` | force-dynamic (inherited) | nonce/CSP | none | header, template | `private, no-cache, no-store` | per-request nonce embedded |
| `/resources` | force-dynamic (inherited) | nonce/CSP | none | header, template | `private, no-cache, no-store` | per-request nonce embedded |
| `/legal/privacy` | force-dynamic (inherited) | nonce/CSP | none | header, template | `private, no-cache, no-store` | per-request nonce embedded |
| `/legal/terms` | force-dynamic (inherited) | nonce/CSP | none | header, template | `private, no-cache, no-store` | per-request nonce embedded |
| `/legal/risk-disclosure` | force-dynamic (inherited) | nonce/CSP | none | header, template | `private, no-cache, no-store` | per-request nonce embedded |

## Key observations

- **Only `/contact` is genuinely request-dependent** (`searchParams` for intent
  preselection). Every other route is a static marketing page rendered
  dynamically solely because of the nonce/CSP implementation detail.
- **The root layout has no request-specific data** — it reads only
  `process.env.GOOGLE_SITE_VERIFICATION` (build-time). The `force-dynamic` is
  not required by the layout's own data; it is required by the nonce mechanism.
- **Static routes would be cacheable** (`Cache-Control: s-maxage=31536000`)
  but the per-request CSP nonce makes cached HTML unsafe (nonce mismatch), and
  the static flight scripts carry no nonce → #412. See
  `PHASE-10-RENDERING-DECISION.md`.
