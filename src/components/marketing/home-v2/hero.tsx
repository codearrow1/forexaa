import { ButtonLink } from "@/components/ui/button";
import { CTAS } from "@/config/ctas";
import { HeroArchitecture } from "./hero-architecture";

/**
 * Homepage V2 — Hero (Phase 12A, §2–4).
 *
 * The main event: dominant typographic headline + a large brokerage-OS
 * architecture visual. The headline is plain server-rendered HTML (LCP-first,
 * SEO-critical — never client-gated). The visual is a client island.
 */
export function HeroV2() {
  return (
    <section className="relative flex min-h-screen flex-col overflow-hidden">
      {/* Atmospheric grid (meaningful: signal paths, not decoration) */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--color-border) 1px, transparent 1px), linear-gradient(to bottom, var(--color-border) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage: "radial-gradient(ellipse 90% 70% at 50% 40%, black, transparent)",
          opacity: 0.5,
        }}
      />

      <div className="relative z-10 mx-auto flex w-full max-w-[var(--container-width)] flex-1 flex-col justify-center gap-10 px-5 py-24 sm:px-6 lg:px-8 3xl:px-10 lg:flex-row lg:items-center lg:gap-16">
        {/* Copy — server-rendered (h1 is the LCP element) */}
        <div className="flex max-w-2xl flex-col gap-7">
          <span className="type-label text-primary">Brokerage Infrastructure</span>

          <h1 className="type-hero text-text">
            The Technology
            <span className="block bg-gradient-to-r from-primary to-secondary-soft bg-clip-text text-transparent">
              Behind Modern
            </span>
            <span className="block">Brokerages.</span>
          </h1>

          <p className="type-lead max-w-xl text-text-muted">
            One connected technology stack across clients, CRM, trading,
            liquidity, risk and operations.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <ButtonLink href={CTAS["build-brokerage"]!.href} variant="primary" size="lg">
              {CTAS["build-brokerage"]!.label}
            </ButtonLink>
            <ButtonLink href={CTAS["explore-platform"]!.href} variant="secondary" size="lg">
              {CTAS["explore-platform"]!.label}
            </ButtonLink>
          </div>
        </div>

        {/* Signature visual — client island */}
        <div className="relative flex flex-1 items-center justify-center lg:max-w-[46%]">
          <HeroArchitecture />
        </div>
      </div>

      {/* Scroll hint */}
      <div
        aria-hidden="true"
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="type-caption text-text-muted">Scroll to explore</span>
          <div className="h-8 w-px bg-gradient-to-b from-primary to-transparent" />
        </div>
      </div>
    </section>
  );
}
