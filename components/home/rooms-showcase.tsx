import { Photo, VideoBlock } from "@/components/ui/photo";
import {
  Button,
  Container,
  Eyebrow,
  Parallax,
  Reveal,
  Section,
  SplitText,
  TiltCard,
} from "@/components/ui/primitives";
import { localePath, type Locale } from "@/lib/i18n";
import { roomTypes } from "@/lib/rooms";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const copy = {
  tr: {
    eyebrow: "Odalar",
    title: "Tek kişilik ya da iki kişilik.",
    lead: "İki oda tipi de aynı daire kurulumunda: mutfak, banyo, ortak alan ve çamaşır makinesi dairenin içinde.",
    inRoom: "Odada",
    inFlat: "Dairede",
    gallery: "Fotoğrafları gör",
    ask: "Fiyat için arayın",
    videoLabel: "Apart tanıtım videosu",
    videoTitle: "Gezmeden önce bir fikir.",
    videoNote:
      "Odaları ve daireyi gezerken çektiğimiz kısa video. Yine de en doğrusu gelip görmek; haber verin, kapımız açık.",
  },
  en: {
    eyebrow: "Rooms",
    title: "Single or twin.",
    lead: "Both room types sit in the same flat layout: kitchen, bathroom, living area and washing machine inside.",
    inRoom: "In the room",
    inFlat: "In the flat",
    gallery: "See the photos",
    ask: "Call for pricing",
    videoLabel: "Residence tour video",
    videoTitle: "An idea before you visit.",
    videoNote:
      "A short walk-through of the rooms and the flat. Still, nothing beats seeing it; let us know and the door is open.",
  },
} as const;

export function RoomsShowcase({ locale }: { locale: Locale }) {
  const c = copy[locale];

  return (
    <Section id="odalar" className="relative overflow-hidden">
      <Container size="wide">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow index="02">{c.eyebrow}</Eyebrow>
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
      </Container>

      {/* --- Oda tipleri --- */}
      <div className="mt-16 space-y-20 sm:mt-24 sm:space-y-28">
        {roomTypes.map((r, i) => {
          const flip = i % 2 === 1;
          return (
            <Container size="wide" key={r.slug}>
              <article className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
                {/* Fotoğraflar */}
                <div className={cn("lg:col-span-7", flip && "lg:order-2 lg:col-start-6")}>
                  <div className="grid grid-cols-12 gap-3 sm:gap-4">
                    <Parallax amount={26} className="col-span-8">
                      <TiltCard>
                        <Photo
                          alt={`${r.name[locale]}, ${r.photos[0].caption[locale]}, ${site.name}`}
                          caption={r.photos[0].caption[locale]}
                          src={r.photos[0].src}
                          ratio="4/5"
                          tone={i * 2}
                          sizes="(max-width: 1024px) 62vw, 38vw"
                          className="shadow-(--shadow-lift)"
                        />
                      </TiltCard>
                    </Parallax>
                    <div className="col-span-4 space-y-3 sm:space-y-4">
                      <Parallax amount={-18}>
                        <Photo
                          alt={`${r.photos[1].caption[locale]}, ${site.name}`}
                          caption={r.photos[1].caption[locale]}
                          src={r.photos[1].src}
                          ratio="1/1"
                          tone={i * 2 + 1}
                          sizes="(max-width: 1024px) 30vw, 18vw"
                        />
                      </Parallax>
                      <Parallax amount={-34}>
                        <Photo
                          alt={`${r.photos[2].caption[locale]}, ${site.name}`}
                          caption={r.photos[2].caption[locale]}
                          src={r.photos[2].src}
                          ratio="3/4"
                          tone={i * 2 + 2}
                          sizes="(max-width: 1024px) 30vw, 18vw"
                        />
                      </Parallax>
                    </div>
                  </div>
                </div>

                {/* Metin */}
                <div className={cn("lg:col-span-5", flip && "lg:order-1 lg:row-start-1")}>
                  <Reveal>
                    <Eyebrow index={r.index}>{r.tagline[locale]}</Eyebrow>
                  </Reveal>
                  <SplitText
                    as="h3"
                    text={r.name[locale]}
                    className="mt-5 font-display text-h2 font-bold text-balance"
                  />

                  <Reveal delay={0.1}>
                    {r.body[locale].map((p) => (
                      <p key={p} className="mt-5 max-w-prose text-pretty text-ink-soft">
                        {p}
                      </p>
                    ))}
                  </Reveal>

                  <Reveal delay={0.16}>
                    <div className="mt-9 grid gap-6 sm:grid-cols-2">
                      <div>
                        <h4 className="eyebrow">{c.inRoom}</h4>
                        <ul className="mt-3 space-y-2">
                          {r.inRoom[locale].map((f) => (
                            <li key={f} className="flex items-baseline gap-2.5 text-sm text-ink-soft">
                              <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full grad" />
                              {f}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="eyebrow">{c.inFlat}</h4>
                        <ul className="mt-3 space-y-2">
                          {r.inFlat[locale].map((f) => (
                            <li key={f} className="flex items-baseline gap-2.5 text-sm text-ink-soft">
                              <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-mint" />
                              {f}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </Reveal>

                  <Reveal delay={0.22}>
                    <p className="mt-8 rounded-(--radius-sm) border border-line bg-paper px-4 py-3 text-sm text-ink-soft">
                      {r.bestFor[locale]}
                    </p>
                    <div className="mt-6 flex flex-wrap gap-3">
                      <Button href={`${localePath(locale, "/galeri")}?k=${r.slug}`}>{c.gallery}</Button>
                      <Button href={`tel:${site.phone}`} variant="outline">
                        {c.ask}
                      </Button>
                    </div>
                  </Reveal>
                </div>
              </article>
            </Container>
          );
        })}
      </div>

      {/* --- Tanitim videosu ---
          Video `public/videos/tanitim.mp4` konunca otomatik görünür.
          Dosya yokken bu blok hiç render edilmez. */}
      <Container size="wide" className="mt-20 sm:mt-28">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
          <Reveal className="lg:col-span-4">
            <Eyebrow index="▸">{c.videoLabel}</Eyebrow>
            <h3 className="mt-5 font-display text-h2 font-bold text-balance">{c.videoTitle}</h3>
            <p className="mt-5 max-w-prose text-pretty text-ink-soft">{c.videoNote}</p>
          </Reveal>
          <Reveal delay={0.12} className="lg:col-span-8">
            <VideoBlock
              src={VIDEO_SRC}
              poster={VIDEO_POSTER}
              label={c.videoLabel}
              className="aspect-video"
            />
            {!VIDEO_SRC && (
              <div className="grid aspect-video place-items-center rounded-(--radius-lg) border border-dashed border-line bg-sand/70 p-8 text-center">
                <div>
                  <span
                    aria-hidden
                    className="mx-auto grid h-16 w-16 place-items-center rounded-full grad text-white shadow-(--shadow-glow)"
                  >
                    <svg viewBox="0 0 24 24" className="ml-1 h-7 w-7" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                  <p className="mt-5 font-display text-h3 font-semibold text-ink-soft">
                    {c.videoLabel}
                  </p>
                  <p className="mt-2 text-sm text-muted">
                    {locale === "tr" ? "Çok yakında" : "Coming soon"}
                  </p>
                </div>
              </div>
            )}
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

/* Video dosyası eklenince bu iki sabiti doldurun:
   VIDEO_SRC = "/videos/tanitim.mp4"  ·  VIDEO_POSTER = "/images/video-kapak.jpg" */
const VIDEO_SRC: string | undefined = undefined;
const VIDEO_POSTER: string | undefined = undefined;
