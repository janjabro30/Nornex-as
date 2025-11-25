/**
 * Formatting utility functions for Nornex AS platform
 * Norwegian locale formatting for currency and dates
 */

/**
 * Format amount as Norwegian currency with optional VAT
 * @param amount - The base amount to format
 * @param includeVAT - Whether to include 25% Norwegian VAT (default: true)
 * @returns Formatted currency string in Norwegian format
 */
export function formatCurrency(amount: number, includeVAT: boolean = true): string {
  const multiplier = includeVAT ? 1.25 : 1;
  return `${(amount * multiplier).toLocaleString('no-NO')} kr`;
}

/**
 * Format date in Norwegian locale format
 * @param date - Date to format (string or Date object)
 * @returns Formatted date string in Norwegian format (dd.mm.yyyy)
 */
export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString('no-NO');
}
