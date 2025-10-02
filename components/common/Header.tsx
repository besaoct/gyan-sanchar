'use client'

import Image from "next/image"
import Link from "next/link"
import { Phone, Mail,  Menu, User2, Search } from "lucide-react"
import { FaFacebookF, FaYoutube, FaTwitter, FaInstagram } from "react-icons/fa"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTrigger,
} from "@/components/ui/sheet"

export default function Header({ isSticky }: { isSticky?: boolean }) {
  return (
    <header className={`bg-[#044cac] text-white ${isSticky && 'lg:sticky lg:top-0 lg:z-50'}`}>
      <div className="container mx-auto px-4">
        {/* Top bar */}
        <div className="hidden lg:flex flex-col md:flex-row justify-between items-center py-2 text-sm border-b border-white/30 gap-2">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            <span className="flex items-center gap-1">
              <Phone className="w-3 h-3" />
              12345-567-890
            </span>
            <span className="flex items-center gap-1">
              <Mail className="w-3 h-3" />
              support@gyansanchar.com
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden sm:block">We're on your favourite socials!</span>
            <div className="flex gap-2">
              <div className="w-5 h-5 bg-blue-600 rounded flex items-center justify-center">
                <FaFacebookF className="w-3 h-3 text-white" />
              </div>
              <div className="w-5 h-5 bg-red-600 rounded flex items-center justify-center">
                <FaYoutube className="w-3 h-3 text-white" />
              </div>
              <div className="w-5 h-5 bg-blue-400 rounded flex items-center justify-center">
                <FaTwitter className="w-3 h-3 text-white" />
              </div>
              <div className="w-5 h-5 bg-pink-600 rounded flex items-center justify-center">
                <FaInstagram className="w-3 h-3 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Main navigation */}
        <nav className="flex justify-between items-center py-4 h-20">
          <Link href="/" className="block">
               <Image src="/logo-w.png" alt="GyanSanchar Logo" width={150} height={150} className="h-12 w-auto" />
          </Link>
          <div className="hidden lg:flex items-center gap-8">
            <div className="flex gap-6">
            <Link href={'/colleges'}  className="cursor-pointer hover:text-white/80 transition-colors">Colleges</Link>
              {/* <Link href="/streams"><span className="cursor-pointer hover:text-white/80 transition-colors">Streams</span></Link> */}
                  <Link href={'/courses'} className="cursor-pointer hover:text-white/80 transition-colors">Courses</Link>
              <span className="cursor-pointer hover:text-white/80 transition-colors">Exams</span>

              <Link href={"/admission"} className="cursor-pointer hover:text-white/80 transition-colors">Admission</Link>

                 <Link href={"/news"} className="cursor-pointer hover:text-white/80 transition-colors">News & Articles</Link>
      
            </div>
            <div className="flex items-center gap-2">
              <Search className="w-5 h-5" />
              <User2 className="w-8 h-8 bg-white text-blue-800 p-1 rounded-full"/>
            </div>
          </div>
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Menu className="w-6 h-6" />
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px] bg-[#044cac] text-white p-0">
                <SheetHeader className="p-4 border-b border-white/30">
                  <Link href="/" className="block">
                    <Image src="/logo-w.png" alt="GyanSanchar Logo" width={150} height={150} className="h-12 w-auto" />
                  </Link>
                </SheetHeader>
                <div className="flex flex-col gap-4 p-4">
                  <Link href={'/colleges'} className="cursor-pointer hover:text-white/80 transition-colors">Colleges</Link>
                  <Link href={'/courses'} className="cursor-pointer hover:text-white/80 transition-colors">Courses</Link>
                  <span className="cursor-pointer hover:text-white/80 transition-colors">Exams</span>
                       <Link href={"/admission"} className="cursor-pointer hover:text-white/80 transition-colors">Admission</Link>
              <Link href={"/news"} className="cursor-pointer hover:text-white/80 transition-colors">News & Articles</Link>
      
               
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>
    </header>
  )
}
