import { ArrowDown, Phone } from "lucide-react";
import { SITE } from "@/lib/constants";
import { getDictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

type HeroProps = {
  locale: Locale;
};

export default function Hero({ locale }: HeroProps) {
  const dict = getDictionary(locale);

  return (
    <section
      id="top"
      className="relative isolate min-h-[100svh] overflow-hidden"
      aria-labelledby="hero-heading"
    >
      <div
        className="garden-photo absolute inset-0"
        role="img"
        aria-label={dict.hero.imageLabel}
      />
      <div className="hero-mesh absolute inset-0" aria-hidden />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(201,184,150,0.18),transparent_45%)]"
        aria-hidden
      />

      <div className="relative container-narrow flex min-h-[100svh] flex-col justify-end px-5 pb-28 pt-32 sm:justify-center sm:pb-24 sm:pt-28 md:pb-20">
        <div className="max-w-3xl">
          <p className="reveal mb-4 text-sm font-medium tracking-[0.18em] text-beige-soft uppercase sm:text-[0.8rem]">
            {dict.site.name} · {dict.site.tagline}
          </p>

          <h1
            id="hero-heading"
            className="reveal reveal-delay-1 font-display text-[2.35rem] leading-[1.12] font-semibold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[4.25rem]"
          >
            {dict.hero.headline}
          </h1>

          <p className="reveal reveal-delay-2 mt-5 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg md:text-xl">
            {dict.hero.subhead}
          </p>

          <div className="reveal reveal-delay-2 mt-6 flex flex-wrap gap-2.5">
            <span className="inline-flex items-center rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
              {dict.hero.badgeExperience}
            </span>
            <span className="inline-flex items-center rounded-full border border-beige/40 bg-beige/15 px-3.5 py-1.5 text-sm font-medium text-beige-soft backdrop-blur-sm">
              {dict.hero.badgeSwitzerland}
            </span>
          </div>

          <div className="reveal reveal-delay-3 mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={SITE.phoneHref}
              className="focus-ring inline-flex min-h-14 items-center justify-center gap-2.5 rounded-full bg-white px-7 text-base font-semibold text-green-deep shadow-[0_12px_40px_rgba(0,0,0,0.2)] transition hover:bg-green-mist"
            >
              <Phone className="size-5" aria-hidden />
              {dict.hero.callNow}
            </a>
            <a
              href="#ypiresies"
              className="focus-ring inline-flex min-h-14 items-center justify-center gap-2.5 rounded-full border border-white/35 bg-white/5 px-7 text-base font-semibold text-white backdrop-blur-sm transition hover:bg-white/15"
            >
              {dict.hero.seeServices}
              <ArrowDown className="size-4" aria-hidden />
            </a>
          </div>

          <a
            href={SITE.phoneHref}
            className="focus-ring mt-6 inline-flex items-center gap-2 text-lg font-semibold text-white sm:hidden"
          >
            <Phone className="size-5 text-green-soft" aria-hidden />
            {SITE.phoneDisplay}
          </a>
        </div>
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-off-white to-transparent"
        aria-hidden
      />
    </section>
  );
}
