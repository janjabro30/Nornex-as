import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getPostBySlug, getRelatedPosts, formatDate, getPublishedPosts } from '@/lib/blog-utils';
import ReadingProgress from '@/components/blog/ReadingProgress';
import SocialShare from '@/components/blog/SocialShare';
import AuthorCard from '@/components/blog/AuthorCard';
import RelatedPosts from '@/components/blog/RelatedPosts';
import NewsletterSignup from '@/components/blog/NewsletterSignup';
import TableOfContents from '@/components/blog/TableOfContents';

interface PageProps {
  params: Promise<{ category: string; slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  
  if (!post) {
    return {
      title: 'Artikkel ikke funnet | Nornex',
    };
  }
  
  return {
    title: post.metaTitle || `${post.title} | Nornex Blogg`,
    description: post.metaDescription || post.excerpt,
    keywords: post.tags.map(t => t.name).join(', '),
    authors: [{ name: post.author.name }],
    openGraph: {
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author.name],
      tags: post.tags.map(t => t.name),
      images: [post.featuredImage],
      locale: 'nb_NO',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.excerpt,
      images: [post.featuredImage],
    },
  };
}

export async function generateStaticParams() {
  const posts = getPublishedPosts();
  return posts.map((post) => ({
    category: post.category.slug,
    slug: post.slug,
  }));
}

