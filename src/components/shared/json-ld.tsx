/**
 * Controlled JSON-LD boundary (documented per Rule 4).
 *
 * `dangerouslySetInnerHTML` is used here, and ONLY here: the payload is
 * produced exclusively by JSON.stringify over typed generator objects
 * (src/lib/seo/jsonld.ts). JSON.stringify cannot produce an HTML breakout,
 * and we additionally escape `<` so a `</script>` sequence in any string
 * value can never terminate the tag. No user/CMS input is ever passed to
 * this component without passing through the typed generators first.
 *
 * The script tag is `type="application/ld+json"` — a non-executable data
 * script, so it is not governed by `script-src` and needs no nonce. The
 * per-request CSP nonce added in src/proxy.ts covers Next.js's own inline
 * RSC flight scripts.
 */
export function JsonLd({ children }: { children: Record<string, unknown> }) {
  let payload: string;
  try {
    payload = JSON.stringify(children).replace(/</g, "\\u003c");
  } catch {
    // Never let a serialization failure crash the page; emit nothing.
    return null;
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: payload }}
    />
  );
}

/** Page-level wrapper: one graph node or a @graph of several. */
export function JsonLdGraph({
  nodes,
}: {
  nodes: readonly Record<string, unknown>[];
}) {
  const first = nodes[0];
  if (nodes.length === 1 && first) {
    return <JsonLd>{first}</JsonLd>;
  }
  return (
    <JsonLd>
      {{"@context": "https://schema.org", "@graph": nodes}}
    </JsonLd>
  );
}
