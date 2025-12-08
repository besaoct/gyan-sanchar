"use client"

import { Button } from "@/components/ui/button"
import type { AdmissionCourse } from "@/lib/api/dummy/admission-data"
import { X } from "lucide-react"

interface CourseCartProps {
  courses: AdmissionCourse[]
  onRemove: (courseId: string) => void
  onContinue: () => void
}

export function CourseCart({ courses, onRemove }: CourseCartProps) {
  return (
    <div>
      <div className="mb-6">
        <h3 className="text-2xl font-bold">Selected Courses</h3>
      </div>
      <div>
        {courses.length === 0 ? (
          <div className="bg-white rounded-md p-8 text-center">
            <p className="text-muted-foreground">No courses selected yet</p>
          </div>
        ) : (
          <>
            <div className="space-y-3 mb-6">
              {courses.map((course) => (
                <div key={course.id} className="bg-white rounded-md p-4 flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-foreground">{course.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">Course ID: {course.id}</p>
                  </div>
                  <button
                    onClick={() => onRemove(course.id)}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-md p-4 mb-6">
              <div className="flex justify-between items-center ">
                <span className="font-semibold text-foreground">Total Courses</span>
                <span className="text-xl font-bold text-primary">{courses.length}</span>
               
              </div>
              <div className="flex justify-between items-center ">

               {/* price */}
                          <span className="font-semibold text-foreground">Price</span>
                <span className="text-xl font-bold text-primary">₹ 500</span>
                     </div>
            </div>

         
          </>
        )}
      </div>
    </div>
  )
}
