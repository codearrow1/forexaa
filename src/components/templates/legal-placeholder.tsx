import type { ReactNode } from "react";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Section } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

/**
 * Trust-center placeholder (Rule 50). The legal/security/privacy
 * architecture exists as routes; the text is being finalized with counsel.
 * These pages are NOINDEX until real policy text is approved.
 */
export function LegalPlaceholder({
  current,
  title,
  body,
}: {
  current: string;
  title: string;
  body: ReactNode;
}) {
  return (
    <Section spacing="default">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <Breadcrumbs current={current} />
          <div className="flex items-center gap-3">
            <h1 className="type-h1">{title}</h1>
            <Badge tone="warning">In final review</Badge>
          </div>
        </div>
        <Card variant="elevated" className="max-w-3xl">
          <div className="flex flex-col gap-4">{body}</div>
        </Card>
        <p className="type-small text-text-muted">
          Have a question while this is finalized?{" "}
          <Link href="/contact" className="text-primary hover:underline">
            Contact the team
          </Link>
          .
        </p>
      </div>
    </Section>
  );
}
