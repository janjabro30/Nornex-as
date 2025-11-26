import { BlogPost, BlogPostCard, BlogListResponse, PaginationInfo, BlogCategory, BlogAuthor, SearchResult } from '@/types/blog';
import { blogPosts, blogCategories, blogAuthors, blogTags } from '@/data/blog-data';

/**
 * Calculate reading time for content
 */
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const textContent = content.replace(/<[^>]*>/g, ''); // Remove HTML tags
  const wordCount = textContent.split(/\s+/).filter(word => word.length > 0).length;
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
}

/**
 * Format date in Norwegian format
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  
  // Validate date
  if (isNaN(date.getTime())) {
    return 'Ukjent dato';
  }
  
  const months = [
    'januar', 'februar', 'mars', 'april', 'mai', 'juni',
    'juli', 'august', 'september', 'oktober', 'november', 'desember'
  ];
  return `${date.getDate()}. ${months[date.getMonth()]} ${date.getFullYear()}`;
}

/**
 * Format relative date
 */
export function formatRelativeDate(dateString: string): string {
  const date = new Date(dateString);
  
  // Validate date
  if (isNaN(date.getTime())) {
    return 'Ukjent dato';
  }
  
  const now = new Date();
  const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
  
  if (diffInDays === 0) return 'I dag';
  if (diffInDays === 1) return 'I går';
  if (diffInDays < 7) return `${diffInDays} dager siden`;
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} uker siden`;
  if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} måneder siden`;
  return `${Math.floor(diffInDays / 365)} år siden`;
}

/**
 * Convert BlogPost to BlogPostCard
 */
export function toPostCard(post: BlogPost): BlogPostCard {
  return {
    id: post.id,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    featuredImage: post.featuredImage,
    category: post.category,
    author: {
      name: post.author.name,
      avatar: post.author.avatar,
      slug: post.author.slug,
    },
    publishedAt: post.publishedAt,
    readingTime: post.readingTime,
    views: post.views,
  };
}

/**
 * Get published posts sorted by date
 */
export function getPublishedPosts(): BlogPost[] {
  return blogPosts
    .filter(post => post.status === 'published')
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

/**
 * Get posts with pagination
 */
export function getPaginatedPosts(
  page: number = 1,
  limit: number = 12,
  categorySlug?: string
): BlogListResponse {
  let posts = getPublishedPosts();
  
  if (categorySlug && categorySlug !== 'alle') {
    posts = posts.filter(post => post.category.slug === categorySlug);
  }
  
  const totalItems = posts.length;
  const totalPages = Math.ceil(totalItems / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  
  const paginatedPosts = posts.slice(startIndex, endIndex).map(toPostCard);
  
  const pagination: PaginationInfo = {
    currentPage: page,
    totalPages,
    totalItems,
    itemsPerPage: limit,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1,
  };
  
  return { posts: paginatedPosts, pagination };
}

/**
 * Get a single post by slug
 */
export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug && post.status === 'published');
}

/**
 * Get posts by category
 */
export function getPostsByCategory(categorySlug: string): BlogPost[] {
  return getPublishedPosts().filter(post => post.category.slug === categorySlug);
}

/**
 * Get posts by author
 */
export function getPostsByAuthor(authorSlug: string): BlogPost[] {
  return getPublishedPosts().filter(post => post.author.slug === authorSlug);
}

/**
 * Get posts by tag
 */
export function getPostsByTag(tagSlug: string): BlogPost[] {
  return getPublishedPosts().filter(post => 
    post.tags.some(tag => tag.slug === tagSlug)
  );
}

/**
 * Get related posts
 */
export function getRelatedPosts(currentPost: BlogPost, limit: number = 4): BlogPostCard[] {
  const posts = getPublishedPosts().filter(post => post.id !== currentPost.id);
  
  // Score posts based on relevance
  const scoredPosts = posts.map(post => {
    let score = 0;
    
    // Same category: 60% weight
    if (post.category.id === currentPost.category.id) {
      score += 60;
    }
    
    // Same tags: 30% weight
    const currentTagIds = currentPost.tags.map(t => t.id);
    const matchingTags = post.tags.filter(t => currentTagIds.includes(t.id)).length;
    score += (matchingTags / Math.max(currentPost.tags.length, 1)) * 30;
    
    // Same author: 10% weight
    if (post.author.id === currentPost.author.id) {
      score += 10;
    }
    
    return { post, score };
  });
  
  // Sort by score and get top results
  return scoredPosts
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ post }) => toPostCard(post));
}

/**
 * Get popular posts
 */
export function getPopularPosts(limit: number = 5): BlogPostCard[] {
  return getPublishedPosts()
    .sort((a, b) => b.views - a.views)
    .slice(0, limit)
    .map(toPostCard);
}

