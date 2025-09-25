
'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { CheckCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CollegeSelection } from './CollegeSelection';
import { CourseSelection } from './CourseSelection';
import { AdmissionCollege, AdmissionCourse } from '@/lib/admission-data';

const formSchema = z.object({
  fullName: z.string().min(2, { message: 'Full name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email.' }),
  phone: z.string().min(10, { message: 'Phone number must be at least 10 digits.' }),
  dob: z.string(),
  address: z.string().min(5, { message: 'Address must be at least 5 characters.' }),
});

export function ApplicationForm() {
  const [step, setStep] = useState(1);
  const [selectedCollege, setSelectedCollege] = useState<AdmissionCollege | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<AdmissionCourse | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      dob: '',
      address: '',
    },
  });

  function handleCollegeSelect(college: AdmissionCollege) {
    setSelectedCollege(college);
    setStep(3);
  }

  function handleCourseSelect(course: AdmissionCourse) {
    setSelectedCourse(course);
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log('Form submitted:', { ...values, selectedCollege, selectedCourse });
    // Here you would typically send the data to your backend
    setIsSubmitted(true);
  }

  function handleNewApplication() {
    form.reset();
    setSelectedCollege(null);
    setSelectedCourse(null);
    setStep(1);
    setIsSubmitted(false);
  }

  if (isSubmitted) {
    return (
        <Card className="mb-8">
            <CardContent className="flex flex-col items-center justify-center p-10">
                <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
                <h2 className="text-2xl font-bold mb-2">Application Submitted Successfully!</h2>
                <p className="text-gray-500 mb-6">Thank you for applying. We will get back to you soon.</p>
                <Button onClick={handleNewApplication}>Start New Application</Button>
            </CardContent>
        </Card>
    );
  }

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Common Application Form</CardTitle>
      </CardHeader>
      <CardContent>
        {step === 1 && (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(() => setStep(2))}
              className="space-y-8"
            >
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="john.doe@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="+91 1234567890" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dob"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of Birth</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input placeholder="123, Main Street, Anytown" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="bg-primary hover:bg-primary/90 text-white">
                Continue
              </Button>
            </form>
          </Form>
        )}

        {step === 2 && <CollegeSelection onCollegeSelect={handleCollegeSelect} />}

        {step === 3 && selectedCollege && (
          <div>
            <CourseSelection
              collegeId={selectedCollege.id}
              onCourseSelect={handleCourseSelect}
            />
            <div className="mt-4 flex justify-between">
                <Button onClick={() => setStep(2)} variant="outline">Back</Button>
                <Button
                    onClick={form.handleSubmit(onSubmit)}
                    className="bg-primary hover:bg-primary/90 text-white"
                    disabled={!selectedCourse}
                >
                    Submit Application
                </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
