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
  Building2,
  Users,
  BarChart3,
  Laptop,
  Settings,
  User,
  Shield,
  Bell,
  LogOut,
  Menu,
  X,
  ChevronRight,
  AlertTriangle,
  Calendar,
} from "lucide-react";
import { useAuthStore } from "@/store";
import { cn } from "@/lib/utils";

interface SidebarLink {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
  badgeType?: "warning" | "danger" | "info";
}

interface SidebarSection {
  title: string;
  links: SidebarLink[];
}

const companySections: SidebarSection[] = [
  {
    title: "Oversikt",
    links: [
      { href: "/company-portal", label: "Dashboard", icon: Home },
      { href: "/company-portal/analytics", label: "Rapporter & Analyse", icon: BarChart3 },
    ],
  },
  {
    title: "Ordrer & Reparasjoner",
    links: [
      { href: "/company-portal/orders", label: "Ordrer", icon: ShoppingBag },
      { href: "/company-portal/repairs", label: "Reparasjoner", icon: Wrench },
    ],
  },
  {
    title: "Administrasjon",
    links: [
      { href: "/company-portal/contracts", label: "Kontrakter", icon: Calendar, badge: 2, badgeType: "warning" },
      { href: "/company-portal/fleet", label: "Enhetsflåte", icon: Laptop },
      { href: "/company-portal/team", label: "Team & Tilganger", icon: Users },
    ],
  },
  {
    title: "Dokumenter",
    links: [
      { href: "/company-portal/invoices", label: "Fakturaer", icon: FileText },
      { href: "/company-portal/documents", label: "Dokumentsenter", icon: Building2 },
    ],
  },
  {
    title: "Støtte",
    links: [
      { href: "/company-portal/support", label: "Støttesaker", icon: HeadphonesIcon },
    ],
  },
];

const settingsLinks: SidebarLink[] = [
  { href: "/company-portal/profile", label: "Bedriftsprofil", icon: Building2 },
  { href: "/company-portal/security", label: "Sikkerhet", icon: Shield },
  { href: "/company-portal/settings", label: "Innstillinger", icon: Settings },
];

export function CompanySidebar() {
  const pathname = usePathname();
  const { user, logout, unreadCount } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);

  const getBadgeColor = (type?: "warning" | "danger" | "info") => {
    switch (type) {
      case "warning":
        return "bg-yellow-500";
      case "danger":
        return "bg-red-500";
      case "info":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  const renderLink = (link: SidebarLink) => {
    const isActive = pathname === link.href;
    return (
      <Link
        key={link.href}
        href={link.href}
        onClick={() => setIsOpen(false)}
        className={cn(
          "flex items-center justify-between px-4 py-3 rounded-lg transition-all",
          "hover:bg-blue-50 hover:text-blue-700",
          "min-h-[44px] touch-manipulation",
          isActive
            ? "bg-blue-100 text-blue-700 font-medium"
            : "text-gray-600"
        )}
      >
        <div className="flex items-center gap-3">
          <link.icon className="w-5 h-5" />
          <span>{link.label}</span>
        </div>
        <div className="flex items-center gap-2">
          {link.badge && link.badge > 0 && (
            <span className={cn(
              "text-white text-xs rounded-full px-2 py-0.5 min-w-[20px] text-center flex items-center gap-1",
              getBadgeColor(link.badgeType)
            )}>
              {link.badgeType === "warning" && <AlertTriangle className="w-3 h-3" />}
              {link.badge}
            </span>
          )}
          {isActive && <ChevronRight className="w-4 h-4" />}
        </div>
      </Link>
    );
  };

  const sidebarContent = (
    <>
      {/* Company & User Info */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
            <Building2 className="w-6 h-6 text-blue-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-gray-900 truncate">
              {user?.companyInfo?.companyName || "Bedrift AS"}
            </p>
            <p className="text-sm text-gray-500 truncate">
              Org.nr: {user?.companyInfo?.orgNumber || "000000000"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
            <User className="w-4 h-4 text-gray-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-700 truncate">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-xs text-gray-500">Administrator</p>
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
      <nav className="flex-1 p-3 space-y-4 overflow-y-auto">
        {companySections.map((section) => (
          <div key={section.title}>
            <p className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              {section.title}
            </p>
            <div className="space-y-1">
              {section.links.map(renderLink)}
            </div>
          </div>
        ))}

        <div>
          <p className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Innstillinger
          </p>
          <div className="space-y-1">
            {settingsLinks.map(renderLink)}
          </div>
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
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">N</span>
            </div>
            <div>
              <span className="font-bold text-gray-900">Bedriftsportal</span>
              <p className="text-xs text-gray-500">Nornex AS</p>
            </div>
          </Link>
        </div>

        {sidebarContent}
      </aside>

      {/* Mobile Bottom Nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-gray-200 safe-area-inset-bottom">
        <div className="flex justify-around py-2">
          {[
            { href: "/company-portal", label: "Hjem", icon: Home },
            { href: "/company-portal/orders", label: "Ordrer", icon: ShoppingBag },
            { href: "/company-portal/fleet", label: "Enheter", icon: Laptop },
            { href: "/company-portal/contracts", label: "Kontrakter", icon: Calendar },
            { href: "/company-portal/analytics", label: "Rapporter", icon: BarChart3 },
          ].map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex flex-col items-center gap-1 p-2 min-w-[44px] min-h-[44px]",
                  isActive ? "text-blue-600" : "text-gray-500"
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
