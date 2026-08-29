import Image from "next/image";
import { sizeOf } from "@/lib/image-sizes";
import { cn } from "@/lib/utils";

/**
 * Fotoğraf yuvası.
 *
 * GERÇEK FOTOĞRAF varsa: kendi en-boy oranında basılır, KIRPILMAZ.
 * Boyutlar `lib/image-sizes.ts` dosyasından okunur (`npm run images` ile
 * üretilir). Sabit bir orana zorlamak yatay fotoğrafın kenarlarını,
 * dikey fotoğrafın üstünü altını kesiyordu; bu yüzden orandan vazgeçildi.
 *
 * FOTOĞRAF YOKSA: `ratio` ile verilen oranda renkli bir yer tutucu çizilir,
 * böylece tasarım fotoğraf gelmeden de bütün durur.
 *
 * `framed` (varsayılan açık) ince beyaz paspartu ve yumuşak gölge verir;
 * baskı çerçevesi hissi.
 */
export function Photo({
  src,
  alt,
  ratio = "4/5",
  className,
  imgClassName,
  priority,
  sizes = "(max-width: 768px) 100vw, 50vw",
  caption,
  tone = 0,
  framed = true,
}: {
  src?: string | null;
  alt: string;
  /** Yalnızca fotoğraf YOKKEN kullanılır (yer tutucunun oranı). */
  ratio?: "1/1" | "4/5" | "3/4" | "16/9" | "3/2" | "21/9";
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  sizes?: string;
  caption?: string;
  /** Yer tutucu renk varyantı; komşu kartlar aynı görünmesin diye. */
  tone?: number;
  framed?: boolean;
}) {
  const dims = sizeOf(src);

  /* --- Gerçek fotoğraf: doğal oranında, kırpmasız --- */
  if (src && dims) {
    const [w, h] = dims;
    return (
      <figure
        className={cn(
          "overflow-hidden rounded-(--radius-md)",
          framed && "bg-paper p-1.5 shadow-(--shadow-soft) ring-1 ring-line",
          className
        )}
      >
        <Image
          src={src}
          alt={alt}
          width={w}
          height={h}
          sizes={sizes}
          priority={priority}
          className={cn(
            "h-auto w-full rounded-[calc(var(--radius-md)-6px)]",
            "transition-transform duration-[1.2s] ease-(--ease-out-expo)",
            imgClassName
          )}
        />
      </figure>
    );
  }

  /* --- Boyutu bilinmeyen fotoğraf: orana sığdır (yedek yol) --- */
  if (src) {
    return (
      <figure
        className={cn(
          "relative overflow-hidden rounded-(--radius-md) bg-sand",
          framed && "shadow-(--shadow-soft) ring-1 ring-line",
          className
        )}
        style={{ aspectRatio: ratio.replace("/", " / ") }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={cn(
            "object-cover transition-transform duration-[1.2s] ease-(--ease-out-expo)",
            imgClassName
          )}
        />
      </figure>
    );
  }

  /* --- Fotoğraf yok: yer tutucu --- */
  return (
    <figure
      className={cn(
        "relative overflow-hidden rounded-(--radius-md) bg-sand",
        framed && "ring-1 ring-line",
        className
      )}
      style={{ aspectRatio: ratio.replace("/", " / ") }}
    >
      <PlaceholderArt label={caption ?? alt} tone={tone} />
    </figure>
  );
}

const TONES = [
  "radial-gradient(120% 95% at 18% 0%, #e9f2f0 0%, #d8e8e4 45%, #c4dbd6 100%)",
  "radial-gradient(120% 95% at 80% 5%, #f8f0dd 0%, #f1e4c4 48%, #e7d5a8 100%)",
  "radial-gradient(120% 95% at 40% 0%, #f6f2e8 0%, #ebe4d3 45%, #ddd3bd 100%)",
  "radial-gradient(120% 95% at 65% 10%, #eaf1f1 0%, #dbe7e6 48%, #c9dbd9 100%)",
];

function PlaceholderArt({ label, tone }: { label: string; tone: number }) {
  return (
    <div
      className="absolute inset-0 flex items-end p-5"
      style={{ background: TONES[tone % TONES.length] }}
      role="img"
      aria-label={label}
    >
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #14201e 0 1px, transparent 1px 10px)",
        }}
        aria-hidden
      />
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white/50"
      />
      {/* Etiket iki dilde de aynı görünsün diye kelime değil ikon kullanılır;
          okunabilir bilgi zaten figürün aria-label'ında. */}
      <div className="relative" aria-hidden>
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5 text-ink-soft/50"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 7h3l1.5-2h7L17 7h3v12H4z" />
          <circle cx="12" cy="13" r="3.5" />
        </svg>
        <span className="mt-2 block max-w-[24ch] font-display text-lg font-semibold leading-tight text-ink-soft/85">
          {label}
        </span>
      </div>
    </div>
  );
}

/**
 * Tanıtım videosu yuvası.
 *
 * Video `public/videos/` altına konup `src` verilince oynar. Dosya yokken
 * bileşen HİÇ render edilmez; boş bir kutu görünmesin diye.
 */
export function VideoBlock({
  src,
  poster,
  label,
  className,
}: {
  src?: string;
  poster?: string;
  label: string;
  className?: string;
}) {
  if (!src) return null;

  return (
    <figure
      className={cn(
        "relative overflow-hidden rounded-(--radius-lg) bg-ink shadow-(--shadow-lift)",
        className
      )}
    >
      <video
        className="block h-full w-full object-cover"
        src={src}
        poster={poster}
        controls
        playsInline
        preload="metadata"
        aria-label={label}
      />
    </figure>
  );
}
