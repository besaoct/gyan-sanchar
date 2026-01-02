"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MapPin, Search } from "lucide-react";
import { MdTrendingUp } from "react-icons/md";
import { HiOutlineAcademicCap, HiOutlineClipboardList } from "react-icons/hi";
import { BiSupport } from "react-icons/bi";
import SearchBar from "./SearchBar";

export default function ServicesSection() {

  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Choosing the right college can be confusing
          </h2>
          <p className="text-gray-600">
            Here to help to guide you at every step of your college journey.
          </p>
        </div>

        <div className="flex justify-center mb-12">
        <SearchBar />
        </div>



        {/* steps with animation end */}

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6 bg-[#044cac] text-white hover:bg-[#023b86] transition-colors">
            <CardContent className="p-0">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold mb-2">Get Your Career Match</h3>
                  <p className="text-sm opacity-90">
                    Based on your interests, personality, skills and values
                  </p>
                </div>
                <div className="w-16 h-10 px-2 bg-white/20 rounded-lg flex items-center justify-center">
                  <MdTrendingUp className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="p-6 bg-[#044cac] text-white hover:bg-[#023b86] transition-colors">
            <CardContent className="p-0">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold mb-2">Apply With One Form</h3>
                  <p className="text-sm opacity-90">
                    Get shortlisted in apply to 250+ colleges with one form
                  </p>
                </div>
                <div className="w-16 h-10 px-2 bg-white/20 rounded-lg flex items-center justify-center">
                  <HiOutlineClipboardList className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="p-6 bg-[#044cac] text-white hover:bg-[#023b86] transition-colors">
            <CardContent className="p-0">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold mb-2">
                    Talk to Admission Experts
                  </h3>
                  <p className="text-sm opacity-90">
                    Get free personalized expert guidance from our experts &
                    alumni
                  </p>
                </div>
                <div className="w-16 h-10 bg-white/20 px-2 rounded-lg flex items-center justify-center">
                  <BiSupport className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="p-6 bg-[#044cac] text-white hover:bg-[#023b86] transition-colors">
            <CardContent className="p-0">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold mb-2">Easy Apply in 5 mins</h3>
                  <p className="text-sm opacity-90">
                    Fill your college applications in 5 minutes & track them
                  </p>
                </div>
                <div className="w-16 h-10 px-2 bg-white/20 rounded-lg flex items-center justify-center">
                  <HiOutlineAcademicCap className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
          <Button className="bg-orange-500 hover:bg-orange-600 text-white">
            Let's start your application
          </Button>
          <Button
            variant="outline"
            className="border-orange-500 text-orange-500 hover:bg-orange-50 bg-transparent"
          >
            Talk to a college expert
          </Button>
        </div>
      </div>
    </section>
  );
}

//  <style jsx>{`
//     .step-item {
//       animation: fadeIn 0.5s ease-out forwards;
//       opacity: 0;
//     }
//     @keyframes fadeIn {
//       from {
//         opacity: 0;
//         transform: translateY(20px);
//       }
//       to {
//         opacity: 1;
//         transform: translateY(0);
//       }
//     }
//     .step-item:nth-child(1) {
//       animation-delay: 0.2s;
//     }
//     .step-item:nth-child(2) {
//       animation-delay: 0.4s;
//     }
//     .step-item:nth-child(3) {
//       animation-delay: 0.6s;
//     }
//     .step-item:nth-child(4) {
//       animation-delay: 0.8s;
//     }
//     .step-item:nth-child(5) {
//       animation-delay: 1s;
//     }
//     .step-item:nth-child(6) {
//       animation-delay: 1.2s;
//     }

//     .step-item .step-circle {
//       animation: tick 0.5s ease-in-out forwards;
//       animation-play-state: paused;
//     }

//     .step-item.completed .step-circle {
//       background-color: #22c55e; /* green-500 */
//       border-color: #22c55e; /* green-500 */
//       animation-play-state: running;
//     }

//     .step-item.completed .step-number {
//       display: none;
//     }

//     .step-item.completed .step-check {
//       display: block;
//     }

//     @keyframes tick {
//       0% {
//         transform: scale(1);
//       }
//       50% {
//         transform: scale(1.2);
//       }
//       100% {
//         transform: scale(1);
//       }
//     }
//   `}</style>
