/**
 * Logo temizleyici — `npm run logo`
 *
 * Kaynak `public/images/logo-kaynak.png` bir ekran görüntüsü kırpması:
 * saydam değil, açık gri (#e6e6e6) zemini ve kenarlarında koyu bir
 * çerçeve çizgisi var. Olduğu gibi kullanılırsa sitede gri kutu ve
 * siyah çizgi görünür.
 *
 * Bu script:
 *   1. Koyu kenar çizgisini kırpar,
 *   2. Gri zemini saydama çevirir (kenar yumuşatması korunur),
 *   3. İçeriğe göre kırpar,
 *   4. `public/logo.png`  → başlıktaki yatay logo
 *      `public/icon.png`  → kare favicon (b harfi + silüet)
 *
 * ⚠️ Bu bir ONARIM. Gerçek logo dosyası (tercihen SVG, en kötü ihtimalle
 * saydam PNG) elinize geçtiğinde onu kullanın; bu script'e gerek kalmaz.
 */
import sharp from "sharp";

const SRC = "public/images/logo-kaynak.png";

/** Zemin rengi ve kenar çizgisi eşikleri. */
const BG = [230, 230, 230];
const TOLERANCE = 26; // bu mesafeye kadar olan gri tamamen saydam olur
const FEATHER = 46; // bu mesafeye kadar kısmi saydam (kenar yumuşatma)

const { data, info } = await sharp(SRC).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width: W, height: H } = info;

/** Bir pikselin zemin rengine uzaklığı. */
const distToBg = (i) =>
  Math.max(
    Math.abs(data[i] - BG[0]),
    Math.abs(data[i + 1] - BG[1]),
    Math.abs(data[i + 2] - BG[2])
  );

/** Koyu çerçeve çizgisi mi? (ekran görüntüsü kenarlığı) */
const isDarkFrame = (i) => data[i] < 60 && data[i + 1] < 60 && data[i + 2] < 60;

// --- 1) Koyu kenar çizgisini bul ve kırp -------------------------------
let left = 0,
  right = W - 1,
  top = 0,
  bottom = H - 1;

const colIsFrame = (x) => {
  let dark = 0;
  for (let y = 0; y < H; y++) if (isDarkFrame((y * W + x) * 4)) dark++;
  return dark > H * 0.7;
};
const rowIsFrame = (y) => {
  let dark = 0;
  for (let x = 0; x < W; x++) if (isDarkFrame((y * W + x) * 4)) dark++;
  return dark > W * 0.7;
};

while (left < right && colIsFrame(left)) left++;
while (right > left && colIsFrame(right)) right--;
while (top < bottom && rowIsFrame(top)) top++;
while (bottom > top && rowIsFrame(bottom)) bottom--;

// --- 2) Gri zemini saydama çevir ---------------------------------------
const cw = right - left + 1;
const ch = bottom - top + 1;
const out = Buffer.alloc(cw * ch * 4);

let minX = cw,
  maxX = -1,
  minY = ch,
  maxY = -1;

for (let y = 0; y < ch; y++) {
  for (let x = 0; x < cw; x++) {
    const si = ((y + top) * W + (x + left)) * 4;
    const di = (y * cw + x) * 4;
    const d = distToBg(si);

    let alpha;
    if (d <= TOLERANCE) alpha = 0;
    else if (d >= FEATHER) alpha = 255;
    else alpha = Math.round(((d - TOLERANCE) / (FEATHER - TOLERANCE)) * 255);

    out[di] = data[si];
    out[di + 1] = data[si + 1];
    out[di + 2] = data[si + 2];
    out[di + 3] = alpha;

    if (alpha > 24) {
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }
}

const base = sharp(out, { raw: { width: cw, height: ch, channels: 4 } });

// --- 3) İçeriğe göre kırp, yatay logoyu yaz ----------------------------
const pad = 2;
const bx = Math.max(0, minX - pad);
const by = Math.max(0, minY - pad);
const bw = Math.min(cw - bx, maxX - minX + 1 + pad * 2);
const bh = Math.min(ch - by, maxY - minY + 1 + pad * 2);

await base
  .clone()
  .extract({ left: bx, top: by, width: bw, height: bh })
  .png({ compressionLevel: 9 })
  .toFile("public/logo.png");

// --- 4) Kare favicon: "b" harfi + silüet -------------------------------
// Logo "balâ" yazıyor; kare bir simgede tamamı okunmaz. Soldaki
// b harfi + kız silüeti markanın ayırt edici parçası, onu alıyoruz.
const sq = Math.min(bh, Math.round(bw * 0.3));
const iconSrc = await base
  .clone()
  .extract({ left: bx, top: by, width: sq, height: bh })
  .png() // ham veriden geliyoruz; biçim verilmezse sharp okuyamıyor
  .toBuffer();

await sharp({
  create: { width: 512, height: 512, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } },
})
  .composite([
    {
      input: await sharp(iconSrc)
        .resize(416, 416, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
        .toBuffer(),
      gravity: "center",
    },
  ])
  .png({ compressionLevel: 9 })
  .toFile("app/icon.png");

console.log(`✓ public/logo.png   ${bw}x${bh}  (yatay logo, saydam)`);
console.log(`✓ app/icon.png      512x512      (kare favicon)`);
console.log(`  kaynakta kirpilan cerceve: sol ${left}, ust ${top}, sag ${W - 1 - right}, alt ${H - 1 - bottom} piksel`);
