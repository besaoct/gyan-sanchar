import { Skeleton } from "@/components/ui/skeleton";

export function FilterSidebarSkeleton() {
  return (
    <div className="bg-white p-4 h-auto lg:h-fit sticky lg:top-6 space-y-6">
      {/* Search Bar Skeleton */}
      <div className="relative mb-6">
        <Skeleton className="h-10 w-full rounded-md" />
      </div>

      <div className="space-y-6">
        {/* Stream / Discipline */}
        <div>
          <Skeleton className="h-10 w-full rounded-md mb-3" />
          <div className="space-y-3 pl-2">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex items-center space-x-3">
                <Skeleton className="h-4 w-4 rounded" />
                <Skeleton className="h-4 w-48" />
              </div>
            ))}
          </div>
        </div>

        {/* Courses */}
        <div>
          <Skeleton className="h-10 w-full rounded-md mb-3" />
          <div className="space-y-3 pl-2">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="flex items-center space-x-3">
                <Skeleton className="h-4 w-4 rounded" />
                <Skeleton className="h-4 w-64" />
              </div>
            ))}
          </div>
        </div>

        {/* State / Location */}
        <div>
          <Skeleton className="h-10 w-full rounded-md mb-3" />
          <div className="space-y-3 pl-2">
            {[...Array(7)].map((_, i) => (
              <div key={i} className="flex items-center space-x-3">
                <Skeleton className="h-4 w-4 rounded" />
                <Skeleton className="h-4 w-40" />
              </div>
            ))}
          </div>
        </div>

        {/* Institute Type */}
        <div>
          <Skeleton className="h-10 w-full rounded-md mb-3" />
          <div className="space-y-3 pl-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center space-x-3">
                <Skeleton className="h-4 w-4 rounded" />
                <Skeleton className="h-4 w-36" />
              </div>
            ))}
          </div>
        </div>

        {/* Hostel Availability */}
        <div>
          <Skeleton className="h-10 w-full rounded-md mb-3" />
          <div className="space-y-3 pl-2">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex items-center space-x-3">
                <Skeleton className="h-4 w-4 rounded" />
                <Skeleton className="h-4 w-32" />
              </div>
            ))}
          </div>
        </div>

        {/* Fee Range */}
        <div>
          <Skeleton className="h-10 w-full rounded-md mb-3" />
          <div className="space-y-4 pl-2">
            <div className="flex justify-between">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-20" />
            </div>
            <Skeleton className="h-2 w-full" /> {/* Slider track */}
            <div className="grid grid-cols-2 gap-3 mt-4">
              <div>
                <Skeleton className="h-4 w-16 mb-2" />
                <Skeleton className="h-9 w-full" />
              </div>
              <div>
                <Skeleton className="h-4 w-16 mb-2" />
                <Skeleton className="h-9 w-full" />
              </div>
            </div>
          </div>
        </div>

        {/* Minimum Rating */}
        <div>
          <Skeleton className="h-10 w-full rounded-md mb-3" />
          <div className="space-y-3 pl-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center space-x-3">
                <Skeleton className="h-4 w-4 rounded-full" />
                <Skeleton className="h-4 w-32" />
              </div>
            ))}
          </div>
        </div>

        {/* Facilities & Exams (collapsed by default) */}
        <Skeleton className="h-10 w-full rounded-md" />
        <Skeleton className="h-10 w-full rounded-md" />
      </div>

      {/* Mobile-only Button */}
      <Skeleton className="h-10 w-full rounded-md mt-6 sm:hidden" />
    </div>
  );
}