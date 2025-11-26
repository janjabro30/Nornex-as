import Link from 'next/link';
import { BlogPostCard } from '@/types/blog';
import { formatDate } from '@/lib/blog-utils';

interface PostCardProps {
  post: BlogPostCard;
  featured?: boolean;
}

export default function PostCard({ post, featured = false }: PostCardProps) {
  const postUrl = `/blogg/${post.category.slug}/${post.slug}`;
  
  if (featured) {
    return (
      <article className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="absolute inset-0 bg-black/30" />
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url(${post.featuredImage})` }}
        />
        <div className="relative p-8 md:p-12">
          <Link 
            href={`/blogg/kategori/${post.category.slug}`}
            className="inline-block rounded-full bg-white/20 px-4 py-1 text-sm font-medium backdrop-blur-sm hover:bg-white/30 transition-colors"
          >
            {post.category.name}
          </Link>
          <Link href={postUrl}>
            <h2 className="mt-4 text-2xl md:text-4xl font-bold leading-tight hover:underline">
              {post.title}
            </h2>
          </Link>
          <p className="mt-4 text-lg text-white/90 line-clamp-3">
            {post.excerpt}
          </p>
          <div className="mt-6 flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
                <span className="text-sm font-bold">{post.author.name.charAt(0)}</span>
              </div>
              <div>
                <Link 
                  href={`/blogg/forfatter/${post.author.slug}`}
                  className="font-medium hover:underline"
                >
                  {post.author.name}
                </Link>
                <div className="flex items-center gap-2 text-sm text-white/70">
                  <span>{formatDate(post.publishedAt)}</span>
                  <span>·</span>
                  <span>{post.readingTime} min lesing</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    );
  }
  
  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-lg dark:border-gray-700 dark:bg-gray-800">
      <Link href={postUrl} className="relative aspect-video overflow-hidden">
        <div 
          className="h-full w-full bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 transition-transform duration-300 group-hover:scale-105"
          style={post.featuredImage ? { backgroundImage: `url(${post.featuredImage})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
        >
          {!post.featuredImage && (
            <div className="flex h-full items-center justify-center">
              <svg className="h-12 w-12 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
          )}
        </div>
        <div className="absolute top-3 left-3">
          <span className="inline-block rounded-full bg-blue-600 px-3 py-1 text-xs font-medium text-white shadow-sm">
            {post.category.name}
          </span>
        </div>
      </Link>
      
      <div className="flex flex-1 flex-col p-5">
        <Link href={postUrl}>
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400 transition-colors">
            {post.title}
          </h3>
        </Link>
        
        <p className="mt-2 flex-1 text-sm text-gray-600 line-clamp-3 dark:text-gray-300">
          {post.excerpt}
        </p>
        
        <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center dark:bg-blue-900">
              <span className="text-xs font-bold text-blue-600 dark:text-blue-300">
                {post.author.name.charAt(0)}
              </span>
            </div>
            <Link 
              href={`/blogg/forfatter/${post.author.slug}`}
              className="text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
            >
              {post.author.name}
            </Link>
          </div>
          
          <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {post.readingTime} min
            </span>
            <span className="flex items-center gap-1">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              {post.views}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
