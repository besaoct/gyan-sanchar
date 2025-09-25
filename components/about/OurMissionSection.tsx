
import Image from "next/image";

export function OurMissionSection() {
  return (
    <div className="bg-white py-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-primary mb-4">Our Mission</h2>
            <p className="text-lg text-gray-700 mb-4">
              Our mission is to connect students with the best higher education opportunities available. We aim to simplify the complex admission process, provide expert career guidance, and bridge the gap between students and educational institutions.
            </p>
            <p className="text-lg text-gray-700">
              We believe that every student deserves access to quality education, and we are committed to making that a reality through our comprehensive platform and personalized support.
            </p>
          </div>
          <div>
            <Image
              src="https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Our Mission"
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
