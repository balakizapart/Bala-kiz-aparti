import { type NextRequest, NextResponse } from "next/server";
import { defaultLocale, locales } from "@/lib/i18n";

const PUBLIC_FILE = /\.[^/]+$/;

/** Dil ön eki almayan, kökte duran yollar. */
const BARE_ROUTES = ["/yorum"];

/** Next'in ürettiği metadata görselleri; adlarına hash ekleniyor. */
const METADATA_IMAGE = /\/(opengraph-image|twitter-image)(-[a-z0-9]+)?$/i;

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    PUBLIC_FILE.test(pathname) ||
    pathname.startsWith("/_next") ||
    BARE_ROUTES.includes(pathname)
  ) {
    return NextResponse.next();
  }

  const hasLocale = locales.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`)
  );

  // Ön eksiz yollar varsayılan dile rewrite edilir; URL "/odalar" kalır.
  if (!hasLocale) {
    const url = request.nextUrl.clone();
    url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
    return NextResponse.rewrite(url);
  }

  // "/tr/..." kanonik değil → ön eksiz sürüme kalıcı yönlendirme.
  // Paylaşım görseli haricinde: Next o etiketi "/tr/opengraph-image-..."
  // olarak yazıyor ve WhatsApp/Facebook robotlarının hepsi yönlendirme
  // takip etmiyor. Bu adres doğrudan servis edilmeli.
  if (
    (pathname === `/${defaultLocale}` || pathname.startsWith(`/${defaultLocale}/`)) &&
    !METADATA_IMAGE.test(pathname)
  ) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(`/${defaultLocale}`.length) || "/";
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|images|videos).*)"],
};
