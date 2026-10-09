import { Section } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { ButtonLink } from "@/components/ui/button";

/** Branded 404. No internal path leakage. */
export default function NotFound() {
  return (
    <Section spacing="wide">
      <Card variant="elevated" className="mx-auto max-w-md p-8 text-center">
        <div className="type-caption text-text-muted">404</div>
        <h1 className="type-h2 mt-2">Page not found</h1>
        <p className="mt-2 type-body text-text-muted">
          The page you&apos;re looking for doesn&apos;t exist or has moved.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <ButtonLink href="/" variant="primary">
            Go home
          </ButtonLink>
          <ButtonLink href="/platforms" variant="ghost">
            Explore Technology
          </ButtonLink>
        </div>
      </Card>
    </Section>
  );
}
