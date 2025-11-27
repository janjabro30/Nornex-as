/**
 * NORNEX AS - Trade-In Form Page (Norwegian)
 * @author NORNEX Development Team
 * @version 2.0.0
 * @copyright 2025 NORNEX AS
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  RefreshCw,
  Laptop,
  Smartphone,
  Check,
  ChevronRight,
  ArrowRight,
  Percent,
} from 'lucide-react';
import { PublicHeader, PublicFooter } from '@/components/public';
import { formatCurrency } from '@/lib/utils';

type Step = 1 | 2 | 3 | 4;

const deviceTypes = [
  { id: 'laptop', name: 'Bærbar PC', icon: Laptop, baseValue: 3000 },
  { id: 'desktop', name: 'Stasjonær PC', icon: Laptop, baseValue: 2000 },
  { id: 'phone', name: 'Mobiltelefon', icon: Smartphone, baseValue: 1500 },
  { id: 'tablet', name: 'Nettbrett', icon: Smartphone, baseValue: 1000 },
];

const conditions = [
  { id: 'excellent', name: 'Utmerket', description: 'Som ny, ingen synlige merker', multiplier: 1 },
  { id: 'good', name: 'God', description: 'Normal bruk, små kosmetiske merker', multiplier: 0.8 },
  { id: 'fair', name: 'Akseptabel', description: 'Synlige bruksspor, fungerer', multiplier: 0.5 },
  { id: 'poor', name: 'Dårlig', description: 'Skader, men fungerer', multiplier: 0.2 },
];

const newProducts = [
  { id: 'hp-elitebook', name: 'HP EliteBook 840 G8', price: 12990 },
  { id: 'thinkpad-x1', name: 'Lenovo ThinkPad X1 Carbon', price: 18990 },
  { id: 'macbook-pro', name: 'MacBook Pro 14"', price: 27990 },
];

export default function InnbyttePage() {
  const [step, setStep] = useState<Step>(1);
  const [deviceType, setDeviceType] = useState<string | null>(null);
  const [condition, setCondition] = useState<string | null>(null);
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const calculateTradeInValue = (): number => {
    const device = deviceTypes.find(d => d.id === deviceType);
    const cond = conditions.find(c => c.id === condition);
    if (!device || !cond) return 0;
    return Math.round(device.baseValue * cond.multiplier);
  };

  const tradeInValue = calculateTradeInValue();
  const selectedNewProduct = newProducts.find(p => p.id === selectedProduct);
  const finalPrice = selectedNewProduct ? selectedNewProduct.price - tradeInValue : 0;

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-white">
        <PublicHeader />
        <div className="mx-auto max-w-2xl px-4 py-20 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100 mx-auto">
            <Check className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="mt-6 text-3xl font-bold text-slate-900">
            Takk for din innbytteforespørsel!
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Vi har mottatt din henvendelse og kontakter deg innen 1-2 virkedager 
            med endelig verdsetting og tilbud.
          </p>
          <div className="mt-6 p-6 bg-slate-50 rounded-xl">
            <p className="text-sm text-slate-500">Estimert innbytteverdi:</p>
            <p className="text-3xl font-bold text-green-600">{formatCurrency(tradeInValue)}</p>
          </div>
          <Link
            href="/"
            className="mt-8 inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700"
          >
            Tilbake til forsiden
          </Link>
        </div>
        <PublicFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <PublicHeader />

      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-green-500 text-white">
              <RefreshCw className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white sm:text-4xl">Innbytte</h1>
              <p className="mt-1 text-slate-300">
                Bytt inn din gamle enhet og få rabatt på et nytt produkt
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Progress */}
        <div className="flex items-center justify-center mb-12">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex items-center">
              <div
                className={`
                  flex h-10 w-10 items-center justify-center rounded-full font-bold
                  ${step >= s ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-500'}
                `}
              >
                {step > s ? <Check className="h-5 w-5" /> : s}
              </div>
              {s < 4 && (
                <div className={`w-16 sm:w-24 h-1 mx-2 ${step > s ? 'bg-blue-600' : 'bg-slate-200'}`} />
              )}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-8">
          {/* Step 1: Device Selection */}
          {step === 1 && (
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-6">
                Hva slags enhet vil du bytte inn?
              </h2>
              <div className="grid grid-cols-2 gap-4 mb-6">
                {deviceTypes.map((device) => {
                  const Icon = device.icon;
                  return (
                    <button
                      key={device.id}
                      onClick={() => setDeviceType(device.id)}
                      className={`p-6 rounded-xl border-2 transition-all text-center ${
                        deviceType === device.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <Icon className={`h-10 w-10 mx-auto ${
                        deviceType === device.id ? 'text-blue-600' : 'text-slate-400'
                      }`} />
                      <span className={`mt-2 block font-medium ${
                        deviceType === device.id ? 'text-blue-600' : 'text-slate-700'
                      }`}>
                        {device.name}
                      </span>
                    </button>
                  );
                })}
              </div>

              {deviceType && (
                <div className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Merke</label>
                      <input
                        type="text"
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                        placeholder="f.eks. Apple, HP, Samsung"
                        className="w-full px-4 py-3 border border-slate-200 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Modell</label>
                      <input
                        type="text"
                        value={model}
                        onChange={(e) => setModel(e.target.value)}
                        placeholder="f.eks. MacBook Pro 2021"
                        className="w-full px-4 py-3 border border-slate-200 rounded-lg"
                      />
                    </div>
                  </div>
                </div>
              )}

              <button
                onClick={() => setStep(2)}
                disabled={!deviceType}
                className="mt-8 w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed"
              >
                Fortsett
              </button>
            </div>
          )}

          {/* Step 2: Condition */}
          {step === 2 && (
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-6">
                Hvordan er tilstanden?
              </h2>
              <div className="space-y-3">
                {conditions.map((cond) => (
                  <button
                    key={cond.id}
                    onClick={() => setCondition(cond.id)}
                    className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                      condition === cond.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="font-semibold text-slate-900">{cond.name}</div>
                    <div className="text-sm text-slate-500">{cond.description}</div>
                  </button>
                ))}
              </div>

              {condition && (
                <div className="mt-6 p-6 bg-green-50 border border-green-200 rounded-xl text-center">
                  <p className="text-sm text-green-600 mb-1">Estimert innbytteverdi:</p>
                  <p className="text-3xl font-bold text-green-700">{formatCurrency(tradeInValue)}</p>
                </div>
              )}

              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 py-3 border border-slate-200 text-slate-700 font-medium rounded-lg hover:bg-slate-50"
                >
                  Tilbake
                </button>
                <button
                  onClick={() => setStep(3)}
                  disabled={!condition}
                  className="flex-1 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:bg-slate-300"
                >
                  Fortsett
                </button>
              </div>
            </div>
          )}

          {/* Step 3: New Product */}
          {step === 3 && (
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-6">
                Velg nytt produkt
              </h2>
              <div className="space-y-3">
                {newProducts.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => setSelectedProduct(product.id)}
                    className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                      selectedProduct === product.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-slate-900">{product.name}</div>
                        <div className="text-lg font-bold text-slate-900">{formatCurrency(product.price)}</div>
                      </div>
                      {selectedProduct === product.id && (
                        <div className="text-right">
                          <div className="text-sm text-green-600">Med innbytte:</div>
                          <div className="text-lg font-bold text-green-700">
                            {formatCurrency(product.price - tradeInValue)}
                          </div>
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {selectedProduct && (
                <div className="mt-6 p-6 bg-slate-50 rounded-xl">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-500">Produkt:</span>
                    <span className="font-medium">{formatCurrency(selectedNewProduct?.price || 0)}</span>
                  </div>
                  <div className="flex justify-between text-sm mb-2 text-green-600">
                    <span>Innbytte:</span>
                    <span>-{formatCurrency(tradeInValue)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg pt-2 border-t">
                    <span>Din pris:</span>
                    <span>{formatCurrency(finalPrice)}</span>
                  </div>
                </div>
              )}

              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => setStep(2)}
                  className="flex-1 py-3 border border-slate-200 text-slate-700 font-medium rounded-lg hover:bg-slate-50"
                >
                  Tilbake
                </button>
                <button
                  onClick={() => setStep(4)}
                  disabled={!selectedProduct}
                  className="flex-1 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:bg-slate-300"
                >
                  Fortsett
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Contact Info */}
          {step === 4 && (
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-6">
                Dine opplysninger
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Navn *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-3 border border-slate-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">E-post *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-4 py-3 border border-slate-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Telefon *</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-4 py-3 border border-slate-200 rounded-lg"
                  />
                </div>
              </div>

              <div className="mt-6 p-6 bg-blue-50 border border-blue-200 rounded-xl">
                <h3 className="font-semibold text-slate-900 mb-3">Oppsummering</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Din enhet:</span>
                    <span>{brand} {model}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Tilstand:</span>
                    <span>{conditions.find(c => c.id === condition)?.name}</span>
                  </div>
                  <div className="flex justify-between text-green-600">
                    <span>Innbytteverdi:</span>
                    <span className="font-bold">{formatCurrency(tradeInValue)}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t">
                    <span className="text-slate-500">Nytt produkt:</span>
                    <span>{selectedNewProduct?.name}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg">
                    <span>Din pris:</span>
                    <span>{formatCurrency(finalPrice)}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => setStep(3)}
                  className="flex-1 py-3 border border-slate-200 text-slate-700 font-medium rounded-lg hover:bg-slate-50"
                >
                  Tilbake
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting || !formData.name || !formData.email || !formData.phone}
                  className="flex-1 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:bg-slate-300 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sender...
                    </>
                  ) : (
                    <>
                      Fullfør innbytte
                      <ArrowRight className="h-5 w-5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <PublicFooter />
    </div>
  );
}
