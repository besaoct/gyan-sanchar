'use client'

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay } from 'swiper/modules';
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useState } from "react";
import { FaQuoteLeft } from "react-icons/fa";

const testimonials = [
  {
    name: "Rohan Sharma",
    college: "IIT Bombay",
    testimonial: "Gyan Sanchar helped me find the perfect college. The counsellors are very supportive and knowledgeable.",
    avatar: "/placeholder-user.jpg"
  },
  {
    name: "Priya Singh",
    college: "Delhi University",
    testimonial: "The application process was so smooth with Gyan Sanchar. I got into my dream college without any hassle.",
    avatar: "/placeholder-user.jpg"
  },
  {
    name: "Amit Patel",
    college: "BITS Pilani",
    testimonial: "I was confused about my career path, but the career guidance from Gyan Sanchar was a real eye-opener.",
    avatar: "/placeholder-user.jpg"
  },
  {
    name: "Sneha Reddy",
    college: "AIIMS Delhi",
    testimonial: "The best platform for college admissions in India. Highly recommended!",
    avatar: "/placeholder-user.jpg"
  }
];

function TestimonialCard({ testimonial }: { testimonial: any }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card className="relative bg-white/95 shadow-md rounded-2xl p-6 min-h-[320px] flex flex-col h-full">
      <FaQuoteLeft className="absolute top-4 left-4 text-gray-200 text-7xl pointer-events-none select-none" />

      <CardContent className="flex flex-col justify-between h-auto mt-auto relative z-10 p-0">
        {/* Top Section: Avatar + Testimonial */}
        <div>
          {/* <Avatar className="w-14 h-14 mb-4">
            <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
            <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
          </Avatar> */}

          <p
            className={`text-gray-700 mb-4 leading-relaxed ${
              expanded ? "" : "line-clamp-5"
            }`}
          >
            {testimonial.testimonial}
          </p>

          {testimonial.testimonial.split(" ").length > 25 && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-sm text-blue-600 hover:underline"
            >
              {expanded ? "Read less" : "Read more"}
            </button>
          )}
        </div>

        {/* Bottom Section: Student Info */}
        <div className="mt-6">
          <h4 className="font-semibold text-lg">{testimonial.name}</h4>
          <p className="text-sm text-gray-500">Student, {testimonial.college}</p>
        </div>
      </CardContent>
    </Card>
  );
}


export default function TestimonialsSection() {
  return (
    <section className="py-16 bg-[#044cac]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-white mb-12">
          What Our Students Say
        </h2>
        <Swiper
          modules={[Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{ delay: 5000 }}
          loop={true}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <TestimonialCard testimonial={testimonial} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}
