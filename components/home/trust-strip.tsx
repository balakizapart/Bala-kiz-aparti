import { Container, Section, Stat } from "@/components/ui/primitives";
import type { Locale } from "@/lib/i18n";

const copy = {
  tr: [
    { value: 5, suffix: " dk", label: "Anadolu Üniversitesi" },
    { value: 1, suffix: " dk", label: "Tramvay durağı" },
    { value: 2, suffix: "", label: "bina, yan yana sokakta" },
    { value: "7/24", suffix: "", label: "kamera güvenliği" },
  ],
  en: [
    { value: 5, suffix: " min", label: "Anadolu University" },
    { value: 1, suffix: " min", label: "Tram stop" },
    { value: 2, suffix: "", label: "buildings, neighbouring streets" },
    { value: "24/7", suffix: "", label: "camera security" },
  ],
} as const;

export function TrustStrip({ locale }: { locale: Locale }) {
  return (
    <Section className="!py-16 sm:!py-20">
      <Container size="wide">
        <dl className="grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-4">
          {copy[locale].map((s, i) => (
            <Stat key={s.label} value={s.value} suffix={s.suffix} label={s.label} delay={i * 0.08} />
          ))}
        </dl>
      </Container>
    </Section>
  );
}