function addHeadingIds(content: string): string {
  let counter = 0;
  return content.replace(/<(h[23])[^>]*>(.*?)<\/\1>/gi, (match, tag, text) => {
    const id = `heading-${counter++}`;
    return `<${tag} id="${id}" class="scroll-mt-20">${text}</${tag}>`;
  });
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug, category } = await params;
  const post = getPostBySlug(slug);
  
  if (!post || post.category.slug !== category) {
    notFound();
  }
  
  const relatedPosts = getRelatedPosts(post, 4);
  const contentWithIds = addHeadingIds(post.content);
  const postUrl = `https://nornex.no/blogg/${category}/${slug}`;
  
  // JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: post.featuredImage,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: {
      '@type': 'Person',
      name: post.author.name,
      jobTitle: post.author.jobTitle,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Nornex',
      logo: {
        '@type': 'ImageObject',
        url: 'https://nornex.no/images/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': postUrl,
    },
  };
  
  return (
    <>
      <ReadingProgress />
      
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <main className="min-h-screen bg-white dark:bg-gray-900">
        {/* Header */}
        <header className="relative bg-gradient-to-br from-blue-600 to-blue-800 text-white">
          <div className="absolute inset-0 bg-black/20" />
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{ backgroundImage: `url(${post.featuredImage})` }}
          />
          
          <div className="relative mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
            {/* Breadcrumb */}
            <nav className="mb-6 flex items-center gap-2 text-sm text-blue-200">
              <Link href="/blogg" className="hover:text-white transition-colors">
                Blogg
              </Link>
              <span>/</span>
              <Link 
                href={`/blogg/kategori/${post.category.slug}`}
                className="hover:text-white transition-colors"
              >
                {post.category.name}
              </Link>
            </nav>
            
            {/* Category Badge */}
            <Link 
              href={`/blogg/kategori/${post.category.slug}`}
              className="inline-block rounded-full bg-white/20 px-4 py-1 text-sm font-medium backdrop-blur-sm hover:bg-white/30 transition-colors"
            >
              {post.category.name}
            </Link>
            
            {/* Title */}
            <h1 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
              {post.title}
            </h1>
            
            {/* Meta */}
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <Link 
                href={`/blogg/forfatter/${post.author.slug}`}
                className="flex items-center gap-3 hover:opacity-90 transition-opacity"
              >
                <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center">
                  <span className="text-lg font-bold">{post.author.name.charAt(0)}</span>
                </div>
                <div>
                  <p className="font-medium">{post.author.name}</p>
                  <p className="text-sm text-blue-200">{post.author.jobTitle}</p>
                </div>
              </Link>
              
              <div className="flex items-center gap-4 text-sm text-blue-200">
                <span className="flex items-center gap-1">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {formatDate(post.publishedAt)}
                </span>
                <span className="flex items-center gap-1">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {post.readingTime} min lesing
                </span>
                <span className="flex items-center gap-1">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  {post.views} visninger
                </span>
              </div>
            </div>
            
            {/* Social Share */}
            <div className="mt-6">
              <SocialShare url={postUrl} title={post.title} description={post.excerpt} />
            </div>
          </div>
        </header>
        
        {/* Content */}
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1fr_280px]">
            {/* Main Content */}
            <article>
              {/* Article Content */}
              <div 
                className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-bold prose-a:text-blue-600 hover:prose-a:text-blue-700 prose-blockquote:border-blue-600 prose-blockquote:bg-blue-50 prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:rounded-r-lg dark:prose-blockquote:bg-blue-900/30 prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:before:content-[''] prose-code:after:content-[''] dark:prose-code:bg-gray-800 prose-pre:bg-gray-900 prose-img:rounded-xl"
                dangerouslySetInnerHTML={{ __html: contentWithIds }}
              />
              
              {/* Tags */}
              <div className="mt-8 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Link
                    key={tag.id}
                    href={`/blogg/sok?tag=${tag.slug}`}
                    className="rounded-full bg-gray-100 px-4 py-1.5 text-sm font-medium text-gray-700 hover:bg-blue-100 hover:text-blue-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-blue-900 dark:hover:text-blue-300 transition-colors"
                  >
                    #{tag.name}
                  </Link>
                ))}
              </div>
              
              {/* Share Again */}
              <div className="mt-8 rounded-xl border border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Del denne artikkelen
                </h3>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  Syntes du artikkelen var nyttig? Del den med kollegaer og venner.
                </p>
                <div className="mt-4">
                  <SocialShare url={postUrl} title={post.title} description={post.excerpt} />
                </div>
              </div>
              
              {/* Author Bio */}
              <div className="mt-8">
                <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                  Om forfatteren
                </h3>
                <AuthorCard author={post.author} />
              </div>
              
              {/* Related Posts */}
              <RelatedPosts posts={relatedPosts} />
              
              {/* Newsletter */}
              <div className="mt-12">
                <NewsletterSignup variant="inline" />
              </div>
            </article>
            
            {/* Sidebar */}
            <aside className="hidden lg:block">
              <div className="sticky top-8 space-y-6">
                <TableOfContents content={post.content} />
                
                {/* Quick Info */}
                <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-800">
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Raskt overblikk
                  </h4>
                  <dl className="mt-4 space-y-3 text-sm">
                    <div className="flex justify-between">
                      <dt className="text-gray-600 dark:text-gray-400">Kategori</dt>
                      <dd className="font-medium text-gray-900 dark:text-white">{post.category.name}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600 dark:text-gray-400">Lesetid</dt>
                      <dd className="font-medium text-gray-900 dark:text-white">{post.readingTime} min</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600 dark:text-gray-400">Visninger</dt>
                      <dd className="font-medium text-gray-900 dark:text-white">{post.views.toLocaleString('nb-NO')}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600 dark:text-gray-400">Publisert</dt>
                      <dd className="font-medium text-gray-900 dark:text-white">{formatDate(post.publishedAt)}</dd>
                    </div>
                  </dl>
                </div>
                
                {/* CTA */}
                <div className="rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 p-5 text-white">
                  <h4 className="font-semibold">Trenger du hjelp?</h4>
                  <p className="mt-2 text-sm text-blue-100">
                    Vi hjelper deg med IT-sikkerhet, skyløsninger og mer.
                  </p>
                  <a
                    href="/kontakt"
                    className="mt-4 inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 transition-colors"
                  >
                    Kontakt oss
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </>
  );
}
