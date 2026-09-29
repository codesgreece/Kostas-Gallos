import type { Metadata } from "next";
import { Literata, Source_Sans_3 } from "next/font/google";
import Navbar from "@/components/Navbar";
import MobileStickyCTA from "@/components/MobileStickyCTA";
import { SITE } from "@/lib/constants";
import "./globals.css";

const sourceSans = Source_Sans_3({
  variable: "--font-sans",
  subsets: ["latin", "greek"],
  display: "swap",
});

const literata = Literata({
  variable: "--font-display",
  subsets: ["latin", "greek"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.title,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
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
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "el_GR",
    url: SITE.url,
    title: SITE.title,
    description: SITE.description,
    siteName: SITE.name,
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: SITE.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.description,
    images: ["/og-image.svg"],
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
  robots: {
    index: true,
    follow: true,
  },
  formatDetection: {
    telephone: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: SITE.name,
  description: SITE.description,
  url: SITE.url,
  telephone: `+30${SITE.phone}`,
  image: `${SITE.url}/og-image.svg`,
  knowsAbout: [
    "Κηπουρική",
    "Συντήρηση κήπων",
    "Κοπή χόρτων",
    "Καθαρισμός οικοπέδων",
    "Εγκατάσταση φυσικού χλοοτάπητα",
    "Φυτοπροστασία",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="el"
      className={`${sourceSans.variable} ${literata.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-off-white font-sans text-ink">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#main"
          className="focus-ring sr-only left-4 top-4 z-[100] rounded-full bg-white px-4 py-2 text-green-deep focus:not-sr-only focus:absolute"
        >
          Μετάβαση στο περιεχόμενο
        </a>
        <Navbar />
        {children}
        <MobileStickyCTA />
      </body>
    </html>
  );
}
