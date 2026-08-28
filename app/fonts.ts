import { Bricolage_Grotesque, Plus_Jakarta_Sans } from "next/font/google";

// Display: Bricolage Grotesque - değişken genişlik/optik boyut eksenleriyle
// cesur, modern başlıklar. latin-ext Türkçe karakterleri kapsar (ğ ş ı İ ç ö ü).
export const bricolage = Bricolage_Grotesque({
  subsets: ["latin", "latin-ext"],
  variable: "--font-bricolage",
  display: "swap",
  axes: ["opsz", "wdth"],
});

// Gövde: Plus Jakarta Sans - yuvarlak, sıcak, ekranda çok okunaklı.
export const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-jakarta",
  display: "swap",
});

export const fontVars = `${bricolage.variable} ${jakarta.variable}`;
