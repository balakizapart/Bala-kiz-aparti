import { cn } from "@/lib/utils";

/* ============================================================
   OLANAK İKONLARI

   Hepsi tek dosyada inline SVG - ikon kütüphanesi yok, ek istek yok,
   paket boyutu artmıyor. Her ikon 24×24 kutuda, `currentColor` ile
   çizilir; rengi çağıran taraf verir (bkz. lib/amenities.ts).
   ============================================================ */

export type AmenityIconName =
  | "wifi"
  | "tv"
  | "stove"
  | "fridge"
  | "washer"
  | "shower"
  | "camera"
  | "key"
  | "sparkle"
  | "flame"
  | "bed"
  | "desk"
  | "chair"
  | "books"
  | "wardrobe"
  | "drop"
  | "bolt"
  | "kitchen";

const paths: Record<AmenityIconName, React.ReactNode> = {
  wifi: (
    <>
      <path d="M2.5 8.5a15 15 0 0 1 19 0" />
      <path d="M5.5 12a10.5 10.5 0 0 1 13 0" />
      <path d="M8.5 15.4a6 6 0 0 1 7 0" />
      <circle cx="12" cy="19" r="1.2" fill="currentColor" stroke="none" />
    </>
  ),
  tv: (
    <>
      <rect x="2.5" y="4.5" width="19" height="13" rx="2" />
      <path d="M8 21h8M12 17.5V21" />
    </>
  ),
  stove: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="2.5" />
      <circle cx="8.5" cy="8.5" r="2" />
      <circle cx="15.5" cy="8.5" r="2" />
      <circle cx="8.5" cy="15.5" r="2" />
      <circle cx="15.5" cy="15.5" r="2" />
    </>
  ),
  fridge: (
    <>
      <rect x="5.5" y="2.5" width="13" height="19" rx="2.5" />
      <path d="M5.5 10h13M9 6.2v2M9 13.2v2.5" />
    </>
  ),
  washer: (
    <>
      <rect x="3.5" y="2.5" width="17" height="19" rx="2.5" />
      <circle cx="12" cy="14" r="4.5" />
      <path d="M9.2 14a2.8 2.8 0 0 1 5.6 0" />
      <circle cx="7.5" cy="6" r=".9" fill="currentColor" stroke="none" />
      <circle cx="10.7" cy="6" r=".9" fill="currentColor" stroke="none" />
    </>
  ),
  shower: (
    <>
      <path d="M4 12h16" />
      <path d="M7 12V6.5A2.5 2.5 0 0 1 9.5 4h.2A2.3 2.3 0 0 1 12 6.3" />
      <path d="M8 16v1.5M12 15.5v2.5M16 16v1.5M10 19v1.5M14 19v1.5" />
    </>
  ),
  camera: (
    <>
      <path d="M3 7.5 17 4l1.6 5.4-14 3.6z" />
      <path d="m18.6 9.4 2.4-.9v6.2l-2.4-.9" />
      <path d="M6.5 13v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-4" />
    </>
  ),
  key: (
    <>
      <circle cx="8" cy="8" r="4.5" />
      <path d="m11.4 11.4 8.1 8.1M17 14l2 2M14.5 16.5l1.5 1.5" />
    </>
  ),
  sparkle: (
    <>
      <path d="M12 3.5 13.6 9 19 10.5 13.6 12 12 17.5 10.4 12 5 10.5 10.4 9z" />
      <path d="M18 16.5 18.7 19l2.3.7-2.3.8-.7 2.4-.8-2.4-2.2-.8 2.2-.7z" />
    </>
  ),
  flame: (
    <>
      <path d="M12 21c3.5 0 6-2.3 6-5.6 0-3.6-3.2-5-4.2-8.4-.3-1-.3-2-.1-3-2.3 1-4 3-4.6 5.3-.4 1.5-.2 2.6.1 3.6-.9-.5-1.6-1.4-1.8-2.5C6.3 11.6 6 13.3 6 15.4 6 18.7 8.5 21 12 21Z" />
    </>
  ),
  bed: (
    <>
      <path d="M3 19v-8M3 13h18v6M21 19v-4.5a2.5 2.5 0 0 0-2.5-2.5H11v1.5" />
      <circle cx="7" cy="9.5" r="2" />
    </>
  ),
  desk: (
    <>
      <path d="M2.5 9.5h19M4.5 9.5V20M19.5 9.5V20" />
      <path d="M7.5 9.5V6a1.5 1.5 0 0 1 1.5-1.5h6A1.5 1.5 0 0 1 16.5 6v3.5" />
      <path d="M8 14h5" />
    </>
  ),
  chair: (
    <>
      <path d="M7 4.5h10l-.8 8H7.8z" />
      <path d="M6.5 12.5h11M9 16.5h6M12 12.5V21M9 21l1-4M15 21l-1-4" />
    </>
  ),
  books: (
    <>
      <path d="M4 4.5h4.5v15H4zM9.5 4.5H14v15H9.5z" />
      <path d="m15.4 5.3 3.9 1-3.4 13.6-3.9-1z" />
    </>
  ),
  wardrobe: (
    <>
      <rect x="4" y="2.5" width="16" height="17" rx="1.5" />
      <path d="M12 2.5v17M10 10v2M14 10v2M7 19.5V22M17 19.5V22" />
    </>
  ),
  drop: (
    <>
      <path d="M12 3.2c3.2 3.7 5.5 6.6 5.5 9.3a5.5 5.5 0 0 1-11 0c0-2.7 2.3-5.6 5.5-9.3Z" />
      <path d="M9.5 13.5a2.5 2.5 0 0 0 2.5 2.5" />
    </>
  ),
  bolt: (
    <>
      <path d="M13.5 2.5 5 13.5h5.5L10 21.5 19 10.5h-5.6z" />
    </>
  ),
  kitchen: (
    <>
      <path d="M6 2.5v7a2 2 0 0 0 2 2h.5v10M6 2.5v5M9 2.5v5" />
      <path d="M17 2.5c-1.7 0-2.5 2-2.5 5s.8 4 2.5 4v10" />
    </>
  ),
};

export function AmenityIcon({
  name,
  className,
}: {
  name: AmenityIconName;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("h-6 w-6", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {paths[name]}
    </svg>
  );
}
