'use client';

import { useEffect, useState } from 'react';

interface ReadingProgressProps {
  targetRef?: React.RefObject<HTMLElement | null>;
}

export default function ReadingProgress({ targetRef }: ReadingProgressProps) {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      const target = targetRef?.current || document.documentElement;
      const scrollTop = window.scrollY;
      const docHeight = target.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setProgress(Math.min(100, Math.max(0, scrollPercent)));
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [targetRef]);
  
  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-gray-200 dark:bg-gray-800">
      <div
        className="h-full bg-blue-600 transition-all duration-100"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
