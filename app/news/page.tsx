"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { articlesData } from "@/lib/articles-data";
import { FilterSidebar, ArticleFilterOptions } from "@/components/news/filter-sidebar";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { Filter } from "lucide-react";
import { ArticleCard } from "@/components/news/article-card";

export default function NewsPage() {
  const [filters, setFilters] = useState<ArticleFilterOptions>({
    search: "",
    categories: [],
    tags: [],
  });

  const filteredArticles = useMemo(() => {
    return articlesData.filter(article => {
      if (
        filters.search &&
        !article.title.toLowerCase().includes(filters.search.toLowerCase()) &&
        !article.excerpt.toLowerCase().includes(filters.search.toLowerCase())
      ) {
        return false;
      }

      if (
        filters.categories.length > 0 &&
        !filters.categories.includes(article.category)
      ) {
        return false;
      }

      if (
        filters.tags.length > 0 &&
        !filters.tags.some(tag => article.tags.includes(tag))
      ) {
        return false;
      }

      return true;
    });
  }, [filters]);

  return (
    <div className="min-h-screen bg-white">
      <Header isSticky={true} />
      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          <div className="w-80 flex-shrink-0 hidden lg:block">
            <FilterSidebar filters={filters} onFiltersChange={setFilters} />
          </div>

          <div className="flex-1">
            <div className="mb-4 lg:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="w-full bg-transparent">
                    <Filter className="h-4 w-4 mr-2" />
                    Filters ({Object.values(filters).flat().filter(Boolean).length})
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80 p-0 overflow-y-auto scrollbar-hide">
                  <FilterSidebar filters={filters} onFiltersChange={setFilters} />
                </SheetContent>
              </Sheet>
            </div>

            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-foreground">
                  {filteredArticles.length} Articles Found
                </h2>
                <p className="text-muted-foreground">
                  Explore the latest news and articles
                </p>
              </div>
            </div>

            <div className="space-y-6">
              {filteredArticles.map(article => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>

            {filteredArticles.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📰</div>
                <h3 className="text-xl font-semibold mb-2">No articles found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your filters to see more results
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}