'use client'

import Image from "next/image"
import { Phone, Mail } from "lucide-react"
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaWhatsapp } from "react-icons/fa"

export default function Footer() {
  return (
    <footer className="bg-neutral-950 text-white py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div>
                 <Image src="/logo-t.png" alt="GyanSanchar Logo" width={150} height={150} className="h-12 w-auto" />
            <p className="text-gray-400 text-sm mb-4 mt-4">
              Your trusted partner in finding the right college and building a bright future.
            </p>
            <div className="flex gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 cursor-pointer">
                <FaFacebookF className="w-4 h-4 text-white" />
              </div>
              <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center hover:bg-blue-500 cursor-pointer">
                <FaTwitter className="w-4 h-4 text-white" />
              </div>
              <div className="w-8 h-8 bg-blue-700 rounded-full flex items-center justify-center hover:bg-blue-800 cursor-pointer">
                <FaLinkedinIn className="w-4 h-4 text-white" />
              </div>
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center hover:bg-green-700 cursor-pointer">
                <FaWhatsapp className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2 text-sm">
              <div className="text-gray-400 hover:text-white cursor-pointer transition-colors">Colleges</div>
              <div className="text-gray-400 hover:text-white cursor-pointer transition-colors">Exams</div>
              <div className="text-gray-400 hover:text-white cursor-pointer transition-colors">Courses</div>
              <div className="text-gray-400 hover:text-white cursor-pointer transition-colors">Careers</div>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <div className="space-y-2 text-sm">
              <div className="text-gray-400 hover:text-white cursor-pointer transition-colors">Help Center</div>
              <div className="text-gray-400 hover:text-white cursor-pointer transition-colors">Contact Us</div>
              <div className="text-gray-400 hover:text-white cursor-pointer transition-colors">Privacy Policy</div>
              <div className="text-gray-400 hover:text-white cursor-pointer transition-colors">Terms of Service</div>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact Info</h4>
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                1800-572-9877
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                support@gyansanchar.com
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2025 Sanchaar EduTech Pvt Ltd. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
