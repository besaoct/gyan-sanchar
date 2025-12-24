"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getColleges } from "@/lib/api/data/colleges";
import type { College } from "@/lib/api/data/colleges";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface DropdownData {
  categories: string[];
  degrees: string[];
  locations: string[];
  popularColleges: { name: string; slug: string }[];
  topColleges: { name: string; slug: string }[];
}

export default function MobileCollegesDropdown({
  onClose,
}: {
  onClose?: () => void;
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
        const response = await getColleges();
        if (!response.success || !response.data) {
          setData(getFallbackData());
          return;
        }

        const colleges: College[] = response.data;
        setAllColleges(colleges);

        // 1. Categories = Streams
        const streamsSet = new Set<string>();
        colleges.forEach((college) => {
          college.streams?.forEach((stream) => {
            if (typeof stream === "string") {
              streamsSet.add(stream);
            } else if (stream?.name) {
              streamsSet.add(stream.name);
            }
          });
        });
        const categories = Array.from(streamsSet).sort();

        // 2. Top 5 most common courses → "Course Name colleges in india"
        const courseCount = new Map<string, number>();
        colleges.forEach((college) => {
          college.courses?.forEach((course) => {
            if (course.name) {
              courseCount.set(
                course.name,
                (courseCount.get(course.name) || 0) + 1
              );
            }
          });
        });
        const degrees = Array.from(courseCount.entries())
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5)
          .map(([name]) => `${name} colleges in india`);

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

        // 4. Popular Colleges (top 12 by rating + reviews)
        const popularCollegesRaw = colleges
          .sort((a, b) => {
            if (b.rating !== a.rating) return b.rating - a.rating;
            return b.reviews - a.reviews;
          })
          .slice(0, 12);

        const popularColleges = popularCollegesRaw.map((c) => ({
          name: c.name,
          slug:
            c.slug ||
            c.name.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, ""),
        }));

        // 5. Top Colleges (top 10 by rating)
        const topCollegesRaw = colleges
          .sort((a, b) => b.rating - a.rating)
          .slice(0, 10);

        const topColleges = topCollegesRaw.map((c) => ({
          name: c.name,
          slug:
            c.slug ||
            c.name.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, ""),
        }));

        setData({
          categories,
          degrees,
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
      "B.Tech colleges in india",
      "MBA colleges in india",
      "LLB colleges in india",
      "B.Pharm colleges in india",
      "B.Sc colleges in india",
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
      { name: "NLU Delhi", slug: "nlu-delhi" },
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
      <div className="p-4 overflow-y-auto">
        <h3 className="font-semibold mb-4">Select a Stream</h3>
        <ul className="space-y-2">
          {data.categories.map((category) => (
            <li key={category}>
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
          : stream.name === selectedStream
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

    const courseCount = new Map<string, number>();
    filteredColleges.forEach((college) => {
      college.courses?.forEach((course) => {
        if (course.name) {
          courseCount.set(
            course.name,
            (courseCount.get(course.name) || 0) + 1
          );
        }
      });
    });
    const degrees = Array.from(courseCount.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name]) => `${name} colleges in india`);

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
      <div className="p-4 overflow-y-auto">
        <button
          onClick={handleBackClick}
          className="flex items-center gap-2 mb-4"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Streams
        </button>
        <h3 className="font-semibold mb-4 underline">{selectedStream}</h3>
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
          <li>
            <h4 className="font-semibold mt-4 mb-2 underline">
              Colleges By Degrees
            </h4>
            <ul className="space-y-2 pl-0">
              {degrees.map((degree) => {
                const courseName = degree
                  .replace(" colleges in india", "")
                  .trim();
                return (
                  <li key={degree} className="">
                    <a
                      onClick={() =>
                        handleLinkClick(
                          createFilterLink(
                            "streams",
                            selectedStream!,
                            "courses",
                            courseName
                          )
                        )
                      }
                      className="cursor-pointer inline"
                    >
                      {degree}
                    </a>
                  </li>
                );
              })}
            </ul>
          </li>
          <li>
            <h4 className="font-semibold mt-4 mb-2 underline">
              Colleges By Location
            </h4>
            <ul className="space-y-2 pl-0">
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
            <h4 className="font-semibold mt-4 mb-2 underline">
              Popular Colleges
            </h4>
            <ul className="space-y-2 pl-0">
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
            <h4 className="font-semibold mt-4 mb-2 underline">Top Colleges</h4>
            <ul className="space-y-2 pl-0">
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