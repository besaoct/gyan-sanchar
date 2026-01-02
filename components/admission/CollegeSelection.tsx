"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Check, Search, SlidersHorizontal } from "lucide-react";
import {
  getColleges,
  College,
  getCollegeFilters,
  getStreams,
} from "@/lib/api/data/colleges";
// import { getCoursesFilters } from "@/lib/api/data/courses";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
} from "@/components/ui/drawer";
import { Checkbox } from "@/components/ui/checkbox";

interface CollegeSelectionProps {
  selectedColleges: College[];
  onCollegeToggle: (college: College) => void;
}

export function CollegeSelection({
  selectedColleges,
  onCollegeToggle,
}: CollegeSelectionProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [allColleges, setAllColleges] = useState<College[]>([]);
  const [filteredColleges, setFilteredColleges] = useState<College[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [types, setTypes] = useState<string[]>([]);
  const [streams, setStreams] = useState<string[]>([]);
  const [states, setStates] = useState<string[]>([]);
  const [filtersLoading, setFiltersLoading] = useState(true);

  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedStreams, setSelectedStreams] = useState<string[]>([]);
  const [selectedStates, setSelectedStates] = useState<string[]>([]);

  const applyFilters = () => {
    let results = allColleges;

    if (selectedTypes.length > 0) {
      results = results.filter((college) => selectedTypes.includes(college.type));
    }

    if (selectedStreams.length > 0) {
      results = results.filter((college) =>
        college.streams.some((s) => selectedStreams.includes(s.title))
      );
    }

    if (selectedStates.length > 0) {
      results = results.filter((college) =>
        selectedStates.includes(college.location.state)
      );
    }
    
    if (searchTerm) {
        const lowercasedTerm = searchTerm.toLowerCase();
        results = results.filter((college) =>
            college.name.toLowerCase().includes(lowercasedTerm)
        );
    }

    setFilteredColleges(results.slice(0, 10));
    setIsDrawerOpen(false);
  };

  const handleClearFilters = () => {
    setSelectedTypes([]);
    setSelectedStreams([]);
    setSelectedStates([]);
    setFilteredColleges(allColleges.slice(0, 10));
    setIsDrawerOpen(false);
  };
  
  const handleCheckboxChange = (
    filterType: "types" | "streams" | "states",
    value: string
  ) => {
    const setters = {
      types: setSelectedTypes,
      streams: setSelectedStreams,
      states: setSelectedStates,
    };
    const states = {
      types: selectedTypes,
      streams: selectedStreams,
      states: selectedStates,
    };

    const currentFilters = states[filterType];
    const newFilters = currentFilters.includes(value)
      ? currentFilters.filter((item) => item !== value)
      : [...currentFilters, value];
    setters[filterType](newFilters);
  };


  useEffect(() => {


    const fetchFilters = async () => {
      setFiltersLoading(true);
      try {
        const [collegeFilters, streamRes] = await Promise.all([
          getCollegeFilters(),
          getStreams()
        ]);

        if (collegeFilters.success && collegeFilters.data) {
          setStates(collegeFilters.data.states);
          setStreams(streamRes.success && streamRes.data ? streamRes.data.map(s => s.title) : []);
          setTypes(collegeFilters.data.instituteTypes);
        }
     
      } catch (error) {
        console.error("Failed to fetch filters:", error);
      } finally {
        setFiltersLoading(false);
      }
    };

    fetchFilters();
  }, []);

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
      .filter((college) => college.name.toLowerCase().includes(lowercasedTerm))
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
        <div className="flex gap-4 mb-6">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />

            <Input
              placeholder="Search for a college..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 rounded-md"
            />
          </div>

          <Drawer
            direction="right"
            open={isDrawerOpen}
            onOpenChange={setIsDrawerOpen}
          >
            <DrawerTrigger asChild>
              <Button variant="outline" className="rounded-md">
                <SlidersHorizontal className="h-5 w-5 mr-2" />
                Filters
              </Button>
            </DrawerTrigger>

            <DrawerContent className="h-full max-w-sm ml-auto">
              <DrawerHeader>
                <DrawerTitle>Filter Colleges</DrawerTitle>
              </DrawerHeader>

              <div className="p-4 overflow-y-auto">
                {filtersLoading ? (
                  <p>Loading filters...</p>
                ) : (
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold mb-3">Type</h3>

                      <div className="space-y-2">
                        {types.map((type) => (
                          <div
                            key={type}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox id={`type-${type}`} 
                            className="min-w-4"
                            checked={selectedTypes.includes(type)}
                            onCheckedChange={() => handleCheckboxChange("types", type)}
                            />

                            <label
                              htmlFor={`type-${type}`}
                              className="text-sm"
                            >
                              {type}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-3">Streams</h3>

                      <div className="space-y-2">
                        {streams.map((stream) => (
                          <div
                            key={stream}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox id={`stream-${stream}`}
                            checked={selectedStreams.includes(stream)}
                            onCheckedChange={() => handleCheckboxChange("streams", stream)}
                             />

                            <label
                              htmlFor={`stream-${stream}`}
                              className="text-sm"
                            >
                              {stream}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-3">States</h3>

                      <div className="space-y-2">
                        {states.map((state) => (
                          <div
                            key={state}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox id={`state-${state}`} 
                            checked={selectedStates.includes(state)}
                            onCheckedChange={() => handleCheckboxChange("states", state)}
                            />

                            <label
                              htmlFor={`state-${state}`}
                              className="text-sm"
                            >
                              {state}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <DrawerFooter>
                <Button onClick={applyFilters}>Apply Filters</Button>

                <Button
                  variant="outline"
                  onClick={handleClearFilters}
                >
                  Clear
                </Button>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>

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
                    <h3 className="font-semibold text-foreground">
                      {college.name}
                    </h3>

                    <p className="text-sm text-muted-foreground">
                      {college.location.city}, {college.location.state}
                    </p>
                  </div>
                </div>

                <div
                  className={`min-w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                    isSelected(college.id)
                      ? "bg-primary border-primary"
                      : "border-gray-300"
                  }`}
                >
                  {isSelected(college.id) && (
                    <Check className="min-w-3 h-3 text-white" />
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
