"use client";

import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, Search, Undo } from "lucide-react";
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
import { getCoursesFilters, CourseFilterOptions as ApiCourseFilterOptions } from "@/lib/api/data/courses";

export interface CourseFilterOptions {
  search: string;
  duration: [number, number];
  modes: string[];
  levels: string[];
  feeRange: [number, number];
}

interface FilterSidebarProps {
  filters: CourseFilterOptions;
  onFiltersChange: (filters: CourseFilterOptions) => void;
}

export function FilterSidebar({
  filters,
  onFiltersChange,
}: FilterSidebarProps) {
  const [openSections, setOpenSections] = useState({
    duration: true,
    mode: true,
    level: true,
    fees: true,
  });
  const [apiFilters, setApiFilters] = useState<ApiCourseFilterOptions | null>(null);

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const response = await getCoursesFilters();
        if (response.success) {
          setApiFilters(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch course filters:", error);
      }
    };
    fetchFilters();
  }, []);

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const updateFilter = <K extends keyof CourseFilterOptions>(
    key: K,
    value: CourseFilterOptions[K]
  ) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const toggleArrayFilter = <K extends keyof CourseFilterOptions>(
    key: K,
    value: string,
    currentArray: string[]
  ) => {
    const newArray = currentArray.includes(value)
      ? currentArray.filter((item) => item !== value)
      : [...currentArray, value];
    updateFilter(key, newArray as CourseFilterOptions[K]);
  };

  const clearAllFilters = () => {
    onFiltersChange({
      search: "",
      duration: [apiFilters?.duration.min ?? 0, apiFilters?.duration.max ?? 99],
      modes: [],
      levels: [],
      feeRange: [apiFilters?.feeRange.min ?? 0, apiFilters?.feeRange.max ?? 0],
    });
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.search) count++;
    if (filters.duration[0] !== (apiFilters?.duration.min ?? 0) || filters.duration[1] !== (apiFilters?.duration.max ?? 0)) count++;
    if (filters.modes.length > 0) count++;
    if (filters.levels.length > 0) count++;
    if (filters.feeRange[0] !== (apiFilters?.feeRange.min ?? 0) || filters.feeRange[1] !== (apiFilters?.feeRange.max ?? 0)) count++;
    return count;
  };

  return (
    <div className="bg-white  p-4 h-auto lg:h-fit sticky lg:top-36 ">
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
        {/* Duration Filter */}
        <Collapsible
          open={openSections.duration}
          onOpenChange={() => toggleSection("duration")}
        >
          <CollapsibleTrigger className="flex items-center justify-between w-full p-2 hover:bg-muted rounded">
            <span className="font-semibold">Duration (years)</span>
            {openSections.duration ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-4 mt-2">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>{filters.duration[0]} years</span>
              <span>{filters.duration[1]} years</span>
            </div>
            <Slider
              value={filters.duration}
              onValueChange={(value) =>
                updateFilter("duration", value as [number, number])
              }
              max={apiFilters?.duration.max ?? 0}
              min={apiFilters?.duration.min ?? 0}
              step={1}
              className="w-full"
            />
          </CollapsibleContent>
        </Collapsible>

        {/* Mode Filter */}
        <Collapsible
          open={openSections.mode}
          onOpenChange={() => toggleSection("mode")}
        >
          <CollapsibleTrigger className="flex items-center justify-between w-full p-2 hover:bg-muted rounded">
            <span className="font-semibold">Mode</span>
            {openSections.mode ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-2 mt-2">
            {(apiFilters?.modes ?? []).map((mode) => (
              <div key={mode} className="flex items-center space-x-2">
                <Checkbox
                  id={`mode-${mode}`}
                  checked={filters.modes.includes(mode)}
                  onCheckedChange={() =>
                    toggleArrayFilter("modes", mode, filters.modes)
                  }
                />
                <Label htmlFor={`mode-${mode}`} className="text-sm">
                  {mode}
                </Label>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>
        

        {/* Level Filter */}
        <Collapsible
          open={openSections.level}
          onOpenChange={() => toggleSection("level")}
        >
          <CollapsibleTrigger className="flex items-center justify-between w-full p-2 hover:bg-muted rounded">
            <span className="font-semibold">Level</span>
            {openSections.level ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-2 mt-2">
            {(apiFilters?.levels ?? []).map((level) => (
              <div key={level} className="flex items-center space-x-2">
                <Checkbox
                  id={`level-${level}`}
                  checked={filters.levels.includes(level)}
                  onCheckedChange={() =>
                    toggleArrayFilter("levels", level, filters.levels)
                  }
                />
                <Label htmlFor={`level-${level}`} className="text-sm">
                  {level}
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
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>₹{((filters.feeRange[0]) / 100000).toFixed(1)}L</span>
              <span>₹{((filters.feeRange[1]) / 100000).toFixed(1)}L</span>
            </div>
            <Slider
              value={filters.feeRange}
              onValueChange={(value) =>
                updateFilter("feeRange", value as [number, number])
              }
              max={apiFilters?.feeRange.max ?? 0}
              min={apiFilters?.feeRange.min ?? 0}
              step={50000}
              className="w-full"
            />
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
}
