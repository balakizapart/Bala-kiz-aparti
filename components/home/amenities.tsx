"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";
import { AmenityIcon } from "@/components/ui/amenity-icon";
import { Container, Eyebrow, Reveal, Section, SplitText } from "@/components/ui/primitives";
import { flatAmenities, roomAmenities, type Amenity } from "@/lib/amenities";
import type { Locale } from "@/lib/i18n";

const copy = {
  tr: {
    eyebrow: "Neler var",
    title: "Her şey hazır, sen sadece gel.",
    lead: "Ay sonunda ayrı fatura çıkmaz, eksik eşya listesi olmaz. Aşağıdakilerin hepsi kiraya dahil.",
    flat: "Dairede",
    room: "Odanda",
  },
  en: {
    eyebrow: "What you get",
    title: "Everything is ready. Just arrive.",
    lead: "No separate bills at the end of the month, no list of things to buy. Everything below is included in the rent.",
    flat: "In the flat",
    room: "In your room",
  },
} as const;

/** Tek olanak kartı: sırayla açılır, hover'da ikon canlanır. */
function Card({ item, locale, i }: { item: Amenity; locale: Locale; i: number }) {
  const reduce = useReducedMotion();

  return (
    <motion.li
      variants={{
        hidden: reduce ? { opacity: 1 } : { opacity: 0, y: 24, scale: 0.94 },
        show: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: 0.6, delay: i * 0.045, ease: [0.16, 1, 0.3, 1] },
        },
      }}
      className="group"
    >
      <div
        className="flex h-full items-start gap-4 rounded-(--radius-md) border border-line bg-paper p-4
                   transition-[transform,box-shadow,border-color] duration-500 ease-(--ease-out-expo)
                   hover:-translate-y-1 hover:border-transparent hover:shadow-(--shadow-lift) sm:p-5"
      >
        <span
          className="grid h-12 w-12 shrink-0 place-items-center rounded-(--radius-sm)
                     transition-transform duration-500 ease-(--ease-spring)
                     group-hover:scale-110 group-hover:-rotate-6"
          style={{ backgroundColor: item.tint, color: item.ink }}
        >
          <AmenityIcon name={item.icon} />
        </span>
        <span className="min-w-0">
          <span className="block font-display text-[0.9375rem] font-bold leading-tight text-ink">
            {item.label[locale]}
          </span>
          <span className="mt-1 block text-sm leading-snug text-ink-soft">
            {item.note[locale]}
          </span>
        </span>
      </div>
    </motion.li>
  );
}

function Grid({
  items,
  locale,
  label,
  index,
}: {
  items: Amenity[];
  locale: Locale;
  label: string;
  index: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });

  return (
    <div ref={ref}>
      <Reveal>
        <Eyebrow index={index}>{label}</Eyebrow>
      </Reveal>
      <motion.ul
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        {items.map((item, i) => (
          <Card key={item.icon + item.label.tr} item={item} locale={locale} i={i} />
        ))}
      </motion.ul>
    </div>
  );
}

export function Amenities({ locale }: { locale: Locale }) {
  const c = copy[locale];

  return (
    <Section className="relative overflow-hidden">
      <Container size="wide">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow index="03">{c.eyebrow}</Eyebrow>
            </Reveal>
            <SplitText
              as="h2"
              text={c.title}
              gradientLastWords={3}
              className="mt-6 font-display text-h1 font-bold text-balance"
            />
          </div>
          <Reveal delay={0.12} className="lg:col-span-5">
            <p className="text-lead text-pretty text-ink-soft">{c.lead}</p>
          </Reveal>
        </div>

        <div className="mt-14 space-y-12">
          <Grid items={flatAmenities} locale={locale} label={c.flat} index="→" />
          <Grid items={roomAmenities} locale={locale} label={c.room} index="→" />
        </div>
      </Container>
    </Section>
  );
}
