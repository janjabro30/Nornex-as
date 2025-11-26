/**
 * NORNEX AS - Application Constants
 * @author NORNEX Development Team
 * @version 2.0.0
 * @copyright 2025 NORNEX AS
 */

export const APP_NAME = 'NORNEX AS';
export const APP_VERSION = '2.0.0';
export const COPYRIGHT_YEAR = 2025;

export const COMPANY_INFO = {
  name: 'NORNEX AS',
  address: 'Brynsveien 18',
  postalCode: '0667',
  city: 'Oslo',
  country: 'NO',
  phone: '+47 XXX XX XXX',
  email: 'post@nornex.no',
  orgNumber: '123456789',
} as const;

export const BRING_DELIVERY_OPTIONS = [
  { name: 'Servicepakke', price: 89, days: '2-4', serviceCode: 'SERVICEPAKKE' },
  { name: 'På Døren', price: 129, days: '1-2', serviceCode: 'PA_DOREN' },
  { name: 'Express', price: 249, days: '1', serviceCode: 'EXPRESS' },
] as const;

export const AI_PROVIDERS = [
  { id: 'free', name: 'Free (HuggingFace)', model: 'microsoft/DialoGPT-large' },
  { id: 'openai', name: 'OpenAI', model: 'gpt-4' },
  { id: 'google', name: 'Google Gemini', model: 'gemini-pro' },
  { id: 'anthropic', name: 'Anthropic Claude', model: 'claude-3' },
] as const;

export const USER_ROLES = ['admin', 'manager', 'staff'] as const;

export const METRICS_DEFAULTS = {
  totalCustomers: 9,
  activeContracts: 0,
  monthlyRevenue: 0,
  newOrders: 13,
  pendingRepairs: 0,
  pendingInvoices: 0,
  pendingBookings: 0,
  growthAds: 12,
} as const;

export const SECURITY_CONFIG = {
  bcryptRounds: 12,
  jwtExpiry: '24h',
  rateLimitWindow: 15 * 60 * 1000, // 15 minutes
  rateLimitMax: 100,
  csrfTokenLength: 32,
} as const;

export const SEO_DEFAULTS = {
  title: 'NORNEX AS - Profesjonelle IT-tjenester | Oslo',
  description: 'NORNEX AS tilbyr profesjonelle IT-tjenester i Oslo. Reparasjon, vedlikehold og support for bedrifter.',
  keywords: ['IT-tjenester', 'Oslo', 'reparasjon', 'vedlikehold', 'support', 'NORNEX'],
} as const;
