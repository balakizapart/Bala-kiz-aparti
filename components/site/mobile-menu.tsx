"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll } from "motion/react";
import { Button } from "@/components/ui/primitives";
import { Logo } from "./logo";
import { LanguageSwitcher } from "./language-switcher";
import { localePath, type Locale } from "@/lib/i18n";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Header'ın iki client parçası tek dosyada: yapışkan bar + mobil menü.
 * Ayrı dosyaya bölmek iki "use client" sınırı yaratırdı, faydası yok.
 */

/* ---------- Yapışkan üst bar ---------- */
export function StickyHeader({ children }: { children: React.ReactNode }) {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    return scrollY.on("change", (v) => setScrolled(v > 24));
  }, [scrollY]);

  return (
    <header
      data-scrolled={scrolled}
      className={cn(
        "group sticky top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-700 ease-(--ease-out-expo)",
        scrolled
          ? "bg-cream/80 shadow-(--shadow-soft) backdrop-blur-xl"
          : "bg-transparent"
      )}
    >
      {children}
    </header>
  );
}

/* ---------- Mobil menü ---------- */
export function MobileMenu({
  items,
  locale,
  labels,
}: {
  items: Array<{ href: string; label: string }>;
  locale: Locale;
  labels: { menu: string; close: string; reserve: string; changeLanguage: string };
}) {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // Menü açıkken arkadaki sayfa kaymasın
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    // ponytail: tam focus trap yerine ilk odaklanabilir öğeye odak + Esc.
    panelRef.current?.querySelector<HTMLElement>("a, button")?.focus();
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={labels.menu}
        aria-expanded={open}
        className="grid h-11 w-11 place-items-center rounded-full border border-line bg-paper/70 backdrop-blur transition-colors duration-500 ease-(--ease-out-expo) hover:border-pine lg:hidden"
      >
        <span aria-hidden className="flex flex-col gap-[5px]">
          <span className="block h-[2px] w-5 rounded-full bg-ink" />
          <span className="block h-[2px] w-3.5 rounded-full bg-gold" />
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[80] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <button
              type="button"
              aria-label={labels.close}
              onClick={() => setOpen(false)}
              className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
            />

            <motion.div
              ref={panelRef}
              initial={reduce ? { opacity: 0 } : { x: "100%" }}
              animate={reduce ? { opacity: 1 } : { x: 0 }}
              exit={reduce ? { opacity: 0 } : { x: "100%" }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-y-0 right-0 flex w-[min(24rem,88vw)] flex-col bg-cream px-6 pb-8 pt-6 shadow-(--shadow-lift)"
            >
              <div className="flex items-center justify-between">
                <Logo className="text-[12px]" />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label={labels.close}
                  className="grid h-11 w-11 place-items-center rounded-full border border-line transition-colors duration-500 hover:border-gold hover:text-gold"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                    <path d="M6 6l12 12M18 6L6 18" />
                  </svg>
                </button>
              </div>

              <nav aria-label={labels.menu} className="mt-10">
                <ul className="space-y-1">
                  {items.map((it, i) => (
                    <motion.li
                      key={it.href}
                      initial={reduce ? false : { opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.08 + i * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <Link
                        href={it.href}
                        onClick={() => setOpen(false)}
                        className="block border-b border-line py-4 font-display text-h3 font-semibold transition-colors duration-500 ease-(--ease-out-expo) hover:text-gold"
                      >
                        {it.label}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              <div className="mt-auto space-y-4 pt-8">
                <Button
                  href={localePath(locale, "/on-kayit")}
                  size="lg"
                  className="w-full"
                  magnetic={false}
                >
                  {labels.reserve}
                </Button>
                <Button
                  href={`tel:${site.phone}`}
                  variant="outline"
                  size="lg"
                  className="w-full"
                  magnetic={false}
                >
                  {site.phoneDisplay}
                </Button>
                <LanguageSwitcher locale={locale} label={labels.changeLanguage} className="pt-2" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
