
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, User, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getArticleBySlug, Article } from "@/lib/api/data/articles";

import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

interface ArticlePageProps {
  params: { slug: string };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  let article: Article;

  try {
    const response = await getArticleBySlug(params.slug);

    if (!response || !response.success || !response.data) {
      notFound();
    }
    article = response.data;
  } catch (error) {
    console.error("Failed to fetch article:", error);
    // You could render an error component here, or re-throw
    // to let Next.js's error boundary handle it.
    throw new Error("Failed to load article data.");
  }


  return (
    <div className="min-h-screen bg-white">
      <Header isSticky={true} />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Link href="/news">
            <Button variant="outline" className="mb-8">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to News
            </Button>
          </Link>

          <h1 className="text-4xl font-bold mb-4">{article.title}</h1>

          <div className="flex items-center justify-between mb-8 text-muted-foreground">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                <span>{article.author}</span>
              </div>
              {article.date && (
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(article.date).toLocaleDateString()}</span>
                </div>
              )}
            </div>
            <Button variant="outline" size="icon">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>

          <div className="relative h-96 rounded-lg overflow-hidden mb-8">
            <Image
              src={article.image || `/blog.png`}
              alt={article.title}
              fill
              className="object-cover"
            />
          </div>

          <div
            className="prose lg:prose-xl max-w-none"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}
