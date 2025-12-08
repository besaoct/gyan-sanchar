
"use client";

import { Skeleton } from "@/components/ui/skeleton";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";

export function FilterSidebarSkeleton() {
  return (
    <div className="bg-white p-4 h-auto lg:h-fit sticky lg:top-36">
      <div className="flex items-center justify-between mb-8 lg:mb-0">
        <h3 className="sr-only">Filters</h3>
      </div>

      <div className="mb-4 max-w-xs lg:mt-0">
        <Skeleton className="h-10 w-full" />
      </div>

      <div className="space-y-4">
        {/* Duration Filter */}
        <Collapsible open={true}>
          <CollapsibleTrigger className="flex items-center justify-between w-full p-2 hover:bg-muted rounded">
            <span className="font-semibold">Duration (years)</span>
            <ChevronDown className="h-4 w-4" />
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-4 mt-2">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-16" />
            </div>
            <Skeleton className="h-5 w-full" />
          </CollapsibleContent>
        </Collapsible>

        {/* Mode Filter */}
        <Collapsible open={true}>
          <CollapsibleTrigger className="flex items-center justify-between w-full p-2 hover:bg-muted rounded">
            <span className="font-semibold">Mode</span>
            <ChevronDown className="h-4 w-4" />
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-2 mt-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center space-x-2">
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-24" />
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>

        {/* Level Filter */}
        <Collapsible open={true}>
          <CollapsibleTrigger className="flex items-center justify-between w-full p-2 hover:bg-muted rounded">
            <span className="font-semibold">Level</span>
            <ChevronDown className="h-4 w-4" />
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-2 mt-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center space-x-2">
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-20" />
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>

        {/* Fee Range Filter */}
        <Collapsible open={true}>
          <CollapsibleTrigger className="flex items-center justify-between w-full p-2 hover:bg-muted rounded">
            <span className="font-semibold">Fee Range</span>
            <ChevronDown className="h-4 w-4" />
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-4 mt-2">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-16" />
            </div>
            <Skeleton className="h-5 w-full" />
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
}
