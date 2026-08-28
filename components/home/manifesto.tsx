import { Container, Eyebrow, Reveal, Section, SplitText } from "@/components/ui/primitives";
import type { Locale } from "@/lib/i18n";

const copy = {
  tr: {
    eyebrow: "Manifesto",
    title: "Bir apart değil, bir ev.",
    body: "Ailesinden ilk kez ayrılan biri için burası sadece bir oda değil; gece geç dönüldüğünde açık duran kapı, sınav haftasında sessizleşen koridor, hasta olunduğunda kapıyı çalan komşudur.",
    body2: "Kuralları kimseyi kısıtlamak için değil, herkesin içi rahat etsin diye koyuyoruz.",
    sign: "Bala Kız Apartı",
  },
  en: {
    eyebrow: "Manifesto",
    title: "Not a residence, a home.",
    body: "For someone leaving home for the first time this is more than a room: it is the door left open when you come back late, the corridor that goes quiet during exam week, the neighbour who knocks when you are ill.",
    body2: "Our rules are not there to restrict anyone; they are there so everyone can rest easy.",
    sign: "Bala Girls' Residence",
  },
} as const;

export function Manifesto({ locale }: { locale: Locale }) {
  const c = copy[locale];

  return (
    <Section className="relative overflow-hidden bg-sand/60">
      <Container>
        <Reveal>
          <Eyebrow index="01">{c.eyebrow}</Eyebrow>
        </Reveal>

        <SplitText
          as="h2"
          text={c.title}
          gradientLastWords={2}
          className="mt-8 max-w-4xl font-display text-h1 font-bold text-balance"
        />

        <div className="mt-10 grid gap-8 lg:grid-cols-12">
          <Reveal delay={0.1} className="lg:col-span-7">
            <p className="text-lead text-pretty text-ink-soft">{c.body}</p>
          </Reveal>
          <Reveal delay={0.18} className="lg:col-span-5">
            <p className="text-lead text-pretty text-ink-soft">{c.body2}</p>
            <p className="eyebrow mt-8">{c.sign}</p>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
