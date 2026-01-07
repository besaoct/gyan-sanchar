'use client'

import Image from "next/image";
import { MediaItem, MediaTitle } from "@/lib/api/data/home";

interface MediaSectionProps {
  media: MediaItem[];
  media_title?: MediaTitle[];
}

export default function MediaSection({ media , media_title}: MediaSectionProps) {
  if (!media || media.length === 0 
  ) {
    return null;
  }

  const title = media_title && media_title.length > 0 ? media_title[0].title : "Praised by the media";


  return (
    <section className="py-8 md:py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-xl md:text-2xl font-bold text-center mb-8">{title}</h2>
        <div className="relative w-full overflow-hidden !max-w-3xl mx-auto">
          <div className="flex animate-marquee whitespace-nowrap ">
            {media.concat(media).map((logo, i) => (
               <div key={i} className="flex-shrink-0 w-36 h-24 flex gap-2 items-center justify-center mx-2">
                <Image src={logo.image} alt={logo.title} width={50} height={50} className="object-contain py-2 h-14 w-fit" />
              </div>
            ))}
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </section>
  );
}
