'use client'

import { useRouter } from "next/navigation"

interface CollegesDropdownProps {
  onClose: () => void
}

export default function CollegesDropdown({ onClose }: CollegesDropdownProps) {
  const collegesByDegrees = [
    'BP Pharmacy colleges in india',
    'BA + LLB colleges in india',
    'LLM colleges in india',
    'BCom + LLB colleges in india',
    'BBA + LLB colleges in india',
  ]

  const collegesByLocation = [
    'Law Colleges in Maharashtra',
    'Law Colleges in Tamil Nadu',
    'Law Colleges in Delhi NCR',
    'Law Colleges in Karnataka',
    'Law Colleges in Uttar Pradesh',
  ]

  const popularColleges = [
    'Shoolini University Solan',
    'IMS Unison University',
    'Parul University',
    'Jagannath University NCR Haryana',
    'Chandigarh Group of College Jhanjeri',
    'Chandigarh University',
    'GITAM (Deemed To Be University), Hyderabad',
    'Delhi Metropolitan Education',
    'Invertis University',
    'Jagannath University Jaipur',
    'K.R. Mangalam University',
    'LPU',
    "Lingaya's Vidyapeeth",
  ]

  const topColleges = [
    'NLSIU Bangalore',
    'NLU Delhi',
    'NALSAR University of Law, Tamil Nadu',
    'NLIU Bhopal',
    'Symbiosis Law School, Noida',
    'ILS Law College, Pune',
    'Gujarat National Law University, Ghandinagar',
    'O.P. Jindal Global University',
    'NLU Jodhpur',
    'Banaras Hindu University, Varanasi',
  ]

  const categories = [
    'Engineering',
    'Management',
    'Commerce & Banking',
    'Medical',
    'Sciences',
    'Hotel Management',
    'Information Technology',
    'Arts & Humanities',
    'Mass Communication',
    'Nursing',
    'Agriculture',
    'Design',
    'Law',
    'Pharmacy',
    'Para Medical',
    'Dental',
    'Performing Arts',
    'Education',
  ]

  const router = useRouter();
  return (
    <div className="bg-white border-b border-gray-200 shadow-2xl absolute w-full top-28 left-0 z-40 max-h-[calc(100vh-4rem)] overflow-y-auto"
      onClick={ ()=> router.push('/colleges')}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {/* Left Sidebar - Categories */}
          <div className="bg-blue-50 p-4 md:p-6 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-4 text-sm">Categories</h3>
            <ul className="space-y-2 max-h-96 overflow-y-auto">
              {categories.map((category) => (
                <li key={category}>
                  <a href="#" className="text-blue-900 hover:text-blue-600 text-sm">
                    {category}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Colleges By Degrees */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4 text-sm">Colleges By Degrees</h3>
            <ul className="space-y-2">
              {collegesByDegrees.map((degree) => (
                <li key={degree}>
                  <a href="#" className="text-gray-600 hover:text-blue-600 text-sm">
                    {degree}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <a href="#" className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                  View All
                </a>
              </li>
            </ul>
            <h3 className="font-semibold text-gray-900 mb-4 text-sm mt-6">Colleges By Location</h3>
            <ul className="space-y-2">
              {collegesByLocation.map((location) => (
                <li key={location}>
                  <a href="#" className="text-gray-600 hover:text-blue-600 text-sm">
                    {location}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <a href="#" className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                  View All
                </a>
              </li>
            </ul>
          </div>

          {/* Popular Colleges */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4 text-sm">Popular Colleges</h3>
            <ul className="space-y-2">
              {popularColleges.slice(0, 10).map((college) => (
                <li key={college}>
                  <a href="#" className="text-gray-600 hover:text-blue-600 text-sm">
                    {college}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Top Colleges */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4 text-sm">Top Colleges</h3>
            <ul className="space-y-2">
              {topColleges.map((college) => (
                <li key={college}>
                  <a href="#" className="text-gray-600 hover:text-blue-600 text-sm">
                    {college}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <a href="#" className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                  View All
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
