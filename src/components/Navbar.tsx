"use client";

import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import BrandLogo from "@/components/BrandLogo";
import LanguagePill from "@/components/LanguagePill";
import { NAV_HREFS, SITE } from "@/lib/constants";
import { getDictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

type NavbarProps = {
  locale: Locale;
};

export default function Navbar({ locale }: NavbarProps) {
  const dict = getDictionary(locale);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const solid = scrolled || open;
  const links = NAV_HREFS.map((link) => ({
    href: link.href,
    label: dict.nav[link.key],
  }));

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[60] transition-all duration-300 ${
        solid
          ? "border-b border-green-deep/10 bg-off-white/95 shadow-sm backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <nav
        className={`container-narrow relative z-[61] grid grid-cols-[1fr_auto_1fr] items-center gap-2 px-4 transition-[padding] duration-300 sm:px-5 ${
          scrolled ? "py-2 md:py-2.5" : "py-3 md:py-3.5"
        }`}
        aria-label={dict.a11y.mainNav}
      >
        <div className="flex items-center justify-start gap-2">
          <button
            type="button"
            className={`focus-ring relative z-[62] inline-flex size-11 items-center justify-center rounded-full xl:hidden ${
              solid
                ? "bg-green-deep text-white"
                : "bg-white/20 text-white backdrop-blur-sm"
            }`}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? dict.a11y.closeMenu : dict.a11y.openMenu}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>

          <ul className="hidden items-center gap-5 xl:flex 2xl:gap-7">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`focus-ring rounded-md text-sm font-medium transition-colors hover:text-green-natural ${
                    scrolled ? "text-ink/85" : "text-white/90 hover:text-white"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <a
          href="#top"
          className="focus-ring group relative z-[63] justify-self-center rounded-full"
          onClick={() => setOpen(false)}
          aria-label={dict.site.name}
        >
          <BrandLogo
            alt={dict.site.name}
            priority
            className={`rounded-full shadow-[0_8px_28px_rgba(20,53,40,0.18)] transition-all duration-300 ${
              scrolled
                ? "h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16"
                : "h-14 w-14 sm:h-16 sm:w-16 md:h-[4.75rem] md:w-[4.75rem]"
            }`}
            sizes="(max-width: 640px) 56px, (max-width: 768px) 64px, 76px"
          />
        </a>

        <div className="flex items-center justify-end gap-2 sm:gap-2.5">
          <LanguagePill locale={locale} solid={solid} />

          <a
            href={SITE.phoneHref}
            className={`focus-ring hidden items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-all lg:inline-flex ${
              solid
                ? "bg-green-deep text-white hover:bg-green-mid"
                : "bg-white text-green-deep hover:bg-green-mist"
            }`}
          >
            <Phone className="size-4" aria-hidden />
            {SITE.phoneDisplay}
          </a>
        </div>
      </nav>

      {open ? (
        <div
          id="mobile-menu"
          className="absolute inset-x-0 top-full border-b border-green-deep/10 bg-off-white shadow-lg xl:hidden"
          role="dialog"
          aria-modal="true"
          aria-label={dict.a11y.navMenu}
        >
          <ul className="container-narrow flex flex-col gap-1 px-5 py-4">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="focus-ring block rounded-xl px-3 py-3 text-base font-medium text-ink hover:bg-green-mist/60"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <a
                href={SITE.phoneHref}
                className="focus-ring flex items-center justify-center gap-2 rounded-full bg-green-deep px-4 py-3.5 text-base font-semibold text-white"
                onClick={() => setOpen(false)}
              >
                <Phone className="size-5" aria-hidden />
                {dict.nav.callNow} — {SITE.phoneDisplay}
              </a>
            </li>
          </ul>
        </div>
      ) : null}
    </header>
  );
}
