import { buildPageSeo, getRoute } from "@/lib/seo/page-meta";
import { JsonLdGraph } from "@/components/shared/json-ld";
import { TrustPage } from "@/components/templates/trust-page";
import { Container } from "@/components/ui/container";
import { ScrollScene } from "@/components/story/primitives";

const route = getRoute("/trust/privacy");
const seo = buildPageSeo(route);
export const metadata = seo.metadata;

/**
 * /trust/privacy — Privacy page (Rule 37).
 * NOINDEX until counsel-approved text exists. Architecture is in place.
 */
export default function PrivacyPage() {
  return (
    <>
      <JsonLdGraph nodes={seo.jsonLd} />
      <TrustPage
        current="/trust/privacy"
        eyebrow="Privacy"
        title="Privacy"
        lead="How FOREXAA handles personal information. Full policy text is in final review with counsel."
      >
        <ScrollScene className="!py-16">
        <Container className="flex flex-col gap-8">
          <div className="rounded-xl border border-border bg-surface p-6">
            <p className="type-body text-text-muted">
              The complete privacy policy is being finalized with legal counsel.
              Until approved text is published, this page is intentionally not
              indexed by search engines.
            </p>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            <div className="rounded-xl border border-border bg-surface p-5">
              <h3 className="type-body font-semibold text-text">What we collect</h3>
              <p className="mt-1.5 type-small text-text-muted">
                Only what is needed to respond to your inquiry: name, business
                email, company, country, and optional message.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-surface p-5">
              <h3 className="type-body font-semibold text-text">What we never collect</h3>
              <p className="mt-1.5 type-small text-text-muted">
                Passwords, payment details, identity documents, or API keys.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-surface p-5">
              <h3 className="type-body font-semibold text-text">How we use it</h3>
              <p className="mt-1.5 type-small text-text-muted">
                Solely to respond to your request and scope a demo or quote.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-surface p-5">
              <h3 className="type-body font-semibold text-text">Your rights</h3>
              <p className="mt-1.5 type-small text-text-muted">
                Contact us to access, correct, or delete your personal data.
              </p>
            </div>
          </div>
        </Container>
        </ScrollScene>
      </TrustPage>
    </>
  );
}
