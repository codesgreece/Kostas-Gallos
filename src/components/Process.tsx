import { PROCESS_STEPS } from "@/lib/constants";

export default function Process() {
  return (
    <section
      id="diadikasia"
      className="section-pad bg-off-white"
      aria-labelledby="process-heading"
    >
      <div className="container-narrow">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold tracking-[0.16em] text-green-natural uppercase">
            Διαδικασία
          </p>
          <h2
            id="process-heading"
            className="font-display text-3xl font-semibold text-green-deep sm:text-4xl md:text-[2.75rem]"
          >
            Πώς δουλεύουμε
          </h2>
        </div>

        <ol className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {PROCESS_STEPS.map((step, index) => (
            <li
              key={step.number}
              className="relative rounded-[1.35rem] border border-green-deep/8 bg-white p-6 sm:p-7"
            >
              {index < PROCESS_STEPS.length - 1 && (
                <span
                  className="absolute top-10 -right-3 hidden h-px w-6 bg-beige xl:block"
                  aria-hidden
                />
              )}
              <span className="font-display text-3xl font-semibold text-beige">
                {step.number}
              </span>
              <h3 className="mt-4 font-display text-xl font-semibold text-green-deep">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted sm:text-[0.95rem]">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
