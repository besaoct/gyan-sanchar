"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Check } from "lucide-react"
import { getCourses, CourseDetails } from "@/lib/api/data/courses"

interface CourseSelectionProps {
  selectedCourses: CourseDetails[];
  onCourseToggle: (course: CourseDetails) => void;
}

export function CourseSelection({ selectedCourses, onCourseToggle }: CourseSelectionProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [allCourses, setAllCourses] = useState<CourseDetails[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<CourseDetails[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAllCourses = async () => {
      setIsLoading(true);
      try {
        const response = await getCourses();
        if (response.success && response.data) {
          setAllCourses(response.data);
          setFilteredCourses(response.data.slice(0, 10)); // Initially show top 10
        }
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAllCourses();
  }, []);

  useEffect(() => {
    const lowercasedTerm = searchTerm.toLowerCase();
    const results = allCourses
      .filter((course) =>
        course.course_name.toLowerCase().includes(lowercasedTerm)
      )
      .slice(0, 10);
    setFilteredCourses(results);
  }, [searchTerm, allCourses]);

  const isSelected = (courseId: string | number) =>
    selectedCourses.some((c) => c.id === courseId);

  return (
    <div>
      <div className="pb-0">
        <h2 className="text-2xl font-bold mb-6">Select Course(s)</h2>
      </div>
      <div className="px-0">
        <Input
          placeholder="Search for a course..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-6 bg-gray-50 rounded-md"
        />
        <div className="space-y-3">
          {isLoading ? (
            <p>Loading courses...</p>
          ) : (
            filteredCourses.map((course) => (
              <div
                key={course.id}
                onClick={() => onCourseToggle(course)}
                className={`bg-white rounded-md p-4 flex items-center justify-between cursor-pointer transition-colors ${
                  isSelected(course.id) ? "bg-blue-50" : "hover:bg-gray-50"
                }`}
              >
                <h3 className="font-medium text-foreground">{course.course_name}</h3>
                <div
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                    isSelected(course.id) ? "bg-primary border-primary" : "border-gray-300"
                  }`}
                >
                  {isSelected(course.id) && <Check className="w-3 h-3 text-white" />}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}