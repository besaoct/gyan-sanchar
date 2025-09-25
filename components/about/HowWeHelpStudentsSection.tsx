
import { User, Search, Award, FileText } from "lucide-react";

export function HowWeHelpStudentsSection() {
  const services = [
    {
      icon: <User className="h-10 w-10 text-primary" />,
      title: "Personalized Counseling",
      description: "Our expert counselors provide one-on-one guidance to help you choose the right career path and college.",
    },
    {
      icon: <Search className="h-10 w-10 text-primary" />,
      title: "Course & College Search",
      description: "Our powerful search tools allow you to explore thousands of courses and colleges to find the perfect fit for you.",
    },
    {
      icon: <Award className="h-10 w-10 text-primary" />,
      title: "Scholarship & Exam Updates",
      description: "Stay updated with the latest information on scholarships and entrance exams to never miss an opportunity.",
    },
    {
      icon: <FileText className="h-10 w-10 text-primary" />,
      title: "Application & Admission Assistance",
      description: "We provide complete support throughout the application and admission process, making it hassle-free for you.",
    },
  ];

  return (
    <div className="bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-primary mb-12">How We Help Students</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div key={index} className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="flex justify-center mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
