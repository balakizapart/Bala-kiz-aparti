import type { Locale } from "./i18n";

/* ============================================================
   GALERİ: statik liste.

   Fotoğraf eklemek için: dosyayı `public/images/` altına koyun ve
   aşağıya `src: "/images/dosya-adi.jpg"` ile bir satır ekleyin.
   `src` boş bırakılan satır kırık görsel göstermez; yerine renkli
   bir yer tutucu çizilir.

   Dosya adlarında Türkçe karakter ve boşluk KULLANMAYIN; adres
   satırında bozuluyor. `tek-kisilik-1.jpg` gibi sade adlar verin.

   Kategori anahtarları `lib/rooms.ts` içindeki `slug` değerleriyle
   BİREBİR aynı olmalı; oda bölümündeki "Fotoğrafları gör" butonu
   galeriyi bu anahtarla filtreliyor.

   Alt metin (`alt`) ZORUNLUDUR: ekran okuyucular ve Google Görseller
   için. İki dilde de yazın, boş bırakmayın.
   ============================================================ */

export const galleryCategories = [
  { key: "all", tr: "Tümü", en: "All" },
  { key: "tek-kisilik", tr: "Tek Kişilik Oda", en: "Single Room" },
  { key: "iki-kisilik", tr: "İki Kişilik Oda", en: "Twin Room" },
  { key: "exterior", tr: "Bina & Çevre", en: "Building & Around" },
] as const;

export type GalleryCategory = (typeof galleryCategories)[number]["key"];

export type GalleryItem = {
  /** `public/images/...` altındaki yol. Yoksa yer tutucu çizilir. */
  src?: string;
  category: Exclude<GalleryCategory, "all">;
  alt: Record<Locale, string>;
};

export const gallery: GalleryItem[] = [
  /* ---------- 1) TEK KİŞİLİK ODA ---------- */
  {
    src: "/images/tek-kisilik-best-1.jpg",
    category: "tek-kisilik",
    alt: {
      tr: "Tek kişilik oda, pencere kenarında çalışma masası ve gardırop",
      en: "Single room with a desk by the window and a wardrobe",
    },
  },
  {
    src: "/images/tek-kisilik-best-2.jpg",
    category: "tek-kisilik",
    alt: {
      tr: "Tek kişilik oda, aydınlık pencere ve çalışma köşesi",
      en: "Single room with a bright window and study corner",
    },
  },
  {
    src: "/images/tek-kisilik-1.jpg",
    category: "tek-kisilik",
    alt: {
      tr: "Tek kişilik oda, yatak ve gardırop",
      en: "Single room with bed and wardrobe",
    },
  },
  {
    src: "/images/tek-kisilik-2.jpg",
    category: "tek-kisilik",
    alt: {
      tr: "Tek kişilik oda, çalışma masası ve kitaplık",
      en: "Single room with desk and bookshelf",
    },
  },
  {
    src: "/images/tek-kisilik-3.jpg",
    category: "tek-kisilik",
    alt: {
      tr: "Tek kişilik oda, yatak ve çalışma sandalyesi",
      en: "Single room with bed and study chair",
    },
  },
  {
    src: "/images/tek-kisilik-4.jpg",
    category: "tek-kisilik",
    alt: {
      tr: "Tek kişilik oda, televizyon ve gardırop",
      en: "Single room with television and wardrobe",
    },
  },
  {
    src: "/images/mutfak-1.jpg",
    category: "tek-kisilik",
    alt: {
      tr: "Dairenin mutfağı, ocak ve çamaşır makinesi",
      en: "The flat's kitchen with cooker and washing machine",
    },
  },
  {
    src: "/images/mutfak-2.jpg",
    category: "tek-kisilik",
    alt: {
      tr: "Mutfak, buzdolabı ve yemek masası",
      en: "Kitchen with fridge and dining table",
    },
  },
  {
    src: "/images/mutfak-4.jpg",
    category: "tek-kisilik",
    alt: {
      tr: "Mutfak tezgâhı, ocak ve dolaplar",
      en: "Kitchen worktop, cooker and cabinets",
    },
  },
  {
    src: "/images/banyo-1.jpg",
    category: "tek-kisilik",
    alt: { tr: "Daire banyosu, duş kabini ve lavabo", en: "Flat bathroom with shower cabin and basin" },
  },
  {
    src: "/images/banyo-2.jpg",
    category: "tek-kisilik",
    alt: { tr: "Daire banyosu, duş kabini", en: "Flat bathroom with shower cabin" },
  },

  /* ---------- 2) İKİ KİŞİLİK ODA ---------- */
  {
    src: "/images/iki-kisilik-1.webp",
    category: "iki-kisilik",
    alt: {
      tr: "İki kişilik oda, iki yatak ve iki çalışma masası",
      en: "Twin room with two beds and two study desks",
    },
  },
  {
    src: "/images/mutfak-5.jpg",
    category: "iki-kisilik",
    alt: { tr: "Dairenin mutfağı, buzdolabı ve ocak", en: "The flat's kitchen with fridge and cooker" },
  },
  {
    src: "/images/mutfak-1.jpg",
    category: "iki-kisilik",
    alt: { tr: "Mutfakta ocak, tezgâh ve çamaşır makinesi", en: "Cooker, worktop and washing machine in the kitchen" },
  },
  {
    src: "/images/banyo-2.jpg",
    category: "iki-kisilik",
    alt: { tr: "Daire banyosu, duş kabini", en: "Flat bathroom with shower cabin" },
  },

  /* ---------- 3) BİNA & ÇEVRE ---------- */
  {
    src: "/images/bina-1-giris.jpg",
    category: "exterior",
    alt: { tr: "Bala 1 girişi, Akmescit Sokak", en: "Bala 1 entrance on Akmescit Street" },
  },
  {
    src: "/images/bina-1-giris-2.jpg",
    category: "exterior",
    alt: { tr: "Bala 1 bina cephesi ve sokak", en: "Bala 1 façade and the street" },
  },
  {
    src: "/images/bina-2-giris.jpg",
    category: "exterior",
    alt: { tr: "Bala 2 girişi, Aşçı Sokak", en: "Bala 2 entrance on Aşçı Street" },
  },
];

export function galleryFor(category: GalleryCategory): GalleryItem[] {
  return category === "all" ? gallery : gallery.filter((g) => g.category === category);
}
