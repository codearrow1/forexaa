# PHASE 10 — RENDERING DECISION

## 1. Problem

Phase 9 fixed React #412 by adding `export const dynamic = "force-dynamic"` to
the root layout. That makes every route render at request time so the
per-request CSP nonce is embedded in the inline RSC flight scripts. The
question: is request-time rendering the correct long-term architecture, or can
the public marketing site safely regain static/revalidated/cacheable
rendering without weakening CSP, breaking hydration, or regressing SEO?

## 2. Phase 9 architecture

All routes inherit `force-dynamic` from `src/app/layout.tsx`. Every response
is rendered per-request, embeds a fresh nonce, and is marked
`Cache-Control: private, no-cache, no-store`. No shared caching.

## 3. Current request/render pipeline

```
Request
  → src/proxy.ts: generate nonce (randomBytes 16, base64)
  → set request header x-forexaa-nonce = nonce
  → NextResponse.next({ request: { headers } })
  → Next.js renders the page at request time (force-dynamic)
  → Next.js reads the nonce, embeds it into inline RSC flight scripts
  → src/proxy.ts applyHeaders: emit CSP with 'nonce-<value>' + all other headers
  → Browser receives HTML (nonce'd flight scripts) + CSP (matching nonce)
  → Flight scripts execute → React hydrates → clean
```

The nonce is generated in the proxy, forwarded via the `x-forexaa-nonce`
request header, read by Next.js during rendering, embedded into the framework's
inline scripts, and matched by the CSP response header. This works **only**
because rendering happens at request time.

## 4. Why #412 occurred

Build-time static HTML has no request headers, so Next.js cannot embed the
per-request nonce into the static flight scripts. The static flight scripts
carry no nonce, but the production CSP requires one
(`script-src 'self' 'nonce-…'`). The browser blocks the flight scripts → React
cannot hydrate → #412. (Phase 9 proved this; the framer-motion hypothesis was
refuted.)

## 5. Experiments performed

| Experiment | Result | Evidence |
| --- | --- | --- |
| Route-splitting: remove `force-dynamic` from root, add to `/contact` only | Static routes (`/`, `/crm`, `/solutions/new-brokerage`) still get **#412**; `/contact` (dynamic) is clean | `npm run browser:qa` → 55/64, #412 on 3 static routes |
| Disable all motion (whileInView/useScroll/useTransform) + minimal CRM page | #412 **persists** | Phase 9 already proved motion is not the cause |
| Inspect static HTML flight scripts | Contain `"nonce":"$undefined"` (placeholder), no real nonce | `docs/architecture/evidence/phase10/` |
| Inspect response headers | Static `/`: `Cache-Control: s-maxage=31536000` (cacheable) + per-request nonce CSP; dynamic `/contact`: `private, no-cache, no-store` | curl -D |

## 6. Static rendering findings

- Static routes **cannot hydrate** under the current strict nonce CSP. The
  flight scripts have no nonce and are blocked. This is fundamental: a
  per-request nonce cannot be embedded in build-time HTML.
- The Next.js 16 docs confirm: *"To use a nonce, your page must be dynamically
  rendered… static pages are generated at build time, when no request or
  response headers exist — so no nonce can be injected."*
