
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
import { ArrowRight, Calendar, User } from "lucide-react";
import { Article } from "@/lib/api/data/articles";

export function ArticleCard({ article }: { article: Article }) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 py-0">
      <Link href={`/news/${article.slug}`}>
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div className="relative h-56 md:h-full">
            <Image
              src={ article.image || `/blog.png`}
              alt={article.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
            />
          </div>
          <div className="md:col-span-2 p-6">
            <CardHeader className="p-0 mb-4">
              <CardTitle className="text-xl font-bold">{article.title}</CardTitle>
            </CardHeader>
            <CardContent className="p-0 mb-4">
              <p className="text-muted-foreground line-clamp-2">{article.excerpt}</p>
            </CardContent>
            <CardFooter className="p-0 flex justify-between items-end text-sm text-muted-foreground">
              <div className="flex items-center justify-start gap-2 whitespace-nowrap flex-wrap">
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span>{article.author}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(article.date!).toLocaleDateString()}</span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-primary font-semibold whitespace-nowrap">
                <span>Read More</span>
                <ArrowRight className="h-4 w-4" />
              </div>
            </CardFooter>
          </div>
        </div>
      </Link>
    </Card>
  );
}
