import type { Metadata } from "next";
import { Location } from "@/components/home/location";
import { CtaBlock } from "@/components/pages/cta-block";
import { PageHeader } from "@/components/pages/page-header";
import { Container, Eyebrow, Reveal, Section, SplitText } from "@/components/ui/primitives";
import { JsonLd, breadcrumbSchema } from "@/components/seo/json-ld";
import { pageMetadata } from "@/lib/seo";
import type { Locale } from "@/lib/i18n";

const copy = {
  tr: {
    eyebrow: "Konum",
    title: "Espark'ın karşısında, şehrin tam ortasında.",
    lead: "Eskibağlar Mahallesi'nde iki binamız var. Tramvay bir dakika; Anadolu Üniversitesi'ne yürüyerek beş dakikada varılıyor.",
    meta: ["Tepebaşı, Eskişehir", "Espark karşısı", "Tramvaya 1 dk"],
    aroundEyebrow: "Çevre",
    aroundTitle: "Kapıdan çıkınca şehir başlıyor.",
    around: [
      {
        t: "Alışveriş ve market",
        d: "Espark tam karşımızda: market, eczane, kırtasiye, kafeler ve sinema aynı çatı altında. Sokak aralarında da bakkal ve fırın var.",
      },
      {
        t: "Ulaşım",
        d: "Tramvay durağı bir dakika. Anadolu Üniversitesi, Osmangazi Üniversitesi, otogar ve tren garı aktarmasız hattın üstünde.",
      },
      {
        t: "Yeme-içme",
        d: "Sokakta börekçi, tostçu ve öğrenci bütçesine uygun yerler var; Adalar'daki kafeler yürüme mesafesinde.",
      },
      {
        t: "Şehir merkezi",
        d: "Adalar ve Köprübaşı üç dakika. Akşam yürüyüşü için ideal, gece de sokaklar hareketli ve aydınlık.",
      },
    ],
    breadcrumbHome: "Ana sayfa",
  },
  en: {
    eyebrow: "Location",
    title: "Across from Espark, dead centre of the city.",
    lead: "Our two buildings are in Eskibağlar. The tram is one minute away and Anadolu University is a five-minute walk.",
    meta: ["Tepebaşı, Eskişehir", "Across from Espark", "1 min to the tram"],
    aroundEyebrow: "Around us",
    aroundTitle: "The city starts at the door.",
    around: [
      {
        t: "Shopping and groceries",
        d: "Espark is right opposite: supermarket, pharmacy, stationery, cafés and a cinema under one roof. There are corner shops and bakeries on the side streets too.",
      },
      {
        t: "Transport",
        d: "The tram stop is one minute away. Anadolu University, Osmangazi University, the bus station and the train station are all on the same line, no transfers.",
      },
      {
        t: "Eating out",
        d: "Börek and toast shops on the street, plenty of student-budget places, and the cafés at Adalar within walking distance.",
      },
      {
        t: "City centre",
        d: "Adalar and Köprübaşı are three minutes away. Perfect for an evening walk; the streets stay lively and well lit.",
      },
    ],
    breadcrumbHome: "Home",
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const l: Locale = locale === "en" ? "en" : "tr";
  return pageMetadata({
    locale: l,
    path: "/konum",
    title:
      l === "tr"
        ? "Konum ve Ulaşım | Eskişehir Tepebaşı Kız Öğrenci Apartı"
        : "Location and Transport | Girls' Residence in Tepebaşı, Eskişehir",
    description:
      l === "tr"
        ? "Bala Kız Apartı konumu: Eskibağlar Mahallesi Akmescit Sokak No:4 ve Aşçı Sokak No:6, Tepebaşı/Eskişehir. Espark karşısı, tramvaya 1 dk, Anadolu Üniversitesi'ne 5 dk."
        : "Location of Bala Girls' Residence: Akmescit Sokak No:4 and Aşçı Sokak No:6, Eskibağlar, Tepebaşı, Eskişehir. Across from Espark, 1 min to the tram, 5 min to Anadolu University.",
  });
}

export default async function LocationPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const l: Locale = locale === "en" ? "en" : "tr";
  const c = copy[l];
  const base = l === "tr" ? "" : "/en";

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: c.breadcrumbHome, url: base || "/" },
          { name: c.eyebrow, url: `${base}/konum` },
        ])}
      />

      <PageHeader index="01" eyebrow={c.eyebrow} title={c.title} lead={c.lead} meta={[...c.meta]} />

      {/* Adresler + mesafeler + büyük harita */}
      <Location locale={l} />

      {/* Çevrede ne var */}
      <Section className="bg-sand/60">
        <Container>
          <Reveal>
            <Eyebrow index="05">{c.aroundEyebrow}</Eyebrow>
          </Reveal>
          <SplitText
            as="h2"
            text={c.aroundTitle}
            gradientLastWords={2}
            className="mt-6 max-w-3xl font-display text-h1 font-bold text-balance"
          />

          <ul className="mt-12 grid gap-8 sm:grid-cols-2">
            {c.around.map((a, i) => (
              <Reveal as="li" key={a.t} delay={i * 0.07}>
                <div className="h-full rounded-(--radius-md) border border-line bg-paper p-7 transition-shadow duration-700 ease-(--ease-out-expo) hover:shadow-(--shadow-lift)">
                  <span aria-hidden className="eyebrow grad-text font-black">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 font-display text-h3 font-bold">{a.t}</h3>
                  <p className="mt-3 text-pretty text-sm leading-relaxed text-ink-soft">{a.d}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      <CtaBlock locale={l} />
    </>
  );
}
