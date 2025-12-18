"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MapPin, Check } from "lucide-react";
import { MdTrendingUp } from "react-icons/md";
import { HiOutlineAcademicCap, HiOutlineClipboardList } from "react-icons/hi";
import { BiSupport } from "react-icons/bi";
import { useState, useEffect } from "react";

const steps = [
  "Register",
  "Select Course",
  "Fill Application",
  "Upload Docs",
  "Make Payment",
  "Admission Confirmed",
];

export default function ServicesSection() {
  // const [activeStep, setActiveStep] = useState(0);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setActiveStep((prev) => (prev + 1) % steps.length); // loop correctly
  //   }, 2000);
  //   return () => clearInterval(interval);
  // }, []);

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
          <div className="flex flex-col sm:flex-row items-start sm:items-center  gap-4 bg-white p-4 rounded-lg shadow-sm w-full max-w-4xl">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-gray-400" />
              <span className="text-gray-600">Popular</span>
            </div>
            <Input
              placeholder="Select Course"
              className="border-1 h-10 bg-gray-50 py-2 flex-1 shadow-none"
            />
     
          </div>
        </div>

        {/* steps with animation */}
        {/* <div className="mt-16 mb-12">
  <div className="relative w-full mx-auto">

    
    <div className="hidden lg:block absolute top-6 left-0 w-full h-1 bg-gray-200 rounded-full"></div>
    <div
      className="hidden lg:block absolute top-6 left-0 h-1 bg-green-600/50 rounded-full transition-all duration-700 ease-in-out"
      style={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
    ></div>

<div className="flex flex-col items-center gap-10 lg:grid lg:grid-cols-6 lg:gap-8 lg:items-start relative z-10">
  {steps.map((step, i) => {
    const isLast = i === steps.length - 1;
    const isCompleted = i < activeStep || (isLast && activeStep === 0);
    const isActive = i === activeStep;

    return (
      <div
        key={i}
        className="flex flex-col items-center lg:flex-col lg:items-center lg:text-center relative"
      >

        {i !== 0 && (
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-1 h-10 bg-gray-200 lg:hidden"></div>
        )}
        {i !== 0 && isCompleted && (
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-1 h-10 bg-green-500 lg:hidden transition-all duration-700"></div>
        )}

 
        <div
          className={`relative flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-500
            ${isCompleted
              ? "bg-green-500 border-green-500/50 text-white"
              : isActive
              ? "border-green-500/50 text-green-500 bg-white shadow-sm"
              : "border-gray-300 text-gray-400 bg-white"
            }`}
        >
          {isCompleted ? (
            <Check className="w-6 h-6 animate-scaleIn" />
          ) : (
            <span className="font-bold">{i + 1}</span>
          )}
        </div>


<p
  className={`mt-3 px-3 w-60 lg:w-fit gap-4 h-10 flex items-center justify-center py-1 text-sm font-semibold rounded-sm text-center transition-colors duration-500 uppercase
    ${isCompleted
      ? "bg-[#044cac]/10 text-[#044cac] border border-[#044cac]/50"
      : isActive
      ? "bg-[#044cac]/10 text-[#044cac] border border-[#044cac]/50"
      : "bg-gray-100 text-gray-500 border border-gray-200"
    }`}
>
  {step}
</p>

      </div>
    );
  })}
</div>

  </div>
</div> */}

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
