import { CategoryGrid } from "@/components/landing/CategoryGrid";
import { FAQAccordion } from "@/components/landing/FAQAccordion";
import { FeatureCards } from "@/components/landing/FeatureCards";
import { FooterSection } from "@/components/landing/FooterSection";
import { HeroBanner } from "@/components/landing/HeroBanner";
import { ProcessSteps } from "@/components/landing/ProcessSteps";
import { RFQFeed } from "@/components/landing/RFQFeed";
import { StatsSection } from "@/components/landing/StatsSection";
import { StickyNavbar } from "@/components/landing/StickyNavbar";
import { TestimonialsCarousel } from "@/components/landing/TestimonialsCarousel";
import { VendorCTA } from "@/components/landing/VendorCTA";

export default function HomePage() {
  return (
    <>
      <StickyNavbar />
      <main>
        <HeroBanner />
        <StatsSection />
        <ProcessSteps />
        <CategoryGrid />
        <FeatureCards />
        <VendorCTA />
        <RFQFeed />
        <TestimonialsCarousel />
        <FAQAccordion />
      </main>
      <FooterSection />
    </>
  );
}
