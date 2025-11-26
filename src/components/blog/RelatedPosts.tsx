import Link from 'next/link';
import { BlogPostCard } from '@/types/blog';

interface RelatedPostsProps {
  posts: BlogPostCard[];
}

export default function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) return null;
  
  return (
    <section className="mt-12 border-t border-gray-200 pt-12 dark:border-gray-700">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        Relaterte artikler
      </h2>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/blogg/${post.category.slug}/${post.slug}`}
            className="group"
          >
            <div className="aspect-video w-full overflow-hidden rounded-lg bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800">
              <div 
                className="h-full w-full transition-transform duration-300 group-hover:scale-105"
                style={post.featuredImage ? { 
                  backgroundImage: `url(${post.featuredImage})`, 
                  backgroundSize: 'cover', 
                  backgroundPosition: 'center' 
                } : {}}
              />
            </div>
            <div className="mt-3">
              <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
                {post.category.name}
              </span>
              <h3 className="mt-1 text-sm font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400 transition-colors">
                {post.title}
              </h3>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                {post.readingTime} min lesing
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
