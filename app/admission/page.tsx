
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { ApplicationForm } from "@/components/admission/ApplicationForm";

import { ToolsAndResources } from "@/components/admission/ToolsAndResources";
import Image from "next/image";

export default function AdmissionPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header isSticky={false} />
        <div className="bg-gradient-to-b from-[#044cac] to-[#033a8a] text-white">
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col lg:flex-row gap-8 items-center">
                    <div className="lg:w-1/3 lg:flex-shrink-0">
                        <div className="lg:relative  lg:h-64 rounded-lg lg:overflow-hidden">
                            <Image src="/happy-student-with-graduation-cap-and-certificate.jpg" alt="Happy Student"  
                            width={1000}
                            height={1000}
                              className="h-64 object-cover rounded-lg"
                            />
                        </div>
                    </div>
                    <div className="flex-1">
                        <h1 className="text-4xl font-bold mb-2">Select & Apply</h1>
                        <p className="text-lg text-white/90 mb-4 font-semibold">
                            Secure Your Future with Our Online Degree Programs
                        </p>
                        <p className="text-white/80">
                            We will provide expert guidance and personalised college counselling tailored to your unique profile. You'll receive authentic feedback and reviews from admitted students, while we streamline the entire admission process for ease and efficiency. Best Online Courses to Advance Career with online Degree Programs. From Specializations to Global Experiences, Unleash Your Leadership Potential with the Best online Courses Available.
                        </p>
                    </div>
                </div>
            </div>
        </div>
      <main className="container mx-auto px-4 py-8">


        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <ApplicationForm />
          </div>
          <div>
            <ToolsAndResources />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
