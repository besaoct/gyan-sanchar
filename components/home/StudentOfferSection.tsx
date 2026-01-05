import { Button } from "@/components/ui/button";
import { Offer } from "@/lib/api/data/home";
import Link from "next/link";

interface StudentOfferSectionProps {
  offers: Offer[];
}

export default function StudentOfferSection({
  offers,
}: StudentOfferSectionProps) {
  if (!offers || offers.length === 0) {
    return null;
  }

  const firstOffer = offers[0];

  return (
    <section className="py-12 md:py-16 bg-gradient-to-r from-orange-400 to-orange-500">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between text-white gap-8">
          <div className="flex-1 text-center lg:text-left">
            <h2 className="text-4xl md:text-6xl font-bold mb-4">
              <Link href={firstOffer.link}>
                {firstOffer.title.split(" ").map((word, index, arr) => (
                  <span
                    key={index}
                    className={index >= arr.length - 2 ? "underline" : ""}
                  >
                    {word}
                    {index < arr.length - 1 ? " " : ""}
                  </span>
                ))}
              </Link>
            </h2>
          </div>
          <div className="flex-1 flex justify-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 md:p-8 w-full max-w-md">
              <div className="flex flex-wrap justify-center items-center sm:grid sm:grid-cols-2 gap-4 text-center">
                {firstOffer.features.map((feature, index) => (
                  <div key={index}>
                    <div className="text-xl md:text-2xl font-bold">
                      {feature.title}
                    </div>
                    <div className="text-sm">{feature.subtitle}</div>
                  </div>
                ))}
                <div className="flex items-center">
                  <Link href={firstOffer.button_link} className="block ">
                    <Button className="bg-white text-orange-500 hover:bg-gray-100 text-sm h-auto">
                      {firstOffer.button_text}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
