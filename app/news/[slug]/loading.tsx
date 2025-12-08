
import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
        <div className="min-h-screen bg-white">
          <Header isSticky={true} />
    <div className="min-h-screen bg-white">
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Skeleton className="h-10 w-48 mb-8" />

          <Skeleton className="h-12 w-full mb-4" />
          <Skeleton className="h-8 w-3/4 mb-8" />

          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-6 w-24" />
            </div>
            <Skeleton className="h-10 w-10 rounded-full" />
          </div>

          <Skeleton className="h-96 w-full rounded-lg mb-8" />

          <div className="space-y-4">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-5/6" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-1/2" />
          </div>
        </div>
      </main>
            <Footer />
          </div>
    </div>
  );
}
