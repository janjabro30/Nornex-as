"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Mail,
  Share2,
  Users,
  ShoppingCart,
  Wrench,
  Recycle,
  FileText,
  Settings,
  Search,
  Key,
  Globe,
  ChevronRight,
  Menu,
  X,
  Bell,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Import view components
import DashboardView from "./views/DashboardView";
import EmailsView from "./views/EmailsView";
import SocialView from "./views/SocialView";
import PartnersView from "./views/PartnersView";
import ApisView from "./views/ApisView";
import SeoView from "./views/SeoView";
import OrdersView from "./views/OrdersView";
import RepairsView from "./views/RepairsView";
import SellbackView from "./views/SellbackView";
import ContractsView from "./views/ContractsView";
import SettingsView from "./views/SettingsView";
import UsersView from "./views/UsersView";

type ViewType =
  | "dashboard"
  | "emails"
  | "social"
  | "partners"
  | "apis"
  | "seo"
  | "orders"
  | "repairs"
  | "sellback"
  | "contracts"
  | "settings"
  | "users";

interface MenuItem {
  id: ViewType;
  label: string;
  icon: typeof LayoutDashboard;
  badge?: string;
  badgeVariant?: "default" | "destructive" | "secondary";
}

const menuItems: MenuItem[] = [
  { id: "dashboard", label: "Oversikt", icon: LayoutDashboard },
  { id: "orders", label: "Ordrer", icon: ShoppingCart, badge: "12", badgeVariant: "destructive" },
  { id: "repairs", label: "Reparasjoner", icon: Wrench, badge: "5" },
  { id: "sellback", label: "Innkjøp", icon: Recycle, badge: "8" },
  { id: "contracts", label: "Kontrakter", icon: FileText },
  { id: "emails", label: "E-postmaler", icon: Mail },
  { id: "social", label: "Sosiale medier", icon: Share2 },
  { id: "partners", label: "Partnere", icon: Users },
  { id: "apis", label: "API-integrasjoner", icon: Key },
  { id: "seo", label: "SEO", icon: Globe },
  { id: "users", label: "Brukere", icon: Users },
  { id: "settings", label: "Innstillinger", icon: Settings },
];

function AdminBackendContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  // Derive currentView from searchParams
  const viewParam = searchParams.get("view") as ViewType;
  const currentView: ViewType = viewParam && menuItems.some((item) => item.id === viewParam) 
    ? viewParam 
    : "dashboard";

  const navigateTo = (view: string) => {
    const newUrl = view === "dashboard" ? "/AdminBackend" : `/AdminBackend?view=${view}`;
    router.push(newUrl);
  };

  const getCurrentTitle = () => {
    const item = menuItems.find((m) => m.id === currentView);
    return item?.label || "Oversikt";
  };

  const renderView = () => {
    switch (currentView) {
      case "emails":
        return <EmailsView />;
      case "social":
        return <SocialView />;
      case "partners":
        return <PartnersView />;
      case "apis":
        return <ApisView />;
      case "seo":
        return <SeoView />;
      case "orders":
        return <OrdersView />;
      case "repairs":
        return <RepairsView />;
      case "sellback":
        return <SellbackView />;
      case "contracts":
        return <ContractsView />;
      case "settings":
        return <SettingsView />;
      case "users":
        return <UsersView />;
      default:
        return <DashboardView onNavigate={navigateTo} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 bg-gray-900 text-white transition-all duration-300 ${
          sidebarOpen ? "w-64" : "w-20"
        }`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-800">
          {sidebarOpen && (
            <div className="flex items-center space-x-2">
              <LayoutDashboard className="w-8 h-8 text-green-500" />
              <div>
                <span className="font-bold">Nornex</span>
                <span className="text-green-500 font-bold ml-1">Admin</span>
              </div>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-gray-800 rounded-lg"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => navigateTo(item.id)}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors ${
                currentView === item.id
                  ? "bg-green-600 text-white"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {sidebarOpen && (
                <>
                  <span className="flex-1 text-left text-sm">{item.label}</span>
                  {item.badge && (
                    <Badge
                      variant={item.badgeVariant || "secondary"}
                      className="text-xs"
                    >
                      {item.badge}
                    </Badge>
                  )}
                </>
              )}
            </button>
          ))}
        </nav>

        {/* Company Info */}
        {sidebarOpen && (
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800">
            <div className="text-xs text-gray-500">
              <p className="font-medium text-gray-400">Nornex AS</p>
              <p>Brynsveien 18</p>
              <p>0667 Oslo, Norway</p>
            </div>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
          <div className="flex items-center space-x-4">
            {/* Breadcrumbs */}
            <nav className="flex items-center space-x-2 text-sm">
              <span className="text-gray-500">Admin</span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <span className="font-medium text-gray-900">{getCurrentTitle()}</span>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Søk..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent w-64"
              />
            </div>

            {/* Notifications */}
            <button className="relative p-2 hover:bg-gray-100 rounded-lg">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* User Menu */}
            <div className="flex items-center space-x-3 pl-4 border-l border-gray-200">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">NA</span>
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-medium text-gray-900">Nornex Admin</p>
                <p className="text-xs text-gray-500">Super Admin</p>
              </div>
              <Button variant="ghost" size="icon">
                <LogOut className="w-4 h-4 text-gray-500" />
              </Button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto">{renderView()}</main>
      </div>
    </div>
  );
}

export default function AdminBackendPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-100 flex items-center justify-center">Laster...</div>}>
      <AdminBackendContent />
    </Suspense>
  );
}
