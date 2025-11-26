/**
 * NORNEX AS - Checkout Page (Norwegian)
 * @author NORNEX Development Team
 * @version 2.0.0
 * @copyright 2025 NORNEX AS
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Truck,
  CreditCard,
  Check,
  ChevronRight,
  Package,
  Lock,
  ArrowLeft,
} from 'lucide-react';
import { PublicHeader, PublicFooter, useCart } from '@/components/public';
import { formatCurrency } from '@/lib/utils';

type CheckoutStep = 'delivery' | 'shipping' | 'payment';

const shippingOptions = [
  { id: 'servicepakke', name: 'Servicepakke', price: 89, days: '2-4 virkedager' },
  { id: 'pa-doren', name: 'På Døren', price: 129, days: '1-2 virkedager' },
  { id: 'express', name: 'Express', price: 249, days: 'Neste virkedag' },
];

const paymentMethods = [
  { id: 'vipps', name: 'Vipps', icon: '📱' },
  { id: 'card', name: 'Kort', icon: '💳' },
  { id: 'klarna', name: 'Klarna', icon: '💰' },
  { id: 'paypal', name: 'PayPal', icon: '🌐' },
];

export default function KassePage() {
  const router = useRouter();
  const { items, subtotal, vat, total, discountAmount, clearCart } = useCart();

  const [step, setStep] = useState<CheckoutStep>('delivery');
  const [selectedShipping, setSelectedShipping] = useState<string>('servicepakke');
  const [selectedPayment, setSelectedPayment] = useState<string>('vipps');
  const [isProcessing, setIsProcessing] = useState(false);

  // Form data
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    firstName: '',
    lastName: '',
    address: '',
    postalCode: '',
    city: '',
    company: '',
    orgNumber: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const shippingCost = subtotal >= 1000 ? 0 : shippingOptions.find(s => s.id === selectedShipping)?.price || 0;
  const orderTotal = total + shippingCost;

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    
    // Simulate order processing
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    // Clear cart and redirect to confirmation
    clearCart();
    router.push('/ordre-bekreftelse');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <PublicHeader />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 text-center">
          <Package className="h-20 w-20 mx-auto text-slate-300" />
          <h1 className="mt-6 text-3xl font-bold text-slate-900">
            Handlekurven er tom
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Legg til produkter for å fortsette til kassen
          </p>
          <Link
            href="/nettbutikk"
            className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Gå til nettbutikk
          </Link>
        </div>
        <PublicFooter />
      </div>
    );
  }

  const steps = [
    { id: 'delivery', label: 'Leveringsadresse', icon: Truck },
    { id: 'shipping', label: 'Fraktmetode', icon: Package },
    { id: 'payment', label: 'Betaling', icon: CreditCard },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <PublicHeader />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Back to cart */}
        <Link
          href="/handlekurv"
          className="inline-flex items-center gap-2 text-slate-600 hover:text-blue-600 mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Tilbake til handlekurv
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Progress Steps */}
            <div className="bg-white rounded-xl p-4 mb-6">
              <div className="flex items-center justify-between">
                {steps.map((s, index) => {
                  const Icon = s.icon;
                  const isActive = s.id === step;
                  const isCompleted = steps.findIndex(st => st.id === step) > index;
                  return (
                    <div key={s.id} className="flex items-center">
                      <div
                        className={`
                          flex items-center gap-2 px-4 py-2 rounded-lg
                          ${isActive ? 'bg-blue-50 text-blue-600' : ''}
                          ${isCompleted ? 'text-green-600' : 'text-slate-400'}
                        `}
                      >
                        {isCompleted ? (
                          <Check className="h-5 w-5" />
                        ) : (
                          <Icon className="h-5 w-5" />
                        )}
                        <span className="hidden sm:block font-medium">{s.label}</span>
                      </div>
                      {index < steps.length - 1 && (
                        <ChevronRight className="h-5 w-5 text-slate-300 mx-2" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step Content */}
            <div className="bg-white rounded-xl p-6">
              {step === 'delivery' && (
                <div>
                  <h2 className="text-xl font-bold text-slate-900 mb-6">
                    Leveringsadresse
                  </h2>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        E-post *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Telefon *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div className="sm:col-span-2 border-t pt-4 mt-2">
                      <p className="text-sm text-slate-500 mb-4">Bedriftsinformasjon (valgfritt)</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Bedriftsnavn
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Org.nr
                      </label>
                      <input
                        type="text"
                        name="orgNumber"
                        value={formData.orgNumber}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="123 456 789"
                      />
                    </div>
                    <div className="sm:col-span-2 border-t pt-4 mt-2">
                      <p className="text-sm text-slate-500 mb-4">Leveringsadresse</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Fornavn *
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Etternavn *
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Adresse *
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Postnummer *
                      </label>
                      <input
                        type="text"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Sted *
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => setStep('shipping')}
                    className="mt-6 w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Fortsett til fraktmetode
                  </button>
                </div>
              )}

              {step === 'shipping' && (
                <div>
                  <h2 className="text-xl font-bold text-slate-900 mb-6">
                    Velg fraktmetode
                  </h2>
                  {subtotal >= 1000 && (
                    <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
                      Du har gratis frakt på denne ordren! 🎉
                    </div>
                  )}
                  <div className="space-y-3">
                    {shippingOptions.map((option) => (
                      <label
                        key={option.id}
                        className={`
                          flex items-center justify-between p-4 border rounded-lg cursor-pointer
                          ${selectedShipping === option.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-slate-200 hover:border-slate-300'
                          }
                        `}
                      >
                        <div className="flex items-center gap-4">
                          <input
                            type="radio"
                            name="shipping"
                            value={option.id}
                            checked={selectedShipping === option.id}
                            onChange={(e) => setSelectedShipping(e.target.value)}
                            className="text-blue-600 focus:ring-blue-500"
                          />
                          <div>
                            <div className="font-medium text-slate-900">{option.name}</div>
                            <div className="text-sm text-slate-500">{option.days}</div>
                          </div>
                        </div>
                        <div className="font-medium">
                          {subtotal >= 1000 ? 'Gratis' : formatCurrency(option.price)}
                        </div>
                      </label>
                    ))}
                  </div>
                  <div className="mt-6 flex gap-3">
                    <button
                      onClick={() => setStep('delivery')}
                      className="flex-1 py-3 border border-slate-200 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition-colors"
                    >
                      Tilbake
                    </button>
                    <button
                      onClick={() => setStep('payment')}
                      className="flex-1 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Fortsett til betaling
                    </button>
                  </div>
                </div>
              )}

              {step === 'payment' && (
                <div>
                  <h2 className="text-xl font-bold text-slate-900 mb-6">
                    Velg betalingsmetode
                  </h2>
                  <div className="space-y-3">
                    {paymentMethods.map((method) => (
                      <label
                        key={method.id}
                        className={`
                          flex items-center gap-4 p-4 border rounded-lg cursor-pointer
                          ${selectedPayment === method.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-slate-200 hover:border-slate-300'
                          }
                        `}
                      >
                        <input
                          type="radio"
                          name="payment"
                          value={method.id}
                          checked={selectedPayment === method.id}
                          onChange={(e) => setSelectedPayment(e.target.value)}
                          className="text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-2xl">{method.icon}</span>
                        <span className="font-medium text-slate-900">{method.name}</span>
                      </label>
                    ))}
                  </div>
                  <div className="mt-6 flex gap-3">
                    <button
                      onClick={() => setStep('shipping')}
                      className="flex-1 py-3 border border-slate-200 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition-colors"
                    >
                      Tilbake
                    </button>
                    <button
                      onClick={handlePlaceOrder}
                      disabled={isProcessing}
                      className="flex-1 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:bg-slate-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isProcessing ? (
                        <>
                          <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Behandler...
                        </>
                      ) : (
                        <>
                          <Lock className="h-5 w-5" />
                          Fullfør bestilling
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-white rounded-xl p-6 sticky top-24">
              <h2 className="text-lg font-bold text-slate-900 mb-4">
                Din bestilling
              </h2>

              {/* Items */}
              <div className="space-y-3 pb-4 border-b">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="w-12 h-12 bg-slate-100 rounded flex items-center justify-center flex-shrink-0">
                      <Package className="h-5 w-5 text-slate-300" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-slate-900 truncate">
                        {item.name}
                      </div>
                      <div className="text-sm text-slate-500">
                        {item.quantity} stk × {formatCurrency(item.price)}
                      </div>
                    </div>
                    <div className="text-sm font-medium">
                      {formatCurrency(item.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Summary */}
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Delsum</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Rabatt</span>
                    <span>-{formatCurrency(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Frakt</span>
                  <span>
                    {subtotal >= 1000 ? 'Gratis' : formatCurrency(shippingCost)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">MVA (25%)</span>
                  <span>{formatCurrency(vat)}</span>
                </div>
                <div className="pt-3 border-t flex justify-between">
                  <span className="font-bold">Total</span>
                  <span className="font-bold">{formatCurrency(orderTotal)}</span>
                </div>
              </div>

              {/* Security badge */}
              <div className="mt-6 flex items-center gap-2 text-sm text-slate-500">
                <Lock className="h-4 w-4" />
                <span>Sikker betaling med SSL</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <PublicFooter />
    </div>
  );
}
