'use client'

import Image from "next/image";
import { MediaItem } from "@/lib/api/data/home";

interface MediaSectionProps {
  media: MediaItem[];
}

export default function MediaSection({ media }: MediaSectionProps) {
  if (!media || media.length === 0) {
    return null;
  }

  return (
    <section className="py-8 md:py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-xl md:text-2xl font-bold text-center mb-8">Praised by the media</h2>
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
