# SEARCH CONSOLE SETUP

Runbook for when actual property access exists. **Verification is not
complete in Phase 2** — no credentials/property exist yet (Rule 60). Do not
claim Search Console is connected until it is.

## 1. Property

- Create a **Domain property** (e.g. `forexaa.com`) so it covers all
  permutations (http/https, www/non-www) once the host is final.
- Verify via DNS TXT (preferred) or HTML tag. Record the verification in
  a runbook note (never commit the credential).

## 2. HTTPS + canonical host

- Confirm the site serves over HTTPS with a valid chain.
- Ensure one canonical host (pick www vs non-www and 301 the other),
  consistent with our self-referencing canonicals.

## 3. Sitemap

- Submit `https://<host>/sitemap.xml`.
- Our sitemap contains only indexable, live routes — when we flip a route
  to INDEX, it appears here automatically.

## 4. URL inspection + Indexing checks

- Inspect `/` and each hub; confirm "Live" / "Excluded: noindex" matches
  our policy (noindex routes must show as excluded, not crawled-error).
- Watch the **Pages** report: "Excluded" reasons, "Crawled – currently
  not indexed" spikes.

## 5. Core Web Vitals

- Monitor field CWV (mobile, 28-day): LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.10
  (75th percentile). These support page experience but are not a ranking
  guarantee (Rule 57). Investigate regressions against the budgets in
  docs/seo/PERFORMANCE-SEO.md.

## 6. Security / manual actions

- Check the **Security** report for malware/phishing flags (we have none;
  keep it that way).
- Watch **Manual Actions** — any action triggers a content-policy review
  against docs/seo/CONTENT-QUALITY-STANDARD.md.

## 7. Enhancements

- Review structured-data enhancement reports (Breadcrumb, Organization,
  etc.). Fix any "Partially valid"/"Invalid" issues in the JSON-LD
  generators (tests/seo/jsonld.test.ts guards the shape).

## 8. Generative-AI visibility (2026)

- Google's Search Console now surfaces dedicated generative-AI performance
  reporting (impressions / pages / countries / devices over time) where
  available. Monitor it as an ongoing metric; **do not** build separate
  "GEO" infrastructure — ordinary SEO fundamentals drive these features.
- No `llms.txt` / AI-only files are required (see `AI-CONTENT-POLICY.md`).
- Make important answers crawlable, visible in HTML, well-structured and
  supported with useful images/video where genuinely helpful.

## 9. Verification seam (this repository)

- The `google-site-verification` meta tag is rendered **only when**
  `GOOGLE_SITE_VERIFICATION` is set at build time (see `src/app/layout.tsx`).
- The token itself is never committed. Add it to your deployment's
  environment, rebuild, then complete verification in Search Console.
- Do not mark this property verified in docs or reports until the property is
  actually verified in the Google console.

## Ongoing loop

- Query + Page performance report → feed intent gaps back into the keyword
  map (docs/seo/KEYWORD-MAP.md).
- Coverage errors → route/indexation fixes in the registry.
