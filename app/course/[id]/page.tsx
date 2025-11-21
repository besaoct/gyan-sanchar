"use client";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { courseDetails } from "@/lib/api/dummy/course-single";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CourseHero } from "@/components/course/course-hero";
import { cn } from "@/lib/utils";
import { CommonAdmissionForm } from "@/components/admission/common-form";
import { StickyBar } from "@/components/course/sticky-bar";
import { ExternalLink, Phone } from "lucide-react";
import { collegesData } from "@/lib/api/dummy/colleges-data";
import { CollegeCard } from "@/components/college/college-card";

export default function CourseDetailPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [isStickyBarVisible, setIsStickyBarVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const heroHeight = heroRef.current.offsetHeight;
        const scrollPosition = window.scrollY;
        setIsStickyBarVisible(scrollPosition > heroHeight);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "syllabus", label: "Syllabus" },
    { id: "eligibility", label: "Eligibility" },
    { id: "colleges", label: "Colleges" },
  ];

  const offeringColleges = collegesData.filter(college => 
    college.courses.some(course => course.name.includes("Computer Science"))
  );

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <div  className="px-4 container py-10 w-full max-w-full">
        <CourseHero course={courseDetails} />
      </div>

      {/* Main Content */}
      <div ref={heroRef} className=" mx-auto  py-8">
        <div className="w-full">
              <nav className="sticky top-0 z-20 mb-6 w-full border-y border-border bg-white shadow-xs ">
         <div className="w-full flex overflow-x-auto scrollbar-hide scroll-smooth  container px-4 mx-auto">
              <ul className="flex items-center gap-6 text-sm w-full">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                            "whitespace-nowrap py-4 font-medium last:pr-4",
                      tab.id === activeTab
                        ? "border-b-2 border-primary font-semibold text-primary"
                        : "text-black"
                    )}
                    aria-current={tab.id === activeTab ? "page" : undefined}
                  >
                    {tab.label}
                  </button>
                ))}
              </ul>
            </div>
          </nav>

          <div className="mx-auto px-4 container">

          {activeTab === "overview" && (
            <Card className="border-none shadow-none p-0">
              <CardHeader className="p-0"><CardTitle>Overview</CardTitle></CardHeader>
              <CardContent className="p-0">
                <p className="mb-4">{courseDetails.overview.introduction}</p>
                <ul className="list-disc list-inside space-y-2">
                  {courseDetails.overview.highlights.map((highlight, i) => <li key={i}>{highlight}</li>)}
                </ul>
              </CardContent>
            </Card>
          )}
          {activeTab === "eligibility" && (
             <Card className="border-none shadow-none p-0">
              <CardHeader className="p-0"><CardTitle>Eligibility</CardTitle></CardHeader>
               <CardContent className="p-0">
                <ul className="list-disc list-inside space-y-2 mb-4">
                  {courseDetails.eligibility.criteria.map((c, i) => <li key={i}>{c}</li>)}
                </ul>
                <p><span className="font-semibold">Exams:</span> {courseDetails.eligibility.entranceExamsAccepted.join(", ")}</p>
              </CardContent>
            </Card>
          )}
          {activeTab === "syllabus" && (
             <Card className="border-none shadow-none p-0">
              <CardHeader className="p-0"><CardTitle>Syllabus</CardTitle></CardHeader>
              <CardContent className="p-0">
                <Accordion type="single" collapsible className="w-full">
                  {courseDetails.syllabus.semesterWiseSubjects.map((semester) => (
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
          {activeTab === "colleges" && (
             <Card className="border-none shadow-none p-0">
              <CardHeader className="p-0"><CardTitle>Colleges Offering Computer Science</CardTitle></CardHeader>
              <CardContent className="grid md:grid-cols-1 gap-4 p-0">
                {offeringColleges.map((college) => (
                  <CollegeCard key={college.id} college={college} />
                ))}
              </CardContent>
            </Card>
          )}
        </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-[#044cac] text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Ready to Apply?</h3>
            <p className="text-white/80 mb-6">
              Get personalized counseling and application assistance
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <CommonAdmissionForm
                buttonText="Apply Now"
                title="Why register with us?"
                formTitle="Schedule your free counseling session today!"
                description={(
                  <ul className="space-y-4 text-white/90">
                    <li>Get help in selecting the right course from the large selection of options available.</li>
                    <li>Boost your preparation with extensive knowledge of syllabus & exam pattern.</li>
                    <li>Explore your courses offered by different colleges that match your skills.</li>
                    <li>With totally online Admission Process we help you get college admission without having to step out.</li>
                  </ul>
                )}
                trigger={
                  <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                    <Phone className="h-4 w-4 mr-2" />
                    Schedule Counseling
                  </Button>
                }
              />
              <Button
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-white hover:text-[#044cac]"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Visit Official Website
              </Button>
            </div>
          </div>
        </div>
      </div>
      <StickyBar isVisible={isStickyBarVisible} />
      <Footer />
    </div>
  );
}