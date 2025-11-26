import { NextResponse } from 'next/server';
import { getPaginatedPosts } from '@/lib/blog-utils';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category') || undefined;
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '12', 10);
  
  const result = getPaginatedPosts(page, limit, category);
  
  return NextResponse.json(result);
}
