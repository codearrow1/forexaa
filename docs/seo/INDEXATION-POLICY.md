# INDEXATION POLICY

Canonical policy: every indexable page has exactly one self-referencing
canonical, absolute HTTPS in production, query-free, no trailing slash.
`indexation` is decided per route in `src/config/seo/routes.ts` and enforced
by sitemap + robots meta + seo:check.

## Indexable pages (INDEX → sitemap)

| Route | Decision | Reason |
| --- | --- | --- |
| `/` | INDEX | Final homepage with real content |
| `/solutions` | INDEX | Meaningful hub, business-model cards |
| `/platforms` | INDEX | Meaningful hub, platform families |
| `/broker-technology` | INDEX | Meaningful hub, CRM/back-office pillars |
| `/infrastructure` | INDEX | Meaningful hub, liquidity/payments/risk/API |
| `/pricing` | INDEX | Meaningful (how pricing works; no unverified numbers) |

## Non-indexable pages (NOINDEX → NOT in sitemap, still crawlable)

| Route | Decision | Reason |
| --- | --- | --- |
| `/services` | NOINDEX | Scaffold until service content is verified |
| `/resources` | NOINDEX | Empty until real resources are published |
| `/company` | NOINDEX | Facts/contact unverified (claims registry) |
| all `planned` nested routes | NOINDEX | Not built as thin pages (Rule 66) |

## Special URLs

| URL | Treatment |
| --- | --- |
| Query-parameter variants (`?utm`, `?sort`, `?filter`) | NEVER canonical; page canonical ignores query. Use `rel="canonical"` to the clean URL (already done at page level). |
| Internal search results (future `/search?q=`) | `noindex,follow` by default (Rule 74). |
| Preview routes (`/preview/…`) | NOINDEX + robots-blocked. |
| Staging domain | Entirely NOINDEX + robots-blocked at the host; never in the sitemap. |
| Duplicate routes (trailing slash, www) | Canonicalize to the clean path on the one host; host served without a duplicate. |
| Legacy URLs | See docs/seo/LEGACY-URL-MIGRATION.md (301 only to genuinely relevant replacements). |
| `/admin`, `/private`, `/api/admin` | BLOCK (robots + proxy 403), never indexable. |

## Sitemap inclusion rule

A route is in `sitemap.xml` **iff** `indexation === "index"` AND
`status === "live"`. Enforced by `SITEMAP_ROUTES` and `tests/seo/*` +
`seo:check`.

## Changing a decision

1. Update `src/config/seo/routes.ts`.
2. Confirm the page meets the content-quality bar
   (docs/seo/CONTENT-QUALITY-STANDARD.md) if moving to INDEX.
3. Run `npm test` and `npm run seo:check`.
