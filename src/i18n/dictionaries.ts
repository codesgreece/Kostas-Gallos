import type { Locale } from "./config";

export type Dictionary = {
  site: {
    name: string;
    tagline: string;
    title: string;
    description: string;
    keywords: string[];
  };
  a11y: {
    skipToContent: string;
    mainNav: string;
    openMenu: string;
    closeMenu: string;
    navMenu: string;
    experienceSummary: string;
  };
  nav: {
    services: string;
    experience: string;
    whyUs: string;
    process: string;
    contact: string;
    callNow: string;
  };
  hero: {
    imageLabel: string;
    headline: string;
    subhead: string;
    badgeExperience: string;
    badgeSwitzerland: string;
    callNow: string;
    seeServices: string;
  };
  experience: {
    eyebrow: string;
    title: string;
    p1: string;
    p2: string;
    yearsLabel: string;
    badge: string;
  };
  services: {
    eyebrow: string;
    title: string;
    intro: string;
    items: {
      id: string;
      title: string;
      description: string;
      icon: "sprout" | "scissors" | "home" | "leaf" | "tree" | "shield";
    }[];
  };
  phyto: {
    eyebrow: string;
    title: string;
    body: string;
    card1Title: string;
    card1Body: string;
    card2Title: string;
    card2Body: string;
  };
  why: {
    eyebrow: string;
    title: string;
    items: string[];
  };
  gallery: {
    eyebrow: string;
    title: string;
    intro: string;
    photoFallback: string;
    photoAlts: string[];
  };
  process: {
    eyebrow: string;
    title: string;
    steps: { number: string; title: string; description: string }[];
  };
  cta: {
    title: string;
    body: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    callNow: string;
    formTitle: string;
    formHint: string;
    thanksTitle: string;
    thanksBodyBefore: string;
    thanksBodyAfter: string;
    name: string;
    namePlaceholder: string;
    phone: string;
    phonePlaceholder: string;
    need: string;
    needPlaceholder: string;
    message: string;
    messagePlaceholder: string;
    send: string;
  };
  mobileCta: {
    callNow: string;
  };
  footer: {
    servicesLine: string;
    phone: string;
    madeBy: string;
    backToTop: string;
  };
};

