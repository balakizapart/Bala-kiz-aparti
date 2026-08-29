import type { AmenityIconName } from "@/components/ui/amenity-icon";
import type { Locale } from "./i18n";

/* ============================================================
   OLANAKLAR: dairede ve odada ne var.

   Her maddenin kendi rengi var; renkler globals.css token'larından
   seçilmiştir (yeşil-gold palet + aksanlar). `tint` kartın zeminidir,
   `ink` ikonun rengidir. Yeni renk uydurmayın, listeden seçin.
   ============================================================ */

export type Amenity = {
  icon: AmenityIconName;
  label: Record<Locale, string>;
  note: Record<Locale, string>;
  /** İkon rengi */
  ink: string;
  /** İkon kutusunun zemini */
  tint: string;
};

/** Dairede olanlar - ortak alanı ilgilendiren her şey. */
export const flatAmenities: Amenity[] = [
  {
    icon: "wifi",
    ink: "#2563eb",
    tint: "#e3edff",
    label: { tr: "İnternet", en: "Internet" },
    note: { tr: "Sınırsız, her dairede", en: "Unlimited, in every flat" },
  },
  {
    icon: "tv",
    ink: "#013a3e",
    tint: "#e7efee",
    label: { tr: "Televizyon", en: "Television" },
    note: { tr: "Her dairede TV", en: "A TV in every flat" },
  },
  {
    icon: "stove",
    ink: "#ea580c",
    tint: "#ffeade",
    label: { tr: "Ocak", en: "Cooker" },
    note: { tr: "Mutfakta hazır", en: "Ready in the kitchen" },
  },
  {
    icon: "fridge",
    ink: "#0d9488",
    tint: "#d9f5f1",
    label: { tr: "Buzdolabı", en: "Fridge" },
    note: { tr: "Beyaz eşya dahil", en: "White goods included" },
  },
  {
    icon: "washer",
    ink: "#0284c7",
    tint: "#ddeffd",
    label: { tr: "Çamaşır Makinesi", en: "Washing Machine" },
    note: { tr: "Dairenin içinde, sıra yok", en: "Inside the flat, no queue" },
  },
  {
    icon: "kitchen",
    ink: "#c2410c",
    tint: "#ffe8dc",
    label: { tr: "Mutfak Takımı", en: "Kitchenware" },
    note: { tr: "Kurulu ve kullanıma hazır", en: "Set up and ready to use" },
  },
  {
    icon: "shower",
    ink: "#a97e2d",
    tint: "#f7f0e0",
    label: { tr: "7/24 Sıcak Su", en: "24/7 Hot Water" },
    note: { tr: "Sabah da gece de", en: "Morning and night" },
  },
  {
    icon: "flame",
    ink: "#dc2626",
    tint: "#ffe2e2",
    label: { tr: "Doğalgaz Isıtma", en: "Gas Heating" },
    note: { tr: "Kışın oda soğuk kalmaz", en: "Rooms stay warm in winter" },
  },
  {
    icon: "sparkle",
    ink: "#0f9d76",
    tint: "#dcf6ec",
    label: { tr: "Daire Temizliği", en: "Flat Cleaning" },
    note: { tr: "Düzenli olarak yapılır", en: "Done regularly" },
  },
  {
    icon: "camera",
    ink: "#3f5b57",
    tint: "#e6edeb",
    label: { tr: "7/24 Güvenlik Kamerası", en: "24/7 Security Cameras" },
    note: { tr: "Girişte ve her katta", en: "At the entrance and every floor" },
  },
  {
    icon: "key",
    ink: "#b45309",
    tint: "#fdefd6",
    label: { tr: "Sensörlü Anahtarlık", en: "Sensor Key Fob" },
    note: { tr: "Dış kapı sadece sakinlere", en: "Outer door, residents only" },
  },
  {
    icon: "drop",
    ink: "#0891b2",
    tint: "#d9f2f8",
    label: { tr: "Su & Elektrik", en: "Water & Electricity" },
    note: { tr: "Ayrı fatura yok, kirada", en: "No separate bill, it is in the rent" },
  },
];

/** Odada olanlar - her öğrencinin kendi alanı. */
export const roomAmenities: Amenity[] = [
  {
    icon: "tv",
    ink: "#013a3e",
    tint: "#e7efee",
    label: { tr: "Televizyon", en: "Television" },
    note: { tr: "Her dairede TV", en: "A TV in every flat" },
  },
  {
    icon: "bed",
    ink: "#013a3e",
    tint: "#e7efee",
    label: { tr: "Yatak", en: "Bed" },
    note: { tr: "Tek kişilik, hazır", en: "Single, made up" },
  },
  {
    icon: "desk",
    ink: "#2563eb",
    tint: "#e3edff",
    label: { tr: "Çalışma Masası", en: "Study Desk" },
    note: { tr: "Odanın içinde", en: "In your own room" },
  },
  {
    icon: "chair",
    ink: "#a97e2d",
    tint: "#f7f0e0",
    label: { tr: "Rahat Sandalye", en: "Comfortable Chair" },
    note: { tr: "Uzun saatler için", en: "For the long hours" },
  },
  {
    icon: "books",
    ink: "#ea580c",
    tint: "#ffeade",
    label: { tr: "Kitaplık", en: "Bookshelf" },
    note: { tr: "Kitapların elinin altında", en: "Books within reach" },
  },
  {
    icon: "wardrobe",
    ink: "#0d9488",
    tint: "#d9f5f1",
    label: { tr: "Gardırop", en: "Wardrobe" },
    note: { tr: "Kendine ait dolap", en: "A wardrobe of your own" },
  },
  {
    icon: "bolt",
    ink: "#b45309",
    tint: "#fdefd6",
    label: { tr: "Tamamen Eşyalı", en: "Fully Furnished" },
    note: { tr: "Valizinle geliyorsun", en: "Just bring your suitcase" },
  },
];
