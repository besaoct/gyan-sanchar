
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock,  BarChart, IndianRupee } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import type { CourseDetails } from "@/lib/api/data/courses";
import { useRouter } from "next/navigation";

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

    // Prevent card navigation when clicking inner actions
  const stopCardNavigation = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  const router = useRouter();

  const correctHeroImageLink = course.hero_image?.replace("/storage", "")

  
  return (
    <Card className="overflow-hidden shadow-none p-0 pb-2 cursor-pointer rounded-none border-x-0 border-t-0 border-b last:border-0"
          onClick={() => router.push(`/course/${course.slug}`)}
    >
      <CardContent className="p-0 pb-4">
        <div className="grid grid-cols-1 md:flex gap-4">
          <div className="relative w-full md:min-w-[320px] md:max-w-[320px] aspect-video  ">
            <Image
              src={correctHeroImageLink || "/course/demo.jpg"}
              alt={course.course_name}
              fill
              className="w-auto rounded-lg"
            />
          </div>
          <div className="md:col-span-2 flex flex-col gap-3">
            <h3 className="text-xl font-bold text-foreground line-clamp-1">{course.course_name}</h3>
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
                <span>{formatFees(course.fees.min, course.fees.max)}</span>
              </div>
              <div className="flex items-center gap-1 ">
                <BarChart className="h-4 w-4 text-primary" />
                <span>{course.basic_info.level}</span>
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground line-clamp-2 md:line-clamp-1 xl:line-clamp-2">{course.short_description}</p>
   
            <div className="flex flex-wrap gap-2 mt-auto">
              <Link href={`/course/${course.slug}`}
                onClick={stopCardNavigation}>
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
