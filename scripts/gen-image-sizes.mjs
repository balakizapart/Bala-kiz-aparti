/**
 * Görsel boyut listesi üretici — `npm run images`
 *
 * `public/images/` altındaki her dosyanın gerçek genişlik/yüksekliğini
 * okuyup `lib/image-sizes.ts` dosyasına yazar.
 *
 * Neden gerekli: fotoğraflar sabit bir orana zorlanırsa kenarlarından
 * kırpılıyor (yatay bir kare dikey çerçeveye sığmıyor). Gerçek boyutu
 * bilince `<Photo>` fotoğrafı kendi oranında, kırpmadan basabiliyor.
 * Ayrıca tarayıcı yeri baştan ayırdığı için sayfa zıplamıyor.
 *
 * Yeni fotoğraf ekledikten sonra bu komutu çalıştırmayı unutmayın.
 */
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const DIR = "public/images";

/** JPEG / PNG / WebP başlığından boyut okur; kütüphane gerekmiyor. */
function dimensions(buf) {
  // PNG: IHDR her zaman ilk chunk
  if (buf[0] === 0x89 && buf[1] === 0x50) {
    return [buf.readUInt32BE(16), buf.readUInt32BE(20)];
  }

  // WebP: RIFF konteyneri, üç varyant
  if (buf.slice(0, 4).toString() === "RIFF" && buf.slice(8, 12).toString() === "WEBP") {
    const format = buf.slice(12, 16).toString();
    if (format === "VP8X") return [1 + buf.readUIntLE(24, 3), 1 + buf.readUIntLE(27, 3)];
    if (format === "VP8 ") return [buf.readUInt16LE(26) & 0x3fff, buf.readUInt16LE(28) & 0x3fff];
    if (format === "VP8L") {
      const bits = buf.readUInt32LE(21);
      return [(bits & 0x3fff) + 1, ((bits >> 14) & 0x3fff) + 1];
    }
    return null;
  }

  // JPEG: SOF işaretçisini ara
  let i = 2;
  while (i < buf.length - 9) {
    if (buf[i] !== 0xff) {
      i++;
      continue;
    }
    const marker = buf[i + 1];
    const isSOF = marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc;
    if (isSOF) return [buf.readUInt16BE(i + 7), buf.readUInt16BE(i + 5)];
    i += 2 + buf.readUInt16BE(i + 2);
  }
  return null;
}

const files = readdirSync(DIR)
  .filter((f) => /\.(jpe?g|png|webp|avif)$/i.test(f))
  .sort();

const rows = [];
const skipped = [];

for (const file of files) {
  const size = dimensions(readFileSync(join(DIR, file)));
  if (!size) {
    skipped.push(file);
    continue;
  }
  rows.push(`  "/images/${file}": [${size[0]}, ${size[1]}],`);
}

const out = `// ÜRETİLMİŞ DOSYA - elle düzenlemeyin.
// Yeniden üretmek için: npm run images
//
// public/images altındaki her görselin gerçek [genişlik, yükseklik] değeri.
// <Photo> bunu kullanarak fotoğrafı kendi oranında, kırpmadan basar.

export const imageSizes: Record<string, [number, number]> = {
${rows.join("\n")}
};

/** Verilen yol için [genişlik, yükseklik]; bilinmiyorsa null. */
export function sizeOf(src: string | null | undefined): [number, number] | null {
  if (!src) return null;
  return imageSizes[src] ?? null;
}
`;

writeFileSync("lib/image-sizes.ts", out, "utf8");

console.log(`✓ lib/image-sizes.ts  (${rows.length} görsel)`);
if (skipped.length) console.log("  okunamadı:", skipped.join(", "));
