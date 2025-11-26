/**
 * NORNEX AS - Sidebar Navigation Component
 * @author NORNEX Development Team
 * @version 2.0.0
 * @copyright 2025 NORNEX AS
 */

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  ShoppingCart,
  Package,
  Briefcase,
  Wrench,
  FileText,
  Calendar,
  Truck,
  Bot,
  Settings,
  Shield,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAppStore } from '@/lib/store';
import { t } from '@/lib/translations';

const navigation = [
  { name: 'nav.dashboard', href: '/', icon: LayoutDashboard },
  { name: 'nav.customers', href: '/customers', icon: Users },
  { name: 'nav.orders', href: '/orders', icon: ShoppingCart },
  { name: 'nav.products', href: '/products', icon: Package },
  { name: 'nav.services', href: '/services', icon: Briefcase },
  { name: 'nav.repairs', href: '/repairs', icon: Wrench },
  { name: 'nav.invoices', href: '/invoices', icon: FileText },
  { name: 'nav.bookings', href: '/bookings', icon: Calendar },
  { name: 'nav.shipping', href: '/shipping', icon: Truck },
  { name: 'nav.aiTools', href: '/ai-tools', icon: Bot },
  { name: 'nav.settings', href: '/settings', icon: Settings },
  { name: 'nav.security', href: '/security', icon: Shield },
];

export function Sidebar() {
  const pathname = usePathname();
  const { sidebarOpen, toggleSidebar, language } = useAppStore();

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-40 h-screen bg-slate-900 text-white transition-all duration-300',
        sidebarOpen ? 'w-64' : 'w-20'
      )}
    >
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center justify-between border-b border-slate-700 px-4">
          {sidebarOpen && (
            <Link href="/" className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 font-bold">
                N
              </div>
              <span className="text-lg font-bold">NORNEX AS</span>
            </Link>
          )}
          <button
            onClick={toggleSidebar}
            className="rounded-lg p-2 hover:bg-slate-800"
            aria-label={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
          >
            {sidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white',
                  !sidebarOpen && 'justify-center'
                )}
                title={!sidebarOpen ? t(item.name as keyof typeof import('@/lib/translations').translations.en, language) : undefined}
              >
                <Icon size={20} className={cn(sidebarOpen && 'mr-3')} />
                {sidebarOpen && (
                  <span>{t(item.name as keyof typeof import('@/lib/translations').translations.en, language)}</span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="border-t border-slate-700 p-3">
          <button
            className={cn(
              'flex w-full items-center rounded-lg px-3 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-800 hover:text-white',
              !sidebarOpen && 'justify-center'
            )}
            onClick={() => {
              // Handle logout
              console.log('Logout clicked');
            }}
          >
            <LogOut size={20} className={cn(sidebarOpen && 'mr-3')} />
            {sidebarOpen && <span>{t('nav.logout', language)}</span>}
          </button>
        </div>

        {/* Footer */}
        {sidebarOpen && (
          <div className="border-t border-slate-700 p-4 text-center text-xs text-slate-500">
            <p>© 2025 NORNEX AS</p>
            <p>v2.0.0</p>
          </div>
        )}
      </div>
    </aside>
  );
}
