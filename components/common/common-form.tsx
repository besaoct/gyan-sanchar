"use client";

import { useEffect, useState } from "react";
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
import { getCollegeFilters } from "@/lib/api/data/colleges";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getCoursesFilters } from "@/lib/api/data/courses";
import Link from "next/link";
import { BASE_URL } from "@/lib/api/config/urls";
import { useAuth } from "@/contexts/auth/AuthContext";

interface CommonRegistrationFormProps {
  title: string;
  formTitle?: string;
  description: React.ReactNode;
  trigger: React.ReactNode;
  buttonText?: string;
  type?: string;
}

export function CommonAdmissionForm({
  title,
  formTitle,
  type = "register",
  description,
  trigger,
  buttonText = "Register",
}: CommonRegistrationFormProps) {
  const { toast } = useToast();
  const { isAuthenticated, user} = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [dob, setDob] = useState("");
  const [mobile, setMobile] = useState("");
  const [stream, setStream] = useState("");
  const [level, setLevel] = useState("");
  const [interestedOnlineDegree, setInterestedOnlineDegree] = useState(false);
  const [enableWhatsappUpdates, setEnableWhatsappUpdates] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [streamsOptions, setStreamsOptions] = useState<string[]>([]);
  const [levelsOptions, setLevelsOptions] = useState<string[]>([]);

  useEffect(() => {
    const loadFilters = async () => {
      try {
        const resCollege = await getCollegeFilters();
        const resCourse = await getCoursesFilters();

        if (resCollege.success && resCollege.data) {
          setStreamsOptions(resCollege.data.streams || []);
        }
        if (resCourse.success && resCourse.data) {
          setLevelsOptions(resCourse.data.levels || []);
        }
      } catch (err) {
        console.error("Failed to load filters", err);
      }
    };

    loadFilters();
  }, []);

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
      const response = await fetch(
       `${BASE_URL}/api/v1/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(registrationData),
        }
      );

      const result = await response.json();

      if (result.success) {
        toast({
          title: "Registration Successful!",
          description:
            "Thank you for registering. We will be in touch shortly.",
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
      const errorMessage =
        error.message || "Failed to register. Please try again.";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
        style: {
          color: "white",
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="lg:max-w-4xl sm:max-w-3xl w-full p-0 max-h-[96%] h-auto !overflow-auto">
        <div className="flex flex-col-reverse sm:flex-row w-full">
          <div className="sm:w-1/2 bg-primary sm:rounded-l-lg text-white p-8 flex flex-col justify-start ">
            <h2 className="text-2xl font-bold mb-4 text-left ">{title}</h2>
            {description}
          </div>
          <div className="sm:w-1/2 p-8">
            <DialogHeader className="mt-4">
              <DialogTitle className="mb-4">
                {formTitle || "Register with Us"}
              </DialogTitle>
            </DialogHeader>
            <>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <Label className="mb-2" htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                </div>
                <div>
                  <Label className="mb-2" htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                </div>
                <div>
                  <Label className="mb-2" htmlFor="mobile">Mobile</Label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                      +91
                    </span>
                    <Input
                      id="mobile"
                      type="tel"
                      placeholder="Enter your mobile number"
                      className="rounded-l-none"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>
                <div>
                  <Label className="mb-2" htmlFor="dob">Date of Birth</Label>
                  <Input
                    id="dob"
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                </div>
                <div>
                  <Label className="mb-2" htmlFor="stream">Stream</Label>
                  <Select
                    value={stream}
                    onValueChange={setStream}
                    disabled={isLoading}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Stream" />
                    </SelectTrigger>
                    <SelectContent>
                      {streamsOptions.map((s) => (
                        <SelectItem key={s} value={s}>
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="mb-2" htmlFor="level">Level</Label>
                  <Select
                    value={level}
                    onValueChange={setLevel}
                    disabled={isLoading}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Level" />
                    </SelectTrigger>
                    <SelectContent>
                      {levelsOptions.map((l) => (
                        <SelectItem key={l} value={l}>
                          {l}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="online-degree"
                    checked={interestedOnlineDegree}
                    onCheckedChange={(checked) =>
                      setInterestedOnlineDegree(!!checked)
                    }
                    disabled={isLoading}
                  />
                  <Label htmlFor="online-degree">
                    Interested in Online Degree Program
                  </Label>
                </div>
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="whatsapp-updates"
                    checked={enableWhatsappUpdates}
                    onCheckedChange={(checked) =>
                      setEnableWhatsappUpdates(!!checked)
                    }
                    disabled={isLoading}
                  />
                  <Label htmlFor="whatsapp-updates">
                    Enable updates & important information on Whatsapp.
                  </Label>
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Submitting..." : buttonText}
                </Button>
              </form>
                  {isAuthenticated && user && user.email ? (
                  <></>
                ) : (
                      <div className="mt-2 text-center text-sm">
               Already registered?{" "}
            <Link href="/login" className="underline">
              Login
            </Link>

          </div>
                )}
              <p className="text-xs text-muted-foreground mt-4">
                By proceeding ahead you expressly agree to the GyanSanchar Terms
                & Conditions and Privacy Policy
              </p>
            </>
          </div>
        </div>

      </DialogContent>
    </Dialog>
  );
}
