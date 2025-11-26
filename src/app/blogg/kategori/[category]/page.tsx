import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import PostCard from '@/components/blog/PostCard';
import BlogSidebar from '@/components/blog/BlogSidebar';
import { 
  getCategoryBySlug, 
  getPostsByCategory, 
  getCategories, 
  getPopularPosts,
  getPopularTags,
  toPostCard 
} from '@/lib/blog-utils';
import { blogCategories } from '@/data/blog-data';

interface PageProps {
  params: Promise<{ category: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);
  
  if (!category) {
    return {
      title: 'Kategori ikke funnet | Nornex',
    };
  }
  
  return {
    title: `${category.name} | Nornex Blogg`,
    description: category.description,
    openGraph: {
      title: `${category.name} - Artikler | Nornex`,
      description: category.description,
      type: 'website',
      locale: 'nb_NO',
    },
  };
}

export async function generateStaticParams() {
  return blogCategories.map((category) => ({
    category: category.slug,
  }));
}

export default async function CategoryPage({ params }: PageProps) {
  const { category: categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);
  
  if (!category) {
    notFound();
  }
  
  const posts = getPostsByCategory(categorySlug);
  const categories = getCategories();
  const popularPosts = getPopularPosts(5);
  const popularTags = getPopularTags(12);
  const relatedCategories = categories.filter(c => c.id !== category.id).slice(0, 4);
  
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center gap-2 text-sm text-blue-200">
            <Link href="/blogg" className="hover:text-white transition-colors">
              Blogg
            </Link>
            <span>/</span>
            <span className="text-white">{category.name}</span>
          </nav>
          
          <h1 className="text-4xl font-bold">{category.name}</h1>
          <p className="mt-4 max-w-2xl text-lg text-blue-100">
            {category.description}
          </p>
          <p className="mt-4 text-sm text-blue-200">
            {posts.length} {posts.length === 1 ? 'artikkel' : 'artikler'}
          </p>
        </div>
      </header>
      
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          {/* Main Content */}
          <div>
            {posts.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {posts.map((post) => (
                  <PostCard key={post.id} post={toPostCard(post)} />
                ))}
              </div>
            ) : (
              <div className="rounded-lg border border-gray-200 bg-white p-12 text-center dark:border-gray-700 dark:bg-gray-800">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
                <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
                  Ingen artikler ennå
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  Vi har ikke publisert noen artikler i denne kategorien ennå. Kom tilbake snart!
                </p>
                <Link
                  href="/blogg"
                  className="mt-6 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
                >
                  Se alle artikler
                </Link>
              </div>
            )}
            
            {/* Related Categories */}
            <section className="mt-12">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Andre kategorier
              </h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {relatedCategories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/blogg/kategori/${cat.slug}`}
                    className="group rounded-lg border border-gray-200 bg-white p-4 hover:border-blue-300 hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:hover:border-blue-700 transition-all"
                  >
                    <h3 className="font-medium text-gray-900 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400 transition-colors">
                      {cat.name}
                    </h3>
                    <p className="mt-1 text-sm text-gray-600 line-clamp-2 dark:text-gray-400">
                      {cat.description}
                    </p>
                    <p className="mt-2 text-xs text-gray-500 dark:text-gray-500">
                      {cat.postCount || 0} artikler
                    </p>
                  </Link>
                ))}
              </div>
            </section>
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
