import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { fontVars } from "@/app/fonts";
import { getMessages, isLocale, locales, defaultLocale, type Locale } from "@/lib/i18n";
import { site } from "@/lib/site";
import { SmoothScroll } from "@/components/ui/smooth-scroll";
import { ScrollProgress } from "@/components/ui/primitives";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import {
  JsonLd,
  organizationSchema,
  websiteSchema,
  allBuildingsSchema,
} from "@/components/seo/json-ld";
import "@/app/globals.css";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: "#faf7f2",
  colorScheme: "light",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const tr = locale !== "en";
  return {
    metadataBase: new URL(site.url),
    title: {
      default: tr
        ? "Bala Kız Apartı | Eskişehir Kız Öğrenci Apartı"
        : "Bala Girls' Residence | Student Housing in Eskişehir",
      template: "%s | Bala Kız Apartı",
    },
    description: tr
      ? "Eskişehir Tepebaşı'nda kız öğrenci apartı. Espark'ın karşısında, Anadolu Üniversitesi'ne 5 dakika. Tek ve iki kişilik eşyalı odalar, her dairede mutfak ve çamaşır makinesi, 7/24 kamera güvenliği."
      : "Girls' student residence in Eskişehir. Across from Espark, 5 minutes to Anadolu University. Furnished single and twin rooms, a kitchen and washing machine in every flat, 24/7 camera security.",
    alternates: {
      canonical: locale === defaultLocale ? "/" : `/${locale}`,
      languages: { "tr-TR": "/", "en-US": "/en", "x-default": "/" },
    },
  };
}

export default async function SiteLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getMessages(locale as Locale);

  return (
    // fontVars <html>'de olmalı: next/font değişkenlerini (--font-jakarta,
    // --font-bricolage) tanımlar ve globals.css'teki --font-sans / --font-display
    // token'ları :root'ta bunlara bakar. <body>'ye konursa :root'ta çözülemez,
    // token geçersize düşer ve sayfa sistem fontuna iner.
    <html lang={locale} className={fontVars} suppressHydrationWarning>
      <body className="grain antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-(--radius-sm) focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
        >
          {t.a11y.skipToContent}
        </a>
        {/* Yapısal veri tek yerde: Organization + WebSite + iki LodgingBusiness.
            Sayfaya özel şemalar (FAQPage) kendi sayfasında. */}
        <JsonLd data={[organizationSchema(), websiteSchema(), ...allBuildingsSchema()]} />
        <ScrollProgress />
        <SmoothScroll />
        <Header locale={locale as Locale} t={t} />
        <main id="main">{children}</main>
        <Footer locale={locale as Locale} t={t} />
      </body>
    </html>
  );
}
