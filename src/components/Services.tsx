import ServiceCard from "@/components/ServiceCard";
import { SERVICES } from "@/lib/constants";

export default function Services() {
  return (
    <section
      id="ypiresies"
      className="section-pad bg-cream"
      aria-labelledby="services-heading"
    >
      <div className="container-narrow">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold tracking-[0.16em] text-green-natural uppercase">
            Υπηρεσίες
          </p>
          <h2
            id="services-heading"
            className="font-display text-3xl font-semibold text-green-deep sm:text-4xl md:text-[2.75rem]"
          >
            Οι υπηρεσίες μας
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
            Αναλαμβάνουμε τη φροντίδα του χώρου σας από την αρχή μέχρι τη συνεχή
            συντήρησή του.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {SERVICES.map((service) => (
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