- Route-level splitting does **not** help: the nonce requirement is global
  (every page's flight scripts need it), not route-specific. Only `/contact`
  is genuinely request-dependent, but making just it dynamic leaves the other
  static routes broken.

## 7. CSP findings

- The current CSP is strict and correct: `script-src 'self' 'nonce-…'`, no
  `unsafe-inline`, no `unsafe-eval`, no wildcards. `verify:headers` PASS.
- A **hash-based** CSP for static routes is theoretically possible (the static
  flight scripts are deterministic per build, containing `"nonce":"$undefined"`).
  However, it is **fragile**: the hashes must be recomputed per build, injected
  into the per-request CSP, and any change to the framework output breaks them
  (→ #412 returns). The spec (§12) explicitly warns against this unless
  correctness is guaranteed.
- A **stable (build-time) nonce** for static routes is **security theater**:
  the nonce is in the public static HTML, so an attacker can read and reuse it.
  This weakens the CSP (spec §2 forbids).

## 8. Cache findings

- Static routes are marked `Cache-Control: s-maxage=31536000` (1-year shared
  cache) but carry a **per-request CSP nonce**. This is a fundamental conflict:
  a cached response's CSP nonce would mismatch a fresh response's nonce, and
  the cached HTML's flight scripts have no nonce. **A per-request-nonce page
  cannot be safely shared-cached** (spec §16).
- Dynamic routes are `private, no-cache, no-store` — correctly non-cacheable.
- Therefore the current architecture **requires no shared HTML caching**. Any
  attempt to cache the HTML would either break the nonce (per-request) or
  require a stable/hash strategy (see §7).

## 9. TTFB findings

Local production build (`next start`), 15 requests per route:

| Route | min | median | max |
| --- | ---: | ---: | ---: |
| `/` | 20ms | 26ms | 37ms |
| `/solutions/new-brokerage` | 12ms | 22ms | 29ms |
| `/broker-technology/crm` | 15ms | 22ms | 28ms |
| `/contact` | 12ms | 15ms | 17ms |

TTFB is **insignificant locally** (12–37ms). LCP (2.7–3.2s) is dominated by
CPU-throttled render delay, not TTFB. Per spec §18: do not rewrite the server
architecture to solve a client rendering issue. (These are **local**
measurements; production edge TTFB will differ and is an owner-infrastructure
concern.)

## 10. Performance findings

| Route | Phase 9 LCP | Phase 10 LCP | Phase 9 TBT | Phase 10 TBT (clean) |
| --- | ---: | ---: | ---: | ---: |
| `/` | 2.9s | 2.9s | 118ms | — |
| `/solutions/new-brokerage` | 3.0s | 3.0s | 57ms | — |
| `/solutions/existing-broker` | 3.1s | 3.1s | 38–58ms | 38–58ms |
| `/solutions/prop-firm` | 2.7s | 2.7s | 49ms | — |
| `/solutions/multi-asset` | 2.9s | 2.9s | 58ms | — |
| `/broker-technology/crm` | 3.0s | 3.0s | 120ms | — |
| `/platforms/mt4-mt5` | 2.9s | 2.9s | 61ms | — |
| `/infrastructure/liquidity` | 2.9s | 2.9s | 52ms | — |
| `/services/white-label` | 2.9s | 2.9s | 43ms | — |
| `/contact` | 3.2s | 3.2s | 101–124ms | 101–124ms |

LCP unchanged (2.7–3.2s). TBT: clean single-route measurements 38–124ms
(under 150ms). Full-suite TBT is contention-inflated. CLS 0, A11y 100,
SEO 100. The architecture change (force-dynamic) has **no material LCP/TBT
impact** — the simulated mobile render delay dominates.

## 11. Security implications

- The strict nonce-based CSP is **preserved** (no `unsafe-inline`, no
  `unsafe-eval`, no wildcards). `verify:headers` PASS.
- The per-request nonce is generated fresh per response and embedded into the
  flight scripts. No nonce reuse, no leakage.
- No shared HTML caching (which would be unsafe with a per-request nonce).
- Runtime dependency audit: 0 vulnerabilities. Dev/build toolchain: 5
  non-runtime advisories (documented).

## 12. Chosen architecture

**KEEP FORCE-DYNAMIC** (`export const dynamic = "force-dynamic"` in the root
layout).

Reasoning (spec §36 criteria):
- Static generation **cannot safely coexist** with the current strict nonce
  CSP + RSC behavior (proven: static routes get #412).
- The safe alternatives are **fragile** (hashes) or **weaken security**
  (stable public nonce).
- Force-dynamic is the **simplest supported architecture** that preserves
  strict security and deterministic hydration.
- It creates **no unacceptable complexity** — it is one line in the layout.

## 13. Rejected alternatives

| Alternative | Why rejected |
| --- | --- |
| Route-level splitting (static marketing + dynamic `/contact`) | Static routes still get #412 (nonce is global, not route-specific) |
| Hash-based CSP for static routes | Fragile: hashes must be recomputed per build and injected into the per-request CSP; any framework-output change breaks them → #412 returns. Spec §12 warns against this. |
| Stable (build-time) nonce for static routes | Security theater: the nonce is in the public static HTML, so an attacker can read and reuse it. Weakens CSP (spec §2). |
| `suppressHydrationWarning` | Forbidden as an architecture solution (spec §11); does not fix the CSP/nonce root cause. |
| Relax CSP to `unsafe-inline` for static | Forbidden (spec §2); materially weakens security. |

## 14. Operational consequences

- **Every request is server-rendered.** No static HTML caching. This increases
  origin server load and production TTFB relative to a cached static site.
- **Mitigation (owner infrastructure, not code):** a CDN in front can cache the
  HTML only if the CSP/nonce conflict is resolved (e.g., the hash approach in
  §15). With the current per-request nonce, the HTML must not be shared-cached.
- **Scalability:** for a marketing site with moderate traffic, per-request
  rendering is acceptable. If traffic grows, revisit the hash approach (§15).
- **Observability:** the nonce is per-request; logs must never record it (the
  existing logger redaction covers secrets).

## 15. Future migration opportunity

If production traffic makes per-request rendering a bottleneck, a **hash-based
CSP for static routes** could be revisited:

1. At build time, compute SHA-256 hashes of each static route's inline flight
   scripts (they are deterministic per build, containing `"nonce":"$undefined"`).
2. Inject these hashes into the CSP for static routes (in addition to or instead
   of the per-request nonce).
3. The static HTML becomes safely cacheable (`s-maxage`), and the cached
   response is self-consistent (HTML flight scripts match the cached CSP hashes).

This is a **future infrastructure decision**, not a Phase 10 change. It requires
a build-time hash-generation step, a way to pass hashes to the proxy, and
careful cache-invalidation on deploys. It is deliberately **not** implemented
here (spec §12: do not implement hashes until determinism and correctness are
guaranteed; and the current force-dynamic architecture is correct and secure).
