"use client";

import { useEffect } from "react";
import Link from "next/link";
import { site } from "@/lib/site";

/**
 * Beklenmedik bir hata olduğunda gösterilir. Kullanıcıyı boş ekranla
 * bırakmaz: ne olduğunu söyler, tekrar denemesini ve bize ulaşmasını sunar.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Geliştirme sırasında konsolda görünsün; üretimde Next zaten loglar.
    console.error(error);
  }, [error]);

  return (
    <div className="relative flex min-h-[70vh] items-center overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <span className="blob -left-32 top-0 h-[28rem] w-[28rem]" style={{ background: "#ffb6dd" }} />
      </div>

      <div className="relative mx-auto w-full max-w-3xl px-5 sm:px-8">
        <p className="eyebrow">Bir şeyler ters gitti</p>

        <h1 className="mt-6 font-display text-h1 font-extrabold text-balance">
          Sayfa <span className="grad-text">yüklenemedi.</span>
        </h1>

        <p className="mt-6 max-w-xl text-lead text-pretty text-ink-soft">
          Geçici bir aksaklık olabilir. Yeniden denemek genelde yeterli oluyor; olmazsa bizi
          arayın, sorunuzu telefonda hemen cevaplayalım.
        </p>

        <div className="mt-9 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={reset}
            className="grad inline-flex h-14 items-center rounded-(--radius-pill) px-8 text-[0.9375rem] font-semibold text-white shadow-(--shadow-soft) transition-shadow duration-500 ease-(--ease-out-expo) hover:shadow-(--shadow-glow)"
          >
            Yeniden dene
          </button>
          <Link
            href="/"
            className="inline-flex h-14 items-center rounded-(--radius-pill) border border-line bg-paper/60 px-8 text-[0.9375rem] font-semibold text-ink backdrop-blur transition-colors duration-500 ease-(--ease-out-expo) hover:border-grape hover:text-grape"
          >
            Ana sayfaya dön
          </Link>
          <a
            href={`tel:${site.phone}`}
            className="inline-flex h-14 items-center rounded-(--radius-pill) px-6 text-[0.9375rem] font-semibold text-ink transition-colors duration-500 ease-(--ease-out-expo) hover:text-fuchsia"
          >
            {site.phoneDisplay}
          </a>
        </div>

        {error.digest && (
          <p className="mt-10 text-xs text-muted">Hata kodu: {error.digest}</p>
        )}
      </div>
    </div>
  );
}
