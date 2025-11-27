/**
 * NORNEX AS - Sell to Us Form Page (Norwegian)
 * @author NORNEX Development Team
 * @version 2.0.0
 * @copyright 2025 NORNEX AS
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Banknote,
  Laptop,
  Smartphone,
  Tablet,
  Monitor,
  Plus,
  Trash2,
  Check,
  ArrowRight,
} from 'lucide-react';
import { PublicHeader, PublicFooter } from '@/components/public';
import { formatCurrency } from '@/lib/utils';

interface Device {
  id: string;
  type: string;
  brand: string;
  model: string;
  condition: string;
  accessories: string[];
  estimatedValue: number;
}

const deviceTypes = [
  { id: 'laptop', name: 'Bærbar PC', icon: Laptop, baseValue: 3000 },
  { id: 'desktop', name: 'Stasjonær PC', icon: Monitor, baseValue: 2000 },
  { id: 'phone', name: 'Mobiltelefon', icon: Smartphone, baseValue: 1500 },
  { id: 'tablet', name: 'Nettbrett', icon: Tablet, baseValue: 1000 },
];

const conditions = [
  { id: 'excellent', name: 'Utmerket', multiplier: 1 },
  { id: 'good', name: 'God', multiplier: 0.8 },
  { id: 'fair', name: 'Akseptabel', multiplier: 0.5 },
  { id: 'poor', name: 'Dårlig', multiplier: 0.2 },
];

const accessoryOptions = [
  'Original lader',
  'Original emballasje',
  'Kvittering',
  'Tilbehør (mus, tastatur)',
  'Ekstra kabler',
];

export default function SelgTilOssPage() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [currentDevice, setCurrentDevice] = useState<Partial<Device>>({
    type: '',
    brand: '',
    model: '',
    condition: '',
    accessories: [],
  });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    postalCode: '',
    city: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const calculateDeviceValue = (device: Partial<Device>): number => {
    const type = deviceTypes.find(t => t.id === device.type);
    const cond = conditions.find(c => c.id === device.condition);
    if (!type || !cond) return 0;
    
    let value = type.baseValue * cond.multiplier;
    // Add 10% for each accessory
    const accessoryBonus = (device.accessories?.length || 0) * 0.1 * value;
    return Math.round(value + accessoryBonus);
  };

  const addDevice = () => {
    if (!currentDevice.type || !currentDevice.condition) return;
    
    const newDevice: Device = {
      id: `device-${Date.now()}`,
      type: currentDevice.type || '',
      brand: currentDevice.brand || '',
      model: currentDevice.model || '',
      condition: currentDevice.condition || '',
      accessories: currentDevice.accessories || [],
      estimatedValue: calculateDeviceValue(currentDevice),
    };
    
    setDevices([...devices, newDevice]);
    setCurrentDevice({
      type: '',
      brand: '',
      model: '',
      condition: '',
      accessories: [],
    });
  };

  const removeDevice = (id: string) => {
    setDevices(devices.filter(d => d.id !== id));
  };

  const toggleAccessory = (accessory: string) => {
    const accessories = currentDevice.accessories || [];
    if (accessories.includes(accessory)) {
      setCurrentDevice({
        ...currentDevice,
        accessories: accessories.filter(a => a !== accessory),
      });
    } else {
      setCurrentDevice({
        ...currentDevice,
        accessories: [...accessories, accessory],
      });
    }
  };

  const totalValue = devices.reduce((sum, d) => sum + d.estimatedValue, 0);

  const handleSubmit = async () => {
    if (devices.length === 0) return;
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
            Takk for din henvendelse!
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Vi har mottatt informasjonen om {devices.length} enhet{devices.length > 1 ? 'er' : ''} 
            og kontakter deg innen 1-2 virkedager med et tilbud.
          </p>
          <div className="mt-6 p-6 bg-slate-50 rounded-xl">
            <p className="text-sm text-slate-500">Estimert totalverdi:</p>
            <p className="text-3xl font-bold text-green-600">{formatCurrency(totalValue)}</p>
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
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500 text-white">
              <Banknote className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white sm:text-4xl">Selg til oss</h1>
              <p className="mt-1 text-slate-300">
                Få kontant betaling for dine brukte enheter
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Add Device Form */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h2 className="text-xl font-bold text-slate-900 mb-6">Legg til enhet</h2>
              
              {/* Device Type */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 mb-2">Type enhet</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {deviceTypes.map((type) => {
                    const Icon = type.icon;
                    return (
                      <button
                        key={type.id}
                        onClick={() => setCurrentDevice({ ...currentDevice, type: type.id })}
                        className={`p-4 rounded-xl border-2 text-center transition-all ${
                          currentDevice.type === type.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <Icon className={`h-6 w-6 mx-auto ${
                          currentDevice.type === type.id ? 'text-blue-600' : 'text-slate-400'
                        }`} />
                        <span className="mt-1 block text-sm font-medium">{type.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Brand & Model */}
              <div className="grid gap-4 sm:grid-cols-2 mb-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Merke</label>
                  <input
                    type="text"
                    value={currentDevice.brand || ''}
                    onChange={(e) => setCurrentDevice({ ...currentDevice, brand: e.target.value })}
                    placeholder="f.eks. Apple, HP"
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Modell</label>
                  <input
                    type="text"
                    value={currentDevice.model || ''}
                    onChange={(e) => setCurrentDevice({ ...currentDevice, model: e.target.value })}
                    placeholder="f.eks. MacBook Pro 2021"
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg"
                  />
                </div>
              </div>

              {/* Condition */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 mb-2">Tilstand</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {conditions.map((cond) => (
                    <button
                      key={cond.id}
                      onClick={() => setCurrentDevice({ ...currentDevice, condition: cond.id })}
                      className={`p-3 rounded-lg border-2 text-center transition-all ${
                        currentDevice.condition === cond.id
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {cond.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Accessories */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Tilbehør som følger med
                </label>
                <div className="flex flex-wrap gap-2">
                  {accessoryOptions.map((acc) => (
                    <button
                      key={acc}
                      onClick={() => toggleAccessory(acc)}
                      className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
                        currentDevice.accessories?.includes(acc)
                          ? 'bg-blue-100 border-blue-300 text-blue-700'
                          : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      {acc}
                    </button>
                  ))}
                </div>
              </div>

              {/* Estimated Value */}
              {currentDevice.type && currentDevice.condition && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg mb-6">
                  <p className="text-sm text-green-600">Estimert verdi for denne enheten:</p>
                  <p className="text-2xl font-bold text-green-700">
                    {formatCurrency(calculateDeviceValue(currentDevice))}
                  </p>
                </div>
              )}

              <button
                onClick={addDevice}
                disabled={!currentDevice.type || !currentDevice.condition}
                className="w-full flex items-center justify-center gap-2 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:bg-slate-300"
              >
                <Plus className="h-5 w-5" />
                Legg til enhet
              </button>
            </div>

            {/* Added Devices */}
            {devices.length > 0 && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <h2 className="text-xl font-bold text-slate-900 mb-4">
                  Enheter å selge ({devices.length})
                </h2>
                <div className="space-y-3">
                  {devices.map((device) => {
                    const type = deviceTypes.find(t => t.id === device.type);
                    const Icon = type?.icon || Laptop;
                    return (
                      <div
                        key={device.id}
                        className="flex items-center justify-between p-4 bg-slate-50 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="h-6 w-6 text-slate-400" />
                          <div>
                            <div className="font-medium text-slate-900">
                              {device.brand} {device.model || type?.name}
                            </div>
                            <div className="text-sm text-slate-500">
                              {conditions.find(c => c.id === device.condition)?.name} • 
                              {device.accessories.length > 0 && ` ${device.accessories.length} tilbehør`}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="font-bold text-green-600">
                            {formatCurrency(device.estimatedValue)}
                          </span>
                          <button
                            onClick={() => removeDevice(device.id)}
                            className="p-2 text-slate-400 hover:text-red-600"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Contact Info */}
            {devices.length > 0 && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <h2 className="text-xl font-bold text-slate-900 mb-6">Dine opplysninger</h2>
                <div className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Navn *</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Telefon *</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">E-post *</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Adresse</label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg"
                    />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Postnummer</label>
                      <input
                        type="text"
                        value={formData.postalCode}
                        onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Sted</label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg"
                      />
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting || !formData.name || !formData.email || !formData.phone}
                  className="mt-6 w-full flex items-center justify-center gap-2 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 disabled:bg-slate-300"
                >
                  {isSubmitting ? (
                    <>
                      <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sender...
                    </>
                  ) : (
                    <>
                      Send forespørsel
                      <ArrowRight className="h-5 w-5" />
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Summary Sidebar */}
          <div>
            <div className="bg-slate-50 rounded-2xl p-6 sticky top-24">
              <h2 className="text-lg font-bold text-slate-900 mb-4">Oppsummering</h2>
              
              {devices.length === 0 ? (
                <p className="text-slate-500 text-sm">
                  Legg til enheter du ønsker å selge for å se estimert verdi.
                </p>
              ) : (
                <>
                  <div className="space-y-3 mb-6">
                    {devices.map((device) => (
                      <div key={device.id} className="flex justify-between text-sm">
                        <span className="text-slate-600">
                          {device.brand || deviceTypes.find(t => t.id === device.type)?.name}
                        </span>
                        <span className="font-medium">{formatCurrency(device.estimatedValue)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="pt-4 border-t border-slate-200">
                    <div className="flex justify-between">
                      <span className="font-bold text-slate-900">Estimert totalverdi</span>
                      <span className="text-2xl font-bold text-green-600">
                        {formatCurrency(totalValue)}
                      </span>
                    </div>
                    <p className="mt-2 text-xs text-slate-500">
                      Endelig pris fastsettes etter inspeksjon av enhetene.
                    </p>
                  </div>
                </>
              )}

              <div className="mt-6 pt-6 border-t border-slate-200">
                <h3 className="font-medium text-slate-900 mb-3">Hvordan fungerer det?</h3>
                <ol className="space-y-2 text-sm text-slate-600">
                  <li className="flex gap-2">
                    <span className="flex-shrink-0 w-5 h-5 bg-blue-100 text-blue-600 rounded-full text-xs flex items-center justify-center">1</span>
                    <span>Legg til enheter du vil selge</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="flex-shrink-0 w-5 h-5 bg-blue-100 text-blue-600 rounded-full text-xs flex items-center justify-center">2</span>
                    <span>Send inn forespørsel</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="flex-shrink-0 w-5 h-5 bg-blue-100 text-blue-600 rounded-full text-xs flex items-center justify-center">3</span>
                    <span>Vi kontakter deg med tilbud</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="flex-shrink-0 w-5 h-5 bg-blue-100 text-blue-600 rounded-full text-xs flex items-center justify-center">4</span>
                    <span>Lever enhetene og få betaling</span>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>

      <PublicFooter />
    </div>
  );
}
