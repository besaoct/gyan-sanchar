'use client'

import Header from "@/components/common/Header"
import Footer from "@/components/common/Footer"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "What is Gyan Sanchaar?",
    answer:
      "Gyan Sanchaar is a free-to-use educational platform that helps students discover colleges, courses, exams, and admission information. We provide counselling and application assistance at no cost to students.",
  },
  {
    question: "How much does it cost to use Gyan Sanchaar?",
    answer:
      "Our platform is completely free for students. We do not charge any fees for accessing information, receiving counselling, or applying to colleges through our portal.",
  },
  {
    question: "Do you guarantee admission into a college?",
    answer:
      "No, Gyan Sanchaar does not guarantee admission. Admission decisions are made solely by the colleges and universities. We act as a facilitator to help you find the best options and apply efficiently.",
  },
  {
    question: "How do I start my college search?",
    answer:
      "You can start by using our search filters on the 'Colleges' or 'Courses' pages. You can filter by stream, location, course, and other preferences to find the best fit for you.",
  },
  {
    question: "What is the counselling service and how can I use it?",
    answer:
      "Our free counselling service connects you with expert counsellors who can guide you through your career and college choices. You can request a call back from our 'Contact Us' page or through various forms on the website.",
  },
  {
    question: "Is my personal information safe with you?",
    answer:
      "Yes, we take data privacy seriously. We use your information to provide our services and share it only with the colleges you choose to apply to. Please review our Privacy Policy for more details.",
  },
  {
    question: "How do I apply to a college through the platform?",
    answer:
      "Once you have selected a college, you can often find an 'Apply Now' button or link on the college's page. This will guide you through the application process, which may be on our platform or the college's official website.",
  },
    {
    question: "Who should I contact for refund-related queries?",
    answer:
      "Gyan Sanchaar does not collect any payments from students. All fees are paid directly to the educational institutions. For any refund-related questions, you must contact the specific college or university where you made the payment.",
  },
]

export default function HelpCenterPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold">Help Center</h1>
            <p className="text-gray-600 mt-2">
              Find answers to your questions.
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem value={`item-${index}`} key={index}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}
