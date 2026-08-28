# Fotoğraflar

Dosyalar `Desktop\bala fotolar site` klasöründen buraya kopyalandı ve
adları sadeleştirildi. **Dosya adlarında Türkçe karakter ve boşluk
kullanmayın** — adres satırında `%20`, `%C5%9F` gibi bozuk görünüyor ve
bazı sunucularda sorun çıkarıyor.

## Eşleşme tablosu

| Buradaki ad | Orijinal ad |
|---|---|
| `bina-1-giris.jpg` | bala apart 1 giriş.jpg |
| `bina-1-giris-2.jpg` | bala apart 1 giriş ekstra.jpg |
| `bina-2-giris.jpg` | bala apart 2 giriş.jpg |
| `banyo-1.jpg` | Banyo.jpg |
| `banyo-2.jpg` | banyo 2.jpg |
| `mutfak-1.jpg` | mutfak.jpg |
| `mutfak-2.jpg` | mutfak 2.jpg |
| `mutfak-3.jpg` | mutfak 3.jpg |
| `mutfak-4.jpg` | mutfak 4.jpg |
| `mutfak-5.jpg` | mutfak 5.jpg |
| `tek-kisilik-1.jpg` | Tek kişilik oda 1.jpg |
| `tek-kisilik-2.jpg` | tek kişilik oda 2.jpg |
| `tek-kisilik-3.jpg` | tek kişilik oda 3.jpg |
| `tek-kisilik-4.jpg` | tek kişilik oda 4.jpg |
| `tek-kisilik-best-1.jpg` | tek kişilik oda best.jpg |
| `tek-kisilik-best-2.jpg` | tek kişilik oda best 2.jpg |

## Hangi fotoğraf nerede kullanılıyor?

**Ana sayfa hero** (`components/home/hero.tsx` → `PHOTOS`)
`bina-2-giris` · `tek-kisilik-best-1` · `mutfak-1`

**02 Odalar** (`lib/rooms.ts` → `photos[].src`)
- Tek kişilik: `tek-kisilik-1` · `mutfak-4` · `banyo-2`
- İki kişilik: `iki-kisilik-1` · `mutfak-2` · `banyo-1`

**04 Daire** (`components/home/life-strip.tsx` → `PHOTOS`)
`mutfak-5` · `banyo-1`

**Galeri** (`lib/gallery.ts`)
- Tek Kişilik Oda: `tek-kisilik-best-1`, `best-2`, `1`, `2`, `3`, `4`,
  `mutfak-1`, `mutfak-2`, `mutfak-4`, `banyo-1`, `banyo-2`
- İki Kişilik Oda: `iki-kisilik-1`, `mutfak-5`, `mutfak-1`, `banyo-2`
- Bina & Çevre: `bina-1-giris`, `bina-1-giris-2`, `bina-2-giris`

**Hakkımızda** (`app/(site)/[locale]/hakkimizda/page.tsx`)
`bina-1-giris` · `bina-2-giris`  *(ortak alan yuvası kaldırıldı)*

## Önemli: kırpma yok

`<Photo>` gerçek fotoğrafı **kendi en-boy oranında** basar, kırpmaz. Boyutlar
`lib/image-sizes.ts` dosyasından okunur.

**Yeni fotoğraf ekledikten sonra `npm run images` çalıştırın.** Aksi halde
boyut bilinmediği için fotoğraf yedek yola düşer ve kırpılır.

## Logo

`logo-kaynak.png` bir ekran görüntüsü kırpmasıydı: saydam değildi, gri zemini
ve siyah kenar çizgisi vardı. `npm run logo` bunu temizleyip iki dosya üretir:

- `public/logo.png` → başlıktaki yatay logo (saydam)
- `app/icon.png` → kare favicon (b harfi + kız silüeti)

⚠️ Bu bir **onarım**. Gerçek logo dosyasını (tercihen SVG) bulup
`logo-kaynak.png` yerine koyarsanız sonuç çok daha temiz olur.

`mutfak-3.jpg` kopyalandı ama hiçbir yere atanmadı; istenirse kullanılabilir.

## Video

`public/videos/tanitim.mp4` olarak konur, sonra
`components/home/rooms-showcase.tsx` en altındaki `VIDEO_SRC` ve
`VIDEO_POSTER` sabitleri doldurulur. 20 MB'ı geçerse YouTube'a yükleyip
gömmek gerekir.

## İpuçları

- Fotoğrafları 2000px genişliğin altına indirin; `next/image` gerisini halleder.
- Her galeri görselinin `alt` metnini Türkçe **ve** İngilizce yazın.
- Yüzü görünen kişilerden yazılı izin alın (KVKK).
