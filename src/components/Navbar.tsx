"use client";

import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { NAV_LINKS, SITE } from "@/lib/constants";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "border-b border-green-deep/10 bg-off-white/95 shadow-sm backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <nav
        className="container-narrow flex items-center justify-between gap-4 px-5 py-3.5 md:py-4"
        aria-label="Κύρια πλοήγηση"
      >
        <a href="#top" className="focus-ring group min-w-0 rounded-lg">
          <span
            className={`font-display block truncate text-lg font-semibold tracking-tight transition-colors md:text-xl ${
              scrolled || open ? "text-green-deep" : "text-white"
            }`}
          >
            {SITE.name}
          </span>
          <span
            className={`block text-[0.7rem] tracking-wide md:text-xs ${
              scrolled || open ? "text-muted" : "text-white/75"
            }`}
          >
            {SITE.tagline}
          </span>
        </a>

        <ul className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
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

        <div className="flex items-center gap-2">
          <a
            href={SITE.phoneHref}
            className={`focus-ring hidden items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-all sm:inline-flex ${
              scrolled || open
                ? "bg-green-deep text-white hover:bg-green-mid"
                : "bg-white text-green-deep hover:bg-green-mist"
            }`}
          >
            <Phone className="size-4" aria-hidden />
            {SITE.phoneDisplay}
          </a>

          <button
            type="button"
            className={`focus-ring inline-flex size-11 items-center justify-center rounded-full lg:hidden ${
              scrolled || open
                ? "bg-green-deep/10 text-green-deep"
                : "bg-white/15 text-white"
            }`}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Κλείσιμο μενού" : "Άνοιγμα μενού"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        className={`border-t border-green-deep/10 bg-off-white lg:hidden ${
          open ? "block" : "hidden"
        }`}
      >
        <ul className="container-narrow flex flex-col gap-1 px-5 py-4">
          {NAV_LINKS.map((link) => (
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
              Καλέστε τώρα — {SITE.phoneDisplay}
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
