// components/home/skeletons/TrustIndicatorsSkeleton.tsx
import { Skeleton } from "@/components/ui/skeleton";
import { Star, ChevronDown } from "lucide-react";

export default function TrustIndicatorsSkeleton() {
  return (
    <section className="bg-orange-400 py-4">
      <div className="container mx-auto px-4 ">
        <div className="flex justify-between items-center gap-4 text-left">
          <div className="flex items-center gap-2">
            <Skeleton className="w-8 h-8 rounded-full" />
            <div className="flex items-center gap-1">
              <Skeleton className="h-5 w-8" />
              <div className="flex">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-4 h-4 text-gray-300 fill-current" />
                ))}
              </div>
            </div>
          </div>
          <div className="flex-1 relative overflow-hidden">
            <div className="flex items-center">
            <Skeleton className="p-1 rounded-full w-6 h-6" />
            
            <div className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth mx-8 px-8 w-full">
              {[...Array(4)].map((_, index) => (
                <Skeleton key={index} className="h-5 w-24" />
              ))}
            </div>

            <Skeleton className="p-1 rounded-full w-6 h-6" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
