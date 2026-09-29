import { SITE } from "@/lib/constants";

export default function ExperienceSection() {
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
            Εμπειρία
          </p>
          <h2
            id="experience-heading"
            className="font-display text-3xl leading-tight font-semibold text-green-deep sm:text-4xl md:text-[2.75rem]"
          >
            20 χρόνια εμπειρίας από την Ελβετία
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            Με 20 χρόνια επαγγελματικής εμπειρίας στην Ελβετία στον χώρο της
            κηπουρικής και της φροντίδας πρασίνου, ο {SITE.name} προσφέρει
            υπεύθυνες και προσεγμένες λύσεις για κάθε εξωτερικό χώρο.
          </p>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            Η εμπειρία αυτή αποκτήθηκε στην ίδια επαγγελματική δραστηριότητα —
            κηπουρική, συντήρηση κήπων και φροντίδα πρασίνου — και εφαρμόζεται
            σήμερα με συνέπεια σε κάθε έργο.
          </p>
        </div>

        <aside
          className="float-soft relative overflow-hidden rounded-[1.75rem] bg-green-deep p-8 text-white shadow-[var(--shadow-soft)] sm:p-10"
          aria-label="Σύνοψη εμπειρίας"
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
            Χρόνια εμπειρίας
          </p>
          <span className="relative mt-8 inline-flex rounded-full border border-beige/40 bg-white/5 px-4 py-2 text-sm font-medium text-beige-soft">
            Εμπειρία Ελλάδας &amp; Ελβετίας
          </span>
        </aside>
      </div>
    </section>
  );
}
