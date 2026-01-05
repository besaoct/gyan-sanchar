// components/home/CollegeCardWithGoogleRating.tsx
'use client'

import { Card } from "@/components/ui/card"
import { Star } from "lucide-react"
import { College } from "@/lib/api/data/colleges"
import { useGooglePlaceReviews } from "@/hooks/use-google-place-reviews"
import { Skeleton } from "@/components/ui/skeleton"
import Image from "next/image"
import { useRouter } from "next/navigation"

interface CollegeCardWithGoogleRatingProps {
  college: College;
}

export default function CollegeCardWithGoogleRating({ college }: CollegeCardWithGoogleRatingProps) {
  const query = `${college.name}, ${college.location.city}, ${college.location.state}`;
  const { data, loading, error } = useGooglePlaceReviews(query);

  const router = useRouter();

  const handleClick = () => {
    router.push(`/college/${college.slug}`);
  };

  return (
    <Card onClick={handleClick} className="bg-white text-black p-4 rounded-lg flex flex-row w-full items-start gap-2 cursor-pointer">
      <Image src={college.image} alt={`${college.name} logo`} width={48} height={48} className="w-12 h-12 rounded" />
      <div className="w-full">
        <h4 className="font-semibold line-clamp-1">{college.name}</h4>
        <p className="text-sm text-gray-600 line-clamp-1">{college.location.city}, {college.location.state}</p>
        <div className="flex items-center gap-1 mt-1">
            {loading ? (
                <Skeleton className="h-4 w-24" />
            ) : data ? (
                <>
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-xs font-semibold">
                        {data.rating} ({data.user_ratings_total} reviews)
                    </span>
                </>
            ) : (
              <span className="text-xs text-gray-500">{error || "Not available"}</span>
            )}
        </div>
      </div>
    </Card>
  )
}
