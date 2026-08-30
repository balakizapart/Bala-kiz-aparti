import type { Metadata } from "next";
import { site } from "./site";
import { defaultLocale, type Locale } from "./i18n";

/**
 * Sayfa metadata üreticisi - her sayfa bunu kullanır.
 * canonical + hreflang + OG/Twitter tek yerden çıkar ki tutarsızlık olmasın.
 *
 * PAYLAŞIM GÖRSELİNİ BURADA TANIMLAMA. \`opengraph-image.tsx\` dosya
 * kuralı görseli kendi üretir ve adresine bir hash ekler
 * (\`/opengraph-image-1yhjss\`). Buraya elle \`images\` yazmak o otomatik
 * etiketi eziyor ve olmayan bir adrese işaret ediyordu; WhatsApp ve
 * Instagram önizlemelerinde görsel hiç çıkmıyordu. 2026-08-31'de bulundu.
 */
export function pageMetadata({
  locale,
  path,
  title,
  description,
  noindex,
}: {
  locale: Locale;
  path: string; // "/odalar" - dil ön eki OLMADAN
  title: string;
  description: string;
  noindex?: boolean;
}): Metadata {
  const trPath = path === "/" ? "/" : path;
  const enPath = path === "/" ? "/en" : `/en${path}`;
  const canonical = locale === defaultLocale ? trPath : enPath;

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
    },
    twitter: { card: "summary_large_image", title, description },
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
