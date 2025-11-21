
"use client";

import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, User, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { articlesData } from "@/lib/api/dummy/articles-data";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

interface ArticlePageProps {
  params: { id: string };
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const article = articlesData.find((a) => a.id === params.id);

  if (!article) {
    notFound();
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
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{new Date(article.date).toLocaleDateString()}</span>
              </div>
            </div>
            <Button variant="outline" size="icon">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>

          <div className="relative h-96 rounded-lg overflow-hidden mb-8">
            <Image
              src={`/blog.png`}
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
