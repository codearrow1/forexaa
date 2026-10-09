"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/cn";
import { DURATION, EASE } from "@/lib/motion/transitions";
import { useReducedMotionSafe } from "@/lib/motion/useReducedMotionSafe";
import { ButtonLink } from "@/components/ui/button";
import { CTAS } from "@/config/ctas";
import { ScrollScene } from "@/components/story/primitives";
import {
  CRMInterface,
  TraderRoomInterface,
  TradingInterface,
  LiquidityInterface,
  RiskInterface,
  PartnerNetwork,
  OperationsInterface,
} from "./product-interface";

/**
 * Homepage V2 sections (Phase 12A). Server-rendered; motion is limited to
 * ScrollScene reveals. Compositions vary per section (§29) — no two
 * consecutive sections share a layout.
 */

export function ProblemSection() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto flex max-w-[var(--container-width)] flex-col gap-12 px-5 sm:px-6 lg:px-8 3xl:px-10">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="flex flex-col gap-5">
            <span className="type-label text-primary">The problem</span>
            <h2 className="type-section">
              A brokerage is an operating system, not a trading terminal.
            </h2>
            <p className="type-lead max-w-lg text-text-muted">
              Most brokerages run on disconnected systems — a CRM here, a
              platform there, a liquidity feed somewhere else. Data is re-keyed,
              risk is fragmented, and the client experience splinters.
            </p>
          </div>
          {/* Fragmented → connected visual */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-2">
              {["CRM", "Trading", "Liquidity", "Risk", "Partners", "Ops"].map((m) => (
                <span key={m} className="rounded-lg border border-border bg-surface px-3 py-2 type-small text-text-muted">
                  {m}
                </span>
              ))}
            </div>
            <div aria-hidden="true" className="flex items-center gap-3">
              <span className="h-px flex-1 bg-border" />
              <span className="type-caption text-text-muted">fragmented</span>
              <span aria-hidden="true" className="text-primary">→</span>
              <span className="type-caption text-text-muted">connected</span>
              <span className="h-px flex-1 bg-border" />
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {["Client", "CRM", "Trading", "Liquidity", "Risk", "Operations", "Partners"].map((m) => (
                <span key={m} className="rounded-lg border border-border-accent bg-primary/10 px-3 py-2 type-small font-medium text-primary">
                  {m}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* §13 — Client Experience: full-width Trader's Room */
export function ClientExperienceSection() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto flex max-w-[var(--container-width)] flex-col gap-10 px-5 sm:px-6 lg:px-8 3xl:px-10">
        <div className="flex flex-col gap-4">
          <span className="type-label text-primary">Client experience</span>
          <h2 className="type-section max-w-2xl">
            One client experience from onboarding to trading.
          </h2>
          <p className="type-lead max-w-2xl text-text-muted">
            Signup, KYC, funding, trading, monitoring, retention — under your
            brand, in one place.
          </p>
        </div>
        <ScrollScene>
          <TraderRoomInterface />
        </ScrollScene>
      </div>
    </section>
  );
}

/* §14 — CRM: split (right text / left UI) */
export function CRMSection() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto flex max-w-[var(--container-width)] flex-col gap-10 px-5 sm:px-6 lg:px-8 3xl:px-10">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <ScrollScene className="order-2 lg:order-1">
            <CRMInterface />
          </ScrollScene>
          <div className="order-1 flex flex-col gap-5 lg:order-2">
            <span className="type-label text-primary">CRM</span>
            <h2 className="type-section">
              One client lifecycle from lead to funded account.
            </h2>
            <p className="type-lead max-w-lg text-text-muted">
              Lead → KYC → account → funding → trading → retention. Built around
              the way a brokerage actually works, not a generic sales pipeline.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* §15 — Trading: split (left text / right UI) */
export function TradingSection() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto flex max-w-[var(--container-width)] flex-col gap-10 px-5 sm:px-6 lg:px-8 3xl:px-10">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="flex flex-col gap-5">
            <span className="type-label text-primary">Trading</span>
            <h2 className="type-section">
              Choose the trading experience your clients get.
            </h2>
            <p className="type-lead max-w-lg text-text-muted">
              MT4, MT5, MT7, cTrader, Web, Mobile — each connected to the same
              CRM, back office and liquidity layer.
            </p>
          </div>
          <ScrollScene>
            <TradingInterface />
          </ScrollScene>
        </div>
      </div>
    </section>
  );
}

/* §16 — Liquidity: full-width architecture */
export function LiquiditySection() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto flex max-w-[var(--container-width)] flex-col gap-10 px-5 sm:px-6 lg:px-8 3xl:px-10">
        <div className="flex flex-col gap-4">
          <span className="type-label text-primary">Liquidity</span>
          <h2 className="type-section max-w-2xl">
            Connect every client account to a unified execution layer.
          </h2>
          <p className="type-lead max-w-2xl text-text-muted">
            Providers → aggregation → routing → execution → client accounts.
            Multiple venues, one connected architecture.
          </p>
        </div>
        <ScrollScene>
          <LiquidityInterface />
        </ScrollScene>
      </div>
    </section>
  );
}

/* §17 — Risk: split (right text / left UI) */
export function RiskSection() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto flex max-w-[var(--container-width)] flex-col gap-10 px-5 sm:px-6 lg:px-8 3xl:px-10">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <ScrollScene className="order-2 lg:order-1">
            <RiskInterface />
          </ScrollScene>
          <div className="order-1 flex flex-col gap-5 lg:order-2">
            <span className="type-label text-primary">Risk</span>
            <h2 className="type-section">
              Risk sits between your operations and the market.
            </h2>
            <p className="type-lead max-w-lg text-text-muted">
              Exposure, margin, positions, limits, alerts, intervention —
              monitored across the book in real time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* §18 — Partners: full-width network */
