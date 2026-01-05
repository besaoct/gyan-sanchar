// components/home/skeletons/MediaSectionSkeleton.tsx
import { Skeleton } from "@/components/ui/skeleton";

export default function MediaSectionSkeleton() {
  return (
    <section className="py-8 md:py-12 bg-white">
      <div className="container mx-auto px-4">
        <Skeleton className="h-8 w-1/3 mx-auto mb-8" />
        <div className="relative w-full overflow-hidden !max-w-3xl mx-auto">
          <div className="flex animate-marquee whitespace-nowrap">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="flex-shrink-0 w-36 h-24 flex items-center justify-center mx-2">
                <Skeleton className="w-24 h-12" />
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
