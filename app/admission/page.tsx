
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { ApplicationForm } from "@/components/admission/ApplicationForm";
import { ApplicationTracker } from "@/components/admission/ApplicationTracker";
import { ToolsAndResources } from "@/components/admission/ToolsAndResources";
import Image from "next/image";

export default function AdmissionPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header isSticky={false} />
        <div className="bg-gradient-to-b from-[#044cac] to-[#033a8a] text-white">
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col lg:flex-row gap-8 items-center">
                    <div className="lg:w-1/3 flex-shrink-0">
                        <div className="relative h-64 rounded-lg overflow-hidden">
                            <Image src="/happy-student-with-graduation-cap-and-certificate.jpg" alt="Happy Student" layout="fill" objectFit="cover" />
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
        <div className="mb-8 p-6 bg-gray-100 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Application Steps:</h3>
            <ol className="list-decimal list-inside space-y-2 text-gray-600">
                <li>Fill out the common application form with your personal details.</li>
                <li>Select the college you want to apply to from our curated list.</li>
                <li>Choose the course you are interested in at your selected college.</li>
                <li>Submit your application and wait for the good news!</li>
            </ol>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <ApplicationForm />
            <ApplicationTracker />
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
