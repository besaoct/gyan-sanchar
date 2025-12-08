"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";

interface CommonAdmissionFormProps {
  buttonText: string;
  title: string;
  formTitle: string;
  description: React.ReactNode;
  trigger: React.ReactNode;
}

export function CommonAdmissionForm({ buttonText, title, description, trigger, formTitle }: CommonAdmissionFormProps) {
  return (
    <Dialog >
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="lg:max-w-4xl sm:max-w-3xl w-full p-0 h-[96%] lg:h-fit !overflow-auto">
        <div className="flex flex-col-reverse sm:flex-row w-full">
          <div className="sm:w-1/2 bg-primary sm:rounded-l-lg text-white p-8 flex flex-col justify-start ">
            <h2 className="text-2xl font-bold mb-4 text-left ">{title}</h2>
            {description}
          </div>
          <div className="sm:w-1/2 p-8">
            <DialogHeader className="mt-4">
              <DialogTitle className="mb-4">{formTitle}</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Enter your name" />
              </div>
              <div>
                <Label htmlFor="mobile">Mobile</Label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                    +91
                  </span>
                  <Input id="mobile" type="tel" placeholder="Enter your mobile number" className="rounded-l-none" />
                </div>
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Enter your email" />
              </div>
              <div className="flex items-start space-x-2">
                <Checkbox id="online-degree" />
                <Label htmlFor="online-degree">Interested in Online Degree Program</Label>
              </div>
              <div className="flex items-start space-x-2">
                <Checkbox id="whatsapp-updates" />
                <Label htmlFor="whatsapp-updates">Enable updates & important information on Whatsapp.</Label>
              </div>
              <Button className="w-full">{buttonText}</Button>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              By proceeding ahead you expressly agree to the CollegeDekho Terms & Conditions and Privacy Policy
            </p>
            <p className="text-sm text-center mt-4">
              Already have an account?{" "}
              <Link href="/login" className="text-primary hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}