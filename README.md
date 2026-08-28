# Bala Kız Apartı

Eskişehir Tepebaşı'ndaki kız öğrenci apartının web sitesi.

**Yığın:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind v4 · Vercel

Site **tamamen statiktir**: veritabanı, yönetim paneli, sunucu tarafı form
işleme yoktur. Tüm içerik kod içinde durur. Bu bilinçli bir karar — bakım
gerektirmez, çok hızlıdır ve bedava barındırılır.

---

## Kurulum

```bash
npm install
npm run dev
```

| Komut | Ne yapar |
|---|---|
| `npm run dev` | Geliştirme sunucusu (http://localhost:3000) |
| `npm run build` | Üretim derlemesi |
| `npm run typecheck` | TypeScript kontrolü |
| `npm run lint` | ESLint |
| `npm run qr` | Google yorum QR kodunu yeniden üretir |

Ortam değişkeni yalnızca bir tane ve yerelde **zorunlu değil**:
`NEXT_PUBLIC_SITE_URL` (bkz. `.env.example`).

---

## İçerik nerede düzenlenir?

Panel olmadığı için içerik doğrudan dosyalardan güncellenir.

| Ne değişecek | Hangi dosya |
|---|---|
| Telefon, e-posta, adres, koordinat, mesafeler | `lib/site.ts` |
| Oda tipleri, oda/daire donanımı, kirada olanlar | `lib/rooms.ts` |
| Galeri fotoğrafları ve alt metinleri | `lib/gallery.ts` |
| Menü, footer, butonlar (ortak metinler) | `messages/tr.ts` · `messages/en.ts` |
| Ana sayfa bölüm metinleri | `components/home/*.tsx` içindeki `copy` |
| Sayfa metinleri | `app/(site)/[locale]/*/page.tsx` içindeki `copy` |
| SSS soruları (tam liste) | `app/(site)/[locale]/sss/page.tsx` |
| SSS (ana sayfadaki kısa liste) | `components/home/faq-teaser.tsx` |
| Fotoğraf ve video ekleme | `public/images/README.md` |

**Kural:** Her metin `const copy = { tr: {...}, en: {...} }` biçiminde tutulur.
İki dili aynı anda güncelleyin; `messages/en.ts` eksik anahtar bırakırsa
TypeScript hata verir.

---

## Fiyat politikası

Sitede **hiçbir yerde fiyat yazmaz**. Fiyat sorusu her zaman telefona
yönlendirilir (`Fiyat için arayın`). Bu bilinçlidir: fiyat dönem başında
değişiyor ve arayan kişiyle konuşma şansı doğuyor.

Bunu değiştirmek isterseniz `lib/rooms.ts` içine alan eklemeniz ve
`components/home/rooms-showcase.tsx` ile `app/(site)/[locale]/odalar/page.tsx`
dosyalarını güncellemeniz gerekir.

---

## Ön kayıt formu

Form bir veritabanına yazmaz ve sunucuya veri göndermez. Gönderildiğinde,
girilen bilgilerle hazırlanmış bir **WhatsApp mesajı** ziyaretçinin kendi
cihazında açılır; mesajı okuyup gönderme kararı ziyaretçinindir.

Kod: `components/pages/inquiry-form.tsx`
Numara: `lib/site.ts` → `whatsapp`

İleride e-posta ile gönderime geçmek isterseniz bir servis (Resend, Web3Forms)
ve bir API anahtarı gerekir; form bileşenindeki `onSubmit` değişir.

---

## Google yorum QR kodu

Bina kapısına asılacak QR kod `public/qr-yorum-baski.svg` dosyasındadır
(çerçeveli, başlıklı, baskıya hazır vektör — istediğiniz boyuta büyütün).
Sitede footer'da gösterilen sade sürüm `public/qr-yorum.svg`.

QR doğrudan Google'a değil, **`balakizapart.com/yorum`** adresine bakar; oradan
Google'a yönlendirilir (`app/yorum/route.ts`). Böylece kod bir kez bastırılır ve
hedef sonradan değişse bile geçerli kalır.

**Yapılacak:** `lib/site.ts` içindeki `googlePlaceId` şu an boş. Doldurmadan
ziyaretçi işletmenin Google kaydına gider ve yorumu oradan yazar — çalışır ama
bir tık fazladır. Place ID'yi Google'ın
[Place ID Finder](https://developers.google.com/maps/documentation/places/web-service/place-id)
sayfasından alıp yapıştırdığınızda kod doğrudan "yorum yaz" ekranını açar.
QR'ı yeniden bastırmanız **gerekmez**.

> Bastırmadan önce telefonunuzla bir kez okutun — bu 5 saniyelik kontrolü atlamayın.

---

## Yayına alma (Vercel)

1. Projeyi bir Git deposuna gönderin.
2. https://vercel.com → Import Project → depoyu seçin.
3. Environment Variables: `NEXT_PUBLIC_SITE_URL` = `https://balakizapart.com`
4. Deploy.
5. Domain: Vercel → Settings → Domains → `balakizapart.com` ekleyin, gösterilen
   kayıtları alan adı sağlayıcınızda güncelleyin.
   **Eski hostingi hemen kapatmayın** — DNS yayılana kadar (24-48 saat) açık kalsın.

Yayın sonrası: Google Search Console doğrulaması + sitemap gönderimi, ve
**iki bina için ayrı Google Business Profile** kaydı. Yerel SEO'da tek başına
en büyük etken budur.

---

## Proje yapısı

```
app/
  (site)/[locale]/     Vitrin — tr ön eksiz (/odalar), en önekli (/en/odalar)
  not-found.tsx        404
  sitemap.ts robots.ts
components/
  ui/                  primitives (Container, Reveal, SplitText, Button,
                       Counter, Marquee, Parallax, TiltCard, Blobs, Accordion)
  site/                Header, Footer, mobil menü, dil değiştirici, WhatsApp
  home/ pages/         Sayfa bölümleri
  seo/                 JSON-LD şemaları
lib/
  site.ts              Adres, telefon, koordinat — TEK doğruluk kaynağı
  rooms.ts             Oda tipleri ve kirada olanlar
  gallery.ts           Galeri listesi
  seo.ts               pageMetadata() ve indekslenen yollar
DESIGN.md              Tasarım sözleşmesi — yeni geliştirici önce bunu okur
```

---

## Bilinçli olarak yapılmayanlar

| Ne | Neden |
|---|---|
| Yönetim paneli / veritabanı | İçerik nadiren değişiyor; statik site daha hızlı ve bakımsız |
| Sitede fiyat | Dönem başında değişiyor, telefonda konuşuluyor |
| Sunucuya kayıt olan form | Talep doğrudan WhatsApp'a düşüyor, arada kutu yok |
| Çerez rızası bandı | Analitik/izleme kurulmadı. **Google Analytics eklenirse zorunlu olur** |

---

## Notlar

- `DESIGN.md` bağlayıcıdır: yeni renk/spacing token'ı tanımlanmaz.
- `app/(site)/[locale]/kvkk/page.tsx` bir **taslaktır**; yayına almadan hukuk
  danışmanına gözden geçirtin.
- `lib/site.ts` içindeki `lat`/`lng` değerleri **tahmini**. Google Maps'te
  binaya sağ tıklayıp gerçek koordinatı alın — bu değerler `LodgingBusiness`
  yapısal verisine gidiyor ve yerel SEO'yu doğrudan etkiliyor.
- Font değişkenleri (`fontVars`) `<html>` üzerinde durmalı, `<body>` üzerinde
  değil. Sebebi `app/(site)/[locale]/layout.tsx` içinde yazılı.
