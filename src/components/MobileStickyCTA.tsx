import { Phone } from "lucide-react";
import { SITE } from "@/lib/constants";

export default function MobileStickyCTA() {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:hidden">
      <a
        href={SITE.phoneHref}
        className="focus-ring pointer-events-auto flex min-h-14 items-center justify-center gap-2 rounded-full bg-green-deep px-5 text-[0.95rem] font-semibold text-white shadow-[0_12px_40px_rgba(20,53,40,0.35)]"
      >
        <Phone className="size-5 shrink-0" aria-hidden />
        <span>Κλήση τώρα — {SITE.phoneDisplay}</span>
      </a>
    </div>
  );
}
