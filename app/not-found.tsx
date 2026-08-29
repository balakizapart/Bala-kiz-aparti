import Link from "next/link";
import { fontVars } from "@/app/fonts";
import { site } from "@/lib/site";
import "@/app/globals.css";

/**
 * 404 sayfası.
 *
 * Kendi <html>/<body>'sini yazar: route grupları ((site)) kendi kök
 * layout'unu taşıdığı için bu dosyayı saracak bir üst layout yok.
 * Türkçe, sitenin diliyle ve tasarımıyla tutarlı.
 */
export default function NotFound() {
  return (
    <html lang="tr" className={fontVars}>
      <body className="grain antialiased">
        <main className="relative flex min-h-dvh items-center overflow-hidden">
          {/* Renk lekeleri */}
          <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
            <span className="blob -left-40 -top-40 h-[34rem] w-[34rem]" style={{ background: "#a9cdc8" }} />
            <span
              className="blob right-[-6rem] top-20 h-[26rem] w-[26rem]"
              style={{ background: "#e7d1a0", animationDelay: "-7s" }}
            />
          </div>

          <div className="relative mx-auto w-full max-w-3xl px-5 sm:px-8">
            <p className="eyebrow">404</p>

            <h1 className="mt-6 font-display text-h1 font-extrabold text-balance">
              Bu sayfa <span className="grad-text">taşınmış olabilir.</span>
            </h1>

            <p className="mt-6 max-w-xl text-lead text-pretty text-ink-soft">
              Aradığın adres artık burada değil. Buradan devam edebilir ya da bizi doğrudan
              arayabilirsin; aradığını söylersen biz buluruz.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/"
                className="grad inline-flex h-14 items-center rounded-(--radius-pill) px-8 text-[0.9375rem] font-semibold text-white shadow-(--shadow-soft) transition-shadow duration-500 ease-(--ease-out-expo) hover:shadow-(--shadow-glow)"
              >
                Ana sayfaya dön
              </Link>
              <Link
                href="/odalar"
                className="inline-flex h-14 items-center rounded-(--radius-pill) border border-line bg-paper/60 px-8 text-[0.9375rem] font-semibold text-ink backdrop-blur transition-colors duration-500 ease-(--ease-out-expo) hover:border-pine hover:text-pine"
              >
                Odaları gör
              </Link>
              <a
                href={`tel:${site.phone}`}
                className="inline-flex h-14 items-center rounded-(--radius-pill) px-6 text-[0.9375rem] font-semibold text-ink transition-colors duration-500 ease-(--ease-out-expo) hover:text-gold"
              >
                {site.phoneDisplay}
              </a>
            </div>

            <nav aria-label="Site haritası" className="mt-14 border-t border-line pt-6">
              <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-soft">
                {[
                  { href: "/galeri", label: "Galeri" },
                  { href: "/konum", label: "Konum" },
                  { href: "/hakkimizda", label: "Hakkımızda" },
                  { href: "/sss", label: "S.S.S." },
                  { href: "/iletisim", label: "İletişim" },
                  { href: "/on-kayit", label: "Ön Kayıt" },
                ].map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="link-underline hover:text-pine">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </main>
      </body>
    </html>
  );
}
