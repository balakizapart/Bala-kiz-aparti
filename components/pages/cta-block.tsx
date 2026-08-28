import { Button, Container, Reveal, Section, SplitText } from "@/components/ui/primitives";
import { localePath, type Locale } from "@/lib/i18n";
import { site, waLink } from "@/lib/site";

const copy = {
  tr: {
    title: "Odanı görmek için haber vermen yeterli.",
    lead: "Randevusuz da gelebilirsin; ama arayıp gelirsen boş odalar hazır olur.",
    reserve: "Ön Kayıt",
    whatsapp: "WhatsApp'tan Yaz",
    call: "Hemen Ara",
    waMessage: "Merhaba, Bala Kız Apartı hakkında bilgi almak istiyorum.",
  },
  en: {
    title: "Just let us know and come see your room.",
    lead: "You can drop by without an appointment, but if you call first the free rooms will be ready.",
    reserve: "Book a Room",
    whatsapp: "Message on WhatsApp",
    call: "Call Now",
    waMessage: "Hello, I would like some information about Bala Kız Apartı.",
  },
} as const;

/** İç sayfaların kapanış çağrısı. */
export function CtaBlock({ locale }: { locale: Locale }) {
  const c = copy[locale];

  return (
    <Section className="relative overflow-hidden">
      <Container>
        <div className="ring-grad relative overflow-hidden rounded-(--radius-lg) border border-line bg-paper p-8 shadow-(--shadow-soft) sm:p-14">
          <span
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full grad opacity-20 blur-3xl"
          />
          <div className="relative">
            <SplitText
              as="h2"
              text={c.title}
              gradientLastWords={2}
              className="max-w-3xl font-display text-h2 font-bold text-balance"
            />
            <Reveal delay={0.1}>
              <p className="mt-5 max-w-xl text-pretty text-ink-soft">{c.lead}</p>
            </Reveal>
            <Reveal delay={0.16}>
              <div className="mt-9 flex flex-wrap gap-3">
                <Button href={localePath(locale, "/on-kayit")} size="lg">
                  {c.reserve}
                </Button>
                <Button href={waLink(c.waMessage)} variant="whatsapp" size="lg">
                  {c.whatsapp}
                </Button>
                <Button href={`tel:${site.phone}`} variant="outline" size="lg">
                  {c.call} · {site.phoneDisplay}
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
