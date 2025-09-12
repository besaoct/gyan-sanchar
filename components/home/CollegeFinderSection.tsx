'use client'

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function CollegeFinderSection() {
  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">Find The Perfect College For You</h2>
        <p className="text-center text-gray-600 mb-12">
          Discover top colleges, exams, and courses that match your interests and career goals.
        </p>

        <div className="flex justify-center mb-12">
          <div className="flex flex-wrap justify-center gap-2 md:gap-4">
            <Badge variant="outline" className="text-xs md:text-sm">
              ENGINEERING
            </Badge>
            <Badge variant="outline" className="text-xs md:text-sm">
              MANAGEMENT
            </Badge>
            <Badge variant="outline" className="text-xs md:text-sm">
              COMMERCE AND BANKING
            </Badge>
            <Badge variant="outline" className="text-xs md:text-sm">
              MEDICAL
            </Badge>
            <Badge variant="outline" className="text-xs md:text-sm">
              SCIENCE
            </Badge>
            <Badge variant="outline" className="text-xs md:text-sm">
              HOTEL MANAGEMENT
            </Badge>
            <Badge variant="outline" className="text-xs md:text-sm">
              INFORMATION TECHNOLOGY
            </Badge>
            <Badge variant="outline" className="text-xs md:text-sm">
              ARTS
            </Badge>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg md:text-xl font-semibold">Featured Colleges</h3>
              <Button variant="link" className="text-blue-600 text-sm">
                View All
              </Button>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
                <img
                  src="https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80"
                  alt="University Building"
                  className="w-12 h-12 rounded object-cover"
                />
                <div>
                  <div className="font-medium">Pearl University</div>
                  <div className="text-sm text-gray-600">Chandigarh University</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
                <img
                  src="https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80"
                  alt="Modern University Campus"
                  className="w-12 h-12 rounded object-cover"
                />
                <div>
                  <div className="font-medium">Bharati Vidyapeeth University</div>
                  <div className="text-sm text-gray-600">Bharati Vidyapeeth University</div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Important Exams</h3>
              <Button variant="link" className="text-blue-600">
                View All
              </Button>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                <div className="font-medium">JEE Main</div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                <div className="font-medium">JEE Advanced</div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                <div className="font-medium">NEET</div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                <div className="font-medium">BITSAT</div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                <div className="font-medium">TS EAMCET</div>
              </div>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Related Courses</h3>
              <Button variant="link" className="">
                View All
              </Button>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                <div className="font-medium">B.Tech</div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                <div className="font-medium">M.Tech</div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                <div className="font-medium">Bachelor of Engineering</div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                <div className="font-medium">Civil Engineering</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
