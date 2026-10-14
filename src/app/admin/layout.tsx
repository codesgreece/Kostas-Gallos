import type { Metadata } from "next";
import { Literata, Source_Sans_3 } from "next/font/google";
import "../globals.css";

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

export const metadata: Metadata = {
  title: "Admin · Διαχείριση φωτογραφιών",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="el"
      className={`${sourceSans.variable} ${literata.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-off-white font-sans text-ink">
        {children}
      </body>
    </html>
  );
}
