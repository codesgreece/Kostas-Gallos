import { getDictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

type ExperienceSectionProps = {
  locale: Locale;
};

export default function ExperienceSection({ locale }: ExperienceSectionProps) {
  const dict = getDictionary(locale);

  return (
    <section
      id="empeiria"
      className="section-pad relative overflow-hidden bg-off-white"
      aria-labelledby="experience-heading"
    >
      <div className="leaf-pattern pointer-events-none absolute inset-0 opacity-70" aria-hidden />
      <div className="container-narrow relative grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        <div>
          <p className="mb-3 text-sm font-semibold tracking-[0.16em] text-green-natural uppercase">
            {dict.experience.eyebrow}
          </p>
          <h2
            id="experience-heading"
            className="font-display text-3xl leading-tight font-semibold text-green-deep sm:text-4xl md:text-[2.75rem]"
          >
            {dict.experience.title}
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            {dict.experience.p1}
          </p>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            {dict.experience.p2}
          </p>
        </div>

        <aside
          className="float-soft relative overflow-hidden rounded-[1.75rem] bg-green-deep p-8 text-white shadow-[var(--shadow-soft)] sm:p-10"
          aria-label={dict.a11y.experienceSummary}
        >
          <div
            className="absolute -top-10 -right-10 size-40 rounded-full bg-green-natural/20"
            aria-hidden
          />
          <div
            className="absolute -bottom-8 -left-6 size-28 rounded-full bg-beige/20"
            aria-hidden
          />
          <p className="font-display relative text-7xl leading-none font-semibold tracking-tight sm:text-8xl">
            20+
          </p>
          <p className="relative mt-3 text-xl font-medium text-green-mist">
            {dict.experience.yearsLabel}
          </p>
          <span className="relative mt-8 inline-flex rounded-full border border-beige/40 bg-white/5 px-4 py-2 text-sm font-medium text-beige-soft">
            {dict.experience.badge}
          </span>
        </aside>
      </div>
    </section>
  );
}
