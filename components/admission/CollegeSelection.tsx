"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { admissionColleges, type AdmissionCollege } from "@/lib/api/dummy/admission-data"
import Image from "next/image"

interface CollegeSelectionProps {
  onCollegeSelect: (college: AdmissionCollege) => void
}

export function CollegeSelection({ onCollegeSelect }: CollegeSelectionProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredColleges = admissionColleges.filter((college) =>
    college.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div>
      <div className="pb-0">
        <h2 className="text-2xl font-bold mb-6">Select a College</h2>
      </div>
      <div className="px-0">
        <Input
          placeholder="Search for a college..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-6  rounded-md"
        />
        <div className="space-y-3">
          {filteredColleges.map((college) => (
            <div
              key={college.id}
              className="bg-white rounded-md p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <Image
                  src={college.image || "/placeholder.svg"}
                  alt={college.name}
                  width={60}
                  height={60}
                  className="rounded-md object-cover"
                />
                <div>
                  <h3 className="font-semibold text-foreground">{college.name}</h3>
                  <p className="text-sm text-muted-foreground">{college.location}</p>
                </div>
              </div>
              <Button onClick={() => onCollegeSelect(college)} className="bg-primary hover:bg-primary/90 text-white">
                Select
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
