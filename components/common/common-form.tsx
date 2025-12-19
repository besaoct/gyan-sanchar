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

interface CommonRegistrationFormProps {
  title: string;
  formTitle?: string;
  description: React.ReactNode;
  trigger: React.ReactNode;
  buttonText?: string;
  type?:string;
}

export function CommonAdmissionForm({
  title,
  formTitle,
  type="register",
  description,
  trigger,
  buttonText = "Register",
}: CommonRegistrationFormProps) {
  const { toast } = useToast();

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [stream, setStream] = useState("");
  const [level, setLevel] = useState("");
  const [interestedOnlineDegree, setInterestedOnlineDegree] = useState(false);
  const [enableWhatsappUpdates, setEnableWhatsappUpdates] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const registrationData = {
      name,
      email,
      phone: mobile,
      interested_online_degree: interestedOnlineDegree,
      enable_whatsapp_updates: enableWhatsappUpdates,
      type: type || "registration",
      dob,
      stream,
      level,
    };

    try {
      const response = await fetch("https://gitcsdemoserver.online/gyansanchar/public/api/v1/auth/register", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(registrationData),
      });

      const result = await response.json();

      if (result.success) {
        toast({
          title: "Registration Successful!",
          description: "Thank you for registering. We will be in touch shortly.",
        });
        setIsDialogOpen(false);
        // Reset form fields
        setName("");
        setMobile("");
        setEmail("");
        setDob("");
        setStream("");
        setLevel("");
        setInterestedOnlineDegree(false);
        setEnableWhatsappUpdates(false);
      } else {
        throw new Error(result.message || "An unknown error occurred.");
      }
    } catch (error: any) {
      const errorMessage = error.message || "Failed to register. Please try again.";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
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
            <h2 className="text-2xl font-bold mb-4 text-left ">{ title}</h2>
            {description}
          </div>
          <div className="sm:w-1/2 p-8">
            <DialogHeader className="mt-4">
              <DialogTitle className="mb-4">{formTitle|| "Register with Us"}</DialogTitle>
            </DialogHeader>
            <>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} required disabled={isLoading} />
                </div>
                 <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required disabled={isLoading} />
                </div>
                <div>
                  <Label htmlFor="mobile">Mobile</Label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                      +91
                    </span>
                    <Input id="mobile" type="tel" placeholder="Enter your mobile number" className="rounded-l-none" value={mobile} onChange={(e) => setMobile(e.target.value)} required disabled={isLoading} />
                  </div>
                </div>
                <div>
                  <Label htmlFor="dob">Date of Birth</Label>
                  <Input id="dob" type="date" value={dob} onChange={(e) => setDob(e.target.value)} required disabled={isLoading} />
                </div>
                 <div>
                  <Label htmlFor="stream">Stream</Label>
                  <Input id="stream" placeholder="e.g. Science" value={stream} onChange={(e) => setStream(e.target.value)} required disabled={isLoading} />
                </div>
                 <div>
                  <Label htmlFor="level">Level</Label>
                  <Input id="level" placeholder="e.g. Graduate" value={level} onChange={(e) => setLevel(e.target.value)} required disabled={isLoading} />
                </div>
                <div className="flex items-start space-x-2">
                  <Checkbox id="online-degree" checked={interestedOnlineDegree} onCheckedChange={(checked) => setInterestedOnlineDegree(!!checked)} disabled={isLoading} />
                  <Label htmlFor="online-degree">Interested in Online Degree Program</Label>
                </div>
                <div className="flex items-start space-x-2">
                  <Checkbox id="whatsapp-updates" checked={enableWhatsappUpdates} onCheckedChange={(checked) => setEnableWhatsappUpdates(!!checked)} disabled={isLoading} />
                  <Label htmlFor="whatsapp-updates">Enable updates & important information on Whatsapp.</Label>
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Submitting..." : buttonText}
                </Button>
              </form>
              <p className="text-xs text-muted-foreground mt-4">
                By proceeding ahead you expressly agree to the GyanSanchar Terms & Conditions and Privacy Policy
              </p>
            </>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}