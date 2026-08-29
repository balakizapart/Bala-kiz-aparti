"use client";

import { useState } from "react";
import { Button } from "@/components/ui/primitives";
import { site } from "@/lib/site";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const copy = {
  tr: {
    consentTitle: "Haritayı yükle",
    consentNote:
      "Harita Google'dan yüklenir. Gizliliğiniz için siz istemeden istek göndermiyoruz.",
    load: "Haritayı göster",
    directions: "Yol tarifi",
    openMap: "Haritada aç",
    both: "İki bina da Eskibağlar Mahallesi'nde, yan yana sokaklarda.",
  },
  en: {
    consentTitle: "Load the map",
    consentNote:
      "The map loads from Google. For your privacy we do not send any request until you ask for it.",
    load: "Show the map",
    directions: "Directions",
    openMap: "Open in Maps",
    both: "Both buildings are in Eskibağlar, on neighbouring streets.",
  },
} as const;

/** Bir binanın gömülü harita adresi. */
function embedFor(query: string) {
  return `https://www.google.com/maps?q=${encodeURIComponent(query)}&z=17&output=embed`;
}

const EMBEDS = [
  embedFor("Bala Kız Apart, Akmescit Sokak No:4, Tepebaşı, Eskişehir"),
  embedFor("Aşçı Sokak No:6, Eskibağlar, Tepebaşı, Eskişehir"),
];

/**
 * Büyük, sekmeli harita.
 *
 * Google'ın iframe'i sayfa açılır açılmaz yüklenmez: ziyaretçi isteyene kadar
 * ne istek gider ne çerez yazılır (gizlilik + performans). Sekmeler haritayı
 * Bala 1 ve Bala 2 arasında taşır.
 */
export function MapEmbed({ locale, className }: { locale: Locale; className?: string }) {
  const c = copy[locale];
  const [on, setOn] = useState(false);
  const [active, setActive] = useState(0);
  const building = site.buildings[active];

  return (
    <div className={cn("overflow-hidden rounded-(--radius-lg) border border-line bg-paper shadow-(--shadow-soft)", className)}>
      {/* Bina sekmeleri */}
      <div className="flex flex-wrap items-center gap-2 border-b border-line p-3 sm:p-4">
        <div role="tablist" aria-label={c.openMap} className="flex gap-2">
          {site.buildings.map((b, i) => {
            const sel = i === active;
            return (
              <button
                key={b.id}
                role="tab"
                type="button"
                aria-selected={sel}
                onClick={() => setActive(i)}
                className={cn(
                  "inline-flex h-10 items-center gap-2 rounded-(--radius-pill) px-4 text-sm font-semibold",
                  "transition-all duration-500 ease-(--ease-out-expo)",
                  sel
                    ? "grad text-white shadow-(--shadow-soft)"
                    : "border border-line text-ink-soft hover:border-pine hover:text-pine"
                )}
              >
                <span
                  aria-hidden
                  className={cn("h-1.5 w-1.5 rounded-full", sel ? "bg-white" : "bg-gold")}
                />
                {b.name}
              </button>
            );
          })}
        </div>
        <p className="ml-auto hidden text-xs text-muted lg:block">{c.both}</p>
      </div>

      {/* Harita alanı */}
      <div className="relative">
        {on ? (
          <iframe
            key={active}
            src={EMBEDS[active]}
            title={`${building.name}, ${building.street}`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            className="block h-[26rem] w-full border-0 sm:h-[34rem] lg:h-[38rem]"
          />
        ) : (
          <div className="relative h-[26rem] w-full overflow-hidden bg-sand/70 sm:h-[34rem] lg:h-[38rem]">
            {/* Sokak ızgarası hissi veren dekoratif zemin */}
            <div
              aria-hidden
              className="absolute inset-0 opacity-60"
              style={{
                backgroundImage:
                  "linear-gradient(#e0d8cc 1px, transparent 1px), linear-gradient(90deg, #e0d8cc 1px, transparent 1px)",
                backgroundSize: "56px 56px",
              }}
            />
            <div
              aria-hidden
              className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full grad opacity-15 blur-2xl"
            />
            <div className="relative flex h-full flex-col items-center justify-center gap-5 p-8 text-center">
              <span
                aria-hidden
                className="grid h-14 w-14 place-items-center rounded-full grad text-white shadow-(--shadow-glow)"
              >
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
                  <circle cx="12" cy="10" r="2.5" />
                </svg>
              </span>
              <div>
                <p className="font-display text-h3 font-semibold">{c.consentTitle}</p>
                <p className="mx-auto mt-2 max-w-sm text-pretty text-sm text-ink-soft">
                  {c.consentNote}
                </p>
              </div>
              <Button onClick={() => setOn(true)} size="lg">
                {c.load}
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Aktif binanın künyesi */}
      <div className="flex flex-col gap-4 border-t border-line p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
        <address className="text-sm not-italic leading-relaxed">
          <span className="font-display text-h3 font-semibold">{building.name}</span>
          <span className="mt-1 block text-ink-soft">
            {building.street} · {building.postalCode} {building.district}/{building.city}
          </span>
        </address>
        <div className="flex flex-wrap gap-2">
          <Button href={building.directions} variant="primary" size="sm">
            {c.directions}
          </Button>
          <Button href={building.maps} variant="outline" size="sm">
            {c.openMap}
          </Button>
        </div>
      </div>
    </div>
  );
}
