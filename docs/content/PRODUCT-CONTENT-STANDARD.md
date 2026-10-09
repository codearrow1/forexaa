# PRODUCT CONTENT STANDARD

Rules for writing product pages that are useful, honest and search-friendly.
Companion to docs/seo/CONTENT-QUALITY-STANDARD.md (which this extends for
product content).

## The nine questions (Rule 5)

Every product page must answer: what is it, who is it for, what problem does
it solve, what does it contain, how does it work, how does it integrate,
what makes it useful, what does implementation look like, what does the
user do next.

## Claim discipline (Rule 4 — hard requirement)

Before any fact is written, classify it: `verified` / `pending` /
`deprecated` / `forbidden`. Never publish unsupported claims about customer
counts, volumes, performance, spreads, execution speed, leverage, awards,
ratings, uptime, regulatory status, jurisdictions, partners or
certifications.

When a claim is not verified, use an accurate non-numeric description:
- "Leverage is set by your structure and regulatory context" — not "up to
  1:1000".
- "The exact platform scope is confirmed for your deployment" — not a
  feature list presented as fact.
- "Pricing is confirmed with the team" — not a number.

## Structure (Rule 38)

A page is as long as necessary to fully answer its intent. For a technical
product page, ~800 useful words beats 3,000 repetitive ones. No arbitrary
word-count targets.

## Data, not JSX (Rule 43)

Product copy lives in `src/content/products/*.ts` as typed `ProductContent`.
Pages render it through the `ProductPage` template. If a paragraph is in
JSX, it should be in the content file.

## Visuals (Rule 8/58)

- No competitor screenshots presented as FOREXAA.
- No invented interfaces presented as the real product.
- Synthetic UI is labeled "Illustrative interface" / "Conceptual".
- Abstract diagrams for infrastructure concepts.

## Differentiation (Rule 64)

Before writing a page, compare it with its siblings. If two pages explain
essentially the same thing: merge them, change the intent, or keep one
noindex. No keyword variants.

## Review before `live` (Rule 81)

Factual accuracy, terminology, claims, SEO, security, visual quality,
readability. Record `lastReviewedAt` + `contentOwner` in the product's
governance block.
