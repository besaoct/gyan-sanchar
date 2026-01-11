
import { Skeleton } from "@/components/ui/skeleton";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

function CollegeHeroSkeleton() {
  return (
 <div className="flex flex-col gap-12 lg:flex-row-reverse lg:items-start">
      {/* Left column */}
      <section className="w-full">
        <div className="mb-6 flex items-center gap-3">
          <Skeleton className="h-12 w-12 rounded-xl" />
          <div className="ml-auto hidden gap-4 md:flex">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>
        </div>

        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-8 w-1/2 mt-2" />

        <div className="mt-6 space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>

        <div className="mt-8 flex flex-wrap gap-4">
          <Skeleton className="h-14 w-40 rounded-xl" />
          <Skeleton className="h-14 w-32 rounded-xl" />
        </div>
      </section>

      {/* Right column */}
      <section className="relative w-full mx-auto">
        <div className="relative bg-muted overflow-hidden rounded-4xl p-2.5 ">
          <Skeleton className="h-[320px] lg:h-[390px] w-full rounded-4xl" />
        </div>
      </section>
    </div>
  );
}


export default function Loading() {
    const tabs = [
        { id: "overview", label: "Overview" },
        { id: "syllabus", label: "Syllabus" },
        { id: "eligibility", label: "Eligibility" },
        { id: "colleges", label: "Colleges" },
      ];
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <>
        {/* Hero Section */}
        <div className="px-4 container py-10 w-full max-w-full">
          <CollegeHeroSkeleton />
        </div>

        {/* Main Content */}
        <div className=" mx-auto  py-8">
          <div className="w-full">
            <nav className="sticky top-0 z-20 mb-6 w-full border-y border-border bg-white shadow-xs ">
              <div className="w-full flex overflow-x-auto scrollbar-hide scroll-smooth  container px-4 mx-auto">
              <ul className="flex items-center gap-6 text-sm w-full">
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        className={cn(
                          "whitespace-nowrap py-4 bg-accent px-8 rounded-xl m-2 font-medium last:pr-4 animate-pulse",
                        )}
                      >
                        {/* {tab.label} */}
                      </button>
                    ))}
                  </ul>
              </div>
            </nav>

            <div className="mx-auto px-4 container">
              <Card className="border-none shadow-none p-0">
                <CardHeader className="p-0">
                  <CardTitle>
                    <Skeleton className="h-6 w-32" />
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0 mt-4">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                  </div>

                  <h4 className="mt-6 mb-4 font-semibold">
                    <Skeleton className="h-5 w-48" />
                  </h4>
                  <ul className="list-disc list-inside space-y-4 mt-4">
                    {[...Array(3)].map((_, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <Skeleton className="h-4 w-4" />
                        <Skeleton className="h-4 w-1/2" />
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </>
      <Footer />
    </div>
  );
}
