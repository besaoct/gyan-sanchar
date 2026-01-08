'use client'

import { useState, useEffect } from "react";
import { BookConsultationForm } from "@/components/common/book-consultation-form";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import Link from "next/link";
import { getHomeData, HomeHeroSection, ApiResponse } from "@/lib/api/data/home";
import HeroSectionSkeleton from "./skeletons/HeroSectionSkeleton";

export default function HeroSection() {
  const [heroData, setHeroData] = useState<HomeHeroSection | null>(null);
  const [loading, setLoading] = useState(true);

  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const response: ApiResponse<any> = await getHomeData();
        if (response.status && response.data) {
          setHeroData(response.data.hero_section);
        }
      } catch (error) {
        console.error("Failed to fetch hero data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHeroData();
  }, []);



  if (loading) {
    return <HeroSectionSkeleton />;
  }

  if (!heroData) {
    return null; // or a fallback component
  }


  // Extract YouTube ID from various URL formats
  const getYoutubeId = (url?: string) => {
    if (!url) return null;
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const videoId = getYoutubeId(heroData.youtube_video_link);
  const thumbnailUrl = videoId
    ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg` // or maxresdefault.jpg for higher res
    : "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80";

  const embedUrl = videoId
    ? `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`
    : null;

  return (
    <section
      className="relative text-white overflow-hidden bg-[#04377a]"
      style={{
        minHeight: "500px",
      }}
    >
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="flex-1 max-w-2xl text-center lg:text-left">
            <h1
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight"
              dangerouslySetInnerHTML={{ __html: heroData.heading.replace(/,/g, ",<br />") }}
            ></h1>
            <p className="text-lg md:text-xl mb-8 opacity-90">
              {heroData.sub_heading}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center lg:justify-start">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white px-6 md:px-8 py-3 text-base md:text-lg">
                <Link href="/colleges" className="block w-full">
                  Find Your College
                </Link>
              </Button>
              <BookConsultationForm
                trigger={
                  <Button
                    variant="outline"
                    className="border-white hover:bg-white hover:text-blue-900 px-6 md:px-8 py-3 text-base md:text-lg bg-transparent"
                  >
                    Book a Live Consultation
                  </Button>
                }
              />
            </div>
            <Link href={heroData.youtube_video_link || '#'} passHref>
              <p className="text-sm opacity-75 underline cursor-pointer">
                {heroData.title}
              </p>
            </Link>
          </div>
<div className="flex-1 relative w-full lg:max-w-none rounded-lg overflow-hidden cursor-pointer">
      {!isPlaying ? (
        <>
          {/* Thumbnail */}
          <img
            src={thumbnailUrl}
            alt="Video thumbnail"
            className="w-full h-auto object-cover aspect-video"
          />

          {/* Play Button Overlay */}
          <div
            className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors"
            onClick={() => setIsPlaying(true)}
          >
            <Button
              size="lg"
              className="rounded-full w-16 h-16 md:w-20 md:h-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm"
            >
              <Play className="w-8 h-8 md:w-12 md:h-12 text-white fill-white ml-1" />
            </Button>
          </div>
        </>
      ) : (
        /* Embedded Player - plays inline */
        <div className="aspect-video w-full ">
          <iframe
            src={embedUrl ||""}
            title="Embedded YouTube video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full border-0 aspect-video"
          /> 
        </div>
      )}
    </div>

        </div>
      </div>
    </section>
  );
}
