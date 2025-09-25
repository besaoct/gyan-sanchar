
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { articlesData } from "@/lib/articles-data";
import { ArticleCard } from "@/components/news/article-card";

export default function NewsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header isSticky={true} />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary">News & Articles</h1>
          <p className="text-lg text-muted-foreground mt-2">Stay updated with the latest trends and insights in education.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articlesData.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
