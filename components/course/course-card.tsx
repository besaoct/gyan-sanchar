
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock,  BarChart, IndianRupee } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import type { CourseDetails } from "@/lib/api/data/courses";

export function CourseCard({ course }: { course: CourseDetails }) {
  const formatFees = (min: number, max: number) => {
    const formatAmount = (amount: number) => {
      if (amount >= 100000) {
        return `${(amount / 100000).toFixed(1)}L`;
      }
      return `${(amount / 1000).toFixed(0)}K`;
    };
    return `${formatAmount(min)} - ${formatAmount(max)}`;
  };

  return (
    <Card className="overflow-hidden shadow-none p-0">
      <CardContent className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative h-48 md:h-full">
            <Image
              src={course.hero_image || "/course/demo.jpg"}
              alt={course.course_name}
              fill
              className="object-cover rounded-lg"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <div className="md:col-span-2 flex flex-col gap-3">
            <h3 className="text-xl font-bold text-foreground">{course.course_name}</h3>
                     <div className="flex flex-wrap gap-2">
              {course.basic_info.mode.map((mode) => (
                <Badge key={mode} variant="secondary">
                  {mode}
                </Badge>
              ))}
            </div>
            <div className="flex flex-wrap gap-2 items-center text-sm text-muted-foreground">
              <div className="flex items-center gap-1 ">
                <Clock className="h-4 w-4  text-primary" />
                <span>{course.basic_info.duration} years</span>
              </div>
              <div className="flex items-center gap-1 ">
                <IndianRupee className="h-4 w-4 text-primary" />
                <span>{formatFees(course.min_fees, course.max_fees)}</span>
              </div>
              <div className="flex items-center gap-1 ">
                <BarChart className="h-4 w-4 text-primary" />
                <span>{course.basic_info.level}</span>
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground line-clamp-2">{course.short_description}</p>
   
            <div className="flex flex-wrap gap-2 mt-auto">
              <Link href={`/course/${course.slug}`}>
                <Button className="bg-primary hover:bg-primary/90 text-white">
                  View Details
                </Button>
              </Link>
              <Button variant="outline" className="bg-transparent">
                Download Syllabus
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
