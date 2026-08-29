import { Container, Eyebrow, Reveal, Section, SplitText } from "@/components/ui/primitives";
import { MapEmbed } from "@/components/pages/map-embed";
import { site } from "@/lib/site";
import type { Locale } from "@/lib/i18n";

const copy = {
  tr: {
    eyebrow: "Konum",
    title: "Şehrin tam ortasında, yürüme mesafesinde her şey.",
    lead: "İki bina da Eskibağlar Mahallesi'nde, yan yana sokaklarda. Espark tam karşımızda; tramvayla şehrin her yerine aktarmasız gidiliyor.",
    addresses: "Adreslerimiz",
    nearby: "Yürüme mesafesi",
    mapTitle: "Konumumuzu bulun",
  },
  en: {
    eyebrow: "Location",
    title: "Dead centre of the city, everything within walking distance.",
    lead: "Both buildings are in Eskibağlar, on neighbouring streets. Espark is right across from us, and the tram reaches the whole city without a transfer.",
    addresses: "Our addresses",
    nearby: "Walking distance",
    mapTitle: "Find our location",
  },
} as const;

export function Location({ locale }: { locale: Locale }) {
  const c = copy[locale];

  return (
    <Section id="konum" className="relative overflow-hidden">
      <Container size="wide">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow index="05">{c.eyebrow}</Eyebrow>
            </Reveal>
            <SplitText
              as="h2"
              text={c.title}
              gradientLastWords={2}
              className="mt-6 font-display text-h1 font-bold text-balance"
            />
          </div>
          <Reveal delay={0.12} className="lg:col-span-5">
            <p className="text-lead text-pretty text-ink-soft">{c.lead}</p>
          </Reveal>
        </div>

        {/* --- Adresler + mesafeler --- */}
        <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-14">
          {/* İki adres */}
          <div className="lg:col-span-5">
            <Reveal>
              <h3 className="eyebrow">{c.addresses}</h3>
            </Reveal>
            <div className="mt-5 space-y-4">
              {site.buildings.map((b, i) => (
                <Reveal key={b.id} delay={0.08 * i}>
                  <div className="group ring-grad rounded-(--radius-md) border border-line bg-paper p-6 transition-shadow duration-700 ease-(--ease-out-expo) hover:shadow-(--shadow-lift)">
                    <div className="flex items-baseline gap-3">
                      <span
                        aria-hidden
                        className="grid h-7 w-7 shrink-0 place-items-center rounded-full grad text-[0.7rem] font-bold text-white"
                      >
                        {i + 1}
                      </span>
                      <h4 className="font-display text-h3 font-bold">{b.name}</h4>
                    </div>
                    <address className="mt-3 text-sm not-italic leading-relaxed text-ink-soft">
                      {b.street}
                      <br />
                      {b.postalCode} {b.district}/{b.city}
                    </address>
                    <a
                      href={b.directions}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-underline mt-3 inline-block text-sm font-semibold text-gold"
                    >
                      {locale === "tr" ? "Yol tarifi al" : "Get directions"} →
                    </a>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Mesafeler */}
          <div className="lg:col-span-7">
            <Reveal>
              <h3 className="eyebrow">{c.nearby}</h3>
            </Reveal>
            <ul className="mt-5 border-t border-line">
              {site.proximity.map((p, i) => (
                <Reveal as="li" key={p.key} delay={i * 0.05}>
                  <div className="flex items-baseline gap-4 border-b border-line py-5 sm:gap-8">
                    <span className="w-16 shrink-0 font-display text-h3 font-bold tabular-nums">
                      <span className="grad-text">{p.minutes}</span>
                      <span className="text-sm text-muted"> {locale === "tr" ? "dk" : "min"}</span>
                    </span>
                    <span className="flex-1">
                      <span className="block font-semibold">{locale === "tr" ? p.tr : p.en}</span>
                      <span className="block text-sm text-muted">
                        {locale === "tr" ? p.noteTr : p.noteEn}
                      </span>
                    </span>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>

        {/* --- Büyük harita --- */}
        <Reveal delay={0.1} className="mt-16 sm:mt-20">
          <h3 className="font-display text-h2 font-bold text-balance">{c.mapTitle}</h3>
          <MapEmbed locale={locale} className="mt-7" />
        </Reveal>
      </Container>
    </Section>
  );
}
