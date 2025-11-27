/**
 * NORNEX AS - Blog Posts API
 */

import { NextRequest, NextResponse } from 'next/server';
import { blogPosts, blogCategories } from '@/lib/blog-data';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const page = parseInt(searchParams.get('page') || '1');
  const perPage = parseInt(searchParams.get('perPage') || '10');

  let filteredPosts = [...blogPosts];

  // Filter by category
  if (category) {
    filteredPosts = filteredPosts.filter(p => p.category === category);
  }

  // Sort by date (newest first)
  filteredPosts.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  // Pagination
  const total = filteredPosts.length;
  const start = (page - 1) * perPage;
  const paginatedPosts = filteredPosts.slice(start, start + perPage);

  return NextResponse.json({
    posts: paginatedPosts,
    categories: blogCategories,
    pagination: {
      page,
      perPage,
      total,
      totalPages: Math.ceil(total / perPage),
    },
  });
}
