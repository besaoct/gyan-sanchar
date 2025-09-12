'use client'

import { Button } from "@/components/ui/button"

export default function OnlineDegreesSection() {
  return (
    <section className="py-12 md:py-16 bg-gradient-to-r from-orange-400 to-orange-500">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between text-white gap-8">
          <div className="flex-1 text-center lg:text-left">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Unlock Your Future with
              <br />
              <span className="text-4xl md:text-6xl">
                Online
                <br />
                Degrees
              </span>
              <br />
              from <span className="underline">Top Universities!</span>
            </h2>
          </div>
          <div className="flex-1 flex justify-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 md:p-8 w-full max-w-md">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-xl md:text-2xl font-bold">500+</div>
                  <div className="text-sm">Online Courses</div>
                </div>
                <div>
                  <div className="text-xl md:text-2xl font-bold">100+</div>
                  <div className="text-sm">Universities</div>
                </div>
                <div>
                  <div className="text-xl md:text-2xl font-bold">UGC & AICTE</div>
                  <div className="text-sm">Approved Programs</div>
                </div>
                <div>
                  <Button className="bg-white text-orange-500 hover:bg-gray-100 text-sm h-auto">
                    Get Free
                    <br />
                    Counselling
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
