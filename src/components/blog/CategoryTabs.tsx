'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { BlogCategory } from '@/types/blog';

interface CategoryTabsProps {
  categories: BlogCategory[];
  activeCategory?: string;
}

export default function CategoryTabs({ categories, activeCategory = 'alle' }: CategoryTabsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const handleCategoryChange = (slug: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (slug === 'alle') {
      params.delete('kategori');
    } else {
      params.set('kategori', slug);
    }
    params.delete('side'); // Reset pagination
    router.push(`/blogg?${params.toString()}`);
  };
  
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => handleCategoryChange('alle')}
        className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
          activeCategory === 'alle'
            ? 'bg-blue-600 text-white shadow-md'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
        }`}
      >
        Alle
      </button>
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => handleCategoryChange(category.slug)}
          className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
            activeCategory === category.slug
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
          }`}
        >
          {category.name}
          {category.postCount !== undefined && (
            <span className="ml-1.5 text-xs opacity-70">({category.postCount})</span>
          )}
        </button>
      ))}
    </div>
  );
}
