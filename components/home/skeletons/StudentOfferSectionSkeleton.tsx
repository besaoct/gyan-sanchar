// components/home/skeletons/StudentOfferSectionSkeleton.tsx
import { Skeleton } from "@/components/ui/skeleton";

export default function StudentOfferSectionSkeleton() {
  return (
    <section className="py-12 md:py-16 bg-gradient-to-r from-orange-400 to-orange-500">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between text-white gap-8">
          <div className="flex-1 text-center lg:text-left">
            <Skeleton className="h-10 w-3/4 mb-4" />
            <Skeleton className="h-10 w-1/2" />
          </div>
          <div className="flex-1 flex justify-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 md:p-8 w-full max-w-md">
              <div className="grid grid-cols-2 gap-4 text-center">
                {[...Array(3)].map((_, index) => (
                  <div key={index}>
                    <Skeleton className="h-8 w-1/2 mx-auto mb-2" />
                    <Skeleton className="h-4 w-3/4 mx-auto" />
                  </div>
                ))}
                <div>
                  <Skeleton className="h-9 mt-3 w-32 mx-auto" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
