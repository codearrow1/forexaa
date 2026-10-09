# SEO CHANGELOG

Records major SEO changes. Minimum structure: Date · Change · URLs · Reason · Verification.

| Date | Change | URLs | Reason | Verification |
| --- | --- | --- | --- | --- |
| Phase 2 | Initial route registry + indexation decisions | all | Greenfield URL architecture | `seo:check` |
| Phase 3 | Product/platform pages promoted to `index` | `/broker-technology/*`, `/platforms/*`, `/infrastructure/liquidity`, `/services/white-label` | Real product content shipped | `seo:check`, sitemap |
| Phase 4 | Cinematic homepage + OG images | `/` | Premium hero | Lighthouse / browser |
| Phase 5 | Four solution pages shipped (`index`) | `/solutions/new-brokerage`, `/existing-broker`, `/prop-firm`, `/multi-asset` | Distinct commercial-intent stories | `seo:check` |
| Phase 5 | Trust center shipped | `/trust`, `/trust/security`, `/trust/compliance`, `/trust/risk-disclosure` (index); `/trust/privacy` (noindex, counsel) | Trust/governance | `seo:check` |
| Phase 5 | `/company/partners` registered (noindex until verified partners) | `/company/partners` | Partner gating | `seo:check` |
| Phase 6 | Route titles deduplicated (`/legal/*` vs `/trust/*`) | `/legal/privacy`, `/legal/risk-disclosure` | Unique-title test | `registry.test.ts` |
| Phase 6 | Search Console verification seam (env-gated meta) | `/` | Property verification without committed token | manual verify |
| Phase 6 | Generative-AI visibility reporting added to Search Console runbook | `/` | 2026 SC generative-AI reports | `SEARCH-CONSOLE-SETUP.md` |

## Policy
- One owner per query (no cannibalization). See `docs/seo/KEYWORD-MAP.md`.
- Legal routes stay `noindex` until counsel-approved copy exists.
- No `llms.txt` / AI-GEO hacks (see `docs/seo/AI-CONTENT-POLICY.md`).
- Any new `index` flip must have substantial, original content (not a thin doorway).
