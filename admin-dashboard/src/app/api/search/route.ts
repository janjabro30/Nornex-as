/**
 * NORNEX AS - Search API
 */

import { NextRequest, NextResponse } from 'next/server';
import { productsData as products } from '@/lib/products-data';
import { servicesData as services } from '@/lib/services-data';
import { blogPosts } from '@/lib/blog-data';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q')?.toLowerCase() || '';
  const type = searchParams.get('type'); // 'products', 'services', 'blog', or 'all'

  if (!query) {
    return NextResponse.json(
      { error: 'Search query is required' },
      { status: 400 }
    );
  }

  const results: {
    products: typeof products;
    services: typeof services;
    blogPosts: typeof blogPosts;
  } = {
    products: [],
    services: [],
    blogPosts: [],
  };

  // Search products
  if (!type || type === 'products' || type === 'all') {
    results.products = products.filter(p =>
      p.name.toLowerCase().includes(query) ||
      p.brand.toLowerCase().includes(query) ||
      p.description?.toLowerCase().includes(query)
    ).slice(0, 10);
  }

  // Search services
  if (!type || type === 'services' || type === 'all') {
    results.services = services.filter(s =>
      s.title.toLowerCase().includes(query) ||
      s.shortDescription.toLowerCase().includes(query)
    ).slice(0, 10);
  }

  // Search blog posts
  if (!type || type === 'blog' || type === 'all') {
    results.blogPosts = blogPosts.filter(p =>
      p.title.toLowerCase().includes(query) ||
      p.excerpt.toLowerCase().includes(query)
    ).slice(0, 10);
  }

  return NextResponse.json({
    query,
    results,
    totalResults: results.products.length + results.services.length + results.blogPosts.length,
  });
}
