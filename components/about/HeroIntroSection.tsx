
import Image from "next/image";

export function HeroIntroSection() {
  return (
    <div className="relative h-96">
      <Image
        src="https://images.pexels.com/photos/256490/pexels-photo-256490.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        alt="GyanSanchar Hero Image"
        layout="fill"
        objectFit="cover"
        className="absolute inset-0"
      />
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to GyanSanchar</h1>
        <p className="text-lg md:text-2xl max-w-3xl">Your trusted partner in discovering the best colleges, courses, and careers for a bright future.</p>
      </div>
    </div>
  );
}
