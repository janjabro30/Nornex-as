import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import PostCard from '@/components/blog/PostCard';
import { getAuthorBySlug, getPostsByAuthor, toPostCard } from '@/lib/blog-utils';
import { blogAuthors } from '@/data/blog-data';

interface PageProps {
  params: Promise<{ author: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { author: authorSlug } = await params;
  const author = getAuthorBySlug(authorSlug);
  
  if (!author) {
    return {
      title: 'Forfatter ikke funnet | Nornex',
    };
  }
  
  return {
    title: `${author.name} | Nornex Blogg`,
    description: author.bio,
    openGraph: {
      title: `${author.name} - Forfatter | Nornex`,
      description: author.bio,
      type: 'profile',
      locale: 'nb_NO',
    },
  };
}

export async function generateStaticParams() {
  return blogAuthors.map((author) => ({
    author: author.slug,
  }));
}

export default async function AuthorPage({ params }: PageProps) {
  const { author: authorSlug } = await params;
  const author = getAuthorBySlug(authorSlug);
  
  if (!author) {
    notFound();
  }
  
  const posts = getPostsByAuthor(authorSlug);
  
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center gap-2 text-sm text-blue-200">
            <Link href="/blogg" className="hover:text-white transition-colors">
              Blogg
            </Link>
            <span>/</span>
            <span>Forfattere</span>
            <span>/</span>
            <span className="text-white">{author.name}</span>
          </nav>
          
          <div className="flex flex-col items-center text-center sm:flex-row sm:text-left sm:gap-8">
            {/* Avatar */}
            <div className="h-32 w-32 flex-shrink-0 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-5xl font-bold">
              {author.name.charAt(0)}
            </div>
            
            <div className="mt-6 sm:mt-0">
              <h1 className="text-3xl font-bold">{author.name}</h1>
              <p className="mt-1 text-lg text-blue-200">{author.jobTitle}</p>
              <p className="mt-4 max-w-xl text-blue-100">{author.bio}</p>
              
              {/* Stats */}
              <div className="mt-6 flex flex-wrap justify-center gap-6 sm:justify-start">
                <div>
                  <span className="text-2xl font-bold">{author.postCount}</span>
                  <span className="ml-1 text-blue-200">artikler</span>
                </div>
                <div>
                  <span className="text-2xl font-bold">
                    {(author.totalViews || 0).toLocaleString('nb-NO')}
                  </span>
                  <span className="ml-1 text-blue-200">visninger</span>
                </div>
              </div>
              
              {/* Social Links */}
              {author.socialLinks && (
                <div className="mt-6 flex justify-center gap-4 sm:justify-start">
                  {author.socialLinks.linkedin && (
                    <a
                      href={author.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full bg-white/20 p-2.5 hover:bg-white/30 transition-colors"
                      aria-label="LinkedIn"
                    >
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </a>
                  )}
                  {author.socialLinks.twitter && (
                    <a
                      href={author.socialLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full bg-white/20 p-2.5 hover:bg-white/30 transition-colors"
                      aria-label="Twitter"
                    >
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    </a>
                  )}
                  {author.socialLinks.github && (
                    <a
                      href={author.socialLinks.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full bg-white/20 p-2.5 hover:bg-white/30 transition-colors"
                      aria-label="GitHub"
                    >
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                      </svg>
                    </a>
                  )}
                  <a
                    href={`mailto:${author.email}`}
                    className="rounded-full bg-white/20 p-2.5 hover:bg-white/30 transition-colors"
                    aria-label="E-post"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
      
      {/* Articles */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Artikler av {author.name}
        </h2>
        
        {posts.length > 0 ? (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.id} post={toPostCard(post)} />
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-lg border border-gray-200 bg-white p-12 text-center dark:border-gray-700 dark:bg-gray-800">
            <p className="text-gray-600 dark:text-gray-400">
              Denne forfatteren har ikke publisert noen artikler ennå.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
