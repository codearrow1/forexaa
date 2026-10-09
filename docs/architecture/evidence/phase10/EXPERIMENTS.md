# Phase 10 — Architecture experiment evidence

Concise diagnostic artifacts from the static-vs-dynamic CSP/hydration
experiments. Full analysis: `PHASE-10-RENDERING-DECISION.md`.

## E1 — Static vs dynamic HTML (nonce'd inline scripts)

| Route | Render mode | Inline flight scripts | With `nonce` attr |
| --- | --- | ---: | ---: |
| `/solutions/new-brokerage` | static (experiment) | 3 | **0** |
| `/pricing` | static (experiment) | 1 | **0** |
| `/broker-technology/crm` | static (experiment) | 3 | **0** |
| `/contact` | dynamic | 0 (external) | **13–16** |

Static flight scripts carry **no nonce**; dynamic routes embed the per-request
nonce into every inline script.

## E2 — CSP violation (static route, production build)

CDP console capture on `/solutions/new-brokerage` (static):

```
Executing inline script violates the following Content Security Policy
directive 'script-src 'self' 'nonce-1FUIsX+PKuJN4Txqxj6i5g==''. Either the
'unsafe-inline' keyword, a hash ('sha256-…'), or a nonce ('nonce-…') is
required to enable inline execution.
```

Repeated for each blocked inline script. `window.self.__next_f` stays empty
(0 entries) → React cannot hydrate → #412.

## E3 — Static flight script content

The static flight script contains the placeholder `"nonce":"$undefined"` (the
RSC representation of script elements with no nonce at build time). It is
deterministic per build but carries no real nonce.

## E4 — Response headers

| Route | Render mode | Cache-Control |
| --- | --- | --- |
| `/` | static (experiment) | `s-maxage=31536000` (1-year shared cache) |
| `/contact` | dynamic | `private, no-cache, no-store, max-age=0, must-revalidate` |

A per-request-nonce page marked `s-maxage=31536000` is a conflict: the cached
HTML's flight scripts have no nonce, and a fresh CSP nonce would mismatch.

## E5 — Browser QA (route-splitting experiment)

`npm run browser:qa` with `force-dynamic` removed from root and added to
`/contact` only:

```
/                        → #412 (FAIL no uncaught JS exceptions)
/broker-technology/crm   → #412 (FAIL)
/solutions/new-brokerage → #412 (FAIL)
/contact                 → clean (PASS)
Browser QA: 55/64
```

Static routes still fail #412; the drawer/mega-menu failures are downstream of
the hydration failure (React client-renders the subtree, resetting client
state). Confirms the nonce requirement is global, not route-specific.

## E6 — TTFB (local production build, 15 requests/route)

| Route | min | median | max |
| --- | ---: | ---: | ---: |
| `/` | 20ms | 26ms | 37ms |
| `/solutions/new-brokerage` | 12ms | 22ms | 29ms |
| `/broker-technology/crm` | 15ms | 22ms | 28ms |
| `/contact` | 12ms | 15ms | 17ms |

TTFB is insignificant locally; LCP is dominated by CPU-throttled render delay.
