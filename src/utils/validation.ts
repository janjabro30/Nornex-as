/**
 * Validation utility functions for Nornex AS platform
 */

/**
 * Validate that a value is a positive number
 * @param value - The value to validate
 * @returns true if value is a positive number (greater than 0)
 */
export function validatePositiveNumber(value: number): boolean {
  return value > 0;
}

/**
 * Validate email address format
 * @param email - The email address to validate
 * @returns true if email format is valid
 */
export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
