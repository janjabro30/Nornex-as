/**
 * NORNEX AS - Admin Dashboard Types
 * @author NORNEX Development Team
 * @version 2.0.0
 * @copyright 2025 NORNEX AS
 */

export interface DashboardMetrics {
  totalCustomers: number;
  activeContracts: number;
  monthlyRevenue: number;
  newOrders: number;
  pendingRepairs: number;
  pendingInvoices: number;
  pendingBookings: number;
  growthAds: number;
}

export interface AIMetrics {
  customerLifetimeValue: number;
  churnRiskScore: number;
  revenueForecast30: number;
  revenueForecast60: number;
  revenueForecast90: number;
  anomalyAlerts: AnomalyAlert[];
  businessInsights: BusinessInsight[];
  predictiveAlerts: PredictiveAlert[];
}

export interface AnomalyAlert {
  id: string;
  type: 'warning' | 'critical' | 'info';
  metric: string;
  message: string;
  deviation: number;
  timestamp: Date;
}

export interface BusinessInsight {
  id: string;
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  actionable: boolean;
  suggestedAction?: string;
}

export interface PredictiveAlert {
  id: string;
  category: 'maintenance' | 'inventory' | 'customer' | 'revenue';
  title: string;
  probability: number;
  timeframe: string;
  recommendation: string;
}

export interface RevenueData {
  month: string;
  revenue: number;
  forecast?: number;
}

export interface OrderData {
  day: string;
  orders: number;
}

export interface ShipmentRequest {
  orderId: string;
  weight: number;
  dimensions: {
    length: number;
    width: number;
    height: number;
  };
  deliveryOption: 'servicepakke' | 'pa_doren' | 'express';
  fromAddress: Address;
  toAddress: Address;
}

export interface ShipmentResponse {
  trackingNumber: string;
  labelUrl: string;
  estimatedDelivery: string;
  carrier: string;
  status: 'created' | 'in_transit' | 'delivered' | 'failed';
}

export interface Address {
  street: string;
  postalCode: string;
  city: string;
  country: string;
}

export interface DeliveryOption {
  name: string;
  price: number;
  days: string;
  serviceCode: string;
}

export interface CompanyValidation {
  valid: boolean;
  name: string;
  orgNumber: string;
  address: string;
  postalCode: string;
  city: string;
  status: 'Active' | 'Inactive' | 'Dissolved';
  industry: string;
  verified: boolean;
}

export interface AIConfig {
  provider: 'free' | 'openai' | 'google' | 'anthropic';
  apiKey?: string;
  model: string;
  language: 'no' | 'en' | 'both';
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'manager' | 'staff';
  twoFactorEnabled: boolean;
  createdAt: Date;
  lastLogin?: Date;
}

export interface AuthSession {
  user: User;
  token: string;
  expiresAt: Date;
}

export type Language = 'en' | 'no';

export interface TranslationKeys {
  [key: string]: string;
}

export interface SEOData {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  structuredData?: object;
}
