"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  country_code: z.string(),
  mobile: z.string().min(10, { message: "Mobile number must be at least 10 digits." }),
  preferred_date: z.string().nonempty({ message: "Please select a date." }),
  preferred_time: z.string({ required_error: "Please select a time slot." }),
  message: z.string().optional(),
  dob: z.string().nonempty({ message: "Date of birth is required." }),
  stream: z.string().min(2, { message: "Stream is required." }),
  level: z.string().min(2, { message: "Level is required." }),
});

interface BookConsultationFormProps {
  trigger: React.ReactNode;
}

export function BookConsultationForm({ trigger }: BookConsultationFormProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD format

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      country_code: "+91",
      mobile: "",
      preferred_date: "",
      preferred_time: "11:00 AM - 12:00 PM",
      message: "",
      dob: "",
      stream: "",
      level: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    const registrationData = {
      name: values.name,
      email: values.email,
      phone: values.mobile,
      interested_online_degree: false, // Default value
      enable_whatsapp_updates: true, // Default value
      type: "registration",
      dob: values.dob,
      stream: values.stream,
      level: values.level,
    };

    try {
      // Step 1: Register user (silently)
      const regResponse = await fetch("https://gitcsdemoserver.online/gyansanchar/public/api/v1/auth/register", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(registrationData),
      });

      const regResult = await regResponse.json();

      if (!regResult.success) {
        console.warn("Silent registration failed, proceeding with booking.", regResult.message);
      }

      // Step 2: Book the consultation
      const consultationData = {
        name: values.name,
        email: values.email,
        country_code: values.country_code,
        mobile: values.mobile,
        preferred_date: values.preferred_date,
        preferred_time: values.preferred_time,
        message: values.message || "",
      };

      const bookingResponse = await fetch("https://gitcsdemoserver.online/gyansanchar/public/api/v1/live-consultation", {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify(consultationData)
      });

      const bookingResult = await bookingResponse.json();

      if (bookingResult.success) {
        toast({
          title: "Consultation Booked!",
          description: "We'll be in touch with you shortly.",
        });
        setIsDialogOpen(false);
        form.reset();
      } else {
        throw new Error(bookingResult.message || "An unknown error occurred during booking.");
      }
    } catch (error: any) {
      const errorMessage = error.message || "Failed to book consultation. Please try again.";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
          style: {
          color:"white"
        }
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent className="max-w-lg p-6 w-[96%] max-h-[96%] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Book a Free Consultation</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your name" {...field} />
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
                    <Input type="email" placeholder="you@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-3 ">
              <FormField
                control={form.control}
                name="country_code"
                render={({ field }) => (
                  <FormItem className="w-fit">
                    <FormLabel>Code</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="+91">+91</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="mobile"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Mobile</FormLabel>
                    <FormControl>
                      <Input type="tel" placeholder="9876543210" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
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
                name="stream"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stream</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Science" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
            <FormField
                control={form.control}
                name="level"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Level</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Graduate" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

            <div className="flex flex-wrap gap-4">
              <FormField
                control={form.control}
                name="preferred_date"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel htmlFor="preferred_date">Preferred Date</FormLabel>
                    <FormControl>
                      <div className="relative w-full">
                        <Input
                          type="date"
                          min={today}
                          className="pl-10 "
                          {...field}
                        />
                        <CalendarIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground pointer-events-none" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="preferred_time"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="">Preferred Time</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="10:00 AM - 11:00 AM">10:00 AM - 11:00 AM</SelectItem>
                        <SelectItem value="11:00 AM - 12:00 PM">11:00 AM - 12:00 PM</SelectItem>
                        <SelectItem value="02:00 PM - 03:00 PM">02:00 PM - 03:00 PM</SelectItem>
                        <SelectItem value="04:00 PM - 05:00 PM">04:00 PM - 05:00 PM</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us what you'd like to discuss..."
                      className="resize-none ring-offset-0 focus:ring-0 focus-visible:ring-0 "
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
              {isLoading ? "Booking..." : "Book Free Consultation"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}