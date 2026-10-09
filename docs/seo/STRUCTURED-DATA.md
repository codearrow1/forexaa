# STRUCTURED DATA (JSON-LD)

Implemented in `src/lib/seo/jsonld.ts`, rendered through the controlled
`<JsonLd/>` boundary (`src/components/shared/json-ld.tsx`). A type is
emitted **only** when its content genuinely exists on the page, and only
with truthful fields.

Correct structured data helps search systems understand content and can
enable richer appearances; it does **not** guarantee a rich result, and we
do not treat schema as a ranking hack.

## Types in use

| Type | Where | Fields | Notes |
| --- | --- | --- | --- |
| `Organization` | `/` (layout context) | name, url, logo, description | No invented address/registration/socials. `sameAs` stays empty until verified (Rule 16/23). |
| `WebSite` | `/` | name, url, description | Current minimal form. The obsolete search-box `potentialAction` pattern is NOT used (Rule 17). |
| `BreadcrumbList` | all hub/product pages | ordered items with absolute URLs | Must match the visible breadcrumbs (Rule 18). |
| `SoftwareApplication` | real software-product pages (e.g. MT7, CRM) | name, category, URL, OS | Only on pages that actually describe a software product — not merely because software is mentioned (Rule 19). No `aggregateRating`. |
| `Service` | service pages (liquidity, white-label, launch) | name, description, provider=FOREXAA | Represents entities accurately; not every Service type yields a Google rich result (Rule 20). |
| `FAQPage` | only where genuinely useful + substantiated | Question/Answer | Google currently restricts FAQ rich results to prominent gov/health sites, so this is for understanding, not a guaranteed rich result. Do NOT emit just to capture keywords (Rule 22). |
| `Article` | future resource/blog pages | headline, dates, author, publisher | Wired in the generator; used when resources land. |

## Review / rating policy (Rule 21)

- No fabricated `aggregateRating` or self-serving review markup.
- If authentic testimonials are later added: store the source, show them
  visibly, preserve attribution, and only then mark up — the markup must
  match the visible content.

## Safety (Rule 74)

- JSON-LD is produced by `JSON.stringify` of typed objects, with `<`
  escaped, through the single documented `dangerouslySetInnerHTML`
  boundary. No user/CMS input reaches it untyped.
- User-controlled query params are never reflected into structured data.
