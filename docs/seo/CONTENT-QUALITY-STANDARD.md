# CONTENT QUALITY STANDARD

Every SEO page must be able to answer these six questions before it is
published. A keyword existing is NOT a reason to publish a page.

1. **Who is this page for?** (a specific buyer/operator)
2. **What specific problem does it solve?**
3. **What does the visitor learn or see?**
4. **What evidence supports the claims?** (or: which claims are
   explicitly *not* made, and why)
5. **What action can they take next?**
6. **What makes this page different from another page on the site?**
   (no cannibalization — one intent per URL)

## Gates

- **Original value**: the page must add something a competitor page does
  not (scraped/duplicated/thin content is prohibited, Rule 3).
- **Intent fit**: title + H1 + first screen must match the mapped intent.
- **Evidence**: every claim is either in the claims registry as
  `verified`, or omitted. Unverified → `TBD` (Rule 49).
- **Internal links**: contextual, descriptive anchors; the page is linked
  from at least one live page (no orphans, Rule 24).
- **Schema**: only types that describe content actually on the page.
- **No keyword stuffing**: query terms appear because a human would use
  them, never repeated to game density.

## Review

- Each page carries `lastReviewedAt` + `author` in its `PageSeo` record.
- Re-review on: product change, claim-verification, intent shift, or
  Search Console data showing intent mismatch.

The per-page execution checklist lives in
docs/seo/SEO-CHANGE-CHECKLIST.md.
