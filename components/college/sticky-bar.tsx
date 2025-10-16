"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CommonAdmissionForm } from "../admission/common-form";

export function StickyBar({ isVisible }: { isVisible: boolean }) {
  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-20 bg-background/95 backdrop-blur-sm border-t transition-transform duration-300",
        isVisible ? "translate-y-0" : "translate-y-full"
      )}
    >
      <div className=" mx-auto w-full px-4 py-3 grid grid-cols-2 lg:flex justify-center gap-4 overflow-x-auto scrollbar-hide">
          <CommonAdmissionForm
          buttonText="Request A Callback"
          title="Why register with us?"
          formTitle="Get college counselling from experts, free of cost !"
          description={
            <ul className="space-y-4 text-white/90">
              <li>Get help in selecting the right course from the large selection of options available.</li>
              <li>Boost your preparation with extensive knowledge of syllabus & exam pattern.</li>
              <li>Explore your courses offered by different colleges that match your skills.</li>
              <li>With totally online Admission Process we help you get college admission without having to step out.</li>
            </ul>
          }
          trigger={
            <Button variant="secondary" className="rounded-xl py-6 px-5 bg-orange-500 hover:bg-orange-500/90 text-white lg:w-fit w-full ">
              Request Callback
            </Button>
          }
        />

        <CommonAdmissionForm
          buttonText="Check Eligibility"
          title="Check Your Eligibility"
          formTitle="Want to check if you are eligible? Let's get started."
          description={
            <ul className="space-y-4 text-white/90">
              <li>Get help in selecting the right course from the large selection of options available.</li>
              <li>Boost your preparation with extensive knowledge of syllabus & exam pattern.</li>
              <li>Explore your courses offered by different colleges that match your skills.</li>
              <li>With totally online Admission Process we help you get college admission without having to step out.</li>
            </ul>
          }
          trigger={
            <Button variant="secondary" className="rounded-xl py-6 px-5 bg-primary hover:bg-primary/90 text-white lg:w-fit w-full ">
              Check Eligibility
            </Button>
          }
        />
     
      </div>
    </div>
  );
}