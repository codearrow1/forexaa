# SEO CHANGE CHECKLIST

Run this for every page added or significantly changed (Rule 78). The
machine-enforced parts are covered by `npm test` + `npm run seo:check`;
the rest is editorial.

## Intent & content
- [ ] Search intent defined (from docs/seo/KEYWORD-MAP.md)
- [ ] Primary topic defined; no two pages target the same intent
- [ ] Unique, human-written title (no keyword stuffing)
- [ ] Unique, accurate description (no unsupported claims)
- [ ] One H1; logical H2/H3 hierarchy
- [ ] Helpful, original body content (passes CONTENT-QUALITY-STANDARD.md)
- [ ] No unverified/forbidden claims (claims registry + test)

## Technical
- [ ] Route registered in `src/config/seo/routes.ts` with a correct
      indexation decision
- [ ] Self-referencing canonical (query-free, absolute, from config)
- [ ] `index`/`noindex` set to match the decision
- [ ] In the sitemap **iff** indexable + live (auto via registry)
- [ ] Breadcrumb visible AND matching JSON-LD
- [ ] Correct schema types emitted (only those that fit the content)
- [ ] OG metadata + route-aware OG image
- [ ] All images have meaningful alt (decorative = `alt=""`)
- [ ] Mobile layout checked (no CLS from media, no intrusive
      interstitials)
- [ ] Performance within budget (LCP/INP/CLS)
- [ ] Accessibility (keyboard, focus, contrast, landmarks)

## Linking
- [ ] Descriptive internal anchors (no "click here")
- [ ] Linked from at least one live page (no orphan)
- [ ] No broken internal links (`seo:check` passes)

## Record
- [ ] `lastReviewedAt` + `author` set in the page's PageSeo
- [ ] Claims used are `verified` in the registry
- [ ] `npm run lint` / `typecheck` / `test` / `build` / `seo:check` green
