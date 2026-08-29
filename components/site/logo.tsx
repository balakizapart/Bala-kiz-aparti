import { cn } from "@/lib/utils";

/* ============================================================
   Marka kilidi (logo). Apartın basılı broşüründeki künyenin
   dijital karşılığı: gold bina simgesi, "BALA" koyu yeşil,
   "KIZ" gold, altında harf aralıklı "APART".

   Neden PNG değil: PNG her ekranda aynı piksel sayısıyla basılır,
   büyütünce bulanıklaşır ve rengi kodla değiştirilemez. Buradaki
   simge SVG (her boyutta keskin), yazı ise gerçek metin: ekran
   okuyucu okur, arama motoru görür, tema renkleriyle boyanır.

   Ölçü: her şey em cinsinden, yani tek bir font-size ile büyüyüp
   küçülüyor. Kullanımı: <Logo className="text-[15px]" />
   ============================================================ */

/** Broşürdeki gold bina simgesi: orta kule, iki yan kanat, süs kavisleri. */
function BuildingMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 132 44"
      fill="none"
      aria-hidden
      className={className}
      // Simge tek renk; rengi dışarıdan `text-*` ile geliyor.
      stroke="currentColor"
      strokeLinecap="round"
    >
      {/* Sol süs kavisi */}
      <path d="M2 30c10 0 16-3 22-8" strokeWidth="1.6" />
      <path d="M8 34c9 0 15-3 20-7" strokeWidth="1.2" opacity=".65" />
      {/* Sağ süs kavisi (aynası) */}
      <path d="M130 30c-10 0-16-3-22-8" strokeWidth="1.6" />
      <path d="M124 34c-9 0-15-3-20-7" strokeWidth="1.2" opacity=".65" />

      <g fill="currentColor" stroke="none">
        {/* Orta kule: sivri çatı + gövde */}
        <path d="M66 1l9 11H57l9-11z" />
        <rect x="58" y="13.5" width="16" height="26" rx="1.2" />
        {/* Yan kanatlar */}
        <path d="M49 9l7 8h-14l7-8z" />
        <rect x="43" y="18" width="12" height="21.5" rx="1.2" />
        <path d="M83 9l7 8H76l7-8z" />
        <rect x="77" y="18" width="12" height="21.5" rx="1.2" />
        {/* Taban */}
        <rect x="38" y="40.5" width="56" height="3" rx="1.5" />
      </g>

      {/* Pencereler: gövdeden oyuluyor, zemin rengini gösteriyor */}
      <g fill="var(--color-cream)" stroke="none">
        <rect x="61.5" y="17" width="3" height="5" rx=".6" />
        <rect x="67.5" y="17" width="3" height="5" rx=".6" />
        <rect x="61.5" y="25" width="3" height="5" rx=".6" />
        <rect x="67.5" y="25" width="3" height="5" rx=".6" />
        <rect x="46" y="22" width="2.6" height="4.4" rx=".6" />
        <rect x="51" y="22" width="2.6" height="4.4" rx=".6" />
        <rect x="46" y="30" width="2.6" height="4.4" rx=".6" />
        <rect x="51" y="30" width="2.6" height="4.4" rx=".6" />
        <rect x="80" y="22" width="2.6" height="4.4" rx=".6" />
        <rect x="85" y="22" width="2.6" height="4.4" rx=".6" />
        <rect x="80" y="30" width="2.6" height="4.4" rx=".6" />
        <rect x="85" y="30" width="2.6" height="4.4" rx=".6" />
      </g>
    </svg>
  );
}

export function Logo({
  className,
  /** Simge kapalıyken sadece yazı basılır; dar yerler için. */
  mark = true,
}: {
  className?: string;
  mark?: boolean;
}) {
  return (
    <span
      className={cn("inline-flex flex-col items-center leading-none", className)}
      // Ekran okuyucu ve arama motoru için tek bir okunur ad.
      role="img"
      aria-label="Bala Kız Apart"
    >
      {mark && <BuildingMark className="mb-[0.34em] h-[1.05em] w-auto text-gold" />}

      <span aria-hidden className="font-display text-[1.7em] font-extrabold tracking-[-0.01em]">
        <span className="text-pine">BALA</span>{" "}
        <span className="text-gold">KIZ</span>
      </span>

      {/* "APART": iki yanında ince çizgi, broşürdeki gibi */}
      <span aria-hidden className="mt-[0.3em] flex w-full items-center gap-[0.5em]">
        <span className="h-px flex-1 bg-pine/35" />
        <span className="text-[0.62em] font-semibold tracking-[0.42em] text-pine indent-[0.42em]">
          APART
        </span>
        <span className="h-px flex-1 bg-pine/35" />
      </span>
    </span>
  );
}
