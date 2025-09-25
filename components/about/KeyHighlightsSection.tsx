
import { Building, Users, Award, UserCheck } from "lucide-react";

export function KeyHighlightsSection() {
  const stats = [
    {
      icon: <Building className="h-12 w-12 text-primary" />,
      value: "1,000+",
      label: "Colleges Listed",
    },
    {
      icon: <Users className="h-12 w-12 text-primary" />,
      value: "50,000+",
      label: "Students Served",
    },
    {
      icon: <Award className="h-12 w-12 text-primary" />,
      value: "50+",
      label: "University Partnerships",
    },
    {
      icon: <UserCheck className="h-12 w-12 text-primary" />,
      value: "100+",
      label: "Active Counselors",
    },
  ];

  return (
    <div className="bg-white py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-primary mb-12">Our Achievements</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center">
              {stat.icon}
              <p className="text-4xl font-bold text-gray-800 mt-4">{stat.value}</p>
              <p className="text-lg text-gray-600 mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
