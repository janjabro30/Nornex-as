"use client";

import React, { useState } from "react";
import { Check, X, Save, Building, Mail, Phone, Globe, CreditCard, Key, Settings as SettingsIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface CompanySettings {
  companyName: string;
  orgNumber: string;
  vatNumber: string;
  address: string;
  postalCode: string;
  city: string;
  country: string;
  phone: string;
  email: string;
  website: string;
  bankAccount: string;
}

interface EmailSettings {
  smtpHost: string;
  smtpPort: string;
  smtpUser: string;
  smtpPassword: string;
  defaultFromAddress: string;
  emailSignature: string;
  enableNotifications: boolean;
}

interface GeneralSettings {
  siteName: string;
  defaultCurrency: string;
  vatRate: number;
  dateFormat: string;
  language: string;
}

interface ApiKeys {
  googleAnalyticsId: string;
  stripeKey: string;
  vippsKey: string;
  postenKey: string;
}

const departmentEmails = [
  { department: "Ordrer", email: "orders@nornex.no" },
  { department: "Reparasjoner", email: "repairs@nornex.no" },
  { department: "Support", email: "support@nornex.no" },
  { department: "Kontrakter", email: "contracts@nornex.no" },
  { department: "Fakturaer", email: "invoices@nornex.no" },
  { department: "Innkjøp", email: "buyback@nornex.no" },
  { department: "Sikkerhet", email: "security@nornex.no" },
];

export default function SettingsView() {
  const [activeTab, setActiveTab] = useState("company");
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const [companySettings, setCompanySettings] = useState<CompanySettings>({
    companyName: "Nornex AS",
    orgNumber: "123 456 789",
    vatNumber: "NO123456789MVA",
    address: "Brynsveien 18",
    postalCode: "0667",
    city: "Oslo",
    country: "Norge",
    phone: "+47 22 33 44 55",
    email: "post@nornex.no",
    website: "https://nornex.no",
    bankAccount: "1234.56.78901",
  });

  const [emailSettings, setEmailSettings] = useState<EmailSettings>({
    smtpHost: "smtp.example.com",
    smtpPort: "587",
    smtpUser: "noreply@nornex.no",
    smtpPassword: "••••••••••••",
    defaultFromAddress: "noreply@nornex.no",
    emailSignature: "Med vennlig hilsen,\nNornex AS\nBrynsveien 18, 0667 Oslo\nTlf: +47 22 33 44 55",
    enableNotifications: true,
  });

  const [generalSettings, setGeneralSettings] = useState<GeneralSettings>({
    siteName: "Nornex AS",
    defaultCurrency: "NOK",
    vatRate: 25,
    dateFormat: "dd.mm.yyyy",
    language: "no",
  });

  const [apiKeys, setApiKeys] = useState<ApiKeys>({
    googleAnalyticsId: "G-XXXXXXXXXX",
    stripeKey: "sk_live_••••••••••••••••",
    vippsKey: "vipps_••••••••••••••••",
    postenKey: "posten_••••••••••••••••",
  });

  const showNotification = (type: "success" | "error", message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleSave = () => {
    showNotification("success", "Innstillinger lagret");
  };

  const tabs = [
    { id: "company", label: "Firmainfo", icon: Building },
    { id: "email", label: "E-post", icon: Mail },
    { id: "general", label: "Generelt", icon: SettingsIcon },
    { id: "api", label: "API-nøkler", icon: Key },
  ];

  return (
    <div className="space-y-6">
      {/* Notification Toast */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg flex items-center space-x-2 ${notification.type === "success" ? "bg-green-600 text-white" : "bg-red-600 text-white"}`}>
          {notification.type === "success" ? <Check className="w-5 h-5" /> : <X className="w-5 h-5" />}
          <span>{notification.message}</span>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Innstillinger</h1>
          <p className="text-gray-500">Konfigurer system- og bedriftsinnstillinger</p>
        </div>
        <Button onClick={handleSave}>
          <Save className="w-4 h-4 mr-2" />
          Lagre alle
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab.id ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Company Settings */}
      {activeTab === "company" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Building className="w-5 h-5 mr-2" />
              Firmainformasjon
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Firmanavn</label>
                <Input value={companySettings.companyName} onChange={(e) => setCompanySettings({ ...companySettings, companyName: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Organisasjonsnummer</label>
                <Input value={companySettings.orgNumber} onChange={(e) => setCompanySettings({ ...companySettings, orgNumber: e.target.value })} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">MVA-nummer</label>
                <Input value={companySettings.vatNumber} onChange={(e) => setCompanySettings({ ...companySettings, vatNumber: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bankkontonummer</label>
                <Input value={companySettings.bankAccount} onChange={(e) => setCompanySettings({ ...companySettings, bankAccount: e.target.value })} />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Adresse</label>
              <Input value={companySettings.address} onChange={(e) => setCompanySettings({ ...companySettings, address: e.target.value })} />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Postnummer</label>
                <Input value={companySettings.postalCode} onChange={(e) => setCompanySettings({ ...companySettings, postalCode: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sted</label>
                <Input value={companySettings.city} onChange={(e) => setCompanySettings({ ...companySettings, city: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Land</label>
                <Input value={companySettings.country} onChange={(e) => setCompanySettings({ ...companySettings, country: e.target.value })} />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Telefon</label>
                <Input value={companySettings.phone} onChange={(e) => setCompanySettings({ ...companySettings, phone: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">E-post</label>
                <Input value={companySettings.email} onChange={(e) => setCompanySettings({ ...companySettings, email: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nettside</label>
                <Input value={companySettings.website} onChange={(e) => setCompanySettings({ ...companySettings, website: e.target.value })} />
              </div>
            </div>

            <div className="border-t pt-4">
              <h4 className="font-medium text-gray-900 mb-3">Avdelings-e-postadresser</h4>
              <div className="grid grid-cols-2 gap-3">
                {departmentEmails.map((dept) => (
                  <div key={dept.department} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                    <span className="text-sm text-gray-700">{dept.department}</span>
                    <span className="text-sm text-gray-500">{dept.email}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Email Settings */}
      {activeTab === "email" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Mail className="w-5 h-5 mr-2" />
              E-postinnstillinger
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">SMTP-server</label>
                <Input value={emailSettings.smtpHost} onChange={(e) => setEmailSettings({ ...emailSettings, smtpHost: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">SMTP-port</label>
                <Input value={emailSettings.smtpPort} onChange={(e) => setEmailSettings({ ...emailSettings, smtpPort: e.target.value })} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">SMTP-bruker</label>
                <Input value={emailSettings.smtpUser} onChange={(e) => setEmailSettings({ ...emailSettings, smtpUser: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">SMTP-passord</label>
                <Input type="password" value={emailSettings.smtpPassword} onChange={(e) => setEmailSettings({ ...emailSettings, smtpPassword: e.target.value })} />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Standard fra-adresse</label>
              <Input value={emailSettings.defaultFromAddress} onChange={(e) => setEmailSettings({ ...emailSettings, defaultFromAddress: e.target.value })} />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">E-postsignatur</label>
              <Textarea value={emailSettings.emailSignature} onChange={(e) => setEmailSettings({ ...emailSettings, emailSignature: e.target.value })} rows={4} />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="enableNotifications"
                checked={emailSettings.enableNotifications}
                onChange={(e) => setEmailSettings({ ...emailSettings, enableNotifications: e.target.checked })}
                className="rounded border-gray-300"
              />
              <label htmlFor="enableNotifications" className="text-sm text-gray-700">
                Aktiver e-postvarsler
              </label>
            </div>
          </CardContent>
        </Card>
      )}

      {/* General Settings */}
      {activeTab === "general" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <SettingsIcon className="w-5 h-5 mr-2" />
              Generelle innstillinger
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sitenavn</label>
              <Input value={generalSettings.siteName} onChange={(e) => setGeneralSettings({ ...generalSettings, siteName: e.target.value })} />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Valuta</label>
                <select value={generalSettings.defaultCurrency} onChange={(e) => setGeneralSettings({ ...generalSettings, defaultCurrency: e.target.value })} className="w-full h-10 px-3 border border-gray-300 rounded-md bg-white text-sm">
                  <option value="NOK">NOK - Norske kroner</option>
                  <option value="EUR">EUR - Euro</option>
                  <option value="USD">USD - US Dollar</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">MVA-sats (%)</label>
                <Input type="number" value={generalSettings.vatRate} onChange={(e) => setGeneralSettings({ ...generalSettings, vatRate: parseFloat(e.target.value) || 25 })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Språk</label>
                <select value={generalSettings.language} onChange={(e) => setGeneralSettings({ ...generalSettings, language: e.target.value })} className="w-full h-10 px-3 border border-gray-300 rounded-md bg-white text-sm">
                  <option value="no">Norsk</option>
                  <option value="en">English</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Datoformat</label>
              <select value={generalSettings.dateFormat} onChange={(e) => setGeneralSettings({ ...generalSettings, dateFormat: e.target.value })} className="w-full h-10 px-3 border border-gray-300 rounded-md bg-white text-sm">
                <option value="dd.mm.yyyy">dd.mm.yyyy (01.01.2024)</option>
                <option value="yyyy-mm-dd">yyyy-mm-dd (2024-01-01)</option>
                <option value="mm/dd/yyyy">mm/dd/yyyy (01/01/2024)</option>
              </select>
            </div>
          </CardContent>
        </Card>
      )}

      {/* API Keys */}
      {activeTab === "api" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Key className="w-5 h-5 mr-2" />
              API-nøkler
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-sm text-gray-500 bg-yellow-50 p-3 rounded-lg">
              ⚠️ API-nøkler er sensitive. Ikke del dem med uvedkommende.
            </p>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Google Analytics ID</label>
              <Input value={apiKeys.googleAnalyticsId} onChange={(e) => setApiKeys({ ...apiKeys, googleAnalyticsId: e.target.value })} />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Stripe API-nøkkel</label>
              <Input type="password" value={apiKeys.stripeKey} onChange={(e) => setApiKeys({ ...apiKeys, stripeKey: e.target.value })} />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Vipps API-nøkkel</label>
              <Input type="password" value={apiKeys.vippsKey} onChange={(e) => setApiKeys({ ...apiKeys, vippsKey: e.target.value })} />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Posten/Bring API-nøkkel</label>
              <Input type="password" value={apiKeys.postenKey} onChange={(e) => setApiKeys({ ...apiKeys, postenKey: e.target.value })} />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
