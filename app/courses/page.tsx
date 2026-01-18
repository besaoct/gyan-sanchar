"use client";

import { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  FilterSidebar,
  CourseFilterOptions,
} from "@/components/course/filter-sidebar";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { SlidersHorizontal } from "lucide-react";
import { CourseCard } from "@/components/course/course-card";
import { getCourses, getCoursesFilters } from "@/lib/api/data/courses";
import type { CourseDetails } from "@/lib/api/data/courses";
import Loading from "./loading";

const ITEMS_PER_PAGE = 8;

export default function CourseListingPage() {
  const [filters, setFilters] = useState<CourseFilterOptions>({
    search: "",
    duration: [0, 0],
    modes: [],
    levels: [],
    feeRange: [0, 0],
  });
  const [courses, setCourses] = useState<CourseDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
// ── Pagination state ────────────────────────────────────────
  const [currentPage, setCurrentPage] = useState(1);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        const [coursesResponse, filtersResponse] = await Promise.all([
          getCourses(),
          getCoursesFilters(),
        ]);

        if (coursesResponse.success) {
          setCourses(coursesResponse.data);
        } else {
          setError(coursesResponse.message);
        }

        if (filtersResponse.success) {
          setFilters((prevFilters) => ({
            ...prevFilters,
            duration: [
              filtersResponse.data.duration.min,
              filtersResponse.data.duration.max,
            ],
            feeRange: [
              filtersResponse.data.feeRange.min,
              filtersResponse.data.feeRange.max,
            ],
          }));
        }
      } catch (err) {
        setError("Failed to fetch page data");
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      // Search Filter
      if (
        filters.search &&
        !course.course_name.toLowerCase().includes(filters.search.toLowerCase())
      ) {
        return false;
      }

      // Duration Filter
      if (
        course.basic_info.duration < filters.duration[0] ||
        course.basic_info.duration > filters.duration[1]
      ) {
        return false;
      }

      // Mode Filter
      if (
        filters.modes.length > 0 &&
        !filters.modes.some((mode) => course.basic_info.mode.includes(mode))
      ) {
        return false;
      }

      // Level Filter
      if (
        filters.levels.length > 0 &&
        !filters.levels.includes(course.basic_info.level)
      ) {
        return false;
      }

      // Fee Range Filter (check for overlap)
      if (
        course.fees.max < filters.feeRange[0] ||
        course.fees.min > filters.feeRange[1]
      ) {
        return false;
      }

      return true;
    });
  }, [filters, courses]);

  // ── Pagination logic ───────────────────────────────────────────────
  const totalItems = filteredCourses.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentCourses = filteredCourses.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) {
    return <Loading />;
  }

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
                  <Button
                    variant="outline"
                    className="w-fit bg-primary/5 border border-primary/30 text-primary"
                  >
                    <SlidersHorizontal className="h-4 w-4 text-primary" />
                    Filters{" "}
                    {Object.values(filters).flat().filter(Boolean).length - 2 <
                    1
                      ? ""
                      : `(${Object.values(filters).flat().filter(Boolean).length - 2})`}
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="left"
                  className="w-80 p-0 overflow-y-auto scrollbar-hide bg-white"
                >
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

            {error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <>
       <div className="space-y-6">
                  {currentCourses.map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </div>

                {filteredCourses.length === 0 && (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">📚</div>
                    <h3 className="text-xl font-semibold mb-2">
                      No courses found
                    </h3>
                    <p className="text-muted-foreground">
                      Try adjusting your filters to see more results
                    </p>
                  </div>
                )}
                {/* ── Pagination Controls ──────────────────────────────────────── */}
                {totalPages > 1 && (
                  <div className="mt-10 flex flex-wrap justify-center items-center gap-2 sm:gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => goToPage(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </Button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <Button
                        key={page}
                        variant={page === currentPage ? "default" : "outline"}
                        size="sm"
                        className="min-w-[2.5rem]"
                        onClick={() => goToPage(page)}
                      >
                        {page}
                      </Button>
                    ))}

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => goToPage(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
