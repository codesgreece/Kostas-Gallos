import { Leaf, Users } from "lucide-react";

export default function Phytoprotection() {
  return (
    <section
      id="fytoprostasia"
      className="section-pad relative overflow-hidden bg-green-deep text-white"
      aria-labelledby="phyto-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        aria-hidden
      >
        <div className="lawn-photo absolute inset-0 scale-105" />
        <div className="absolute inset-0 bg-green-deep/85" />
      </div>
      <div
        className="pointer-events-none absolute -top-24 right-0 size-72 rounded-full bg-green-natural/25 blur-3xl"
        aria-hidden
      />

      <div className="container-narrow relative grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-14">
        <div>
          <p className="mb-3 text-sm font-semibold tracking-[0.16em] text-green-soft uppercase">
            Φυτοπροστασία
          </p>
          <h2
            id="phyto-heading"
            className="font-display text-3xl leading-tight font-semibold sm:text-4xl md:text-[2.6rem]"
          >
            Όταν το πράσινο χρειάζεται εξειδικευμένη φροντίδα
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
            Δεν αναλαμβάνουμε μόνο τη συντήρηση του κήπου. Όταν ένα φυτό ή
            δέντρο παρουσιάζει ασθένεια ή κάποιο πρόβλημα, υπάρχει συνεργασία με
            γεωπόνο για την κατάλληλη αντιμετώπιση και τους απαραίτητους
            ψεκασμούς.
          </p>
        </div>

        <div className="grid gap-4">
          <div className="rounded-2xl border border-white/15 bg-white/8 p-5 backdrop-blur-sm sm:p-6">
            <div className="mb-3 inline-flex size-11 items-center justify-center rounded-xl bg-beige/20 text-beige-soft">
              <Users className="size-5" aria-hidden />
            </div>
            <h3 className="font-display text-xl font-semibold">
              Συνεργασία με γεωπόνο
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-white/75">
              Εξειδικευμένη υποστήριξη για φυτοπροστασία και ψεκασμούς, όταν το
              πράσινο το χρειάζεται.
            </p>
          </div>
          <div className="rounded-2xl border border-white/15 bg-white/8 p-5 backdrop-blur-sm sm:p-6">
            <div className="mb-3 inline-flex size-11 items-center justify-center rounded-xl bg-green-soft/20 text-green-soft">
              <Leaf className="size-5" aria-hidden />
            </div>
            <h3 className="font-display text-xl font-semibold">
              Φροντίδα για φυτά &amp; δέντρα
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-white/75">
              Προσεγμένη αντιμετώπιση προβλημάτων που επηρεάζουν την υγεία και
              την εμφάνιση του χώρου σας.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
