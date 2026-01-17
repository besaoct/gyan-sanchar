'use client'

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useEffect, useState } from "react"
import { College, getFeaturedColleges, getPopularColleges, Stream, getStreams } from "@/lib/api/data/colleges"
import { CourseDetails, getCourses } from "@/lib/api/data/courses"
import { Skeleton } from "@/components/ui/skeleton"
import Image from "next/image"
import Link from "next/link"

function CollegeListItemSkeleton() {
    return (
        <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
            <Skeleton className="w-12 h-12 rounded" />
            <div className="w-full">
                <Skeleton className="h-5 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2" />
            </div>
        </div>
    )
}

export default function CollegeFinderSection() {
    const [streams, setStreams] = useState<Stream[]>([]);
    const [featuredColleges, setFeaturedColleges] = useState<College[]>([]);
    const [popularColleges, setPopularColleges] = useState<College[]>([]);
    const [courses, setCourses] = useState<CourseDetails[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [streamsRes, featuredRes, popularRes, coursesRes] = await Promise.all([
                    getStreams(),
                    getFeaturedColleges(),
                    getPopularColleges(),
                    getCourses()
                ]);

                if (streamsRes.success && streamsRes.data) {
                    setStreams(streamsRes.data.slice(0, 8));
                }
                if (featuredRes.success && featuredRes.data) {
                    setFeaturedColleges(featuredRes.data.slice(0, 2));
                }
                if (popularRes.success && popularRes.data) {
                    setPopularColleges(popularRes.data.slice(0, 2));
                }
                if (coursesRes.success && coursesRes.data) {
                    setCourses(coursesRes.data.slice(0, 4));
                }

            } catch (error) {
                console.error("Failed to fetch college finder data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);


  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">Find The Perfect College For You</h2>
        <p className="text-center text-gray-600 mb-12">
          Discover top colleges, exams, and courses that match your interests and career goals.
        </p>

        <div className="flex justify-center mb-12">
          <div className="flex flex-wrap justify-center gap-2 md:gap-4">
            {loading ? (
                [...Array(8)].map((_, i) => <Skeleton key={i} className="h-8 w-24" />)
            ) : (
                streams.map((stream) => (
                    <Link href={`/colleges?streams=${stream.title}`} key={stream.id}>
                        <Badge variant="outline" className="text-xs md:text-sm cursor-pointer">
                            {stream.title.toUpperCase()}
                        </Badge>
                    </Link>
                ))
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg md:text-xl font-semibold">Featured Colleges</h3>
              <Link href="/colleges?filter=featured">
                <Button variant="link" className="text-blue-600 text-sm">
                    View All
                </Button>
              </Link>
            </div>
            <div className="space-y-3">
                {loading ? (
                    <>
                        <CollegeListItemSkeleton />
                        <CollegeListItemSkeleton />
                    </>
                ) : (
                    featuredColleges.map(college => (
                        <Link href={`/college/${college.slug}`} key={college.id} className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
                            <Image
                                src={college.image}
                                alt={`${college.name} logo`}
                                width={48}
                                height={48}
                                className="w-12 h-12 rounded object-cover"
                            />
                            <div>
                                <div className="font-medium">{college.name}</div>
                                <div className="text-sm text-gray-600">{college.location.city}, {college.location.state}</div>
                            </div>
                        </Link>
                    ))
                )}
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Popular Colleges</h3>
              <Link href="/colleges?filter=popular">
                <Button variant="link" className="text-blue-600">
                    View All
                </Button>
              </Link>
            </div>
            <div className="space-y-3">
                {loading ? (
                    <>
                        <CollegeListItemSkeleton />
                        <CollegeListItemSkeleton />
                    </>
                ) : (
                    popularColleges.map(college => (
                        <Link href={`/college/${college.slug}`} key={college.id} className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
                             <Image
                                src={college.image}
                                alt={`${college.name} logo`}
                                width={48}
                                height={48}
                                className="w-12 h-12 rounded object-cover"
                            />
                            <div>
                                <div className="font-medium">{college.name}</div>
                                <div className="text-sm text-gray-600">{college.location.city}, {college.location.state}</div>
                            </div>
                        </Link>
                    ))
                )}
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Related Courses</h3>
              <Link href="/courses">
                <Button variant="link" className="">
                    View All
                </Button>
              </Link>
            </div>
            <div className="space-y-3">
                {loading ? (
                    <>
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                    </>
                ) : (
                    courses.map(course => (
                        <Link href={`/course/${course.slug}`} key={course.id} className="flex items-center gap-3 p-3 bg-white rounded-lg">
                            <div className="font-medium line-clamp-1" >{course.course_name}</div>
                        </Link>
                    ))
                )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
