import type { Metadata } from "next";
import { CtaBlock } from "@/components/pages/cta-block";
import { MapEmbed } from "@/components/pages/map-embed";
import { PageHeader } from "@/components/pages/page-header";
import { Button, Container, Reveal, Section } from "@/components/ui/primitives";
import { JsonLd, breadcrumbSchema } from "@/components/seo/json-ld";
import { pageMetadata } from "@/lib/seo";
import { site, waLink } from "@/lib/site";
import type { Locale } from "@/lib/i18n";

const copy = {
  tr: {
    eyebrow: "İletişim",
    title: "En hızlı yol: telefonu açıp aramak.",
    lead: "Formla uğraşmak istemiyorsan hiç uğraşma; ara, iki dakikada ne varsa konuşalım. Velilerimiz de aynı numaradan bize ulaşabilir.",
    meta: ["Aynı gün dönüş", "Veliler için de aynı numara", "WhatsApp açık"],
    infoTitle: "İletişim Bilgileri",
    optionsTitle: "İletişim Seçenekleri",
    mapTitle: "Konumumuzu Bulun",
    addressLabel: "Adres",
    phoneLabel: "Telefon",
    emailLabel: "E-posta",
    openMap: "HARİTADA AÇ",
    whatsapp: "WHATSAPP İLE İLETİŞİM",
    call: "TELEFONLA ARA",
    waMessage: "Merhaba, Bala Kız Apartı hakkında bilgi almak istiyorum.",
    hoursTitle: "Ne zaman ulaşabilirsiniz?",
    hours: [
      { d: "Pazartesi – Cuma", h: "09.00 – 20.00" },
      { d: "Cumartesi", h: "10.00 – 18.00" },
      { d: "Pazar", h: "10.00 – 18.00" },
      { d: "Acil durumlar", h: "24 saat" },
    ],
    hoursNote:
      "Acil bir durumda saat kaç olursa olsun arayabilirsiniz; apartta kalan bir öğrencinin ya da velisinin telefonu açılmadan kalmaz.",
    breadcrumbHome: "Ana sayfa",
  },
  en: {
    eyebrow: "Contact",
    title: "The fastest way is simply to call.",
    lead: "If you would rather not fill in a form, don't. Call us and we will cover everything in two minutes. Parents are welcome on the same number.",
    meta: ["Same-day reply", "Same number for parents", "WhatsApp open"],
    infoTitle: "Contact Details",
    optionsTitle: "Ways to Reach Us",
    mapTitle: "Find Our Location",
    addressLabel: "Address",
    phoneLabel: "Phone",
    emailLabel: "Email",
    openMap: "OPEN IN MAPS",
    whatsapp: "MESSAGE ON WHATSAPP",
    call: "CALL US",
    waMessage: "Hello, I would like some information about Bala Kız Apartı.",
    hoursTitle: "When you can reach us",
    hours: [
      { d: "Monday – Friday", h: "09.00 – 20.00" },
      { d: "Saturday", h: "10.00 – 18.00" },
      { d: "Sunday", h: "10.00 – 18.00" },
      { d: "Emergencies", h: "24 hours" },
    ],
    hoursNote:
      "In an emergency you can call at any hour; no call from a resident or her family goes unanswered.",
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
    path: "/iletisim",
    title:
      l === "tr"
        ? "İletişim | Eskişehir Tepebaşı Kız Apartı"
        : "Contact | Bala Girls' Residence, Tepebaşı, Eskişehir",
    description:
      l === "tr"
        ? "Bala Kız Apartı iletişim: +90 541 386 26 00, iletisim@balakizapart.com. Adres: Eskibağlar Mahallesi Akmescit Sokak No:4 ve Aşçı Sokak No:6, Tepebaşı/Eskişehir."
        : "Contact Bala Girls' Residence: +90 541 386 26 00, iletisim@balakizapart.com. Akmescit Sokak No:4 and Aşçı Sokak No:6, Eskibağlar, Tepebaşı, Eskişehir.",
  });
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const l: Locale = locale === "en" ? "en" : "tr";
  const c = copy[l];
  const base = l === "tr" ? "" : "/en";
  const [bala1, bala2] = site.buildings;

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: c.breadcrumbHome, url: base || "/" },
          { name: c.eyebrow, url: `${base}/iletisim` },
        ])}
      />

      <PageHeader index="01" eyebrow={c.eyebrow} title={c.title} lead={c.lead} meta={[...c.meta]} />

      <Section className="pt-0">
        <Container size="wide">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
            {/* ---- Sol sütun: bilgiler + seçenekler ---- */}
            <div className="lg:col-span-5">
              <Reveal>
                <h2 className="font-display text-h2 font-bold">{c.infoTitle}</h2>
              </Reveal>

              {/* Bala 1: tam künye */}
              <Reveal delay={0.08}>
                <div className="mt-8 rounded-(--radius-md) border border-line bg-paper p-6">
                  <div className="flex items-baseline gap-3">
                    <span
                      aria-hidden
                      className="grid h-7 w-7 shrink-0 place-items-center rounded-full grad text-[0.7rem] font-bold text-white"
                    >
                      1
                    </span>
                    <h3 className="font-display text-h3 font-bold">{bala1.name}</h3>
                  </div>

                  <dl className="mt-5 space-y-3 text-sm">
                    <div className="flex flex-wrap gap-x-2">
                      <dt className="font-semibold text-ink">{c.addressLabel}:</dt>
                      <dd className="text-ink-soft">
                        {bala1.street} {bala1.district}/{bala1.city}
                      </dd>
                    </div>
                    <div className="flex flex-wrap gap-x-2">
                      <dt className="font-semibold text-ink">{c.phoneLabel}:</dt>
                      <dd>
                        <a
                          href={`tel:${site.phone}`}
                          className="link-underline font-medium text-pine"
                        >
                          {site.phoneDisplay}
                        </a>
                      </dd>
                    </div>
                    <div className="flex flex-wrap gap-x-2">
                      <dt className="font-semibold text-ink">{c.emailLabel}:</dt>
                      <dd>
                        <a
                          href={`mailto:${site.email}`}
                          className="link-underline break-all font-medium text-pine"
                        >
                          {site.email}
                        </a>
                      </dd>
                    </div>
                    <div className="flex flex-wrap gap-x-2">
                      <dt className="font-semibold text-ink">{c.emailLabel}:</dt>
                      <dd>
                        <a
                          href={`mailto:${site.email2}`}
                          className="link-underline break-all font-medium text-pine"
                        >
                          {site.email2}
                        </a>
                      </dd>
                    </div>
                  </dl>
                </div>
              </Reveal>

              {/* Bala 2: adres */}
              <Reveal delay={0.14}>
                <div className="mt-4 rounded-(--radius-md) border border-line bg-paper p-6">
                  <div className="flex items-baseline gap-3">
                    <span
                      aria-hidden
                      className="grid h-7 w-7 shrink-0 place-items-center rounded-full grad text-[0.7rem] font-bold text-white"
                    >
                      2
                    </span>
                    <h3 className="font-display text-h3 font-bold">{bala2.name}</h3>
                  </div>
                  <dl className="mt-5 text-sm">
                    <div className="flex flex-wrap gap-x-2">
                      <dt className="font-semibold text-ink">{c.addressLabel}:</dt>
                      <dd className="text-ink-soft">
                        {bala2.street} {bala2.district}/{bala2.city}
                      </dd>
                    </div>
                  </dl>
                </div>
              </Reveal>

              {/* İletişim seçenekleri: ekran görüntüsündeki üç buton */}
              <Reveal delay={0.2}>
                <h2 className="mt-12 font-display text-h2 font-bold">{c.optionsTitle}</h2>
                <div className="mt-6 space-y-3">
                  <Button
                    href={bala1.maps}
                    variant="outline"
                    size="lg"
                    className="w-full tracking-wide"
                    magnetic={false}
                  >
                    {c.openMap}
                  </Button>
                  <Button
                    href={waLink(c.waMessage)}
                    variant="whatsapp"
                    size="lg"
                    className="w-full tracking-wide"
                    magnetic={false}
                  >
                    {c.whatsapp}
                  </Button>
                  <Button
                    href={`tel:${site.phone}`}
                    size="lg"
                    className="w-full tracking-wide"
                    magnetic={false}
                  >
                    {c.call}
                  </Button>
                </div>
              </Reveal>
            </div>

            {/* ---- Sağ sütun: harita ---- */}
            <div className="lg:col-span-7">
              <Reveal delay={0.1}>
                <h2 className="font-display text-h2 font-bold">{c.mapTitle}</h2>
                <MapEmbed locale={l} className="mt-8" />
              </Reveal>

              {/* Çalışma saatleri */}
              <Reveal delay={0.16}>
                <h2 className="mt-14 font-display text-h2 font-bold">{c.hoursTitle}</h2>
                <dl className="mt-6 border-t border-line">
                  {c.hours.map((h) => (
                    <div
                      key={h.d}
                      className="flex items-baseline justify-between gap-6 border-b border-line py-4"
                    >
                      <dt className="text-ink-soft">{h.d}</dt>
                      <dd className="font-display text-h3 font-semibold tabular-nums">{h.h}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-5 max-w-prose text-pretty text-sm text-ink-soft">{c.hoursNote}</p>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      <CtaBlock locale={l} />
    </>
  );
}
