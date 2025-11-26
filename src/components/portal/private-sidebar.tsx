"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  ShoppingBag,
  Wrench,
  FileText,
  HeadphonesIcon,
  Repeat,
  Settings,
  User,
  Shield,
  Bell,
  LogOut,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";
import { useAuthStore } from "@/store";
import { cn } from "@/lib/utils";

interface SidebarLink {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
}

const privateLinks: SidebarLink[] = [
  { href: "/my-portal", label: "Oversikt", icon: Home },
  { href: "/my-portal/orders", label: "Mine ordrer", icon: ShoppingBag },
  { href: "/my-portal/repairs", label: "Reparasjoner", icon: Wrench },
  { href: "/my-portal/invoices", label: "Fakturaer", icon: FileText },
  { href: "/my-portal/support", label: "Støtte", icon: HeadphonesIcon },
  { href: "/my-portal/trade-ins", label: "Innbytter", icon: Repeat },
];

const settingsLinks: SidebarLink[] = [
  { href: "/my-portal/profile", label: "Min profil", icon: User },
  { href: "/my-portal/security", label: "Sikkerhet", icon: Shield },
  { href: "/my-portal/settings", label: "Innstillinger", icon: Settings },
];

export function PrivateSidebar() {
  const pathname = usePathname();
  const { user, logout, unreadCount } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);

  const renderLink = (link: SidebarLink) => {
    const isActive = pathname === link.href;
    return (
      <Link
        key={link.href}
        href={link.href}
        onClick={() => setIsOpen(false)}
        className={cn(
          "flex items-center justify-between px-4 py-3 rounded-lg transition-all",
          "hover:bg-green-50 hover:text-green-700",
          "min-h-[44px] touch-manipulation",
          isActive
            ? "bg-green-100 text-green-700 font-medium"
            : "text-gray-600"
        )}
      >
        <div className="flex items-center gap-3">
          <link.icon className="w-5 h-5" />
          <span>{link.label}</span>
        </div>
        {link.badge && link.badge > 0 && (
          <span className="bg-red-500 text-white text-xs rounded-full px-2 py-0.5 min-w-[20px] text-center">
            {link.badge}
          </span>
        )}
        {isActive && <ChevronRight className="w-4 h-4" />}
      </Link>
    );
  };

  const sidebarContent = (
    <>
      {/* User Info */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
            <User className="w-6 h-6 text-green-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-gray-900 truncate">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-sm text-gray-500 truncate">{user?.email}</p>
          </div>
          <button
            className="relative p-2 hover:bg-gray-100 rounded-full"
            aria-label="Varsler"
          >
            <Bell className="w-5 h-5 text-gray-600" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        <div className="mb-4">
          <p className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Hovedmeny
          </p>
          {privateLinks.map(renderLink)}
        </div>

        <div>
          <p className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Innstillinger
          </p>
          {settingsLinks.map(renderLink)}
        </div>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-100">
        <button
          onClick={() => {
            logout();
            setIsOpen(false);
          }}
          className="flex items-center gap-3 w-full px-4 py-3 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors min-h-[44px]"
        >
          <LogOut className="w-5 h-5" />
          <span>Logg ut</span>
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Toggle */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Lukk meny" : "Åpne meny"}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:sticky top-0 left-0 z-40 h-screen w-72 bg-white border-r border-gray-200 flex flex-col transition-transform duration-300",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Logo */}
        <div className="p-4 border-b border-gray-100">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">N</span>
            </div>
            <div>
              <span className="font-bold text-gray-900">Min Portal</span>
              <p className="text-xs text-gray-500">Nornex AS</p>
            </div>
          </Link>
        </div>

        {sidebarContent}
      </aside>

      {/* Mobile Bottom Nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-gray-200 safe-area-inset-bottom">
        <div className="flex justify-around py-2">
          {privateLinks.slice(0, 5).map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex flex-col items-center gap-1 p-2 min-w-[44px] min-h-[44px]",
                  isActive ? "text-green-600" : "text-gray-500"
                )}
              >
                <link.icon className="w-5 h-5" />
                <span className="text-[10px]">{link.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
