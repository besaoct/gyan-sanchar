// components/home/skeletons/TestimonialsSectionSkeleton.tsx
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { FaQuoteLeft } from "react-icons/fa";

function TestimonialCardSkeleton() {
  return (
    <Card className="relative bg-white/95 shadow-md rounded-2xl p-6 min-h-[320px] flex flex-col h-full">
      <FaQuoteLeft className="absolute top-4 left-4 text-gray-200 text-7xl pointer-events-none select-none" />
      <CardContent className="flex flex-col justify-between h-auto mt-auto relative z-10 p-0">
        <div>
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-5/6" />
        </div>
        <div className="mt-6">
          <Skeleton className="h-6 w-1/2 mb-2" />
          <Skeleton className="h-4 w-1/3" />
        </div>
      </CardContent>
    </Card>
  );
}

export default function TestimonialsSectionSkeleton() {
  return (
    <section className="py-16 bg-[#044cac]">
      <div className="container mx-auto px-4">
        <Skeleton className="h-10 w-1/2 mx-auto mb-12" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <TestimonialCardSkeleton />
          <TestimonialCardSkeleton />
          <TestimonialCardSkeleton />
        </div>
      </div>
    </section>
  );
}
