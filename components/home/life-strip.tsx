import Link from "next/link";
import { Photo } from "@/components/ui/photo";
import {
  Container,
  Eyebrow,
  Parallax,
  Reveal,
  Section,
  SplitText,
} from "@/components/ui/primitives";
import { included } from "@/lib/rooms";
import { localePath, type Locale } from "@/lib/i18n";
import { site } from "@/lib/site";

const copy = {
  tr: {
    eyebrow: "Daire",
    title: "Odanın dışı da senin evin.",
    lead: "Her daire kendi içinde bir ev: mutfak, banyo, ortak alan ve çamaşır makinesi içeride. Kimseyle sıraya girmiyorsun.",
    gallery: "Galeriyi gör",
    includedTitle: "Kirada ne var?",
    includedNote: "Ay sonunda ayrı fatura çıkmaz; hepsi aylık ücretin içinde.",
    photos: ["Dairenin mutfağı, beyaz eşyalarıyla", "Daire banyosu"],
  },
  en: {
    eyebrow: "The flat",
    title: "Beyond your room, still your home.",
    lead: "Every flat is a home in itself: kitchen, bathroom, living area and washing machine inside. You never wait in line for anything.",
    gallery: "See the gallery",
    includedTitle: "What's in the rent?",
    includedNote: "No separate bills at the end of the month; it is all in the monthly fee.",
    photos: ["The flat's kitchen with white goods", "Flat bathroom"],
  },
} as const;

const RATIOS = ["3/2", "3/2"] as const;

/* Daire bolumundeki iki fotograf: mutfak ve banyo. */
const PHOTOS = ["/images/mutfak-5.jpg", "/images/banyo-1.jpg"] as const;

export function LifeStrip({ locale }: { locale: Locale }) {
  const c = copy[locale];

  return (
    <Section className="relative overflow-hidden bg-gold-tint/35">
      <Container size="wide">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow index="04">{c.eyebrow}</Eyebrow>
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
            <Link
              href={localePath(locale, "/galeri")}
              className="link-underline mt-4 inline-block text-sm font-semibold text-gold"
            >
              {c.gallery} →
            </Link>
          </Reveal>
        </div>

        {/* Fotoğraf şeridi: kaydırdıkça hafif kayan sütunlar */}
        <div className="mt-14 grid gap-4 sm:grid-cols-2">
          {c.photos.map((p, i) => (
            <Parallax key={p} amount={i % 2 === 0 ? 22 : -22}>
              <Reveal delay={i * 0.06}>
                <Photo
                  src={PHOTOS[i]}
                  alt={`${p}, ${site.name}`}
                  caption={p}
                  ratio={RATIOS[i]}
                  tone={i}
                  sizes="(max-width: 640px) 100vw, 46vw"
                  className="shadow-(--shadow-soft)"
                />
              </Reveal>
            </Parallax>
          ))}
        </div>

        {/* Kirada ne var */}
        <div className="mt-20 grid gap-10 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-4">
            <h3 className="font-display text-h2 font-bold text-balance">{c.includedTitle}</h3>
            <p className="mt-4 max-w-prose text-pretty text-ink-soft">{c.includedNote}</p>
          </Reveal>

          <ul className="lg:col-span-8 lg:col-start-5">
            {included[locale].map((item, i) => (
              <Reveal as="li" key={item.t} delay={i * 0.05}>
                <div className="flex flex-col gap-1 border-b border-line py-5 sm:flex-row sm:items-baseline sm:gap-8">
                  <span className="eyebrow shrink-0 grad-text font-black sm:w-10">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-h3 font-semibold sm:w-56 sm:shrink-0">
                    {item.t}
                  </span>
                  <span className="text-sm text-pretty text-ink-soft">{item.d}</span>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
