"use client"

import { useState, useMemo } from "react"
import { Search, Filter, MapPin, Star, Users, GraduationCap, Heart, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { collegesData } from "@/lib/colleges-data"
import type { FilterOptions, College } from "@/lib/types"
import { FilterSidebar } from "@/components/listing/filter-sidebar"
import { useIsMobile } from "@/hooks/use-mobile"
import Link from "next/link"
import Image from "next/image"
import Header from "@/components/common/Header"
import Footer from "@/components/common/Footer"

export default function CollegeListingPage() {
  const isMobile = useIsMobile()
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
  })

  const filteredColleges = useMemo(() => {
    return collegesData.filter((college) => {
      // Search filter
      if (
        filters.search &&
        !college.name.toLowerCase().includes(filters.search.toLowerCase()) &&
        !college.location.city.toLowerCase().includes(filters.search.toLowerCase()) &&
        !college.location.state.toLowerCase().includes(filters.search.toLowerCase())
      ) {
        return false
      }

      // State filter
      if (filters.states.length > 0 && !filters.states.includes(college.location.state)) {
        return false
      }

      // Stream filter
      if (filters.streams.length > 0 && !filters.streams.some((stream) => college.streams.includes(stream as any))) {
        return false
      }

      // Institute type filter
      if (filters.instituteTypes.length > 0 && !filters.instituteTypes.includes(college.type)) {
        return false
      }

      // Fee range filter
      if (college.fees.min > filters.feeRange[1] || college.fees.max < filters.feeRange[0]) {
        return false
      }

      // Rating filter
      if (filters.rating > 0 && college.rating < filters.rating) {
        return false
      }

      // Hostel filter
      if (filters.hostel.length > 0) {
        if (filters.hostel.includes("Boys Hostel") && !college.hostel.boys) return false
        if (filters.hostel.includes("Girls Hostel") && !college.hostel.girls) return false
      }

      // Facilities filter
      if (
        filters.facilities.length > 0 &&
        !filters.facilities.every((facility) => college.facilities.includes(facility))
      ) {
        return false
      }

      // Study mode filter
      if (filters.studyMode.length > 0 && !filters.studyMode.some((mode) => college.studyMode.includes(mode as any))) {
        return false
      }

      // Exam filter
      if (filters.exams.length > 0 && !filters.exams.some((exam) => college.admissionProcess.exams.includes(exam))) {
        return false
      }

      return true
    })
  }, [filters])

  const formatFees = (min: number, max: number) => {
    const formatAmount = (amount: number) => {
      if (amount >= 100000) {
        return `${(amount / 100000).toFixed(1)}L`
      }
      return `${(amount / 1000).toFixed(0)}K`
    }
    return `₹${formatAmount(min)} - ${formatAmount(max)}`
  }

  return (
   <div className="min-h-screen bg-white">
    <Header />

      {/* <div className="sticky top-0 z-50 bg-[#044cac] text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">



 
          </div>
        </div>
      </div> */}

      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Desktop Sidebar */}
          {!isMobile && (
            <div className="w-80 flex-shrink-0">
              <FilterSidebar filters={filters} onFiltersChange={setFilters} />
            </div>
          )}

          {/* Main Content */}
          <div className="flex-1">
            {/* Mobile Filter Button */}
            {isMobile && (
              <div className="mb-4">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="w-full bg-transparent">
                      <Filter className="h-4 w-4 mr-2" />
                      Filters ({Object.values(filters).flat().filter(Boolean).length})
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80 p-0">
                    <FilterSidebar filters={filters} onFiltersChange={setFilters} />
                  </SheetContent>
                </Sheet>
              </div>
            )}

            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-foreground">{filteredColleges.length} Colleges Found</h2>
                <p className="text-muted-foreground">
                  Showing results for Engineering, Management, Agriculture & IT colleges
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
                <h3 className="text-xl font-semibold mb-2">No colleges found</h3>
                <p className="text-muted-foreground">Try adjusting your filters to see more results</p>
              </div>
            )}
          </div>
        </div>
      </div>

    <Footer/>
    </div>
  )
}

function CollegeCard({ college }: { college: College }) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 border-l-4 border-l-primary p-0">
      <CardContent className="p-0">
        <div className="flex flex-col lg:flex-row flex-wrap ">
          {/* College Image */}
          <div className=" aspect-square w-96 relative flex-shrink-0">
            <Image src={`/college/${college.image}` || "/placeholder.svg"} alt={college.name} fill className="object-cover aspect-square" />
            <div className="absolute top-2 right-2 flex gap-2">
              <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                <Heart className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* College Info */}
          <div className="flex-1 p-6 ">
            <div className="flex flex-col  w-full lg:items-start lg:justify-between gap-4">
              <div className="flex-1 w-full">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-1">{college.name}</h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {college.location.city}, {college.location.state}
                      </div>
                      <Badge variant="outline">{college.type}</Badge>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-3">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{college.rating}</span>
                    <span className="text-sm text-muted-foreground">({college.reviews} Reviews)</span>
                  </div>
                  {college.ranking.nirf && (
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                      #{college.ranking.nirf} NIRF
                    </Badge>
                  )}
                </div>

                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{college.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {college.streams.map((stream) => (
                    <Badge key={stream} variant="secondary">
                      {stream}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{college.campusLife.studentStrength.toLocaleString()} Students</span>
                  </div>
                  <div>Established: {college.established}</div>
                </div>
              </div>

              {/* Right Side Info */}
              <div className="flex-shrink-0">
                <div className="bg-muted rounded-lg px-3 py-2 mb-4 w-fit">
                  <div className="text-center flex items-center gap-1">
                    <div className="text-2xl font-bold text-primary mb-1">
                      {formatFees(college.fees.min, college.fees.max)}
                    </div>
                    {/* <div className="text-sm text-muted-foreground">(Total Fees)</div> */}
                  </div>
                </div>

                <div className="flex gap-2 items-center whitespace-nowrap overflow-x-auto scrollbar-hide mb-4">
                  <div className="text-sm">
                    <span className="font-semibold">Avg Package:</span> ₹
                    {(college.placement.averagePackage / 100000).toFixed(1)}L
                  </div>
                  <div className="text-sm">
                    <span className="font-semibold">Placement Rate:</span> {college.placement.placementRate}%
                  </div>
                  <div className="text-sm">
                    <span className="font-semibold">Exams:</span> {college.admissionProcess.exams.slice(0, 2).join(", ")}
                    {college.admissionProcess.exams.length > 2 && "..."}
                  </div>
                </div>

                <div className="flex gap-4 items-center">
                  <Link href={`/college/${college.id}`}>
                    <Button className="w-full bg-[#044cac] hover:bg-[#033a8a] text-white">View Details</Button>
                  </Link>
                  <Button variant="outline" className="w-fit bg-transparent">
                    Download Brochure
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function formatFees(min: number, max: number) {
  const formatAmount = (amount: number) => {
    if (amount >= 100000) {
      return `${(amount / 100000).toFixed(1)}L`
    }
    return `${(amount / 1000).toFixed(0)}K`
  }
  return `₹${formatAmount(min)} - ${formatAmount(max)}`
}
