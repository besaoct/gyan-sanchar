'use client'

import Link from 'next/link';
import { Card } from '@/components/ui/card';
import Image from 'next/image';

const streams = [
  { name: 'Engineering', subtitle: 'Innovate and build the future', image: 'https://www.avanse.com/blogs/images/10feb-blog-2023.webp', link: '/streams/engineering' },
  { name: 'Management', subtitle: 'Lead with strategy and vision', image: 'https://www.avanse.com/blogs/images/10feb-blog-2023.webp', link: '/streams/management' },
  { name: 'Medical', subtitle: 'Save lives through healthcare', image: 'https://www.avanse.com/blogs/images/10feb-blog-2023.webp', link: '/streams/medical' },
  { name: 'Law', subtitle: 'Uphold justice and legal systems', image: 'https://www.avanse.com/blogs/images/10feb-blog-2023.webp', link: '/streams/law' },
  { name: 'Commerce', subtitle: 'Drive business and finance', image: 'https://www.avanse.com/blogs/images/10feb-blog-2023.webp', link: '/streams/commerce' },
  { name: 'Arts & Humanities', subtitle: 'Explore culture and creativity', image: 'https://www.avanse.com/blogs/images/10feb-blog-2023.webp', link: '/streams/arts-humanities' },
  { name: 'Science', subtitle: 'Discover the laws of nature', image: 'https://www.avanse.com/blogs/images/10feb-blog-2023.webp', link: '/streams/science' },
  { name: 'IT & Computer Applications', subtitle: 'Code the digital world', image: 'https://www.avanse.com/blogs/images/10feb-blog-2023.webp', link: '/streams/it-computer-applications' },
  { name: 'Hospitality & Tourism', subtitle: 'Create memorable experiences', image: 'https://www.avanse.com/blogs/images/10feb-blog-2023.webp', link: '/streams/hospitality-tourism' },
  { name: 'Design', subtitle: 'Shape aesthetics and function', image: 'https://www.avanse.com/blogs/images/10feb-blog-2023.webp', link: '/streams/design' },
  { name: 'Education', subtitle: 'Inspire and teach the future', image: 'https://www.avanse.com/blogs/images/10feb-blog-2023.webp', link: '/streams/education' },
];

export default function StreamsSection() {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-start text-gray-800 mb-10 tracking-tight">Explore Top Streams</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {streams.map((stream) => (
            <Link key={stream.name} href={stream.link} passHref>
              <Card className="group relative bg-gray-50 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 border border-gray-100 py-0">
                <div className="flex items-center p-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center mr-3">
                    <Image
                      src={stream.image} 
                      alt={stream.name} 
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-base font-semibold text-gray-800 group-hover:text-orange-500 transition-colors duration-300 line-clamp-1">
                      {stream.name}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-1">{stream.subtitle}</p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}