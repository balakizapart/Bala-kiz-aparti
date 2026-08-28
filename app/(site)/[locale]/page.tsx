import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { TrustStrip } from "@/components/home/trust-strip";
import { Manifesto } from "@/components/home/manifesto";
import { RoomsShowcase } from "@/components/home/rooms-showcase";
import { Amenities } from "@/components/home/amenities";
import { LifeStrip } from "@/components/home/life-strip";
import { Location } from "@/components/home/location";
import { Parents } from "@/components/home/parents";
import { FaqTeaser, faqTeaser } from "@/components/home/faq-teaser";
import { ClosingCta } from "@/components/home/closing-cta";
import { JsonLd, faqSchema } from "@/components/seo/json-ld";
import { pageMetadata } from "@/lib/seo";
import type { Locale } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const l: Locale = locale === "en" ? "en" : "tr";
  return pageMetadata({
    locale: l,
    path: "/",
    title:
      l === "tr"
        ? "Eskişehir Kız Öğrenci Apartı | Espark Karşısı, Anadolu Üniversitesi 5 dk"
        : "Girls' Student Residence in Eskişehir | Across from Espark",
    description:
      l === "tr"
        ? "Eskişehir Tepebaşı'nda kız öğrenci apartı. Espark'ın karşısında, tramvaya 1 dakika, Anadolu Üniversitesi'ne 5 dakika. Tek ve iki kişilik eşyalı odalar, her dairede mutfak ve çamaşır makinesi, 7/24 kamera güvenliği."
        : "Girls' student residence in Tepebaşı, Eskişehir. Across from Espark, 1 minute to the tram, 5 minutes to Anadolu University. Furnished single and twin rooms, kitchen and washing machine in every flat, 24/7 camera security.",
  });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const l: Locale = locale === "en" ? "en" : "tr";

  return (
    <>
      <JsonLd data={faqSchema(faqTeaser[l].map((f) => ({ question: f.q, answer: f.a })))} />
      <Hero locale={l} />
      <TrustStrip locale={l} />
      <Manifesto locale={l} />
      <RoomsShowcase locale={l} />
      <Amenities locale={l} />
      <LifeStrip locale={l} />
      <Location locale={l} />
      <Parents locale={l} />
      <FaqTeaser locale={l} />
      <ClosingCta locale={l} />
    </>
  );
}
