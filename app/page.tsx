'use client'

import ApplicationFormSection from "@/components/home/ApplicationFormSection";
import CareerGuidanceSection from "@/components/home/CareerGuidanceSection";
import CollegeFinderSection from "@/components/home/CollegeFinderSection";
import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import HeroSection from "@/components/home/HeroSection";
import MediaSection from "@/components/home/MediaSection";
import OnlineDegreesSection from "@/components/home/OnlineDegreesSection";
import ServicesSection from "@/components/home/ServicesSection";
import TrustIndicators from "@/components/home/TrustIndicators";
import RequestCallbackSection from "@/components/home/RequestCallbackSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import TopRankedCollegesSection from "@/components/home/TopRankedCollegesSection";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <TrustIndicators />
      <ServicesSection />
      <OnlineDegreesSection />
      <MediaSection />
      <CareerGuidanceSection />
      <ApplicationFormSection />
      <TopRankedCollegesSection />
      <CollegeFinderSection />
      <TestimonialsSection />
      <RequestCallbackSection />
      <Footer />
    </div>
  )
}