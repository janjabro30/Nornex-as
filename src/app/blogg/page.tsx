/**
 * NORNEX AS - Blog Page (Norwegian)
 * @author NORNEX Development Team
 * @version 2.0.0
 * @copyright 2025 NORNEX AS
 */

import Link from 'next/link';
import { Calendar, Clock, ArrowRight, Search, Tag, Newspaper } from 'lucide-react';
import { PublicHeader, PublicFooter } from '@/components/public';
import { blogPosts, blogCategories, getFeaturedPost, getRecentPosts } from '@/lib/blog-data';

export default function BloggPage() {
  const featuredPost = getFeaturedPost();
  const recentPosts = getRecentPosts(10);

  return (
    <div className="min-h-screen bg-white">
      <PublicHeader />

      {/* Hero with Featured Post */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white sm:text-5xl">Blogg</h1>
            <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto">
              Tips, guider og nyheter om IT for bedrifter
            </p>
          </div>

          {/* Featured Post */}
          <Link
            href={`/blogg/${featuredPost.categorySlug}/${featuredPost.slug}`}
            className="block bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-colors group"
          >
            <div className="flex flex-wrap items-center gap-4 text-blue-300 text-sm mb-4">
              <span className="px-3 py-1 bg-blue-500/20 rounded-full">
                {featuredPost.category}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {new Date(featuredPost.publishedAt).toLocaleDateString('nb-NO')}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {featuredPost.readingTime} min lesetid
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white group-hover:text-blue-300 transition-colors">
              {featuredPost.title}
            </h2>
            <p className="mt-4 text-slate-300 line-clamp-2">
              {featuredPost.excerpt}
            </p>
            <div className="mt-6 flex items-center gap-2 text-blue-400 font-medium">
              Les mer <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Blog Posts */}
            <div className="lg:col-span-2">
              {/* Category Tabs */}
              <div className="flex flex-wrap gap-2 mb-8">
                <Link
                  href="/blogg"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium"
                >
                  Alle
                </Link>
                {blogCategories.map((category) => (
                  <Link
                    key={category.slug}
                    href={`/blogg?kategori=${category.slug}`}
                    className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-200 transition-colors"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>

              {/* Posts Grid */}
              <div className="grid gap-8 sm:grid-cols-2">
                {recentPosts.map((post) => (
                  <article
                    key={post.id}
                    className="group bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    {/* Image placeholder */}
                    <div className="aspect-video bg-slate-100 flex items-center justify-center">
                      <Newspaper className="h-12 w-12 text-slate-300" />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-3 text-sm text-slate-500 mb-3">
                        <span className="px-2 py-0.5 bg-slate-100 rounded text-slate-600">
                          {post.category}
                        </span>
                        <span>{new Date(post.publishedAt).toLocaleDateString('nb-NO')}</span>
                      </div>
                      <Link href={`/blogg/${post.categorySlug}/${post.slug}`}>
                        <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                      </Link>
                      <p className="mt-2 text-slate-600 text-sm line-clamp-3">
                        {post.excerpt}
                      </p>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-sm text-slate-500">
                          {post.readingTime} min lesetid
                        </span>
                        <Link
                          href={`/blogg/${post.categorySlug}/${post.slug}`}
                          className="text-blue-600 font-medium text-sm hover:text-blue-700"
                        >
                          Les mer →
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <aside className="space-y-8">
              {/* Search */}
              <div className="bg-slate-50 rounded-xl p-6">
                <h3 className="font-bold text-slate-900 mb-4">Søk i bloggen</h3>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Søk etter artikler..."
                    className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Categories */}
              <div className="bg-slate-50 rounded-xl p-6">
                <h3 className="font-bold text-slate-900 mb-4">Kategorier</h3>
                <div className="space-y-2">
                  {blogCategories.map((category) => (
                    <Link
                      key={category.slug}
                      href={`/blogg?kategori=${category.slug}`}
                      className="flex items-center justify-between py-2 text-slate-600 hover:text-blue-600 transition-colors"
                    >
                      <span>{category.name}</span>
                      <span className="text-sm text-slate-400">
                        {blogPosts.filter((p) => p.categorySlug === category.slug).length}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Popular Tags */}
              <div className="bg-slate-50 rounded-xl p-6">
                <h3 className="font-bold text-slate-900 mb-4">Populære emner</h3>
                <div className="flex flex-wrap gap-2">
                  {Array.from(new Set(blogPosts.flatMap((p) => p.tags)))
                    .slice(0, 10)
                    .map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-white border border-slate-200 rounded-full text-sm text-slate-600 hover:border-blue-300 hover:text-blue-600 cursor-pointer transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                </div>
              </div>

              {/* Newsletter */}
              <div className="bg-blue-600 rounded-xl p-6 text-white">
                <h3 className="font-bold mb-2">Nyhetsbrev</h3>
                <p className="text-blue-100 text-sm mb-4">
                  Få de nyeste artiklene rett i innboksen din.
                </p>
                <form className="space-y-3">
                  <input
                    type="email"
                    placeholder="din@epost.no"
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg placeholder-blue-200 text-white focus:ring-2 focus:ring-white/50"
                  />
                  <button
                    type="submit"
                    className="w-full py-2 bg-white text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    Abonner
                  </button>
                </form>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
