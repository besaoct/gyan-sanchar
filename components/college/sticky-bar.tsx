"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function StickyBar({ isVisible }: { isVisible: boolean }) {
  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-20 bg-background/95 backdrop-blur-sm border-t transition-transform duration-300",
        isVisible ? "translate-y-0" : "translate-y-full"
      )}
    >
      <div className=" mx-auto w-full px-4 py-3 grid grid-cols-2 lg:flex justify-center gap-4">
        <Button variant="secondary" className="rounded-xl py-6 px-5 bg-orange-500 hover:bg-orange-500/90 text-white lg:w-fit w-full ">
          Check Eligibility
        </Button>
        <Button className="rounded-xl w-full lg:w-fit py-6 px-5">Request Callback</Button>
      </div>
    </div>
  );
}