/**
 * NORNEX AS - Shipping Page
 * @author NORNEX Development Team
 * @version 2.0.0
 * @copyright 2025 NORNEX AS
 */

'use client';

import { useState, useEffect } from 'react';
import {
  Truck,
  Package,
  Calculator,
  Search,
  Loader2,
  CheckCircle,
  MapPin,
} from 'lucide-react';
import { Sidebar, Header } from '@/components/layout';
import { useAppStore } from '@/lib/store';
import { cn, formatCurrency } from '@/lib/utils';
import { t } from '@/lib/translations';

interface DeliveryOption {
  name: string;
  price: number;
  days: string;
  serviceCode: string;
}

interface TrackingEvent {
  timestamp: string;
  status: string;
  description: string;
  location: string;
}

export default function ShippingPage() {
  const { sidebarOpen, language } = useAppStore();
  const [deliveryOptions, setDeliveryOptions] = useState<DeliveryOption[]>([]);
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [trackingNumber, setTrackingNumber] = useState('');
  const [trackingResult, setTrackingResult] = useState<{
    trackingNumber: string;
    status: string;
    estimatedDelivery: string;
    events: TrackingEvent[];
  } | null>(null);
  const [priceResult, setPriceResult] = useState<{
    basePrice: number;
    vat: number;
    totalPrice: number;
    estimatedDays: string;
  } | null>(null);
  const [loading, setLoading] = useState({
    options: false,
    tracking: false,
    price: false,
    shipment: false,
  });
  const [shipmentForm, setShipmentForm] = useState({
    orderId: '',
    weight: '',
    toStreet: '',
    toPostalCode: '',
    toCity: '',
  });
  const [shipmentResult, setShipmentResult] = useState<{
    trackingNumber: string;
    estimatedDelivery: string;
    status: string;
  } | null>(null);

  useEffect(() => {
    fetchDeliveryOptions();
  }, []);

  const fetchDeliveryOptions = async () => {
    setLoading(prev => ({ ...prev, options: true }));
    try {
      const response = await fetch('/api/shipping/bring/delivery-options');
      const data = await response.json();
      if (data.success) {
        setDeliveryOptions(data.data);
        if (data.data.length > 0) {
          setSelectedOption(data.data[0].serviceCode);
        }
      }
    } catch (error) {
      console.error('Failed to fetch delivery options:', error);
    } finally {
      setLoading(prev => ({ ...prev, options: false }));
    }
  };

  const handleTrackPackage = async () => {
    if (!trackingNumber.trim()) return;
    setLoading(prev => ({ ...prev, tracking: true }));
    try {
      const response = await fetch(`/api/shipping/bring/track/${encodeURIComponent(trackingNumber)}`);
      const data = await response.json();
      if (data.success) {
        setTrackingResult(data.data);
      }
    } catch (error) {
      console.error('Failed to track package:', error);
    } finally {
      setLoading(prev => ({ ...prev, tracking: false }));
    }
  };

  const handleCalculatePrice = async () => {
    if (!shipmentForm.weight || !shipmentForm.toPostalCode) return;
    setLoading(prev => ({ ...prev, price: true }));
    try {
      const params = new URLSearchParams({
        weight: shipmentForm.weight,
        from_zip: '0667',
        to_zip: shipmentForm.toPostalCode,
        service_type: selectedOption,
      });
      const response = await fetch(`/api/shipping/bring/calculate-price?${params}`);
      const data = await response.json();
      if (data.success) {
        setPriceResult(data.data);
      }
    } catch (error) {
      console.error('Failed to calculate price:', error);
    } finally {
      setLoading(prev => ({ ...prev, price: false }));
    }
  };

  const handleCreateShipment = async () => {
    if (!shipmentForm.orderId || !shipmentForm.weight || !selectedOption) return;
    setLoading(prev => ({ ...prev, shipment: true }));
    try {
      const response = await fetch('/api/shipping/bring/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: shipmentForm.orderId,
          weight: parseFloat(shipmentForm.weight),
          deliveryOption: selectedOption,
          toAddress: {
            street: shipmentForm.toStreet,
            postalCode: shipmentForm.toPostalCode,
            city: shipmentForm.toCity,
            country: 'NO',
          },
        }),
      });
      const data = await response.json();
      if (data.success) {
        setShipmentResult(data.data);
      }
    } catch (error) {
      console.error('Failed to create shipment:', error);
    } finally {
      setLoading(prev => ({ ...prev, shipment: false }));
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar />
      <Header />

      <main
        className={cn(
          'min-h-screen pt-16 transition-all duration-300',
          sidebarOpen ? 'ml-64' : 'ml-20'
        )}
      >
        <div className="p-6">
          <div className="mb-8">
            <h1 className="flex items-center gap-2 text-2xl font-bold text-slate-900">
              <Truck className="text-blue-600" />
              {t('nav.shipping', language)}
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Bring (Posten Norge) Shipping Integration
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Create Shipment */}
            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-900">
                <Package size={20} className="text-blue-600" />
                {t('shipping.createShipment', language)}
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">Order ID</label>
                  <input
                    type="text"
                    value={shipmentForm.orderId}
                    onChange={(e) => setShipmentForm(prev => ({ ...prev, orderId: e.target.value }))}
                    placeholder="ORD-12345"
                    className="w-full rounded-lg border border-slate-200 p-2 text-sm focus:border-blue-500 focus:outline-none"
                  />
                </div>
                
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">Weight (kg)</label>
                  <input
                    type="number"
                    value={shipmentForm.weight}
                    onChange={(e) => setShipmentForm(prev => ({ ...prev, weight: e.target.value }))}
                    placeholder="2.5"
                    className="w-full rounded-lg border border-slate-200 p-2 text-sm focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">Delivery Address</label>
                  <input
                    type="text"
                    value={shipmentForm.toStreet}
                    onChange={(e) => setShipmentForm(prev => ({ ...prev, toStreet: e.target.value }))}
                    placeholder="Street address"
                    className="mb-2 w-full rounded-lg border border-slate-200 p-2 text-sm focus:border-blue-500 focus:outline-none"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={shipmentForm.toPostalCode}
                      onChange={(e) => setShipmentForm(prev => ({ ...prev, toPostalCode: e.target.value }))}
                      placeholder="Postal code"
                      className="rounded-lg border border-slate-200 p-2 text-sm focus:border-blue-500 focus:outline-none"
                    />
                    <input
                      type="text"
                      value={shipmentForm.toCity}
                      onChange={(e) => setShipmentForm(prev => ({ ...prev, toCity: e.target.value }))}
                      placeholder="City"
                      className="rounded-lg border border-slate-200 p-2 text-sm focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    {t('shipping.deliveryOptions', language)}
                  </label>
                  <div className="space-y-2">
                    {loading.options ? (
                      <Loader2 className="animate-spin text-blue-600" />
                    ) : (
                      deliveryOptions.map((option) => (
                        <label
                          key={option.serviceCode}
                          className={cn(
                            'flex cursor-pointer items-center justify-between rounded-lg border p-3 transition-colors',
                            selectedOption === option.serviceCode
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-slate-200 hover:border-blue-300'
                          )}
                        >
                          <div className="flex items-center gap-3">
                            <input
                              type="radio"
                              name="deliveryOption"
                              value={option.serviceCode}
                              checked={selectedOption === option.serviceCode}
                              onChange={(e) => setSelectedOption(e.target.value)}
                              className="text-blue-600 focus:ring-blue-500"
                            />
                            <div>
                              <p className="font-medium text-slate-900">{option.name}</p>
                              <p className="text-sm text-slate-500">{option.days} days</p>
                            </div>
                          </div>
                          <span className="font-semibold text-slate-900">{formatCurrency(option.price)}</span>
                        </label>
                      ))
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={handleCalculatePrice}
                    disabled={loading.price || !shipmentForm.weight}
                    className="flex items-center gap-2 rounded-lg border border-blue-600 px-4 py-2 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-50 disabled:opacity-50"
                  >
                    {loading.price ? <Loader2 size={16} className="animate-spin" /> : <Calculator size={16} />}
                    Calculate Price
                  </button>
                  <button
                    onClick={handleCreateShipment}
                    disabled={loading.shipment || !shipmentForm.orderId}
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
                  >
                    {loading.shipment ? <Loader2 size={16} className="animate-spin" /> : <Package size={16} />}
                    Create Shipment
                  </button>
                </div>

                {priceResult && (
                  <div className="rounded-lg bg-blue-50 p-4">
                    <p className="text-sm text-slate-700">
                      Base Price: {formatCurrency(priceResult.basePrice)}
                    </p>
                    <p className="text-sm text-slate-700">
                      VAT (25%): {formatCurrency(priceResult.vat)}
                    </p>
                    <p className="font-semibold text-slate-900">
                      Total: {formatCurrency(priceResult.totalPrice)}
                    </p>
                    <p className="text-sm text-slate-500">
                      Estimated delivery: {priceResult.estimatedDays} days
                    </p>
                  </div>
                )}

                {shipmentResult && (
                  <div className="rounded-lg bg-green-50 p-4">
                    <div className="flex items-center gap-2 text-green-700">
                      <CheckCircle size={20} />
                      <span className="font-semibold">Shipment Created!</span>
                    </div>
                    <p className="mt-2 text-sm text-slate-700">
                      Tracking Number: <span className="font-mono font-bold">{shipmentResult.trackingNumber}</span>
                    </p>
                    <p className="text-sm text-slate-700">
                      Estimated Delivery: {shipmentResult.estimatedDelivery}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Track Package */}
            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-900">
                <Search size={20} className="text-blue-600" />
                {t('shipping.trackPackage', language)}
              </h2>
              
              <div className="space-y-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    placeholder="Enter tracking number"
                    className="flex-1 rounded-lg border border-slate-200 p-2 text-sm focus:border-blue-500 focus:outline-none"
                  />
                  <button
                    onClick={handleTrackPackage}
                    disabled={loading.tracking || !trackingNumber.trim()}
                    className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
                  >
                    {loading.tracking ? <Loader2 size={16} className="animate-spin" /> : <Search size={16} />}
                    Track
                  </button>
                </div>

                {trackingResult && (
                  <div className="space-y-4">
                    <div className="rounded-lg bg-slate-50 p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-slate-500">Tracking Number</p>
                          <p className="font-mono font-bold text-slate-900">{trackingResult.trackingNumber}</p>
                        </div>
                        <div className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
                          {trackingResult.status}
                        </div>
                      </div>
                      <p className="mt-2 text-sm text-slate-700">
                        Estimated Delivery: {trackingResult.estimatedDelivery}
                      </p>
                    </div>

                    <div className="space-y-3">
                      <h3 className="font-medium text-slate-900">Tracking History</h3>
                      {trackingResult.events.map((event, index) => (
                        <div key={index} className="flex gap-3">
                          <div className="flex flex-col items-center">
                            <div className={cn(
                              'h-3 w-3 rounded-full',
                              index === 0 ? 'bg-blue-600' : 'bg-slate-300'
                            )} />
                            {index < trackingResult.events.length - 1 && (
                              <div className="h-full w-0.5 bg-slate-200" />
                            )}
                          </div>
                          <div className="flex-1 pb-4">
                            <p className="font-medium text-slate-900">{event.status}</p>
                            <p className="text-sm text-slate-600">{event.description}</p>
                            <div className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                              <MapPin size={12} />
                              {event.location}
                            </div>
                            <p className="text-xs text-slate-400">
                              {new Date(event.timestamp).toLocaleString('nb-NO')}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <footer className="mt-12 border-t border-slate-200 pt-6 text-center text-sm text-slate-500">
            <p>© 2025 NORNEX AS - All rights reserved</p>
          </footer>
        </div>
      </main>
    </div>
  );
}
