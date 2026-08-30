import { site, type Building } from "@/lib/site";

/* ============================================================
   schema.org yapısal verisi. Tek kaynak: lib/site.ts
   KURAL: Doğrulanamayan alan EKLENMEZ. aggregateRating / review /
   somut fiyat uydurmak Google'da yapısal veri cezası getirir.
   ============================================================ */

/** Şemalar birbirine @id ile referans verir: Organization ↔ LodgingBusiness ↔ WebSite */
export const ORG_ID = `${site.url}/#organization`;
export const WEBSITE_ID = `${site.url}/#website`;
export const buildingId = (id: string) => `${site.url}/#${id}`;

/**
 * Yapısal veri sabit ve değişmeyen adres ister. \`opengraph-image.tsx\`
 * üretilen görselin adresine hash ekliyor, o yüzden buraya yazılamaz.
 * LOGO: markanın kare işaretinden üretilen sabit dosya.
 * IMAGE: binanın gerçek fotoğrafı; Google işletme görseli olarak bunu kullanır.
 */
const LOGO = `${site.url}/logo.png`;
const IMAGE = `${site.url}/images/bina-2-giris.jpg`;

type Schema = Record<string, unknown>;

/**
 * <script type="application/ld+json">
 * "<" kaçırılıyor: içerik "</script>" barındırırsa etiketi erken kapatmasın.
 */
export function JsonLd({ data }: { data: Schema | Schema[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

/* ---------- Organization ---------- */
export function organizationSchema(): Schema {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: site.name,
    legalName: site.legalName,
    url: site.url,
    email: site.email,
    telephone: site.phone,
    logo: {
      "@type": "ImageObject",
      url: LOGO,
      width: 512,
      height: 512,
    },
    image: IMAGE,
    sameAs: [site.instagram],
    areaServed: { "@type": "City", name: site.city },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        telephone: site.phone,
        email: site.email,
        availableLanguage: ["tr", "en"],
      },
    ],
    subOrganization: site.buildings.map((b) => ({ "@id": buildingId(b.id) })),
  };
}

/* ---------- LodgingBusiness (her bina için ayrı) ---------- */
const AMENITIES_TR = [
  "Ücretsiz kablosuz internet",
  "Her dairede çamaşır makinesi",
  "Her dairede mutfak ve beyaz eşyalar",
  "Eşyalı odalar",
  "7/24 kamera güvenliği",
] as const;

/** 7/24 açık - öğrenci apartı kapanış saati olan bir işletme değil. */
const OPEN_24_7 = {
  "@type": "OpeningHoursSpecification",
  dayOfWeek: [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ],
  opens: "00:00",
  closes: "23:59",
};

export function localBusinessSchema(building: Building): Schema {
  return {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    "@id": buildingId(building.id),
    name: `${site.name} ${building.name}`,
    url: site.url,
    image: IMAGE,
    telephone: site.phone,
    email: site.email,
    // Somut rakam uydurulmuyor; nötr aralık.
    priceRange: "₺₺",
    currenciesAccepted: "TRY",
    address: {
      "@type": "PostalAddress",
      streetAddress: building.street,
      addressLocality: building.district,
      addressRegion: building.city,
      postalCode: building.postalCode,
      addressCountry: "TR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: building.lat,
      longitude: building.lng,
    },
    hasMap: building.maps,
    petsAllowed: false,
    openingHoursSpecification: [OPEN_24_7],
    amenityFeature: AMENITIES_TR.map((name) => ({
      "@type": "LocationFeatureSpecification",
      name,
      value: true,
    })),
    audience: {
      "@type": "EducationalAudience",
      educationalRole: "student",
      audienceType: "Kadın üniversite öğrencileri",
    },
    parentOrganization: { "@id": ORG_ID },
    sameAs: [site.instagram],
  };
}

/** İki binayı birden isteyen sayfalar için kısayol (/, /konum, /iletisim). */
export function allBuildingsSchema(): Schema[] {
  return site.buildings.map(localBusinessSchema);
}

/* ---------- WebSite ---------- */
export function websiteSchema(): Schema {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: site.url,
    name: site.name,
    inLanguage: ["tr-TR", "en-US"],
    publisher: { "@id": ORG_ID },
    about: { "@id": ORG_ID },
  };
}

/* ---------- BreadcrumbList ---------- */
export type BreadcrumbItem = { name: string; url: string };

/** url: site köküne göre yol ("/odalar") ya da tam URL - ikisi de olur. */
export function breadcrumbSchema(items: BreadcrumbItem[]): Schema {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${site.url}${item.url}`,
    })),
  };
}

/* ---------- FAQPage ---------- */
export type FaqItem = { question: string; answer: string };

export function faqSchema(items: FaqItem[]): Schema {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}
