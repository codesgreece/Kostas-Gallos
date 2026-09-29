"use client";

import { FormEvent, useState } from "react";
import { Phone, Send } from "lucide-react";
import { SITE } from "@/lib/constants";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <section
      id="epikoinonia"
      className="section-pad bg-cream"
      aria-labelledby="contact-heading"
    >
      <div className="container-narrow grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
        <div>
          <p className="mb-3 text-sm font-semibold tracking-[0.16em] text-green-natural uppercase">
            Επικοινωνία
          </p>
          <h2
            id="contact-heading"
            className="font-display text-3xl font-semibold text-green-deep sm:text-4xl"
          >
            Επικοινωνήστε μαζί μας
          </h2>

          <div className="mt-8 rounded-[1.5rem] border border-green-deep/10 bg-white p-6 shadow-[var(--shadow-soft)] sm:p-8">
            <p className="font-display text-2xl font-semibold text-green-deep">
              {SITE.name}
            </p>
            <p className="mt-1 text-muted">{SITE.tagline}</p>

            <a
              href={SITE.phoneHref}
              className="focus-ring mt-6 inline-flex items-center gap-3 text-2xl font-semibold text-green-deep transition hover:text-green-natural sm:text-3xl"
            >
              <span className="inline-flex size-11 items-center justify-center rounded-full bg-green-mist text-green-deep">
                <Phone className="size-5" aria-hidden />
              </span>
              {SITE.phoneDisplay}
            </a>

            <a
              href={SITE.phoneHref}
              className="focus-ring mt-8 flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-green-deep text-base font-semibold text-white transition hover:bg-green-mid sm:w-auto sm:px-8"
            >
              <Phone className="size-5" aria-hidden />
              Καλέστε τώρα
            </a>
          </div>
        </div>

        <div className="rounded-[1.5rem] border border-green-deep/10 bg-white p-6 shadow-[var(--shadow-soft)] sm:p-8">
          <h3 className="font-display text-xl font-semibold text-green-deep">
            Στείλτε μήνυμα
          </h3>
          <p className="mt-2 text-sm text-muted">
            Η φόρμα είναι έτοιμη για σύνδεση με υπηρεσία email. Μέχρι τότε, η
            άμεση επικοινωνία γίνεται τηλεφωνικά.
          </p>

          {submitted ? (
            <div
              className="mt-8 rounded-2xl border border-green-natural/25 bg-green-mist/40 p-5"
              role="status"
            >
              <p className="font-medium text-green-deep">
                Ευχαριστούμε για το ενδιαφέρον σας.
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Η αποστολή μέσω φόρμας δεν είναι ακόμα ενεργή. Καλέστε μας στο{" "}
                <a
                  href={SITE.phoneHref}
                  className="font-semibold text-green-deep underline-offset-2 hover:underline"
                >
                  {SITE.phoneDisplay}
                </a>{" "}
                για άμεση επικοινωνία.
              </p>
            </div>
          ) : (
            <form className="mt-6 space-y-4" onSubmit={handleSubmit} noValidate>
              <div>
                <label
                  htmlFor="name"
                  className="mb-1.5 block text-sm font-medium text-ink"
                >
                  Ονοματεπώνυμο
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className="focus-ring w-full rounded-xl border border-green-deep/15 bg-off-white px-4 py-3 text-base text-ink outline-none transition placeholder:text-muted/60 focus:border-green-natural"
                  placeholder="Το ονοματεπώνυμό σας"
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="mb-1.5 block text-sm font-medium text-ink"
                >
                  Τηλέφωνο
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  required
                  className="focus-ring w-full rounded-xl border border-green-deep/15 bg-off-white px-4 py-3 text-base text-ink outline-none transition placeholder:text-muted/60 focus:border-green-natural"
                  placeholder="Το τηλέφωνό σας"
                />
              </div>
              <div>
                <label
                  htmlFor="need"
                  className="mb-1.5 block text-sm font-medium text-ink"
                >
                  Τι χρειάζεστε;
                </label>
                <input
                  id="need"
                  name="need"
                  type="text"
                  className="focus-ring w-full rounded-xl border border-green-deep/15 bg-off-white px-4 py-3 text-base text-ink outline-none transition placeholder:text-muted/60 focus:border-green-natural"
                  placeholder="π.χ. κοπή χόρτων, συντήρηση κήπου"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="mb-1.5 block text-sm font-medium text-ink"
                >
                  Μήνυμα
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="focus-ring w-full resize-y rounded-xl border border-green-deep/15 bg-off-white px-4 py-3 text-base text-ink outline-none transition placeholder:text-muted/60 focus:border-green-natural"
                  placeholder="Περιγράψτε σύντομα τον χώρο ή την ανάγκη σας"
                />
              </div>
              <button
                type="submit"
                className="focus-ring inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-green-deep px-6 text-base font-semibold text-white transition hover:bg-green-mid sm:w-auto"
              >
                <Send className="size-4" aria-hidden />
                Αποστολή
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
