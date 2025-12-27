"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Phone,
  Mail,
  Menu,
  User2,
  Search,
  ChevronDown,
  ChevronRight,
  Building2,
  Building,
  BookOpen,
  Zap,
  FileText,
  File,
  User,
} from "lucide-react";
import { FaFacebookF, FaYoutube, FaTwitter, FaInstagram } from "react-icons/fa";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import CollegesDropdown from "../college/college-dropdown";
import { useState } from "react";
import { useAuth } from "@/contexts/auth/AuthContext";
import { Button } from "../ui/button";
import MobileCollegesDropdown from "../college/MobileCollegesDropdown";

export default function Header({ isSticky }: { isSticky?: boolean }) {
  const [isCollegesOpen, setIsCollegesOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showCollegesDropdown, setShowCollegesDropdown] = useState(false);

  return (
    <header
      className={`bg-[#044cac] text-white ${
        isSticky && "lg:sticky lg:top-0 lg:z-50"
      }`}
    >
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
            <span className="hidden sm:block">
              We're on your favourite socials!
            </span>
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
            <Image
              src="/logo-w.png"
              alt="GyanSanchar Logo"
              width={150}
              height={150}
              className="h-12 w-auto"
            />
          </Link>
          <div className="hidden lg:flex items-center gap-8">
            <div className="flex gap-6">
              {/* Colleges Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsCollegesOpen(!isCollegesOpen)}
                  className="flex items-center gap-1 hover:text-blue-200 transition"
                >
                  Colleges
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
              {/* <Link href="/streams"><span className="cursor-pointer hover:text-white/80 transition-colors">Streams</span></Link> */}
              <Link
                href={"/courses"}
                className="cursor-pointer hover:text-white/80 transition-colors"
              >
                Courses
              </Link>
              {/* <span className="cursor-pointer hover:text-white/80 transition-colors">
                Exams
              </span> */}

              <Link
                href={"/admission"}
                className="cursor-pointer hover:text-white/80 transition-colors"
              >
                Admission
              </Link>

              <Link
                href={"/news"}
                className="cursor-pointer hover:text-white/80 transition-colors"
              >
                News & Articles
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <Search className="w-5 h-5" />
              {isAuthenticated ? (
                <div className="flex items-center gap-2">
                  <User2 className="w-8 h-8 bg-white text-blue-800 p-1 rounded-full" />
                  <span className="sr-only">{user?.name}</span>
                  <Button onClick={logout} variant="destructive">
                    Logout
                  </Button>
                </div>
              ) : (
                <Link href="/login">
                  <Button variant="secondary">Login</Button>
                </Link>
              )}
            </div>

            {isCollegesOpen && (
              <>
                <CollegesDropdown onClose={() => setIsCollegesOpen(false)} />
                <div
                  className="fixed inset-0 z-[30]"
                  onClick={() => setIsCollegesOpen(false)}
                />
              </>
            )}
          </div>

          {/* mobile nav */}
          <div className="lg:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Menu className="w-6 h-6" />
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-full sm:w-[512px] bg-[#044cac] text-white p-0 pb-4 overflow-y-auto"
              >
                {showCollegesDropdown ? (
                  <MobileCollegesDropdown
                    onMainMenuClick={() => {
                      setShowCollegesDropdown(false);
                    }}
                    onClose={() => {
                      setShowCollegesDropdown(false);
                      setIsMobileMenuOpen(false);
                    }}
                  />
                ) : (
                  <>
                    <SheetHeader className="p-4 border-b border-white/30">
                      <Link href="/" className="block py-4">
                        <Image
                          src="/logo-w.png"
                          alt="GyanSanchar Logo"
                          width={150}
                          height={150}
                          className="h-20 w-auto"
                        />
                      </Link>
                    </SheetHeader>

                    <div className="flex flex-col gap-4 p-4">
                      <div className="flex  items-center gap-2 w-full border-b border-white/30 pb-4">
                        <div className="p-2 h-10 flex justify-center items-center bg-white/20 rounded-sm">
                          <Building className="h-4 min-w-4 text-white" />
                        </div>
                        <button
                          onClick={() => setShowCollegesDropdown(true)}
                          className="cursor-pointer w-full outline-none focus-visible:outline-none focus:outline-none hover:text-white/80 transition-colors flex justify-between items-center"
                        >
                          Colleges
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="flex  items-center gap-2 w-full border-b border-white/30 pb-4">
                        <div className="p-2 h-10 flex justify-center items-center bg-white/20 rounded-sm">
                          <BookOpen className="h-4 min-w-4 text-white" />
                        </div>
                        <Link
                          href={"/courses"}
                          className="cursor-pointer w-full hover:text-white/80 transition-colors flex justify-between items-center"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          Courses
                          <ChevronRight className="h-4 w-4" />
                        </Link>
                      </div>
                      {/* <span
                      className="cursor-pointer hover:text-white/80 transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Exams
                    </span> */}
                           <div className="flex items-center gap-2 w-full border-b border-white/30 pb-4">
                        <div className="p-2 h-10 flex justify-center items-center bg-white/20 rounded-sm">
                          <FileText className="h-4 min-w-4 text-white" />
                        </div>
                      <Link
                        href={"/admission"}
                        className="cursor-pointer w-full hover:text-white/80 transition-colors flex justify-between items-center"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Admission
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                      </div>
                   <div className="flex  items-center gap-2 w-full border-b border-white/30 pb-4">
                        <div className="p-2 h-10 flex justify-center items-center bg-white/20 rounded-sm">
                          <Zap className="h-4 min-w-4 text-white" />
                        </div>
                      <Link
                        href={"/news"}
                        className="cursor-pointer w-full hover:text-white/80 transition-colors flex justify-between items-center"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        News & Articles
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                      </div>

                      
                      <div className=" border-white/30">
                        {isAuthenticated ? (
                          <div className="flex flex-col w-full gap-6 ">
                            <div className="flex items-center gap-2 border-b border-white/30 pb-4">
                              <User2 className="w-8 h-8 bg-white text-blue-800 p-1 rounded-full" />
                              <span>{user?.name}</span>
                            </div>
                            <Button
                              onClick={() => {
                                logout();
                                setIsMobileMenuOpen(false);
                              }}
                              className="w-full"
                              variant="destructive"
                            >
                              Logout
                            </Button>
                          </div>
                        ) : (
                    <div className="flex  items-center gap-2 w-full border-b border-white/30 pb-4">
                       <div className="p-2 h-10 flex justify-center items-center bg-white/20 rounded-sm">
                          <User className="h-4 min-w-4 text-white" />
                        </div>
                          <Link href="/login" className="text-start w-full">
                            <button
                              className="w-full p-0 m-0  text-white cursor-pointer hover:text-white/80 transition-colors flex justify-between items-center"
                              // variant="link"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                               Login
                             <ChevronRight className="h-4 w-4" />
                            </button>
                          </Link>
                        </div>
                        )}
                      </div>

                            <div>
            <h4 className="font-semibold mb-4">Contact Info</h4>
            <div className="space-y-2 text-sm text-gray-100">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                1800-572-9877
              </div>
              <div className="flex items-start gap-2 break-all">
                <Mail className="w-4 h-4" />
                support@gyansanchar.com
              </div>
            </div>
          </div>
                    </div>
                  </>
                )}
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>
    </header>
  );
}
