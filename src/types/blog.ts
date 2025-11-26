// Blog Types for Nornex Blog System

export type BlogStatus = 'draft' | 'published' | 'scheduled';

export interface BlogCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
  postCount?: number;
  createdAt: string;
}

export interface BlogTag {
  id: number;
  name: string;
  slug: string;
}

export interface BlogAuthor {
  id: number;
  name: string;
  slug: string;
  avatar: string;
  bio: string;
  jobTitle: string;
  email: string;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
  postCount?: number;
  totalViews?: number;
}

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  category: BlogCategory;
  author: BlogAuthor;
  tags: BlogTag[];
  status: BlogStatus;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  views: number;
  readingTime: number;
  metaTitle?: string;
  metaDescription?: string;
  focusKeyword?: string;
}

export interface BlogPostCard {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  featuredImage: string;
  category: BlogCategory;
  author: Pick<BlogAuthor, 'name' | 'avatar' | 'slug'>;
  publishedAt: string;
  readingTime: number;
  views: number;
}

export interface NewsletterSubscriber {
  id: number;
  email: string;
  name?: string;
  subscribedAt: string;
  isActive: boolean;
}

export interface BlogAnalytics {
  totalPosts: number;
  totalViews: number;
  totalSubscribers: number;
  topPosts: BlogPostCard[];
  categoryBreakdown: { category: string; count: number }[];
  viewsOverTime: { date: string; views: number }[];
}

export interface SearchResult {
  posts: BlogPostCard[];
  totalResults: number;
  query: string;
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface BlogListResponse {
  posts: BlogPostCard[];
  pagination: PaginationInfo;
}
