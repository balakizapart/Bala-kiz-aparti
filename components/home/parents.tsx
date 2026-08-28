import { Blobs, Button, Container, Eyebrow, Reveal, Section, SplitText } from "@/components/ui/primitives";
import { site } from "@/lib/site";
import type { Locale } from "@/lib/i18n";

const copy = {
  tr: {
    eyebrow: "Veliler için",
    title: "Söz verdiğimizden fazlasını söylemeyiz.",
    lead: "Kızınızın güvende olduğunu bilmeniz için, burada tam olarak nasıl işlediğini yazıyoruz.",
    points: [
      {
        t: "Sensörlü anahtarlık",
        d: "Binanın en dış kapısı yalnızca apartta kalan öğrencilere verilen sensörlü anahtarlıkla açılır. Dışarıdan biri kendi başına giremez.",
      },
      {
        t: "7/24 kamera",
        d: "Girişte ve her katta güvenlik kamerası var, kesintisiz kayıt alır.",
      },
      {
        t: "Gündüz görevlisi",
        d: "Sabahtan akşam 18.00'e kadar görevlimiz binada. Bir aksilik olduğunda muhatap belli.",
      },
      {
        t: "Odaya habersiz girilmez",
        d: "Kızınızın odası kendisinindir; haber verilmeden kapısı açılmaz.",
      },
      {
        t: "Önce siz aranırsınız",
        d: "Bir sorun olduğunda ay sonunu beklemez, aynı gün haber veririz.",
      },
    ],
    callTitle: "Aklınıza takılan her şeyi konuşalım.",
    callNote: "Telefonu açmanız yeterli; veliler için ayrı bir randevu gerekmez.",
    call: "Bizi arayın",
  },
  en: {
    eyebrow: "For parents",
    title: "We never promise more than we deliver.",
    lead: "So you know your daughter is safe, here is exactly how things work.",
    points: [
      {
        t: "Sensor key fob",
        d: "The building's outer door opens only with a sensor fob given to residents. Nobody from outside can let themselves in.",
      },
      {
        t: "24/7 cameras",
        d: "Security cameras at the entrance and on every floor, recording without interruption.",
      },
      {
        t: "Daytime staff",
        d: "Our member of staff is in the building from morning until 6 pm, so there is always someone to turn to.",
      },
      {
        t: "No entry without notice",
        d: "Your daughter's room is hers; nobody opens her door without telling her first.",
      },
      {
        t: "You hear from us first",
        d: "If something happens we call you the same day; we do not wait for the end of the month.",
      },
    ],
    callTitle: "Let's talk through anything on your mind.",
    callNote: "Just pick up the phone; parents never need an appointment.",
    call: "Call us",
  },
} as const;

export function Parents({ locale }: { locale: Locale }) {
  const c = copy[locale];

  return (
    <Section className="relative overflow-hidden bg-ink text-white">
      <Blobs tone="violet" className="opacity-25" />

      <Container size="wide" className="relative">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow index="06" className="text-white/50">
                {c.eyebrow}
              </Eyebrow>
            </Reveal>
            <SplitText
              as="h2"
              text={c.title}
              className="mt-6 font-display text-h1 font-bold text-balance"
            />
          </div>
          <Reveal delay={0.12} className="lg:col-span-5">
            <p className="text-lead text-pretty text-white/70">{c.lead}</p>
          </Reveal>
        </div>

        <ul className="mt-14 grid gap-px overflow-hidden rounded-(--radius-md) bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {c.points.map((p, i) => (
            <Reveal as="li" key={p.t} delay={i * 0.06}>
              <div className="h-full bg-ink p-7 transition-colors duration-700 ease-(--ease-out-expo) hover:bg-white/[0.04]">
                <span
                  aria-hidden
                  className="eyebrow grad-text font-black"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-display text-h3 font-bold text-white">{p.t}</h3>
                <p className="mt-3 text-pretty text-sm leading-relaxed text-white/65">{p.d}</p>
              </div>
            </Reveal>
          ))}

          {/* Son hücre: arama çağrısı */}
          <Reveal as="li" delay={c.points.length * 0.06}>
            <div className="flex h-full flex-col justify-between gap-6 grad p-7">
              <div>
                <h3 className="font-display text-h3 font-bold text-white text-balance">
                  {c.callTitle}
                </h3>
                <p className="mt-3 text-sm text-white/85">{c.callNote}</p>
              </div>
              <Button href={`tel:${site.phone}`} variant="light" size="sm" className="self-start">
                {c.call} · {site.phoneDisplay}
              </Button>
            </div>
          </Reveal>
        </ul>
      </Container>
    </Section>
  );
}
