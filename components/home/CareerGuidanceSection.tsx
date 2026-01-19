'use client'

import { Button } from "@/components/ui/button"
import { Recommendations } from "@/lib/api/data/home"
import { useRouter } from "next/navigation";

export default function CareerGuidanceSection({recommendations}:{recommendations: Recommendations[]}) {
    
  const router = useRouter();
  if (!recommendations|| recommendations.length === 0) {
    return null;
  }

  const careerGuidance = recommendations[0]

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between flex-wrap">
          <div className="md:flex-1 ">
            <h2 className="text-3xl font-bold mb-4">{ careerGuidance.title || "Confused about the best career choice for you?"}</h2>
            <p className="text-gray-600 mb-6 max-w-lg">
              {careerGuidance.description ||  "Discover your path with Career Compass, our personalized career recommendation tool. Get insights on skills, personality, and interests for career advice and guidance designed just for you."}
            </p>
          </div>
          <div className="flex-1 flex justify-end">
            <Button onClick={()=>router.push(careerGuidance.button_link || "/#")} className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3">
             { careerGuidance.button_text || "Get Career Recommendations"}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