export function PartnersSection() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto flex max-w-[var(--container-width)] flex-col gap-10 px-5 sm:px-6 lg:px-8 3xl:px-10">
        <div className="flex flex-col gap-4">
          <span className="type-label text-primary">Partners</span>
          <h2 className="type-section max-w-2xl">
            Your network is your reach.
          </h2>
          <p className="type-lead max-w-2xl text-text-muted">
            IB, affiliate, introducing broker, referral and partner
            relationships — one network connected to the same client record,
            reporting and operations as the rest of the brokerage.
          </p>
        </div>
        <ScrollScene>
          <PartnerNetwork />
        </ScrollScene>
      </div>
    </section>
  );
}

/* §19 — Operations: split (left text / right UI) */
export function OperationsSection() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto flex max-w-[var(--container-width)] flex-col gap-10 px-5 sm:px-6 lg:px-8 3xl:px-10">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="flex flex-col gap-5">
            <span className="type-label text-primary">Operations</span>
            <h2 className="type-section">
              The trading platform is only one part of the brokerage.
            </h2>
            <p className="type-lead max-w-lg text-text-muted">
              Back office, CRM, risk, compliance workflow, client management,
              reporting, support — the operations layer that runs the business.
            </p>
          </div>
          <ScrollScene>
            <OperationsInterface />
          </ScrollScene>
        </div>
      </div>
    </section>
  );
}

/* §20 — Complete stack: dramatic summary */
export function CompleteStackSection() {
  const reduced = useReducedMotionSafe();
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div className="mx-auto flex max-w-[var(--container-width)] flex-col items-center gap-10 px-5 text-center sm:px-6 lg:px-8 3xl:px-10">
        <div className="flex flex-col gap-4">
          <span className="type-label text-primary">The complete stack</span>
          <h2 className="type-section mx-auto max-w-3xl">
            One connected system. Every layer of the brokerage.
          </h2>
        </div>
        {/* Large architecture diagram */}
        <div className="relative w-full max-w-4xl">
          <svg aria-hidden="true" className="absolute inset-0 h-full w-full" viewBox="0 0 800 400" fill="none" preserveAspectRatio="xMidYMid meet">
            {[
              "M400 60 V140", "M200 180 H600", "M400 220 V300", "M200 340 H600",
            "M120 100 L200 180", "M680 100 L600 180", "M120 300 L200 340", "M680 300 L600 340",
            "M400 140 L200 180", "M400 140 L600 180", "M400 300 L200 340", "M400 300 L600 340",
            "M200 180 L200 340", "M600 180 L600 340",
            "M400 60 L120 100", "M400 60 L680 100", "M400 300 L120 300", "M400 300 L680 300",
            "M120 100 L120 300", "M680 100 L680 300",
            "M200 180 L120 100", "M200 180 L120 300", "M600 180 L680 100", "M600 180 L680 300",
              "M200 340 L120 300", "M200 340 L120 100", "M600 340 L680 300", "M600 340 L680 100",
            ].map((d, i) => (
              <motion.path
                key={d}
                d={d}
                stroke="var(--color-primary)"
                strokeWidth="1"
                strokeOpacity="0.2"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: reduced ? 0 : DURATION.slow, delay: i * 0.02, ease: EASE.inOut }}
              />
            ))}
          </svg>
          <div className="relative grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { label: "Client", tone: "cyan" as const },
              { label: "Client Experience", tone: "cyan" as const },
              { label: "CRM", tone: "violet" as const },
              { label: "Trading", tone: "cyan" as const },
              { label: "Partners", tone: "mint" as const },
              { label: "Liquidity", tone: "mint" as const },
              { label: "Risk", tone: "violet" as const },
              { label: "Operations", tone: "mint" as const },
            ].map((m, i) => (
              <motion.div
                key={m.label}
                className={cn(
                  "flex flex-col items-center gap-1.5 rounded-xl border bg-surface/60 px-3 py-4 text-center",
                  m.tone === "cyan" && "border-border-accent",
                  m.tone === "violet" && "border-secondary/40",
                  m.tone === "mint" && "border-success/30",
                )}
                initial={{ opacity: 0, y: reduced ? 0 : 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: reduced ? 0 : DURATION.standard, delay: i * 0.05, ease: EASE.out }}
              >
                <span
                  className="h-2 w-2 rounded-full"
                  style={{
                    backgroundColor:
                      m.tone === "cyan" ? "var(--color-primary)" : m.tone === "violet" ? "var(--color-secondary)" : "var(--color-success)",
                  }}
                />
                <span className="type-small font-medium text-text">{m.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* §21 — Final CTA */
export function FinalCTASection() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div className="mx-auto flex max-w-[var(--container-width)] flex-col items-center gap-8 px-5 text-center sm:px-6 lg:px-8 3xl:px-10">
        <h2 className="type-hero max-w-3xl">
          Build your brokerage
          <span className="block bg-gradient-to-r from-primary to-secondary-soft bg-clip-text text-transparent">
            with FOREXAA.
          </span>
        </h2>
        <p className="type-lead max-w-2xl text-text-muted">
          Tell us how you want to run your brokerage — platform, CRM,
          liquidity, risk and operations, shaped around your business model.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <ButtonLink href={CTAS["build-brokerage"]!.href} variant="primary" size="lg">
            {CTAS["build-brokerage"]!.label}
          </ButtonLink>
          <ButtonLink href={CTAS["explore-platform"]!.href} variant="secondary" size="lg">
            {CTAS["explore-platform"]!.label}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
