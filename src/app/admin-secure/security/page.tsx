"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Shield,
  AlertTriangle,
  Lock,
  Key,
  Users,
  Activity,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  defaultSecuritySettings,
  ROLE_HIERARCHY,
  type UserRole,
} from "@/lib/security";

// Mock data for demo
const mockSecurityEvents = [
  {
    id: "1",
    type: "LOGIN_FAILED",
    user: "unknown@example.com",
    ip: "192.168.1.100",
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    severity: "warning",
  },
  {
    id: "2",
    type: "ADMIN_ACCESS",
    user: "admin@nornex.no",
    ip: "10.0.0.1",
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    severity: "info",
  },
  {
    id: "3",
    type: "PASSWORD_CHANGED",
    user: "user@nornex.no",
    ip: "192.168.1.50",
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    severity: "info",
  },
  {
    id: "4",
    type: "SECURITY_ALERT",
    user: "suspicious@attacker.com",
    ip: "45.33.32.156",
    timestamp: new Date(Date.now() - 1000 * 60 * 60),
    severity: "critical",
  },
  {
    id: "5",
    type: "MFA_ENABLED",
    user: "manager@nornex.no",
    ip: "10.0.0.25",
    timestamp: new Date(Date.now() - 1000 * 60 * 120),
    severity: "success",
  },
];

const mockLockedAccounts = [
  {
    email: "test@example.com",
    lockedAt: new Date(Date.now() - 1000 * 60 * 10),
    reason: "Too many failed login attempts",
    attemptsCount: 5,
  },
];

export default function SecurityDashboard() {
  const [settings, setSettings] = useState(defaultSecuritySettings);

  const severityColors = {
    info: "bg-blue-100 text-blue-800",
    warning: "bg-yellow-100 text-yellow-800",
    critical: "bg-red-100 text-red-800",
    success: "bg-green-100 text-green-800",
  };

  const eventIcons: Record<string, typeof Shield> = {
    LOGIN_FAILED: XCircle,
    ADMIN_ACCESS: Shield,
    PASSWORD_CHANGED: Key,
    SECURITY_ALERT: AlertTriangle,
    MFA_ENABLED: CheckCircle,
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-gray-900 text-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/admin-secure">
                <Button variant="ghost" size="icon" className="text-white">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-bold">Security Dashboard</h1>
                <p className="text-sm text-gray-400">
                  Monitor and manage security settings
                </p>
              </div>
            </div>
            <Badge variant="destructive">High Security Zone</Badge>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Security Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="py-4">
              <div className="flex items-center space-x-3">
                <Shield className="w-8 h-8 text-green-600" />
                <div>
                  <p className="text-sm text-gray-500">Security Status</p>
                  <p className="text-lg font-bold text-green-600">Protected</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="py-4">
              <div className="flex items-center space-x-3">
                <Lock className="w-8 h-8 text-orange-500" />
                <div>
                  <p className="text-sm text-gray-500">Locked Accounts</p>
                  <p className="text-lg font-bold">
                    {mockLockedAccounts.length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="py-4">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="w-8 h-8 text-red-500" />
                <div>
                  <p className="text-sm text-gray-500">Active Alerts</p>
                  <p className="text-lg font-bold">1</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="py-4">
              <div className="flex items-center space-x-3">
                <Activity className="w-8 h-8 text-blue-500" />
                <div>
                  <p className="text-sm text-gray-500">Events (24h)</p>
                  <p className="text-lg font-bold">127</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Security Events */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="w-5 h-5" />
                <span>Recent Security Events</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockSecurityEvents.map((event) => {
                  const EventIcon = eventIcons[event.type] || Shield;
                  return (
                    <div
                      key={event.id}
                      className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg"
                    >
                      <EventIcon
                        className={`w-5 h-5 mt-0.5 ${
                          event.severity === "critical"
                            ? "text-red-500"
                            : event.severity === "warning"
                            ? "text-yellow-500"
                            : event.severity === "success"
                            ? "text-green-500"
                            : "text-blue-500"
                        }`}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <Badge
                            className={
                              severityColors[
                                event.severity as keyof typeof severityColors
                              ]
                            }
                          >
                            {event.type.replace(/_/g, " ")}
                          </Badge>
                          <span className="text-xs text-gray-400">
                            {new Date(event.timestamp).toLocaleTimeString()}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1 truncate">
                          {event.user}
                        </p>
                        <p className="text-xs text-gray-400">IP: {event.ip}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="w-5 h-5" />
                <span>Security Settings</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Max Login Attempts
                  </label>
                  <Input
                    type="number"
                    value={settings.maxLoginAttempts}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        maxLoginAttempts: parseInt(e.target.value),
                      })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Lockout Duration (minutes)
                  </label>
                  <Input
                    type="number"
                    value={settings.lockoutDuration}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        lockoutDuration: parseInt(e.target.value),
                      })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Session Timeout (minutes)
                  </label>
                  <Input
                    type="number"
                    value={settings.sessionTimeout}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        sessionTimeout: parseInt(e.target.value),
                      })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Minimum Password Length
                  </label>
                  <Input
                    type="number"
                    value={settings.passwordMinLength}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        passwordMinLength: parseInt(e.target.value),
                      })
                    }
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="requireMfa"
                    checked={settings.requireMfaForAdmin}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        requireMfaForAdmin: e.target.checked,
                      })
                    }
                    className="rounded border-gray-300"
                  />
                  <label htmlFor="requireMfa" className="text-sm text-gray-700">
                    Require MFA for Admin Roles
                  </label>
                </div>
                <Button className="w-full">Save Settings</Button>
              </div>
            </CardContent>
          </Card>

          {/* Locked Accounts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Lock className="w-5 h-5" />
                <span>Locked Accounts</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {mockLockedAccounts.length > 0 ? (
                <div className="space-y-4">
                  {mockLockedAccounts.map((account, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-red-50 rounded-lg"
                    >
                      <div>
                        <p className="font-medium text-gray-900">
                          {account.email}
                        </p>
                        <p className="text-sm text-gray-500">{account.reason}</p>
                        <p className="text-xs text-gray-400 flex items-center mt-1">
                          <Clock className="w-3 h-3 mr-1" />
                          Locked {new Date(account.lockedAt).toLocaleTimeString()}
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        Unlock
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">
                  No locked accounts
                </p>
              )}
            </CardContent>
          </Card>

          {/* Role Permissions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span>Role Hierarchy</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {(Object.keys(ROLE_HIERARCHY) as UserRole[])
                  .sort((a, b) => ROLE_HIERARCHY[b] - ROLE_HIERARCHY[a])
                  .map((role) => (
                    <div
                      key={role}
                      className="flex items-center justify-between p-2 bg-gray-50 rounded"
                    >
                      <div className="flex items-center space-x-2">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            ROLE_HIERARCHY[role] >= 5
                              ? "bg-red-500"
                              : ROLE_HIERARCHY[role] >= 3
                              ? "bg-orange-500"
                              : "bg-green-500"
                          }`}
                        />
                        <span className="font-medium">{role}</span>
                      </div>
                      <Badge variant="secondary">
                        Level {ROLE_HIERARCHY[role]}
                      </Badge>
                    </div>
                  ))}
              </div>
              <p className="text-xs text-gray-500 mt-4">
                Higher levels inherit all permissions from lower levels.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
