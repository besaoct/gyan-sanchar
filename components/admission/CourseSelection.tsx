"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { admissionCourses, type AdmissionCourse } from "@/lib/api/dummy/admission-data"
import { Check } from "lucide-react"

interface CourseSelectionProps {
  collegeId: string
  selectedCourses: AdmissionCourse[]
  onCourseToggle: (course: AdmissionCourse) => void
}

export function CourseSelection({ collegeId, selectedCourses, onCourseToggle }: CourseSelectionProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredCourses = admissionCourses.filter(
    (course) => course.collegeId === collegeId && course.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const isSelected = (courseId: string) => selectedCourses.some((c) => c.id === courseId)

  return (
    <div>
      <div className="pb-0">
        <h2 className="text-2xl font-bold mb-6">Select Courses</h2>
      </div>
      <div className="px-0">
        <Input
          placeholder="Search for a course..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-6  bg-gray-50 rounded-md"
        />
        <div className="space-y-3">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              onClick={() => onCourseToggle(course)}
              className={`bg-white rounded-md p-4 flex items-center justify-between cursor-pointer transition-colors ${
                isSelected(course.id) ? "bg-blue-50" : "hover:bg-gray-50"
              }`}
            >
              <h3 className="font-medium text-foreground">{course.name}</h3>
              <div
                className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                  isSelected(course.id) ? "bg-primary border-primary" : "border-gray-300"
                }`}
              >
                {isSelected(course.id) && <Check className="w-3 h-3 text-white" />}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
