import { Phone } from "lucide-react";
import { SITE } from "@/lib/constants";
import { getDictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

type CTAProps = {
  locale: Locale;
};

export default function CTA({ locale }: CTAProps) {
  const dict = getDictionary(locale);

  return (
    <section
      className="section-pad relative overflow-hidden bg-green-mid"
      aria-labelledby="cta-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.25), transparent 35%), radial-gradient(circle at 80% 70%, rgba(201,184,150,0.35), transparent 40%)",
        }}
        aria-hidden
      />
      <div className="container-narrow relative text-center">
        <h2
          id="cta-heading"
          className="font-display text-3xl font-semibold text-white sm:text-4xl md:text-5xl"
        >
          {dict.cta.title}
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">
          {dict.cta.body}
        </p>
        <a
          href={SITE.phoneHref}
          className="focus-ring mt-8 inline-flex min-h-14 items-center justify-center gap-2.5 rounded-full bg-white px-8 text-lg font-semibold text-green-deep shadow-[0_16px_40px_rgba(0,0,0,0.18)] transition hover:bg-green-mist"
        >
          <Phone className="size-5" aria-hidden />
          {SITE.phoneDisplay}
        </a>
      </div>
    </section>
  );
}
