
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export default function RequestCallbackSectionSkeleton() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <Skeleton className="h-10 w-3/4 mb-4" />
            <Skeleton className="h-10 w-1/2 mb-4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6 mt-2" />
          </div>
          <div>
            <Card className="bg-white p-8 shadow-lg">
              <div className="grid grid-cols-1 gap-6">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
              <Skeleton className="h-3 w-3/4 mx-auto mt-4" />
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
