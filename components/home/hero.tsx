"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Photo } from "@/components/ui/photo";
import { Blobs, Button, Container, Marquee } from "@/components/ui/primitives";
import { localePath, type Locale } from "@/lib/i18n";
import { site } from "@/lib/site";

const copy = {
  tr: {
    badge: "Eskişehir · Tepebaşı · Espark karşısı",
    line1: "Kendine ait",
    line2: "bir oda,",
    line3: "şehrin tam",
    line4: "merkezinde.",
    lead: "Tek ve iki kişilik eşyalı odalar. Her dairede mutfak, banyo ve çamaşır makinesi. Tramvaya bir, Anadolu Üniversitesi'ne beş dakika.",
    seeRooms: "Odaları Gör",
    reserve: "Ön Kayıt",
    scroll: "Aşağı kaydır",
    // Hero kolajı: bina girişi (büyük kare), oda, mutfak
    photos: [
      "Bina girişi",
      "Öğrenci odası",
      "Dairenin mutfağı",
    ],
    strip: [
      "Espark tam karşımızda",
      "Tramvaya 1 dakika",
      "Anadolu Üniversitesi 5 dakika",
      "7/24 kamera güvenliği",
      "Her dairede çamaşır makinesi",
      "Su · elektrik · doğalgaz · internet dahil",
    ],
  },
  en: {
    badge: "Eskişehir · Tepebaşı · Across from Espark",
    line1: "A room",
    line2: "of your own,",
    line3: "in the heart",
    line4: "of the city.",
    lead: "Furnished single and twin rooms. A kitchen, bathroom and washing machine in every flat. One minute to the tram, five to Anadolu University.",
    seeRooms: "See the Rooms",
    reserve: "Book a Room",
    scroll: "Scroll down",
    photos: [
      "Building entrance",
      "A student room",
      "The flat's kitchen",
    ],
    strip: [
      "Espark right across the street",
      "1 minute to the tram",
      "5 minutes to Anadolu University",
      "24/7 camera security",
      "A washing machine in every flat",
      "Water · electricity · gas · internet included",
    ],
  },
} as const;

/* Hero kolajindaki uc fotograf. Sira: bina girisi (buyuk kare), oda, mutfak. */
const PHOTOS = [
  "/images/bina-2-giris.jpg",
  "/images/tek-kisilik-best-1.jpg",
  "/images/mutfak-1.jpg",
] as const;

export function Hero({ locale }: { locale: Locale }) {
  const c = copy[locale];
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const yA = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const yB = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const yC = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const lines = [c.line1, c.line2, c.line3, c.line4];

  return (
    <section ref={ref} className="relative overflow-hidden pb-16 pt-10 sm:pb-24 sm:pt-16">
      <Blobs tone="mixed" />

      <Container size="wide" className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
          {/* --- Metin --- */}
          <div className="lg:col-span-6 xl:col-span-5">
            <motion.p
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 rounded-(--radius-pill) border border-line bg-paper/70 px-4 py-2 text-xs font-semibold text-ink-soft backdrop-blur"
            >
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-mint" />
              {c.badge}
            </motion.p>

            <h1 className="mt-7 font-display text-h1 font-extrabold text-balance">
              <span className="sr-only">{lines.join(" ")}</span>
              {lines.map((line, i) => (
                <span key={i} aria-hidden className="block overflow-hidden pb-[0.08em]">
                  <motion.span
                    className={i >= 2 ? "grad-text inline-block" : "inline-block"}
                    initial={reduce ? false : { y: "110%" }}
                    animate={{ y: "0%" }}
                    transition={{
                      duration: 1,
                      delay: 0.1 + i * 0.09,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              initial={reduce ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="mt-7 max-w-lg text-lead text-pretty text-ink-soft"
            >
              {c.lead}
            </motion.p>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.62, ease: [0.16, 1, 0.3, 1] }}
              className="mt-9 flex flex-wrap gap-3"
            >
              <Button href={localePath(locale, "/odalar")} size="lg">
                {c.seeRooms}
              </Button>
              <Button href={localePath(locale, "/on-kayit")} variant="outline" size="lg">
                {c.reserve}
              </Button>
            </motion.div>

            <motion.p
              style={reduce ? undefined : { opacity: fade }}
              className="eyebrow mt-12 hidden items-center gap-3 lg:flex"
            >
              <span aria-hidden className="grid h-9 w-9 place-items-center rounded-full border border-line">
                <motion.svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  animate={reduce ? undefined : { y: [0, 4, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                >
                  <path d="M12 5v14M6 13l6 6 6-6" />
                </motion.svg>
              </span>
              {c.scroll}
            </motion.p>
          </div>

          {/* --- Fotoğraf kolajı --- */}
          <div className="lg:col-span-6 lg:col-start-7 xl:col-span-7">
            <div className="relative grid grid-cols-12 gap-3 sm:gap-4">
              <motion.div
                style={reduce ? undefined : { y: yA }}
                initial={reduce ? false : { opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="col-span-7 row-span-2"
              >
                <Photo
                  src={PHOTOS[0]}
                  alt={`${c.photos[0]}, ${site.name}`}
                  caption={c.photos[0]}
                  ratio="4/5"
                  tone={0}
                  priority
                  sizes="(max-width: 1024px) 58vw, 34vw"
                  className="shadow-(--shadow-lift)"
                />
              </motion.div>

              <motion.div
                style={reduce ? undefined : { y: yC }}
                initial={reduce ? false : { opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
                className="col-span-5 mt-8"
              >
                <Photo
                  src={PHOTOS[1]}
                  alt={`${c.photos[1]}, ${site.name}`}
                  caption={c.photos[1]}
                  ratio="1/1"
                  tone={1}
                  sizes="(max-width: 1024px) 40vw, 24vw"
                  className="shadow-(--shadow-lift)"
                />
              </motion.div>

              <motion.div
                style={reduce ? undefined : { y: yB }}
                initial={reduce ? false : { opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="col-span-5"
              >
                <Photo
                  src={PHOTOS[2]}
                  alt={`${c.photos[2]}, ${site.name}`}
                  caption={c.photos[2]}
                  ratio="3/4"
                  tone={2}
                  sizes="(max-width: 1024px) 40vw, 24vw"
                  className="shadow-(--shadow-lift)"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </Container>

      {/* --- Kayan bilgi şeridi --- */}
      <div className="relative mt-16 border-y border-line bg-paper/60 py-4 backdrop-blur sm:mt-24">
        <Marquee
          duration={38}
          items={c.strip.map((s) => (
            <span key={s} className="whitespace-nowrap text-sm font-semibold text-ink-soft">
              {s}
            </span>
          ))}
        />
      </div>
    </section>
  );
}
