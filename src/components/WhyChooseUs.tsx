import { Check } from "lucide-react";
import { getDictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

type WhyChooseUsProps = {
  locale: Locale;
};

export default function WhyChooseUs({ locale }: WhyChooseUsProps) {
  const dict = getDictionary(locale);

  return (
    <section
      id="giati-emas"
      className="section-pad bg-off-white"
      aria-labelledby="why-heading"
    >
      <div className="container-narrow">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold tracking-[0.16em] text-green-natural uppercase">
            {dict.why.eyebrow}
          </p>
          <h2
            id="why-heading"
            className="font-display text-3xl font-semibold text-green-deep sm:text-4xl md:text-[2.75rem]"
          >
            {dict.why.title}
          </h2>
        </div>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {dict.why.items.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3.5 rounded-[1.25rem] border border-green-deep/8 bg-white p-5 shadow-[0_10px_30px_rgba(20,53,40,0.04)] sm:p-6"
            >
              <span className="mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-green-mist text-green-deep">
                <Check className="size-4" strokeWidth={2.5} aria-hidden />
              </span>
              <span className="text-base leading-snug font-medium text-ink">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
