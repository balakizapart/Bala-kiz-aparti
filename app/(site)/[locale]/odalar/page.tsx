import type { Metadata } from "next";
import { RoomsShowcase } from "@/components/home/rooms-showcase";
import { LifeStrip } from "@/components/home/life-strip";
import { Amenities } from "@/components/home/amenities";
import { CtaBlock } from "@/components/pages/cta-block";
import { PageHeader } from "@/components/pages/page-header";
import { Button, Container, Reveal, Section } from "@/components/ui/primitives";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import type { Locale } from "@/lib/i18n";

const copy = {
  tr: {
    eyebrow: "Odalar",
    title: "İki oda tipi, tek bir söz: burası bir ev.",
    lead: "Tek kişilik ve iki kişilik odalar. İkisi de aynı daire kurulumunda: mutfak, banyo, ortak alan ve çamaşır makinesi dairenin içinde.",
    meta: ["Tek kişilik", "İki kişilik", "Tamamen eşyalı", "Espark karşısı"],
    priceTitle: "Fiyatı telefonda konuşuyoruz.",
    priceText:
      "Fiyat dönem başında güncelleniyor ve odaya göre değişiyor. Aradığınızda o günün net rakamını, depozitoyu ve varsa kardeş indirimini açık açık konuşuruz; siteye yazıp sizi eski bir rakamla yanıltmak istemiyoruz.",
    call: "Fiyat için arayın",
  },
  en: {
    eyebrow: "Rooms",
    title: "Two room types, one promise: this is a home.",
    lead: "Single and twin rooms. Both sit in the same flat layout: kitchen, bathroom, living area and washing machine inside.",
    meta: ["Single rooms", "Twin rooms", "Fully furnished", "Across from Espark"],
    priceTitle: "We talk about price on the phone.",
    priceText:
      "Prices are updated at the start of each term and vary by room. Call us and we will give you the exact figure for the day, the deposit and any sibling discount. We would rather not leave an outdated number on the website.",
    call: "Call for pricing",
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
    path: "/odalar",
    title:
      l === "tr"
        ? "Odalar | Eskişehir Kız Öğrenci Apartı Tek ve İki Kişilik Oda"
        : "Rooms | Single and Twin Rooms at Our Eskişehir Residence",
    description:
      l === "tr"
        ? "Eskişehir Tepebaşı kız öğrenci apartı oda tipleri: tek kişilik ve iki kişilik eşyalı odalar. Her dairede mutfak, banyo, ortak alan ve çamaşır makinesi. İnternet, su, elektrik ve doğalgaz dahil."
        : "Room types at our girls' residence in Tepebaşı, Eskişehir: furnished single and twin rooms. Kitchen, bathroom, living area and washing machine in every flat. Internet, water, electricity and gas included.",
  });
}

export default async function RoomsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const l: Locale = locale === "en" ? "en" : "tr";
  const c = copy[l];

  return (
    <>
      <PageHeader index="01" eyebrow={c.eyebrow} title={c.title} lead={c.lead} meta={[...c.meta]} />
      <RoomsShowcase locale={l} />
      <Amenities locale={l} />
      <LifeStrip locale={l} />

      {/* Fiyat politikası: rakam bilinçli olarak yok. */}
      <Section className="pt-0">
        <Container>
          <Reveal>
            <div className="ring-grad group relative overflow-hidden rounded-(--radius-lg) border border-line bg-paper p-8 shadow-(--shadow-soft) sm:p-12">
              <span
                aria-hidden
                className="pointer-events-none absolute -bottom-20 -left-20 h-56 w-56 rounded-full grad opacity-15 blur-3xl"
              />
              <div className="relative">
                <h2 className="font-display text-h2 font-bold text-balance">{c.priceTitle}</h2>
                <p className="mt-5 max-w-2xl text-pretty text-ink-soft">{c.priceText}</p>
                <div className="mt-8">
                  <Button href={`tel:${site.phone}`} size="lg">
                    {c.call} · {site.phoneDisplay}
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      <CtaBlock locale={l} />
    </>
  );
}
