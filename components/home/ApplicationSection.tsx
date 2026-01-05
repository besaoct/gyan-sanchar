'use client'

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ApplicationSection as ApplicationSectionType } from "@/lib/api/data/home";
import Link from "next/link";

interface ApplicationSectionProps {
  application_sections: ApplicationSectionType[];
}

export default function ApplicationSection({ application_sections }: ApplicationSectionProps) {
  if (!application_sections || application_sections.length === 0) {
    return null;
  }

  const section = application_sections[0];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 text-center">
        <Badge className="bg-blue-100 text-blue-800 mb-4 p-2 whitespace-normal">
          {section.subheading}
        </Badge>
        <h2 className="text-4xl font-bold mb-2" dangerouslySetInnerHTML={{ __html: section.heading }}>
        </h2>
        <p className="text-gray-600 mb-8">{section.description}</p>
        <Button className=" text-white px-8 py-3">
          <Link href={'/admission'}>
            Start Your Application
          </Link>
        </Button>
      </div>
    </section>
  )
}
