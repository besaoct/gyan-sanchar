"use client";

import { useState, useMemo } from "react";

import { Button } from "@/components/ui/button";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { College, collegesData } from "@/lib/colleges-data";
import type { FilterOptions } from "@/lib/types";
import { FilterSidebar } from "@/components/college/filter-sidebar";

import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { Filter } from "lucide-react";
import { CollegeCard } from "@/components/college/college-card";

export default function CollegeListingPage() {
  const [filters, setFilters] = useState<FilterOptions>({
    search: "",
    states: [],
    streams: [],
    instituteTypes: [],
    feeRange: [0, 5000000],
    rating: 0,
    hostel: [],
    facilities: [],
    studyMode: [],
    exams: [],
  });

  const filteredColleges = useMemo(() => {
    return collegesData.filter((college) => {
      // Search filter
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

      // State filter
      if (
        filters.states.length > 0 &&
        !filters.states.includes(college.location.state)
      ) {
        return false;
      }

      // Stream filter
      if (
        filters.streams.length > 0 &&
        !filters.streams.some((stream) =>
          college.streams.includes(stream as any)
        )
      ) {
        return false;
      }

      // Institute type filter
      if (
        filters.instituteTypes.length > 0 &&
        !filters.instituteTypes.includes(college.type)
      ) {
        return false;
      }

      // Fee range filter
      if (
        college.fees.min > filters.feeRange[1] ||
        college.fees.max < filters.feeRange[0]
      ) {
        return false;
      }

      // Rating filter
      if (filters.rating > 0 && college.rating < filters.rating) {
        return false;
      }

      // Hostel filter
      if (filters.hostel.length > 0) {
        if (filters.hostel.includes("Boys Hostel") && !college.hostel.boys)
          return false;
        if (filters.hostel.includes("Girls Hostel") && !college.hostel.girls)
          return false;
      }

      // Facilities filter
      if (
        filters.facilities.length > 0 &&
        !filters.facilities.every((facility) =>
          college.facilities.includes(facility)
        )
      ) {
        return false;
      }

      // Study mode filter
      if (
        filters.studyMode.length > 0 &&
        !filters.studyMode.some((mode) =>
          college.studyMode.includes(mode as any)
        )
      ) {
        return false;
      }

      // Exam filter
      if (
        filters.exams.length > 0 &&
        !filters.exams.some((exam) =>
          college.admissionProcess.exams.includes(exam)
        )
      ) {
        return false;
      }

      return true;
    });
  }, [filters]);

  const formatFees = (min: number, max: number) => {
    const formatAmount = (amount: number) => {
      if (amount >= 100000) {
        return `${(amount / 100000).toFixed(1)}L`;
      }
      return `${(amount / 1000).toFixed(0)}K`;
    };
    return `₹${formatAmount(min)} - ${formatAmount(max)}`;
  };

  return (
    <div className="min-h-screen bg-white">
      <Header isSticky={true} />
      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Desktop Sidebar */}
          <div className="w-80 flex-shrink-0 hidden lg:block">
            <FilterSidebar filters={filters} onFiltersChange={setFilters} />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="mb-4 lg:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="w-full bg-transparent">
                    <Filter className="h-4 w-4 mr-2" />
                    Filters (
                    {Object.values(filters).flat().filter(Boolean).length})
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80 p-0 overflow-y-auto scrollbar-hide">
                  <FilterSidebar
                    filters={filters}
                    onFiltersChange={setFilters}
                  />
                </SheetContent>
              </Sheet>
            </div>

            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-foreground">
                  {filteredColleges.length} Colleges Found
                </h2>
                <p className="text-muted-foreground">
                  Showing results for Engineering, Management, Agriculture & IT
                  colleges
                </p>
              </div>
            </div>

            {/* College Cards */}
            <div className="space-y-6">
              {filteredColleges.map((college) => (
                <CollegeCard key={college.id} college={college} />
              ))}
            </div>

            {filteredColleges.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🎓</div>
                <h3 className="text-xl font-semibold mb-2">
                  No colleges found
                </h3>
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
