"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Star, Heart, Share2, ChevronUp, ChevronDown, Plus } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip"
import { useState } from "react"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { CollegeImageCarousel } from "./college-image-carousel"
import { College } from "@/lib/colleges-data"


function formatFees(min: number, max: number) {
  const fmt = (n: number) => (n >= 100000 ? `${(n / 100000).toFixed(1)}L` : `${(n / 1000).toFixed(0)}K`)
  return `₹${fmt(min)} - ${fmt(max)}`
}

export function CollegeCard({ college, className }: { college: College; className?: string }) {

  const [descOpen, setDescOpen] = useState(false)


  return (

       <Card
      className={cn(
        "w-full bg-card py-3 gap-2",
        "hover:shadow-sm shadow-xs transition-shadow duration-300",
        className,
      )}
    >
      <div className="px-4 py-2">
        <div className="flex items-start justify-between gap-1">
             <Link href={`/college/${college.id}`} className={cn("block", className)}>
          <h3 className="text-balance hover:text-primary text-base font-bold text-foreground md:text-lg">{college.name}</h3>
             </Link>
          <div className="flex items-center gap-1">
            <Button variant="secondary" size="icon" className="h-7 w-7 p-0" aria-label="Add to favorites">
              <Heart className="h-4 w-4" />
            </Button>
            <Button variant="secondary" size="icon" className="h-7 w-7 p-0" aria-label="Share college">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div 
        className={cn(
          "flex w-full items-stretch gap-4 px-3 md:px-4 lg:px-5 pb-2",
          "flex-row",
        )}
      >
        <div className="w-28 self-start mb-2 md:mb-0 md:w-48 md:flex-shrink-0 mx-5">
          <Dialog >
            <DialogTrigger asChild>
              <div className="relative h-20 w-full overflow-hidden rounded-lg sm:h-24 md:h-28 md:w-48 cursor-pointer">
                <Image
                  src={"https://media.collegedekho.com/media/img/institute/crawled_images/c2.jpg?w=350&h=350"}
                  alt={`${college.name} campus image`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 25vw, (max-width: 1024px) 192px, 192px"
                />
              </div>
            </DialogTrigger>
            <DialogContent className="max-w-5xl w-[80%] ">
              <CollegeImageCarousel images={college.gallery} collegeName={college.name} />
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex min-w-0 flex-1 flex-col justify-center gap-2">
          <TooltipProvider>
            {/* Row 1: nirf, type, streams, rating, location in one row */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              {college.ranking.nirf ? (
                <Badge variant="outline" className="text-xs text-white md:text-xs bg-green-600">
                  NIRF #{college.ranking.nirf}
                </Badge>
              ) : null}
              <Badge variant="outline" className="text-xs md:text-xs">
                {college.type}
              </Badge>

              {/* Streams: show one + +N tooltip */}
              {college.streams[0] && (
                <Badge variant="secondary" className="text-xs md:text-xs">
                  {college.streams[0]}
                </Badge>
              )}
              {college.streams.length > 1 && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      type="button"
                      className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-foreground hover:bg-muted/80"
                      aria-label="Show other streams"
                    >
                      +{college.streams.length - 1}
                    </button>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs text-xs">{college.streams.slice(1).join(", ")}</TooltipContent>
                </Tooltip>
              )}

              {/* Rating */}
              <span className="flex items-center gap-1">
                <Star className="h-4 w-4 text-orange-300" aria-hidden="true" />
                <span className="font-semibold text-foreground">{college.rating.toFixed(1)}</span>
                <span className="text-muted-foreground">({college.reviews} reviews)</span>
              </span>

              {/* Location */}
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" aria-hidden="true" />
                {college.location.city}, {college.location.state}
              </span>
            </div>

            {/* Row 2: fee (+link), avg pkg, exams (show1 + chevron tooltip), placements */}
            <div className="hidden sm:flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground md:text-sm">
              {/* Fees + link */}
              <span className="flex items-center gap-2">
                <span className="font-semibold text-foreground">Fees:</span>
                <span className="text-foreground">{formatFees(college.fees.min, college.fees.max)}</span>
                <Link href={`/college/${college.id}#fees`} className="text-primary underline-offset-2 hover:underline">
                  Fee details
                </Link>
              </span>

              {/* Avg Package */}
              <span className="flex items-center gap-2">
                <span className="font-semibold text-foreground">Avg:</span>
                <span className="text-foreground">₹{(college.placement.averagePackage / 100000).toFixed(1)}L</span>
              </span>

              {/* Exams: show one + chevron tooltip for others */}
              <span className="flex items-center gap-2">
                <span className="font-semibold text-foreground">Exams:</span>
                <span className="text-foreground">{college.admissionProcess.exams[0]}</span>
                {college.admissionProcess.exams.length > 1 && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        type="button"
                        aria-label="Show all exams"
                        className="inline-flex gap-0 px-1 py-1  items-center justify-center text-primary font-semibold text-sm"
                      >
                       ... <Plus className="size-2.5" />
                       {college.admissionProcess.exams.length - 1}
                      </button>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs text-xs">
                      {college.admissionProcess.exams.slice(1).join(", ")}
                    </TooltipContent>
                  </Tooltip>
                )}
              </span>

              {/* Placement rate */}
              <span className="flex items-center gap-2">
                <span className="font-semibold text-foreground">Placement:</span>
                <span className="text-foreground">{college.placement.placementRate}%</span>
              </span>
            </div>
          </TooltipProvider>

          {/* One-liner description with chevron */}
          <div className="hidden sm:flex items-start gap-2">
            <div className={cn("text-pretty text-xs text-muted-foreground md:text-sm", descOpen ? "" : "line-clamp-1")}>
              {college.description}
            </div>
            <button 
              type="button"
              className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full border hover:bg-primary bg-primary/80 text-white"
              aria-label={descOpen ? "Collapse description" : "Expand description"}
              onClick={() => setDescOpen((v) => !v)}
            >
              {descOpen ? <ChevronUp className="h-4 min-w-4" /> : <ChevronDown className="h-4 min-w-4" />}
            </button>
          </div>
        </div>
      </div>

      <div className="px-4">
           <div className="sm:hidden flex items-start gap-2 pb-2">
            <div className={cn("text-pretty text-xs text-muted-foreground md:text-sm", descOpen ? "" : "line-clamp-1")}>
              {college.description}
            </div>
            <button 
              type="button"
              className="mt-0.5 inline-flex h-4 w-4 items-center justify-center rounded-full border hover:bg-primary bg-primary/80 text-white"
              aria-label={descOpen ? "Collapse description" : "Expand description"}
              onClick={() => setDescOpen((v) => !v)}
            >
              {descOpen ? <ChevronUp className="h-2 min-w-2" /> : <ChevronDown className="h-2 min-w-2" />}
            </button>
          </div>

          <div className="flex sm:hidden flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground md:text-sm">
              {/* Fees + link */}
              <span className="flex items-center gap-2">
                <span className="font-semibold text-foreground">Fees:</span>
                <span className="text-foreground">{formatFees(college.fees.min, college.fees.max)}</span>
                <Link href={`/college/${college.id}#fees`} className="text-primary underline-offset-2 hover:underline">
                  Fee details
                </Link>
              </span>

              {/* Avg Package */}
              <span className="flex items-center gap-2">
                <span className="font-semibold text-foreground">Avg:</span>
                <span className="text-foreground">₹{(college.placement.averagePackage / 100000).toFixed(1)}L</span>
              </span>

              {/* Exams: show one + chevron tooltip for others */}
              <span className="flex items-center gap-2">
                <span className="font-semibold text-foreground">Exams:</span>
                <span className="text-foreground">{college.admissionProcess.exams[0]}</span>
                {college.admissionProcess.exams.length > 1 && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        type="button"
                        aria-label="Show all exams"
                        className="inline-flex gap-0 px-1 py-1  items-center justify-center text-primary font-semibold text-sm"
                      >
                       ... <Plus className="size-2.5" />
                       {college.admissionProcess.exams.length - 1}
                      </button>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs text-xs">
                      {college.admissionProcess.exams.slice(1).join(", ")}
                    </TooltipContent>
                  </Tooltip>
                )}
              </span>

              {/* Placement rate */}
              <span className="flex items-center gap-2">
                <span className="font-semibold text-foreground">Placement:</span>
                <span className="text-foreground">{college.placement.placementRate}%</span>
              </span>
            </div>


      </div>


     <hr className="md:hidden" />    
<div className="w-full md:hidden px-4 max-w-sm">
         <nav aria-label="Quick links"
       className="flex flex-wrap  items-center gap-x-3 gap-y-1 text-xs md:text-sm text-primary font-medium "
                >
                  <Link href={`/college/${college.id}#placement`} className="hover:underline flex items-center gap-1">
                    <span className="size-1 bg-gray-300 rounded-full"></span>
                    Placement
                  </Link>
                  <Link href={`/college/${college.id}#admission`} className="hover:underline flex items-center gap-1">
                    <span className="size-1 bg-gray-300 rounded-full"></span>
                    Admission
                  </Link>
      
                  <Link href={`/college/${college.id}#ranking`} className="hover:underline flex items-center gap-1">
                    <span className="size-1 bg-gray-300 rounded-full"></span>
                    Ranking
                  </Link>
                </nav>
</div>

       <hr />
      {/* Actions: buttons and quick links */}
      <div className="py-2 flex flex-wrap items-center justify-between gap-4 px-4">
        
       <nav aria-label="Quick links"
       className="hidden md:flex flex-wrap items-center gap-x-3 gap-y-1 text-xs md:text-sm text-primary font-medium "
                >
                  <Link href={`/college/${college.id}#placement`} className="hover:underline flex items-center gap-1">
                    <span className="size-1 bg-gray-300 rounded-full"></span>
                    Placement
                  </Link>
                  <Link href={`/college/${college.id}#admission`} className="hover:underline flex items-center gap-1">
                    <span className="size-1 bg-gray-300 rounded-full"></span>
                    Admission
                  </Link>
        
                  <Link href={`/college/${college.id}#ranking`} className="hover:underline flex items-center gap-1">
                    <span className="size-1 bg-gray-300 rounded-full"></span>
                    Ranking
                  </Link>
                </nav>

        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" className="text-xs md:text-sm bg-accent border border-primary text-primary hover:bg-accent/50">
            Compare
          </Button>
          <Button variant="default" className="text-xs md:text-sm bg-orange-500 hover:bg-orange-500/90">
            Brochure
          </Button>
          
          <Button className="text-xs md:text-sm">Apply Now</Button>
          
        </div>

      </div>
    </Card>

  )
}
