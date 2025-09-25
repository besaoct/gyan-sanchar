
import Image from "next/image";

export function OurVisionSection() {
  return (
    <div className="bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="md:order-2">
            <h2 className="text-3xl font-bold text-primary mb-4">Our Vision</h2>
            <p className="text-lg text-gray-700 mb-4">
              Our vision is to become the most trusted and comprehensive education partner for students across the country. We aspire to create a future where every student is empowered to make informed decisions about their career and education.
            </p>
            <p className="text-lg text-gray-700">
              We are dedicated to fostering a transparent and accessible ecosystem that supports students at every step of their educational journey, from discovery to admission and beyond.
            </p>
          </div>
          <div className="md:order-1">
            <Image
              src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Our Vision"
              width={600}
              height={400}
              className="rounded-lg object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
