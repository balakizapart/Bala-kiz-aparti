import type { Metadata } from "next";
import Link from "next/link";
import { Photo } from "@/components/ui/photo";
import { Container, Reveal, Section } from "@/components/ui/primitives";
import { CtaBlock } from "@/components/pages/cta-block";
import { Lightbox, type LightboxItem } from "@/components/pages/lightbox";
import { PageHeader } from "@/components/pages/page-header";
import { galleryCategories, galleryFor, type GalleryCategory } from "@/lib/gallery";
import { localePath, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const copy = {
  tr: {
    eyebrow: "Galeri",
    title: "Rötuşsuz kadrajlar: burası tam olarak böyle görünüyor.",
    lead: "Fotoğrafları geniş açı hilesi olmadan çekiyoruz. Gelip gördüğünde şaşırma diye.",
    filterLabel: "Kategoriye göre filtrele",
    empty: "Fotoğraflar hazırlanıyor",
    emptyTitle: "Yeni fotoğraflar çok yakında.",
    emptyText:
      "Odaları ve daireleri yeniden fotoğraflıyoruz. O gelene kadar seni apartı gezmeye bekleriz; istediğin günü söyle, kapımız açık.",
    lightbox: {
      title: "Fotoğraf görüntüleyici",
      close: "Kapat",
      prev: "Önceki fotoğraf",
      next: "Sonraki fotoğraf",
    },
    count: "fotoğraf",
    open: "Büyüt:",
  },
  en: {
    eyebrow: "Gallery",
    title: "Unretouched frames: this is exactly how it looks.",
    lead: "We shoot without wide-angle tricks, so nothing surprises you when you visit.",
    filterLabel: "Filter by category",
    empty: "Photos in preparation",
    emptyTitle: "New photographs are coming soon.",
    emptyText:
      "We are re-shooting the rooms and the flats. Until then, come and see the place. Name a day and the door is open.",
    lightbox: {
      title: "Photo viewer",
      close: "Close",
      prev: "Previous photo",
      next: "Next photo",
    },
    count: "photos",
    open: "Enlarge:",
  },
} as const;

/** Asimetrik masonry hissi için dönüşümlü oranlar. */
const RATIOS = ["4/5", "1/1", "3/4", "3/2", "4/5", "16/9"] as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const l: Locale = locale === "en" ? "en" : "tr";
  return pageMetadata({
    locale: l,
    path: "/galeri",
    title:
      l === "tr"
        ? "Galeri | Eskişehir Kız Öğrenci Apartı Fotoğrafları"
        : "Gallery | Photos of Our Girls' Residence in Eskişehir",
    description:
      l === "tr"
        ? "Bala Kız Apartı fotoğrafları: odalar, daire içi, mutfak, banyo ve bina. Tepebaşı'ndaki kız öğrenci apartımızı gelmeden önce ayrıntısıyla görün."
        : "Photos of Bala Girls' Residence: rooms, flats, kitchen, bathroom and buildings. See our student housing in Tepebaşı, Eskişehir before you visit.",
  });
}

export default async function GalleryPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ [k: string]: string | string[] | undefined }>;
}) {
  const [{ locale }, sp] = await Promise.all([params, searchParams]);
  const l: Locale = locale === "en" ? "en" : "tr";
  const c = copy[l];

  const raw = typeof sp.k === "string" ? sp.k : "all";
  const active = (galleryCategories.some((x) => x.key === raw) ? raw : "all") as GalleryCategory;

  const items = galleryFor(active);
  // Fotoğrafı yüklenmiş olanlar büyütülebilir; yer tutucular değil.
  const withPhoto = items.filter((g): g is typeof g & { src: string } => Boolean(g.src));
  const lightboxItems: LightboxItem[] = withPhoto.map((g) => ({
    src: g.src,
    alt: g.alt[l],
  }));

  const grid = (
    <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
      {items.map((g, i) => {
        const lbIndex = g.src ? withPhoto.findIndex((w) => w === g) : -1;
        const photo = (
          <Photo
            src={g.src}
            alt={g.alt[l]}
            caption={g.alt[l]}
            ratio={RATIOS[i % RATIOS.length]}
            tone={i}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            imgClassName="group-hover:scale-105"
            priority={i < 3}
          />
        );

        return g.src ? (
          <button
            key={i}
            type="button"
            data-lb={lbIndex}
            className="group block w-full break-inside-avoid text-left"
            aria-label={`${c.open} ${g.alt[l]}`}
          >
            {photo}
          </button>
        ) : (
          <div key={i} className="break-inside-avoid">
            {photo}
          </div>
        );
      })}
    </div>
  );

  return (
    <>
      <PageHeader
        index="01"
        eyebrow={c.eyebrow}
        title={c.title}
        lead={c.lead}
        meta={
          withPhoto.length
            ? [`${withPhoto.length} ${c.count}`, `${site.district}, ${site.city}`]
            : [`${site.district}, ${site.city}`]
        }
      />

      {/* Filtreler: URL query, paylaşılabilir */}
      <Section className="!py-0">
        <Container size="wide">
          <nav aria-label={c.filterLabel} className="border-y border-line py-4">
            <ul className="flex flex-wrap items-center gap-2">
              {galleryCategories.map((cat) => {
                const on = cat.key === active;
                const href =
                  cat.key === "all"
                    ? localePath(l, "/galeri")
                    : `${localePath(l, "/galeri")}?k=${cat.key}`;
                return (
                  <li key={cat.key}>
                    <Link
                      href={href}
                      scroll={false}
                      aria-current={on ? "page" : undefined}
                      className={cn(
                        "inline-flex h-10 items-center rounded-(--radius-pill) px-4 text-sm font-semibold",
                        "transition-all duration-500 ease-(--ease-out-expo)",
                        on
                          ? "grad text-white shadow-(--shadow-soft)"
                          : "border border-line text-ink-soft hover:border-grape hover:text-grape"
                      )}
                    >
                      {l === "tr" ? cat.tr : cat.en}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </Container>
      </Section>

      <Section>
        <Container size="wide">
          {withPhoto.length === 0 && (
            <Reveal className="mb-14">
              <p className="eyebrow grad-text font-black">{c.empty}</p>
              <h2 className="mt-4 max-w-2xl font-display text-h2 font-bold text-balance">
                {c.emptyTitle}
              </h2>
              <p className="mt-5 max-w-prose text-pretty text-ink-soft">{c.emptyText}</p>
            </Reveal>
          )}

          {lightboxItems.length > 0 ? (
            <Lightbox items={lightboxItems} labels={c.lightbox}>
              {grid}
            </Lightbox>
          ) : (
            grid
          )}
        </Container>
      </Section>

      <CtaBlock locale={l} />
    </>
  );
}
