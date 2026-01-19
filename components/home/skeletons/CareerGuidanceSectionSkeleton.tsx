
import { Skeleton } from "@/components/ui/skeleton";

export default function CareerGuidanceSectionSkeleton() {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between flex-wrap">
          <div className="md:flex-1 ">
            <Skeleton className="h-10 w-3/4 mb-4" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-5/6" />
          </div>
          <div className="flex-1 flex justify-end mt-6 md:mt-0">
            <Skeleton className="h-12 w-48" />
          </div>
        </div>
      </div>
    </section>
  );
}
