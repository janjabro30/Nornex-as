import { MetadataRoute } from 'next';
import { getPublishedPosts, getCategories, getAuthors } from '@/lib/blog-utils';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://nornex.no';
  const posts = getPublishedPosts();
  const categories = getCategories();
  const authors = getAuthors();
  
  // Blog posts
  const blogPosts: MetadataRoute.Sitemap = posts.map(post => ({
    url: `${baseUrl}/blogg/${post.category.slug}/${post.slug}`,
    lastModified: new Date(post.updatedAt),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));
  
  // Categories
  const categoryPages: MetadataRoute.Sitemap = categories.map(category => ({
    url: `${baseUrl}/blogg/kategori/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));
  
  // Authors
  const authorPages: MetadataRoute.Sitemap = authors.map(author => ({
    url: `${baseUrl}/blogg/forfatter/${author.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));
  
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/blogg`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blogg/sok`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];
  
  return [...staticPages, ...blogPosts, ...categoryPages, ...authorPages];
}
