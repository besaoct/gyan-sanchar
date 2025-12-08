"use client"

import type React from "react"

import { useState } from "react"
import { CheckCircle, ChevronLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { CollegeSelection } from "./CollegeSelection"
import { CourseSelection } from "./CourseSelection"
import { CourseCart } from "./CourseCart"
import type { AdmissionCollege, AdmissionCourse } from "@/lib/api/dummy/admission-data"
import { Input } from "../ui/input"

export function ApplicationForm() {
  const [step, setStep] = useState(1)
  const [selectedCollege, setSelectedCollege] = useState<AdmissionCollege | null>(null)
  const [selectedCourses, setSelectedCourses] = useState<AdmissionCourse[]>([])
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    dob: "",
    address: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  function handleCollegeSelect(college: AdmissionCollege) {
    setSelectedCollege(college)
    setStep(2)
  }

  function handleCourseToggle(course: AdmissionCourse) {
    setSelectedCourses((prev) =>
      prev.some((c) => c.id === course.id) ? prev.filter((c) => c.id !== course.id) : [...prev, course],
    )
  }

  function handleRemoveCourse(courseId: string) {
    setSelectedCourses((prev) => prev.filter((c) => c.id !== courseId))
  }

  function handleContinueFromCart() {
    if (selectedCourses.length > 0) {
      setStep(4)
    }
  }

  function validateForm() {
    const newErrors: Record<string, string> = {}

    if (!formData.fullName || formData.fullName.length < 2) {
      newErrors.fullName = "Full name must be at least 2 characters."
    }
    if (!formData.email || !formData.email.includes("@")) {
      newErrors.email = "Please enter a valid email."
    }
    if (!formData.phone || formData.phone.length < 10) {
      newErrors.phone = "Phone number must be at least 10 digits."
    }
    if (!formData.dob) {
      newErrors.dob = "Date of birth is required."
    }
    if (!formData.address || formData.address.length < 5) {
      newErrors.address = "Address must be at least 5 characters."
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (validateForm()) {
      console.log("Form submitted:", { ...formData, selectedCollege, selectedCourses })
      setIsSubmitted(true)
    }
  }

  function handleInputChange(field: string, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  function handleNewApplication() {
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      dob: "",
      address: "",
    })
    setSelectedCollege(null)
    setSelectedCourses([])
    setStep(1)
    setIsSubmitted(false)
    setErrors({})
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
        {/* <h2 className="text-2xl font-bold">Application Form</h2> */}
        <span className="text-sm text-muted-foreground">Step {step} of 4</span>
      </div>
      <div>
        {/* Step 1: College Selection */}
        {step === 1 && <CollegeSelection onCollegeSelect={handleCollegeSelect} />}

        {/* Step 2: Course Selection */}
        {step === 2 && selectedCollege && (
          <div>
            <CourseSelection
              collegeId={selectedCollege.id}
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
              <Button
                onClick={() => setStep(3)}
                disabled={selectedCourses.length === 0}
                className="bg-primary hover:bg-primary/90 text-white"
              >
                Review Courses
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Course Cart Review */}
        {step === 3 && (
          <div>
            <CourseCart courses={selectedCourses} onRemove={handleRemoveCourse} onContinue={handleContinueFromCart} />
            <div className="mt-8">
                        <div className="mt-8 flex justify-between">
              <Button
                onClick={() => setStep(2)}
                variant="outline"
                className=" text-foreground hover:bg-gray-50"
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <Button
                onClick={handleContinueFromCart}
                disabled={selectedCourses.length === 0}
                className="bg-primary hover:bg-primary/90 text-white"
              >
                Continue
              </Button>
            </div>
       
            </div>
          </div>
        )}

        {/* Step 4: User Information Form */}
        {step === 4 && (
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Full Name</label>
                <Input
                  type="text"
                  placeholder="John Doe"
                  className=" bg-white shadow-none rounded-md w-full px-3 py-2 text-base  "
                  value={formData.fullName}
                  onChange={(e) => handleInputChange("fullName", e.target.value)}
                />
                {errors.fullName && <p className="text-destructive text-sm mt-1">{errors.fullName}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <Input
                  type="email"
                  placeholder="john.doe@example.com"
                  className=" bg-white shadow-none rounded-md w-full px-3 py-2 text-base  "
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                />
                {errors.email && <p className="text-destructive text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Phone Number</label>
                <Input
                  type="tel"
                  placeholder="+91 1234567890"
                  className="bg-white shadow-none  rounded-md w-full px-3 py-2 text-base  "
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                />
                {errors.phone && <p className="text-destructive text-sm mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Date of Birth</label>
                <Input
                  type="date"
                  className=" bg-white shadow-none rounded-md w-full px-3 py-2 text-base  "
                  value={formData.dob}
                  onChange={(e) => handleInputChange("dob", e.target.value)}
                />
                {errors.dob && <p className="text-destructive text-sm mt-1">{errors.dob}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Address</label>
                <Input
                  type="text"
                  placeholder="123, Main Street, Anytown"
                  className=" bg-white shadow-none rounded-md w-full px-3 py-2 text-base  "
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                />
                {errors.address && <p className="text-destructive text-sm mt-1">{errors.address}</p>}
              </div>

              <div className="flex gap-4 pt-4 justify-end">
                <Button
                  type="button"
                  onClick={() => setStep(3)}
                  variant="outline"
                  className="w-fit  text-foreground hover:bg-gray-50"
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
                <Button type="submit" className="w-fit  bg-primary hover:bg-primary/90 text-white">
                  Submit Application
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
