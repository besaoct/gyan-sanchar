
import Image from "next/image";

export function ForCollegesSection() {
  return (
    <div className="bg-white py-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-primary mb-4">For Colleges & Institutes</h2>
            <p className="text-lg text-gray-700 mb-4">
              We partner with colleges and institutes to help them reach a wider audience of students. Our platform provides a unique opportunity for institutions to showcase their programs and attract talented students from across the country.
            </p>
            <p className="text-lg text-gray-700">
              We offer a range of services to our partner institutions, including student recruitment, digital marketing, and enhancing their online presence. Join us to connect with the next generation of leaders.
            </p>
          </div>
          <div>
            <Image
              src="https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="For Colleges"
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
