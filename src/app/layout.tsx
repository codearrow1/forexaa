import type { Metadata } from "next";
import "./globals.css";
import { ThemeController } from "@/components/theme/theme-controller";
import { getServerTheme } from "@/lib/theme/server-theme";

// All routes render at request time so Next.js embeds the per-request CSP
// nonce into the inline RSC flight scripts. Build-time static HTML cannot
// carry a per-request nonce, so its flight scripts were CSP-blocked in
// production, breaking hydration (React #412). See src/app/loading.tsx and
// docs/qa/PHASE-9-HYDRATION-AUDIT.md.
export const dynamic = "force-dynamic";
import { AppBackground } from "@/components/layout/app-background";
import { SkipLink } from "@/components/layout/skip-link";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

export const metadata: Metadata = {
  title: "FOREXAA",
  description:
    "The Technology Behind Modern Brokerages. One connected stack across CRM, trading platforms, liquidity, payments, risk and operations for brokerage businesses.",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const theme = await getServerTheme();
  return (
    <html lang="en" className="h-full antialiased" data-theme={theme}>
      <body className="min-h-full flex flex-col">
        <ThemeController initialTheme={theme} />
        <AppBackground />
        <SkipLink />
        <SiteHeader initialTheme={theme} />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
