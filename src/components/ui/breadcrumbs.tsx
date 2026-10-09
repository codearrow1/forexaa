import Link from "next/link";
import { routeByPath } from "@/config/seo/routes";
import { crumbTrail } from "@/lib/seo/crumbs";

/**
 * Visible breadcrumbs for a live route (Rule 18 / 34). Reads the shared
 * crumb module so it can never disagree with the BreadcrumbList JSON-LD.
 */
export function Breadcrumbs({ current }: { current: string }) {
  const route = routeByPath(current);
  if (!route || route.breadcrumb.length <= 1) return null;

  const crumbs = crumbTrail(route);

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-1.5 type-small text-text-muted">
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1;
          return (
            <li key={`${crumb.label}-${index}`} className="flex items-center gap-1.5">
              {isLast ? (
                <span aria-current="page" className="font-medium text-text">
                  {crumb.label}
                </span>
              ) : (
                <>
                  <Link href={crumb.href} className="hover:text-text">
                    {crumb.label}
                  </Link>
                  <span aria-hidden="true" className="text-text-muted">
                    /
                  </span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
