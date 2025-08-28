import BenefitsSection from "@/components/benefits-section";
import FeaturesSection from "@/components/features-section";
import Footer from "@/components/footer";
import Header from "@/components/header";
import HeroSection from "@/components/hero-section";
import TechStackSection from "@/components/tech-stack-section";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
        <main>
        <HeroSection />
        <FeaturesSection/>
        <BenefitsSection />
        <TechStackSection />
      </main>
      <Footer/>
    </div>
  );
}
