# CONTENT-SOURCE-OF-TRUTH

The old FOREXAA site (https://forexaa.com) contains many marketing claims
that **must not** automatically become facts in the rebuilt site. This
document defines what may be published and what requires verification.

## Priority order

1. **New approved copy** (written for the rebuild) is the source of truth.
2. The existing public FOREXAA website is a **baseline reference** for what
   the service offering is — use it to understand the product, not to
   copy claims verbatim.
3. Competitor websites are **inspiration only** (UX, IA, conventions).
   Never a source of FOREXAA facts.

## Verification requirements

- **Marketing claims** (e.g. "fastest", "industry-leading") → require a
  factual source before publication. Until then: mark `TBD`, do not ship.
- **Regulatory statements** (licenses, jurisdictions, compliance
  certifications) → require verification. **Do not invent.** If unknown,
  say nothing or mark `TBD`.
- **Customer statistics** (broker counts, trader counts, growth %) →
  require a verified internal source. Until then, `verified: false` in the
  content model and a `source` note.
- **Pricing** → requires verification against the current pricing source
  before publication.
- **Partner relationships** → require written confirmation. The logo wall
  must only show confirmed partners.

## How it's enforced in code

- Every content type in `src/types/content.ts` carries `verified: boolean`
  (where applicable) and a `source?` reference.
- `src/config/site.ts` ships statistics with `verified: false` and a
  `source` pointing to the legacy claim, so they are visible but explicitly
  unverified.
- Components that render a `verified: false` item must not present it as a
  confirmed fact (e.g. show it behind a "pending verification" treatment or
  omit it).

## The rule

> If a number, award, license, jurisdiction, partner or performance claim
> cannot be verified right now, it is a `TBD` data field — not copy on the
> page. Fabrication is a release blocker.
