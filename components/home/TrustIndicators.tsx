'use client'

import { Star, ChevronDown } from "lucide-react"
import { Indicator } from "@/lib/api/data/home";

interface TrustIndicatorsProps {
  indicators: Indicator[];
}

export default function TrustIndicators({ indicators }: TrustIndicatorsProps) {
  const mainIndicator = indicators[0]; // Assuming we only use the first indicator for the rating and items

  if (!mainIndicator || !mainIndicator.items || mainIndicator.items.length === 0) {
    return null; // Don't render if no indicator data
  }

  return (
    <section className="bg-orange-400 py-4">
      <div className="container mx-auto px-4 ">
        <div className="flex justify-between items-center gap-4 text-left">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <img src="/google-icon.webp" alt="Google icon" className="w-4 h-4" />
            </div>
            <div className="flex items-center gap-1">
              <span className="text-white font-semibold">{mainIndicator.rating}</span>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-4 h-4 text-white fill-current" />
                ))}
              </div>
            </div>
          </div>
          <div className="flex-1 relative overflow-hidden">
            <div className="flex items-center">
            <button 
              className="p-1 rounded-full bg-white/20 hover:bg-white/30 text-white absolute left-0 z-10"
              onClick={() => {
              const container = document.querySelector('.links-container');
              if (container) {
                container.scrollBy({ left: -200, behavior: 'smooth' });
              }
              }}
            >
              <ChevronDown className="w-4 h-4 rotate-90" />
            </button>
            
            <div className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth mx-8 px-8 w-full links-container">
              {mainIndicator.items.map((item, index) => (
                <a key={index} href={item.link} className="text-white font-semibold text-sm md:text-base whitespace-nowrap underline">
                  {item.title}
                </a>
              ))}
            </div>

            <button 
              className="p-1 rounded-full bg-white/20 hover:bg-white/30 text-white absolute right-0 z-10"
              onClick={() => {
              const container = document.querySelector('.links-container');
              if (container) {
                container.scrollBy({ left: 200, behavior: 'smooth' });
              }
              }}
            >
              <ChevronDown className="w-4 h-4 -rotate-90" />
            </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
