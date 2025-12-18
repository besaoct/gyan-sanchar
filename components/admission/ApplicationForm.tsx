"use client"

import type React from "react"
import { useState } from "react"
import { CheckCircle, ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CollegeSelection } from "./CollegeSelection"
import { CourseSelection } from "./CourseSelection"
import type { College } from "@/lib/api/data/colleges"
import type { CourseDetails } from "@/lib/api/data/courses"
import { Input } from "../ui/input"
import { useToast } from "@/hooks/use-toast"
import { Checkbox } from "../ui/checkbox"
import { Label } from "../ui/label"

export function ApplicationForm() {
  const [step, setStep] = useState(1)
  const [selectedColleges, setSelectedColleges] = useState<College[]>([])
  const [selectedCourses, setSelectedCourses] = useState<CourseDetails[]>([])
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
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
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const { toast } = useToast();

  function handleCollegeToggle(college: College) {
    setSelectedColleges((prev) =>
      prev.some((c) => c.id === college.id)
        ? prev.filter((c) => c.id !== college.id)
        : [...prev, college]
    );
  }

  function handleCourseToggle(course: CourseDetails) {
    setSelectedCourses((prev) =>
      prev.some((c) => c.id === course.id)
        ? prev.filter((c) => c.id !== course.id)
        : [...prev, course]
    );
  }

  function validateForm() {
    const newErrors: Record<string, string> = {}
    if (!formData.full_name || formData.full_name.length < 2) {
      newErrors.full_name = "Full name must be at least 2 characters."
    }
    if (!formData.email || !formData.email.includes("@")) {
      newErrors.email = "Please enter a valid email."
    }
    if (!formData.phone || formData.phone.length < 10) {
      newErrors.phone = "Phone number must be at least 10 digits."
    }
    if (!formData.date_of_birth) {
      newErrors.date_of_birth = "Date of birth is required."
    }
    if (!formData.address || formData.address.length < 5) {
      newErrors.address = "Address must be at least 5 characters."
    }
     if (!formData.stream) {
      newErrors.stream = "Stream is required."
    }
     if (!formData.level) {
      newErrors.level = "Level is required."
    }
    if (selectedColleges.length === 0) {
      newErrors.colleges = "Please select at least one college."
       toast({ title: "Validation Error", description: "Please select at least one college.", variant: "destructive" });
    }
    if (selectedCourses.length === 0) {
      newErrors.courses = "Please select at least one course."
      toast({ title: "Validation Error", description: "Please select at least one course.", variant: "destructive" });
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validateForm()) {
      return
    }

    setIsLoading(true);

    const registrationData = {
      name: formData.full_name,
      email: formData.email,
      phone: formData.phone,
      interested_online_degree: formData.interested_online_degree,
      enable_whatsapp_updates: formData.enable_whatsapp_updates,
      type: "registration",
      dob: formData.date_of_birth,
      stream: formData.stream,
      level: formData.level,
    };

    try {
      // Step 1: Register user
      const regResponse = await fetch("https://gitcsdemoserver.online/gyansanchar/public/api/v1/auth/register", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(registrationData),
      });

      const regResult = await regResponse.json();

      if (!regResult.success) {
        throw new Error(regResult.message || "Registration failed.");
      }
      
      toast({ title: "Registration Successful", description: "Proceeding to application submission." });

      // Step 2: Submit application
      const applicationData = {
        full_name: formData.full_name,
        email: formData.email,
        phone: formData.phone,
        date_of_birth: formData.date_of_birth,
        address: formData.address,
        college_ids: selectedColleges.map((c) => c.id),
        course_ids: selectedCourses.map((c) => c.id),
      };

      const appResponse = await fetch("https://gitcsdemoserver.online/gyansanchar/public/api/v1/applications", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(applicationData),
      });

      const appResult = await appResponse.json();

      if (appResult.success) {
        setIsSubmitted(true);
        toast({
          title: "Application Submitted!",
          description: "Thank you for your application. We will be in touch.",
        });
      } else {
        throw new Error(appResult.message || "Application submission failed.");
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

 function handleInputChange(field: string, value: string | boolean) {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  function handleNewApplication() {
    setFormData({
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
    setSelectedColleges([]);
    setSelectedCourses([]);
    setStep(1);
    setIsSubmitted(false);
    setErrors({});
  }

  if (isSubmitted) {
    return (
      <div>
        <div className="flex flex-col items-center justify-center py-16">
          <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
          <h2 className="text-3xl font-bold mb-2">Application Submitted Successfully!</h2>
          <p className="text-muted-foreground mb-8 text-center max-w-md">
            Thank you for applying. We will review your application and get back to you soon.
          </p>
          <Button onClick={handleNewApplication} className="bg-primary hover:bg-primary/90 text-white">
            Start New Application
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex flex-row items-center justify-between mb-6">
        <span className="text-sm text-muted-foreground">Step {step} of 3</span>
      </div>
      <div>
        {step === 1 && (
            <div>
                <CollegeSelection selectedColleges={selectedColleges} onCollegeToggle={handleCollegeToggle} />
                <div className="mt-8 flex justify-end">
                    <Button onClick={() => setStep(2)} className="bg-primary hover:bg-primary/90 text-white">
                        Next
                    </Button>
                </div>
            </div>
        )}

        {step === 2 && (
          <div>
            <CourseSelection
              selectedCourses={selectedCourses}
              onCourseToggle={handleCourseToggle}
            />
            <div className="mt-8 flex justify-between">
              <Button
                onClick={() => setStep(1)}
                variant="outline"
                className=" text-foreground hover:bg-gray-50"
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <Button onClick={() => setStep(3)} className="bg-primary hover:bg-primary/90 text-white">
                Continue to Application
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Your Information</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label className="block text-sm font-medium mb-2">Full Name</Label>
                    <Input type="text" placeholder="John Doe" value={formData.full_name} onChange={(e) => handleInputChange("full_name", e.target.value)} />
                    {errors.full_name && <p className="text-destructive text-sm mt-1">{errors.full_name}</p>}
                  </div>
                  <div>
                    <Label className="block text-sm font-medium mb-2">Email</Label>
                    <Input type="email" placeholder="john.doe@example.com" value={formData.email} onChange={(e) => handleInputChange("email", e.target.value)} />
                    {errors.email && <p className="text-destructive text-sm mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <Label className="block text-sm font-medium mb-2">Phone Number</Label>
                    <Input type="tel" placeholder="+91 1234567890" value={formData.phone} onChange={(e) => handleInputChange("phone", e.target.value)} />
                    {errors.phone && <p className="text-destructive text-sm mt-1">{errors.phone}</p>}
                  </div>
                  <div>
                    <Label className="block text-sm font-medium mb-2">Date of Birth</Label>
                    <Input type="date" value={formData.date_of_birth} onChange={(e) => handleInputChange("date_of_birth", e.target.value)} />
                    {errors.date_of_birth && <p className="text-destructive text-sm mt-1">{errors.date_of_birth}</p>}
                  </div>
                  <div>
                    <Label className="block text-sm font-medium mb-2">Address</Label>
                    <Input type="text" placeholder="123, Main Street, Anytown" value={formData.address} onChange={(e) => handleInputChange("address", e.target.value)} />
                    {errors.address && <p className="text-destructive text-sm mt-1">{errors.address}</p>}
                  </div>
                   <div>
                    <Label className="block text-sm font-medium mb-2">Stream</Label>
                    <Input type="text" placeholder="e.g. Science" value={formData.stream} onChange={(e) => handleInputChange("stream", e.target.value)} />
                    {errors.stream && <p className="text-destructive text-sm mt-1">{errors.stream}</p>}
                  </div>
                   <div>
                    <Label className="block text-sm font-medium mb-2">Level</Label>
                    <Input type="text" placeholder="e.g. Graduate" value={formData.level} onChange={(e) => handleInputChange("level", e.target.value)} />
                    {errors.level && <p className="text-destructive text-sm mt-1">{errors.level}</p>}
                  </div>
                </div>

                <div className="space-y-4">
                    <div className="flex items-start space-x-2">
                      <Checkbox id="online-degree" checked={formData.interested_online_degree} onCheckedChange={(checked) => handleInputChange("interested_online_degree", !!checked)} />
                      <Label htmlFor="online-degree" className="font-normal">I am interested in an Online Degree Program</Label>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Checkbox id="whatsapp-updates" checked={formData.enable_whatsapp_updates} onCheckedChange={(checked) => handleInputChange("enable_whatsapp_updates", !!checked)} />
                      <Label htmlFor="whatsapp-updates" className="font-normal">Enable updates & important information on Whatsapp.</Label>
                    </div>
                </div>


              <div className="flex gap-4 pt-4 justify-end">
                <Button type="button" onClick={() => setStep(2)} variant="outline" className="w-fit text-foreground hover:bg-gray-50">
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
                <Button type="submit" className="w-fit bg-primary hover:bg-primary/90 text-white" disabled={isLoading}>
                  {isLoading ? "Submitting..." : "Submit Application"}
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}