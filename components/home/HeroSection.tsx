'use client'

import { BookConsultationForm } from "@/components/common/book-consultation-form";
import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"
import Link from "next/link";

export default function HeroSection() {
  return (
    <section
      className="relative text-white overflow-hidden bg-[#04377a]"
      style={{
        minHeight: "500px",
      }}
    >
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="flex-1 max-w-2xl text-center lg:text-left">
            <h1
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight"
    
            >
              Right Guidance,
              <br />
              Bright Future
            </h1>
            <p className="text-lg md:text-xl mb-8 opacity-90" >
              Get expert advice and personalized guidance to find the right college,
              <br className="hidden md:block" />
              building a better future for your career at a time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center lg:justify-start">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white px-6 md:px-8 py-3 text-base md:text-lg">
              <Link href="/colleges" className="block w-full">
                Find Your College
              </Link>
              </Button>
              <BookConsultationForm
                trigger={
                  <Button
                    variant="outline"
                    className="border-white hover:bg-white hover:text-blue-900 px-6 md:px-8 py-3 text-base md:text-lg bg-transparent"
              
                  >
                    Book a Live Consultation
                  </Button>
                }
              />
            </div>
            <p className="text-sm opacity-75 underline" >
              Watch our Brand Film here
            </p>
          </div>
          <div className="flex-1 relative max-w-md lg:max-w-none">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
              alt="Diverse group of students studying together"
              className="w-full h-auto rounded-lg"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <Button size="lg" className="rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm">
                <Play className="w-6 md:w-8 h-6 md:h-8 text-white" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
