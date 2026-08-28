import type { Locale } from "./i18n";

/* ============================================================
   ODA TİPLERİ: tek doğruluk kaynağı.

   Yerleşim: her daire kendi içinde bir ev. Dairede mutfak, ortak
   alan, banyo ve çamaşır makinesi var; odalar dairenin içinde.
   Fiyat BİLİNÇLİ olarak yok; her dönem değişiyor, telefonda
   konuşuluyor. Rakam eklemeyin; `Fiyat için arayın` akışı bozulur.
   ============================================================ */

export type RoomType = {
  slug: string;
  /** Vitrin sıralamasında kullanılan kısa numara. */
  index: string;
  name: Record<Locale, string>;
  /** Kart ve bölüm başlığı altındaki tek cümlelik özet. */
  tagline: Record<Locale, string>;
  body: Record<Locale, string[]>;
  /** Odanın içinde ne var. */
  inRoom: Record<Locale, string[]>;
  /** Dairenin ortak bölümünde ne var. */
  inFlat: Record<Locale, string[]>;
  /** Kime uygun. */
  bestFor: Record<Locale, string>;
  /** public/images altına konacak fotoğraflar (henüz yoksa yer tutucu çizilir). */
  photos: Array<{ src?: string; caption: Record<Locale, string> }>;
  /** public/videos altına konacak tanıtım videosu (opsiyonel). */
  video?: { src: string; poster?: string };
};

export const roomTypes: RoomType[] = [
  {
    slug: "tek-kisilik",
    index: "01",
    name: { tr: "Tek Kişilik Oda", en: "Single Room" },
    tagline: {
      tr: "Kapısını kendin kapatıyorsun.",
      en: "A door you close behind you.",
    },
    body: {
      tr: [
        "Her dairede iki tane tek kişilik oda var. Oda tamamen senin: yatağın, masan, dolabın, kitaplığın. Ders çalışmak için başka bir yere gitmene gerek yok, çalışma alanın odanın içinde.",
        "Dairenin geri kalanı ikinizin: mutfak, ortak alan ve banyo. Beyaz eşyalar dahil, çamaşır makinesi dairenin içinde, çamaşır için sıraya girmiyorsun.",
      ],
      en: [
        "Each flat has two single rooms. The room is entirely yours: your bed, your desk, your wardrobe, your bookshelf. You do not need to go anywhere else to study; your workspace is in the room.",
        "The rest of the flat is shared between the two of you: kitchen, living area and bathroom. White goods are included and the washing machine is inside the flat, so there is never a queue.",
      ],
    },
    inRoom: {
      tr: ["Tek kişilik yatak", "Çalışma masası", "Rahat çalışma sandalyesi", "Kitaplık", "Gardırop"],
      en: ["Single bed", "Study desk", "Comfortable study chair", "Bookshelf", "Wardrobe"],
    },
    inFlat: {
      tr: ["Mutfak ve beyaz eşyalar", "Çamaşır makinesi", "Banyo", "Ortak oturma alanı"],
      en: ["Kitchen with white goods", "Washing machine", "Bathroom", "Shared living area"],
    },
    bestFor: {
      tr: "Kendi alanını isteyen, sessizlikte daha iyi çalışan öğrenciler için.",
      en: "For students who want their own space and work better in quiet.",
    },
    photos: [
      { src: "/images/tek-kisilik-1.jpg", caption: { tr: "Tek kişilik oda", en: "Single room" } },
      { src: "/images/mutfak-4.jpg", caption: { tr: "Dairenin mutfağı", en: "The flat's kitchen" } },
      { src: "/images/banyo-2.jpg", caption: { tr: "Daire banyosu", en: "Flat bathroom" } },
    ],
  },
  {
    slug: "iki-kisilik",
    index: "02",
    name: { tr: "İki Kişilik Oda", en: "Twin Room" },
    tagline: {
      tr: "Yalnız kalmak istemeyenler için.",
      en: "For those who would rather not be alone.",
    },
    body: {
      tr: [
        "Odada iki yatak ve her eşyadan iki tane var: iki çalışma masası, iki sandalye, iki kitaplık, iki gardırop. Kimse kimsenin köşesini paylaşmıyor, ikinizin de kendi düzeni oluyor.",
        "Daire kurulumu aynı: mutfak, ortak alan, banyo ve çamaşır makinesi içeride. İlk yılında yalnız kalmak istemeyenler ve daha uygun bir bütçe arayanlar genelde burayı seçiyor.",
      ],
      en: [
        "The room has two beds and two of everything: two desks, two chairs, two bookshelves, two wardrobes. Nobody shares a corner; each of you keeps your own setup.",
        "The flat is arranged the same way: kitchen, living area, bathroom and washing machine inside. Students in their first year, and anyone looking for a friendlier budget, usually choose this one.",
      ],
    },
    inRoom: {
      tr: ["İki tek kişilik yatak", "İki çalışma masası", "İki çalışma sandalyesi", "İki kitaplık", "İki gardırop"],
      en: ["Two single beds", "Two study desks", "Two study chairs", "Two bookshelves", "Two wardrobes"],
    },
    inFlat: {
      tr: ["Mutfak ve beyaz eşyalar", "Çamaşır makinesi", "Banyo", "Ortak oturma alanı"],
      en: ["Kitchen with white goods", "Washing machine", "Bathroom", "Shared living area"],
    },
    bestFor: {
      tr: "İlk yılında yalnız kalmak istemeyenler ve daha uygun bütçe arayanlar için.",
      en: "For first-year students who prefer company, and for a friendlier budget.",
    },
    photos: [
      { src: "/images/iki-kisilik-1.webp", caption: { tr: "İki kişilik oda", en: "Twin room" } },
      { src: "/images/mutfak-2.jpg", caption: { tr: "Dairenin mutfağı", en: "The flat's kitchen" } },
      { src: "/images/banyo-1.jpg", caption: { tr: "Daire banyosu", en: "Flat bathroom" } },
    ],
  },
];

/* Kirada ne var: her iki oda tipi için de geçerli. */
export const included: Record<Locale, Array<{ t: string; d: string }>> = {
  tr: [
    { t: "İnternet", d: "Sınırsız bağlantı, her dairede." },
    { t: "Su", d: "Ayrı fatura yok, kirada." },
    { t: "Elektrik", d: "Ayrı fatura yok, kirada." },
    { t: "Doğalgaz", d: "Isınma ve sıcak su dahil." },
    { t: "Beyaz eşyalar", d: "Mutfak takımı ve çamaşır makinesi dairede." },
    { t: "Mobilya", d: "Odalar tamamen eşyalı; valizinle geliyorsun." },
  ],
  en: [
    { t: "Internet", d: "Unlimited connection in every flat." },
    { t: "Water", d: "No separate bill, it is in the rent." },
    { t: "Electricity", d: "No separate bill, it is in the rent." },
    { t: "Gas", d: "Heating and hot water included." },
    { t: "White goods", d: "Kitchen appliances and a washing machine in the flat." },
    { t: "Furniture", d: "Rooms are fully furnished; just bring your suitcase." },
  ],
};
