"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Users, Heart, Share2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import type { College } from "@/lib/colleges-data";

export function CollegeCard({ college }: { college: College }) {
  const formatFees = (min: number, max: number) => {
    const formatAmount = (amount: number) => {
      if (amount >= 100000) {
        return `${(amount / 100000).toFixed(1)}L`;
      }
      return `${(amount / 1000).toFixed(0)}K`;
    };
    return `₹${formatAmount(min)} - ${formatAmount(max)}`;
  };

  return (
    <Card className="overflow-hidden hover:shadow-none shadow-none transition-shadow duration-300 border-l-4 border-l-orange-500 py-0">
      <CardContent className="p-3 sm:p-4 lg:p-6">
        <div className="flex flex-col gap-3 sm:gap-4">
          {/* Row 1: Image and Basic Info */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4">
            <div className="relative h-24 sm:h-32 lg:h-40">
              <Image
                src={college.image ? `/college/${college.image}` : "/placeholder.svg"}
                alt={college.name}
                fill
                className="object-cover rounded-lg"
                sizes="(max-width: 640px) 33vw, (max-width: 1024px) 25vw, 20vw"
              />
              <div className="absolute top-1 right-1 sm:top-2 sm:right-2 flex gap-1 sm:gap-2">
                <Button size="sm" variant="secondary" className="h-6 w-6 sm:h-8 sm:w-8 p-0">
                  <Heart className="h-3 w-3 sm:h-4 sm:w-4" aria-label="Add to favorites" />
                </Button>
                <Button size="sm" variant="secondary" className="h-6 w-6 sm:h-8 sm:w-8 p-0">
                  <Share2 className="h-3 w-3 sm:h-4 sm:w-4" aria-label="Share college" />
                </Button>
              </div>
            </div>
            <div className="col-span-2 flex flex-col gap-1 sm:gap-2">
              <h3 className="text-base sm:text-lg lg:text-xl font-bold text-foreground">
                {college.name}
              </h3>
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-xs sm:text-sm lg:text-base text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3 sm:h-4 sm:w-4" aria-hidden="true" />
                  {college.location.city}, {college.location.state}
                </div>
                <Badge variant="outline" className="text-xs sm:text-sm lg:text-base">
                  {college.type}
                </Badge>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                <div className="flex items-center gap-1 text-xs sm:text-sm lg:text-base">
                  <Star className="h-3 w-3 sm:h-4 sm:w-4 fill-yellow-400 text-yellow-400" aria-hidden="true" />
                  <span className="font-semibold">{college.rating}</span>
                  <span className="text-muted-foreground">
                    ({college.reviews} Reviews)
                  </span>
                </div>
        
              </div>
            </div>
          </div>

          {/* Row 2: Other Details */}
          <div className="flex flex-col gap-3 sm:gap-4">
            
            <p className="text-xs sm:text-sm lg:text-base text-muted-foreground line-clamp-2">
              {college.description}
            </p>
            <div className="flex flex-wrap gap-1 sm:gap-2">
                               <div>
                 {college.ranking.nirf && (
                  <span className="bg-green-100 text-green-800 hover:bg-green-100 text-xs sm:text-sm lg:text-base px-2 py-1 rounded">
                    #{college.ranking.nirf} NIRF
                  </span>
                )}
              </div>
              {college.streams.map((stream) => (
                <Badge key={stream} variant="secondary" className="text-xs sm:text-sm lg:text-base">
                  {stream}
                </Badge>
              ))}
     
            </div>
           
            <div className="flex flex-wrap gap-2 sm:gap-6 text-xs sm:text-sm lg:text-base text-muted-foreground items-start ">
              <div className="flex items-center gap-1">
                <Users className="h-3 w-3 sm:h-4 sm:w-4" aria-hidden="true" />
                <span>
                  {college.campusLife.studentStrength.toLocaleString()} Students
                </span>
              </div>
              <div>
                <span className="font-semibold">Established:</span> {college.established}
              </div>
         
            </div>
            <div className="bg-muted rounded-lg px-2 py-1 sm:px-3 sm:py-2 w-fit">
              <div className="text-base sm:text-lg lg:text-xl font-bold text-orange-500">
                {formatFees(college.fees.min, college.fees.max)}
              </div>
            </div>
            <div className="flex flex-wrap gap-2 text-xs sm:text-sm lg:text-base text-muted-foreground">
              <div>
                <span className="font-semibold">Avg Package:</span> ₹
                {(college.placement.averagePackage / 100000).toFixed(1)}L
              </div>
              <div>
                <span className="font-semibold">Placement Rate:</span>{" "}
                {college.placement.placementRate}%
              </div>
              <div>
                <span className="font-semibold">Exams:</span>{" "}
                {college.admissionProcess.exams.slice(0, 2).join(", ")}
                {college.admissionProcess.exams.length > 2 && "..."}
              </div>
            </div>
            <div className="flex flex-wrap gap-2 sm:gap-4">
              <Link href={`/college/${college.id}`}>
                <Button className="bg-orange-500 hover:bg-orange-400 text-white text-xs sm:text-sm lg:text-base">
                  View Details
                </Button>
              </Link>
              <Button variant="outline" className="bg-transparent text-xs sm:text-sm lg:text-base">
                Download Brochure
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}