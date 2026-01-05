'use client'

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function RequestCallbackSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold mb-4">Personalised Guidance.</h2>
            <h2 className="text-3xl font-bold mb-4 text-orange-500">Trusted Experts.</h2>
            <p className="text-gray-600 mb-6">
              Get in touch with our expert counsellors
            </p>
          </div>
          <div>
            <Card className="bg-white p-8 shadow-lg">
                <form>
                  <div className="grid grid-cols-1 gap-6">
                    <Input placeholder="Name" />
                    <Input placeholder="Mobile" type="tel" />
                    <Input placeholder="Email" type="email" />
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Your Stream" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="engineering">Engineering</SelectItem>
                        <SelectItem value="management">Management</SelectItem>
                        <SelectItem value="commerce">Commerce</SelectItem>
                        <SelectItem value="medical">Medical</SelectItem>
                        <SelectItem value="science">Science</SelectItem>
                        <SelectItem value="arts">Arts</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">Request a Call Back</Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-4 text-center">
                    By proceeding ahead you expressly agree to the GyanSanchar terms of use and privacy policy.
                  </p>
                </form>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}