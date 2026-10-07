import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Literata, Source_Sans_3 } from "next/font/google";
import Navbar from "@/components/Navbar";
import MobileStickyCTA from "@/components/MobileStickyCTA";
import { SITE } from "@/lib/constants";
import {
  defaultLocale,
  htmlLang,
  isLocale,
  locales,
  ogLocale,
  type Locale,
} from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

const sourceSans = Source_Sans_3({
  variable: "--font-sans",
  subsets: ["latin", "latin-ext", "greek"],
  display: "swap",
});

const literata = Literata({
  variable: "--font-display",
  subsets: ["latin", "latin-ext", "greek"],
  display: "swap",
});

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const dict = getDictionary(locale);
  const path = `/${locale}`;

  return {
    metadataBase: new URL(SITE.url),
    title: {
      default: dict.site.title,
      template: `%s | ${dict.site.name}`,
    },
    description: dict.site.description,
    applicationName: dict.site.name,
    keywords: dict.site.keywords,
    authors: [{ name: dict.site.name }],
    creator: dict.site.name,
    alternates: {
      canonical: path,
      languages: {
        el: "/el",
        en: "/en",
        de: "/de",
        "x-default": "/el",
      },
    },
    openGraph: {
      type: "website",
      locale: ogLocale[locale],
      url: `${SITE.url}${path}`,
      title: dict.site.title,
      description: dict.site.description,
      siteName: dict.site.name,
      images: [
        {
          url: "/og-image.svg",
          width: 1200,
          height: 630,
          alt: dict.site.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: dict.site.title,
      description: dict.site.description,
      images: ["/og-image.svg"],
    },
    icons: {
      icon: [
        { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
        { url: "/logo-192.png", sizes: "192x192", type: "image/png" },
      ],
      apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    },
    robots: {
      index: true,
      follow: true,
    },
    formatDetection: {
      telephone: true,
    },
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw;
  const dict = getDictionary(locale);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: dict.site.name,
    description: dict.site.description,
    url: SITE.url,
    telephone: `+30${SITE.phone}`,
    image: `${SITE.url}/logo.png`,
    knowsAbout: dict.services.items.map((item) => item.title),
  };

  return (
    <html
      lang={htmlLang[locale]}
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
          {dict.a11y.skipToContent}
        </a>
        <Navbar locale={locale} />
        {children}
        <MobileStickyCTA locale={locale} />
      </body>
    </html>
  );
}
