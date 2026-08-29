// ÜRETİLMİŞ DOSYA - elle düzenlemeyin.
// Yeniden üretmek için: npm run images
//
// public/images altındaki her görselin gerçek [genişlik, yükseklik] değeri.
// <Photo> bunu kullanarak fotoğrafı kendi oranında, kırpmadan basar.

export const imageSizes: Record<string, [number, number]> = {
  "/images/banyo-1.jpg": [1195, 896],
  "/images/banyo-2.jpg": [896, 1195],
  "/images/bina-1-giris-2.jpg": [1536, 2048],
  "/images/bina-1-giris.jpg": [1536, 2048],
  "/images/bina-2-giris.jpg": [1692, 2048],
  "/images/iki-kisilik-1.webp": [1268, 953],
  "/images/mutfak-1.jpg": [1195, 896],
  "/images/mutfak-2.jpg": [896, 1195],
  "/images/mutfak-3.jpg": [2048, 1536],
  "/images/mutfak-4.jpg": [2048, 1536],
  "/images/mutfak-5.jpg": [1536, 2048],
  "/images/tek-kisilik-1.jpg": [896, 1195],
  "/images/tek-kisilik-2.jpg": [1195, 896],
  "/images/tek-kisilik-3.jpg": [1600, 1200],
  "/images/tek-kisilik-4.jpg": [2048, 1536],
  "/images/tek-kisilik-best-1.jpg": [2048, 1536],
  "/images/tek-kisilik-best-2.jpg": [2076, 1422],
};

/** Verilen yol için [genişlik, yükseklik]; bilinmiyorsa null. */
export function sizeOf(src: string | null | undefined): [number, number] | null {
  if (!src) return null;
  return imageSizes[src] ?? null;
}
