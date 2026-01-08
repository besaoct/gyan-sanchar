"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import Image from "next/image";
import { BASE_URL } from "@/lib/api/config/urls";

interface VisaData {
  id: number;
  button_text: string;
  visa_title: string;
  visa_description: string[];
  visa_process: string;
  image1: string;
  image2: string;
}

export default function StudentVAPage() {
  const { toast } = useToast();

  const [visaData, setVisaData] = useState<VisaData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Form state
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [motherName, setMotherName] = useState("");
  const [dob, setDob] = useState("");
  const [passportNumber, setPassportNumber] = useState("");
  const [passportValidity, setPassportValidity] = useState("");
  const [studyCountry, setStudyCountry] = useState("");
  const [fullAddress, setFullAddress] = useState("");
  const [parentsAccompany, setParentsAccompany] = useState(false);
  const [university, setUniversity] = useState("");
  const [course, setCourse] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [sponsorType, setSponsorType] = useState("");
  const [emergencyContact, setEmergencyContact] = useState("");

  useEffect(() => {
    const fetchVisaData = async () => {
      try {
        const response = await fetch("https://gitcsdemoserver.online/gyansanchar/public/api/v1/visa-button");
        const data = await response.json();
        if (data.success) {
          setVisaData(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch visa data:", error);
      }
    };

    fetchVisaData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const universityCourse = course && university 
      ? `${course.trim()} - ${university.trim()}` 
      : course || university || "";

    try {
      const response = await fetch("https://gitcsdemoserver.online/gyansanchar/public/api/v1/visa-form-store", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name,
          phone,
          email,
          father_name: fatherName,
          mother_name: motherName,
          dob,
          passport_number: passportNumber,
          passport_validity: passportValidity,
          study_country: studyCountry,
          full_address: fullAddress,
          parents_accompany: parentsAccompany ? "Yes" : "No",
          university_course: universityCourse,
          travel_date: travelDate,
          sponsor_type: sponsorType,
          emergency_contact: emergencyContact,
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast({
          title: "Form Submitted!",
          description: "Your student visa application has been submitted.",
          style: {
            color: "white"
          }
        });
      } else {
        throw new Error(result.message || "An unknown error occurred.");
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to submit form. Please try again.",
        variant: "destructive",
           style: {
            color: "white"
          }
      });
    } finally {
      setIsLoading(false);
    }
  };


  const image_1 =  visaData?.image1 ? `${BASE_URL}/${visaData.image1}` : null;
    const image_2 =  visaData?.image2 ? `${BASE_URL}/${visaData.image2}` : null;

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row justify-center items-center lg:items-stretch gap-8">
          <div className="w-full hidden lg:block lg:max-w-sm lg:w-1/4">
            <Image src={ image_1 || "/placeholder.svg"} alt="Creative image" width={300} height={500} className="rounded-lg object-cover w-full h-full"/>
          </div>
          <div className="w-full lg:w-1/2">
            <div className="p-8 border rounded-lg h-full">
              <h1 className="text-2xl font-bold mb-4 text-start">Student Visa Application</h1>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="mb-2" htmlFor="name">Name</Label>
                    <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required disabled={isLoading} />
                  </div>
                  <div>
                    <Label className="mb-2" htmlFor="phone">Phone</Label>
                    <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required disabled={isLoading} />
                  </div>
                  <div>
                    <Label className="mb-2" htmlFor="email">Email</Label>
                    <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required disabled={isLoading} />
                  </div>
                  <div>
                    <Label className="mb-2" htmlFor="fatherName">Father&apos;s Name</Label>
                    <Input id="fatherName" value={fatherName} onChange={(e) => setFatherName(e.target.value)} required disabled={isLoading} />
                  </div>
                  <div>
                    <Label className="mb-2" htmlFor="motherName">Mother&apos;s Name</Label>
                    <Input id="motherName" value={motherName} onChange={(e) => setMotherName(e.target.value)} required disabled={isLoading} />
                  </div>
                  <div>
                    <Label className="mb-2" htmlFor="dob">Date of Birth</Label>
                    <Input id="dob" type="date" value={dob} onChange={(e) => setDob(e.target.value)} required disabled={isLoading} />
                  </div>
                  <div>
                    <Label className="mb-2" htmlFor="passportNumber">Passport Number</Label>
                    <Input id="passportNumber" value={passportNumber} onChange={(e) => setPassportNumber(e.target.value)} required disabled={isLoading} />
                  </div>
                  <div>
                    <Label className="mb-2" htmlFor="passportValidity">Passport Validity</Label>
                    <Input id="passportValidity" type="date" value={passportValidity} onChange={(e) => setPassportValidity(e.target.value)} required disabled={isLoading} />
                  </div>
                  <div>
                    <Label className="mb-2" htmlFor="studyCountry">Study Country</Label>
                    <Input id="studyCountry" value={studyCountry} onChange={(e) => setStudyCountry(e.target.value)} required disabled={isLoading} />
                  </div>
                  <div>
                    <Label className="mb-2" htmlFor="fullAddress">Full Address</Label>
                    <Input id="fullAddress" value={fullAddress} onChange={(e) => setFullAddress(e.target.value)} required disabled={isLoading} />
                  </div>
                  <div>
                    <Label className="mb-2" htmlFor="course">Course</Label>
                    <Input id="course" value={course} onChange={(e) => setCourse(e.target.value)} required disabled={isLoading} />
                  </div>
                  <div>
                    <Label className="mb-2" htmlFor="university">University</Label>
                    <Input id="university" value={university} onChange={(e) => setUniversity(e.target.value)} required disabled={isLoading} />
                  </div>
                  <div>
                    <Label className="mb-2" htmlFor="travelDate">Travel Date</Label>
                    <Input id="travelDate" type="date" value={travelDate} onChange={(e) => setTravelDate(e.target.value)} required disabled={isLoading} />
                  </div>
                  <div>
                    <Label className="mb-2" htmlFor="sponsorType">Sponsor Type</Label>
                    <Input id="sponsorType" value={sponsorType} onChange={(e) => setSponsorType(e.target.value)} required disabled={isLoading} />
                  </div>
                  <div>
                    <Label className="mb-2" htmlFor="emergencyContact">Emergency Contact</Label>
                    <Input id="emergencyContact" value={emergencyContact} onChange={(e) => setEmergencyContact(e.target.value)} required disabled={isLoading} />
                  </div>
                </div>
                <div className="flex items-start space-x-2 mt-2">
                  <Checkbox
                    id="parentsAccompany"
                    checked={parentsAccompany}
                    onCheckedChange={(checked) => setParentsAccompany(!!checked)}
                    disabled={isLoading}
                  />
                  <Label htmlFor="parentsAccompany">Are parents accompanying?</Label>
                </div>
                <Button type="submit" className="w-full mt-4" disabled={isLoading}>
                  {isLoading ? "Submitting..." : "Submit Application"}
                </Button>
              </form>
            </div>
          </div>
          <div className="w-full hidden lg:block lg:max-w-sm lg:w-1/4">
             <Image src={ image_2 || "/placeholder.svg"}  alt="Creative image" width={300} height={500} className="rounded-lg object-cover w-full h-full"/>
          </div>
        </div>

       <div className="w-full lg:hidden flex justify-center mt-8 gap-4">
             <Image src={ image_1 || "/placeholder.svg"}  alt="Creative image" width={300} height={500} className="rounded-lg object-cover w-full h-full"/>
             <Image src={ image_2 || "/placeholder.svg"}  alt="Creative image" width={300} height={500} className="rounded-lg object-cover w-full h-full"/>

          </div>

        {visaData && (
          <div className="mt-12 p-8 border rounded-lg">
            <h2 className="text-xl font-bold mb-4">{visaData.visa_title}</h2>
            {visaData.visa_description.map((desc, index) => (
              <p key={index} className="mb-2 text-sm">{desc}</p>
            ))}

            <h2 className="text-xl font-bold my-4">Process</h2>

                    {visaData.visa_process? (
                          <div className="htmlContent ">
                            <div
                              dangerouslySetInnerHTML={{
                                __html: visaData.visa_process,
                              }}
                            />
                          </div>
                        ) : (
                          <></>
                        )}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
