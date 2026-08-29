import Link from "next/link";
import { localePath, type Locale, type Messages } from "@/lib/i18n";
import { Button, Container } from "@/components/ui/primitives";
import { LanguageSwitcher } from "./language-switcher";
import { Logo } from "./logo";
import { MobileMenu, StickyHeader } from "./mobile-menu";

const copy = {
  tr: { home: "Ana sayfa" },
  en: { home: "Home" },
} as const;

export function Header({ locale, t }: { locale: Locale; t: Messages }) {
  const items = [
    { href: localePath(locale, "/odalar"), label: t.nav.rooms },
    { href: localePath(locale, "/galeri"), label: t.nav.gallery },
    { href: localePath(locale, "/konum"), label: t.nav.location },
    { href: localePath(locale, "/hakkimizda"), label: t.nav.about },
    { href: localePath(locale, "/sss"), label: t.nav.faq },
    { href: localePath(locale, "/iletisim"), label: t.nav.contact },
  ];

  return (
    <StickyHeader>
      <Container size="wide">
        <div className="flex h-20 items-center justify-between transition-[height] duration-700 ease-(--ease-out-expo) group-data-[scrolled=true]:h-16">
          {/* Marka: apartın kendi logosu */}
          <Link
            href={localePath(locale, "/")}
            aria-label={`${copy[locale].home}, Bala Kız Apartı`}
            className="group/brand -my-1 flex shrink-0 items-center gap-3 py-1"
          >
            <Logo className="text-[12px] transition-transform duration-500 ease-(--ease-spring) group-hover/brand:scale-[1.04] sm:text-[13px]" />
          </Link>

          {/* Masaüstü gezinme */}
          <nav aria-label={t.nav.menu} className="hidden lg:block">
            <ul className="flex items-center gap-7">
              {items.map((it) => (
                <li key={it.href}>
                  <Link
                    href={it.href}
                    className="link-underline text-sm font-medium text-ink-soft transition-colors duration-500 ease-(--ease-out-expo) hover:text-pine"
                  >
                    {it.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3 sm:gap-5">
            <LanguageSwitcher
              locale={locale}
              label={t.a11y.changeLanguage}
              className="hidden sm:flex"
            />
            <Button
              href={localePath(locale, "/on-kayit")}
              variant="primary"
              size="sm"
              className="hidden sm:inline-flex"
            >
              {t.nav.reserve}
            </Button>
            <MobileMenu
              items={items}
              locale={locale}
              labels={{
                menu: t.nav.menu,
                close: t.nav.close,
                reserve: t.nav.reserve,
                changeLanguage: t.a11y.changeLanguage,
              }}
            />
          </div>
        </div>
      </Container>
    </StickyHeader>
  );
}
