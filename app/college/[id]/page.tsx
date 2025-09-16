"use client"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
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
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { collegesData } from "@/lib/colleges-data"
import Header from "@/components/common/Header"
import Footer from "@/components/common/Footer"

interface CollegeDetailPageProps {
  params: {
    id: string
  }
}

export default function CollegeDetailPage({ params }: CollegeDetailPageProps) {
  const college = collegesData.find((c) => c.id === params.id)

  if (!college) {
    notFound()
  }

  return (
   <div className="min-h-screen bg-white">
    <Header />
      <div className="bg-[#044cac] text-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/colleges">
                <Button variant="ghost" size="sm" className="text-white hover:text-white/80 hover:bg-white/10">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Search
                </Button>
              </Link>
  
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/80 ">
                <Share2 className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/80 ">
                <Heart className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-b from-[#044cac] to-[#033a8a] text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-80 flex-shrink-0">
              <div className="relative h-64 rounded-lg overflow-hidden">
                <Image src={`/college/${college.image}` || "/placeholder.svg"} alt={college.name} fill className="object-cover" />
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{college.name}</h1>
                  <div className="flex items-center gap-4 text-white/80 mb-4">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {college.location.city}, {college.location.state}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Est. {college.established}
                    </div>
                    <Badge variant="secondary" className="bg-white/20 text-white">
                      {college.type}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6 mb-4">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="text-xl font-semibold">{college.rating}</span>
                  <span className="text-white/80">({college.reviews} Reviews)</span>
                </div>
                {college.ranking.nirf && (
                  <div className="flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    <span className="font-semibold">#{college.ranking.nirf} NIRF Ranking</span>
                  </div>
                )}
              </div>

              <p className="text-white/90 mb-6 leading-relaxed">{college.description}</p>

              <div className="flex flex-wrap gap-2 mb-6">
                {college.streams.map((stream) => (
                  <Badge key={stream} variant="secondary" className="bg-white/20 text-white">
                    {stream}
                  </Badge>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                  <Phone className="h-4 w-4 mr-2" />
                  Get Counseling
                </Button>
                <Button
                  variant="outline"
                  className="bg-transparent border-white text-white hover:bg-white hover:text-[#044cac]"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Brochure
                </Button>
                <Button
                  variant="outline"
                  className="bg-transparent border-white text-white hover:bg-white hover:text-[#044cac]"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Apply Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#044cac] mb-1">
                ₹{(college.placement.averagePackage / 100000).toFixed(1)}L
              </div>
              <div className="text-sm text-muted-foreground">Average Package</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#044cac] mb-1">{college.placement.placementRate}%</div>
              <div className="text-sm text-muted-foreground">Placement Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#044cac] mb-1">
                {college.campusLife.studentStrength.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Students</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#044cac] mb-1">{college.campusLife.facultyRatio}</div>
              <div className="text-sm text-muted-foreground">Faculty Ratio</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="admission">Admission</TabsTrigger>
            <TabsTrigger value="fees">Fee Structure</TabsTrigger>
            <TabsTrigger value="facilities">Facilities</TabsTrigger>
            <TabsTrigger value="placement">Placements</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="gallery">Gallery</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>About {college.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed mb-6">{college.description}</p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Key Information</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Established:</span>
                        <span className="font-medium">{college.established}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Type:</span>
                        <span className="font-medium">{college.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Location:</span>
                        <span className="font-medium">
                          {college.location.city}, {college.location.state}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Student Strength:</span>
                        <span className="font-medium">{college.campusLife.studentStrength.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Accreditation</h4>
                    <div className="flex flex-wrap gap-2">
                      {college.accreditation.map((acc) => (
                        <Badge key={acc} variant="outline">
                          {acc}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="courses" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Courses Offered</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {college.courses.map((course) => (
                    <div key={course.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold">{course.name}</h4>
                        <Badge variant="outline">{course.duration}</Badge>
                      </div>
                      <div className="grid md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Fees:</span>
                          <div className="font-medium">₹{(course.fees / 100000).toFixed(1)}L</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Seats:</span>
                          <div className="font-medium">{course.seats}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Eligibility:</span>
                          <div className="font-medium">{course.eligibility}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="admission" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Admission Process</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3">Entrance Exams</h4>
                    <div className="flex flex-wrap gap-2">
                      {college.admissionProcess.exams.map((exam) => (
                        <Badge key={exam} variant="secondary">
                          {exam}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Admission Criteria</h4>
                    <p className="text-muted-foreground">{college.admissionProcess.criteria}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="fees" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Fee Structure</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-muted rounded-lg p-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[#044cac] mb-2">
                        ₹{(college.fees.min / 100000).toFixed(1)}L - ₹{(college.fees.max / 100000).toFixed(1)}L
                      </div>
                      <div className="text-muted-foreground">Total Course Fees</div>
                    </div>
                  </div>
                  <div className="grid gap-4">
                    {college.courses.map((course) => (
                      <div key={course.id} className="flex justify-between items-center border-b pb-2">
                        <span>{course.name}</span>
                        <span className="font-semibold">₹{(course.fees / 100000).toFixed(1)}L</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="facilities" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Campus Facilities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {college.facilities.map((facility) => (
                    <div key={facility} className="flex items-center gap-2 p-3 border rounded-lg">
                      <Building className="h-5 w-5 text-[#044cac]" />
                      <span>{facility}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <h4 className="font-semibold mb-3">Hostel Facilities</h4>
                  <div className="flex gap-4">
                    {college.hostel.boys && (
                      <Badge variant="outline" className="bg-blue-50 text-blue-700">
                        Boys Hostel Available
                      </Badge>
                    )}
                    {college.hostel.girls && (
                      <Badge variant="outline" className="bg-pink-50 text-pink-700">
                        Girls Hostel Available
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="placement" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Placement Records</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600 mb-1">
                      ₹{(college.placement.averagePackage / 100000).toFixed(1)}L
                    </div>
                    <div className="text-sm text-muted-foreground">Average Package</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600 mb-1">
                      ₹{(college.placement.highestPackage / 100000).toFixed(1)}L
                    </div>
                    <div className="text-sm text-muted-foreground">Highest Package</div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600 mb-1">{college.placement.placementRate}%</div>
                    <div className="text-sm text-muted-foreground">Placement Rate</div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Top Recruiters</h4>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
                    {college.placement.topRecruiters.map((recruiter) => (
                      <div key={recruiter} className="p-3 border rounded-lg text-center">
                        {recruiter}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Student Reviews</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {college.reviews_data.map((review) => (
                    <div key={review.id} className="border-b pb-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{review.studentName}</span>
                          <Badge variant="outline" className="text-xs">
                            {review.course}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm">{review.rating}</span>
                        </div>
                      </div>
                      <p className="text-muted-foreground text-sm mb-2">{review.comment}</p>
                      <div className="text-xs text-muted-foreground">
                        {review.year} • {new Date(review.date).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="gallery" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Campus Gallery</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {college.gallery.map((image, index) => (
                    <div key={index} className="relative h-48 rounded-lg overflow-hidden">
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`${college.name} campus ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* CTA Section */}
      <div className="bg-[#044cac] text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Ready to Apply?</h3>
            <p className="text-white/80 mb-6">Get personalized counseling and application assistance</p>
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
      <Footer />
    </div>
  )
}
