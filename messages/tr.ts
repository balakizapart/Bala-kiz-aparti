// PAYLAŞILAN metinler (navigasyon, footer, ortak CTA'lar).
// KURAL: Sayfaya özel uzun metinleri buraya ekleme - kendi bileşeninin
// içinde `const copy = { tr: {...}, en: {...} }` olarak tut.
const tr = {
  locale: "tr",
  nav: {
    home: "Ana Sayfa",
    rooms: "Odalar",
    gallery: "Galeri",
    location: "Konum",
    about: "Hakkımızda",
    faq: "S.S.S.",
    contact: "İletişim",
    reserve: "Ön Kayıt",
    menu: "Menü",
    close: "Kapat",
  },
  cta: {
    reserve: "Ön Kayıt",
    call: "Hemen Ara",
    whatsapp: "WhatsApp'tan Yaz",
    directions: "Yol Tarifi Al",
    openMap: "Haritada Aç",
    viewRooms: "Odaları Gör",
    viewGallery: "Galeriyi Gör",
    allPhotos: "Tüm Fotoğraflar",
    more: "Devamı",
    back: "Geri",
    send: "Gönder",
  },
  labels: {
    capacity: "Kapasite",
    features: "Özellikler",
    building: "Bina",
    phone: "Telefon",
    email: "E-posta",
    address: "Adres",
    minutes: "dk",
    inRoom: "Odada",
    inFlat: "Dairede",
  },
  footer: {
    tagline: "Eskişehir'in tam merkezinde, Espark'ın karşısında bir ev.",
    quickLinks: "Hızlı Bağlantılar",
    contactUs: "Bize Ulaşın",
    ourBuildings: "Binalarımız",
    rights: "Tüm hakları saklıdır.",
    kvkk: "KVKK Aydınlatma Metni",
  },
  a11y: {
    skipToContent: "İçeriğe geç",
    scrollDown: "Aşağı kaydır",
    changeLanguage: "Dili değiştir",
    openGallery: "Galeriyi aç",
    previous: "Önceki",
    next: "Sonraki",
    newTab: "yeni sekmede açılır",
  },
} as const;

export default tr;

/**
 * tr sözlüğü şemadır. `as const` yaprakları birebir metne daraltır; bu tip
 * onları tekrar `string`e genişletir ki en.ts aynı ANAHTARLARI taşımak
 * zorunda kalsın ama aynı DEĞERLERİ değil. Eksik/fazla anahtar tip hatası verir.
 */
type Widen<T> = { [K in keyof T]: T[K] extends string ? string : Widen<T[K]> };
export type Dict = Widen<typeof tr>;
