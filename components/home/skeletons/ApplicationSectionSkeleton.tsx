// components/home/skeletons/ApplicationSectionSkeleton.tsx
import { Skeleton } from "@/components/ui/skeleton";

export default function ApplicationSectionSkeleton() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 text-center">
        <Skeleton className="h-8 w-1/2 mx-auto mb-4" />
        <Skeleton className="h-10 w-3/4 mx-auto mb-2" />
        <Skeleton className="h-6 w-1/2 mx-auto mb-8" />
        <Skeleton className="h-12 w-48 mx-auto" />
      </div>
    </section>
  );
}
