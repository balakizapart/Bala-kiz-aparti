import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: { formats: ["image/avif", "image/webp"] },
  experimental: { optimizePackageImports: ["motion"] },
  /**
   * Eski site tek sayfalık statik HTML idi; gerçek adresleri sadece "/" ve
   * "/index.html" idi. Dışarıdan gelen "/index.html" bağlantıları kırılmasın diye
   * kalıcı olarak (308) köke yönlendiriyoruz. Bu kayıtlar dosya sisteminden
   * ve proxy.ts'ten önce çalışır.
   */
  async redirects() {
    return [
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/index.htm", destination: "/", permanent: true },
    ];
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
