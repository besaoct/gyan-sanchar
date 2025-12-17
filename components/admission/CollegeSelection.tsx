"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { Check } from "lucide-react"
import { getColleges, College } from "@/lib/api/data/colleges"

interface CollegeSelectionProps {
  selectedColleges: College[];
  onCollegeToggle: (college: College) => void;
}

export function CollegeSelection({ selectedColleges, onCollegeToggle }: CollegeSelectionProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [allColleges, setAllColleges] = useState<College[]>([]);
  const [filteredColleges, setFilteredColleges] = useState<College[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAllColleges = async () => {
      setIsLoading(true);
      try {
        const response = await getColleges();
        if (response.success && response.data) {
          setAllColleges(response.data);
          setFilteredColleges(response.data.slice(0, 10)); // Initially show top 10
        }
      } catch (error) {
        console.error("Failed to fetch colleges:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAllColleges();
  }, []);

  useEffect(() => {
    const lowercasedTerm = searchTerm.toLowerCase();
    const results = allColleges
      .filter((college) =>
        college.name.toLowerCase().includes(lowercasedTerm)
      )
      .slice(0, 10);
    setFilteredColleges(results);
  }, [searchTerm, allColleges]);

  const isSelected = (collegeId: string | number | undefined) =>
    collegeId !== undefined && selectedColleges.some((c) => c.id === collegeId);

  return (
    <div>
      <div className="pb-0">
        <h2 className="text-2xl font-bold mb-6">Select College(s)</h2>
      </div>
      <div className="px-0">
        <Input
          placeholder="Search for a college..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-6 rounded-md"
        />
        <div className="space-y-3">
          {isLoading ? (
            <p>Loading colleges...</p>
          ) : (
            filteredColleges.map((college) => (
              <div
                key={college.id}
                onClick={() => onCollegeToggle(college)}
                className={`bg-white rounded-md p-4 flex items-center justify-between cursor-pointer transition-colors ${
                  isSelected(college.id) ? "bg-blue-50" : "hover:bg-gray-50"
                }`}
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
                    <p className="text-sm text-muted-foreground">{college.location.city}, {college.location.state}</p>
                  </div>
                </div>
                <div
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                    isSelected(college.id) ? "bg-primary border-primary" : "border-gray-300"
                  }`}
                >
                  {isSelected(college.id) && <Check className="w-3 h-3 text-white" />}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}