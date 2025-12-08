
import { CourseCardSkeleton } from "@/components/course/course-card-skeleton";
import { FilterSidebarSkeleton } from "@/components/course/filter-sidebar-skeleton";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

export default function Loading() {
  return (
    <div className="min-h-screen bg-white">
      <Header isSticky={true} />
      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          <div className="w-80 flex-shrink-0 hidden lg:block">
            <FilterSidebarSkeleton />
          </div>

          <div className="flex-1">
            <div className="mb-4 lg:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="w-fit bg-primary/5 border border-primary/30 text-primary">
                    <SlidersHorizontal className="h-4 w-4 text-primary" />
                    Filters (0)
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80 p-0 overflow-y-auto scrollbar-hide bg-white">
                  <FilterSidebarSkeleton />
                </SheetContent>
              </Sheet>
            </div>

            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-foreground">
                  Loading Courses...
                </h2>
                <p className="text-muted-foreground">
                  Please wait while we fetch the courses for you.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              {[...Array(5)].map((_, i) => (
                <CourseCardSkeleton key={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
