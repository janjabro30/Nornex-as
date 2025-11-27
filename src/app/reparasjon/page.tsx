/**
 * NORNEX AS - Repair Form Page (Norwegian)
 * @author NORNEX Development Team
 * @version 2.0.0
 * @copyright 2025 NORNEX AS
 */

'use client';

import { useState } from 'react';
import {
  Wrench,
  Laptop,
  Smartphone,
  Monitor,
  Tablet,
  ChevronRight,
  Check,
  Clock,
  Shield,
  Truck,
  Send,
} from 'lucide-react';
import { PublicHeader, PublicFooter } from '@/components/public';

type DeviceType = 'laptop' | 'desktop' | 'phone' | 'tablet';
type Step = 1 | 2 | 3;

const deviceTypes = [
  { id: 'laptop', name: 'Bærbar PC', icon: Laptop },
  { id: 'desktop', name: 'Stasjonær PC', icon: Monitor },
  { id: 'phone', name: 'Mobiltelefon', icon: Smartphone },
  { id: 'tablet', name: 'Nettbrett', icon: Tablet },
];

const commonProblems = {
  laptop: [
    'Skjermen viser ingenting',
    'PC-en starter ikke',
    'Går veldig tregt',
    'Tastatur fungerer ikke',
    'Batteri holder ikke',
    'Virus/Malware',
    'Data må reddes',
    'Annet problem',
  ],
  desktop: [
    'Starter ikke',
    'Går veldig tregt',
    'Blå skjerm/krasj',
    'Ingen lyd',
    'Grafikkproblemer',
    'Virus/Malware',
    'Oppgradering ønskes',
    'Annet problem',
  ],
  phone: [
    'Knust skjerm',
    'Batteri holder ikke',
    'Lader ikke',
    'Vannsskade',
    'Går tregt',
    'Mikrofon/høyttaler',
    'Kamera fungerer ikke',
    'Annet problem',
  ],
  tablet: [
    'Knust skjerm',
    'Batteri holder ikke',
    'Lader ikke',
    'Går tregt',
    'Touch fungerer ikke',
    'Ingen lyd',
    'Annet problem',
  ],
};

