'use client'

import Header from "@/components/common/Header"
import Footer from "@/components/common/Footer"
import ContactForm from "@/components/contact/contact-form"
import { getSettingsData, Settings } from "@/lib/api/data/settings"
import { useEffect, useState } from "react"
import { Phone, Mail, MapPin } from "lucide-react"

export default function ContactUsPage() {
  const [settings, setSettings] = useState<Settings | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSettingsData = async () => {
      try {
        const settingsResponse = await getSettingsData()
        if (settingsResponse.success && settingsResponse.data) {
          setSettings(settingsResponse.data)
        }
      } catch (error) {
        console.error("Failed to fetch settings data:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchSettingsData()
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="text-center lg:text-left">
              <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
              <p className="text-gray-600 mb-6">
                We are here to help you.
              </p>
              {loading ? (
                <div className="space-y-4">
                  <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-8 bg-gray-200 rounded w-2/3"></div>
                </div>
              ) : settings ? (
                <div className="space-y-4 text-left">
                  <div className="flex items-center gap-4">
                    <Phone className="w-6 h-6 text-orange-500" />
                    <span className="text-lg">{settings.contact_phone}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Mail className="w-6 h-6 text-orange-500" />
                    <span className="text-lg">{settings.contact_email}</span>
                  </div>
                  <div className="flex items-start gap-4">
                    <MapPin className="w-6 h-6 text-orange-500 mt-1" />
                    <span className="text-lg">{settings.address}</span>
                  </div>
                </div>
              ) : (
                <p>Could not load contact information.</p>
              )}
            </div>
            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}
