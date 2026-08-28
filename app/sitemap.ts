import type { MetadataRoute } from "next";
import { routes } from "@/lib/seo";
import { site } from "@/lib/site";

type Route = (typeof routes)[number];
type ChangeFreq = NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;

/**
 * Öncelik mantığı: dönüşüm + yerel SEO önce.
 * "/odalar" ve "/konum" hem satış hem "Tepebaşı / Anadolu Üniversitesi" aramalarını taşır.
 * Record<Route, ...> olduğu için `routes`'a yeni yol eklenirse burası tip hatası verir.
 */
const meta: Record<Route, { priority: number; changeFrequency: ChangeFreq }> = {
  "/": { priority: 1.0, changeFrequency: "weekly" },
  "/odalar": { priority: 0.9, changeFrequency: "weekly" }, // doluluk/fiyat değişir
  "/konum": { priority: 0.9, changeFrequency: "monthly" },
  "/on-kayit": { priority: 0.8, changeFrequency: "monthly" },
  "/galeri": { priority: 0.7, changeFrequency: "monthly" },
  "/sss": { priority: 0.7, changeFrequency: "monthly" },
  "/iletisim": { priority: 0.7, changeFrequency: "yearly" },
  "/hakkimizda": { priority: 0.6, changeFrequency: "yearly" },
  "/kvkk": { priority: 0.2, changeFrequency: "yearly" },
};

const trUrl = (path: Route) => `${site.url}${path}`;
const enUrl = (path: Route) => `${site.url}${path === "/" ? "/en" : `/en${path}`}`;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.flatMap((path) => {
    const { priority, changeFrequency } = meta[path];
    const tr = trUrl(path);
    const en = enUrl(path);
    // x-default → Türkçe: site TR odaklı, EN ikincil.
    const languages = { "tr-TR": tr, "en-US": en, "x-default": tr };

    return [
      { url: tr, lastModified, changeFrequency, priority, alternates: { languages } },
      {
        url: en,
        lastModified,
        changeFrequency,
        priority: Math.max(0.1, Number((priority - 0.2).toFixed(1))),
        alternates: { languages },
      },
    ];
  });
}