/**
 * Get featured post (most recent or most viewed)
 */
export function getFeaturedPost(): BlogPostCard | null {
  const posts = getPublishedPosts();
  if (posts.length === 0) return null;
  return toPostCard(posts[0]);
}

/**
 * Search posts
 */
export function searchPosts(
  query: string,
  options?: {
    categorySlug?: string;
    authorSlug?: string;
    limit?: number;
  }
): SearchResult {
  const searchQuery = query.toLowerCase().trim();
  
  if (!searchQuery) {
    return { posts: [], totalResults: 0, query };
  }
  
  let posts = getPublishedPosts();
  
  // Filter by category if specified
  if (options?.categorySlug) {
    posts = posts.filter(post => post.category.slug === options.categorySlug);
  }
  
  // Filter by author if specified
  if (options?.authorSlug) {
    posts = posts.filter(post => post.author.slug === options.authorSlug);
  }
  
  // Search in title, excerpt, content, and tags
  const results = posts.filter(post => {
    const titleMatch = post.title.toLowerCase().includes(searchQuery);
    const excerptMatch = post.excerpt.toLowerCase().includes(searchQuery);
    const contentMatch = post.content.toLowerCase().includes(searchQuery);
    const tagMatch = post.tags.some(tag => tag.name.toLowerCase().includes(searchQuery));
    const categoryMatch = post.category.name.toLowerCase().includes(searchQuery);
    
    return titleMatch || excerptMatch || contentMatch || tagMatch || categoryMatch;
  });
  
  const limitedResults = options?.limit ? results.slice(0, options.limit) : results;
  
  return {
    posts: limitedResults.map(toPostCard),
    totalResults: results.length,
    query,
  };
}

/**
 * Get all categories with post counts
 */
export function getCategories(): BlogCategory[] {
  return blogCategories.map(category => ({
    ...category,
    postCount: getPostsByCategory(category.slug).length,
  }));
}

/**
 * Get category by slug
 */
export function getCategoryBySlug(slug: string): BlogCategory | undefined {
  return blogCategories.find(cat => cat.slug === slug);
}

/**
 * Get author by slug
 */
export function getAuthorBySlug(slug: string): BlogAuthor | undefined {
  const author = blogAuthors.find(a => a.slug === slug);
  if (!author) return undefined;
  
  const authorPosts = getPostsByAuthor(slug);
  return {
    ...author,
    postCount: authorPosts.length,
    totalViews: authorPosts.reduce((sum, post) => sum + post.views, 0),
  };
}

/**
 * Get all authors
 */
export function getAuthors(): BlogAuthor[] {
  return blogAuthors.map(author => {
    const authorPosts = getPostsByAuthor(author.slug);
    return {
      ...author,
      postCount: authorPosts.length,
      totalViews: authorPosts.reduce((sum, post) => sum + post.views, 0),
    };
  });
}

/**
 * Get all tags
 */
export function getTags() {
  return blogTags;
}

/**
 * Get popular tags (by usage)
 */
export function getPopularTags(limit: number = 10) {
  const tagCounts = new Map<number, number>();
  
  getPublishedPosts().forEach(post => {
    post.tags.forEach(tag => {
      tagCounts.set(tag.id, (tagCounts.get(tag.id) || 0) + 1);
    });
  });
  
  return blogTags
    .map(tag => ({ ...tag, count: tagCounts.get(tag.id) || 0 }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
}

/**
 * Generate excerpt from content
 */
export function generateExcerpt(content: string, maxLength: number = 160): string {
  const textContent = content.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
  if (textContent.length <= maxLength) return textContent;
  return textContent.substring(0, maxLength).trim() + '...';
}

/**
 * Generate slug from title
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/æ/g, 'ae')
    .replace(/ø/g, 'o')
    .replace(/å/g, 'a')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

/**
 * Get blog analytics
 */
export function getBlogAnalytics() {
  const posts = getPublishedPosts();
  const totalViews = posts.reduce((sum, post) => sum + post.views, 0);
  
  const categoryBreakdown = blogCategories.map(category => ({
    category: category.name,
    count: posts.filter(p => p.category.id === category.id).length,
  }));
  
  // Mock views over time (last 7 days)
  const viewsOverTime = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    return {
      date: date.toISOString().split('T')[0],
      views: Math.floor(Math.random() * 500) + 100,
    };
  });
  
  return {
    totalPosts: posts.length,
    totalViews,
    totalSubscribers: 5, // From mock data
    topPosts: getPopularPosts(10),
    categoryBreakdown,
    viewsOverTime,
  };
}
