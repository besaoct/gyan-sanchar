'use client'

import Image from "next/image"
import { Phone, Mail, MapPin } from "lucide-react"
import { FaFacebookF, FaLinkedinIn, FaYoutube, FaInstagram } from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6"
import { useEffect, useState } from "react"
import { getHomeData, FooterMedia } from "@/lib/api/data/home"
import { getSettingsData, Settings } from "@/lib/api/data/settings"
import Link from "next/link"

export default function Footer() {
  const [footerMedia, setFooterMedia] = useState<FooterMedia[]>([]);
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const [homeResponse, settingsResponse] = await Promise.all([
          getHomeData(),
          getSettingsData()
        ]);

        if (homeResponse.status && homeResponse.data) {
          setFooterMedia(homeResponse.data.footer_media);
        }
        if (settingsResponse.success && settingsResponse.data) {
          setSettings(settingsResponse.data);
        }

      } catch (error) {
        console.error("Failed to fetch footer data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFooterData();
  }, []);

  return (
    <footer className="bg-neutral-950 text-white py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
            <div>
               <Image src="/logo-t.png" alt="GyanSanchar Logo" width={150} height={150} className="h-12 w-auto" />
            <p className="text-gray-400 text-sm mb-4 mt-4">
              Your trusted partner in finding the right college and building a bright future.
            </p>

            {settings && (
              <div className="flex gap-3">
                <a href={settings.facebook} target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 cursor-pointer">
                  <FaFacebookF className="w-4 h-4 text-white" />
                </a>
                <a href={settings.instagram} target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-rose-600 rounded-full flex items-center justify-center hover:bg-rose-700 cursor-pointer">
                  <FaInstagram className="w-4 h-4 text-white" />
                </a>
                <a href={settings.twitter} target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-zinc-600 rounded-full flex items-center justify-center hover:bg-zinc-700 cursor-pointer">
                  <FaXTwitter className="w-4 h-4 text-white" />
                </a>
                <a href={settings.linkedin} target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-blue-700 rounded-full flex items-center justify-center hover:bg-blue-800 cursor-pointer">
                  <FaLinkedinIn className="w-4 h-4 text-white" />
                </a>
                <a href={settings.youtube} target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 cursor-pointer">
                  <FaYoutube className="w-4 h-4 text-white" />
                </a>
              </div>
            )}

            {loading ? (
              <div className="text-center mt-8">Loading media...</div>
            ) : footerMedia.length > 0 && (
              <div className="pt-4">
                <div className="flex flex-wrap justify-start items-center gap-4">
                  {footerMedia.map((media) => (
                    <Link href={media.url} key={media.id} target="_blank" rel="noopener noreferrer">
                        <Image src={media.logo_image} alt={media.title} width={100} height={40} className="object-contain" />
                    </Link>
                  ))}
                </div>
              </div>
            )}
  
            </div>
            
            <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2 text-sm">
              <div className="text-gray-400 hover:text-white cursor-pointer transition-colors">Colleges</div>
              <div className="text-gray-400 hover:text-white cursor-pointer transition-colors">Courses</div>
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
            {settings && (
              <div className="space-y-2 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  {settings.contact_phone}
                </div>
                <div className="flex items-start gap-2 break-all">
                  <Mail className="w-4 h-4" />
                  {settings.contact_email}
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-1" />
                  <span>{settings.address}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2025 Sanchaar EduTech Pvt Ltd. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
