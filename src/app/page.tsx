import Hero from "@/components/Hero";
import ExperienceSection from "@/components/ExperienceSection";
import Services from "@/components/Services";
import Phytoprotection from "@/components/Phytoprotection";
import WhyChooseUs from "@/components/WhyChooseUs";
import BeforeAfter from "@/components/BeforeAfter";
import Process from "@/components/Process";
import CTA from "@/components/CTA";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <main id="main">
        <Hero />
        <ExperienceSection />
        <Services />
        <Phytoprotection />
        <WhyChooseUs />
        <BeforeAfter />
        <Process />
        <CTA />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
