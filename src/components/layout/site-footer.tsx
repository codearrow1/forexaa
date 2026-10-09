import { siteConfig } from "@/config/site";
import { Logo } from "@/components/ui/logo";

/**
 * Premium multi-column footer. Fully data-driven from `siteConfig.footer`
 * (Rule 6). Legal links are placeholders — real pages land in a later phase
 * (Rule 49: do not invent regulatory claims).
 */
export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-obsidian">
      <div className="mx-auto max-w-[var(--container-width)] px-5 sm:px-6 lg:px-8 3xl:px-10 py-14">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4 lg:grid-cols-5">
          <div className="col-span-2 mb-8 md:col-span-4 lg:col-span-1">
            <Logo compact />
            <p className="mt-4 max-w-56 type-small text-text-muted">
              {siteConfig.description}
            </p>
          </div>

          {siteConfig.footer.columns.map((column) => (
            <nav key={column.heading} aria-label={column.heading} className="flex flex-col gap-2.5">
              {/* h2 (not h3): keeps heading order sequential on pages without
                  an h2 in their main content (e.g. /contact). */}
              <h2 className="type-label text-text-muted">{column.heading}</h2>
              <ul className="flex flex-col gap-2">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="type-small text-text-muted transition-colors duration-(--duration-fast) hover:text-text"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-border pt-6 md:flex-row md:items-center md:justify-between">
          <nav aria-label="Legal" className="flex flex-wrap gap-x-5 gap-y-2">
            {siteConfig.footer.legal.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="type-caption text-text-muted hover:text-text"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <p className="type-caption text-text-muted">{siteConfig.footer.copyright}</p>
        </div>

        {/* Social placeholders — real profiles TBD (Rule 49) */}
        <div className="mt-6 flex gap-3">
          {siteConfig.footer.social
            .filter(
              (social): social is { label: string; href: string } =>
                social.href !== undefined,
            )
            .map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="type-caption text-text-muted hover:text-text"
              >
                {social.label}
              </a>
            ))}
        </div>
      </div>
    </footer>
  );
}
