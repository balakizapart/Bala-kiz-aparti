// Tek doğruluk kaynağı: işletme bilgileri.
// Her yerde buradan okunur (SEO, footer, JSON-LD, iletişim, harita).
export const site = {
  name: "Bala Kız Apartı",
  legalName: "Bala Kız Apartı",
  domain: "balakizapart.com",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://balakizapart.com",
  phone: "+905413862600",
  phoneDisplay: "+90 541 386 26 00",
  whatsapp: "905413862600",
  email: "iletisim@balakizapart.com",
  email2: "balakizapart@gmail.com",
  instagram: "https://www.instagram.com/balakizapart",
  city: "Eskişehir",
  district: "Tepebaşı",

  buildings: [
    {
      id: "bala-1",
      name: "Bala 1",
      street: "Eskibağlar Mahallesi, Akmescit Sokak No:4",
      district: "Tepebaşı",
      city: "Eskişehir",
      postalCode: "26170",
      lat: 39.7757,
      lng: 30.5142,
      maps: "https://www.google.com/maps/search/?api=1&query=Bala+K%C4%B1z+Apart+Akmescit+Sokak+No:4+Tepeba%C5%9F%C4%B1+Eski%C5%9Fehir",
      directions:
        "https://www.google.com/maps/dir/?api=1&destination=Bala+K%C4%B1z+Apart+Akmescit+Sokak+No%3A4+Tepeba%C5%9F%C4%B1+Eski%C5%9Fehir",
    },
    {
      id: "bala-2",
      name: "Bala 2",
      street: "Eskibağlar Mahallesi, Aşçı Sokak No:6",
      district: "Tepebaşı",
      city: "Eskişehir",
      postalCode: "26170",
      lat: 39.7762,
      lng: 30.5133,
      maps: "https://www.google.com/maps/search/?api=1&query=A%C5%9F%C3%A7%C4%B1+Sokak+No:6+Tepeba%C5%9F%C4%B1+Eski%C5%9Fehir",
      directions:
        "https://www.google.com/maps/dir/?api=1&destination=A%C5%9F%C3%A7%C4%B1+Sokak+No%3A6+Tepeba%C5%9F%C4%B1+Eski%C5%9Fehir",
    },
  ],

  /** Gömülü harita - iki binanın da bulunduğu Akmescit / Eskibağlar bölgesi. */
  mapEmbed:
    "https://www.google.com/maps?q=Bala+K%C4%B1z+Apart+Akmescit+Sokak+Tepeba%C5%9F%C4%B1+Eski%C5%9Fehir&z=17&output=embed",

  /** Yürüme mesafeleri - SEO ve konum bölümü. */
  proximity: [
    { key: "espark", minutes: 1, tr: "Espark AVM", en: "Espark Mall", noteTr: "tam karşımızda", noteEn: "right across the street" },
    { key: "tram", minutes: 1, tr: "Tramvay durağı", en: "Tram stop", noteTr: "her yere aktarmasız", noteEn: "no transfers needed" },
    { key: "center", minutes: 3, tr: "Şehir merkezi", en: "City centre", noteTr: "Adalar ve Köprübaşı", noteEn: "Adalar and Köprübaşı" },
    { key: "anadolu", minutes: 5, tr: "Anadolu Üniversitesi", en: "Anadolu University", noteTr: "yürüyerek", noteEn: "on foot" },
    { key: "osmangazi", minutes: 12, tr: "Osmangazi Üniversitesi", en: "Osmangazi University", noteTr: "tramvayla", noteEn: "by tram" },
  ],
} as const;

export type Building = (typeof site.buildings)[number];

/** Ön doldurulmuş WhatsApp bağlantısı üretir. */
export function waLink(message: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

/* ============================================================
   GOOGLE YORUMLARI

   QR kod doğrudan Google'a değil, kendi sitemizdeki /yorum
   adresine bakar; oradan Google'a yönlendirilir. Sebebi:
   QR bir kez bastırılıp bina kapısına asılacak. Hedef adres
   sonradan değişirse (Place ID gelince, işletme taşınırsa)
   QR'ı yeniden bastırmak gerekmez - sadece bu dosya değişir.

   ⚠️ PLACE ID BOŞ. Doldurulunca ziyaretçi doğrudan "yorum yaz"
   ekranına düşer. Almak için:
   https://developers.google.com/maps/documentation/places/web-service/place-id
   sayfasındaki "Place ID Finder" kutusuna "Bala Kız Apart" yazın,
   haritada işletmeyi seçin, çıkan ChIJ... kodunu buraya yapıştırın.
   Boş kaldığı sürece ziyaretçi işletmenin Google kaydına gider ve
   yorumu oradan yazar - çalışır, sadece bir tık fazladır.
   ============================================================ */
export const googlePlaceId = "ChIJd5BJ4LEVzBQRfj3Wol24znE";

export function googleReviewUrl(): string {
  return googlePlaceId
    ? `https://search.google.com/local/writereview?placeid=${googlePlaceId}`
    : "https://www.google.com/maps/search/?api=1&query=Bala+K%C4%B1z+Apart+Tepeba%C5%9F%C4%B1+Eski%C5%9Fehir";
}

/** QR kodun işaret ettiği adres - bastırılan şey budur. */
export const reviewShortUrl = `${site.url.replace(/\/$/, "")}/yorum`;
