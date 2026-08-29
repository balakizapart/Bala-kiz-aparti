import Image from "next/image";
import { googleReviewUrl } from "@/lib/site";
import type { Locale } from "@/lib/i18n";

const copy = {
  tr: {
    eyebrow: "Google Yorumları",
    title: "Bizi değerlendirir misiniz?",
    body: "Apartta kaldıysan ya da gezip gördüysen, birkaç cümlelik yorumun bizden sonra gelecek öğrencilere çok şey anlatıyor.",
    scan: "Kamerayı kodun üzerine tut",
    cta: "Yorum yaz",
    alt: "Google yorum ekranını açan QR kod",
  },
  en: {
    eyebrow: "Google Reviews",
    title: "Would you leave us a review?",
    body: "If you have stayed with us or come for a visit, a couple of sentences tell the next student more than we ever could.",
    scan: "Point your camera at the code",
    cta: "Write a review",
    alt: "QR code that opens the Google review screen",
  },
} as const;

/**
 * Footer köşesindeki Google yorum bloğu.
 *
 * QR `public/qr-yorum.svg`'den gelir ve `/yorum` adresine bakar; oradan
 * Google'a yönlendirilir. Aynı kodun çerçeveli baskı sürümü
 * `public/qr-yorum-baski.svg` - bina kapısına asılacak olan odur.
 * Kodu değiştirmek gerekirse: `npm run qr`.
 */
export function ReviewQr({ locale }: { locale: Locale }) {
  const c = copy[locale];

  return (
    <div className="ring-grad group relative overflow-hidden rounded-(--radius-lg) border border-line bg-paper p-6 shadow-(--shadow-soft) sm:p-7">
      <span
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full grad opacity-15 blur-2xl"
      />

      <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center">
        {/* QR */}
        <a
          href={googleReviewUrl()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={c.cta}
          className="shrink-0 self-start rounded-(--radius-md) border border-line bg-white p-3
                     transition-transform duration-500 ease-(--ease-spring) hover:scale-[1.04]"
        >
          <Image
            src="/qr-yorum.svg"
            alt={c.alt}
            width={132}
            height={132}
            className="h-[7.25rem] w-[7.25rem]"
          />
        </a>

        {/* Metin */}
        <div className="min-w-0">
          <p className="eyebrow flex items-center gap-2">
            {/* Google yıldızları */}
            <span aria-hidden className="flex gap-0.5 text-[#fbbc04]">
              {[0, 1, 2, 3, 4].map((i) => (
                <svg key={i} viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor">
                  <path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.9L12 17.8 5.8 21l1.2-6.9-5-4.9 6.9-1z" />
                </svg>
              ))}
            </span>
            {c.eyebrow}
          </p>

          <h3 className="mt-3 font-display text-h3 font-bold text-balance">{c.title}</h3>
          <p className="mt-2 max-w-sm text-pretty text-sm leading-relaxed text-ink-soft">
            {c.body}
          </p>

          <p className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted">
            <span>{c.scan}</span>
            <span aria-hidden>·</span>
            <a
              href={googleReviewUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline font-semibold text-gold"
            >
              {c.cta}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
