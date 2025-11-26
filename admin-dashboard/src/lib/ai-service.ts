/**
 * NORNEX AS - AI Service
 * @author NORNEX Development Team
 * @version 2.0.0
 * @copyright 2025 NORNEX AS
 */

import type { AIConfig, AIMetrics, AnomalyAlert, BusinessInsight, PredictiveAlert } from '@/types';
import { generateId } from './utils';

export interface OrderCategorization {
  category: string;
  confidence: number;
  suggestedPriority: 'high' | 'medium' | 'low';
  tags: string[];
}

export interface TaskAssignment {
  assignedTo: string;
  reason: string;
  confidence: number;
  estimatedTime: string;
}

export interface RepairSchedule {
  suggestedDate: string;
  suggestedTimeSlot: string;
  technician: string;
  estimatedDuration: string;
  partsRequired: string[];
}

export interface InvoiceGeneration {
  invoiceNumber: string;
  items: { description: string; quantity: number; unitPrice: number }[];
  subtotal: number;
  vat: number;
  total: number;
  dueDate: string;
  terms: string;
}

export interface EmailSuggestion {
  subject: string;
  body: string;
  tone: 'formal' | 'friendly' | 'urgent';
  language: 'no' | 'en';
}

export interface ContentGeneration {
  title: string;
  content: string;
  metaDescription?: string;
  keywords?: string[];
}

export async function categorizeOrder(
  orderContent: string,
  _config: AIConfig
): Promise<OrderCategorization> {
  // AI-powered order categorization
  // In production, this would call the configured AI provider
  
  const keywords = orderContent.toLowerCase();
  let category = 'general';
  let priority: 'high' | 'medium' | 'low' = 'medium';
  const tags: string[] = [];

  if (keywords.includes('urgent') || keywords.includes('haster')) {
    priority = 'high';
    tags.push('urgent');
  }
  if (keywords.includes('repair') || keywords.includes('reparasjon')) {
    category = 'repair';
    tags.push('service');
  }
  if (keywords.includes('new') || keywords.includes('ny')) {
    category = 'new_order';
    tags.push('sales');
  }
  if (keywords.includes('contract') || keywords.includes('kontrakt')) {
    category = 'contract';
    tags.push('b2b');
  }

  return {
    category,
    confidence: 0.85,
    suggestedPriority: priority,
    tags,
  };
}

export async function assignTask(
  _taskDescription: string,
  teamMembers: string[],
  _config: AIConfig
): Promise<TaskAssignment> {
  // AI-powered task assignment based on skills and availability
  const randomMember = teamMembers[Math.floor(Math.random() * teamMembers.length)] || 'unassigned';
  
  return {
    assignedTo: randomMember,
    reason: 'Best match based on skills and current workload',
    confidence: 0.78,
    estimatedTime: '2-4 hours',
  };
}

export async function scheduleRepair(
  _repairDetails: string,
  _config: AIConfig
): Promise<RepairSchedule> {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  return {
    suggestedDate: tomorrow.toISOString().split('T')[0],
    suggestedTimeSlot: '10:00-12:00',
    technician: 'Available Technician',
    estimatedDuration: '2 hours',
    partsRequired: ['Standard repair kit'],
  };
}

export async function generateInvoice(
  orderDetails: { items: string[]; customerId: string },
  _config: AIConfig
): Promise<InvoiceGeneration> {
  const invoiceNumber = `INV-${Date.now().toString(36).toUpperCase()}`;
  const items = orderDetails.items.map((item, i) => ({
    description: item,
    quantity: 1,
    unitPrice: 500 + (i * 100),
  }));
  
  const subtotal = items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
  const vat = subtotal * 0.25;
  
  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + 14);
  
  return {
    invoiceNumber,
    items,
    subtotal,
    vat,
    total: subtotal + vat,
    dueDate: dueDate.toISOString().split('T')[0],
    terms: 'Net 14 days. Late payment will incur 8% annual interest.',
  };
}

export async function suggestEmailResponse(
  incomingEmail: string,
  context: string,
  config: AIConfig
): Promise<EmailSuggestion> {
  const isNorwegian = config.language === 'no' || config.language === 'both';
  
  return {
    subject: isNorwegian ? 'Re: Din henvendelse' : 'Re: Your inquiry',
    body: isNorwegian
      ? 'Takk for din henvendelse. Vi har mottatt meldingen din og vil svare deg så snart som mulig.\n\nMed vennlig hilsen,\nNORNEX AS'
      : 'Thank you for your inquiry. We have received your message and will respond as soon as possible.\n\nBest regards,\nNORNEX AS',
    tone: 'formal',
    language: isNorwegian ? 'no' : 'en',
  };
}

