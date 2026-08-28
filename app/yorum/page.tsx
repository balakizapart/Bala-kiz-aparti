import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { fontVars } from "@/app/fonts";
import { site, googleReviewUrl } from "@/lib/site";
import "@/app/globals.css";

/**
 * Yorum sayfası: balakizapart.com/yorum
 *
 * Kendi <html>/<body>'sini yazar; route grupları kendi kök layout'unu
 * taşıdığı için bu dosyayı saracak bir üst layout yok.
 *
 * NOT: Kapıya asılan QR kod bu sayfayı DEĞİL, doğrudan Google'ın yorum
 * ekranını kodluyor (bkz. `scripts/gen-qr.mjs`). Bu sayfa paylaşmak için
 * duruyor: Instagram biyografisi, e-posta imzası, WhatsApp mesajı.
 * Google bağlantısı `lib/site.ts` içindeki `googleReviewUrl()`'den gelir.
 */
export const metadata: Metadata = {
  title: "Bizi değerlendirin | Bala Kız Apartı",
  description:
    "Bala Kız Apartı hakkında Google'da yorum bırakın. Görüşünüz bizden sonra gelecek öğrencilere yol gösteriyor.",
  robots: { index: false, follow: true },
};

export default function ReviewPage() {
  return (
    <html lang="tr" className={fontVars}>
      <body className="grain antialiased">
        <main className="relative flex min-h-dvh items-center overflow-hidden py-16">
          <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
            <span
              className="blob -left-40 -top-40 h-[34rem] w-[34rem]"
              style={{ background: "#c4a6ff" }}
            />
            <span
              className="blob right-[-6rem] top-24 h-[26rem] w-[26rem]"
              style={{ background: "#ffb6dd", animationDelay: "-7s" }}
            />
          </div>

          <div className="relative mx-auto w-full max-w-2xl px-5 text-center sm:px-8">
            {/* Marka */}
            <Link
              href="/"
              className="inline-flex items-baseline gap-2 text-ink transition-opacity duration-500 hover:opacity-70"
            >
              <span className="font-display text-2xl font-extrabold leading-none tracking-tight">
                Bala
              </span>
              <span aria-hidden className="h-2 w-2 rounded-full grad" />
              <span className="eyebrow">Kız Apartı</span>
            </Link>

            {/* Yıldızlar */}
            <p className="mt-10 flex justify-center gap-1 text-[#fbbc04]" aria-hidden>
              {[0, 1, 2, 3, 4].map((i) => (
                <svg key={i} viewBox="0 0 24 24" className="h-8 w-8" fill="currentColor">
                  <path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.9L12 17.8 5.8 21l1.2-6.9-5-4.9 6.9-1z" />
                </svg>
              ))}
            </p>

            <h1 className="mt-7 font-display text-h1 font-extrabold text-balance">
              Bizi <span className="grad-text">değerlendirir misiniz?</span>
            </h1>

            <p className="mx-auto mt-6 max-w-lg text-lead text-pretty text-ink-soft">
              Apartta kaldıysanız ya da gezip gördüyseniz, birkaç cümlelik yorumunuz
              bizden sonra gelecek öğrencilere çok şey anlatıyor. Bir dakikanızı alır.
            </p>

            {/* Google butonu */}
            <div className="mt-10">
              <a
                href={googleReviewUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="grad group inline-flex h-16 items-center gap-3 rounded-(--radius-pill) px-9 text-base font-bold text-white shadow-(--shadow-soft) transition-shadow duration-500 ease-(--ease-out-expo) hover:shadow-(--shadow-glow)"
              >
                <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden fill="currentColor">
                  <path d="M12 11v2.6h6.2c-.25 1.6-1.86 4.7-6.2 4.7A6.9 6.9 0 0 1 5.1 12 6.9 6.9 0 0 1 12 5.1c2 0 3.3.85 4.06 1.58l2.77-2.67A9.7 9.7 0 0 0 12 1.4 10.6 10.6 0 0 0 1.4 12 10.6 10.6 0 0 0 12 22.6c6.12 0 10.18-4.3 10.18-10.36 0-.7-.08-1.23-.17-1.75z" />
                </svg>
                Google&apos;da yorum yaz
              </a>
            </div>

            <p className="mt-5 text-sm text-muted">
              Google Haritalar&apos;da yeni sekmede açılır.
            </p>

            {/* QR: kapıdaki kodla aynı */}
            <div className="mx-auto mt-14 max-w-sm rounded-(--radius-lg) border border-line bg-paper p-7 shadow-(--shadow-soft)">
              <p className="eyebrow">Kapıdaki kod</p>
              <div className="mt-5 flex justify-center">
                <Image
                  src="/qr-yorum.svg"
                  alt="Google yorum ekranını açan QR kod"
                  width={148}
                  height={148}
                  className="h-[9.25rem] w-[9.25rem]"
                />
              </div>
              <p className="mt-5 text-sm text-ink-soft">
                Bina kapısındaki kodun aynısı. Okutan kişi doğrudan Google&apos;ın
                yorum ekranına düşer.
              </p>
            </div>

            {/* Geri dönüş */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm">
              <Link href="/" className="link-underline font-semibold text-grape">
                Siteye dön
              </Link>
              <a href={`tel:${site.phone}`} className="link-underline text-ink-soft">
                {site.phoneDisplay}
              </a>
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline text-ink-soft"
              >
                Instagram
              </a>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
