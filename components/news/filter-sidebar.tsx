
"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { articlesData } from "@/lib/articles-data";

export type ArticleFilterOptions = {
  search: string;
  categories: string[];
  tags: string[];
};

export function FilterSidebar({ filters, onFiltersChange }: {
  filters: ArticleFilterOptions;
  onFiltersChange: (filters: ArticleFilterOptions) => void;
}) {
  const allCategories = [...new Set(articlesData.map(article => article.category))];
  const allTags = [...new Set(articlesData.flatMap(article => article.tags))];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFiltersChange({ ...filters, search: e.target.value });
  };

  const handleCategoryChange = (category: string) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category];
    onFiltersChange({ ...filters, categories: newCategories });
  };

  const handleTagChange = (tag: string) => {
    const newTags = filters.tags.includes(tag)
      ? filters.tags.filter(t => t !== tag)
      : [...filters.tags, tag];
    onFiltersChange({ ...filters, tags: newTags });
  };

  return (
    <div className="space-y-6 p-4 border-r border-gray-200 h-full">
      <div>
        <h3 className="text-lg font-semibold mb-4">Search</h3>
        <Input
          placeholder="Search articles..."
          value={filters.search}
          onChange={handleSearchChange}
        />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-4">Categories</h3>
        <div className="space-y-2">
          {allCategories.map(category => (
            <div key={category} className="flex items-center">
              <Checkbox
                id={category}
                checked={filters.categories.includes(category)}
                onCheckedChange={() => handleCategoryChange(category)}
              />
              <Label htmlFor={category} className="ml-2">{category}</Label>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-4">Tags</h3>
        <div className="space-y-2">
          {allTags.map(tag => (
            <div key={tag} className="flex items-center">
              <Checkbox
                id={tag}
                checked={filters.tags.includes(tag)}
                onCheckedChange={() => handleTagChange(tag)}
              />
              <Label htmlFor={tag} className="ml-2">{tag}</Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
