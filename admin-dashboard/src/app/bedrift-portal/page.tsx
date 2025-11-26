/**
 * NORNEX AS - Business Customer Portal (Norwegian)
 * @author NORNEX Development Team
 * @version 2.0.0
 * @copyright 2025 NORNEX AS
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Building2,
  Users,
  FileCheck,
  CreditCard,
  Laptop,
  Headphones,
  LogOut,
  ChevronRight,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
} from 'lucide-react';
import { PublicHeader, PublicFooter } from '@/components/public';
import { formatCurrency } from '@/lib/utils';

// Demo data
const contracts = [
  { id: 'CTR-2024-001', name: 'IT Support Premium', status: 'active', endDate: '2025-12-31', value: 9990 },
  { id: 'CTR-2024-002', name: 'Microsoft 365 Business', status: 'active', endDate: '2025-06-15', value: 2990 },
];

const devices = [
  { id: 'DEV-001', name: 'HP EliteBook 840', user: 'Erik Johansen', status: 'active' },
  { id: 'DEV-002', name: 'MacBook Pro 14"', user: 'Maria Hansen', status: 'active' },
  { id: 'DEV-003', name: 'Dell OptiPlex 7090', user: 'Kontor', status: 'repair' },
];

const supportTickets = [
  { id: 'TKT-2024-050', subject: 'E-post synkronisering', status: 'resolved', date: '2024-11-20' },
  { id: 'TKT-2024-051', subject: 'Ny bruker oppsett', status: 'in-progress', date: '2024-11-24' },
];

const tabs = [
  { id: 'overview', name: 'Oversikt', icon: Building2 },
  { id: 'contracts', name: 'Avtaler', icon: FileCheck },
  { id: 'devices', name: 'Enheter', icon: Laptop },
  { id: 'team', name: 'Team', icon: Users },
  { id: 'support', name: 'Support', icon: Headphones },
  { id: 'invoices', name: 'Økonomi', icon: CreditCard },
];

export default function BedriftPortalPage() {
  const [activeTab, setActiveTab] = useState('overview');

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
      case 'resolved':
        return (
          <span className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
            <CheckCircle className="h-3 w-3" />
            {status === 'active' ? 'Aktiv' : 'Løst'}
          </span>
        );
      case 'in-progress':
        return (
          <span className="flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
            <Clock className="h-3 w-3" />
            Pågår
          </span>
        );
      case 'repair':
        return (
          <span className="flex items-center gap-1 px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded-full">
            <AlertCircle className="h-3 w-3" />
            Reparasjon
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <PublicHeader />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-xl bg-blue-600 flex items-center justify-center">
              <Building2 className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Bedriftsportal</h1>
              <p className="text-slate-500">Acme Norge AS</p>
            </div>
          </div>
          <button className="flex items-center gap-2 text-slate-600 hover:text-slate-900">
            <LogOut className="h-5 w-5" />
            <span className="hidden sm:inline">Logg ut</span>
          </button>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <nav className="bg-white rounded-xl p-2 shadow-sm">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors
                      ${activeTab === tab.id
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-slate-600 hover:bg-slate-50'
                      }
                    `}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{tab.name}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-4">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Stats */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <div className="text-sm text-slate-500">Aktive avtaler</div>
                    <div className="mt-2 text-3xl font-bold text-slate-900">
                      {contracts.length}
                    </div>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <div className="text-sm text-slate-500">Enheter</div>
                    <div className="mt-2 text-3xl font-bold text-slate-900">
                      {devices.length}
                    </div>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <div className="text-sm text-slate-500">Åpne saker</div>
                    <div className="mt-2 text-3xl font-bold text-slate-900">
                      {supportTickets.filter(t => t.status !== 'resolved').length}
                    </div>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <div className="text-sm text-slate-500">Månedlig kostnad</div>
                    <div className="mt-2 text-3xl font-bold text-slate-900">
                      {formatCurrency(contracts.reduce((sum, c) => sum + c.value, 0))}
                    </div>
                  </div>
                </div>

                {/* Quick Links */}
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h2 className="text-lg font-bold text-slate-900 mb-4">Hurtighandlinger</h2>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <Link
                      href="/kontakt"
                      className="flex items-center gap-3 p-4 border border-slate-200 rounded-lg hover:border-blue-200 transition-colors"
                    >
                      <Headphones className="h-6 w-6 text-blue-600" />
                      <span className="font-medium">Ny supporthenvendelse</span>
                    </Link>
                    <Link
                      href="/reparasjon"
                      className="flex items-center gap-3 p-4 border border-slate-200 rounded-lg hover:border-blue-200 transition-colors"
                    >
                      <Laptop className="h-6 w-6 text-blue-600" />
                      <span className="font-medium">Registrer reparasjon</span>
                    </Link>
                    <Link
                      href="/nettbutikk"
                      className="flex items-center gap-3 p-4 border border-slate-200 rounded-lg hover:border-blue-200 transition-colors"
                    >
                      <TrendingUp className="h-6 w-6 text-blue-600" />
                      <span className="font-medium">Bestill utstyr</span>
                    </Link>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h2 className="text-lg font-bold text-slate-900 mb-4">Nylig aktivitet</h2>
                  <div className="space-y-4">
                    {supportTickets.map((ticket) => (
                      <div key={ticket.id} className="flex items-center justify-between py-3 border-b last:border-0">
                        <div>
                          <div className="font-medium text-slate-900">{ticket.subject}</div>
                          <div className="text-sm text-slate-500">{ticket.id}</div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-slate-500">
                            {new Date(ticket.date).toLocaleDateString('nb-NO')}
                          </span>
                          {getStatusBadge(ticket.status)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'contracts' && (
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-bold text-slate-900 mb-6">Avtaler</h2>
                <div className="space-y-4">
                  {contracts.map((contract) => (
                    <div
                      key={contract.id}
                      className="flex items-center justify-between p-4 border border-slate-200 rounded-lg"
                    >
                      <div>
                        <div className="font-medium text-slate-900">{contract.name}</div>
                        <div className="text-sm text-slate-500">
                          {contract.id} • Utløper {new Date(contract.endDate).toLocaleDateString('nb-NO')}
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="font-bold text-slate-900">{formatCurrency(contract.value)}/mnd</div>
                        </div>
                        {getStatusBadge(contract.status)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'devices' && (
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-slate-900">Enheter</h2>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                    + Legg til enhet
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-medium text-slate-500">ID</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-slate-500">Enhet</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-slate-500">Bruker</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-slate-500">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {devices.map((device) => (
                        <tr key={device.id} className="hover:bg-slate-50">
                          <td className="px-4 py-3 text-sm font-mono text-slate-500">{device.id}</td>
                          <td className="px-4 py-3 font-medium text-slate-900">{device.name}</td>
                          <td className="px-4 py-3 text-slate-600">{device.user}</td>
                          <td className="px-4 py-3">{getStatusBadge(device.status)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'team' && (
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-bold text-slate-900 mb-6">Team</h2>
                <p className="text-slate-500">Teamadministrasjon kommer snart.</p>
              </div>
            )}

            {activeTab === 'support' && (
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-slate-900">Supporthenvendelser</h2>
                  <Link
                    href="/kontakt"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                  >
                    + Ny henvendelse
                  </Link>
                </div>
                <div className="space-y-4">
                  {supportTickets.map((ticket) => (
                    <div
                      key={ticket.id}
                      className="flex items-center justify-between p-4 border border-slate-200 rounded-lg"
                    >
                      <div>
                        <div className="font-medium text-slate-900">{ticket.subject}</div>
                        <div className="text-sm text-slate-500">{ticket.id}</div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-slate-500">
                          {new Date(ticket.date).toLocaleDateString('nb-NO')}
                        </span>
                        {getStatusBadge(ticket.status)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'invoices' && (
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-bold text-slate-900 mb-6">Økonomi</h2>
                <p className="text-slate-500">Fakturaer og betalingshistorikk kommer snart.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <PublicFooter />
    </div>
  );
}
