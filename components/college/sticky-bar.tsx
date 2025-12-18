"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CommonAdmissionForm } from "../common/common-form";
import { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";

interface StickyBarButtonData {
  id?: number;
  name: string;
  slug: string;
  description_title: string;
  description_keypoints: (string | null)[];
}

const fallbackData: StickyBarButtonData[] = [
    {

        name: "Request A Callback",
        slug: "callback",
        description_title: "Request Callback",
        description_keypoints: [
            "Get help in selecting the right course from the large selection of options available.",
            "Boost your preparation with extensive knowledge of syllabus & exam pattern.",
            "Explore your courses offered by different colleges that match your skills.",
            "With totally online Admission Process we help you get college admission without having to step out."
        ],
    },
    {

        name: "Check Eligibility",
        slug: "check-eligibility",
        description_title: "Check Your Eligibility",
        description_keypoints: [
            "Get help in selecting the right course from the large selection of options available.",
            "Boost your preparation with extensive knowledge of syllabus & exam pattern.",
            "Explore your courses offered by different colleges that match your skills.",
            "With totally online Admission Process we help you get college admission without having to step out."
        ],
    }
];

const StickyBarSkeleton = () => (
  <div className="mx-auto w-full px-4 py-3 grid grid-cols-2 lg:flex justify-center gap-4">
    <Skeleton className="h-12 w-full lg:w-40" />
    <Skeleton className="h-12 w-full lg:w-40" />
  </div>
);

export function StickyBar({ isVisible }: { isVisible: boolean }) {
  const [buttonsData, setButtonsData] = useState<StickyBarButtonData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("https://gitcsdemoserver.online/gyansanchar/public/api/v1/types");
        const result = await response.json();
        if (result.success && result.data) {
          const filteredData = result.data.filter(
            (item: StickyBarButtonData) => item.slug === 'callback' || item.slug === 'check-eligibility'
          );
          if (filteredData.length > 0) {
            setButtonsData(filteredData);
          } else {
             setButtonsData(fallbackData);
          }
        } else {
           setButtonsData(fallbackData);
        }
      } catch (error) {
        console.error("Failed to fetch sticky bar data:", error);
        setButtonsData(fallbackData);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const getButtonClass = (slug: string) => {
    switch (slug) {
      case 'callback':
        return "bg-orange-500 hover:bg-orange-500/90";
      case 'check-eligibility':
        return "bg-primary hover:bg-primary/90";
      default:
        return "bg-gray-500 hover:bg-gray-600";
    }
  };
  
  const getFormTitle = (slug: string) => {
    switch (slug) {
      case 'callback':
        return "Get college counselling from experts, free of cost !";
      case 'check-eligibility':
        return "Want to check if you are eligible? Let's get started.";
      default:
        return "Register with Us";
    }
  };

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-20 bg-background/95 backdrop-blur-sm border-t transition-transform duration-300",
        isVisible ? "translate-y-0" : "translate-y-full"
      )}
    >
      <div className=" mx-auto w-full px-4 py-3 grid grid-cols-2 lg:flex justify-center gap-4 overflow-x-auto scrollbar-hide">
        {isLoading ? (
          <StickyBarSkeleton />
        ) : (
          buttonsData.map((button) => (
            <CommonAdmissionForm
              key={button.slug}
              buttonText={button.name}
              title={button.description_title}
              formTitle={getFormTitle(button.slug)}
              type={button.slug}
              description={
                <ul className="space-y-4 text-white/90">
                  {button.description_keypoints.map((point, index) =>
                    point ? <li key={index}>{point}</li> : null
                  )}
                </ul>
              }
              trigger={
                <Button
                  variant="secondary"
                  className={cn(
                    "rounded-xl py-6 px-5 text-white lg:w-fit w-full",
                    getButtonClass(button.slug)
                  )}
                >
                  {button.name}
                </Button>
              }
            />
          ))
        )}
      </div>
    </div>
  );
}