'use client'

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { getCollegeFilters } from "@/lib/api/data/colleges"
import { useToast } from "@/hooks/use-toast"
import { useEffect, useState } from "react"
import { useAuth } from "@/contexts/auth/AuthContext"
import { BASE_URL } from "@/lib/api/config/urls"
import { FormSection } from "@/lib/api/data/home"

export default function RequestCallbackSection({form_sections}:{form_sections:FormSection[]}) {
  const { toast } = useToast()
  const { user} = useAuth();
  const [name, setName] = useState(user?.name || "")
  const [mobile, setMobile] = useState("")
  const [email, setEmail] = useState(user?.email || "")
  const [stream, setStream] = useState("")
  const [streamsOptions, setStreamsOptions] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const loadFilters = async () => {
      try {
        const resCollege = await getCollegeFilters()
        if (resCollege.success && resCollege.data) {
          setStreamsOptions(resCollege.data.streams || [])
        }
      } catch (err) {
        console.error("Failed to load streams", err)
      }
    }
    loadFilters()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const registrationData = {
      name,
      email,
      phone: mobile,
      stream,
      type: "callback",
    }

    try {
      const response = await fetch(
        `${BASE_URL}/api/v1/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(registrationData),
        }
      )

      const result = await response.json()

      if (result.success) {
        toast({
          title: "Request Sent!",
          description: "Our team will get in touch with you shortly.",
        })
        setName("")
        setMobile("")
        setEmail("")
        setStream("")
      } else {
        throw new Error(result.message || "An unknown error occurred.")
      }
    } catch (error: any) {
      const errorMessage =
        error.message || "Failed to send request. Please try again."
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
        style: {
          color: "white",
        },
      })
    } finally {
      setIsLoading(false)
    }
  }



  const formSection = form_sections[0]


  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold mb-4">{formSection.heading || "Personalised Guidance."}</h2>
            <h2 className="text-3xl font-bold mb-4 text-orange-500">
          { formSection.sub_heading ||   "Trusted Experts."}
            </h2>
            <p className="text-gray-600 mb-6">
           { formSection.description ||  "Get in touch with our expert counsellors"}
            </p>
          </div>
          <div>
            <Card className="bg-white p-8 shadow-lg">
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-6">
                  <Input
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                  <Input
                    placeholder="Mobile"
                    type="tel"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                  <Input
                    placeholder="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                  <Select
                    value={stream}
                    onValueChange={setStream}
                    disabled={isLoading}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Your Stream" />
                    </SelectTrigger>
                    <SelectContent>
                      {streamsOptions.map((s) => (
                        <SelectItem key={s} value={s}>
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                    type="submit"
                    disabled={isLoading}
                  >
                    {isLoading ? "Sending..." : "Request a Call Back"}
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-4 text-center">
                  By proceeding ahead you expressly agree to the GyanSanchar
                  terms of use and privacy policy.
                </p>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}