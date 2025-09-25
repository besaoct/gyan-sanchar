
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { HeroIntroSection } from "@/components/about/HeroIntroSection";
import { OurMissionSection } from "@/components/about/OurMissionSection";
import { OurVisionSection } from "@/components/about/OurVisionSection";
import { KeyHighlightsSection } from "@/components/about/KeyHighlightsSection";
import { HowWeHelpStudentsSection } from "@/components/about/HowWeHelpStudentsSection";
import { ForCollegesSection } from "@/components/about/ForCollegesSection";
import { CallToActionSection } from "@/components/about/CallToActionSection";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroIntroSection />
      <OurMissionSection />
      <OurVisionSection />
      <KeyHighlightsSection />
      <HowWeHelpStudentsSection />
      <ForCollegesSection />
      <CallToActionSection />
      <Footer />
    </div>
  );
}
