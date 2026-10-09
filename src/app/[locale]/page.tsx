import { notFound } from "next/navigation";
import Hero from "@/components/Hero";
import ExperienceSection from "@/components/ExperienceSection";
import Services from "@/components/Services";
import Phytoprotection from "@/components/Phytoprotection";
import WhyChooseUs from "@/components/WhyChooseUs";
import WorkGallery from "@/components/WorkGallery";
import Process from "@/components/Process";
import CTA from "@/components/CTA";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollFallingLeaves from "@/components/ScrollFallingLeaves";
import { isLocale } from "@/i18n/config";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function Home({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <>
      <ScrollFallingLeaves />
      <main id="main">
        <Hero locale={locale} />
        <ExperienceSection locale={locale} />
        <Services locale={locale} />
        <Phytoprotection locale={locale} />
        <WhyChooseUs locale={locale} />
        <WorkGallery locale={locale} />
        <Process locale={locale} />
        <CTA locale={locale} />
        <Contact locale={locale} />
      </main>
      <Footer locale={locale} />
    </>
  );
}
