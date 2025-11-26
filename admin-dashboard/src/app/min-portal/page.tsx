/**
 * NORNEX AS - Private Customer Portal (Norwegian)
 * @author NORNEX Development Team
 * @version 2.0.0
 * @copyright 2025 NORNEX AS
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Package,
  Wrench,
  FileText,
  Settings,
  LogOut,
  ChevronRight,
  User,
  Clock,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import { PublicHeader, PublicFooter } from '@/components/public';

// Demo data
const orders = [
  { id: 'ORD-2024-001', date: '2024-11-20', status: 'delivered', total: 12990, items: 1 },
  { id: 'ORD-2024-002', date: '2024-11-25', status: 'shipped', total: 2180, items: 2 },
];

const repairs = [
  { id: 'REP-2024-001', device: 'MacBook Pro 14"', status: 'completed', date: '2024-11-15' },
  { id: 'REP-2024-002', device: 'iPhone 15', status: 'in-progress', date: '2024-11-24' },
];

const tabs = [
  { id: 'orders', name: 'Bestillinger', icon: Package },
  { id: 'repairs', name: 'Reparasjoner', icon: Wrench },
  { id: 'invoices', name: 'Fakturaer', icon: FileText },
  { id: 'settings', name: 'Innstillinger', icon: Settings },
];

export default function MinPortalPage() {
  const [activeTab, setActiveTab] = useState('orders');

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'delivered':
      case 'completed':
        return (
          <span className="flex items-center gap-1 text-green-600 text-sm">
            <CheckCircle className="h-4 w-4" />
            {status === 'delivered' ? 'Levert' : 'Fullført'}
          </span>
        );
      case 'shipped':
        return (
          <span className="flex items-center gap-1 text-blue-600 text-sm">
            <Package className="h-4 w-4" />
            Sendt
          </span>
        );
      case 'in-progress':
        return (
          <span className="flex items-center gap-1 text-orange-600 text-sm">
            <Clock className="h-4 w-4" />
            Under arbeid
          </span>
        );
      default:
        return (
          <span className="flex items-center gap-1 text-slate-600 text-sm">
            <AlertCircle className="h-4 w-4" />
            {status}
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <PublicHeader />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center">
              <User className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Min portal</h1>
              <p className="text-slate-500">Velkommen tilbake!</p>
            </div>
          </div>
          <button className="flex items-center gap-2 text-slate-600 hover:text-slate-900">
            <LogOut className="h-5 w-5" />
            <span className="hidden sm:inline">Logg ut</span>
          </button>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
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
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm p-6">
              {activeTab === 'orders' && (
                <div>
                  <h2 className="text-xl font-bold text-slate-900 mb-6">
                    Mine bestillinger
                  </h2>
                  {orders.length === 0 ? (
                    <div className="text-center py-12">
                      <Package className="h-12 w-12 text-slate-300 mx-auto" />
                      <p className="mt-4 text-slate-500">Ingen bestillinger ennå</p>
                      <Link
                        href="/nettbutikk"
                        className="mt-4 inline-block text-blue-600 hover:text-blue-700"
                      >
                        Gå til nettbutikken →
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {orders.map((order) => (
                        <div
                          key={order.id}
                          className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:border-blue-200 transition-colors"
                        >
                          <div>
                            <div className="font-medium text-slate-900">{order.id}</div>
                            <div className="text-sm text-slate-500">
                              {new Date(order.date).toLocaleDateString('nb-NO')} • 
                              {order.items} vare{order.items > 1 ? 'r' : ''}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-slate-900">
                              {order.total.toLocaleString('nb-NO')} kr
                            </div>
                            {getStatusBadge(order.status)}
                          </div>
                          <ChevronRight className="h-5 w-5 text-slate-400" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'repairs' && (
                <div>
                  <h2 className="text-xl font-bold text-slate-900 mb-6">
                    Mine reparasjoner
                  </h2>
                  {repairs.length === 0 ? (
                    <div className="text-center py-12">
                      <Wrench className="h-12 w-12 text-slate-300 mx-auto" />
                      <p className="mt-4 text-slate-500">Ingen reparasjoner registrert</p>
                      <Link
                        href="/reparasjon"
                        className="mt-4 inline-block text-blue-600 hover:text-blue-700"
                      >
                        Book en reparasjon →
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {repairs.map((repair) => (
                        <div
                          key={repair.id}
                          className="flex items-center justify-between p-4 border border-slate-200 rounded-lg"
                        >
                          <div>
                            <div className="font-medium text-slate-900">{repair.id}</div>
                            <div className="text-sm text-slate-500">{repair.device}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-slate-500">
                              {new Date(repair.date).toLocaleDateString('nb-NO')}
                            </div>
                            {getStatusBadge(repair.status)}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'invoices' && (
                <div>
                  <h2 className="text-xl font-bold text-slate-900 mb-6">
                    Mine fakturaer
                  </h2>
                  <div className="text-center py-12">
                    <FileText className="h-12 w-12 text-slate-300 mx-auto" />
                    <p className="mt-4 text-slate-500">Ingen fakturaer tilgjengelig</p>
                  </div>
                </div>
              )}

              {activeTab === 'settings' && (
                <div>
                  <h2 className="text-xl font-bold text-slate-900 mb-6">
                    Innstillinger
                  </h2>
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium text-slate-900 mb-3">Personlig informasjon</h3>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label className="block text-sm text-slate-500 mb-1">Navn</label>
                          <input
                            type="text"
                            className="w-full px-4 py-2 border border-slate-200 rounded-lg"
                            placeholder="Ditt navn"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-slate-500 mb-1">E-post</label>
                          <input
                            type="email"
                            className="w-full px-4 py-2 border border-slate-200 rounded-lg"
                            placeholder="din@epost.no"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-slate-500 mb-1">Telefon</label>
                          <input
                            type="tel"
                            className="w-full px-4 py-2 border border-slate-200 rounded-lg"
                            placeholder="+47 XXX XX XXX"
                          />
                        </div>
                      </div>
                      <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        Lagre endringer
                      </button>
                    </div>

                    <div className="pt-6 border-t">
                      <h3 className="font-medium text-slate-900 mb-3">Passord</h3>
                      <button className="text-blue-600 hover:text-blue-700">
                        Endre passord →
                      </button>
                    </div>

                    <div className="pt-6 border-t">
                      <h3 className="font-medium text-slate-900 mb-3">Nyhetsbrev</h3>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="rounded text-blue-600" />
                        <span className="text-slate-600">
                          Motta nyheter og tilbud på e-post
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <PublicFooter />
    </div>
  );
}
