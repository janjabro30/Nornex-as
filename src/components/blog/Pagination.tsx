'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { PaginationInfo } from '@/types/blog';

interface PaginationProps {
  pagination: PaginationInfo;
  baseUrl?: string;
}

export default function Pagination({ pagination, baseUrl = '/blogg' }: PaginationProps) {
  const searchParams = useSearchParams();
  
  const createPageUrl = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (page === 1) {
      params.delete('side');
    } else {
      params.set('side', page.toString());
    }
    const queryString = params.toString();
    return queryString ? `${baseUrl}?${queryString}` : baseUrl;
  };
  
  if (pagination.totalPages <= 1) return null;
  
  const pages = [];
  const maxVisiblePages = 5;
  let startPage = Math.max(1, pagination.currentPage - Math.floor(maxVisiblePages / 2));
  const endPage = Math.min(pagination.totalPages, startPage + maxVisiblePages - 1);
  
  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }
  
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }
  
  return (
    <nav className="flex items-center justify-center gap-1" aria-label="Paginering">
      {/* Previous button */}
      <Link
        href={createPageUrl(pagination.currentPage - 1)}
        className={`flex h-10 items-center justify-center rounded-lg px-3 text-sm font-medium transition-colors ${
          pagination.hasPrevPage
            ? 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
            : 'pointer-events-none bg-gray-50 text-gray-400 dark:bg-gray-900 dark:text-gray-600'
        }`}
        aria-disabled={!pagination.hasPrevPage}
        tabIndex={pagination.hasPrevPage ? 0 : -1}
      >
        <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Forrige
      </Link>
      
      {/* First page */}
      {startPage > 1 && (
        <>
          <Link
            href={createPageUrl(1)}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            1
          </Link>
          {startPage > 2 && (
            <span className="flex h-10 w-10 items-center justify-center text-gray-500">...</span>
          )}
        </>
      )}
      
      {/* Page numbers */}
      {pages.map((page) => (
        <Link
          key={page}
          href={createPageUrl(page)}
          className={`flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium transition-colors ${
            page === pagination.currentPage
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
          }`}
          aria-current={page === pagination.currentPage ? 'page' : undefined}
        >
          {page}
        </Link>
      ))}
      
      {/* Last page */}
      {endPage < pagination.totalPages && (
        <>
          {endPage < pagination.totalPages - 1 && (
            <span className="flex h-10 w-10 items-center justify-center text-gray-500">...</span>
          )}
          <Link
            href={createPageUrl(pagination.totalPages)}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            {pagination.totalPages}
          </Link>
        </>
      )}
      
      {/* Next button */}
      <Link
        href={createPageUrl(pagination.currentPage + 1)}
        className={`flex h-10 items-center justify-center rounded-lg px-3 text-sm font-medium transition-colors ${
          pagination.hasNextPage
            ? 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
            : 'pointer-events-none bg-gray-50 text-gray-400 dark:bg-gray-900 dark:text-gray-600'
        }`}
        aria-disabled={!pagination.hasNextPage}
        tabIndex={pagination.hasNextPage ? 0 : -1}
      >
        Neste
        <svg className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </Link>
    </nav>
  );
}
