import { Skeleton } from "@/components/ui/skeleton";

export default function HeroSectionSkeleton() {
  return (
    <section
      className="relative text-white overflow-hidden bg-[#04377a]"
      style={{
        minHeight: "500px",
      }}
    >
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-8">
          <div className="flex-1 w-full max-w-md lg:w-auto lg:max-w-2xl text-center lg:text-left">
            <Skeleton className="h-10 md:h-12 lg:h-14 w-3/4 mb-6 " />
            <Skeleton className="h-6 md:h-7 w-full mb-8" />
            <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center lg:justify-start">
              <Skeleton className="h-12 w-48" />
              <Skeleton className="h-12 w-64" />
            </div>
            <Skeleton className="h-5 w-48" />
          </div>
          <div className="flex-1 relative w-full  max-w-md lg:max-w-none">
            <Skeleton className="w-full h-64 md:h-80 lg:h-96 rounded-lg" />
          </div>
        </div>
      </div>
    </section>
  );
}
