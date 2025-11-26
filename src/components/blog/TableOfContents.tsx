'use client';

import { useEffect, useState } from 'react';

interface TableOfContentsProps {
  content: string;
}

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

// Extract headings using regex instead of DOMParser for SSR compatibility
function extractHeadings(htmlContent: string): TOCItem[] {
  const headingRegex = /<(h[23])[^>]*>(.*?)<\/\1>/gi;
  const items: TOCItem[] = [];
  let match;
  let index = 0;
  
  while ((match = headingRegex.exec(htmlContent)) !== null) {
    const tag = match[1].toLowerCase();
    // Strip any HTML tags from the heading text
    const text = match[2].replace(/<[^>]*>/g, '').trim();
    items.push({
      id: `heading-${index}`,
      text,
      level: tag === 'h2' ? 2 : 3,
    });
    index++;
  }
  
  return items;
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');
  
  // Extract headings using regex (SSR safe)
  const headings = extractHeadings(content);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -80% 0px' }
    );
    
    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    
    return () => observer.disconnect();
  }, [headings]);
  
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  if (headings.length === 0) return null;
  
  return (
    <nav className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-800">
      <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
        Innhold
      </h4>
      <ul className="mt-4 space-y-2">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              onClick={(e) => handleClick(e, heading.id)}
              className={`block text-sm transition-colors ${
                heading.level === 3 ? 'pl-4' : ''
              } ${
                activeId === heading.id
                  ? 'font-medium text-blue-600 dark:text-blue-400'
                  : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200'
              }`}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
