import { Blobs, Button, Container, Reveal, Section, SplitText } from "@/components/ui/primitives";
import { localePath, type Locale } from "@/lib/i18n";
import { site, waLink } from "@/lib/site";

const copy = {
  tr: {
    title: "Gel, odanı gör.",
    lead: "Haber verip gelin; sizi karşılayacak birini ve gezebileceğiniz boş odaları hazır bulun. Ailenizle birlikte gelmenizi özellikle isteriz.",
    reserve: "Ön Kayıt Formu",
    call: "Hemen Ara",
    whatsapp: "WhatsApp'tan Yaz",
    waMessage: "Merhaba, Bala Kız Apartı'nı gezmek istiyorum. Uygun bir gün ayarlayabilir miyiz?",
  },
  en: {
    title: "Come and see your room.",
    lead: "Let us know before you come and we will make sure someone meets you and the free rooms are ready to see. We especially encourage you to come with your family.",
    reserve: "Booking Form",
    call: "Call Now",
    whatsapp: "Message on WhatsApp",
    waMessage: "Hello, I would like to visit Bala Kız Apartı. Could we arrange a day?",
  },
} as const;

export function ClosingCta({ locale }: { locale: Locale }) {
  const c = copy[locale];

  return (
    <Section className="relative overflow-hidden">
      <Blobs tone="pink" />
      <Container className="relative text-center">
        <SplitText
          as="h2"
          text={c.title}
          gradientLastWords={2}
          className="mx-auto max-w-4xl font-display text-display font-extrabold text-balance"
        />
        <Reveal delay={0.12}>
          <p className="mx-auto mt-8 max-w-2xl text-lead text-pretty text-ink-soft">{c.lead}</p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
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
      </Container>
    </Section>
  );
}
