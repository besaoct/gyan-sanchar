"use client";
import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCourseBySlug } from "@/lib/api/data/courses";
import type { CourseDetails } from "@/lib/api/data/courses";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CourseHero } from "@/components/course/course-hero";
import { cn } from "@/lib/utils";
import { CommonAdmissionForm } from "@/components/common/common-form";
import { StickyBar } from "@/components/course/sticky-bar";
import { ExternalLink, Phone } from "lucide-react";
import Loading from "./loading";
import { CourseCollegeCard } from "@/components/course/course-college-card";

export default function CourseDetailsPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [course, setCourse] = useState<CourseDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [isStickyBarVisible, setIsStickyBarVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (slug) {
      const fetchCourse = async () => {
        try {
          setLoading(true);
          const response = await getCourseBySlug(slug);
          if (response.success) {
            setCourse(response.data);
          } else {
            setError(response.message);
          }
        } catch (err) {
          setError("Failed to fetch course details");
        } finally {
          setLoading(false);
        }
      };
      fetchCourse();
    }
  }, [slug]);

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


  if (loading) {    return <Loading />;
  }



  return (
    <div className="min-h-screen bg-white">
      <Header />

      { error ? (
        <div className="min-h-screen bg-white flex items-center justify-center">
          <p className="text-red-500">{error}</p>
        </div>
      ) : !course ? (
        <div className="min-h-screen bg-white flex items-center justify-center">
          <p>Course not found.</p>
        </div>
      ) : (
        <>
          {/* Hero Section */}
          <div className="px-4 container py-10 w-full max-w-full">
            <CourseHero course={course} />
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
                    <CardHeader className="p-0">
                      <CardTitle>Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div
                        className="prose prose-headings:text-base "
                        dangerouslySetInnerHTML={{ __html: course.description }}
                      />

                      <h4 className="mt-6 mb-4  font-semibold">
                        Program Highlights
                      </h4>
                      <ul className="list-disc list-inside space-y-2 mt-4">
                        {course.program_highlights.map((highlight, i) => (
                          <li key={i}>
                            <span className="font-medium">
                              {highlight.title}
                            </span>
                            : {highlight.description}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}
                {activeTab === "eligibility" && (
                  <Card className="border-none shadow-none p-0">
                    <CardHeader className="p-0">
                      <CardTitle>Eligibility</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <ul className="list-disc list-inside space-y-2 mb-4">
                        {course.eligibility.criteria.map((c, i) => (
                          <li key={i}>{c}</li>
                        ))}
                      </ul>
                      <p>
                        <span className="font-semibold">Exams:</span>{" "}
                        {course.eligibility.entranceExamsAccepted.join(", ")}
                      </p>
                    </CardContent>
                  </Card>
                )}
                {activeTab === "syllabus" && (
                  <Card className="border-none shadow-none p-0">
                    <CardHeader className="p-0">
                      <CardTitle>Syllabus</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <Accordion type="single" collapsible className="w-full">
                        {course.syllabus.semesterWiseSubjects.map(
                          (semester, index) => (
                            <AccordionItem
                              key={index}
                              value={`semester-${index}`}
                            >
                              <AccordionTrigger>
                                {semester.title}
                              </AccordionTrigger>
                              <AccordionContent>
                                <p className="mb-4 text-muted-foreground">
                                  {semester.description}
                                </p>
                                <div className="space-y-4">
                                  {semester.subjects.map((subject, i) => (
                                    <div
                                      key={i}
                                      className="p-4 border rounded-lg"
                                    >
                                      <h4 className="font-semibold">
                                        {subject.name}
                                      </h4>
                                      <p className="text-sm text-muted-foreground mt-1">
                                        {subject.description}
                                      </p>
                                      <p className="text-sm mt-2">
                                        <span className="font-semibold">
                                          Outcome:
                                        </span>{" "}
                                        {subject.outcome}
                                      </p>
                                    </div>
                                  ))}
                                </div>
                              </AccordionContent>
                            </AccordionItem>
                          )
                        )}
                      </Accordion>
                    </CardContent>
                  </Card>
                )}
                {activeTab === "colleges" && (
                  <Card className="border-none shadow-none p-0">
                    <CardHeader className="p-0">
                      <CardTitle>
                        Colleges Offering {course.course_name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="grid md:grid-cols-1 gap-4 p-0">
                      {course.colleges.length > 0 ? (
                        course.colleges.map((college, index) => (
                          <CourseCollegeCard key={index} college={college} />
                        ))
                      ) : (
                        <p>
                          There are no colleges available at the moment for this
                          course.
                        </p>
                      )}
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
                    description={
                      <ul className="space-y-4 text-white/90">
                        <li>
                          Get help in selecting the right course from the large
                          selection of options available.
                        </li>
                        <li>
                          Boost your preparation with extensive knowledge of
                          syllabus & exam pattern.
                        </li>
                        <li>
                          Explore your courses offered by different colleges
                          that match your skills.
                        </li>
                        <li>
                          With totally online Admission Process we help you get
                          college admission without having to step out.
                        </li>
                      </ul>
                    }
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
        </>
      )}
      <Footer />
    </div>
  );
}
