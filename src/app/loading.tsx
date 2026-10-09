import { Section } from "@/components/ui/section";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * Suspense fallback (skeleton). Kept at the app root.
 *
 * Phase 9: all routes now render at request time (`export const dynamic =
 * "force-dynamic"` in src/app/layout.tsx). That is required so Next.js
 * embeds the per-request CSP nonce into the inline RSC flight scripts;
 * build-time static HTML cannot carry a per-request nonce, so its flight
 * scripts were CSP-blocked in production, breaking hydration (React #412).
 * See docs/qa/PHASE-9-HYDRATION-AUDIT.md. This skeleton still serves as the
 * streaming fallback for Suspense boundaries during client-side navigation.
 */
export default function Loading() {
  return (
    <Section spacing="wide">
      <div className="flex flex-col gap-6">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-10 w-2/3" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>
    </Section>
  );
}
