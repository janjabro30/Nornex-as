'use client';

import Link from 'next/link';
import { BlogCategory } from '@/types/blog';
import { BlogPostCard } from '@/types/blog';
import SearchBox from './SearchBox';
import NewsletterSignup from './NewsletterSignup';

interface BlogSidebarProps {
  categories: BlogCategory[];
  popularPosts: BlogPostCard[];
  tags: { id: number; name: string; slug: string; count?: number }[];
}

export default function BlogSidebar({ categories, popularPosts, tags }: BlogSidebarProps) {
  return (
    <aside className="space-y-6">
      {/* Search */}
      <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-800">
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
          Søk
        </h3>
        <SearchBox />
      </div>
      
      {/* Popular Posts */}
      <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-800">
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
          Populære artikler
        </h3>
        <div className="space-y-4">
          {popularPosts.slice(0, 5).map((post, index) => (
            <Link
              key={post.id}
              href={`/blogg/${post.category.slug}/${post.slug}`}
              className="group flex gap-3"
            >
              <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-blue-100 text-sm font-bold text-blue-600 dark:bg-blue-900 dark:text-blue-300">
                {index + 1}
              </span>
              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-900 line-clamp-2 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400 transition-colors">
                  {post.title}
                </p>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  {post.views} visninger
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      
      {/* Categories */}
      <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-800">
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
          Kategorier
        </h3>
        <ul className="space-y-2">
          {categories.map((category) => (
            <li key={category.id}>
              <Link
                href={`/blogg/kategori/${category.slug}`}
                className="flex items-center justify-between rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors"
              >
                <span>{category.name}</span>
                <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600 dark:bg-gray-700 dark:text-gray-400">
                  {category.postCount || 0}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      
      {/* Tags Cloud */}
      <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-800">
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
          Emneord
        </h3>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Link
              key={tag.id}
              href={`/blogg/sok?tag=${tag.slug}`}
              className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700 hover:bg-blue-100 hover:text-blue-700 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-blue-900 dark:hover:text-blue-300 transition-colors"
            >
              {tag.name}
            </Link>
          ))}
        </div>
      </div>
      
      {/* Newsletter */}
      <NewsletterSignup variant="sidebar" />
    </aside>
  );
}
