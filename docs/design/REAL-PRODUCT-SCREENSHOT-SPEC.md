# REAL PRODUCT SCREENSHOT SPEC

Governance for replacing synthetic visuals with **verified** real screenshots.
No real screenshot is published until every field below is complete and approved.
If no verified asset exists, the synthetic/conceptual visual remains (labeled).

## Status
- **Verified screenshots integrated: NONE.** All product visuals remain
  `synthetic-ui` or `conceptual`, clearly labeled "Illustrative interface" /
  "Conceptual architecture." (Phase 6 Rule 28/31.)

## Per-screenshot record
For each asset, record and commit only when every field is filled:

| Field | Required | Notes |
| --- | --- | --- |
| source | yes | internal capture date + build/export |
| verification | yes | who verified it represents the shipped product |
| product | yes | e.g. `crm`, `mt7`, `liquidity` |
| screen | yes | e.g. dashboard, client detail |
| viewport | yes | e.g. 1440×900 |
| resolution | yes | target px |
| redaction | yes | every PII/secret removed (see privacy list) |
| filename | yes | descriptive, e.g. `crm/dashboard.webp` |
| alt | yes | meaningful, describes the screen |
| caption | optional | "Product interface preview" (never "real screenshot" unless verified) |
| approval | yes | approved-by + date |

## Priority screens
CRM dashboard · CRM client detail · Trader's Room · Back Office · IB dashboard ·
MT5 · MT7 · Liquidity · White Label.

## Privacy / redaction checklist (Rule 30)
Remove before publishing:
- [ ] names, emails, phone numbers
- [ ] account numbers, client IDs, trading identifiers
- [ ] API keys, secrets, tokens
- [ ] internal URLs / server addresses
- [ ] sensitive balances (or use neutral demo values)

No real customer data may reach the marketing site.

## Integration
To swap a synthetic visual for a verified one, edit the config only:
```ts
visual: {
  kind: "verified-screenshot",
  src: "/products/crm/dashboard.webp",
  alt: "FOREXAA CRM dashboard",
  source: "2026-10 build",
  verifiedAt: "2026-10-01",
  approvedBy: "…",
  caption: "Product interface preview",
}
```
The same component renders either source (no page rewrites). Product version
labels (e.g. "MT7 — verified screenshot — 2026-10") must not leak internal
build numbers.
