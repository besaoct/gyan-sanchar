'use client'

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Star } from "lucide-react"

const colleges = [
  {
    name: "IIT Bombay",
    location: "Mumbai, Maharashtra",
    ranking: "#1 in India",
    logo: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80"
  },
  {
    name: "Delhi University",
    location: "New Delhi, Delhi",
    ranking: "#1 in Arts & Commerce",
    logo: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80"
  },
  {
    name: "BITS Pilani",
    location: "Pilani, Rajasthan",
    ranking: "Top 5 Pvt. Engineering",
    logo: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80"
  },
    {
    name: "VIT Vellore",
    location: "Vellore, Tamil Nadu",
    ranking: "Top 10 Pvt. Engineering",
    logo: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80"
  }
];

export default function TopRankedCollegesSection() {
  return (
    <section className="py-12 md:py-16 bg-gradient-to-r from-orange-400 to-orange-500 text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-8">
          <div className="flex-1 order-2 lg:order-1 w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              {colleges.map((college, index) => (
                <Card key={index} className="bg-white text-black p-4 rounded-lg flex-row w-full items-start gap-2">
                  <img src={college.logo} alt={`${college.name} logo`} className="w-12 h-12" />
                  <div className="w-full">
                    <h4 className="font-semibold">{college.name}</h4>
                    <p className="text-sm text-gray-600">{college.location}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-xs font-semibold">{college.ranking}</span>
                    </div>
                  </div>
                </Card>
              ))}
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