"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import BenefitsSection from "@/components/benefits-section";
import FeaturesSection from "@/components/features-section";
import Footer from "@/components/footer";
import HeroSection from "@/components/hero-section";
import Header from "@/components/Navigation";
import TechStackSection from "@/components/tech-stack-section";
import { useSignedInUser } from "@/store/useSignedInUser";

export default function Page() {
  const router = useRouter();
  const { loggedInUser } = useSignedInUser();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    // Simulate async auth check — e.g., from Zustand, cookies, or localStorage
    const timer = setTimeout(() => {
      if (loggedInUser) {
        router.replace("/dashboard");
      }
      setCheckingAuth(false);
    }, 200); // small delay prevents flicker

    return () => clearTimeout(timer);
  }, [loggedInUser, router]);

  // 🕐 Show nothing or a loader while checking
  if (checkingAuth) {
    return <div className="min-h-screen bg-white" />;
  }

  // ✅ Show landing page only if not logged in
  if (loggedInUser) return null;

  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <BenefitsSection />
        <TechStackSection />
      </main>
      <Footer />
    </>
  );
}
