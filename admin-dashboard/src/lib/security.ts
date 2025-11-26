/**
 * NORNEX AS - Security Utilities
 * @author NORNEX Development Team
 * @version 2.0.0
 * @copyright 2025 NORNEX AS
 */

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { SECURITY_CONFIG } from './constants';

function getJWTSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET environment variable is required');
  }
  return secret;
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SECURITY_CONFIG.bcryptRounds);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function generateToken(payload: object): string {
  return jwt.sign(payload, getJWTSecret(), { expiresIn: SECURITY_CONFIG.jwtExpiry });
}

export function verifyToken(token: string): jwt.JwtPayload | null {
  try {
    return jwt.verify(token, getJWTSecret()) as jwt.JwtPayload;
  } catch {
    return null;
  }
}

export function generateCSRFToken(): string {
  const array = new Uint8Array(SECURITY_CONFIG.csrfTokenLength);
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    crypto.getRandomValues(array);
  } else {
    // Server-side fallback using Node.js crypto
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const nodeCrypto = require('crypto');
    const bytes = nodeCrypto.randomBytes(SECURITY_CONFIG.csrfTokenLength);
    for (let i = 0; i < SECURITY_CONFIG.csrfTokenLength; i++) {
      array[i] = bytes[i];
    }
  }
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

export function sanitizeInput(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

export function validatePasswordStrength(password: string): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters');
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  if (!/[!@#$%^&*]/.test(password)) {
    errors.push('Password must contain at least one special character (!@#$%^&*)');
  }
  
  return { valid: errors.length === 0, errors };
}

export function isValidRole(role: string): boolean {
  return ['admin', 'manager', 'staff'].includes(role);
}

export function hasPermission(userRole: string, requiredRole: string): boolean {
  const roleHierarchy: Record<string, number> = {
    admin: 3,
    manager: 2,
    staff: 1,
  };
  
  return (roleHierarchy[userRole] || 0) >= (roleHierarchy[requiredRole] || 0);
}

export function generateSecureId(length = 16): string {
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const values = new Uint32Array(length);
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    crypto.getRandomValues(values);
  } else {
    // Server-side fallback using Node.js crypto
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const nodeCrypto = require('crypto');
    const bytes = nodeCrypto.randomBytes(length * 4);
    for (let i = 0; i < length; i++) {
      values[i] = bytes.readUInt32LE(i * 4);
    }
  }
  for (let i = 0; i < length; i++) {
    result += charset[values[i] % charset.length];
  }
  return result;
}
