# SEARCH CONSOLE LAUNCH CHECKLIST

Owner-performed. The application only renders the verification meta tag when
`GOOGLE_SITE_VERIFICATION` is configured; it never creates or verifies an
external property.

## Before launch

- [ ] Property created in Google Search Console for the production domain
- [ ] Verification method chosen (HTML tag recommended — matches the app's
      meta-tag seam)
- [ ] `GOOGLE_SITE_VERIFICATION` value supplied to the production environment
- [ ] Rebuild/redeploy so the meta tag renders

## Verify the seam

- [ ] The meta tag appears in the served HTML **only when configured**
- [ ] It is absent when not configured (no invented token committed)
- [ ] `seo:check` remains 0 errors / 0 warnings

## After launch

- [ ] Property verified in Search Console
- [ ] `sitemap.xml` submitted
- [ ] Canonical spot-checks pass (a few routes)
- [ ] Indexation confirmed (URL Inspection on key pages)
- [ ] No accidental `noindex` on indexable pages
- [ ] Security issues section reviewed (should be clean)
- [ ] Core Web Vitals reviewed (owner interprets; the app's simulated LCP gap
      is documented in `docs/performance/PHASE-10-CLOSURE.md`)
- [ ] Performance reporting reviewed

## Explicitly NOT done

- No external property created or verified by this repository
- No `GOOGLE_SITE_VERIFICATION` value invented or committed
- No sitemap submission automation
