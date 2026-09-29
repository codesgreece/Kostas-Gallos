import { ImageIcon } from "lucide-react";

function Placeholder({ label }: { label: string }) {
  return (
    <figure className="overflow-hidden rounded-[1.5rem] border border-green-deep/10 bg-white shadow-[var(--shadow-soft)]">
      <figcaption className="border-b border-green-deep/8 bg-cream px-5 py-3 text-sm font-semibold tracking-[0.14em] text-green-deep uppercase">
        {label}
      </figcaption>
      <div className="relative flex aspect-[4/3] flex-col items-center justify-center gap-3 bg-gradient-to-br from-green-mist/50 via-off-white to-beige-soft/40 px-6 text-center">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgba(20,53,40,0.04) 1px, transparent 1px), linear-gradient(rgba(20,53,40,0.04) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
          aria-hidden
        />
        <span className="relative inline-flex size-14 items-center justify-center rounded-2xl bg-white text-green-mid shadow-sm">
          <ImageIcon className="size-7" aria-hidden />
        </span>
        <p className="relative text-sm font-medium text-muted">
          Placeholder φωτογραφίας — αντικαταστήστε με πραγματικό έργο
        </p>
        <p className="relative text-xs text-muted/80">
          Προτεινόμενες διαστάσεις: 1200×900
        </p>
      </div>
    </figure>
  );
}

export default function BeforeAfter() {
  return (
    <section
      id="prin-meta"
      className="section-pad bg-cream"
      aria-labelledby="before-after-heading"
    >
      <div className="container-narrow">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold tracking-[0.16em] text-green-natural uppercase">
            Αποτελέσματα
          </p>
          <h2
            id="before-after-heading"
            className="font-display text-3xl font-semibold text-green-deep sm:text-4xl md:text-[2.6rem]"
          >
            Από τον ακατάστατο χώρο στον κήπο που θέλεις
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
            Εδώ μπορούν να προστεθούν πραγματικές φωτογραφίες πριν και μετά από
            ολοκληρωμένες εργασίες.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <Placeholder label="Πριν" />
          <Placeholder label="Μετά" />
        </div>
      </div>
    </section>
  );
}
