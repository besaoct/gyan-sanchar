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
import { states, streams, exams, facilities } from "@/lib/colleges-data";
import type { FilterOptions } from "@/lib/types";

interface FilterSidebarProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
}

export function FilterSidebar({
  filters,
  onFiltersChange,
}: FilterSidebarProps) {
  const [openSections, setOpenSections] = useState({
    degree: true,
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
      instituteTypes: [],
      feeRange: [0, 5000000],
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
      (filters.feeRange[0] > 0 || filters.feeRange[1] < 5000000 ? 1 : 0)
    );
  };

  return (
    <div className="bg-accent/50 border rounded-lg p-4 h-fit sticky top-36">
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
            // onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
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
            {streams.map((stream) => (
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
              {states.map((state) => (
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
            <span className="font-semibold">Institute Type</span>
            {openSections.instituteType ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-2 mt-2">
            {["Government", "Private", "Public"].map((type) => (
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

        {/* Study Mode Filter */}
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
            {["Full-time", "Part-time", "Distance / Online"].map((mode) => (
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
        </Collapsible>

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
            {["Boys Hostel", "Girls Hostel"].map((hostel) => (
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
                max={5000000}
                min={0}
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
                  placeholder="0"
                  value={filters.feeRange[0]}
                  onChange={(e) =>
                    updateFilter("feeRange", [
                      Number.parseInt(e.target.value) || 0,
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
                  placeholder="5000000"
                  value={filters.feeRange[1]}
                  onChange={(e) =>
                    updateFilter("feeRange", [
                      filters.feeRange[0],
                      Number.parseInt(e.target.value) || 5000000,
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
            {[4.5, 4.0, 3.5, 3.0].map((rating) => (
              <div key={rating} className="flex items-center space-x-2">
                <Checkbox
                  id={`rating-${rating}`}
                  checked={filters.rating === rating}
                  onCheckedChange={(checked) =>
                    updateFilter("rating", checked ? rating : 0)
                  }
                />
                <Label htmlFor={`rating-${rating}`} className="text-sm">
                  {rating}+ Stars
                </Label>
              </div>
            ))}
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
              {facilities.map((facility) => (
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
              {exams.map((exam) => (
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
                <X
                  className="h-3 w-3 ml-1 cursor-pointer"
                  onClick={() =>
                    toggleArrayFilter("streams", stream, filters.streams)
                  }
                />
              </Badge>
            ))}
            {filters.states.map((state) => (
              <Badge key={state} variant="secondary" className="text-xs">
                {state}
                <X
                  className="h-3 w-3 ml-1 cursor-pointer"
                  onClick={() =>
                    toggleArrayFilter("states", state, filters.states)
                  }
                />
              </Badge>
            ))}
            {filters.instituteTypes.map((type) => (
              <Badge key={type} variant="secondary" className="text-xs">
                {type}
                <X
                  className="h-3 w-3 ml-1 cursor-pointer"
                  onClick={() =>
                    toggleArrayFilter(
                      "instituteTypes",
                      type,
                      filters.instituteTypes
                    )
                  }
                />
              </Badge>
            ))}
            {filters.rating > 0 && (
              <Badge variant="secondary" className="text-xs">
                {filters.rating}+ Rating
                <X
                  className="h-3 w-3 ml-1 cursor-pointer"
                  onClick={() => updateFilter("rating", 0)}
                />
              </Badge>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