const el: Dictionary = {
  site: {
    name: "Κώστας Γάλλος",
    tagline: "Κηπουρική & Συντήρηση Κήπων",
    title: "Κώστας Γάλλος | Κηπουρική & Συντήρηση Κήπων",
    description:
      "Κηπουρική, συντήρηση κήπων, κοπή χόρτων, καθαρισμός οικοπέδων, φυσικός χλοοτάπητας και φροντίδα πρασίνου από τον Κώστα Γάλλο με 20 χρόνια εμπειρίας στην Ελβετία.",
    keywords: [
      "Κώστας Γάλλος",
      "κηπουρική",
      "συντήρηση κήπων",
      "κοπή χόρτων",
      "καθαρισμός οικοπέδων",
      "φυσικός χλοοτάπητας",
      "φυτοπροστασία",
      "φροντίδα πρασίνου",
    ],
  },
  a11y: {
    skipToContent: "Μετάβαση στο περιεχόμενο",
    mainNav: "Κύρια πλοήγηση",
    openMenu: "Άνοιγμα μενού",
    closeMenu: "Κλείσιμο μενού",
    navMenu: "Μενού πλοήγησης",
    experienceSummary: "Σύνοψη εμπειρίας",
  },
  nav: {
    services: "Υπηρεσίες",
    experience: "Εμπειρία",
    whyUs: "Γιατί εμάς",
    process: "Διαδικασία",
    contact: "Επικοινωνία",
    callNow: "Καλέστε τώρα",
  },
  hero: {
    imageLabel:
      "Ατμοσφαιρική φωτογραφία περιποιημένου κήπου με φυσικό γκαζόν",
    headline: "Κήποι που αξίζει να χαίρεσαι.",
    subhead:
      "Κηπουρική, συντήρηση κήπων, κοπή χόρτων, καθαρισμοί οικοπέδων και εγκατάσταση φυσικού χλοοτάπητα.",
    badgeExperience: "20+ Χρόνια Εμπειρίας",
    badgeSwitzerland: "Εμπειρία στην Ελβετία",
    callNow: "Καλέστε τώρα",
    seeServices: "Δείτε τις υπηρεσίες",
  },
  experience: {
    eyebrow: "Εμπειρία",
    title: "20 χρόνια εμπειρίας από την Ελβετία",
    p1: "Με 20 χρόνια επαγγελματικής εμπειρίας στην Ελβετία στον χώρο της κηπουρικής και της φροντίδας πρασίνου, ο Κώστας Γάλλος προσφέρει υπεύθυνες και προσεγμένες λύσεις για κάθε εξωτερικό χώρο.",
    p2: "Η εμπειρία αυτή αποκτήθηκε στην ίδια επαγγελματική δραστηριότητα — κηπουρική, συντήρηση κήπων και φροντίδα πρασίνου — και εφαρμόζεται σήμερα με συνέπεια σε κάθε έργο.",
    yearsLabel: "Χρόνια εμπειρίας",
    badge: "Εμπειρία Ελλάδας & Ελβετίας",
  },
  services: {
    eyebrow: "Υπηρεσίες",
    title: "Οι υπηρεσίες μας",
    intro:
      "Αναλαμβάνουμε τη φροντίδα του χώρου σας από την αρχή μέχρι τη συνεχή συντήρησή του.",
    items: [
      {
        id: "syntirisi",
        title: "Συντήρηση Κήπων",
        description:
          "Τακτική φροντίδα και συντήρηση ώστε ο κήπος να παραμένει καθαρός, υγιής και περιποιημένος.",
        icon: "sprout",
      },
      {
        id: "kopi-horton",
        title: "Κοπή Χόρτων",
        description:
          "Κοπή και περιποίηση χόρτων για αυλές, κήπους και επαγγελματικούς χώρους.",
        icon: "scissors",
      },
      {
        id: "katharismos",
        title: "Καθαρισμός Οικοπέδων",
        description:
          "Καθαρισμός οικοπέδων από χόρτα, ανεπιθύμητη βλάστηση και φυτικά υπολείμματα.",
        icon: "home",
      },
      {
        id: "chlootapitas",
        title: "Εγκατάσταση Φυσικού Χλοοτάπητα",
        description:
          "Εγκατάσταση φυσικού γκαζόν για τη δημιουργία ενός όμορφου και φυσικού χώρου πρασίνου.",
        icon: "leaf",
      },
      {
        id: "frondida",
        title: "Φροντίδα Δέντρων & Πρασίνου",
        description: "Φροντίδα φυτών, δέντρων και γενικότερα του πράσινου χώρου.",
        icon: "tree",
      },
      {
        id: "fytoprostasia",
        title: "Φυτοπροστασία & Ψεκασμοί",
        description:
          "Σε συνεργασία με γεωπόνο, αναλαμβάνονται ψεκασμοί δέντρων και αντιμετώπιση ασθενειών και προβλημάτων που επηρεάζουν τα φυτά και το πράσινο.",
        icon: "shield",
      },
    ],
  },
  phyto: {
    eyebrow: "Φυτοπροστασία",
    title: "Όταν το πράσινο χρειάζεται εξειδικευμένη φροντίδα",
    body: "Δεν αναλαμβάνουμε μόνο τη συντήρηση του κήπου. Όταν ένα φυτό ή δέντρο παρουσιάζει ασθένεια ή κάποιο πρόβλημα, υπάρχει συνεργασία με γεωπόνο για την κατάλληλη αντιμετώπιση και τους απαραίτητους ψεκασμούς.",
    card1Title: "Συνεργασία με γεωπόνο",
    card1Body:
      "Εξειδικευμένη υποστήριξη για φυτοπροστασία και ψεκασμούς, όταν το πράσινο το χρειάζεται.",
    card2Title: "Φροντίδα για φυτά & δέντρα",
    card2Body:
      "Προσεγμένη αντιμετώπιση προβλημάτων που επηρεάζουν την υγεία και την εμφάνιση του χώρου σας.",
  },
  why: {
    eyebrow: "Αξιοπιστία",
    title: "Γιατί να μας επιλέξετε",
    items: [
      "20+ χρόνια επαγγελματικής εμπειρίας",
      "Εμπειρία 20 ετών στην Ελβετία",
      "Υπεύθυνη και προσεγμένη εργασία",
      "Ολοκληρωμένες υπηρεσίες πρασίνου",
      "Συνεργασία με γεωπόνο",
      "Από έναν μικρό κήπο έως ένα μεγάλο οικόπεδο",
    ],
  },
  gallery: {
    eyebrow: "Έργα",
    title: "Στιγμές από τους κήπους μας",
    intro:
      "Πραγματικές φωτογραφίες από εργασίες στον χώρο — καθαρισμός, φροντίδα και πράσινο που αναπνέει.",
    photoFallback: "Φωτογραφία από εργασία κήπου",
    photoAlts: [
      "Πράσινος κήπος με γκαζόν και πέτρινο τοίχο",
      "Κήπος με θέα στον λόφο μετά από φροντίδα",
      "Καθαρισμός φράχτη και ξεραμένων κλαδιών",
      "Συντήρηση πέτρινου τοίχου και μεταλλικού φράχτη",
      "Αφαίρεση αναρριχώμενων φυτών από φράχτη",
      "Συλλογή κλαδεμάτων σε σακούλα κήπου",
      "Καθαρισμός ξεραμένης φυλλωσιάς από φράχτη",
      "Κουρεμένος θάμνος και γκαζόν με θέα στη θάλασσα",
    ],
  },
  process: {
    eyebrow: "Διαδικασία",
    title: "Πώς δουλεύουμε",
    steps: [
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
    ],
  },
  cta: {
    title: "Ο κήπος σας χρειάζεται φροντίδα;",
    body: "Από τη συντήρηση και την κοπή χόρτων μέχρι το φυσικό γκαζόν και τη φροντίδα των δέντρων, αναλαμβάνουμε τη δουλειά.",
  },
  contact: {
    eyebrow: "Επικοινωνία",
    title: "Επικοινωνήστε μαζί μας",
    callNow: "Καλέστε τώρα",
    formTitle: "Στείλτε μήνυμα",
    formHint:
      "Η φόρμα είναι έτοιμη για σύνδεση με υπηρεσία email. Μέχρι τότε, η άμεση επικοινωνία γίνεται τηλεφωνικά.",
    thanksTitle: "Ευχαριστούμε για το ενδιαφέρον σας.",
    thanksBodyBefore:
      "Η αποστολή μέσω φόρμας δεν είναι ακόμα ενεργή. Καλέστε μας στο",
    thanksBodyAfter: "για άμεση επικοινωνία.",
    name: "Ονοματεπώνυμο",
    namePlaceholder: "Το ονοματεπώνυμό σας",
    phone: "Τηλέφωνο",
    phonePlaceholder: "Το τηλέφωνό σας",
    need: "Τι χρειάζεστε;",
    needPlaceholder: "π.χ. κοπή χόρτων, συντήρηση κήπου",
    message: "Μήνυμα",
    messagePlaceholder: "Περιγράψτε σύντομα τον χώρο ή την ανάγκη σας",
    send: "Αποστολή",
  },
  mobileCta: {
    callNow: "Κλήση τώρα",
  },
  footer: {
    servicesLine:
      "Κηπουρική • Συντήρηση Κήπων • Φυσικός Χλοοτάπητας • Καθαρισμοί Οικοπέδων • Φυτοπροστασία",
    phone: "Τηλέφωνο",
    madeBy: "Φτιάχτηκε από",
    backToTop: "Επιστροφή στην κορυφή",
  },
};

