/**
 * NORNEX AS - Single Blog Post API
 */

import { NextRequest, NextResponse } from 'next/server';
import { blogPosts } from '@/lib/blog-data';

interface Params {
  params: Promise<{ slug: string }>;
}

export async function GET(request: NextRequest, { params }: Params) {
  const { slug } = await params;
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    return NextResponse.json(
      { error: 'Blog post not found' },
      { status: 404 }
    );
  }

  return NextResponse.json(post);
}
