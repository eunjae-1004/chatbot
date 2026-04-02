import { CategoryCards } from "@/components/CategoryCards";
import { FaqPreview } from "@/components/FaqPreview";
import { FinalCta } from "@/components/FinalCta";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";

export default function LandingPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-7xl px-4 pb-8 pt-6 md:px-6 md:pt-8 lg:px-8">
        <Hero />
        <CategoryCards />
        <HowItWorks />
        <FaqPreview />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
