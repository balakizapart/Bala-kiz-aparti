import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = "Bala Kız Apartı, Eskişehir Kız Öğrenci Apartı";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Sosyal medya paylaşım görseli.
 * Fotoğraf dosyasına bağımlı değil: markanın gradyanıyla çiziliyor,
 * böylece her paylaşımda tutarlı ve keskin görünüyor.
 */
export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const tr = locale !== "en";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#faf7f2",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Gradyan leke */}
        <div
          style={{
            position: "absolute",
            top: -180,
            right: -140,
            width: 620,
            height: 620,
            borderRadius: 9999,
            background: "linear-gradient(135deg, #7c3aed 0%, #e5228f 60%, #ff9d6e 100%)",
            opacity: 0.24,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -220,
            left: -160,
            width: 520,
            height: 520,
            borderRadius: 9999,
            background: "linear-gradient(135deg, #e5228f 0%, #ff9d6e 100%)",
            opacity: 0.18,
          }}
        />

        {/* Üst: marka */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ fontSize: 40, fontWeight: 800, color: "#171310", letterSpacing: -1 }}>
            Bala
          </div>
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 9999,
              background: "linear-gradient(135deg, #7c3aed, #e5228f)",
            }}
          />
          <div
            style={{
              fontSize: 20,
              fontWeight: 700,
              color: "#7e6b9b",
              letterSpacing: 3,
              textTransform: "uppercase",
            }}
          >
            {tr ? "Kız Apartı" : "Girls' Residence"}
          </div>
        </div>

        {/* Orta: başlık */}
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div
            style={{
              fontSize: 78,
              fontWeight: 800,
              color: "#171310",
              lineHeight: 1.02,
              letterSpacing: -3,
              maxWidth: 900,
            }}
          >
            {tr
              ? "Kendine ait bir oda, şehrin tam merkezinde."
              : "A room of your own, in the heart of the city."}
          </div>
          <div style={{ fontSize: 28, color: "#4a423b", maxWidth: 860, lineHeight: 1.4 }}>
            {tr
              ? "Espark karşısı · Tramvaya 1 dk · Anadolu Üniversitesi 5 dk"
              : "Across from Espark · 1 min to the tram · 5 min to Anadolu University"}
          </div>
        </div>

        {/* Alt: künye */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "2px solid #e7e0d6",
            paddingTop: 26,
            fontSize: 24,
            color: "#4a423b",
          }}
        >
          <div style={{ display: "flex" }}>
            {site.district}, {site.city}
          </div>
          <div style={{ display: "flex", fontWeight: 700, color: "#7c3aed" }}>
            {site.phoneDisplay}
          </div>
        </div>
      </div>
    ),
    size
  );
}
