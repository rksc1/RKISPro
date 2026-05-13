import { CategoryGrid } from "@/components/landing/CategoryGrid";
import { FeatureCards } from "@/components/landing/FeatureCards";
import { FooterSection } from "@/components/landing/FooterSection";
import { HeroBanner } from "@/components/landing/HeroBanner";
import { ManagedVsOpenMarketplaces } from "@/components/landing/ManagedVsOpenMarketplaces";
import { ProcessSteps } from "@/components/landing/ProcessSteps";
import { RFQFeed } from "@/components/landing/RFQFeed";
import { StickyNavbar } from "@/components/landing/StickyNavbar";
import { TrustWorkflowSection } from "@/components/landing/TrustWorkflowSection";
import { VendorCTA } from "@/components/landing/VendorCTA";
import { VendorMatchingSection } from "@/components/landing/VendorMatchingSection";

export default function HomePage() {
  return (
    <>
      <StickyNavbar />
      <main>
        <HeroBanner />
        <FeatureCards />
        <ProcessSteps />
        <ManagedVsOpenMarketplaces />
        <VendorMatchingSection />
        <CategoryGrid />
        <RFQFeed />
        <TrustWorkflowSection />
        <VendorCTA />
      </main>
      <FooterSection />
    </>
  );
}
