/** @type {import('next').NextConfig} */

// Security headers (CSP with per-request nonce, HSTS, etc.) are set by the
// network boundary in src/proxy.ts — NOT here. Adding them here as well would
// emit a second CSP without the nonce, and the browser enforces the
// intersection of both policies, blocking the nonce'd inline RSC flight
// scripts (React #412, no hydration).
const nextConfig = {
  poweredByHeader: false,

  async redirects() {
    return [
      {
        source: "/forex-crm",
        destination: "/broker-technology/crm",
        permanent: true,
      },
      {
        source: "/mobiustrader-mt7-white-label",
        destination: "/platforms/mt7",
        permanent: true,
      },
      {
        source: "/mt4-mt5-white-label",
        destination: "/platforms/mt4-mt5",
        permanent: true,
      },
      {
        source: "/forex-liquidity",
        destination: "/infrastructure/liquidity",
        permanent: true,
      },
      {
        source: "/white-label",
        destination: "/services/white-label",
        permanent: true,
      },
      {
        source: "/social-trading-white-label",
        destination: "/solutions/social-copy",
        permanent: true,
      },
      {
        source: "/about",
        destination: "/company",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
