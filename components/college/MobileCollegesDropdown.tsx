"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getColleges, getDegrees, getPopularColleges, getStreams, getTopColleges, Degree } from "@/lib/api/data/colleges";
import type { College } from "@/lib/api/data/colleges";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface DropdownData {
  categories: string[];
  degrees: Degree[];
  courses: string[];
  locations: string[];
  popularColleges: { name: string; slug: string }[];
  topColleges: { name: string; slug: string }[];
}

export default function MobileCollegesDropdown({
  onClose,
  onMainMenuClick,
}: {
  onClose?: () => void;
  onMainMenuClick?: () => void;
}) {
  const router = useRouter();
  const [data, setData] = useState<DropdownData | null>(null);
  const [allColleges, setAllColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<"streams" | "submenu">("streams");
  const [selectedStream, setSelectedStream] = useState<string | null>(null);

  useEffect(() => {
    const fetchDropdownData = async () => {
      try {

      

        const [collegeResponse, streamResponse, degreeResponse, popularCollegesRes, topCollegesRes] = await Promise.all([
                  getColleges(),
                  getStreams(),
                  getDegrees(),
                  getPopularColleges(),
                  getTopColleges(),
                ]);

        if (!collegeResponse.success || !collegeResponse.data) {
          setData(getFallbackData());
          return;
        }

        const colleges: College[] = collegeResponse.data;
        setAllColleges(colleges);

        // 1. Categories = Streams
        const streams = streamResponse.success && streamResponse.data ? streamResponse.data : []
        const streamsSet = streams.length > 0
          ? new Set(streams.map((s) => s.title))
          : new Set<string>()

        const categories = Array.from(streamsSet).sort();

        // Degrees
        const degrees = degreeResponse.success && degreeResponse.data
          ? degreeResponse.data
          : []

        // Courses (Top 5 most common courses)
        const courseCount = new Map<string, number>()
        colleges.forEach((college) => {
          college.courses?.forEach((course) => {
            if (course.name) {
              courseCount.set(course.name, (courseCount.get(course.name) || 0) + 1)
            }
          })
        })
        const courses = Array.from(courseCount.entries())
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5)
          .map(([name]) => `${name} colleges in india`)

        // 3. Top 5 states by college count
        const stateCount = new Map<string, number>();
        colleges.forEach((college) => {
          if (college.location?.state) {
            stateCount.set(
              college.location.state,
              (stateCount.get(college.location.state) || 0) + 1
            );
          }
        });
        const locations = Array.from(stateCount.entries())
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5)
          .map(([state]) => `Colleges in ${state}`);

        // 4. Popular Colleges
        const popularColleges = popularCollegesRes.success && popularCollegesRes.data ? popularCollegesRes.data : []

        // 5. Top Colleges
        const topColleges = topCollegesRes.success && topCollegesRes.data ? topCollegesRes.data : []

        setData({
          categories,
          degrees,
          courses,
          locations,
          popularColleges,
          topColleges,
        });
      } catch (error) {
        console.error("Failed to load dropdown data:", error);
        setData(getFallbackData());
      } finally {
        setLoading(false);
      }
    };

    fetchDropdownData();
  }, []);

  const getFallbackData = (): DropdownData => ({
    categories: ["Engineering", "Management", "Law", "Pharmacy", "Science"],
    degrees: [
      { id: "1", stream: "Engineering", title: "B.Tech" },
      { id: "2", stream: "Management", title: "MBA" },
      { id: "3", stream: "Law", title: "LLB" },
      { id: "4", stream: "Pharmacy", title: "B.Pharm" },
      { id: "5", stream: "Science", title: "B.Sc" },
    ],
    courses: [
      "B.Tech",
      "MBA",
      "LLB",
      "B.Pharm",
      "B.Sc",
    ],
    locations: [
      "Colleges in Maharashtra",
      "Colleges in Delhi NCR",
      "Colleges in Karnataka",
      "Colleges in Tamil Nadu",
      "Colleges in Uttar Pradesh",
    ],
    popularColleges: [
      { name: "Chandigarh University", slug: "chandigarh-university" },
      { name: "LPU", slug: "lpu" },
      { name: "Parul University", slug: "parul-university" },
    ],
    topColleges: [
      { name: "NLSIU Bangalore", slug: "nlsiu-bangalore" },
      { name: "NLU Delhi", slug: "nlu-दिल्ली" },
    ],
  });

  const createFilterLink = (
    param1: string,
    value1: string,
    param2?: string,
    value2?: string
  ) => {
    let url = `/colleges?${param1}=${encodeURIComponent(value1)}`;
    if (param2 && value2) {
      url += `&${param2}=${encodeURIComponent(value2)}`;
    }
    return url;
  };

  const createCollegeLink = (slug: string) => `/college/${slug}`;

  const handleStreamClick = (stream: string) => {
    setSelectedStream(stream);
    setView("submenu");
  };

  const handleBackClick = () => {
    setView("streams");
    setSelectedStream(null);
  };

  const handleLinkClick = (url: string) => {
    router.push(url);
    if (onClose) {
      onClose();
    }
  };

  if (loading) {
    return (
      <div className="p-4">
        <Skeleton className="h-5 w-32 mb-4" />
        <div className="space-y-3">
          {[...Array(12)].map((_, i) => (
            <Skeleton key={i} className="h-4 w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (!data) return null;

  if (view === "streams") {
    return (
      <div className="p-4 ">
      

        <div className="w-full  border-white/30  pb-4 ">
               <button
          onClick={onMainMenuClick}
          className="flex items-center gap-2  "
        >
          <ChevronLeft className="h-4 w-4" />
          Back 
        </button>
        </div>

        
        <h3 className="font-bold mb-4">Select a Stream</h3>
        <ul className="space-y-2">
          {data.categories.map((category) => (
            <li key={category} className="border-b last:border-0 border-white/30 pb-3">
              <button
                onClick={() => handleStreamClick(category)}
                className="w-full text-left flex justify-between items-center"
              >
                {category}
                <ChevronRight className="h-4 w-4" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (view === "submenu") {
    const filteredColleges = allColleges.filter((college) =>
      college.streams?.some((stream) =>
        typeof stream === "string"
          ? stream === selectedStream
          : stream.title === selectedStream
      )
    );

    const popularColleges = filteredColleges
      .sort((a, b) => {
        if (b.rating !== a.rating) return b.rating - a.rating;
        return b.reviews - a.reviews;
      })
      .slice(0, 5)
      .map((c) => ({
        name: c.name,
        slug:
          c.slug ||
          c.name.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, ""),
      }));

    const topColleges = filteredColleges
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 5)
      .map((c) => ({
        name: c.name,
        slug:
          c.slug ||
          c.name.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, ""),
      }));


      // here get degrees from data and that have the selected stream

    const degrees = data.degrees.filter((degree) =>
      degree.stream.toLowerCase() === selectedStream!.toLowerCase()
    ).slice(0, 5);


    const stateCount = new Map<string, number>();
    filteredColleges.forEach((college) => {
      if (college.location?.state) {
        stateCount.set(
          college.location.state,
          (stateCount.get(college.location.state) || 0) + 1
        );
      }
    });
    
    const locations = Array.from(stateCount.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([state]) => `Colleges in ${state}`);

    return (
      <div className="p-4">
        <button
          onClick={handleBackClick}
          className="flex items-center gap-2 mb-4"
        >
          <ChevronLeft className="h-4 w-4" />
          Back 
        </button>
        <h3 className="font-bold mb-4 underline">{selectedStream}</h3>
        <ul className="space-y-2">
          <li>
            <a
              onClick={() =>
                handleLinkClick(createFilterLink("streams", selectedStream!))
              }
              className="cursor-pointer"
            >
              All {selectedStream} Colleges
            </a>
          </li>
     {  degrees?.length > 0 ?
          <li>
            <h4 className="font-bold mt-4 mb-4 underline">
              Colleges By Degrees
            </h4>
            <ul className="space-y-3 pl-0">
              {degrees.map((degree) => {
                const dName = degree.title.trim();
                return (
                  <li key={degree.id} className="line-clamp-1">
                    <a
                      onClick={() =>
                        handleLinkClick(
                          createFilterLink(
                            "streams",
                            selectedStream!,
                            "degrees",
                            dName
                          )
                        )
                      }
                      className="cursor-pointer inline"
                    >
                      {degree.title} colleges in india
                    </a>
                  </li>
                );
              })}
            </ul>
          </li> : <></>}
          <li>
            <h4 className="font-bold mt-4 mb-4 underline">
              Colleges By Location
            </h4>
            <ul className="space-y-3 pl-0">
              {locations.map((location) => {
                const stateName = location.replace("Colleges in ", "").trim();
                return (
                  <li key={location}>
                    <a
                      onClick={() =>
                        handleLinkClick(
                          createFilterLink(
                            "streams",
                            selectedStream!,
                            "states",
                            stateName
                          )
                        )
                      }
                      className="cursor-pointer"
                    >
                      {location}
                    </a>
                  </li>
                );
              })}
            </ul>
          </li>
          <li>
            <h4 className="font-bold my-4 underline">
              Popular Colleges
            </h4>
            <ul className="space-y-3 pl-0">
              {popularColleges.map((college) => (
                <li key={college.slug}>
                  <a
                    onClick={() =>
                      handleLinkClick(createCollegeLink(college.slug))
                    }
                    className="cursor-pointer"
                  >
                    {college.name}
                  </a>
                </li>
              ))}
            </ul>
          </li>
          <li>
            <h4 className="font-bold my-4 underline">Top Colleges</h4>
            <ul className="space-y-3 pl-0">
              {topColleges.map((college) => (
                <li key={college.slug}>
                  <a
                    onClick={() =>
                      handleLinkClick(createCollegeLink(college.slug))
                    }
                    className="cursor-pointer"
                  >
                    {college.name}
                  </a>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </div>
    );
  }

  return null;
}