'use client'

import Image from "next/image";

const mediaLogos = [
  { src: "/media/cnbc.webp", alt: "CNBC" },
  { src: "/media/et.webp", alt: "Economic Times" },
  { src: "/media/ht.webp", alt: "Hindustan Times" },
  { src: "/media/ie.webp", alt: "Indian Express" },
  { src: "/media/mint.webp", alt: "Mint" },
  { src: "/media/toi.webp", alt: "Times of India" },
];

export default function MediaSection() {
  return (
    <section className="py-8 md:py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-xl md:text-2xl font-bold text-center mb-8">Praised by the media</h2>
        <div className="relative w-full overflow-hidden !max-w-3xl mx-auto">
          <div className="flex animate-marquee whitespace-nowrap ">
            {mediaLogos.concat(mediaLogos).map((logo, i) => (
               <div key={i} className="flex-shrink-0 w-36 h-24 flex gap-2 items-center justify-center mx-2">
                <Image src={logo.src} alt={logo.alt} width={50} height={50} className="object-contain py-2 h-14 w-fit" />
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
