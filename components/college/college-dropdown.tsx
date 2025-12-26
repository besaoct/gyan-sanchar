'use client'

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { getColleges } from "@/lib/api/data/colleges"
import type { College } from "@/lib/api/data/colleges"
import { Skeleton } from "@/components/ui/skeleton" // Adjust path if needed

interface DropdownData {
  categories: string[]
  degrees: string[]
  locations: string[]
  popularColleges: { name: string; slug: string }[]
  topColleges: { name: string; slug: string }[]
}

export default function CollegesDropdown({onClose}:{ onClose?: ()=>void}) {
  const router = useRouter()
  const [data, setData] = useState<DropdownData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const response = await getColleges()
        if (!response.success || !response.data) {
          setData(getFallbackData())
          return
        }

        const colleges: College[] = response.data

        // 1. Categories = Streams
        const streamsSet = new Set<string>()
        colleges.forEach((college) => {
          college.streams?.forEach((stream) => {
            if (typeof stream === "string") {
              streamsSet.add(stream)
            } else if (stream?.name) {
              streamsSet.add(stream.name)
            }
          })
        })
        const categories = Array.from(streamsSet).sort()

        // 2. Top 5 most common courses → "Course Name colleges in india"
        const courseCount = new Map<string, number>()
        colleges.forEach((college) => {
          college.courses?.forEach((course) => {
            if (course.name) {
              courseCount.set(course.name, (courseCount.get(course.name) || 0) + 1)
            }
          })
        })
        const degrees = Array.from(courseCount.entries())
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5)
          .map(([name]) => `${name} colleges in india`)

        // 3. Top 5 states by college count
        const stateCount = new Map<string, number>()
        colleges.forEach((college) => {
          if (college.location?.state) {
            stateCount.set(
              college.location.state,
              (stateCount.get(college.location.state) || 0) + 1
            )
          }
        })
        const locations = Array.from(stateCount.entries())
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5)
          .map(([state]) => `Colleges in ${state}`)

        // 4. Popular Colleges (top 12 by rating + reviews)
        const popularCollegesRaw = colleges
          .sort((a, b) => {
            if (b.rating !== a.rating) return b.rating - a.rating
            return b.reviews - a.reviews
          })
          .slice(0, 12)

        const popularColleges = popularCollegesRaw.map((c) => ({
          name: c.name,
          slug: c.slug || c.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, ''),
        }))

        // 5. Top Colleges (top 10 by rating)
        const topCollegesRaw = colleges
          .sort((a, b) => b.rating - a.rating)
          .slice(0, 10)

        const topColleges = topCollegesRaw.map((c) => ({
          name: c.name,
          slug: c.slug || c.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, ''),
        }))

        setData({
          categories,
          degrees,
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

  const getFallbackData = (): DropdownData => ({
    categories: ['Engineering', 'Management', 'Law', 'Pharmacy', 'Science'],
    degrees: [
      'B.Tech colleges in india',
      'MBA colleges in india',
      'LLB colleges in india',
      'B.Pharm colleges in india',
      'B.Sc colleges in india',
    ],
    locations: [
      'Colleges in Maharashtra',
      'Colleges in Delhi NCR',
      'Colleges in Karnataka',
      'Colleges in Tamil Nadu',
      'Colleges in Uttar Pradesh',
    ],
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

  // Helper to create clean URI-friendly links
  const createFilterLink = (param: string, value: string) => {
    return `/colleges?${param}=${encodeURIComponent(value)}`
  }

  const createCollegeLink = (slug: string) => `/college/${slug}`

  // Skeleton Loader
  if (loading) {
    return (
      <div className="bg-white border-b border-gray-200 shadow-2xl absolute w-full top-28 left-0 z-40 max-h-[calc(100vh-4rem)] overflow-y-auto">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {/* Categories Skeleton */}
            <div className="bg-blue-50 p-4 md:p-6 rounded-lg">
              <Skeleton className="h-5 w-32 mb-4" />
              <div className="space-y-3">
                {[...Array(12)].map((_, i) => (
                  <Skeleton key={i} className="h-4 w-full" />
                ))}
              </div>
            </div>

            {/* Degrees + Locations Skeleton */}
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

            {/* Popular Colleges Skeleton */}
            <div>
              <Skeleton className="h-5 w-40 mb-4" />
              <div className="space-y-3">
                {[...Array(10)].map((_, i) => (
                  <Skeleton key={i} className="h-4 w-72" />
                ))}
              </div>
            </div>

            {/* Top Colleges Skeleton */}
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

  if (!data) return null

  return (
    <div
      className="bg-white border-b border-gray-200 shadow-2xl absolute w-full top-28 left-0 z-40 max-h-[calc(100vh-4rem)] overflow-y-auto"
      onClick={() => router.push('/colleges')}
    >
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {/* Categories */}
          <div className="bg-blue-50 p-4 md:p-6 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-4 text-sm">Categories</h3>
            <ul className="space-y-2 max-h-96 overflow-y-auto">
              {data.categories.map((category) => (
                <li key={category}>
                  <a
                    href={createFilterLink('streams', category)}
                    className="text-blue-900 hover:text-blue-600 text-sm block"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {category}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Colleges By Degrees + Location */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4 text-sm">Colleges By Degrees</h3>
            <ul className="space-y-2">
              {data.degrees.map((degree) => {
                const courseName = degree.replace(' colleges in india', '').trim()
                return (
                  <li key={degree} className="line-clamp-2">
                    <a
                      href={createFilterLink('courses', courseName)}
                      className="text-gray-600 hover:text-blue-600 text-sm block "
                      onClick={(e) => e.stopPropagation()}
                    >
                      {degree} 
                    </a>
                  </li>
                )
              })}
              <li className="pt-2">
                <a
                  href="/colleges"
                  className="text-blue-600 hover:text-blue-800 font-medium text-sm block"
                  onClick={(e) => e.stopPropagation()}
                >
                  View All
                </a>
              </li>
            </ul>

            <h3 className="font-semibold text-gray-900 mb-4 text-sm mt-6">Colleges By Location</h3>
            <ul className="space-y-2">
              {data.locations.map((location) => {
                const stateName = location.replace('Colleges in ', '').trim()
                return (
                  <li key={location}>
                    <a
                      href={createFilterLink('states', stateName)}
                      className="text-gray-600 hover:text-blue-600 text-sm block"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {location}
                    </a>
                  </li>
                )
              })}
              <li className="pt-2">
                <a
                  href="/colleges"
                  className="text-blue-600 hover:text-blue-800 font-medium text-sm block"
                  onClick={(e) => e.stopPropagation()}
                >
                  View All
                </a>
              </li>
            </ul>
          </div>

          {/* Popular Colleges */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4 text-sm">Popular Colleges</h3>
            <ul className="space-y-2">
              {data.popularColleges.slice(0, 10).map((college) => (
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
            <h3 className="font-semibold text-gray-900 mb-4 text-sm">Top Colleges</h3>
            <ul className="space-y-2">
              {data.topColleges.map((college) => (
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
                <a
                  href="/colleges"
                  className="text-blue-600 hover:text-blue-800 font-medium text-sm block"
                  onClick={(e) => e.stopPropagation()}
                >
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