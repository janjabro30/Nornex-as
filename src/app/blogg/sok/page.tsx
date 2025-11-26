'use client';

import { useState, useCallback, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import PostCard from '@/components/blog/PostCard';
import { searchPosts, getCategories } from '@/lib/blog-utils';
import { BlogPostCard, BlogCategory } from '@/types/blog';

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const initialTag = searchParams.get('tag') || '';
  const initialCategory = searchParams.get('kategori') || '';
  
  // Compute initial search query
  const initialSearchQuery = initialTag || initialQuery;
  
  // Compute initial results synchronously for SSR
  const initialResults = useMemo(() => {
    if (!initialSearchQuery) return { posts: [] as BlogPostCard[], totalResults: 0 };
    const result = searchPosts(initialSearchQuery, {
      categorySlug: initialCategory || undefined,
    });
    return { posts: result.posts, totalResults: result.totalResults };
  }, [initialSearchQuery, initialCategory]);
  
  const [query, setQuery] = useState(initialSearchQuery);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [results, setResults] = useState<BlogPostCard[]>(initialResults.posts);
  const [totalResults, setTotalResults] = useState(initialResults.totalResults);
  const [isLoading, setIsLoading] = useState(false);
  
  // Memoize categories since they don't change
  const categories = useMemo<BlogCategory[]>(() => getCategories(), []);
  
  const performSearch = useCallback((searchQuery: string, categoryFilter?: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      setTotalResults(0);
      setIsLoading(false);
      return;
    }
    
    setIsLoading(true);
    setTimeout(() => {
      const result = searchPosts(searchQuery, {
        categorySlug: categoryFilter || undefined,
      });
      setResults(result.posts);
      setTotalResults(result.totalResults);
      setIsLoading(false);
    }, 200);
  }, []);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(query, selectedCategory);
    
    // Update URL
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (selectedCategory) params.set('kategori', selectedCategory);
    window.history.pushState({}, '', `/blogg/sok?${params.toString()}`);
  };
  
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <nav className="mb-4 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <Link href="/blogg" className="hover:text-blue-600 transition-colors">
              Blogg
            </Link>
            <span>/</span>
            <span>Søk</span>
          </nav>
          
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Søk i bloggen
          </h1>
          
          {/* Search Form */}
          <form onSubmit={handleSearch} className="mt-6">
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="relative flex-1">
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Hva leter du etter?"
                  className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-12 pr-4 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-4">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
              
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              >
                <option value="">Alle kategorier</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.slug}>
                    {cat.name}
                  </option>
                ))}
              </select>
              
              <button
                type="submit"
                className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-colors"
              >
                Søk
              </button>
            </div>
          </form>
        </div>
      </header>
      
      {/* Results */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <svg className="h-8 w-8 animate-spin text-blue-600" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          </div>
        ) : query ? (
          <>
            {/* Results Count */}
            <div className="mb-6">
              <p className="text-gray-600 dark:text-gray-400">
                {totalResults === 0 ? (
                  <>Ingen resultater for &quot;{query}&quot;</>
                ) : (
                  <>
                    Fant <strong className="text-gray-900 dark:text-white">{totalResults}</strong>{' '}
                    {totalResults === 1 ? 'resultat' : 'resultater'} for &quot;{query}&quot;
                  </>
                )}
              </p>
            </div>
            
            {results.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {results.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="rounded-lg border border-gray-200 bg-white p-12 text-center dark:border-gray-700 dark:bg-gray-800">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
                  Ingen resultater
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  Prøv et annet søkeord eller sjekk kategoriene våre.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-2">
                  {categories.slice(0, 4).map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/blogg/kategori/${cat.slug}`}
                      className="rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-blue-100 hover:text-blue-700 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-blue-900 dark:hover:text-blue-300 transition-colors"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="rounded-lg border border-gray-200 bg-white p-12 text-center dark:border-gray-700 dark:bg-gray-800">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
              Søk etter artikler
            </h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Skriv inn et søkeord for å finne artikler om IT-sikkerhet, skyløsninger og mer.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-pulse">
          <div className="h-8 w-48 bg-gray-300 rounded mb-4" />
          <div className="h-4 w-64 bg-gray-200 rounded" />
        </div>
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}
