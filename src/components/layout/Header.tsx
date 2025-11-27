/**
 * NORNEX AS - Header Component
 * @author NORNEX Development Team
 * @version 2.0.0
 * @copyright 2025 NORNEX AS
 */

'use client';

import { Bell, Search, Globe, User } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { cn } from '@/lib/utils';

export function Header() {
  const { sidebarOpen, language, setLanguage, user } = useAppStore();

  return (
    <header
      className={cn(
        'fixed top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6 transition-all duration-300',
        sidebarOpen ? 'left-64' : 'left-20',
        'right-0'
      )}
    >
      {/* Search */}
      <div className="flex items-center">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search..."
            className="h-10 w-64 rounded-lg border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center space-x-4">
        {/* Language switcher */}
        <button
          onClick={() => setLanguage(language === 'en' ? 'no' : 'en')}
          className="flex items-center space-x-1 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
          title={language === 'en' ? 'Switch to Norwegian' : 'Switch to English'}
        >
          <Globe size={18} />
          <span className="uppercase">{language}</span>
        </button>

        {/* Notifications */}
        <button className="relative rounded-lg p-2 text-slate-600 hover:bg-slate-100">
          <Bell size={20} />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
        </button>

        {/* User menu */}
        <div className="flex items-center space-x-3 border-l border-slate-200 pl-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-white">
            <User size={18} />
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium text-slate-900">{user?.name || 'Admin User'}</p>
            <p className="text-xs text-slate-500">{user?.role || 'Administrator'}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
