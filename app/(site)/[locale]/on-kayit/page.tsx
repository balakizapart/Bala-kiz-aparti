import type { Metadata } from "next";
import { InquiryForm } from "@/components/pages/inquiry-form";
import { PageHeader } from "@/components/pages/page-header";
import { Container, Reveal, Section } from "@/components/ui/primitives";
import { pageMetadata } from "@/lib/seo";
import type { Locale } from "@/lib/i18n";

const copy = {
  tr: {
    eyebrow: "Ön Kayıt",
    title: "Bir tanışma, henüz bir karar değil.",
    lead: "Adını ve telefonunu bırak, gerisini konuşarak halledelim. Ön kayıt seni bir şeye bağlamaz; sadece sana en uygun odayı ayırabilmemiz için bir başlangıç.",
    meta: ["Bir dakikanı alır", "Aynı gün dönüş", "İstediğin an vazgeçebilirsin"],
    stepsTitle: "Nasıl işliyor?",
    steps: [
      { t: "Formu doldur", d: "Ad, telefon ve istersen aradığın oda." },
      { t: "WhatsApp açılır", d: "Bilgilerin hazır yazılmış gelir; okuyup gönderirsin." },
      { t: "Seni arayalım", d: "Genellikle aynı gün, en geç ertesi iş günü döneriz." },
      { t: "Gel, odanı gör", d: "Uygun bir gün ayarlayıp apartı birlikte gezelim." },
    ],
  },
  en: {
    eyebrow: "Booking",
    title: "An introduction, not yet a decision.",
    lead: "Leave your name and phone number and we will sort out the rest by talking. A booking request commits you to nothing; it simply lets us hold the room that suits you best.",
    meta: ["Takes a minute", "Same-day reply", "Change your mind any time"],
    stepsTitle: "How it works",
    steps: [
      { t: "Fill in the form", d: "Your name, phone and, if you like, the room you have in mind." },
      { t: "WhatsApp opens", d: "Your details arrive already written; read it and send." },
      { t: "We call you", d: "Usually the same day, at the latest the next working day." },
      { t: "Come and see", d: "We arrange a day and walk through the residence together." },
    ],
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
    path: "/on-kayit",
    title:
      l === "tr" ? "Ön Kayıt | Eskişehir Kız Öğrenci Apartı" : "Book a Room | Bala Girls' Residence",
    description:
      l === "tr"
        ? "Eskişehir Tepebaşı kız öğrenci apartı ön kayıt formu. Adınızı ve telefonunuzu bırakın, aynı gün içinde sizi arayalım. Ön kayıt hiçbir bağlayıcılık taşımaz."
        : "Booking form for our girls' student residence in Tepebaşı, Eskişehir. Leave your name and number and we will call you the same day. A booking request is not binding.",
  });
}

export default async function BookingPage({
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

      <Section className="pt-0">
        <Container size="wide">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <InquiryForm locale={l} />
            </div>

            <aside className="lg:col-span-4 lg:col-start-9">
              <Reveal>
                <h2 className="eyebrow">{c.stepsTitle}</h2>
              </Reveal>
              <ol className="mt-5 border-t border-line">
                {c.steps.map((s, i) => (
                  <Reveal as="li" key={s.t} delay={i * 0.07}>
                    <div className="flex gap-4 border-b border-line py-5">
                      <span
                        aria-hidden
                        className="grid h-8 w-8 shrink-0 place-items-center rounded-full grad text-xs font-bold text-white"
                      >
                        {i + 1}
                      </span>
                      <span>
                        <span className="block font-display text-h3 font-semibold">{s.t}</span>
                        <span className="mt-1 block text-sm text-pretty text-ink-soft">{s.d}</span>
                      </span>
                    </div>
                  </Reveal>
                ))}
              </ol>
            </aside>
          </div>
        </Container>
      </Section>
    </>
  );
}
