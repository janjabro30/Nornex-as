import { Suspense } from 'react';
import { Metadata } from 'next';
import PostCard from '@/components/blog/PostCard';
import CategoryTabs from '@/components/blog/CategoryTabs';
import Pagination from '@/components/blog/Pagination';
import BlogSidebar from '@/components/blog/BlogSidebar';
import NewsletterSignup from '@/components/blog/NewsletterSignup';
import { 
  getPaginatedPosts, 
  getCategories, 
  getPopularPosts, 
  getPopularTags,
  getFeaturedPost 
} from '@/lib/blog-utils';

export const metadata: Metadata = {
  title: 'Blogg | Nornex - IT-tjenester og Rådgivning',
  description: 'Les våre artikler om IT-sikkerhet, skyløsninger, teknologi og digitale løsninger. Få tips og guider fra Nornex sine eksperter.',
  keywords: ['IT-blogg', 'teknologi', 'cybersikkerhet', 'skyløsninger', 'IT-guider', 'Nornex'],
  openGraph: {
    title: 'Blogg | Nornex',
    description: 'Artikler om IT-sikkerhet, skyløsninger og teknologi fra Nornex.',
    type: 'website',
    locale: 'nb_NO',
  },
};

interface PageProps {
  searchParams: Promise<{ kategori?: string; side?: string }>;
}

async function BlogContent({ searchParams }: PageProps) {
  const params = await searchParams;
  const categorySlug = params.kategori || 'alle';
  const currentPage = parseInt(params.side || '1', 10);
  
  const { posts, pagination } = getPaginatedPosts(currentPage, 12, categorySlug);
  const categories = getCategories();
  const popularPosts = getPopularPosts(5);
  const popularTags = getPopularTags(12);
  const featuredPost = getFeaturedPost();
  
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section with Featured Post */}
      {currentPage === 1 && categorySlug === 'alle' && featuredPost && (
        <section className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                Nornex Blogg
              </h1>
              <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
                Artikler, guider og nyheter om IT-sikkerhet, skyløsninger og teknologi.
              </p>
            </div>
            <PostCard post={featuredPost} featured />
          </div>
        </section>
      )}
      
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Category Tabs */}
        <div className="mb-8">
          <Suspense fallback={<div className="h-10 animate-pulse bg-gray-200 rounded-lg" />}>
            <CategoryTabs categories={categories} activeCategory={categorySlug} />
          </Suspense>
        </div>
        
        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          {/* Main Content */}
          <div>
            {/* Results Info */}
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Viser {posts.length} av {pagination.totalItems} artikler
                {categorySlug !== 'alle' && (
                  <span> i kategorien <strong>{categories.find(c => c.slug === categorySlug)?.name}</strong></span>
                )}
              </p>
            </div>
            
            {/* Posts Grid */}
            {posts.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {posts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="rounded-lg border border-gray-200 bg-white p-12 text-center dark:border-gray-700 dark:bg-gray-800">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
                <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
                  Ingen artikler funnet
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  Det finnes ingen artikler i denne kategorien ennå.
                </p>
              </div>
            )}
            
            {/* Pagination */}
            <div className="mt-12">
              <Suspense fallback={null}>
                <Pagination pagination={pagination} />
              </Suspense>
            </div>
            
            {/* Newsletter CTA */}
            <div className="mt-12">
              <NewsletterSignup variant="inline" />
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="hidden lg:block">
            <div className="sticky top-8">
              <BlogSidebar 
                categories={categories} 
                popularPosts={popularPosts}
                tags={popularTags}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function BlogPage(props: PageProps) {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-pulse">
          <div className="h-8 w-48 bg-gray-300 rounded mb-4" />
          <div className="h-4 w-64 bg-gray-200 rounded" />
        </div>
      </div>
    }>
      <BlogContent {...props} />
    </Suspense>
  );
}
