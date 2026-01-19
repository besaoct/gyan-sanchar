'use client'

import { useState, useEffect } from "react";
import ApplicationSection from "@/components/home/ApplicationSection";
import CareerGuidanceSection from "@/components/home/CareerGuidanceSection";
import CollegeFinderSection from "@/components/home/CollegeFinderSection";
import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import HeroSection from "@/components/home/HeroSection";
import MediaSection from "@/components/home/MediaSection";
import ServicesSection from "@/components/home/ServicesSection";
import TrustIndicators from "@/components/home/TrustIndicators";
import RequestCallbackSection from "@/components/home/RequestCallbackSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import TopRankedCollegesSection from "@/components/home/TopRankedCollegesSection";
import StudentOfferSection from "@/components/home/StudentOfferSection";
import { ApiResponse, getHomeData, HomeData } from "@/lib/api/data/home";

import TrustIndicatorsSkeleton from "@/components/home/skeletons/TrustIndicatorsSkeleton";
import StudentOfferSectionSkeleton from "@/components/home/skeletons/StudentOfferSectionSkeleton";
import MediaSectionSkeleton from "@/components/home/skeletons/MediaSectionSkeleton";
import ApplicationSectionSkeleton from "@/components/home/skeletons/ApplicationSectionSkeleton";
import TestimonialsSectionSkeleton from "@/components/home/skeletons/TestimonialsSectionSkeleton";
import ServicesSectionSkeleton from "@/components/home/skeletons/ServicesSectionSkeleton";
import CareerGuidanceSectionSkeleton from "@/components/home/skeletons/CareerGuidanceSectionSkeleton";
import RequestCallbackSectionSkeleton from "@/components/home/skeletons/RequestCallbackSectionSkeleton";

export default function HomePage() {
  const [homeData, setHomeData] = useState<HomeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const response: ApiResponse<HomeData> = await getHomeData();
        if (response.status && response.data) {
          setHomeData(response.data);
        } else {
          setError(response.message || "Failed to fetch home data.");
        }
      } catch (err) {
        setError("An unexpected error occurred.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        <p>{error}</p>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      {loading ? (
        <>
          <TrustIndicatorsSkeleton />
          <ServicesSectionSkeleton />
          <StudentOfferSectionSkeleton />
          <MediaSectionSkeleton />
          <CareerGuidanceSectionSkeleton />
          <ApplicationSectionSkeleton />
          <TopRankedCollegesSection />
          <CollegeFinderSection />
          <TestimonialsSectionSkeleton />
          <RequestCallbackSectionSkeleton />
        </>
      ) : (
        homeData ? (
          <>
            <TrustIndicators indicators={homeData.indicators} />
            <ServicesSection courier_cards={homeData.courier_cards} />
            <StudentOfferSection offers={homeData.offers} />
            <MediaSection media={homeData.media} media_title={homeData.media_title} />
            <CareerGuidanceSection recommendations={homeData.recommendations} />
            <ApplicationSection application_sections={homeData.application_sections} />
            <TopRankedCollegesSection />
            <CollegeFinderSection />
            <TestimonialsSection testimonials={homeData.testimonials} />
            <RequestCallbackSection form_sections={homeData.form_sections} />
          </>
        ): <></>
      )}
      
      <Footer />
    </div>
  )
}