/**
 * NORNEX AS - Bring Shipping Service
 * @author NORNEX Development Team
 * @version 2.0.0
 * @copyright 2025 NORNEX AS
 */

import type { ShipmentRequest, ShipmentResponse, DeliveryOption, Address } from '@/types';
import { BRING_DELIVERY_OPTIONS } from './constants';

// Bring API base URL for production use
// const BRING_API_BASE = 'https://api.bring.com';

export interface TrackingEvent {
  timestamp: string;
  status: string;
  description: string;
  location: string;
}

export interface TrackingInfo {
  trackingNumber: string;
  status: string;
  estimatedDelivery: string;
  events: TrackingEvent[];
}

export interface PriceCalculation {
  basePrice: number;
  vat: number;
  totalPrice: number;
  currency: string;
  estimatedDays: string;
}

export async function createShipment(request: ShipmentRequest): Promise<ShipmentResponse> {
  // In production, this would call the actual Bring API
  // For now, we simulate the response
  const trackingNumber = `NORNEX${Date.now().toString(36).toUpperCase()}NO`;
  const deliveryOption = BRING_DELIVERY_OPTIONS.find(
    opt => opt.serviceCode.toLowerCase() === request.deliveryOption.toLowerCase()
  ) || BRING_DELIVERY_OPTIONS[0];

  const deliveryDate = new Date();
  const daysToAdd = parseInt(deliveryOption.days.split('-')[1] || deliveryOption.days);
  deliveryDate.setDate(deliveryDate.getDate() + daysToAdd);

  return {
    trackingNumber,
    labelUrl: `/api/shipping/bring/label/${trackingNumber}`,
    estimatedDelivery: deliveryDate.toISOString().split('T')[0],
    carrier: 'Bring',
    status: 'created',
  };
}

export async function trackPackage(trackingNumber: string): Promise<TrackingInfo> {
  // In production, this would call the actual Bring Tracking API
  // Simulated tracking response
  const now = new Date();
  
  return {
    trackingNumber,
    status: 'in_transit',
    estimatedDelivery: new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    events: [
      {
        timestamp: now.toISOString(),
        status: 'In Transit',
        description: 'Package is on its way to destination',
        location: 'Oslo, Norway',
      },
      {
        timestamp: new Date(now.getTime() - 6 * 60 * 60 * 1000).toISOString(),
        status: 'Dispatched',
        description: 'Package dispatched from sorting center',
        location: 'Oslo Terminal',
      },
      {
        timestamp: new Date(now.getTime() - 12 * 60 * 60 * 1000).toISOString(),
        status: 'Received',
        description: 'Package received at sorting center',
        location: 'Oslo Terminal',
      },
    ],
  };
}

export async function calculatePrice(
  weight: number,
  fromZip: string,
  toZip: string,
  serviceType: string
): Promise<PriceCalculation> {
  const deliveryOption = BRING_DELIVERY_OPTIONS.find(
    opt => opt.serviceCode.toLowerCase() === serviceType.toLowerCase()
  ) || BRING_DELIVERY_OPTIONS[0];

  // Weight-based price adjustment (NOK per kg above 1kg)
  const additionalWeight = Math.max(0, weight - 1);
  const weightCharge = additionalWeight * 15;
  
  // Distance-based adjustment (simplified)
  const distanceCharge = Math.abs(parseInt(fromZip) - parseInt(toZip)) > 1000 ? 20 : 0;
  
  const basePrice = deliveryOption.price + weightCharge + distanceCharge;
  const vat = basePrice * 0.25; // 25% Norwegian VAT
  
  return {
    basePrice,
    vat,
    totalPrice: basePrice + vat,
    currency: 'NOK',
    estimatedDays: deliveryOption.days,
  };
}

export function getDeliveryOptions(): DeliveryOption[] {
  return BRING_DELIVERY_OPTIONS.map(opt => ({
    name: opt.name,
    price: opt.price,
    days: opt.days,
    serviceCode: opt.serviceCode,
  }));
}

export async function generateShippingLabel(trackingNumber: string): Promise<string> {
  // In production, this would generate a PDF label via Bring API
  // Returns a URL to the label
  return `/api/shipping/bring/label/${trackingNumber}.pdf`;
}

export function validateAddress(address: Address): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (!address.street || address.street.length < 3) {
    errors.push('Street address is required');
  }
  if (!address.postalCode || !/^\d{4}$/.test(address.postalCode)) {
    errors.push('Valid 4-digit postal code is required');
  }
  if (!address.city || address.city.length < 2) {
    errors.push('City is required');
  }
  
  return { valid: errors.length === 0, errors };
}
