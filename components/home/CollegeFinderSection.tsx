'use client'

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useEffect, useState } from "react"
import { College, getColleges, getFeaturedColleges, getPopularColleges, Stream, getStreams } from "@/lib/api/data/colleges"
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
    const [allColleges, setAllColleges] = useState<College[]>([]);
    const [allCourses, setAllCourses] = useState<CourseDetails[]>([]);

    // State for the currently displayed data
    const [featuredColleges, setFeaturedColleges] = useState<College[]>([]);
    const [popularColleges, setPopularColleges] = useState<College[]>([]);
    const [courses, setCourses] = useState<CourseDetails[]>([]);

    // State to hold the initial, unfiltered data
    const [initialFeaturedColleges, setInitialFeaturedColleges] = useState<College[]>([]);
    const [initialPopularColleges, setInitialPopularColleges] = useState<College[]>([]);
    const [initialCourses, setInitialCourses] = useState<CourseDetails[]>([]);

    const [hoveredStream, setHoveredStream] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [streamsRes, featuredRes, popularRes, coursesRes, collegesRes] = await Promise.all([
                    getStreams(),
                    getFeaturedColleges(),
                    getPopularColleges(),
                    getCourses(),
                    getColleges()
                ]);

                if (streamsRes.success && streamsRes.data) {
                    setStreams(streamsRes.data.slice(0, 8));
                }
                if (featuredRes.success && featuredRes.data) {
                    const featured = featuredRes.data.slice(0, 2);
                    setFeaturedColleges(featured);
                    setInitialFeaturedColleges(featured);
                }
                if (popularRes.success && popularRes.data) {
                    const popular = popularRes.data.slice(0, 2);
                    setPopularColleges(popular);
                    setInitialPopularColleges(popular);
                }
                if (coursesRes.success && coursesRes.data) {
                    const courseData = coursesRes.data
                    setAllCourses(courseData);
                    const initial = courseData.slice(0, 4)
                    setCourses(initial);
                    setInitialCourses(initial);
                }
                if (collegesRes.success && collegesRes.data) {
                    setAllColleges(collegesRes.data);
                }

            } catch (error) {
                console.error("Failed to fetch college finder data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (!hoveredStream) {
            // Reset to initial state when no stream is hovered
            setFeaturedColleges(initialFeaturedColleges);
            setPopularColleges(initialPopularColleges);
            setCourses(initialCourses);
            return;
        }

        // Filter colleges by hovered stream
        const filtered = allColleges.filter(college =>
            college.streams?.some((s: any) =>
                typeof s === 'string'
                    ? s.toLowerCase() === hoveredStream.toLowerCase()
                    : s.title.toLowerCase() === hoveredStream.toLowerCase()
            )
        );

        // Update featured and popular lists from the filtered colleges
        const newFeatured = filtered
            .sort((a, b) => b.rating - a.rating) // Example sorting
            .slice(0, 2);

        const newPopular = filtered
            .sort((a, b) => (b.reviews || 0) - (a.reviews || 0)) // Example sorting
            .slice(0, 2);

        // Filter courses by hovered stream
        const streamCourses = allCourses.filter(course =>
            course.basic_info.stream?.title.toLowerCase() === hoveredStream.toLowerCase()
        ).slice(0, 4);


        setFeaturedColleges(newFeatured);
        setPopularColleges(newPopular);
        setCourses(streamCourses.length > 0 ? streamCourses : initialCourses); // Fallback to initial if no courses found

    }, [hoveredStream, allColleges, allCourses, initialFeaturedColleges, initialPopularColleges, initialCourses]);


  return (
    <section className="py-12 md:py-16 bg-gray-50" onMouseLeave={() => setHoveredStream(null)}>
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
                    <Link href={`/colleges?streams=${encodeURIComponent(stream.title)}`} key={stream.id}>
                        <Badge
                            variant={hoveredStream === stream.title ? "default" : "outline"}
                            className="text-xs md:text-sm cursor-pointer"
                            onMouseEnter={() => setHoveredStream(stream.title)}
                        >
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
              <h3 className="text-lg md:text-xl font-semibold">
                {hoveredStream ? `Featured in ${hoveredStream}`: 'Featured Colleges'}
                </h3>
              <Link href={hoveredStream ? `/colleges?streams=${hoveredStream}&filter=featured` : "/colleges?filter=featured"}>
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
                 {featuredColleges.length === 0 && !loading && <p className="text-gray-500 text-sm">No featured colleges found for this stream.</p>}
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg md:text-xl font-semibold">
                {hoveredStream ? `Popular in ${hoveredStream}`: 'Popular Colleges'}
                </h3>
              <Link href={hoveredStream ? `/colleges?streams=${hoveredStream}&filter=popular` : "/colleges?filter=popular"}>
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
                 {popularColleges.length === 0 && !loading && <p className="text-gray-500 text-sm">No popular colleges found for this stream.</p>}
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg md:text-xl font-semibold">
                {hoveredStream ? `Courses in ${hoveredStream}`: 'Related Courses'}
                </h3>
              <Link href={hoveredStream ? `/courses?streams=${hoveredStream}` : "/courses"}>
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
                {courses.length === 0 && !loading && <p className="text-gray-500 text-sm">No courses found for this stream.</p>}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}