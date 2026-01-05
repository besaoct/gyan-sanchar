'use client'

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { College, getTopColleges } from "@/lib/api/data/colleges"
import { Skeleton } from "@/components/ui/skeleton"
import CollegeCardWithGoogleRating from "./CollegeCardWithGoogleRating"

function CollegeCardSkeleton() {
  return (
    <Card className="bg-white text-black p-4 rounded-lg flex flex-row w-full items-start gap-2">
      <Skeleton className="w-12 h-12 rounded-full" />
      <div className="w-full">
        <Skeleton className="h-5 w-3/4 mb-2" />
        <Skeleton className="h-4 w-1/2 mb-2" />
        <Skeleton className="h-4 w-1/3" />
      </div>
    </Card>
  )
}

export default function TopRankedCollegesSection() {
  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopColleges = async () => {
      try {
        const response = await getTopColleges();
        if (response.success && response.data) {
          setColleges(response.data.slice(0, 4)); // Take first 4
        }
      } catch (error) {
        console.error("Failed to fetch top colleges:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTopColleges();
  }, []);

  return (
    <section className="py-12 md:py-16 bg-gradient-to-r from-orange-400 to-orange-500 text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-8">
          <div className="flex-1 order-2 lg:order-1 w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              {loading ? (
                <>
                  <CollegeCardSkeleton />
                  <CollegeCardSkeleton />
                  <CollegeCardSkeleton />
                  <CollegeCardSkeleton />
                </>
              ) : (
                colleges.map((college) => (
                  <CollegeCardWithGoogleRating key={college.id} college={college} />
                ))
              )}
            </div>
          </div>

          <div className="flex-1 text-start order-1 lg:order-2">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8">
              Explore Top Ranked
              <br />
              <span className="text-4xl md:text-5xl lg:text-6xl">
                Colleges in India
              </span>
            </h2>
            <p className="mb-8">Get detailed information about top colleges, their courses, fees, and admission process.</p>
            <Button className=" text-white px-6 md:px-8 py-3">
              View All Colleges
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}