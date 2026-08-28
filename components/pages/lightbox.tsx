"use client";

import Image from "next/image";
import { useRef, useState, type KeyboardEvent, type MouseEvent, type ReactNode } from "react";

export type LightboxItem = { src: string; alt: string };

/**
 * Galeri lightbox'ı.
 *
 * ponytail: native <dialog> + showModal() kullanılıyor - odak tuzağı, Esc ile
 * kapanma ve odağın tetikleyiciye geri dönmesi tarayıcıdan bedava geliyor.
 * Izgara sunucuda render edilir ve `children` olarak geçilir; tıklamalar
 * olay delegasyonu ile [data-lb="index"] üzerinden yakalanır, böylece
 * istemci paketi sadece bu dosya kadar büyür.
 */
export function Lightbox({
  items,
  labels,
  children,
}: {
  items: LightboxItem[];
  labels: { title: string; close: string; prev: string; next: string };
  children: ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const [i, setI] = useState(0);
  const n = items.length;

  function onGridClick(e: MouseEvent<HTMLDivElement>) {
    const el = (e.target as HTMLElement).closest<HTMLElement>("[data-lb]");
    if (!el) return;
    const idx = Number(el.dataset.lb);
    if (!Number.isInteger(idx) || idx < 0 || idx >= n) return;
    setI(idx);
    ref.current?.showModal();
  }

  const go = (step: number) => setI((p) => (p + step + n) % n);

  function onKeyDown(e: KeyboardEvent<HTMLDialogElement>) {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      go(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(-1);
    }
  }

  function onBackdrop(e: MouseEvent<HTMLDialogElement>) {
    const t = e.target as HTMLElement;
    if (t === ref.current || t.hasAttribute("data-backdrop")) ref.current?.close();
  }

  const cur = items[i];

  return (
    <>
      <div onClick={onGridClick}>{children}</div>

      {n > 0 && (
        <dialog
          ref={ref}
          aria-modal="true"
          aria-label={labels.title}
          onClick={onBackdrop}
          onKeyDown={onKeyDown}
          className="m-0 h-dvh max-h-none w-screen max-w-none bg-transparent p-0 text-cream backdrop:bg-ink/92"
        >
          <div
            data-backdrop
            className="relative flex h-full w-full flex-col items-center justify-center gap-5 px-4 py-16 sm:px-16"
          >
            <button
              type="button"
              onClick={() => ref.current?.close()}
              className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-(--radius-pill) border border-cream/25 text-cream transition-colors duration-500 ease-(--ease-out-expo) hover:bg-cream hover:text-ink sm:right-8 sm:top-8"
              aria-label={labels.close}
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M5 5l14 14M19 5L5 19" />
              </svg>
            </button>

            <div className="relative h-full max-h-[78vh] w-full max-w-6xl">
              {cur && (
                <Image
                  src={cur.src}
                  alt={cur.alt}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  priority
                />
              )}
            </div>

            <div className="flex w-full max-w-6xl items-center justify-between gap-6">
              <p className="min-w-0 flex-1 truncate text-sm text-cream/75">{cur?.alt}</p>

              {n > 1 && (
                <div className="flex shrink-0 items-center gap-2">
                  <button
                    type="button"
                    onClick={() => go(-1)}
                    aria-label={labels.prev}
                    className="flex h-11 w-11 items-center justify-center rounded-(--radius-pill) border border-cream/25 transition-colors duration-500 ease-(--ease-out-expo) hover:bg-cream hover:text-ink"
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M15 5l-7 7 7 7" />
                    </svg>
                  </button>
                  <p className="eyebrow tabular-nums text-cream/60" aria-live="polite">
                    {i + 1} / {n}
                  </p>
                  <button
                    type="button"
                    onClick={() => go(1)}
                    aria-label={labels.next}
                    className="flex h-11 w-11 items-center justify-center rounded-(--radius-pill) border border-cream/25 transition-colors duration-500 ease-(--ease-out-expo) hover:bg-cream hover:text-ink"
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </div>
        </dialog>
      )}
    </>
  );
}
