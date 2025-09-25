
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function CallToActionSection() {
  return (
    <div className="bg-primary text-white py-20">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to start your journey?</h2>
        <p className="text-lg mb-8">Explore thousands of colleges and courses, or get personalized counseling from our experts.</p>
        <div className="flex justify-center gap-4">
          <Link href="/colleges">
            <Button variant="secondary" size="lg">Explore Colleges</Button>
          </Link>
          <Link href="/courses">
            <Button variant="outline" size="lg" className="border-white hover:bg-white hover:text-primary text-white bg-primary">
              Get Counseling
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
