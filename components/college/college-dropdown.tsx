'use client'

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { getColleges, getDegrees, getPopularColleges, getStreams, getTopColleges } from "@/lib/api/data/colleges"
import type { College } from "@/lib/api/data/colleges"
import { Skeleton } from "@/components/ui/skeleton"

interface DropdownData {
  categories: string[]
  degrees: string[]
  courses: string[]
  locations: string[]
  popularColleges: { name: string; slug: string }[]
  topColleges: { name: string; slug: string }[]
}

export default function CollegesDropdown({ onClose }: { onClose?: () => void }) {
  const router = useRouter()
  const [data, setData] = useState<DropdownData | null>(null)
  const [allColleges, setAllColleges] = useState<College[]>([])
  const [degreesList, setDegreesList] = useState<any[]>([])
  const [hoveredStream, setHoveredStream] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  // Ref to the entire dropdown container
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const [collegeResponse, streamResponse, degreeResponse, popularCollegesRes, topCollegesRes] = await Promise.all([
          getColleges(),
          getStreams(),
          getDegrees(),
          getPopularColleges(),
          getTopColleges(),
        ])

        if (!collegeResponse.success || !collegeResponse.data) {
          setData(getFallbackData())
          return
        }

        const colleges: College[] = collegeResponse.data
        setAllColleges(colleges)

        const streams = streamResponse.success && streamResponse.data ? streamResponse.data : []
        const categories = Array.from(new Set(streams.map((s: any) => s.title)))

        const degreesRaw = degreeResponse.success && degreeResponse.data ? degreeResponse.data : []
        setDegreesList(degreesRaw)

        // Global defaults
        const courseCount = new Map<string, number>()
        colleges.forEach((college) => {
          college.courses?.forEach((course) => {
            if (course.name) courseCount.set(course.name, (courseCount.get(course.name) || 0) + 1)
          })
        })
        const courses = Array.from(courseCount.entries())
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5)
          .map(([name]) => `${name} colleges in india`)

        const stateCount = new Map<string, number>()
        colleges.forEach((college) => {
          if (college.location?.state) {
            stateCount.set(college.location.state, (stateCount.get(college.location.state) || 0) + 1)
          }
        })
        const locations = Array.from(stateCount.entries())
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5)
          .map(([state]) => `Colleges in ${state}`)

        const popularColleges = popularCollegesRes.success && popularCollegesRes.data ? popularCollegesRes.data : []
        const topColleges = topCollegesRes.success && topCollegesRes.data ? topCollegesRes.data : []

        const globalDegrees = degreesRaw.slice(0, 5).map((d: any) => `${d.title} colleges in india`)

        setData({
          categories,
          degrees: globalDegrees,
          courses,
          locations,
          popularColleges,
          topColleges,
        })
      } catch (error) {
        console.error("Failed to load dropdown data:", error)
        setData(getFallbackData())
      } finally {
        setLoading(false)
      }
    }

    fetchDropdownData()
  }, [])

  // Compute filtered data based on hovered stream
  const getFilteredData = () => {
    if (!hoveredStream || !allColleges.length || !degreesList.length || !data) {
      return data
    }

    const filteredColleges = allColleges.filter((college) =>
      college.streams?.some((stream: any) =>
        typeof stream === "string" ? stream === hoveredStream : stream.title === hoveredStream
      )
    )

    const streamDegrees = degreesList
      .filter((d: any) => d.stream?.toLowerCase() === hoveredStream.toLowerCase())
      .slice(0, 5)
      .map((d: any) => `${d.title} colleges in india`)

    const stateCount = new Map<string, number>()
    filteredColleges.forEach((college) => {
      if (college.location?.state) {
        stateCount.set(college.location.state, (stateCount.get(college.location.state) || 0) + 1)
      }
    })
    const locations = Array.from(stateCount.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([state]) => `Colleges in ${state}`)

    const popularInStream = filteredColleges
      .sort((a, b) => {
        if (b.rating !== a.rating) return b.rating - a.rating
        return b.reviews - a.reviews
      })
      .slice(0, 10)
      .map((c) => ({
        name: c.name,
        slug: c.slug || c.name.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, ""),
      }))

    const topInStream = filteredColleges
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 10)
      .map((c) => ({
        name: c.name,
        slug: c.slug || c.name.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, ""),
      }))

    return {
      ...data,
      degrees: streamDegrees.length > 0 ? streamDegrees : data.degrees,
      locations,
      popularColleges: popularInStream,
      topColleges: topInStream,
    }
  }

  const currentData = getFilteredData()

  const getFallbackData = (): DropdownData => ({
    categories: ['Engineering', 'Management', 'Law', 'Pharmacy', 'Science'],
    degrees: ['B.Tech colleges in india', 'MBA colleges in india', 'LLB colleges in india', 'B.Pharm colleges in india', 'B.Sc colleges in india'],
    courses: ['B.Tech', 'MBA', 'LLB', 'B.Pharm', 'B.Sc'],
    locations: ['Colleges in Maharashtra', 'Colleges in Delhi NCR', 'Colleges in Karnataka', 'Colleges in Tamil Nadu', 'Colleges in Uttar Pradesh'],
    popularColleges: [
      { name: 'Chandigarh University', slug: 'chandigarh-university' },
      { name: 'LPU', slug: 'lpu' },
      { name: 'Parul University', slug: 'parul-university' },
    ],
    topColleges: [
      { name: 'NLSIU Bangalore', slug: 'nlsiu-bangalore' },
      { name: 'NLU Delhi', slug: 'nlu-delhi' },
    ],
  })

  const createFilterLink = (param: string, value: string, extraParam?: string, extraValue?: string) => {
    let url = `/colleges?${param}=${encodeURIComponent(value)}`
    if (extraParam && extraValue) url += `&${extraParam}=${encodeURIComponent(extraValue)}`
    return url
  }

  const createCollegeLink = (slug: string) => `/college/${slug}`

  const handleResetHover = () => {
    setHoveredStream(null)
  }

  // Reset hovered stream when mouse leaves the entire dropdown
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.relatedTarget as Node)) {
        setHoveredStream(null)
      }
    }

    const dropdown = dropdownRef.current
    if (dropdown) {
      dropdown.addEventListener('mouseleave', handleMouseLeave)
      return () => dropdown.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])



  if (loading) {
    // Your original skeleton unchanged
    return (
      <div className="bg-white border-b border-gray-200 shadow-2xl absolute w-full top-28 left-0 z-40 max-h-[calc(100vh-4rem)] overflow-y-auto">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            <div className="bg-blue-50 p-4 md:p-6 rounded-lg">
              <Skeleton className="h-5 w-32 mb-4" />
              <div className="space-y-3">
                {[...Array(12)].map((_, i) => (
                  <Skeleton key={i} className="h-4 w-full" />
                ))}
              </div>
            </div>
            <div className="space-y-8">
              <div>
                <Skeleton className="h-5 w-48 mb-4" />
                <div className="space-y-3">
                  {[...Array(5)].map((_, i) => (
                    <Skeleton key={i} className="h-4 w-64" />
                  ))}
                </div>
                <Skeleton className="h-4 w-24 mt-4" />
              </div>
              <div>
                <Skeleton className="h-5 w-48 mb-4" />
                <div className="space-y-3">
                  {[...Array(5)].map((_, i) => (
                    <Skeleton key={i} className="h-4 w-56" />
                  ))}
                </div>
                <Skeleton className="h-4 w-24 mt-4" />
              </div>
            </div>
            <div>
              <Skeleton className="h-5 w-40 mb-4" />
              <div className="space-y-3">
                {[...Array(10)].map((_, i) => (
                  <Skeleton key={i} className="h-4 w-72" />
                ))}
              </div>
            </div>
            <div>
              <Skeleton className="h-5 w-32 mb-4" />
              <div className="space-y-3">
                {[...Array(10)].map((_, i) => (
                  <Skeleton key={i} className="h-4 w-80" />
                ))}
              </div>
              <Skeleton className="h-4 w-24 mt-4" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!currentData) return null

  return (
    <div
      ref={dropdownRef}
      className="bg-white border-b border-gray-200 shadow-2xl absolute w-full top-28 left-0 z-40 max-h-[calc(100vh-4rem)] overflow-y-auto"
    >
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {/* Categories */}
          <div className="bg-blue-50 p-4 md:p-6 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-4 text-sm"
            onMouseEnter={handleResetHover}
            >Categories</h3>
            <ul className="space-y-2 max-h-96 overflow-y-auto">
              {data?.categories.map((category) => (
                <li
                  key={category}
                  onMouseEnter={() => setHoveredStream(category)}
                  className={`cursor-pointer transition-colors rounded px-2 py-1 ${
                    hoveredStream === category
                      ? "bg-blue-100 text-blue-900 font-medium"
                      : "hover:bg-blue-50"
                  }`}
                >
                  <span className="text-blue-900 text-sm block">{category}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Degrees + Location */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4 text-sm">Colleges By Degrees</h3>
            <ul className="space-y-2">
              {currentData.degrees.map((degree) => {
                const dName = degree.replace(' colleges in india', '').trim()
                const link = hoveredStream
                  ? createFilterLink('streams', hoveredStream, 'degrees', dName)
                  : createFilterLink('degrees', dName)
                return (
                  <li key={degree} className="line-clamp-2">
                    <a
                      href={link}
                      className="text-gray-600 hover:text-blue-600 text-sm block"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {degree}
                    </a>
                  </li>
                )
              })}
              <li className="pt-2">
                <a href="/colleges" className="text-blue-600 hover:text-blue-800 font-medium text-sm block" onClick={(e) => e.stopPropagation()}>
                  View All
                </a>
              </li>
            </ul>

            <h3 className="font-semibold text-gray-900 mb-4 text-sm mt-6">Colleges By Location</h3>
            <ul className="space-y-2">
              {currentData.locations.map((location) => {
                const stateName = location.replace('Colleges in ', '').trim()
                const link = hoveredStream
                  ? createFilterLink('streams', hoveredStream, 'states', stateName)
                  : createFilterLink('states', stateName)
                return (
                  <li key={location}>
                    <a
                      href={link}
                      className="text-gray-600 hover:text-blue-600 text-sm block"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {location}
                    </a>
                  </li>
                )
              })}
              <li className="pt-2">
                <a href="/colleges" className="text-blue-600 hover:text-blue-800 font-medium text-sm block" onClick={(e) => e.stopPropagation()}>
                  View All
                </a>
              </li>
            </ul>
          </div>

          {/* Popular Colleges */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4 text-sm">
              {hoveredStream ? `Popular ${hoveredStream} Colleges` : 'Popular Colleges'}
            </h3>
            <ul className="space-y-2">
              {currentData.popularColleges.slice(0, 10).map((college) => (
                <li key={college.slug}>
                  <a
                    href={createCollegeLink(college.slug)}
                    className="text-gray-600 hover:text-blue-600 text-sm block"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {college.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Top Colleges */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4 text-sm">
              {hoveredStream ? `Top ${hoveredStream} Colleges` : 'Top Colleges'}
            </h3>
            <ul className="space-y-2">
              {currentData.topColleges.map((college) => (
                <li key={college.slug}>
                  <a
                    href={createCollegeLink(college.slug)}
                    className="text-gray-600 hover:text-blue-600 text-sm block"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {college.name}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <a href="/colleges" className="text-blue-600 hover:text-blue-800 font-medium text-sm block" onClick={(e) => e.stopPropagation()}>
                  View All
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}