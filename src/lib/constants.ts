export const SITE = {
  name: "Κώστας Γάλλος",
  tagline: "Κηπουρική & Συντήρηση Κήπων",
  phone: "6943070267",
  phoneDisplay: "694 307 0267",
  phoneHref: "tel:6943070267",
  title: "Κώστας Γάλλος | Κηπουρική & Συντήρηση Κήπων",
  description:
    "Κηπουρική, συντήρηση κήπων, κοπή χόρτων, καθαρισμός οικοπέδων, φυσικός χλοοτάπητας και φροντίδα πρασίνου από τον Κώστα Γάλλο με 20 χρόνια εμπειρίας στην Ελβετία.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://kostasgallos.gr",
} as const;

export const NAV_LINKS = [
  { href: "#ypiresies", label: "Υπηρεσίες" },
  { href: "#empeiria", label: "Εμπειρία" },
  { href: "#giati-emas", label: "Γιατί εμάς" },
  { href: "#diadikasia", label: "Διαδικασία" },
  { href: "#epikoinonia", label: "Επικοινωνία" },
] as const;

export const SERVICES = [
  {
    id: "syntirisi",
    title: "Συντήρηση Κήπων",
    description:
      "Τακτική φροντίδα και συντήρηση ώστε ο κήπος να παραμένει καθαρός, υγιής και περιποιημένος.",
    icon: "sprout" as const,
  },
  {
    id: "kopi-horton",
    title: "Κοπή Χόρτων",
    description:
      "Κοπή και περιποίηση χόρτων για αυλές, κήπους και επαγγελματικούς χώρους.",
    icon: "scissors" as const,
  },
  {
    id: "katharismos",
    title: "Καθαρισμός Οικοπέδων",
    description:
      "Καθαρισμός οικοπέδων από χόρτα, ανεπιθύμητη βλάστηση και φυτικά υπολείμματα.",
    icon: "home" as const,
  },
  {
    id: "chlootapitas",
    title: "Εγκατάσταση Φυσικού Χλοοτάπητα",
    description:
      "Εγκατάσταση φυσικού γκαζόν για τη δημιουργία ενός όμορφου και φυσικού χώρου πρασίνου.",
    icon: "leaf" as const,
  },
  {
    id: "frondida",
    title: "Φροντίδα Δέντρων & Πρασίνου",
    description:
      "Φροντίδα φυτών, δέντρων και γενικότερα του πράσινου χώρου.",
    icon: "tree" as const,
  },
  {
    id: "fytoprostasia",
    title: "Φυτοπροστασία & Ψεκασμοί",
    description:
      "Σε συνεργασία με γεωπόνο, αναλαμβάνονται ψεκασμοί δέντρων και αντιμετώπιση ασθενειών και προβλημάτων που επηρεάζουν τα φυτά και το πράσινο.",
    icon: "shield" as const,
  },
] as const;

export const WHY_CHOOSE = [
  "20+ χρόνια επαγγελματικής εμπειρίας",
  "Εμπειρία 20 ετών στην Ελβετία",
  "Υπεύθυνη και προσεγμένη εργασία",
  "Ολοκληρωμένες υπηρεσίες πρασίνου",
  "Συνεργασία με γεωπόνο",
  "Από έναν μικρό κήπο έως ένα μεγάλο οικόπεδο",
] as const;

export const PROCESS_STEPS = [
  {
    number: "01",
    title: "Επικοινωνία",
    description: "Μιλάμε για τον χώρο και τις ανάγκες σας.",
  },
  {
    number: "02",
    title: "Εκτίμηση εργασιών",
    description: "Βλέπουμε τι χρειάζεται ο χώρος.",
  },
  {
    number: "03",
    title: "Εργασία",
    description: "Αναλαμβάνουμε την εργασία με συνέπεια και προσοχή.",
  },
  {
    number: "04",
    title: "Ο χώρος σας, όπως πρέπει να είναι",
    description: "Παραδίδουμε έναν καθαρό και περιποιημένο χώρο.",
  },
] as const;
