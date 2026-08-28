import type { Metadata } from "next";
import { site } from "./site";
import { defaultLocale, type Locale } from "./i18n";

/**
 * Sayfa metadata üreticisi - her sayfa bunu kullanır.
 * canonical + hreflang + OG/Twitter tek yerden çıkar ki tutarsızlık olmasın.
 */
export function pageMetadata({
  locale,
  path,
  title,
  description,
  image,
  noindex,
}: {
  locale: Locale;
  path: string; // "/odalar" - dil ön eki OLMADAN
  title: string;
  description: string;
  image?: string;
  noindex?: boolean;
}): Metadata {
  const trPath = path === "/" ? "/" : path;
  const enPath = path === "/" ? "/en" : `/en${path}`;
  const canonical = locale === defaultLocale ? trPath : enPath;
  const ogImage = image ?? "/opengraph-image";

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: { "tr-TR": trPath, "en-US": enPath, "x-default": trPath },
    },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: locale === "tr" ? "tr_TR" : "en_US",
      alternateLocale: locale === "tr" ? "en_US" : "tr_TR",
      url: canonical,
      title,
      description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: { card: "summary_large_image", title, description, images: [ogImage] },
    robots: noindex
      ? { index: false, follow: false }
      : { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  };
}

/** Sitede indekslenen tüm yollar - sitemap ve hreflang bunu kullanır. */
export const routes = [
  "/",
  "/odalar",
  "/galeri",
  "/konum",
  "/hakkimizda",
  "/sss",
  "/iletisim",
  "/on-kayit",
  "/kvkk",
] as const;
