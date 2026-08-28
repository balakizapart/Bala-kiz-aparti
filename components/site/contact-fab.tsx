"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { site, waLink } from "@/lib/site";
import type { Locale } from "@/lib/i18n";

const copy = {
  tr: {
    label: "WhatsApp'tan yaz",
    aria: "WhatsApp'tan mesaj gönder, yeni sekmede açılır",
    message:
      "Merhaba, Bala Kız Apartı'ndaki boş odalar hakkında bilgi almak istiyorum.",
  },
  en: {
    label: "Message on WhatsApp",
    aria: "Send a WhatsApp message, opens in a new tab",
    message:
      "Hello, I would like some information about the available rooms at Bala Kız Apartı.",
  },
} as const;

/** Sağ altta beliren WhatsApp butonu: markanın kendi yeşili. */
export function ContactFab({ locale }: { locale: Locale }) {
  const [show, setShow] = useState(false);
  const reduce = useReducedMotion();
  const c = copy[locale];

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 520);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.9 }}
          transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
          className="fixed bottom-5 right-5 z-[65] sm:bottom-8 sm:right-8"
        >
          <a
            href={waLink(c.message)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={c.aria}
            className="group relative flex h-14 items-center rounded-(--radius-pill) bg-whatsapp px-[1.05rem] text-white shadow-[0_16px_40px_-12px_rgba(37,211,102,.7)] transition-colors duration-500 ease-(--ease-out-expo) hover:bg-whatsapp-deep"
          >
            {/* Dikkat çeken yumuşak nabız */}
            <span
              aria-hidden
              className="absolute inset-0 -z-10 animate-ping rounded-(--radius-pill) bg-whatsapp/40 [animation-duration:2.6s] motion-reduce:hidden"
            />
            <svg aria-hidden viewBox="0 0 24 24" className="h-6 w-6 shrink-0" fill="currentColor">
              <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.42a8.19 8.19 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23Zm4.52-6.17c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.79.97-.14.16-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.51.11-.11.25-.29.37-.43.12-.15.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.47c-.17 0-.43.06-.66.31-.23.25-.87.85-.87 2.07s.89 2.4 1.02 2.56c.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.14-1.18-.06-.11-.22-.17-.47-.29Z" />
            </svg>
            <span className="ml-0 max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold opacity-0 transition-[max-width,opacity,margin] duration-700 ease-(--ease-out-expo) group-hover:ml-3 group-hover:max-w-56 group-hover:opacity-100 group-focus-visible:ml-3 group-focus-visible:max-w-56 group-focus-visible:opacity-100">
              {c.label}
            </span>
          </a>
          <span className="sr-only">{site.phoneDisplay}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
