
"use client";

import * as React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
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
    if (!mainApi || !thumbApi) {
      return;
    }

    const onSelect = () => {
      setSelectedIndex(mainApi.selectedScrollSnap());
      thumbApi.scrollTo(mainApi.selectedScrollSnap());
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
    <div  onClick={stopCardNavigation}>
      <Carousel
       onClick={stopCardNavigation}
        setApi={setMainApi}
        // plugins={[plugin.current.]}
        className="w-full bg-transparent"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent className="bg-transparent">
          {images.map((image, index) => (
            <CarouselItem key={index} className="bg-transparent">
              <Card className="border-none shadow-none bg-transparent">
                <CardContent className="relative aspect-video bg-transparent">
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${collegeName} campus image ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <Carousel setApi={setThumbApi} className="w-full mt-4">
        <CarouselContent className="flex gap-2">
          {images.map((image, index) => (
            <CarouselItem
              key={index}
              onClick={(e:React.MouseEvent) =>
              { 
                return (
                stopCardNavigation(e),
                onThumbClick(index)
              )}
              }
              className="basis-1/4 cursor-pointer"
            >
              <div
                className={`relative aspect-video transition-opacity ${
                  index === selectedIndex ? "opacity-100" : "opacity-50"
                }`}
              >
                <Image
                  src={`${image}` || "/placeholder.svg"}
                  alt={`${collegeName} thumbnail ${index + 1}`}
                  fill
                  className="object-cover rounded-md"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
