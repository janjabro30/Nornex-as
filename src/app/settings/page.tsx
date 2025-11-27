/**
 * NORNEX AS - Settings Page
 * @author NORNEX Development Team
 * @version 2.0.0
 * @copyright 2025 NORNEX AS
 */

'use client';

import { useState } from 'react';
import {
  Settings,
  Bot,
  Globe,
  Building,
  Save,
  CheckCircle,
} from 'lucide-react';
import { Sidebar, Header } from '@/components/layout';
import { useAppStore } from '@/lib/store';
import { cn } from '@/lib/utils';
import { t } from '@/lib/translations';
import { AI_PROVIDERS, COMPANY_INFO } from '@/lib/constants';

export default function SettingsPage() {
  const { sidebarOpen, language, setLanguage, aiConfig, setAIConfig } = useAppStore();
  const [saved, setSaved] = useState(false);
  const [companySettings, setCompanySettings] = useState<{
    name: string;
    address: string;
    postalCode: string;
    city: string;
    phone: string;
    email: string;
    orgNumber: string;
  }>({
    name: COMPANY_INFO.name,
    address: COMPANY_INFO.address,
    postalCode: COMPANY_INFO.postalCode,
    city: COMPANY_INFO.city,
    phone: COMPANY_INFO.phone,
    email: COMPANY_INFO.email,
    orgNumber: COMPANY_INFO.orgNumber,
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
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
              <Settings className="text-slate-600" />
              {t('nav.settings', language)}
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Configure your admin dashboard settings
            </p>
          </div>

          {saved && (
            <div className="mb-6 flex items-center gap-2 rounded-lg bg-green-50 p-4 text-green-700">
              <CheckCircle size={20} />
              <span className="font-medium">Settings saved successfully!</span>
            </div>
          )}

          <div className="grid gap-6 lg:grid-cols-2">
            {/* AI Configuration */}
            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-900">
                <Bot size={20} className="text-purple-600" />
                AI Configuration
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">AI Provider</label>
                  <select
                    value={aiConfig.provider}
                    onChange={(e) => setAIConfig({ provider: e.target.value as 'free' | 'openai' | 'google' | 'anthropic' })}
                    className="w-full rounded-lg border border-slate-200 p-2 text-sm focus:border-purple-500 focus:outline-none"
                  >
                    {AI_PROVIDERS.map((provider) => (
                      <option key={provider.id} value={provider.id}>
                        {provider.name} ({provider.model})
                      </option>
                    ))}
                  </select>
                  <p className="mt-1 text-xs text-slate-500">
                    Free tier uses HuggingFace models. Premium providers require API keys.
                  </p>
                </div>

                {aiConfig.provider !== 'free' && (
                  <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700">API Key</label>
                    <input
                      type="password"
                      value={aiConfig.apiKey || ''}
                      onChange={(e) => setAIConfig({ apiKey: e.target.value })}
                      placeholder="Enter your API key"
                      className="w-full rounded-lg border border-slate-200 p-2 text-sm focus:border-purple-500 focus:outline-none"
                    />
                  </div>
                )}

                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">Language</label>
                  <select
                    value={aiConfig.language}
                    onChange={(e) => setAIConfig({ language: e.target.value as 'no' | 'en' | 'both' })}
                    className="w-full rounded-lg border border-slate-200 p-2 text-sm focus:border-purple-500 focus:outline-none"
                  >
                    <option value="no">Norwegian</option>
                    <option value="en">English</option>
                    <option value="both">Both</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Interface Language */}
            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-900">
                <Globe size={20} className="text-blue-600" />
                Interface Language
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">Admin Interface Language</label>
                  <div className="flex gap-4">
                    <label className={cn(
                      'flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg border p-4 transition-colors',
                      language === 'en' ? 'border-blue-500 bg-blue-50' : 'border-slate-200 hover:border-blue-300'
                    )}>
                      <input
                        type="radio"
                        name="language"
                        value="en"
                        checked={language === 'en'}
                        onChange={() => setLanguage('en')}
                        className="sr-only"
                      />
                      <span className="text-2xl">🇬🇧</span>
                      <span className="font-medium">English</span>
                    </label>
                    <label className={cn(
                      'flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg border p-4 transition-colors',
                      language === 'no' ? 'border-blue-500 bg-blue-50' : 'border-slate-200 hover:border-blue-300'
                    )}>
                      <input
                        type="radio"
                        name="language"
                        value="no"
                        checked={language === 'no'}
                        onChange={() => setLanguage('no')}
                        className="sr-only"
                      />
                      <span className="text-2xl">🇳🇴</span>
                      <span className="font-medium">Norwegian</span>
                    </label>
                  </div>
                  <p className="mt-2 text-xs text-slate-500">
                    English is used for admin backend. Norwegian is used for public-facing frontend.
                  </p>
                </div>
              </div>
            </div>

            {/* Company Settings */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 lg:col-span-2">
              <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-900">
                <Building size={20} className="text-slate-600" />
                Company Information
              </h2>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">Company Name</label>
                  <input
                    type="text"
                    value={companySettings.name}
                    onChange={(e) => setCompanySettings(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full rounded-lg border border-slate-200 p-2 text-sm focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">Organization Number</label>
                  <input
                    type="text"
                    value={companySettings.orgNumber}
                    onChange={(e) => setCompanySettings(prev => ({ ...prev, orgNumber: e.target.value }))}
                    className="w-full rounded-lg border border-slate-200 p-2 text-sm focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">Address</label>
                  <input
                    type="text"
                    value={companySettings.address}
                    onChange={(e) => setCompanySettings(prev => ({ ...prev, address: e.target.value }))}
                    className="w-full rounded-lg border border-slate-200 p-2 text-sm focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700">Postal Code</label>
                    <input
                      type="text"
                      value={companySettings.postalCode}
                      onChange={(e) => setCompanySettings(prev => ({ ...prev, postalCode: e.target.value }))}
                      className="w-full rounded-lg border border-slate-200 p-2 text-sm focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700">City</label>
                    <input
                      type="text"
                      value={companySettings.city}
                      onChange={(e) => setCompanySettings(prev => ({ ...prev, city: e.target.value }))}
                      className="w-full rounded-lg border border-slate-200 p-2 text-sm focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">Phone</label>
                  <input
                    type="tel"
                    value={companySettings.phone}
                    onChange={(e) => setCompanySettings(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full rounded-lg border border-slate-200 p-2 text-sm focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">Email</label>
                  <input
                    type="email"
                    value={companySettings.email}
                    onChange={(e) => setCompanySettings(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full rounded-lg border border-slate-200 p-2 text-sm focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                >
                  <Save size={16} />
                  Save Settings
                </button>
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
