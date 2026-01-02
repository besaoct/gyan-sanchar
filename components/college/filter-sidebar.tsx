"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Search, Undo, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { FilterOptions } from "@/lib/types";
import { CollegeFilterOptions } from "@/lib/api/data/colleges";


interface FilterSidebarProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  filterOptions: CollegeFilterOptions;
}

export function FilterSidebar({
  filters,
  onFiltersChange,
  filterOptions,
}: FilterSidebarProps) {
  const [openSections, setOpenSections] = useState({
    degree: true,
    courses: true,
    location: true,
    instituteType: true,
    studyMode: true,
    hostel: true,
    fees: true,
    rating: true,
    facilities: false,
    exams: false,
    
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const updateFilter = <K extends keyof FilterOptions>(
    key: K,
    value: FilterOptions[K]
  ) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const toggleArrayFilter = <K extends keyof FilterOptions>(
    key: K,
    value: string,
    currentArray: string[]
  ) => {
    const newArray = currentArray.includes(value)
      ? currentArray.filter((item) => item !== value)
      : [...currentArray, value];
    updateFilter(key, newArray as FilterOptions[K]);
  };

  const clearAllFilters = () => {
    onFiltersChange({
      search: "",
      states: [],
      streams: [],
      courses: [],
      instituteTypes: [],
      feeRange: filterOptions.feeRange,
      rating: 0,
      hostel: [],
      facilities: [],
      studyMode: [],
      exams: [],
    });
  };


  const getActiveFiltersCount = () => {
    return (
      filters.states.length +
      filters.streams.length +
      filters.instituteTypes.length +
      filters.hostel.length +
      filters.facilities.length +
      filters.studyMode.length +
      filters.exams.length +
      (filters.rating > 0 ? 1 : 0) +
      (filters.feeRange[0] > filterOptions.feeRange[0] || filters.feeRange[1] < filterOptions.feeRange[1] ? 1 : 0)
    );
  };

  console.log("Active Filters Count:", getActiveFiltersCount());
  console.log("Streams Filter:", filters.streams);

  return (
    <div className="bg-white p-4 h-auto lg:h-fit sticky lg:top-6 ">
      <div className="flex items-center justify-between mb-8 lg:mb-0">
        <h3 className=" sr-only ">Filters</h3>
        {getActiveFiltersCount() > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="text-destructive bg-white border mt-8 lg:mt-0 -mb-4 lg:mb-4"
          >
            <Undo className="h-4 w-4 mr-1" />
            Reset
          </Button>
        )}
      </div>

      {/* Search Bar */}
      <div className="mb-4 max-w-xs lg:mt-0">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search..."
            value={filters.search}
            onChange={(e) => updateFilter("search", e.target.value)}
            className="pl-10 bg-white text-foreground"
          />
        </div>
      </div>

      <div className="space-y-4">
        {/* Stream/Discipline Filter */}
        <Collapsible
          open={openSections.degree}
          onOpenChange={() => toggleSection("degree")}
        >
          <CollapsibleTrigger className="flex items-center justify-between w-full p-2 hover:bg-muted rounded">
            <span className="font-semibold">Stream / Discipline</span>
            {openSections.degree ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-2 mt-2">
            {filterOptions.streams.map((stream) => (
              <div key={stream} className="flex items-center space-x-2">
                <Checkbox
                  id={`stream-${stream}`}
                  checked={filters.streams.includes(stream)}
                  onCheckedChange={() =>
                    toggleArrayFilter("streams", stream, filters.streams)
                  }
                />
                <Label htmlFor={`stream-${stream}`} className="text-sm">
                  {stream}
                </Label>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>

      
       {/* Course Filter */}
<Collapsible
  open={openSections.courses}
  onOpenChange={() => toggleSection("courses")}
>
  <CollapsibleTrigger className="flex items-center justify-between w-full p-2 hover:bg-muted rounded">
    <span className="font-semibold">Courses</span>
    {openSections.courses ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
  </CollapsibleTrigger>
  <CollapsibleContent className="mt-2">
    <div className="max-h-64 overflow-y-auto space-y-2">
      {filterOptions.courses.map((course) => (
        <div key={course} className="flex items-center space-x-2 ">
          <Checkbox
            id={`course-${course}`}
            checked={filters.courses.includes(course)}
            onCheckedChange={() =>
              toggleArrayFilter("courses", course, filters.courses)
            }
          />
          <Label htmlFor={`course-${course}`} className="text-sm line-clamp-2">
            {course}
          </Label>
        </div>
      ))}
    </div>
  </CollapsibleContent>
</Collapsible>


        {/* Location Filter */}
        <Collapsible
          open={openSections.location}
          onOpenChange={() => toggleSection("location")}
        >
          <CollapsibleTrigger className="flex items-center justify-between w-full p-2 hover:bg-muted rounded">
            <span className="font-semibold">State</span>
            {openSections.location ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2">
            <div className="max-h-48 overflow-y-auto space-y-2">
              {filterOptions.states.map((state) => (
                <div key={state} className="flex items-center space-x-2">
                  <Checkbox
                    id={`state-${state}`}
                    checked={filters.states.includes(state)}
                    onCheckedChange={() =>
                      toggleArrayFilter("states", state, filters.states)
                    }
                  />
                  <Label htmlFor={`state-${state}`} className="text-sm">
                    {state}
                  </Label>
                </div>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Institute Type Filter */}
        <Collapsible
          open={openSections.instituteType}
          onOpenChange={() => toggleSection("instituteType")}
        >
          <CollapsibleTrigger className="flex items-center justify-between w-full p-2 hover:bg-muted rounded">
            <span  className="font-semibold">Institute Type</span>
            {openSections.instituteType ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-2 mt-2">
            {filterOptions.instituteTypes.map((type) => (
              <div key={type} className="flex items-center space-x-2">
                <Checkbox
                  id={`type-${type}`}
                  checked={filters.instituteTypes.includes(type)}
                  onCheckedChange={() =>
                    toggleArrayFilter(
                      "instituteTypes",
                      type,
                      filters.instituteTypes
                    )
                  }
                />
                <Label htmlFor={`type-${type}`} className="text-sm">
                  {type}
                </Label>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>
{/*         
        <Collapsible
          open={openSections.studyMode}
          onOpenChange={() => toggleSection("studyMode")}
        >
          <CollapsibleTrigger className="flex items-center justify-between w-full p-2 hover:bg-muted rounded">
            <span className="font-semibold">Study Mode</span>
            {openSections.studyMode ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-2 mt-2">
            {filterOptions.studyMode.map((mode) => (
              <div key={mode} className="flex items-center space-x-2">
                <Checkbox
                  id={`mode-${mode}`}
                  checked={filters.studyMode.includes(mode)}
                  onCheckedChange={() =>
                    toggleArrayFilter("studyMode", mode, filters.studyMode)
                  }
                />
                <Label htmlFor={`mode-${mode}`} className="text-sm">
                  {mode}
                </Label>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible> */}

        {/* Hostel Filter */}
        <Collapsible
          open={openSections.hostel}
          onOpenChange={() => toggleSection("hostel")}
        >
          <CollapsibleTrigger className="flex items-center justify-between w-full p-2 hover:bg-muted rounded">
            <span className="font-semibold">Hostel Availability</span>
            {openSections.hostel ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-2 mt-2">
            {filterOptions.hostel.map((hostel) => (
              <div key={hostel} className="flex items-center space-x-2">
                <Checkbox
                  id={`hostel-${hostel}`}
                  checked={filters.hostel.includes(hostel)}
                  onCheckedChange={() =>
                    toggleArrayFilter("hostel", hostel, filters.hostel)
                  }
                />
                <Label htmlFor={`hostel-${hostel}`} className="text-sm">
                  {hostel}
                </Label>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>

        {/* Fee Range Filter */}
        <Collapsible
          open={openSections.fees}
          onOpenChange={() => toggleSection("fees")}
        >
          <CollapsibleTrigger className="flex items-center justify-between w-full p-2 hover:bg-muted rounded">
            <span className="font-semibold">Fee Range</span>
            {openSections.fees ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-4 mt-2">
            <div>
              <div className="flex justify-between text-sm text-muted-foreground mb-2">
                <span>₹{(filters.feeRange[0] / 100000).toFixed(1)}L</span>
                <span>₹{(filters.feeRange[1] / 100000).toFixed(1)}L</span>
              </div>
              <Slider
                value={filters.feeRange}
                onValueChange={(value) =>
                  updateFilter("feeRange", value as [number, number])
                }
                max={filterOptions.feeRange[1]}
                min={filterOptions.feeRange[0]}
                step={50000}
                className="w-full"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="min-fee" className="text-xs">
                  Min Fee
                </Label>
                <Input
                  id="min-fee"
                  type="number"
                  placeholder={filterOptions.feeRange[0].toString()}
                  value={filters.feeRange[0]}
                  onChange={(e) =>
                    updateFilter("feeRange", [
                      Number.parseInt(e.target.value) || filterOptions.feeRange[0],
                      filters.feeRange[1],
                    ])
                  }
                  className="h-8"
                />
              </div>
              <div>
                <Label htmlFor="max-fee" className="text-xs">
                  Max Fee
                </Label>
                <Input
                  id="max-fee"
                  type="number"
                  placeholder={filterOptions.feeRange[1].toString()}
                  value={filters.feeRange[1]}
                  onChange={(e) =>
                    updateFilter("feeRange", [
                      filters.feeRange[0],
                      Number.parseInt(e.target.value) || filterOptions.feeRange[1],
                    ])
                  }
                  className="h-8"
                />
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Rating Filter */}
        <Collapsible
          open={openSections.rating}
          onOpenChange={() => toggleSection("rating")}
        >
          <CollapsibleTrigger className="flex items-center justify-between w-full p-2 hover:bg-muted rounded">
            <span className="font-semibold">Minimum Rating</span>
            {openSections.rating ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-2 mt-2">
            <RadioGroup
              value={String(filters.rating)}
              onValueChange={(value) => updateFilter("rating", Number(value))}
            >
              {[4.5, 4.0, 3.5, 3.0, 0].map((rating) => (
                <div key={rating} className="flex items-center space-x-2">
                  <RadioGroupItem value={String(rating)} id={`rating-${rating}`} />
                  <Label htmlFor={`rating-${rating}`} className="text-sm">
                    {rating === 0 ? "Any" : `${rating}+ Stars`}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CollapsibleContent>
        </Collapsible>

        {/* Facilities Filter */}
        <Collapsible
          open={openSections.facilities}
          onOpenChange={() => toggleSection("facilities")}
        >
          <CollapsibleTrigger className="flex items-center justify-between w-full p-2 hover:bg-muted rounded">
            <span className="font-semibold">Facilities</span>
            {openSections.facilities ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-2 mt-2">
            <div className="max-h-48 overflow-y-auto space-y-2">
              {filterOptions.facilities.map((facility) => (
                <div key={facility} className="flex items-center space-x-2">
                  <Checkbox
                    id={`facility-${facility}`}
                    checked={filters.facilities.includes(facility)}
                    onCheckedChange={() =>
                      toggleArrayFilter(
                        "facilities",
                        facility,
                        filters.facilities
                      )
                    }
                  />
                  <Label htmlFor={`facility-${facility}`} className="text-sm">
                    {facility}
                  </Label>
                </div>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Exams Filter */}
        <Collapsible
          open={openSections.exams}
          onOpenChange={() => toggleSection("exams")}
        >
          <CollapsibleTrigger className="flex items-center justify-between w-full p-2 hover:bg-muted rounded">
            <span className="font-semibold">Entrance Exams</span>
            {openSections.exams ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-2 mt-2">
            <div className="max-h-48 overflow-y-auto space-y-2">
              {filterOptions.exams.map((exam) => (
                <div key={exam} className="flex items-center space-x-2">
                  <Checkbox
                    id={`exam-${exam}`}
                    checked={filters.exams.includes(exam)}
                    onCheckedChange={() =>
                      toggleArrayFilter("exams", exam, filters.exams)
                    }
                  />
                  <Label htmlFor={`exam-${exam}`} className="text-sm">
                    {exam}
                  </Label>
                </div>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>
        


         

     
      </div>

      {/* Active Filters */}
      {getActiveFiltersCount() > 0 && (
        <div className="mt-6 pt-4 border-t">
          <h4 className="text-sm font-medium mb-2">
            Active Filters ({getActiveFiltersCount()})
          </h4>
          <div className="flex flex-wrap gap-1">
            {filters.streams.map((stream) => (
              <Badge key={stream} variant="secondary" className="text-xs">
                {stream}
                <span onClick={() => toggleArrayFilter("streams", stream, filters.streams)} className="cursor-pointer">
                  <X className="h-3 w-3 ml-1" />
                </span>
              </Badge>
            ))}
            {filters.states.map((state) => (
              <Badge key={state} variant="secondary" className="text-xs">
                {state}
                <span onClick={() => toggleArrayFilter("states", state, filters.states)} className="cursor-pointer">
                  <X className="h-3 w-3 ml-1" />
                </span>
              </Badge>
            ))}
            {filters.instituteTypes.map((type) => (
              <Badge key={type} variant="secondary" className="text-xs">
                {type}
                <span onClick={() => toggleArrayFilter("instituteTypes", type, filters.instituteTypes)} className="cursor-pointer">
                  <X className="h-3 w-3 ml-1" />
                </span>
              </Badge>
            ))}
            {filters.rating > 0 && (
              <Badge variant="secondary" className="text-xs">
                {filters.rating <5 ? `${filters.rating}+`:`${filters.rating}`} Rating
                <span onClick={() => updateFilter("rating", 0)} className="cursor-pointer">
                  <X
                    className="h-3 w-3 ml-1"
                  />
                </span>
              </Badge>
            )}
            {filters.hostel.map((hostel) => (
              <Badge key={hostel} variant="secondary" className="text-xs">
                {hostel}
                <span onClick={() => toggleArrayFilter("hostel", hostel, filters.hostel)} className="cursor-pointer">
                  <X className="h-3 w-3 ml-1" />
                </span>
              </Badge>
            ))}
            {filters.facilities.map((facility) => (
              <Badge key={facility} variant="secondary" className="text-xs">
                {facility}
                <span onClick={() => toggleArrayFilter("facilities", facility, filters.facilities)} className="cursor-pointer">
                  <X className="h-3 w-3 ml-1" />
                </span>
              </Badge>
            ))}
            {filters.studyMode.map((mode) => (
              <Badge key={mode} variant="secondary" className="text-xs">
                {mode}
                <span onClick={() => toggleArrayFilter("studyMode", mode, filters.studyMode)} className="cursor-pointer">
                  <X className="h-3 w-3 ml-1" />
                </span>
              </Badge>
            ))}
            {filters.exams.map((exam) => (
              <Badge key={exam} variant="secondary" className="text-xs">
                {exam}
                <span onClick={() => toggleArrayFilter("exams", exam, filters.exams)} className="cursor-pointer">
                  <X className="h-3 w-3 ml-1" />
                </span>
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