const en: Dictionary = {
  site: {
    name: "Kostas Gallos",
    tagline: "Gardening & Garden Maintenance",
    title: "Kostas Gallos | Gardening & Garden Maintenance",
    description:
      "Gardening, garden maintenance, grass cutting, plot clearing, natural lawn installation and green-care services by Kostas Gallos, with 20 years of experience in Switzerland.",
    keywords: [
      "Kostas Gallos",
      "gardening",
      "garden maintenance",
      "grass cutting",
      "plot clearing",
      "natural lawn",
      "plant protection",
      "green care",
    ],
  },
  a11y: {
    skipToContent: "Skip to content",
    mainNav: "Main navigation",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    navMenu: "Navigation menu",
    experienceSummary: "Experience summary",
  },
  nav: {
    services: "Services",
    experience: "Experience",
    whyUs: "Why us",
    process: "Process",
    contact: "Contact",
    callNow: "Call now",
  },
  hero: {
    imageLabel: "Atmospheric photo of a well-kept garden with natural lawn",
    headline: "Gardens worth enjoying.",
    subhead:
      "Gardening, garden maintenance, grass cutting, plot clearing and natural lawn installation.",
    badgeExperience: "20+ Years of Experience",
    badgeSwitzerland: "Experience in Switzerland",
    callNow: "Call now",
    seeServices: "See our services",
  },
  experience: {
    eyebrow: "Experience",
    title: "20 years of experience from Switzerland",
    p1: "With 20 years of professional experience in Switzerland in gardening and green care, Kostas Gallos offers responsible, carefully delivered solutions for every outdoor space.",
    p2: "That experience was built in the same line of work — gardening, garden maintenance and green care — and is applied today with consistency on every project.",
    yearsLabel: "Years of experience",
    badge: "Experience in Greece & Switzerland",
  },
  services: {
    eyebrow: "Services",
    title: "Our services",
    intro:
      "We take care of your outdoor space from the first visit through ongoing maintenance.",
    items: [
      {
        id: "syntirisi",
        title: "Garden Maintenance",
        description:
          "Regular care and upkeep so your garden stays clean, healthy and well-kept.",
        icon: "sprout",
      },
      {
        id: "kopi-horton",
        title: "Grass Cutting",
        description:
          "Cutting and finishing lawns for yards, gardens and commercial outdoor spaces.",
        icon: "scissors",
      },
      {
        id: "katharismos",
        title: "Plot Clearing",
        description:
          "Clearing plots of overgrown grass, unwanted vegetation and plant debris.",
        icon: "home",
      },
      {
        id: "chlootapitas",
        title: "Natural Lawn Installation",
        description:
          "Installing natural turf to create a beautiful, living green space.",
        icon: "leaf",
      },
      {
        id: "frondida",
        title: "Tree & Green Care",
        description:
          "Care for plants, trees and outdoor green areas as a whole.",
        icon: "tree",
      },
      {
        id: "fytoprostasia",
        title: "Plant Protection & Spraying",
        description:
          "In collaboration with an agronomist, we handle tree spraying and the treatment of diseases and issues affecting plants and greenery.",
        icon: "shield",
      },
    ],
  },
  phyto: {
    eyebrow: "Plant protection",
    title: "When greenery needs specialist care",
    body: "We do more than routine garden maintenance. When a plant or tree shows disease or another problem, we work with an agronomist for the right treatment and necessary spraying.",
    card1Title: "Collaboration with an agronomist",
    card1Body:
      "Specialist support for plant protection and spraying whenever your greenery needs it.",
    card2Title: "Care for plants & trees",
    card2Body:
      "Careful treatment of problems that affect the health and appearance of your outdoor space.",
  },
  why: {
    eyebrow: "Trust",
    title: "Why choose us",
    items: [
      "20+ years of professional experience",
      "20 years of experience in Switzerland",
      "Responsible, carefully delivered work",
      "Complete green-care services",
      "Collaboration with an agronomist",
      "From a small garden to a large plot",
    ],
  },
  gallery: {
    eyebrow: "Projects",
    title: "Moments from our gardens",
    intro:
      "Real photos from work on site — cleanup, care, and gardens that breathe again.",
    photoFallback: "Garden work photo",
    photoAlts: [
      "Green lawn garden with a stone wall",
      "Garden with hillside view after care",
      "Fence cleanup and dried brush removal",
      "Stone wall and metal fence maintenance",
      "Climbing plants cleared from a fence",
      "Garden clippings collected in a bulk bag",
      "Dried foliage cleared from a fence",
      "Trimmed hedge and lawn with sea view",
    ],
  },
  process: {
    eyebrow: "Process",
    title: "How we work",
    steps: [
      {
        number: "01",
        title: "Contact",
        description: "We talk about your space and what you need.",
      },
      {
        number: "02",
        title: "Job assessment",
        description: "We see what the space requires.",
      },
      {
        number: "03",
        title: "Work",
        description: "We carry out the work with consistency and care.",
      },
      {
        number: "04",
        title: "Your space, as it should be",
        description: "We hand over a clean, well-kept outdoor space.",
      },
    ],
  },
  cta: {
    title: "Does your garden need care?",
    body: "From maintenance and grass cutting to natural lawn and tree care, we take care of the work.",
  },
  contact: {
    eyebrow: "Contact",
    title: "Get in touch",
    callNow: "Call now",
    formTitle: "Send a message",
    formHint:
      "The form is ready to connect to an email service. Until then, the fastest way to reach us is by phone.",
    thanksTitle: "Thank you for your interest.",
    thanksBodyBefore:
      "Form submission is not active yet. Call us at",
    thanksBodyAfter: "for direct contact.",
    name: "Full name",
    namePlaceholder: "Your full name",
    phone: "Phone",
    phonePlaceholder: "Your phone number",
    need: "What do you need?",
    needPlaceholder: "e.g. grass cutting, garden maintenance",
    message: "Message",
    messagePlaceholder: "Briefly describe your space or need",
    send: "Send",
  },
  mobileCta: {
    callNow: "Call now",
  },
  footer: {
    servicesLine:
      "Gardening • Garden Maintenance • Natural Lawn • Plot Clearing • Plant Protection",
    phone: "Phone",
    madeBy: "Made by",
    backToTop: "Back to top",
  },
};

