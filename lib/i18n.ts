import tr, { type Dict } from "@/messages/tr";
import en from "@/messages/en";

export const locales = ["tr", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "tr";

const dict = { tr, en };
// tr sözlüğü şemadır; en aynı anahtarları taşımak zorundadır (tip hatası verir)
export type Messages = Dict;

export function getMessages(locale: Locale): Messages {
  return dict[locale] ?? dict.tr;
}

export function isLocale(v: string): v is Locale {
  return (locales as readonly string[]).includes(v);
}

/** Varsayılan dil (tr) ön ek almaz: "/odalar", İngilizce "/en/odalar" */
export function localePath(locale: Locale, path: string): string {
  const clean = path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  return locale === defaultLocale ? clean || "/" : `/${locale}${clean}`;
}
