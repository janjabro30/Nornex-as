import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

// Password hashing
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(12);
  return bcrypt.hash(password, salt);
}

export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

// Session management
export function generateSessionToken(): string {
  return uuidv4();
}

// Password validation
export interface PasswordValidation {
  isValid: boolean;
  errors: string[];
}

export function validatePassword(password: string): PasswordValidation {
  const errors: string[] = [];

  if (password.length < 12) {
    errors.push("Password must be at least 12 characters long");
  }

  if (!/[A-Z]/.test(password)) {
    errors.push("Password must contain at least one uppercase letter");
  }

  if (!/[a-z]/.test(password)) {
    errors.push("Password must contain at least one lowercase letter");
  }

  if (!/[0-9]/.test(password)) {
    errors.push("Password must contain at least one number");
  }

  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push("Password must contain at least one special character");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

// Brute force protection
interface LoginAttempt {
  count: number;
  lastAttempt: Date;
  lockedUntil?: Date;
}

const loginAttempts = new Map<string, LoginAttempt>();

export function checkBruteForce(
  identifier: string,
  maxAttempts: number = 5,
  lockoutMinutes: number = 15
): { allowed: boolean; remainingAttempts: number; lockedUntil?: Date } {
  const now = new Date();
  const attempt = loginAttempts.get(identifier);

  if (!attempt) {
    return { allowed: true, remainingAttempts: maxAttempts };
  }

  // Check if still locked
  if (attempt.lockedUntil && attempt.lockedUntil > now) {
    return {
      allowed: false,
      remainingAttempts: 0,
      lockedUntil: attempt.lockedUntil,
    };
  }

  // Reset if lockout has expired
  if (attempt.lockedUntil && attempt.lockedUntil <= now) {
    loginAttempts.delete(identifier);
    return { allowed: true, remainingAttempts: maxAttempts };
  }

  // Check if attempt count exceeded
  if (attempt.count >= maxAttempts) {
    const lockedUntil = new Date(now.getTime() + lockoutMinutes * 60 * 1000);
    loginAttempts.set(identifier, {
      ...attempt,
      lockedUntil,
    });
    return { allowed: false, remainingAttempts: 0, lockedUntil };
  }

  return { allowed: true, remainingAttempts: maxAttempts - attempt.count };
}

export function recordFailedLogin(identifier: string): void {
  const attempt = loginAttempts.get(identifier) || {
    count: 0,
    lastAttempt: new Date(),
  };

  loginAttempts.set(identifier, {
    ...attempt,
    count: attempt.count + 1,
    lastAttempt: new Date(),
  });
}

export function resetLoginAttempts(identifier: string): void {
  loginAttempts.delete(identifier);
}

// Role-based access control
export type UserRole =
  | "CUSTOMER"
  | "STAFF"
  | "TECHNICIAN"
  | "MANAGER"
  | "ACCOUNTANT"
  | "ADMIN"
  | "SUPER_ADMIN";

export const ROLE_HIERARCHY: Record<UserRole, number> = {
  CUSTOMER: 0,
  STAFF: 1,
  TECHNICIAN: 2,
  ACCOUNTANT: 3,
  MANAGER: 4,
  ADMIN: 5,
  SUPER_ADMIN: 6,
};

export const ROLE_PERMISSIONS: Record<UserRole, string[]> = {
  CUSTOMER: ["view_products", "place_orders", "view_own_orders", "submit_buyback"],
  STAFF: [
    "view_products",
    "view_all_orders",
    "update_order_status",
    "view_buyback_requests",
  ],
  TECHNICIAN: [
    "view_products",
    "manage_inventory",
    "process_buyback",
    "grade_devices",
  ],
  ACCOUNTANT: [
    "view_products",
    "view_all_orders",
    "view_financial_reports",
    "manage_pricing",
  ],
  MANAGER: [
    "view_products",
    "manage_products",
    "view_all_orders",
    "manage_orders",
    "view_buyback_requests",
    "approve_buyback",
    "view_staff",
    "manage_staff",
  ],
  ADMIN: [
    "view_products",
    "manage_products",
    "view_all_orders",
    "manage_orders",
    "view_buyback_requests",
    "approve_buyback",
    "manage_buyback",
    "view_staff",
    "manage_staff",
    "view_settings",
    "manage_settings",
    "view_audit_logs",
  ],
  SUPER_ADMIN: [
    "view_products",
    "manage_products",
    "view_all_orders",
    "manage_orders",
    "view_buyback_requests",
    "approve_buyback",
    "manage_buyback",
    "view_staff",
    "manage_staff",
    "create_admin",
    "delete_admin",
    "view_settings",
    "manage_settings",
    "manage_security",
    "view_audit_logs",
    "delete_audit_logs",
  ],
};

export function hasPermission(role: UserRole, permission: string): boolean {
  return ROLE_PERMISSIONS[role]?.includes(permission) || false;
}

export function hasMinimumRole(userRole: UserRole, requiredRole: UserRole): boolean {
  return ROLE_HIERARCHY[userRole] >= ROLE_HIERARCHY[requiredRole];
}

// MFA helpers
export function generateMFASecret(): string {
  // In production, use a proper TOTP library like otpauth
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
  let secret = "";
  for (let i = 0; i < 32; i++) {
    secret += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return secret;
}

// Audit logging types
export type AuditAction =
  | "LOGIN"
  | "LOGOUT"
  | "LOGIN_FAILED"
  | "PASSWORD_CHANGED"
  | "MFA_ENABLED"
  | "MFA_DISABLED"
  | "USER_CREATED"
  | "USER_UPDATED"
  | "USER_DELETED"
  | "ORDER_CREATED"
  | "ORDER_UPDATED"
  | "PRODUCT_CREATED"
  | "PRODUCT_UPDATED"
  | "ADMIN_ACCESS"
  | "SECURITY_ALERT";

export interface AuditLogEntry {
  id: string;
  userId?: string;
  action: AuditAction;
  details?: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
  createdAt: Date;
}

// In-memory audit log for demo (in production, use database)
const auditLogs: AuditLogEntry[] = [];

export function createAuditLog(
  entry: Omit<AuditLogEntry, "id" | "createdAt">
): AuditLogEntry {
  const newEntry: AuditLogEntry = {
    ...entry,
    id: uuidv4(),
    createdAt: new Date(),
  };
  auditLogs.unshift(newEntry);
  // Keep only last 1000 entries in memory
  if (auditLogs.length > 1000) {
    auditLogs.pop();
  }
  return newEntry;
}

export function getAuditLogs(limit: number = 100): AuditLogEntry[] {
  return auditLogs.slice(0, limit);
}

// Security settings
export interface SecuritySettings {
  maxLoginAttempts: number;
  lockoutDuration: number; // minutes
  sessionTimeout: number; // minutes
  requireMfaForAdmin: boolean;
  passwordMinLength: number;
  passwordRequireSpecial: boolean;
  adminSecretPath: string;
}

export const defaultSecuritySettings: SecuritySettings = {
  maxLoginAttempts: 5,
  lockoutDuration: 15,
  sessionTimeout: 60,
  requireMfaForAdmin: true,
  passwordMinLength: 12,
  passwordRequireSpecial: true,
  adminSecretPath: "admin-secure",
};
