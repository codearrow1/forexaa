import { buildPageSeo, getRoute } from "@/lib/seo/page-meta";
import { JsonLdGraph } from "@/components/shared/json-ld";
import { TrustPage, TrustSection } from "@/components/templates/trust-page";

const route = getRoute("/trust/security");
const seo = buildPageSeo(route);
export const metadata = seo.metadata;

/**
 * /trust/security — Security page (Rule 36).
 * Explains implemented controls. Clearly distinguishes website security,
 * software security, customer infrastructure and third-party services.
 */
export default function SecurityPage() {
  return (
    <>
      <JsonLdGraph nodes={seo.jsonLd} />
      <TrustPage
        current="/trust/security"
        eyebrow="Security"
        title="Security architecture and controls"
        lead="Security is built into the development lifecycle, not added at the end. This page describes what is implemented on this website and in our software, and what remains the responsibility of customers and third-party providers."
      >
        <TrustSection
          eyebrow="Website security"
          title="This website"
          description="The public FOREXAA website implements the following browser and transport security controls."
          items={[
            { label: "Transport security", detail: "HTTPS with HSTS (Strict-Transport-Security, includeSubDomains, preload)." },
            { label: "Content Security Policy", detail: "Strict CSP with default-src 'self', object-src 'none', frame-src 'none'." },
            { label: "MIME sniffing protection", detail: "X-Content-Type-Options: nosniff on all responses." },
            { label: "Clickjacking protection", detail: "X-Frame-Options: DENY and frame-src 'none' in CSP." },
            { label: "Referrer policy", detail: "Referrer-Policy: strict-origin." },
            { label: "Permissions policy", detail: "Camera, microphone, geolocation, payment and USB disabled." },
            { label: "Cross-origin policies", detail: "COOP: same-origin, CORP: same-origin." },
          ]}
        />

        <TrustSection
          eyebrow="Software security"
          title="Our software"
          description="The FOREXAA platform and its components are built with security as a baseline requirement."
          items={[
            { label: "Input validation", detail: "All user input validated with Zod schemas. Server is the only authority." },
            { label: "Output encoding", detail: "React escapes by default. No dangerouslySetInnerHTML except the documented JSON-LD boundary." },
            { label: "Injection prevention", detail: "Parameterized queries via ORM. No string-concatenated SQL." },
            { label: "Secrets management", detail: "Environment variables only. No secrets in source. Server-only env access." },
            { label: "Dependency security", detail: "npm audit in CI. No destructive automated upgrades." },
            { label: "Error handling", detail: "Branded error UIs. No stack traces, paths, env or SQL details exposed." },
            { label: "Rate limiting", detail: "Abstraction with production interface. Contact forms rate-limited." },
            { label: "Logging", detail: "Structured JSON logs with key redaction. No PII in logs." },
          ]}
        />

        <TrustSection
          eyebrow="Customer infrastructure"
          title="What customers are responsible for"
          description="When customers deploy FOREXAA software, certain security responsibilities remain with them."
          items={[
            { label: "Access controls", detail: "Role-based access control configured by the customer." },
            { label: "Data handling", detail: "Customers own their client data and retention policies." },
            { label: "Network security", detail: "Customers manage their own firewalls, WAF and DDoS protection." },
            { label: "Compliance", detail: "Customers are responsible for their own regulatory obligations." },
            { label: "Third-party services", detail: "Payment providers, liquidity sources and other integrations are configured by the customer." },
          ]}
        />

        <TrustSection
          eyebrow="Third-party services"
          title="External dependencies"
          description="This website does not load third-party scripts, analytics or remote widgets. All assets are self-hosted."
          items={[
            { label: "No analytics", detail: "No Google Analytics, no GTM, no Clarity, no remote tracking." },
            { label: "No CDN scripts", detail: "All JavaScript and CSS is bundled and served from this origin." },
            { label: "Self-hosted fonts", detail: "Sora and Manrope variable fonts self-hosted at /fonts, no Google Fonts CDN." },
            { label: "No external iframes", detail: "No embedded third-party content." },
          ]}
        />
      </TrustPage>
    </>
  );
}
