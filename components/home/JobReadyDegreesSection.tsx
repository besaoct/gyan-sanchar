'use client'

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { IoMdCheckmarkCircle } from "react-icons/io"
import { MdOutlineSchool, MdWorkOutline } from "react-icons/md"

export default function JobReadyDegreesSection() {
  return (
    <section className="py-12 md:py-16 bg-gradient-to-r from-orange-400 to-orange-500 text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="flex-1 order-2 lg:order-1">
            <div className="relative">
              <img
                src="/grad.avif"
                alt="Professional graduate with certificate"
                className="rounded-lg w-full h-auto"
              />
              <div className="absolute -right-2 md:-right-4 top-4 bg-white text-black p-2 rounded-lg text-xs">
                <div className="font-semibold">Learn From 4500+</div>
                <div>Corporate Professionals</div>
              </div>
            </div>
          </div>

          <div className="flex-1 text-start order-1 lg:order-2">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8">
              With Job Ready Degrees
              <br />
              <span className="text-4xl md:text-5xl lg:text-6xl">
                you could be THIS
                <br />
                AWESOME!
              </span>
            </h2>
            <div className="flex flex-col sm:flex-row justify-start gap-4 md:gap-8 mb-8 ">
              <Card className="bg-white text-black p-3 md:p-4 rounded-lg">
                <div className="text-center">
                  <div className="w-8 h-8 bg-[#044cac] rounded-full mx-auto mb-2 flex items-center justify-center">
                    <MdOutlineSchool className="w-4 h-4 text-white" />
                  </div>
                  <div className="font-semibold text-sm">Learn From 4500+</div>
                  <div className="text-xs">Corporate Professionals</div>
                </div>
              </Card>
              <Card className="bg-white text-black p-3 md:p-4 rounded-lg">
                <div className="text-center">
                  <div className="w-8 h-8 bg-[#044cac] rounded-full mx-auto mb-2 flex items-center justify-center">
                    <MdWorkOutline className="w-4 h-4 text-white" />
                  </div>
                  <div className="font-semibold text-sm">250+ Companies</div>
                  <div className="text-xs">Providing Live Projects & Case Studies</div>
                </div>
              </Card>
              <Card className="bg-white text-black p-3 md:p-4 rounded-lg">
                <div className="text-center">
                  <div className="w-8 h-8 bg-[#044cac] rounded-full mx-auto mb-2 flex items-center justify-center">
                    <IoMdCheckmarkCircle className="w-4 h-4 text-white" />
                  </div>
                  <div className="font-semibold text-sm">Internships with</div>
                  <div className="text-xs">500+ Brands</div>
                </div>
              </Card>
            </div>
            <Button className=" text-white px-6 md:px-8 py-3">
              Apply for Job Ready Degree
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