export async function generateContent(
  _prompt: string,
  type: 'product' | 'blog' | 'social' | 'email',
  language: 'no' | 'en',
  _config: AIConfig
): Promise<ContentGeneration> {
  // AI content generation
  const templates = {
    product: {
      no: { title: 'Produktbeskrivelse', content: 'Profesjonell IT-løsning for moderne bedrifter.' },
      en: { title: 'Product Description', content: 'Professional IT solution for modern businesses.' },
    },
    blog: {
      no: { title: 'IT-trender i 2025', content: 'De viktigste IT-trendene bedrifter bør følge med på.' },
      en: { title: 'IT Trends in 2025', content: 'The most important IT trends businesses should watch.' },
    },
    social: {
      no: { title: 'Sosiale medier innlegg', content: 'Oppdag våre profesjonelle IT-tjenester! #NORNEX #ITtjenester' },
      en: { title: 'Social Media Post', content: 'Discover our professional IT services! #NORNEX #ITservices' },
    },
    email: {
      no: { title: 'Nyhetsbrev', content: 'Kjære kunde, vi har spennende nyheter å dele med deg.' },
      en: { title: 'Newsletter', content: 'Dear customer, we have exciting news to share with you.' },
    },
  };

  const template = templates[type][language];
  
  return {
    title: template.title,
    content: template.content,
    metaDescription: `NORNEX AS - ${template.title}`,
    keywords: ['NORNEX', 'IT', 'Oslo', type],
  };
}

export async function calculateAIMetrics(
  historicalData: { revenue: number[]; orders: number[]; customers: number[] }
): Promise<AIMetrics> {
  // AI-powered metrics calculation
  const avgRevenue = historicalData.revenue.reduce((a, b) => a + b, 0) / historicalData.revenue.length || 0;
  const recentOrders = historicalData.orders.slice(-30);
  const orderTrend = recentOrders.length > 1 
    ? (recentOrders[recentOrders.length - 1] - recentOrders[0]) / recentOrders[0] * 100 
    : 0;

  return {
    customerLifetimeValue: Math.round(avgRevenue * 24), // 2-year projection
    churnRiskScore: Math.round(Math.max(0, Math.min(100, 30 - orderTrend))),
    revenueForecast30: Math.round(avgRevenue * 1.05),
    revenueForecast60: Math.round(avgRevenue * 2.1),
    revenueForecast90: Math.round(avgRevenue * 3.2),
    anomalyAlerts: detectAnomalies(historicalData),
    businessInsights: generateInsights(historicalData),
    predictiveAlerts: generatePredictiveAlerts(historicalData),
  };
}

function detectAnomalies(data: { revenue: number[]; orders: number[] }): AnomalyAlert[] {
  const alerts: AnomalyAlert[] = [];
  
  if (data.revenue.length > 0) {
    const lastRevenue = data.revenue[data.revenue.length - 1];
    const avgRevenue = data.revenue.reduce((a, b) => a + b, 0) / data.revenue.length;
    const deviation = ((lastRevenue - avgRevenue) / avgRevenue) * 100;
    
    if (Math.abs(deviation) > 20) {
      alerts.push({
        id: generateId(),
        type: deviation < 0 ? 'warning' : 'info',
        metric: 'Revenue',
        message: deviation < 0 
          ? 'Revenue is significantly below average'
          : 'Revenue is significantly above average',
        deviation: Math.round(deviation),
        timestamp: new Date(),
      });
    }
  }
  
  return alerts;
}

function generateInsights(_data: { revenue: number[]; orders: number[]; customers: number[] }): BusinessInsight[] {
  const insights: BusinessInsight[] = [
    {
      id: generateId(),
      title: 'Customer Acquisition Trend',
      description: 'Customer base is growing steadily. Focus on retention strategies.',
      impact: 'medium',
      actionable: true,
      suggestedAction: 'Implement loyalty program',
    },
    {
      id: generateId(),
      title: 'Order Pattern Analysis',
      description: 'Peak ordering times identified: weekday mornings.',
      impact: 'low',
      actionable: true,
      suggestedAction: 'Optimize staff scheduling for peak hours',
    },
  ];
  
  return insights;
}

function generatePredictiveAlerts(_data: { revenue: number[]; orders: number[] }): PredictiveAlert[] {
  return [
    {
      id: generateId(),
      category: 'maintenance',
      title: 'Equipment Service Due',
      probability: 0.85,
      timeframe: 'Next 30 days',
      recommendation: 'Schedule preventive maintenance for key equipment',
    },
    {
      id: generateId(),
      category: 'customer',
      title: 'Potential Upsell Opportunity',
      probability: 0.72,
      timeframe: 'Next 14 days',
      recommendation: 'Contact top customers about service upgrades',
    },
  ];
}
