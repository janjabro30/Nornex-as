"use client";

import React from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  Shield,
  Users,
  Package,
  ShoppingCart,
  Settings,
  FileText,
  Share2,
  BarChart3,
  Tag,
  Sparkles,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function AdminDashboard() {
  const adminModules = [
    {
      title: "Security Dashboard",
      description: "Monitor security events and manage access controls",
      icon: Shield,
      href: "/admin-secure/security",
      badge: "Security",
    },
    {
      title: "Social Media",
      description: "Manage social accounts and schedule posts",
      icon: Share2,
      href: "/admin-secure/social",
      badge: "Marketing",
    },
    {
      title: "Users & Roles",
      description: "Manage user accounts and role permissions",
      icon: Users,
      href: "/admin-secure/users",
      badge: "Admin",
    },
    {
      title: "Products",
      description: "Manage catalog with AI-powered spec auto-fill",
      icon: Package,
      href: "/admin-secure/products",
      badge: "Shop",
      isNew: true,
    },
    {
      title: "Discount Codes",
      description: "Create and manage promotional discount codes",
      icon: Tag,
      href: "/admin-secure/discounts",
      badge: "Shop",
      isNew: true,
    },
    {
      title: "Orders",
      description: "View and manage customer orders",
      icon: ShoppingCart,
      href: "/admin-secure/orders",
      badge: "Shop",
    },
    {
      title: "Analytics",
      description: "View business and environmental metrics",
      icon: BarChart3,
      href: "/admin-secure/analytics",
      badge: "Reports",
    },
    {
      title: "Audit Logs",
      description: "Review system activity and security events",
      icon: FileText,
      href: "/admin-secure/audit",
      badge: "Security",
    },
    {
      title: "Settings",
      description: "Configure system and security settings",
      icon: Settings,
      href: "/admin-secure/settings",
      badge: "Admin",
    },
  ];

  const stats = [
    { label: "Total Users", value: "1,247", change: "+12%" },
    { label: "Active Sessions", value: "89", change: "+5%" },
    { label: "Security Alerts", value: "3", change: "-2" },
    { label: "Failed Logins (24h)", value: "7", change: "-3" },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Admin Header */}
      <header className="bg-gray-900 text-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <LayoutDashboard className="w-8 h-8 text-green-500" />
              <div>
                <h1 className="text-xl font-bold">Admin Dashboard</h1>
                <p className="text-sm text-gray-400">Nornex AS Management</p>
              </div>
            </div>
            <Badge variant="destructive">Secure Zone</Badge>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="py-4">
                <p className="text-sm text-gray-500">{stat.label}</p>
                <div className="flex items-baseline justify-between">
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <span
                    className={`text-sm ${
                      stat.change.startsWith("+")
                        ? "text-green-600"
                        : stat.change.startsWith("-")
                        ? "text-red-600"
                        : "text-gray-500"
                    }`}
                  >
                    {stat.change}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Admin Modules */}
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Admin Modules
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {adminModules.map((module, index) => (
            <Link key={index} href={module.href}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full relative">
                {(module as typeof module & { isNew?: boolean }).isNew && (
                  <Badge className="absolute -top-2 -right-2 bg-purple-600">
                    <Sparkles className="w-3 h-3 mr-1" />
                    NEW
                  </Badge>
                )}
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <module.icon className="w-8 h-8 text-green-600" />
                    <Badge variant="secondary">{module.badge}</Badge>
                  </div>
                  <CardTitle className="text-lg">{module.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">{module.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Quick Info */}
        <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            <strong>Note:</strong> This admin area uses a secret URL path for
            additional security. All actions are logged and monitored.
          </p>
        </div>
      </main>
    </div>
  );
}
