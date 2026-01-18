
"use client";

import * as React from "react";
import Image from "next/image";
// import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

interface CollegeImageCarouselProps {
  images: string[];
  collegeName: string;
  onClick: (e: any) => void;
}

export function CollegeImageCarousel({ images, collegeName }: CollegeImageCarouselProps) {
 const [mainApi, setMainApi] = React.useState<CarouselApi>();
  const [thumbApi, setThumbApi] = React.useState<CarouselApi>();
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  React.useEffect(() => {
    if (!mainApi || !thumbApi) return;

    const onSelect = () => {
      const idx = mainApi.selectedScrollSnap();
      setSelectedIndex(idx);
      thumbApi.scrollTo(idx);
    };

    mainApi.on("select", onSelect);
    onSelect();

    return () => {
      mainApi.off("select", onSelect);
    };
  }, [mainApi, thumbApi]);

  const onThumbClick = (index: number) => {
    mainApi?.scrollTo(index);
  };

  const stopCardNavigation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div className="px-1 py-2" onClick={stopCardNavigation}>
{/* ─── Main Carousel ──────────────────────────────────────── */}
      <Carousel
        setApi={setMainApi}
        // plugins={[plugin.current]}
        className="w-full"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent className="-ml-1 md:-ml-2">
          {images.map((image, index) => (
            <CarouselItem key={index} className="pl-1 md:pl-2 basis-full">
              <div className="relative w-full max-h-[min(70vh,320px)] mx-auto">
                <div className="relative pb-[56.25%] w-full overflow-hidden rounded-lg bg-muted/40">
                  <Image
                    src={image || "/placeholder.svg?height=9&width=16"}
                    alt={`${collegeName} campus image ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 464px"
                    priority={index === 0}
                  />
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2 md:left-4" />
        <CarouselNext className="right-2 md:right-4" />
      </Carousel>

      {/* ─── Thumbnails ─────────────────────────────────────────── */}
      <Carousel
        setApi={setThumbApi}
        className="w-full mt-4"
        opts={{ dragFree: true, containScroll: "trimSnaps" }}
      >
        <CarouselContent className="-ml-2">
          {images.map((image, index) => (
            <CarouselItem
              key={index}
              className="pl-2 basis-1/3 sm:basis-1/4 md:basis-1/5 lg:basis-[25%]"
              onClick={(e) => {
                stopCardNavigation(e);
                onThumbClick(index);
              }}
            >
              <div
                className={`relative pb-[58.25%] rounded-md overflow-hidden cursor-pointer transition-all
                  ${index === selectedIndex ? "" : "opacity-50 hover:opacity-90"}`}
              >
                <Image
                  src={image || "/placeholder.svg?height=9&width=16"}
                  alt={`${collegeName} thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="240px"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
