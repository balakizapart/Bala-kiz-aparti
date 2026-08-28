/**
 * QR kod üretici — `npm run qr`
 *
 * İki dosya üretir:
 *   public/qr-yorum.svg        → sitede gösterilen kod (vektör, her boyutta net)
 *   public/qr-yorum-baski.svg  → bina kapısına asılacak, çerçeveli baskı sürümü
 *
 * Hedef adres: balakizapart.com/yorum (lib/site.ts → reviewShortUrl).
 * Oradan Google'a yönlendirilir, böylece QR bir kez bastırılır.
 *
 * Hata düzeltme seviyesi "H": kodun %30'u zarar görse bile okunur.
 * Dışarıda, kapıya asılan, yıpranan bir etiket için doğru seçim.
 */
import QRCode from "qrcode";
import { writeFile } from "node:fs/promises";

const PLACE_ID = "ChIJd5BJ4LEVzBQRfj3Wol24znE";
const URL_TARGET = `https://search.google.com/local/writereview?placeid=${PLACE_ID}`;

const INK = "#171310";
const GRAPE = "#7c3aed";
const FUCHSIA = "#e5228f";

/** Sade kod — sitede gösterilecek. */
const plain = await QRCode.toString(URL_TARGET, {
  type: "svg",
  errorCorrectionLevel: "H",
  margin: 1,
  color: { dark: INK, light: "#00000000" },
});

await writeFile("public/qr-yorum.svg", plain, "utf8");

/* ---------- Baskı sürümü ----------
   Kodu beyaz bir karta oturtur, üstüne başlık ve altına adres yazar.
   Vektör olduğu için A5'e de A3'e de kayıpsız basılır. */

// Üretilen SVG'nin iç içeriğini alıp kendi tuvalimize gömüyoruz.
const inner = plain
  .replace(/^[\s\S]*?<svg[^>]*>/, "")
  .replace(/<\/svg>\s*$/, "");
const viewBox = /viewBox="([^"]+)"/.exec(plain)?.[1] ?? "0 0 33 33";

const W = 600;
const H = 820;
const QR = 420;
const QR_X = (W - QR) / 2;
const QR_Y = 210;

const print = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${GRAPE}"/>
      <stop offset="100%" stop-color="${FUCHSIA}"/>
    </linearGradient>
  </defs>

  <rect width="${W}" height="${H}" rx="36" fill="#ffffff"/>
  <rect x="6" y="6" width="${W - 12}" height="${H - 12}" rx="30" fill="none" stroke="url(#g)" stroke-width="6"/>

  <text x="${W / 2}" y="96" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif"
        font-size="42" font-weight="800" fill="${INK}">Bala Kız Apartı</text>
  <text x="${W / 2}" y="146" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif"
        font-size="25" font-weight="600" fill="${GRAPE}">Bizi değerlendirir misiniz?</text>
  <text x="${W / 2}" y="182" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif"
        font-size="19" fill="#4b3568">Kamerayı kodun üzerine tutmanız yeterli</text>

  <g transform="translate(${QR_X} ${QR_Y}) scale(${QR / parseFloat(viewBox.split(" ")[2])})">
    ${inner}
  </g>

  <text x="${W / 2}" y="${QR_Y + QR + 62}" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif"
        font-size="22" font-weight="700" fill="${INK}">Google'da yorum yaz</text>
  <text x="${W / 2}" y="${QR_Y + QR + 96}" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif"
        font-size="17" fill="#837a70">Kamerayı tutun, yorum ekranı açılsın</text>
</svg>
`;

await writeFile("public/qr-yorum-baski.svg", print, "utf8");

console.log("✓ public/qr-yorum.svg");
console.log("✓ public/qr-yorum-baski.svg  (baskı için)");
console.log("  hedef:", URL_TARGET);
