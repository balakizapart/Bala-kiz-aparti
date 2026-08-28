# Bala Kız Apartı — Tasarım & Kod Sözleşmesi

> Bu dosya **bağlayıcıdır**. Yeni token, yeni renk, yeni font, yeni spacing
> ölçeği **tanımlanmaz** — `app/globals.css` içindekiler kullanılır.

## 1. Sanat yönü — "Canlı & Modern"

Hedef okuyucu iki kişi: odayı beğenecek öğrenci ve güvenliğe karar verecek
veli. Tasarım ikisine aynı anda konuşur — genç ve enerjik, ama ciddiyetsiz değil.

**Ton:** aydınlık, davetkâr, kendinden emin. Mor→pembe gradyan markanın imzası.

Öğrenci apartı sitelerinin klişeleri **yasak**: mavi gradyan, stok "mutlu
öğrenci" kolajı, karusel bannerlar, ikon ızgarası, "Neden Biz?" kutuları.

**İmza öğeleri**
- Lila-beyaz kağıt zemin (`cream`) + ince gren (`.grain`, `<body>`'de).
- `.grad` / `.grad-text` — mor→pembe→şeftali gradyan. Başlıklarda **son 1-2
  kelimede** kullanılır (`<SplitText gradientLastWords={2}>`), tamamında değil.
- Yavaşça nefes alan renk lekeleri (`<Blobs>`) bölüm zeminlerinde.
- Numaralı bölüm etiketleri: `<Eyebrow index="01">Odalar</Eyebrow>`.
- Cesur, sıkı `letter-spacing`'li Bricolage Grotesque başlıklar.
- Bol beyaz alan. Sıkışık bölüm = kötü bölüm.

## 2. Hareket

Animasyon burada dekor değil, tasarımın kendisi. Ama **her biri**
`prefers-reduced-motion`'a saygı duyar — primitive'ler bunu zaten halleder.

| Bileşen | Ne yapar |
|---|---|
| `Reveal` | Görünüme girince blur + yukarı kayma |
| `SplitText` | Başlığı kelime kelime maskeyle açar (sr-only tam metin verir) |
| `Parallax` | Kaydırmaya bağlı hafif kayma |
| `TiltCard` | İmleçle 3B eğilme (dokunmatikte kapalı) |
| `Magnetic` | Butonu imlece doğru çeker (`Button` içinde varsayılan açık) |
| `Counter` | Sayıyı 0'dan hedefe sayar — **SSR'de gerçek değeri basar** |
| `Marquee` | Sonsuz kayan şerit, hover'da durur |
| `Blobs` | Zeminde sürüklenen renk lekeleri |
| `ScrollProgress` | Sayfa üstünde gradyan ilerleme çubuğu |
| `Accordion` | SSS açılır satırları (`aria-expanded` + `region`) |

## 3. Token'lar (`app/globals.css`)

Renk: `ink`, `ink-soft`, `muted`, `line`, `cream`, `paper`, `lilac`, `blush`,
`grape`, `grape-deep`, `fuchsia`, `fuchsia-deep`, `peach`, `mint`, `sky`,
`whatsapp` → Tailwind'de `text-ink`, `bg-cream`, `border-line`, `bg-grape`…

**`whatsapp` rengi WhatsApp'ın markasıdır, değiştirilmez.** WhatsApp'a giden
her buton `variant="whatsapp"` kullanır.

Tipografi: `font-display` (Bricolage Grotesque) / `font-sans` (Plus Jakarta Sans).
Ölçek: `text-display`, `text-h1`, `text-h2`, `text-h3`, `text-lead`.
Etiket için `.eyebrow` sınıfı.

Boşluk: bölüm dolgusu `py-(--spacing-section)`.
Yarıçap: `rounded-(--radius-sm|md|lg|xl|pill)`.
Easing: `ease-(--ease-out-expo)`, `ease-(--ease-spring)`.

**Kural:** `text-[#hex]`, `text-purple-500`, `p-[73px]` gibi rastgele değer yok.

> **Dikkat — font değişkenleri:** `fontVars` `<html>` elemanında durur.
> `<body>`'ye taşınırsa `:root`'taki `--font-sans` / `--font-display`
> token'ları `--font-jakarta`'yı bulamaz, geçersize düşer ve site sistem
> fontuna iner. Sessiz bir hatadır; taşımayın.

## 4. Paylaşılan bileşenler — önce bunlara bak

`@/components/ui/primitives` → `Container`, `Section`, `Eyebrow`, `Reveal`,
`SplitText`, `Button`, `Magnetic`, `Counter`, `Stat`, `Marquee`, `Parallax`,
`TiltCard`, `Blobs`, `ScrollProgress`, `Accordion`
`@/components/ui/photo` → `Photo` (fotoğraf yoksa yer tutucu), `VideoBlock`
`@/components/pages/map-embed` → `MapEmbed` (tembel, sekmeli, iki bina)
`@/lib/utils` → `cn`, `formatDate`
`@/lib/site` → adres, telefon, koordinat, mesafeler, `waLink()`

## 5. İçerik & dil

- Varsayılan **tr**, ön eksiz: `/odalar`. İngilizce: `/en/odalar`.
  Slug'lar iki dilde de Türkçe (SEO Türkçe odaklı).
- Ortak metinler `messages/tr.ts` / `en.ts`. `tr` şemadır; `en` aynı
  anahtarları taşımazsa TypeScript hata verir.
- **Sayfaya özel metni oraya ekleme** — kendi bileşeninin içinde
  `const copy = { tr: {...}, en: {...} } as const;` olarak tut.
- Bağlantı üretirken `localePath(locale, "/odalar")`.
- **Sitede fiyat yazmaz.** Fiyat sorusu telefona yönlendirilir.

### Doğru bilgiler — uydurma

Bu maddeler işletmeden teyitlidir; değiştirmeden önce sorun:

- İki bina: Bala 1 (Akmescit Sk. No:4), Bala 2 (Aşçı Sk. No:6), 26170 Tepebaşı.
- Espark **tam karşıda**. Tramvay 1 dk, şehir merkezi 3 dk,
  Anadolu Üniversitesi 5 dk (yürüyerek), Osmangazi 12 dk (tramvayla).
- Odalar tek veya iki kişilik. **Her dairede** mutfak + beyaz eşya, banyo,
  ortak alan ve **çamaşır makinesi** var.
- Odada: yatak, çalışma masası, rahat sandalye, kitaplık, gardırop.
- **Ortak çamaşırhane YOK. Ortak etüt/ders çalışma salonu YOK.**
- **Kartlı giriş YOK.** En dış kapı, apartta kalan öğrencilere verilen
  **sensörlü anahtarlıkla** açılır.
- Görevli sabahtan **18.00'e kadar** binada. Nöbetleşe gece görevlisi YOK.
- Güvenlik: girişte ve **her katta 7/24 kamera**.
- **Giriş-çıkış saati YOK.**
- Misafir: **öğrencilerin girişinde ailelerinin yerleşmesi için** kabul edilir.
- Kuruluş yılı **bilinmiyor** — hiçbir yerde yıl yazmayın.

## 6. Teknik kurallar

- Next.js 16 App Router. `params` ve `searchParams` **Promise**'tir → `await`.
- Varsayılan Server Component. `"use client"` sadece gerçekten gerekince.
- Görsel: her zaman `<Photo>`, asla çıplak `<img>`.
- Erişilebilirlik pazarlığa kapalı: semantik başlık sırası, `alt`,
  odak halkası, `prefers-reduced-motion`, kontrast ≥ 4.5:1.
- Türkçe karakterler: `ı İ ğ Ğ ş Ş ç ö ü` — test metinlerinde mutlaka kullan.
- Veritabanı yok. Yeni veri gerekiyorsa `lib/` altına tipli bir dosya ekle.

## 7. Sayfa haritası

| Yol | İçerik |
|---|---|
| `/` | Ana sayfa |
| `/odalar` | Oda tipleri + daire + fiyat politikası |
| `/galeri` | Filtreli galeri + lightbox |
| `/konum` | İki adres, mesafeler, büyük harita, çevre |
| `/hakkimizda` | Yaklaşım, güvenlik, kurallar |
| `/sss` | Sık sorulan sorular (4 grup) |
| `/iletisim` | İletişim bilgileri + seçenekler + harita |
| `/on-kayit` | Ön kayıt formu (WhatsApp'a gider) |
| `/kvkk` | Aydınlatma metni (taslak) |

## 8. Kalite çıtası

Bitirmeden önce kendine sor: *Bu ekran Awwwards'a gönderilse jüri "şablon"
der mi?* Derse yeniden yap. Fark yaratan şey animasyon sayısı değil;
tipografi hiyerarşisi, boşluk cesareti ve detay tutarlılığıdır.
