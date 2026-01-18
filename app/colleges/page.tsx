"use client";

import { useState, useMemo, useEffect } from "react";

import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  College,
  getColleges,
  CollegeFilterOptions,
  getCollegeFilters,
} from "@/lib/api/data/colleges";
import type { FilterOptions } from "@/lib/types";
import { FilterSidebar } from "@/components/college/filter-sidebar";

import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { SlidersHorizontal } from "lucide-react";
import { CollegeCard } from "@/components/college/college-card";

import { Skeleton } from "@/components/ui/skeleton";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FilterSidebarSkeleton } from "@/components/college/filter-sidebar-skeleton";
import StudentVisaFormButton from "@/components/college/student-visa-form-button";

const ITEMS_PER_PAGE = 12;

export default function CollegeListingPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterOptions, setFilterOptions] =
    useState<CollegeFilterOptions | null>(null);

    // ── Pagination state ────────────────────────────────────────
  const [currentPage, setCurrentPage] = useState(1);


  // Initialize filters from URL on mount
  const initialFilters: FilterOptions = {
    search: searchParams.get("search") || "",
    states: searchParams.get("states")?.split(",")?.filter(Boolean) || [],
    streams: searchParams.get("streams")?.split(",")?.filter(Boolean) || [],
    courses: searchParams.get("courses")?.split(",")?.filter(Boolean) || [],
    instituteTypes:
      searchParams.get("instituteTypes")?.split(",")?.filter(Boolean) || [],
    feeRange: [
      Number(searchParams.get("feeMin")) || 0,
      Number(searchParams.get("feeMax")) || 0,
    ],
    rating: Number(searchParams.get("rating")) || 0,
    hostel: searchParams.get("hostel")?.split(",")?.filter(Boolean) || [],
    facilities:
      searchParams.get("facilities")?.split(",")?.filter(Boolean) || [],
    studyMode: searchParams.get("studyMode")?.split(",")?.filter(Boolean) || [],
    exams: searchParams.get("exams")?.split(",")?.filter(Boolean) || [],
    levels: searchParams.get("levels")?.split(",")?.filter(Boolean) || [],
    degrees: searchParams.get("degrees")?.split(",")?.filter(Boolean) || [],
  };

  const [filters, setFilters] = useState<FilterOptions>(initialFilters);

    // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]); // <--- important!


  // Sync filters to URL whenever they change
  useEffect(() => {
    const params = new URLSearchParams();

    if (filters.search) params.set("search", filters.search);
    if (filters.states.length > 0)
      params.set("states", filters.states.join(","));
    if (filters.streams.length > 0)
      params.set("streams", filters.streams.join(","));
    if (filters.courses.length > 0)
      params.set("courses", filters.courses.join(","));
    if (filters.instituteTypes.length > 0)
      params.set("instituteTypes", filters.instituteTypes.join(","));
    if (filters.hostel.length > 0)
      params.set("hostel", filters.hostel.join(","));
    if (filters.facilities.length > 0)
      params.set("facilities", filters.facilities.join(","));
    if (filters.studyMode.length > 0)
      params.set("studyMode", filters.studyMode.join(","));
    if (filters.exams.length > 0) params.set("exams", filters.exams.join(","));
    if (filters.levels.length > 0)
      params.set("levels", filters.levels.join(","));
    if (filters.degrees.length > 0)
      params.set("degrees", filters.degrees.join(","));
    if (filters.rating > 0) params.set("rating", String(filters.rating));

    // Only set fee range if different from default
    if (filterOptions) {
      if (filters.feeRange[0] > filterOptions.feeRange[0])
        params.set("feeMin", String(filters.feeRange[0]));
      if (filters.feeRange[1] < filterOptions.feeRange[1])
        params.set("feeMax", String(filters.feeRange[1]));
    }

    const queryString = params.toString();
    const newUrl = queryString ? `${pathname}?${queryString}` : pathname;

    // Use replace to avoid polluting history with every filter change
    router.replace(newUrl, { scroll: false });
  }, [filters, pathname, router, filterOptions]);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [collegesResponse, filtersResponse] = await Promise.all([
          getColleges(),
          getCollegeFilters(),
        ]);

        if (collegesResponse.success && collegesResponse.data) {
          setColleges(collegesResponse.data);
        } else {
          setError(collegesResponse.message || "Failed to fetch colleges");
        }

        if (filtersResponse.success && filtersResponse.data) {
          setFilterOptions(filtersResponse.data);

          // After filterOptions loaded, adjust feeRange if not set in URL
          setFilters((prev) => ({
            ...prev,
            feeRange:
              prev.feeRange[0] === 0 && prev.feeRange[1] === 0
                ? filtersResponse.data.feeRange
                : prev.feeRange,
          }));
        } else {
          setError(filtersResponse.message || "Failed to fetch filter options");
        }
      } catch (err) {
        setError("An unexpected error occurred while fetching data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredColleges = useMemo(() => {
    if (!colleges.length) return [];

    return colleges.filter((college) => {
      if (
        filters.search &&
        !college.name.toLowerCase().includes(filters.search.toLowerCase()) &&
        !college.location.city
          .toLowerCase()
          .includes(filters.search.toLowerCase()) &&
        !college.location.state
          .toLowerCase()
          .includes(filters.search.toLowerCase())
      ) {
        return false;
      }

      if (
        filters.states.length > 0 &&
        !filters.states.includes(college.location.state)
      )
        return false;

      if (filters.streams.length > 0) {
        const collegeStreamNames = college.streams?.map((s) => s.title) || [];
        if (
          !filters.streams.some((stream) => collegeStreamNames.includes(stream))
        )
          return false;
      }

      // Course filter
      if (filters.courses.length > 0) {
        const hasMatchingCourse = college.courses.some((course) =>
          filters.courses.includes(course.name),
        );
        if (!hasMatchingCourse) return false;
      }

      // Levels filter
      if (filters.levels.length > 0) {
        const hasMatchingLevel = college.courses.some(
          (course) => course.level && filters.levels.includes(course.level),
        );
        if (!hasMatchingLevel) return false;
      }

      // Degrees filter
      if (filters.degrees.length > 0) {
        const hasMatchingDegree = college.courses.some(
          (course) =>
            course.degree &&
            course.degree.title &&
            filters.degrees.includes(course.degree.title),
        );
        if (!hasMatchingDegree) return false;
      }

      if (
        filters.instituteTypes.length > 0 &&
        !filters.instituteTypes.includes(college.type)
      )
        return false;

      if (
        Number(college.fees.min) > filters.feeRange[1] ||
        Number(college.fees.max) < filters.feeRange[0]
      )
        return false;

      if (filters.rating > 0 && college.rating < filters.rating) return false;

      if (filters.hostel.length > 0) {
        if (filters.hostel.includes("Boys") && !college.hostel.boys)
          return false;
        if (filters.hostel.includes("Girls") && !college.hostel.girls)
          return false;
      }

      if (
        filters.facilities.length > 0 &&
        !filters.facilities.every((f) => college.facilities.includes(f))
      )
        return false;

      if (
        filters.studyMode.length > 0 &&
        !filters.studyMode.some((mode) => college.studyMode.includes(mode))
      )
        return false;

      if (
        filters.exams.length > 0 &&
        college.admissionProcess?.exams &&
        !filters.exams.some((exam) =>
          college.admissionProcess.exams?.includes(exam),
        )
      )
        return false;

      return true;
    });
  }, [filters, colleges]);


  // ── Pagination logic ───────────────────────────────────────────────
  const totalItems = filteredColleges.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentColleges = filteredColleges.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-muted/80">
        <Header />
        <div className="container mx-auto px-4 py-6">
          <div className="flex gap-6">
            {/* Desktop Filter Sidebar Skeleton */}
            <div className="w-80 flex-shrink-0 hidden lg:block">
              <FilterSidebarSkeleton />
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-foreground">
                    Loading Colleges...
                  </h2>
                  <p className="text-muted-foreground">
                    Please wait while we fetch the colleges for you.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200"
                  >
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                      {/* College Image Skeleton */}
                      <Skeleton className="h-48 w-full sm:h-32 sm:w-48 rounded-lg flex-shrink-0 order-1 sm:order-none" />

                      {/* Content */}
                      <div className="flex-1 space-y-4">
                        {/* Title */}
                        <Skeleton className="h-7 w-3/4 sm:w-80" />

                        {/* Location / Subtitle */}
                        <Skeleton className="h-4 w-1/2 sm:w-64" />

                        {/* Badges / Tags (e.g., Rating, Type, Fees) */}
                        <div className="flex flex-wrap gap-3">
                          <Skeleton className="h-8 w-28 rounded-full" />
                          <Skeleton className="h-8 w-32 rounded-full" />
                          <Skeleton className="h-8 w-36 rounded-full" />
                        </div>

                        {/* Description lines */}
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-4 w-5/6" />
                          <Skeleton className="h-4 w-4/5" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-muted/80">
        <Header />
        <div className="container mx-auto px-4 py-6 text-center text-red-500">
          <p>{error}</p>
          <Button onClick={() => window.location.reload()} className="mt-4">
            Retry
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/80">
      <Header />
      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Desktop Sidebar */}
          <div className="w-80 flex-shrink-0 hidden lg:block">
            {filterOptions && (
              <FilterSidebar
                filters={filters}
                onFiltersChange={setFilters}
                filterOptions={filterOptions}
                colleges={colleges}
              />
            )}
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="mb-4 lg:hidden flex items-start gap-4">
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-fit bg-primary/5 border border-primary/30 text-primary"
                  >
                    <SlidersHorizontal className="h-4 w-4 text-primary" />
                    Filters{" "}
                    {Object.values(filters).flat().filter(Boolean).length - 1 <
                    1
                      ? ""
                      : `(${
                          Object.values(filters).flat().filter(Boolean).length -
                          1
                        })`}
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="left"
                  className="w-full max-w-sm  p-0 overflow-y-auto scrollbar-hide bg-white"
                >
                  <SheetTitle className="sr-only">
                    <h1>filters</h1>
                  </SheetTitle>
                  {filterOptions && (
                    <FilterSidebar
                      filters={filters}
                      onFiltersChange={setFilters}
                      filterOptions={filterOptions}
                      colleges={colleges}
                    />
                  )}
                </SheetContent>
              </Sheet>

              <div>
                <StudentVisaFormButton isPageButton={true} />
              </div>
            </div>

            {/* Results Header */}
            <div className="flex items-center mb-4 justify-between ">
              <div>
                <h2 className="text-2xl font-bold text-foreground">
                  {filteredColleges.length} Colleges Found
                </h2>
              </div>
            </div>

            {/* Stream Descriptions - Only show if streams are filtered AND at least one has description */}
            {filters.streams.length > 0 &&
              (() => {
                // Collect all valid descriptions first
                const validStreamInfos = filters.streams
                  .map((streamName) => {
                    const streamInfo = colleges
                      .flatMap((c) => c.streams)
                      .find(
                        (
                          s,
                        ): s is {
                          id: number | string;
                          title: string;
                          description: string;
                        } =>
                          typeof s === "object" &&
                          s.title === streamName &&
                          !!s.description?.trim(),
                      );
                    return streamInfo
                      ? { name: streamName, desc: streamInfo.description }
                      : null;
                  })
                  .filter(
                    (item): item is { name: string; desc: string } =>
                      item !== null,
                  );

                // If no stream has description → don't render anything
                if (validStreamInfos.length === 0) return null;

                return (
                  <>
                    <p className="text-muted-foreground mb-4 -mt-4">
                      Showing results for{" "}
                      {validStreamInfos.map(({ name,desc }, i, s) => (
                        <span key={name} className="inline">
                          {name}
                          {i !== s.length - 1 ? ", " : ""}
                        </span>
                      ))}
                    </p>

                    <div className="mb-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
                      <h3 className="font-semibold text-foreground sr-only">
                        About Selected Streams
                      </h3>
                      <div className="space-y-2">
                        {validStreamInfos.map(({ name, desc }) => (
                          <div key={name} className="flex flex-col">
                            <div className="inline">
                              <span className="font-medium text-foreground">
                                {name}:{" "}
                              </span>
                              <span className="text-sm text-muted-foreground flex-1">
                                {desc}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                );
              })()}

{/* Paginated College Cards */}
            <div className="flex flex-col gap-4">
              {currentColleges.map((college) => (
                <CollegeCard key={college.id} college={college} />
              ))}
            </div>

            {filteredColleges.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🎓</div>
                <h3 className="text-xl font-semibold mb-2">No colleges found</h3>
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


            {/* College Cards */}
            {/* <div className="flex flex-col gap-4">
              {filteredColleges.map((college) => (
                <CollegeCard key={college.id} college={college} />
              ))}
            </div> */}

            {/* {filteredColleges.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🎓</div>
                <h3 className="text-xl font-semibold mb-2">
                  No colleges found
                </h3>
                <p className="text-muted-foreground">
                  Try adjusting your filters to see more results
                </p>
              </div>
            )} */}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
