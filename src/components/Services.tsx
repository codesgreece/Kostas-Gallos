import ServiceCard from "@/components/ServiceCard";
import { getDictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

type ServicesProps = {
  locale: Locale;
};

export default function Services({ locale }: ServicesProps) {
  const dict = getDictionary(locale);

  return (
    <section
      id="ypiresies"
      className="section-pad bg-cream"
      aria-labelledby="services-heading"
    >
      <div className="container-narrow">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold tracking-[0.16em] text-green-natural uppercase">
            {dict.services.eyebrow}
          </p>
          <h2
            id="services-heading"
            className="font-display text-3xl font-semibold text-green-deep sm:text-4xl md:text-[2.75rem]"
          >
            {dict.services.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
            {dict.services.intro}
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {dict.services.items.map((service) => (
            <ServiceCard
              key={service.id}
              title={service.title}
              description={service.description}
              icon={service.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
