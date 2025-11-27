/**
 * NORNEX AS - Blog Post Page (Norwegian)
 * @author NORNEX Development Team
 * @version 2.0.0
 * @copyright 2025 NORNEX AS
 */

import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  Calendar,
  Clock,
  ChevronRight,
  User,
  Facebook,
  Twitter,
  Linkedin,
  ArrowLeft,
  Newspaper,
} from 'lucide-react';
import { PublicHeader, PublicFooter } from '@/components/public';
import { getBlogPostBySlug, getRecentPosts, blogCategories } from '@/lib/blog-data';

interface BlogPostPageProps {
  params: Promise<{ category: string; slug: string }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { category, slug } = await params;
  const post = getBlogPostBySlug(category, slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRecentPosts(4).filter((p) => p.id !== post.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-white">
      <PublicHeader />

      {/* Breadcrumb */}
      <div className="bg-slate-50 border-b">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-slate-500 hover:text-blue-600">
              Hjem
            </Link>
            <ChevronRight className="h-4 w-4 text-slate-400" />
            <Link href="/blogg" className="text-slate-500 hover:text-blue-600">
              Blogg
            </Link>
            <ChevronRight className="h-4 w-4 text-slate-400" />
            <Link
              href={`/blogg?kategori=${post.categorySlug}`}
              className="text-slate-500 hover:text-blue-600"
            >
              {post.category}
            </Link>
            <ChevronRight className="h-4 w-4 text-slate-400" />
            <span className="text-slate-900 font-medium truncate">{post.title}</span>
          </nav>
        </div>
      </div>

      {/* Article */}
      <article className="py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <header className="text-center mb-12">
            <div className="flex items-center justify-center gap-4 text-sm text-slate-500 mb-4">
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-medium">
                {post.category}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {new Date(post.publishedAt).toLocaleDateString('nb-NO', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {post.readingTime} min lesetid
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
              {post.title}
            </h1>
            <p className="mt-6 text-xl text-slate-600">{post.excerpt}</p>
          </header>

          {/* Featured Image Placeholder */}
          <div className="aspect-video bg-slate-100 rounded-2xl mb-12 flex items-center justify-center">
            <Newspaper className="h-20 w-20 text-slate-300" />
          </div>

          {/* Content */}
          <div className="prose prose-lg prose-slate max-w-none prose-headings:font-bold prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline">
            <div
              dangerouslySetInnerHTML={{
                __html: post.content
                  .replace(/^## /gm, '<h2>')
                  .replace(/\n(?=<h2>)/g, '</p>')
                  .replace(/^### /gm, '<h3>')
                  .replace(/\n(?=<h3>)/g, '</p>')
                  .replace(/^- /gm, '<li>')
                  .replace(/\n(?=<li>)/g, '</li>\n')
                  .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                  .replace(/\n\n/g, '</p><p>')
                  .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>'),
              }}
            />
          </div>

          {/* Tags */}
          <div className="mt-12 pt-8 border-t">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-slate-500 font-medium">Emner:</span>
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Share */}
          <div className="mt-8 pt-8 border-t">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 bg-slate-200 rounded-full flex items-center justify-center">
                  <User className="h-6 w-6 text-slate-400" />
                </div>
                <div>
                  <div className="font-medium text-slate-900">{post.author}</div>
                  <div className="text-sm text-slate-500">IT-ekspert hos NORNEX AS</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-500 mr-2">Del:</span>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                    `https://nornex.no/blogg/${post.categorySlug}/${post.slug}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                    `https://nornex.no/blogg/${post.categorySlug}/${post.slug}`
                  )}&text=${encodeURIComponent(post.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-slate-400 hover:text-blue-400 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a
                  href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
                    `https://nornex.no/blogg/${post.categorySlug}/${post.slug}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-slate-400 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-12 bg-slate-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-8">Relaterte artikler</h2>
            <div className="grid gap-8 md:grid-cols-3">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  href={`/blogg/${relatedPost.categorySlug}/${relatedPost.slug}`}
                  className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
                >
                  <div className="aspect-video bg-slate-100 flex items-center justify-center">
                    <Newspaper className="h-10 w-10 text-slate-300" />
                  </div>
                  <div className="p-6">
                    <span className="text-sm text-slate-500">{relatedPost.category}</span>
                    <h3 className="mt-2 font-bold text-slate-900 group-hover:text-blue-600 line-clamp-2">
                      {relatedPost.title}
                    </h3>
                    <p className="mt-2 text-sm text-slate-600 line-clamp-2">
                      {relatedPost.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Back to Blog */}
      <div className="py-8">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/blogg"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
          >
            <ArrowLeft className="h-4 w-4" />
            Tilbake til bloggen
          </Link>
        </div>
      </div>

      <PublicFooter />
    </div>
  );
}
