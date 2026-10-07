import { Phone } from "lucide-react";
import { SITE } from "@/lib/constants";
import { getDictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

type FooterProps = {
  locale: Locale;
};

export default function Footer({ locale }: FooterProps) {
  const dict = getDictionary(locale);

  return (
    <footer className="border-t border-green-deep/10 bg-green-deep pb-20 text-white md:pb-0">
      <div className="container-narrow px-5 py-12 md:py-14">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-display text-2xl font-semibold">{dict.site.name}</p>
            <p className="mt-1 text-white/70">{dict.site.tagline}</p>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/60">
              {dict.footer.servicesLine}
            </p>
          </div>

          <div>
            <p className="text-sm text-white/60">{dict.footer.phone}</p>
            <a
              href={SITE.phoneHref}
              className="focus-ring mt-1 inline-flex items-center gap-2 text-xl font-semibold text-white transition hover:text-green-soft"
            >
              <Phone className="size-5" aria-hidden />
              {SITE.phoneDisplay}
            </a>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-3">
            <p>Copyright © 2026 {dict.site.name}</p>
            <p className="flex flex-wrap items-center gap-2">
              <span>{dict.footer.madeBy}</span>
              <a
                href="https://www.nexusdevstudio.gr"
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-white transition hover:border-green-soft/50 hover:bg-green-soft/15 hover:text-green-soft"
              >
                NexusDevStudio Greece
              </a>
            </p>
          </div>
          <a href="#top" className="focus-ring rounded-md hover:text-white">
            {dict.footer.backToTop}
          </a>
        </div>
      </div>
    </footer>
  );
}
