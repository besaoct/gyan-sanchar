'use client'

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function ApplicationFormSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 text-center">
        <Badge className="bg-blue-100 text-blue-800 mb-4 p-2 whitespace-normal">
          #1 India's Largest Common Application Form For College Admissions
        </Badge>
        <h2 className="text-4xl font-bold mb-2">
          <span className="text-orange-500">2000+</span> Colleges,{" "}
          <span className="font-normal">1 Application Form</span>
        </h2>
        <p className="text-gray-600 mb-8">Applying to your dream colleges made easy!</p>
        <Button className=" text-white px-8 py-3">Start Your Application</Button>
      </div>
    </section>
  )
}
