
"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { coursesData } from "@/lib/api/dummy/courses-data";
import { FilterSidebar, CourseFilterOptions } from "@/components/course/filter-sidebar";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { Filter, SlidersHorizontal } from "lucide-react";
import { CourseCard } from "@/components/course/course-card";

export default function CourseListingPage() {
  const [filters, setFilters] = useState<CourseFilterOptions>({
    search: "",
    duration: [0, 6],
    modes: [],
    levels: [],
    feeRange: [0, 3000000],
  });

  const filteredCourses = useMemo(() => {
    return coursesData.filter((course) => {
      if (
        filters.search &&
        !course.title.toLowerCase().includes(filters.search.toLowerCase())
      ) {
        return false;
      }

      if (
        course.duration < filters.duration[0] ||
        course.duration > filters.duration[1]
      ) {
        return false;
      }

      if (
        filters.modes.length > 0 &&
        !filters.modes.some((mode) => course.mode.includes(mode as any))
      ) {
        return false;
      }

      if (
        filters.levels.length > 0 &&
        !filters.levels.includes(course.level)
      ) {
        return false;
      }

      if (
        course.fees.min > filters.feeRange[1] ||
        course.fees.max < filters.feeRange[0]
      ) {
        return false;
      }

      return true;
    });
  }, [filters]);

  return (
    <div className="min-h-screen bg-white">
      <Header isSticky={true} />
      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          
          <div className="w-80 flex-shrink-0 hidden lg:block">
            <FilterSidebar filters={filters} onFiltersChange={setFilters} />
          </div>

          <div className="flex-1">
            <div className="mb-4 lg:hidden">
                 <Sheet>
                   <SheetTrigger asChild>
                   <Button variant="outline" className="w-fit bg-primary/5 border border-primary/30 text-primary">
                    <SlidersHorizontal className="h-4 w-4 text-primary" />
                       Filters (
                       {Object.values(filters).flat().filter(Boolean).length})
                     </Button>
                   </SheetTrigger>
                   <SheetContent side="left" className="w-80 p-0 overflow-y-auto scrollbar-hide bg-white">
                     <FilterSidebar
                       filters={filters}
                       onFiltersChange={setFilters}
                     />
                   </SheetContent>
                 </Sheet>
            </div>

            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-foreground">
                  {filteredCourses.length} Courses Found
                </h2>
                <p className="text-muted-foreground">
                  Explore our wide range of courses
                </p>
              </div>
            </div>

            <div className="space-y-6">
              {filteredCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>

            {filteredCourses.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📚</div>
                <h3 className="text-xl font-semibold mb-2">No courses found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your filters to see more results
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
