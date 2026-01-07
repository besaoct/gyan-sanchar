"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Checkbox } from "../ui/checkbox";


interface VisaData {
  id: number;
  button_text: string;
  visa_title: string;
  visa_description: string[];
}

export function StudentVisaFormButton({isPageButton=false}:{ isPageButton?: boolean}) {
  const { toast } = useToast();
  const router = useRouter();

  const [visaData, setVisaData] = useState<VisaData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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
  const [university, setUniversity] = useState("");        // New
  const [course, setCourse] = useState("");                // New
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

    // Combine university and course
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
          university_course: universityCourse,  // Combined value sent to API
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
        setIsDialogOpen(false);
        // Reset form or redirect
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

  if (!visaData) {
    return (
      <Button className="w-full text-sm lg:hidden" disabled>
        Loading...
      </Button>
    );
  }

  return (

    isPageButton ?
         <Button className="w-full text-sm " onClick={()=> router.push("/student-va")}>
          {visaData.button_text}
        </Button>
        
        :


    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button className="w-full text-sm ">
          {visaData.button_text}
        </Button>
      </DialogTrigger>
      <DialogContent className="lg:max-w-4xl sm:max-w-3xl w-full p-0 h-[96%] !overflow-auto">
        <div className="flex flex-col-reverse sm:flex-row w-full">
          <div className="sm:w-1/2 bg-primary sm:rounded-l-lg text-white p-8 flex flex-col justify-start ">
            <h2 className="text-2xl font-bold mb-4 text-left ">{visaData.visa_title}</h2>
            <DialogDescription className="text-white">
              {visaData.visa_description.map((desc, index) => (
                <p key={index} className="mb-2">{desc}</p>
              ))}
            </DialogDescription>
          </div>
          <div className="sm:w-1/2 p-8">
            <DialogHeader className="mt-4">
              <DialogTitle className="mb-4 text-left">Student Visa Application</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2 overflow-y-auto">
              <div className="flex flex-col lg:grid lg:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required disabled={isLoading} />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required disabled={isLoading} />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required disabled={isLoading} />
                </div>
                <div>
                  <Label htmlFor="fatherName">Father&apos;s Name</Label>
                  <Input id="fatherName" value={fatherName} onChange={(e) => setFatherName(e.target.value)} required disabled={isLoading} />
                </div>
                <div>
                  <Label htmlFor="motherName">Mother&apos;s Name</Label>
                  <Input id="motherName" value={motherName} onChange={(e) => setMotherName(e.target.value)} required disabled={isLoading} />
                </div>
                <div>
                  <Label htmlFor="dob">Date of Birth</Label>
                  <Input id="dob" type="date" value={dob} onChange={(e) => setDob(e.target.value)} required disabled={isLoading} />
                </div>
                <div>
                  <Label htmlFor="passportNumber">Passport Number</Label>
                  <Input id="passportNumber" value={passportNumber} onChange={(e) => setPassportNumber(e.target.value)} required disabled={isLoading} />
                </div>
                <div>
                  <Label htmlFor="passportValidity">Passport Validity</Label>
                  <Input id="passportValidity" type="date" value={passportValidity} onChange={(e) => setPassportValidity(e.target.value)} required disabled={isLoading} />
                </div>
                <div>
                  <Label htmlFor="studyCountry">Study Country</Label>
                  <Input id="studyCountry" value={studyCountry} onChange={(e) => setStudyCountry(e.target.value)} required disabled={isLoading} />
                </div>
                <div>
                  <Label htmlFor="fullAddress">Full Address</Label>
                  <Input id="fullAddress" value={fullAddress} onChange={(e) => setFullAddress(e.target.value)} required disabled={isLoading} />
                </div>

                {/* Separate University and Course fields */}
                <div>
                  <Label htmlFor="course">Course</Label>
                  <Input id="course" value={course} onChange={(e) => setCourse(e.target.value)} required disabled={isLoading} />
                </div>
                <div>
                  <Label htmlFor="university">University</Label>
                  <Input id="university" value={university} onChange={(e) => setUniversity(e.target.value)} required disabled={isLoading} />
                </div>

                <div>
                  <Label htmlFor="travelDate">Travel Date</Label>
                  <Input id="travelDate" type="date" value={travelDate} onChange={(e) => setTravelDate(e.target.value)} required disabled={isLoading} />
                </div>
                <div>
                  <Label htmlFor="sponsorType">Sponsor Type</Label>
                  <Input id="sponsorType" value={sponsorType} onChange={(e) => setSponsorType(e.target.value)} required disabled={isLoading} />
                </div>
                <div>
                  <Label htmlFor="emergencyContact">Emergency Contact</Label>
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
      </DialogContent>
    </Dialog>
  );
}

export default StudentVisaFormButton;