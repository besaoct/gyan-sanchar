
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export default function ServicesSectionSkeleton() {
  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Skeleton className="h-8 w-1/2 mx-auto mb-4" />
          <Skeleton className="h-4 w-3/4 mx-auto" />
        </div>

        <div className="flex justify-center mb-12">
          <Skeleton className="h-12 w-full max-w-lg" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="p-6 bg-gray-200">
              <CardContent className="p-0">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6 mt-1" />
                  </div>
                  <Skeleton className="w-16 h-10" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
          <Skeleton className="h-12 w-48" />
          <Skeleton className="h-12 w-48" />
        </div>
      </div>
    </section>
  );
}
