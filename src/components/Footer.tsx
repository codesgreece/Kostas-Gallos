import { Phone } from "lucide-react";
import { SITE } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="border-t border-green-deep/10 bg-green-deep pb-20 text-white md:pb-0">
      <div className="container-narrow px-5 py-12 md:py-14">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-display text-2xl font-semibold">{SITE.name}</p>
            <p className="mt-1 text-white/70">{SITE.tagline}</p>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/60">
              Κηπουρική • Συντήρηση Κήπων • Φυσικός Χλοοτάπητας • Καθαρισμοί
              Οικοπέδων • Φυτοπροστασία
            </p>
          </div>

          <div>
            <p className="text-sm text-white/60">Τηλέφωνο</p>
            <a
              href={SITE.phoneHref}
              className="focus-ring mt-1 inline-flex items-center gap-2 text-xl font-semibold text-white transition hover:text-green-soft"
            >
              <Phone className="size-5" aria-hidden />
              {SITE.phoneDisplay}
            </a>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-white/10 pt-6 text-sm text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>Copyright © 2026 {SITE.name}</p>
          <a href="#top" className="focus-ring rounded-md hover:text-white">
            Επιστροφή στην κορυφή
          </a>
        </div>
      </div>
    </footer>
  );
}
