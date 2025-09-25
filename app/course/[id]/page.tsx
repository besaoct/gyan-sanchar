
"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Star,
  MapPin,
  Calendar,
  Award,
  Phone,
  Mail,
  Share2,
  Heart,
  Download,
  ExternalLink,
  Building,
  GraduationCap,
  Users,
  BookOpen,
  DollarSign,
  Briefcase,
  IndianRupee,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { courseDetails } from "@/lib/course-single";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function CourseDetailPage() {
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "eligibility", label: "Eligibility" },
    { id: "admission", label: "Admission" },
    { id: "curriculum", label: "Curriculum" },
    { id: "instructors", label: "Instructors" },
    { id: "career", label: "Career Prospects" },
    { id: "faqs", label: "FAQs" },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="bg-primary text-white">
        <div className="container mx-auto px-4 py-4">
          <Link href="/courses">
            <Button variant="ghost" size="sm" className="text-white hover:text-white/80 hover:bg-white/10">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Courses
            </Button>
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-primary text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8 ">
            <div className="md:w-1/3">
              <Image
                src={courseDetails.basicInfo.heroImage}
                alt={courseDetails.basicInfo.courseName}
                width={400}
                height={250}
                className="rounded-lg object-cover w-full"
              />
            </div>
            <div className="md:w-2/3">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{courseDetails.basicInfo.courseName}</h1>
              <div className="flex flex-wrap items-center gap-4 text-white/90 mb-4">
                <Badge variant="secondary">{courseDetails.basicInfo.courseType}</Badge>
                <div className="flex items-center gap-1"><Calendar className="h-4 w-4" />{courseDetails.basicInfo.duration}</div>
                <div className="flex items-center gap-1"><Users className="h-4 w-4" />{courseDetails.basicInfo.mode}</div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button variant="secondary" size="sm"><Heart className="h-4 w-4 mr-2" />Save</Button>
                <Button variant="secondary" size="sm"><Phone className="h-4 w-4 mr-2" />Request a callback</Button>
                <Button variant="secondary" size="sm"><Mail className="h-4 w-4 mr-2" />Ask us</Button>
                <Button variant="secondary" size="sm"><Building className="h-4 w-4 mr-2" />Try Our College Finder</Button>
                <Button variant="secondary" size="sm"><GraduationCap className="h-4 w-4 mr-2" />Check Eligibility</Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex overflow-x-auto scrollbar-hide mb-8">
          <div className="flex gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === tab.id ? "bg-primary text-white" : "bg-gray-100 text-primary hover:bg-primary/10"
                }`}>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          {activeTab === "overview" && (
            <Card>
              <CardHeader><CardTitle>Overview</CardTitle></CardHeader>
              <CardContent>
                <p className="mb-4">{courseDetails.overview.introduction}</p>
                <ul className="list-disc list-inside space-y-2">
                  {courseDetails.overview.highlights.map((highlight, i) => <li key={i}>{highlight}</li>)}
                </ul>
              </CardContent>
            </Card>
          )}
          {activeTab === "eligibility" && (
            <Card>
              <CardHeader><CardTitle>Eligibility</CardTitle></CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2 mb-4">
                  {courseDetails.eligibility.criteria.map((c, i) => <li key={i}>{c}</li>)}
                </ul>
                <p><span className="font-semibold">Exams:</span> {courseDetails.eligibility.entranceExamsAccepted.join(", ")}</p>
              </CardContent>
            </Card>
          )}
          {activeTab === "admission" && (
            <Card>
              <CardHeader><CardTitle>Admission Process</CardTitle></CardHeader>
              <CardContent>
                <ol className="list-decimal list-inside space-y-2 mb-4">
                  {courseDetails.admissionProcess.steps.map((step, i) => <li key={i}>{step}</li>)}
                </ol>
                <h4 className="font-semibold mb-2">Important Dates</h4>
                <ul className="list-disc list-inside space-y-2">
                  <li>Application Start: {courseDetails.admissionProcess.importantDates.applicationStart}</li>
                  <li>Application End: {courseDetails.admissionProcess.importantDates.applicationEnd}</li>
                  <li>Exam Date: {courseDetails.admissionProcess.importantDates.examDate}</li>
                </ul>
              </CardContent>
            </Card>
          )}
          {activeTab === "curriculum" && (
            <Card>
              <CardHeader><CardTitle>Curriculum</CardTitle></CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {courseDetails.curriculum.semesterWiseSubjects.map((semester) => (
                    <AccordionItem key={semester.semester} value={`semester-${semester.semester}`}>
                      <AccordionTrigger>{semester.title}</AccordionTrigger>
                      <AccordionContent>
                        <p className="mb-4 text-muted-foreground">{semester.description}</p>
                        <div className="space-y-4">
                          {semester.subjects.map((subject, i) => (
                            <div key={i} className="p-4 border rounded-lg">
                              <h4 className="font-semibold">{subject.name}</h4>
                              <p className="text-sm text-muted-foreground mt-1">{subject.description}</p>
                              <p className="text-sm mt-2"><span className="font-semibold">Outcome:</span> {subject.outcome}</p>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          )}
          {activeTab === "instructors" && (
            <Card>
              <CardHeader><CardTitle>Instructors</CardTitle></CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-4">
                {courseDetails.instructorInfo.map((instructor, i) => (
                  <div key={i} className="border p-4 rounded-lg">
                    <h4 className="font-semibold">{instructor.name}</h4>
                    <p className="text-sm text-muted-foreground">{instructor.designation}</p>
                    <p className="text-sm">{instructor.qualification}</p>
                    <p className="text-sm">{instructor.experience} experience</p>
                    <p className="text-sm">Specialization: {instructor.specialization}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
          {activeTab === "career" && (
            <Card>
              <CardHeader><CardTitle>Career Prospects</CardTitle></CardHeader>
              <CardContent>
                <h4 className="font-semibold mb-2">Job Roles</h4>
                <div className="flex flex-wrap gap-2 mb-4">
                  {courseDetails.careerProspects.jobRoles.map((role, i) => <Badge key={i} variant="secondary">{role}</Badge>)}
                </div>
                <h4 className="font-semibold mb-2">Top Recruiters</h4>
                <div className="flex flex-wrap gap-2">
                  {courseDetails.careerProspects.recruiters.map((recruiter, i) => <Badge key={i}>{recruiter}</Badge>)}
                </div>
              </CardContent>
            </Card>
          )}
          {activeTab === "faqs" && (
            <Card>
              <CardHeader><CardTitle>FAQs</CardTitle></CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {courseDetails.faqs.map((faq, i) => (
                    <AccordionItem key={i} value={`item-${i}`}>
                      <AccordionTrigger>{faq.question}</AccordionTrigger>
                      <AccordionContent>{faq.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
