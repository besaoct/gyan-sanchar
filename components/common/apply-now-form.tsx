"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

interface ApplyNowFormProps {
  trigger: React.ReactNode;
  title: string;
  description: React.ReactNode;
  college_ids?: number[] | null;
  course_ids?: number[] | null;
  stream?: string;
  level?: string;
}

export function ApplyNowForm({
  trigger,
  title,
  description,
  college_ids,
  course_ids,
  stream: propStream,
  level: propLevel,
}: ApplyNowFormProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    date_of_birth: "",
    address: "",
    stream: "",
    level: "",
    interested_online_degree: false,
    enable_whatsapp_updates: false,
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const finalStream = propStream || formData.stream;
    const finalLevel = propLevel || formData.level;

    // Simple validation
    if (!formData.full_name || !formData.email || !formData.phone || !formData.date_of_birth || !formData.address || !finalStream || !finalLevel) {
        toast({ title: "Validation Error", description: "Please fill all required fields.", variant: "destructive" });
        setIsLoading(false);
        return;
    }

    const registrationData = {
      name: formData.full_name,
      email: formData.email,
      phone: formData.phone,
      interested_online_degree: formData.interested_online_degree,
      enable_whatsapp_updates: formData.enable_whatsapp_updates,
      type: "registration",
      dob: formData.date_of_birth,
      stream: finalStream,
      level: finalLevel,
    };

    try {
      // Step 1: Register User
      const regResponse = await fetch("https://gitcsdemoserver.online/gyansanchar/public/api/v1/auth/register", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(registrationData),
      });
      const regResult = await regResponse.json();

      if (!regResult.success) {
        throw new Error(regResult.message || "Registration failed. Please check your details.");
      }
      toast({ title: "Registration Successful", description: "Submitting your application..." });

      // Step 2: Submit Application
      const applicationData = {
        full_name: formData.full_name,
        email: formData.email,
        phone: `+91 ${formData.phone}`,
        date_of_birth: formData.date_of_birth,
        address: formData.address,
        college_ids: college_ids || null,
        course_ids: course_ids || null,
      };

      const appResponse = await fetch("https://gitcsdemoserver.online/gyansanchar/public/api/v1/applications", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(applicationData),
      });
      const appResult = await appResponse.json();

      if (!appResult.success) {
        throw new Error(appResult.message || "Application submission failed.");
      }

      toast({ 
        title: "Application Submitted!", description: "Thank you! We will get back to you soon." ,
        style: {
          color:"white"
        }
      });
      setIsDialogOpen(false);
      setFormData({
        full_name: "", email: "", phone: "", date_of_birth: "", address: "",
        stream: "", level: "", interested_online_degree: false, enable_whatsapp_updates: false,
      });

    } catch (error: any) {
      toast({ title: "Error", description: error.message || "An unexpected error occurred.", variant: "destructive" ,
        style: {
          color:"white"
        }

      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="lg:max-w-4xl sm:max-w-3xl w-full p-0 h-[96%] lg:h-fit !overflow-auto">
        <div className="flex flex-col-reverse sm:flex-row w-full">
          <div className="sm:w-1/2 bg-primary sm:rounded-l-lg text-white p-8 flex flex-col justify-start ">
            <h2 className="text-2xl font-bold mb-4 text-left ">{title}</h2>
            {description}
          </div>
          <div className="sm:w-1/2 p-8 w-full">
            <DialogHeader className="mt-4">
              <DialogTitle className="mb-4">Apply Now</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
              <div className="flex flex-col gap-4">
                <div className="w-full">
                  <Label htmlFor="full_name">Full Name</Label>
                  <Input id="full_name" className="w-full" value={formData.full_name} onChange={(e) => handleInputChange("full_name", e.target.value)} required disabled={isLoading} />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={formData.email} onChange={(e) => handleInputChange("email", e.target.value)} required disabled={isLoading} />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" type="tel" value={formData.phone} onChange={(e) => handleInputChange("phone", e.target.value)} required disabled={isLoading} />
                </div>
                <div>
                  <Label htmlFor="date_of_birth">Date of Birth</Label>
                  <Input id="date_of_birth" type="date" value={formData.date_of_birth} onChange={(e) => handleInputChange("date_of_birth", e.target.value)} required disabled={isLoading} />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" value={formData.address} onChange={(e) => handleInputChange("address", e.target.value)} required disabled={isLoading} />
                </div>
                {!propStream && (
                  <div>
                    <Label htmlFor="stream">Stream</Label>
                    <Input id="stream" value={formData.stream} onChange={(e) => handleInputChange("stream", e.target.value)} required disabled={isLoading} />
                  </div>
                )}
                {!propLevel && (
                  <div>
                    <Label htmlFor="level">Level</Label>
                    <Input id="level" value={formData.level} onChange={(e) => handleInputChange("level", e.target.value)} required disabled={isLoading} />
                  </div>
                )}
              </div>

              <div className="flex items-start space-x-2 pt-2">
                <Checkbox id="online-degree" checked={formData.interested_online_degree} onCheckedChange={(checked) => handleInputChange("interested_online_degree", !!checked)} disabled={isLoading} />
                <Label htmlFor="online-degree" className="font-normal">I am interested in an Online Degree Program</Label>
              </div>
              <div className="flex items-start space-x-2">
                <Checkbox id="whatsapp-updates" checked={formData.enable_whatsapp_updates} onCheckedChange={(checked) => handleInputChange("enable_whatsapp_updates", !!checked)} disabled={isLoading} />
                <Label htmlFor="whatsapp-updates" className="font-normal">Enable updates & important information on Whatsapp.</Label>
              </div>

              <Button type="submit" className="w-full mt-4" disabled={isLoading}>
                {isLoading ? "Submitting..." : "Submit Application"}
              </Button>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}