const de: Dictionary = {
  site: {
    name: "Kostas Gallos",
    tagline: "Gartenpflege & Gartenunterhalt",
    title: "Kostas Gallos | Gartenpflege & Gartenunterhalt",
    description:
      "Gartenpflege, Gartenunterhalt, Rasenschnitt, Grundstückspflege, Verlegung von Naturrasen und Grünflächenpflege von Kostas Gallos — mit 20 Jahren Erfahrung in der Schweiz.",
    keywords: [
      "Kostas Gallos",
      "Gartenpflege",
      "Gartenunterhalt",
      "Rasenschnitt",
      "Grundstückspflege",
      "Naturrasen",
      "Pflanzenschutz",
      "Grünflächenpflege",
    ],
  },
  a11y: {
    skipToContent: "Zum Inhalt springen",
    mainNav: "Hauptnavigation",
    openMenu: "Menü öffnen",
    closeMenu: "Menü schließen",
    navMenu: "Navigationsmenü",
    experienceSummary: "Erfahrungsübersicht",
  },
  nav: {
    services: "Leistungen",
    experience: "Erfahrung",
    whyUs: "Warum wir",
    process: "Ablauf",
    contact: "Kontakt",
    callNow: "Jetzt anrufen",
  },
  hero: {
    imageLabel: "Atmosphärisches Foto eines gepflegten Gartens mit Naturrasen",
    headline: "Gärten, an denen man Freude hat.",
    subhead:
      "Gartenpflege, Gartenunterhalt, Rasenschnitt, Grundstückspflege und Verlegung von Naturrasen.",
    badgeExperience: "20+ Jahre Erfahrung",
    badgeSwitzerland: "Erfahrung in der Schweiz",
    callNow: "Jetzt anrufen",
    seeServices: "Leistungen ansehen",
  },
  experience: {
    eyebrow: "Erfahrung",
    title: "20 Jahre Erfahrung aus der Schweiz",
    p1: "Mit 20 Jahren Berufserfahrung in der Schweiz in Gartenpflege und Grünflächenpflege bietet Kostas Gallos verantwortungsvolle und sorgfältige Lösungen für jeden Außenbereich.",
    p2: "Diese Erfahrung entstand in derselben beruflichen Tätigkeit — Gartenpflege, Gartenunterhalt und Grünflächenpflege — und wird heute mit Konsequenz in jedes Projekt eingebracht.",
    yearsLabel: "Jahre Erfahrung",
    badge: "Erfahrung in Griechenland & der Schweiz",
  },
  services: {
    eyebrow: "Leistungen",
    title: "Unsere Leistungen",
    intro:
      "Wir übernehmen die Pflege Ihres Außenbereichs vom ersten Schritt bis zur laufenden Betreuung.",
    items: [
      {
        id: "syntirisi",
        title: "Gartenunterhalt",
        description:
          "Regelmäßige Pflege und Betreuung, damit der Garten sauber, gesund und gepflegt bleibt.",
        icon: "sprout",
      },
      {
        id: "kopi-horton",
        title: "Rasenschnitt",
        description:
          "Schnitt und Pflege von Rasenflächen für Höfe, Gärten und gewerbliche Außenbereiche.",
        icon: "scissors",
      },
      {
        id: "katharismos",
        title: "Grundstückspflege",
        description:
          "Reinigung von Grundstücken von Gras, unerwünschtem Bewuchs und Pflanzenresten.",
        icon: "home",
      },
      {
        id: "chlootapitas",
        title: "Verlegung von Naturrasen",
        description:
          "Verlegung von Naturrasen für einen schönen und natürlichen Grünraum.",
        icon: "leaf",
      },
      {
        id: "frondida",
        title: "Baumpflege & Grünflächen",
        description:
          "Pflege von Pflanzen, Bäumen und Grünflächen insgesamt.",
        icon: "tree",
      },
      {
        id: "fytoprostasia",
        title: "Pflanzenschutz & Spritzungen",
        description:
          "In Zusammenarbeit mit einem Agronomen übernehmen wir Baumspritzungen sowie die Behandlung von Krankheiten und Problemen, die Pflanzen und Grünflächen betreffen.",
        icon: "shield",
      },
    ],
  },
  phyto: {
    eyebrow: "Pflanzenschutz",
    title: "Wenn Grünflächen spezialisierte Pflege brauchen",
    body: "Wir übernehmen nicht nur den Gartenunterhalt. Wenn eine Pflanze oder ein Baum eine Krankheit oder ein anderes Problem zeigt, arbeiten wir mit einem Agronomen für die passende Behandlung und die notwendigen Spritzungen zusammen.",
    card1Title: "Zusammenarbeit mit einem Agronomen",
    card1Body:
      "Fachliche Unterstützung für Pflanzenschutz und Spritzungen, wenn das Grün es braucht.",
    card2Title: "Pflege für Pflanzen & Bäume",
    card2Body:
      "Sorgfältige Behandlung von Problemen, die Gesundheit und Erscheinungsbild Ihres Außenbereichs beeinflussen.",
  },
  why: {
    eyebrow: "Vertrauen",
    title: "Warum Sie uns wählen sollten",
    items: [
      "Über 20 Jahre Berufserfahrung",
      "20 Jahre Erfahrung in der Schweiz",
      "Verantwortungsvolle und sorgfältige Arbeit",
      "Komplette Grünflächenpflege",
      "Zusammenarbeit mit einem Agronomen",
      "Vom kleinen Garten bis zum großen Grundstück",
    ],
  },
  gallery: {
    eyebrow: "Projekte",
    title: "Momente aus unseren Gärten",
    intro:
      "Echte Fotos von der Arbeit vor Ort — Reinigung, Pflege und Gärten, die wieder atmen.",
    photoFallback: "Foto einer Gartenarbeit",
    photoAlts: [
      "Grüner Rasengarten mit Steinmauer",
      "Garten mit Hügelblick nach der Pflege",
      "Zaunreinigung und Entfernung von Totholz",
      "Pflege von Steinmauer und Metallzaun",
      "Kletterpflanzen vom Zaun entfernt",
      "Gartenschnitt in einem Big Bag gesammelt",
      "Vertrocknetes Laub vom Zaun entfernt",
      "Geschnittene Hecke und Rasen mit Meerblick",
    ],
  },
  process: {
    eyebrow: "Ablauf",
    title: "So arbeiten wir",
    steps: [
      {
        number: "01",
        title: "Kontakt",
        description: "Wir sprechen über Ihren Raum und Ihre Bedürfnisse.",
      },
      {
        number: "02",
        title: "Einschätzung",
        description: "Wir sehen, was der Raum braucht.",
      },
      {
        number: "03",
        title: "Arbeit",
        description: "Wir führen die Arbeit konsequent und sorgfältig aus.",
      },
      {
        number: "04",
        title: "Ihr Raum, wie er sein soll",
        description: "Wir übergeben einen sauberen und gepflegten Außenbereich.",
      },
    ],
  },
  cta: {
    title: "Braucht Ihr Garten Pflege?",
    body: "Von Unterhalt und Rasenschnitt bis zu Naturrasen und Baumpflege — wir übernehmen die Arbeit.",
  },
  contact: {
    eyebrow: "Kontakt",
    title: "Kontaktieren Sie uns",
    callNow: "Jetzt anrufen",
    formTitle: "Nachricht senden",
    formHint:
      "Das Formular ist bereit für die Anbindung an einen E-Mail-Dienst. Bis dahin erreichen Sie uns am schnellsten telefonisch.",
    thanksTitle: "Vielen Dank für Ihr Interesse.",
    thanksBodyBefore:
      "Der Versand über das Formular ist noch nicht aktiv. Rufen Sie uns unter",
    thanksBodyAfter: "für direkten Kontakt an.",
    name: "Vollständiger Name",
    namePlaceholder: "Ihr vollständiger Name",
    phone: "Telefon",
    phonePlaceholder: "Ihre Telefonnummer",
    need: "Was brauchen Sie?",
    needPlaceholder: "z. B. Rasenschnitt, Gartenunterhalt",
    message: "Nachricht",
    messagePlaceholder: "Beschreiben Sie kurz Ihren Raum oder Bedarf",
    send: "Senden",
  },
  mobileCta: {
    callNow: "Jetzt anrufen",
  },
  footer: {
    servicesLine:
      "Gartenpflege • Gartenunterhalt • Naturrasen • Grundstückspflege • Pflanzenschutz",
    phone: "Telefon",
    madeBy: "Erstellt von",
    backToTop: "Zurück nach oben",
  },
};

export const dictionaries: Record<Locale, Dictionary> = {
  el,
  en,
  de,
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries.el;
}
