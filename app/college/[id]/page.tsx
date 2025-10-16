"use client";
import { useEffect, useRef, useState } from "react";
import { notFound } from "next/navigation";
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
  Award as AwardIcon,
  IndianRupee,
} from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { collegesData } from "@/lib/colleges-data";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { CollegeHero } from "@/components/college/college-hero";
import { cn } from "@/lib/utils";
import { StickyBar } from "@/components/college/sticky-bar";

interface CollegeDetailPageProps {
  params: {
    id: string;
  };
}

export default function CollegeDetailPage({ params }: CollegeDetailPageProps) {
  const college = collegesData.find((c) => c.id === params.id);
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

  if (!college) {
    notFound();
  }

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "courses", label: "Courses" },
    { id: "admission", label: "Admission" },
    { id: "fees", label: "Fee Structure" },
    { id: "facilities", label: "Facilities" },
    { id: "placement", label: "Placements" },
    { id: "reviews", label: "Reviews" },
    { id: "gallery", label: "Gallery" },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      {/* Hero Section */}
      <div  className="px-4 container py-10 w-full max-w-full">
        <CollegeHero college={collegesData[0]} />
      </div>

      {/* Main Content */}
      <div ref={heroRef} className=" mx-auto py-8">
        <div className="w-full">
          <nav className="sticky top-0 z-20 mb-6 w-full border-y border-border bg-white shadow ">
            <div className="w-full flex overflow-x-auto scrollbar-hide scroll-smooth  container px-4 mx-auto">
              <ul className="flex items-center gap-6 text-sm w-full">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "whitespace-nowrap py-4 font-medium",
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
            <div className="space-y-6">
              <Card className="border-none shadow-none p-0">
                <CardHeader className="p-0">
                  <CardTitle className="flex items-center gap-2">
                    <Building className="h-5 w-5 text-[#044cac]" />
                    About {college.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {college.description}
                  </p>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">Key Information</h4>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">
                            Established:
                          </span>
                          <span className="font-medium">
                            {college.established}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Type:</span>
                          <span className="font-medium">{college.type}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">
                            Location:
                          </span>
                          <span className="font-medium">
                            {college.location.city}, {college.location.state}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">
                            Student Strength:
                          </span>
                          <span className="font-medium">
                            {college.campusLife.studentStrength.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">
                            Faculty Ratio:
                          </span>
                          <span className="font-medium">
                            {college.campusLife.facultyRatio}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">
                            Campus Size:
                          </span>
                          <span className="font-medium">
                            {college.campusSize} acres
                          </span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">
                        Accreditation & Affiliations
                      </h4>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {college.accreditation.map((acc) => (
                          <Badge
                            key={acc}
                            variant="outline"
                            className="bg-[#044cac]/10 text-[#044cac]"
                          >
                            {acc}
                          </Badge>
                        ))}
                      </div>
                      <h4 className="font-semibold mb-3">Campus Life</h4>
                      <div className="flex flex-wrap gap-2">
                        {college.campusLife.clubs.map((club) => (
                          <Badge
                            key={club}
                            variant="outline"
                            className="bg-[#044cac]/10 text-[#044cac]"
                          >
                            {club}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="mt-6">
                    <h4 className="font-semibold mb-3">Vision & Mission</h4>
                    <p className="text-muted-foreground">
                      {college.visionMission}
                    </p>
                  </div>
                  <div className="mt-6">
                    <h4 className="font-semibold mb-3">Notable Alumni</h4>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {college.notableAlumni.map((alumnus, index) => (
                        <div
                          key={index}
                          className="p-3 border rounded-lg bg-[#044cac]/5"
                        >
                          <div className="font-medium">{alumnus.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {alumnus.achievement}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "courses" && (
            <div className="space-y-6">
              <Card className="border-none shadow-none p-0">
                <CardHeader className="p-0">
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5 text-[#044cac]" />
                    Courses Offered
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="grid gap-6">
                    {college.courses.map((course) => (
                      <div
                        key={course.id}
                        className="border rounded-lg p-4 bg-[#044cac]/5"
                      >
                        <div className="flex justify-between items-start mb-3">
                          <h4 className="font-semibold text-lg">
                            {course.name}
                          </h4>
                          <Badge
                            variant="outline"
                            className="bg-[#044cac]/10 text-[#044cac]"
                          >
                            {course.duration}
                          </Badge>
                        </div>
                        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Fees:</span>
                            <div className="font-medium">
                              ₹{(course.fees / 100000).toFixed(1)}L
                            </div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">
                              Seats:
                            </span>
                            <div className="font-medium">{course.seats}</div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">
                              Eligibility:
                            </span>
                            <div className="font-medium">
                              {course.eligibility}
                            </div>
                          </div>
                        </div>
                        <div className="mt-3 text-sm text-muted-foreground">
                          <span className="font-semibold">
                            Program Highlights:
                          </span>{" "}
                          {course.highlights}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 text-center">
                    <Button
                      variant="outline"
                      className="bg-transparent border-[#044cac] text-[#044cac] hover:bg-[#044cac] hover:text-white"
                    >
                      <BookOpen className="h-4 w-4 mr-2" />
                      View Detailed Syllabus
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "admission" && (
            <div className="space-y-6">
              <Card className="border-none shadow-none p-0">
                <CardHeader className="p-0">
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-[#044cac]" />
                    Admission Process
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold mb-3">Entrance Exams</h4>
                      <div className="flex flex-wrap gap-2">
                        {college.admissionProcess.exams.map((exam) => (
                          <Badge
                            key={exam}
                            variant="secondary"
                            className="bg-[#044cac]/20 text-[#044cac]"
                          >
                            {exam}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">Admission Criteria</h4>
                      <p className="text-muted-foreground mb-4">
                        {college.admissionProcess.criteria}
                      </p>
                      <p className="text-muted-foreground">
                        The admission process includes application submission,
                        entrance exam scores, and counseling rounds. Shortlisted
                        candidates may need to attend interviews or group
                        discussions for specific programs.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">
                        Application Process
                      </h4>
                      <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-2">
                        <li>
                          Register on the official {college.name} website.
                        </li>
                        <li>
                          Fill out the application form with accurate details.
                        </li>
                        <li>
                          Upload required documents (transcripts, ID proof,
                          etc.).
                        </li>
                        <li>
                          Pay the application fee of ₹
                          {college.admissionProcess.applicationFee / 1000}K.
                        </li>
                        <li>
                          Attend counseling or interviews as per schedule.
                        </li>
                      </ol>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">Important Dates</h4>
                      <div className="text-sm text-muted-foreground">
                        {college.admissionProcess.importantDates.map(
                          (date, index) => (
                            <div
                              key={index}
                              className="flex justify-between items-center border-b pb-2 mb-2"
                            >
                              <span>{date.event}</span>
                              <span className="font-medium">{date.date}</span>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                    <div className="text-center">
                      <Button
                        variant="outline"
                        className="bg-transparent border-[#044cac] text-[#044cac] hover:bg-[#044cac] hover:text-white"
                      >
                        <Mail className="h-4 w-4 mr-2" />
                        Apply Now
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "fees" && (
            <div className="space-y-6">
              <Card className="border-none shadow-none p-0">
                <CardHeader className="p-0">
                  <CardTitle className="flex items-center gap-2">
                    <IndianRupee className="h-5 w-5 text-[#044cac]" />
                    Fee Structure
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="space-y-6">
                    <div className="bg-[#044cac]/5 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-[#044cac] mb-2">
                        ₹{(college.fees.min / 100000).toFixed(1)}L - ₹
                        {(college.fees.max / 100000).toFixed(1)}L
                      </div>
                      <div className="text-muted-foreground">
                        Total Course Fees
                      </div>
                    </div>
                    <div className="grid gap-4">
                      {college.courses.map((course) => (
                        <div
                          key={course.id}
                          className="flex justify-between items-center border-b pb-2"
                        >
                          <span>{course.name}</span>
                          <span className="font-semibold">
                            ₹{(course.fees / 100000).toFixed(1)}L
                          </span>
                        </div>
                      ))}
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">Additional Fees</h4>
                      <div className="text-sm text-muted-foreground">
                        <div className="flex justify-between items-center border-b pb-2 mb-2">
                          <span>Hostel Fees (Annual):</span>
                          <span className="font-medium">
                            ₹
                            {(college.additionalFees.hostel / 100000).toFixed(
                              1
                            )}
                            L
                          </span>
                        </div>
                        <div className="flex justify-between items-center border-b pb-2">
                          <span>Mess Fees (Annual):</span>
                          <span className="font-medium">
                            ₹{(college.additionalFees.mess / 100000).toFixed(1)}
                            L
                          </span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">Scholarships</h4>
                      <div className="grid gap-4">
                        {college.scholarships.map((scholarship, index) => (
                          <div
                            key={index}
                            className="p-3 border rounded-lg bg-[#044cac]/5"
                          >
                            <div className="font-medium">
                              {scholarship.name}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {scholarship.description}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="text-center">
                      <Button
                        variant="outline"
                        className="bg-transparent border-[#044cac] text-[#044cac] hover:bg-[#044cac] hover:text-white"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download Fee Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "facilities" && (
            <div className="space-y-6">
              <Card className="border-none shadow-none p-0">
                <CardHeader className="p-0">
                  <CardTitle className="flex items-center gap-2">
                    <Building className="h-5 w-5 text-[#044cac]" />
                    Campus Facilities
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                    {college.facilities.map((facility) => (
                      <div
                        key={facility}
                        className="flex items-center gap-2 p-3 border rounded-lg bg-[#044cac]/5"
                      >
                        <Building className="h-5 w-5 text-[#044cac]" />
                        <span>{facility}</span>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold mb-3">Hostel Facilities</h4>
                      <div className="flex gap-4 mb-3">
                        {college.hostel.boys && (
                          <Badge
                            variant="outline"
                            className="bg-blue-50 text-blue-700"
                          >
                            Boys Hostel Available
                          </Badge>
                        )}
                        {college.hostel.girls && (
                          <Badge
                            variant="outline"
                            className="bg-pink-50 text-pink-700"
                          >
                            Girls Hostel Available
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {college.hostelDetails}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">Campus Highlights</h4>
                      <p className="text-sm text-muted-foreground">
                        {college.campusHighlights}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "placement" && (
            <div className="space-y-6">
              <Card className="border-none shadow-none p-0">
                <CardHeader className="p-0">
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-[#044cac]" />
                    Placement Records
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600 mb-1">
                        ₹
                        {(college.placement.averagePackage / 100000).toFixed(1)}
                        L
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Average Package
                      </div>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600 mb-1">
                        ₹
                        {(college.placement.highestPackage / 100000).toFixed(1)}
                        L
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Highest Package
                      </div>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600 mb-1">
                        {college.placement.placementRate}%
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Placement Rate
                      </div>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold mb-3">Top Recruiters</h4>
                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
                        {college.placement.topRecruiters.map((recruiter) => (
                          <div
                            key={recruiter}
                            className="p-3 border rounded-lg text-center bg-[#044cac]/5"
                          >
                            {recruiter}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">Placement Process</h4>
                      <p className="text-sm text-muted-foreground">
                        {college.placement.placementProcess}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">
                        Notable Placement Highlights
                      </h4>
                      <div className="grid gap-4">
                        {college.placement.highlights.map(
                          (highlight, index) => (
                            <div
                              key={index}
                              className="p-3 border rounded-lg bg-[#044cac]/5"
                            >
                              <div className="text-sm text-muted-foreground">
                                {highlight}
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="space-y-6">
              <Card className="border-none shadow-none p-0">
                <CardHeader className="p-0">
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-[#044cac]" />
                    Student Reviews
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="space-y-6">
                    <div className="text-center p-4 bg-[#044cac]/5 rounded-lg">
                      <div className="text-2xl font-bold text-[#044cac] mb-1">
                        {college.rating}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Average Rating ({college.reviews} Reviews)
                      </div>
                    </div>
                    <div className="space-y-4">
                      {college.reviews_data.map((review) => (
                        <div key={review.id} className="border-b pb-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">
                                {review.studentName}
                              </span>
                              <Badge
                                variant="outline"
                                className="text-xs bg-[#044cac]/10 text-[#044cac]"
                              >
                                {review.course}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm">{review.rating}</span>
                            </div>
                          </div>
                          <p className="text-muted-foreground text-sm mb-2">
                            {review.comment}
                          </p>
                          <div className="text-xs text-muted-foreground">
                            {review.year} •{" "}
                            {new Date(review.date).toLocaleDateString()}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="text-center">
                      <Button
                        variant="outline"
                        className="bg-transparent border-[#044cac] text-[#044cac] hover:bg-[#044cac] hover:text-white"
                      >
                        Submit Your Review
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "gallery" && (
            <div className="space-y-6">
              <Card className="border-none shadow-none p-0">
                <CardHeader className="p-0">
                  <CardTitle className="flex items-center gap-2">
                    <Building className="h-5 w-5 text-[#044cac]" />
                    Campus Gallery
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <Carousel className="w-full max-w-full">
                    <CarouselContent>
                      {college.gallery.map((image, index) => (
                        <CarouselItem
                          key={index}
                          className="md:basis-1/2 lg:basis-1/3"
                        >
                          <div className="relative h-64 w-full overflow-hidden rounded-lg">
                            <Image
                              src={`/college/${image}` || "/placeholder.svg"}
                              alt={`${college.name} campus ${index + 1}`}
                              fill
                              className="object-cover"
                            />
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                  </Carousel>
                  <div className="mt-6">
                    <h4 className="font-semibold mb-3">Virtual Tour</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Explore the campus through our interactive virtual tour,
                      showcasing key facilities and student life.
                    </p>
                    <div className="text-start">
                      <Button
                        variant="outline"
                        className="bg-transparent border-[#044cac] text-[#044cac] hover:bg-[#044cac] hover:text-white"
                      >
                        Take Virtual Tour
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
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
              <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                <Phone className="h-4 w-4 mr-2" />
                Schedule Counseling
              </Button>
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
