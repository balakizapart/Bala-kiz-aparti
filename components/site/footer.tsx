import Link from "next/link";
import { Blobs, Button, Container, Reveal, SplitText } from "@/components/ui/primitives";
import { site } from "@/lib/site";
import { localePath, type Locale, type Messages } from "@/lib/i18n";
import { ContactFab } from "./contact-fab";
import { LanguageSwitcher } from "./language-switcher";
import { ReviewQr } from "./review-qr";

const copy = {
  tr: {
    closing: "Evinden uzakta, kendini evinde hisset.",
    closingNote:
      "Eskişehir'in tam merkezinde, Espark'ın karşısında. Odanı görmek için haber vermen yeterli.",
    directions: "Yol tarifi",
    instagram: "Instagram",
    whatsapp: "WhatsApp",
  },
  en: {
    closing: "Far from home, still at home.",
    closingNote:
      "In the very centre of Eskişehir, right across from Espark. Just let us know and come see your room.",
    directions: "Directions",
    instagram: "Instagram",
    whatsapp: "WhatsApp",
  },
} as const;

export function Footer({ locale, t }: { locale: Locale; t: Messages }) {
  const c = copy[locale];
  const year = new Date().getFullYear();

  const links = [
    { href: localePath(locale, "/odalar"), label: t.nav.rooms },
    { href: localePath(locale, "/galeri"), label: t.nav.gallery },
    { href: localePath(locale, "/konum"), label: t.nav.location },
    { href: localePath(locale, "/hakkimizda"), label: t.nav.about },
    { href: localePath(locale, "/sss"), label: t.nav.faq },
    { href: localePath(locale, "/iletisim"), label: t.nav.contact },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-line bg-paper">
      <ContactFab locale={locale} />
      <Blobs tone="mixed" className="opacity-45" />

      {/* Kapanış cümlesi + ön kayıt */}
      <Container size="wide" className="relative">
        <div className="grid gap-10 py-(--spacing-section) lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <SplitText
              as="h2"
              text={c.closing}
              gradientLastWords={2}
              className="font-display text-h1 font-bold text-balance"
            />
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-xl text-lead text-pretty text-ink-soft">
                {c.closingNote}
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-4 lg:justify-self-end">
            <Reveal delay={0.15} className="flex flex-wrap gap-3">
              <Button href={localePath(locale, "/on-kayit")} size="lg">
                {t.cta.reserve}
              </Button>
              <Button href={`tel:${site.phone}`} variant="outline" size="lg">
                {t.cta.call}
              </Button>
            </Reveal>
          </div>
        </div>

        {/* Google yorum QR'ı */}
        <Reveal delay={0.1} className="pb-16 lg:max-w-2xl">
          <ReviewQr locale={locale} />
        </Reveal>
      </Container>

      {/* Kartvizit */}
      <div className="relative border-t border-line">
        <Container size="wide">
          <div className="grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {/* Marka */}
            <div>
              <p className="font-display text-2xl font-extrabold leading-none">
                Bala<span className="grad-text">.</span>
              </p>
              <p className="eyebrow mt-2">
                {locale === "en" ? "Girls' Residence" : "Kız Apartı"}
              </p>
              <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted">
                {t.footer.tagline}
              </p>
            </div>

            {/* Hızlı bağlantılar */}
            <nav aria-labelledby="footer-links">
              <h2 id="footer-links" className="eyebrow font-sans">
                {t.footer.quickLinks}
              </h2>
              <ul className="mt-5 space-y-2.5">
                {links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="link-underline text-sm text-ink-soft transition-colors duration-500 ease-(--ease-out-expo) hover:text-grape"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Binalar */}
            <div>
              <h2 className="eyebrow font-sans">{t.footer.ourBuildings}</h2>
              <div className="mt-5 space-y-5">
                {site.buildings.map((b) => (
                  <address key={b.id} className="text-sm not-italic leading-relaxed">
                    <span className="block font-semibold text-ink">{b.name}</span>
                    <span className="block text-muted">
                      {b.street}
                      <br />
                      {b.postalCode} {b.district}/{b.city}
                    </span>
                    <a
                      href={b.directions}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-underline mt-1 inline-block font-medium text-fuchsia"
                    >
                      {c.directions} →
                    </a>
                  </address>
                ))}
              </div>
            </div>

            {/* İletişim */}
            <div>
              <h2 className="eyebrow font-sans">{t.footer.contactUs}</h2>
              <address className="mt-5 space-y-2.5 text-sm not-italic">
                <a
                  href={`tel:${site.phone}`}
                  className="link-underline block font-semibold text-ink transition-colors duration-500 ease-(--ease-out-expo) hover:text-grape"
                >
                  {site.phoneDisplay}
                </a>
                <a
                  href={`https://wa.me/${site.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline block text-ink-soft transition-colors duration-500 ease-(--ease-out-expo) hover:text-whatsapp"
                >
                  {c.whatsapp}
                </a>
                <a
                  href={`mailto:${site.email}`}
                  className="link-underline block break-all text-ink-soft transition-colors duration-500 ease-(--ease-out-expo) hover:text-grape"
                >
                  {site.email}
                </a>
                <a
                  href={`mailto:${site.email2}`}
                  className="link-underline block break-all text-ink-soft transition-colors duration-500 ease-(--ease-out-expo) hover:text-grape"
                >
                  {site.email2}
                </a>
                <a
                  href={site.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline block text-ink-soft transition-colors duration-500 ease-(--ease-out-expo) hover:text-fuchsia"
                >
                  {c.instagram}
                </a>
              </address>
              <LanguageSwitcher
                locale={locale}
                label={t.a11y.changeLanguage}
                className="mt-6"
              />
            </div>
          </div>
        </Container>
      </div>

      {/* Alt şerit */}
      <div className="relative border-t border-line">
        <Container size="wide">
          <div className="flex flex-col gap-4 py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {year} {site.legalName}. {t.footer.rights}
            </p>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              <Link
                href={localePath(locale, "/kvkk")}
                className="link-underline transition-colors duration-500 ease-(--ease-out-expo) hover:text-ink"
              >
                {t.footer.kvkk}
              </Link>

              {/* Yapımcı imzası */}
              <p className="flex items-center gap-2">
                <span>{locale === "tr" ? "Tasarım ve geliştirme" : "Designed and built by"}</span>
                <span className="grad-text font-display text-[0.8125rem] font-extrabold tracking-tight">
                  EZ SOLUTIONS
                </span>
              </p>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}
