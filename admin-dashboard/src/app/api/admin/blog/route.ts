/**
 * NORNEX AS - Admin Blog API
 */

import { NextRequest, NextResponse } from 'next/server';
import { blogPosts } from '@/lib/blog-data';

export async function GET() {
  return NextResponse.json({ posts: blogPosts });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const newPost = {
    id: `POST-${Date.now()}`,
    ...body,
    createdAt: new Date().toISOString(),
  };
  return NextResponse.json({ success: true, post: newPost });
}

export async function PUT(request: NextRequest) {
  const body = await request.json();
  return NextResponse.json({ success: true, message: 'Blog post updated' });
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  return NextResponse.json({ success: true, message: 'Blog post deleted' });
}
