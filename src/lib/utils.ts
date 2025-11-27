/**
 * NORNEX AS - Utility Functions
 * @author NORNEX Development Team
 * @version 2.0.0
 * @copyright 2025 NORNEX AS
 */

import { clsx, type ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatCurrency(amount: number, currency = 'NOK'): string {
  return new Intl.NumberFormat('nb-NO', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('nb-NO').format(num);
}

export function formatPercentage(value: number): string {
  return `${value >= 0 ? '+' : ''}${value}%`;
}

export function formatDate(date: Date | string, locale = 'nb-NO'): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatDateTime(date: Date | string, locale = 'nb-NO'): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleString(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function validateOrgNumber(orgNumber: string): boolean {
  const cleaned = orgNumber.replace(/\s/g, '');
  if (!/^\d{9}$/.test(cleaned)) return false;
  
  const weights = [3, 2, 7, 6, 5, 4, 3, 2];
  const digits = cleaned.split('').map(Number);
  
  const sum = weights.reduce((acc, weight, i) => acc + weight * digits[i], 0);
  const remainder = sum % 11;
  const checkDigit = remainder === 0 ? 0 : 11 - remainder;
  
  return checkDigit === digits[8];
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePostalCode(postalCode: string): boolean {
  return /^\d{4}$/.test(postalCode);
}

export function generateId(): string {
  // Use crypto.randomUUID for secure ID generation
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Fallback for environments without crypto.randomUUID
  return `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
}

export function truncate(str: string, length: number): string {
  return str.length > length ? `${str.substring(0, length)}...` : str;
}

export function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

export function getRiskColor(score: number): string {
  if (score >= 70) return 'text-red-600 bg-red-100';
  if (score >= 40) return 'text-yellow-600 bg-yellow-100';
  return 'text-green-600 bg-green-100';
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    active: 'text-green-600 bg-green-100',
    inactive: 'text-gray-600 bg-gray-100',
    pending: 'text-yellow-600 bg-yellow-100',
    completed: 'text-blue-600 bg-blue-100',
    failed: 'text-red-600 bg-red-100',
  };
  return colors[status.toLowerCase()] || 'text-gray-600 bg-gray-100';
}
