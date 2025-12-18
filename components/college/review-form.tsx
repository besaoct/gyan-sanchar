"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { postCollegeReview, PostCollegeReviewRequest } from "@/lib/api/data/colleges";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  student_name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  rating: z.number().min(1, { message: "Rating is required." }).max(5, { message: "Rating must be between 1 and 5." }),
  comment: z.string().min(10, { message: "Comment must be at least 10 characters." }),
  course: z.string().min(2, { message: "Course is required." }),
  year: z.string().min(4, { message: "Year is required." }),
});

interface ReviewFormProps {
  collegeId: number;
}

export function ReviewForm({ collegeId }: ReviewFormProps) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      student_name: "",
      rating: 0,
      comment: "",
      course: "",
      year: "",
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (values) => {
    const reviewData: PostCollegeReviewRequest = {
      ...values,
      college_id: collegeId,
      date: new Date().toISOString(),
    };

    try {
        const token = localStorage.getItem("token");
        if(!token){
            toast({
                title: "Error",
                description: "You must be logged in to post a review.",
            });
            return;
        }
      await postCollegeReview(reviewData, token);
      toast({
        title: "Success",
        description: "Your review has been submitted.",
      });
      setOpen(false);
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error submitting your review.",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Write a Review</Button>
      </DialogTrigger>
      <DialogContent className="w-[96%] max-w-lg max-h-[96%]">
        <DialogHeader>
          <DialogTitle>Write a Review</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="student_name"
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
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rating</FormLabel>
                  <FormControl>
                    <Input type="number" min="1" max="5" {...field} onChange={e => field.onChange(parseInt(e.target.value))} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="course"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., B.Tech in Computer Science" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="year"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Year of Graduation</FormLabel>
                  <FormControl>
                    <Input placeholder="2023" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Comment</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Share your experience..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit Review</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