export default function ReparasjonPage() {
  const [step, setStep] = useState<Step>(1);
  const [deviceType, setDeviceType] = useState<DeviceType | null>(null);
  const [selectedProblems, setSelectedProblems] = useState<string[]>([]);
  const [problemDescription, setProblemDescription] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    brand: '',
    model: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleProblemToggle = (problem: string) => {
    setSelectedProblems((prev) =>
      prev.includes(problem)
        ? prev.filter((p) => p !== problem)
        : [...prev, problem]
    );
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const benefits = [
    { icon: Clock, title: 'Rask service', description: 'De fleste reparasjoner er ferdige innen 1-3 virkedager' },
    { icon: Shield, title: 'Garanti', description: '12 måneders garanti på alle reparasjoner' },
    { icon: Truck, title: 'Gratis henting', description: 'Vi kan hente og levere i Oslo-området' },
  ];

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
            Vi har mottatt din reparasjonsforespørsel og kontakter deg snart med et 
            pristilbud. Du vil også motta en bekreftelse på e-post.
          </p>
          <p className="mt-2 text-slate-500">
            Saksnummer: REP-{Date.now().toString().slice(-6)}
          </p>
          <a
            href="/"
            className="mt-8 inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Tilbake til forsiden
          </a>
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
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500 text-white">
              <Wrench className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white sm:text-4xl">
                Reparasjon
              </h1>
              <p className="mt-1 text-slate-300">
                Profesjonell reparasjon av PC, Mac, mobil og nettbrett
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Form */}
          <div className="lg:col-span-2">
            {/* Progress */}
            <div className="flex items-center mb-8">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center">
                  <div
                    className={`
                      flex h-10 w-10 items-center justify-center rounded-full font-bold
                      ${step >= s ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-500'}
                    `}
                  >
                    {step > s ? <Check className="h-5 w-5" /> : s}
                  </div>
                  {s < 3 && (
                    <div
                      className={`w-16 sm:w-24 h-1 mx-2 ${
                        step > s ? 'bg-blue-600' : 'bg-slate-200'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-8">
              {/* Step 1: Device Selection */}
              {step === 1 && (
                <div>
                  <h2 className="text-xl font-bold text-slate-900 mb-6">
                    Hva slags enhet trenger reparasjon?
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {deviceTypes.map((device) => {
                      const Icon = device.icon;
                      return (
                        <button
                          key={device.id}
                          onClick={() => setDeviceType(device.id as DeviceType)}
                          className={`
                            p-6 rounded-xl border-2 transition-all text-center
                            ${deviceType === device.id
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-slate-200 hover:border-slate-300'
                            }
                          `}
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
                  <button
                    onClick={() => deviceType && setStep(2)}
                    disabled={!deviceType}
                    className="mt-8 w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed"
                  >
                    Fortsett
                  </button>
                </div>
              )}

              {/* Step 2: Problem Description */}
              {step === 2 && deviceType && (
                <div>
                  <h2 className="text-xl font-bold text-slate-900 mb-2">
                    Hva er problemet?
                  </h2>
                  <p className="text-slate-500 mb-6">Velg ett eller flere problemer</p>
                  
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {commonProblems[deviceType].map((problem) => (
                      <button
                        key={problem}
                        onClick={() => handleProblemToggle(problem)}
                        className={`
                          p-3 rounded-lg border text-left transition-all
                          ${selectedProblems.includes(problem)
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-slate-200 hover:border-slate-300 text-slate-700'
                          }
                        `}
                      >
                        {problem}
                      </button>
                    ))}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Beskriv problemet (valgfritt)
                    </label>
                    <textarea
                      value={problemDescription}
                      onChange={(e) => setProblemDescription(e.target.value)}
                      rows={4}
                      className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      placeholder="Gi oss mer detaljer om problemet..."
                    />
                  </div>

                  <div className="mt-6 flex gap-3">
                    <button
                      onClick={() => setStep(1)}
                      className="flex-1 py-3 border border-slate-200 text-slate-700 font-medium rounded-lg hover:bg-slate-50"
                    >
                      Tilbake
                    </button>
                    <button
                      onClick={() => setStep(3)}
                      disabled={selectedProblems.length === 0}
                      className="flex-1 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed"
                    >
                      Fortsett
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Contact Info */}
              {step === 3 && (
                <div>
                  <h2 className="text-xl font-bold text-slate-900 mb-6">
                    Dine opplysninger
                  </h2>
                  
                  <div className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                          Navn *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500"
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
                          required
                          className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        E-post *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                          Merke
                        </label>
                        <input
                          type="text"
                          name="brand"
                          value={formData.brand}
                          onChange={handleInputChange}
                          placeholder="f.eks. Apple, HP, Samsung"
                          className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                          Modell
                        </label>
                        <input
                          type="text"
                          name="model"
                          value={formData.model}
                          onChange={handleInputChange}
                          placeholder="f.eks. MacBook Pro, iPhone 15"
                          className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex gap-3">
                    <button
                      onClick={() => setStep(2)}
                      className="flex-1 py-3 border border-slate-200 text-slate-700 font-medium rounded-lg hover:bg-slate-50"
                    >
                      Tilbake
                    </button>
                    <button
                      onClick={handleSubmit}
                      disabled={isSubmitting || !formData.name || !formData.email || !formData.phone}
                      className="flex-1 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sender...
                        </>
                      ) : (
                        <>
                          <Send className="h-5 w-5" />
                          Send forespørsel
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={benefit.title}
                  className="flex gap-4 p-6 bg-slate-50 rounded-xl"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600 flex-shrink-0">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">{benefit.title}</h3>
                    <p className="mt-1 text-sm text-slate-600">{benefit.description}</p>
                  </div>
                </div>
              );
            })}

            <div className="p-6 bg-blue-600 rounded-xl text-white">
              <h3 className="font-bold text-lg">Gratis diagnose</h3>
              <p className="mt-2 text-blue-100 text-sm">
                Vi finner feilen helt gratis. Du betaler kun hvis du godkjenner 
                reparasjonen.
              </p>
            </div>
          </div>
        </div>
      </div>

      <PublicFooter />
    </div>
  );
}
