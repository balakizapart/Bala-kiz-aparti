"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { localePath, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

/** Mevcut yolu koruyarak TR ↔ EN. "/odalar" ↔ "/en/odalar" */
export function LanguageSwitcher({
  locale,
  label,
  className,
}: {
  locale: Locale;
  label: string;
  className?: string;
}) {
  const pathname = usePathname() || "/";
  // "/en" → "/", "/en/odalar" → "/odalar", diğerleri olduğu gibi
  const base = pathname === "/en" ? "/" : pathname.startsWith("/en/") ? pathname.slice(3) : pathname;

  return (
    <nav aria-label={label} className={cn("flex items-center gap-1.5", className)}>
      {(["tr", "en"] as const).map((l, i) => (
        <span key={l} className="flex items-center gap-1.5">
          {i > 0 && <span aria-hidden className="text-line">/</span>}
          <Link
            href={localePath(l, base)}
            hrefLang={l}
            aria-current={l === locale ? "true" : undefined}
            className={cn(
              "eyebrow transition-colors duration-500 ease-(--ease-out-expo)",
              l === locale ? "text-ink" : "text-muted hover:text-ink"
            )}
          >
            {l}
          </Link>
        </span>
      ))}
    </nav>
  );
}
