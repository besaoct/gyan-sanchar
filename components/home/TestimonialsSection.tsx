'use client'

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay } from 'swiper/modules';
import { Card, CardContent } from "@/components/ui/card"
import { useState } from "react";
import { FaQuoteLeft } from "react-icons/fa";
import { Testimonial } from '@/lib/api/data/home';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card className="relative bg-white/95 shadow-md rounded-2xl p-6 min-h-[320px] flex flex-col h-full">
      <FaQuoteLeft className="absolute top-4 left-4 text-gray-200 text-7xl pointer-events-none select-none" />

      <CardContent className="flex flex-col justify-between h-auto mt-auto relative z-10 p-0">
        <div>
          <p
            className={`text-gray-700 mb-4 leading-relaxed ${
              expanded ? "" : "line-clamp-5"
            }`}
          >
            {testimonial.quote}
          </p>

          {testimonial.quote.split(" ").length > 25 && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-sm text-blue-600 hover:underline"
            >
              {expanded ? "Read less" : "Read more"}
            </button>
          )}
        </div>

        <div className="mt-6">
          <h4 className="font-semibold text-lg">{testimonial.student_name}</h4>
          <p className="text-sm text-gray-500">{testimonial.designation}</p>
        </div>
      </CardContent>
    </Card>
  );
}


export default function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  if (!testimonials || testimonials.length === 0) {
    return null;
  }

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
