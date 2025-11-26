/**
 * NORNEX AS - Security Page
 * @author NORNEX Development Team
 * @version 2.0.0
 * @copyright 2025 NORNEX AS
 */

'use client';

import { useState } from 'react';
import {
  Shield,
  Key,
  Smartphone,
  Clock,
  AlertTriangle,
  CheckCircle,
  Lock,
  UserCheck,
  FileCheck,
  Database,
} from 'lucide-react';
import { Sidebar, Header } from '@/components/layout';
import { useAppStore } from '@/lib/store';
import { cn } from '@/lib/utils';
import { t } from '@/lib/translations';

interface SecurityFeature {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  category: 'auth' | 'data' | 'compliance';
}

const securityFeatures: SecurityFeature[] = [
  {
    id: 'jwt',
    name: 'JWT Token Authentication',
    description: 'Secure token-based authentication for API access',
    enabled: true,
    icon: Key,
    category: 'auth',
  },
  {
    id: 'rbac',
    name: 'Role-Based Access Control (RBAC)',
    description: 'Granular permissions based on user roles',
    enabled: true,
    icon: UserCheck,
    category: 'auth',
  },
  {
    id: '2fa',
    name: 'Two-Factor Authentication (2FA)',
    description: 'Additional security layer with TOTP codes',
    enabled: true,
    icon: Smartphone,
    category: 'auth',
  },
  {
    id: 'bcrypt',
    name: 'Password Hashing (bcrypt)',
    description: '12 rounds of bcrypt for secure password storage',
    enabled: true,
    icon: Lock,
    category: 'data',
  },
  {
    id: 'sql-injection',
    name: 'SQL Injection Prevention',
    description: 'Parameterized queries and input sanitization',
    enabled: true,
    icon: Database,
    category: 'data',
  },
  {
    id: 'xss',
    name: 'XSS Protection',
    description: 'Cross-site scripting prevention measures',
    enabled: true,
    icon: Shield,
    category: 'data',
  },
  {
    id: 'csrf',
    name: 'CSRF Tokens',
    description: 'Cross-site request forgery protection',
    enabled: true,
    icon: FileCheck,
    category: 'data',
  },
  {
    id: 'rate-limit',
    name: 'Rate Limiting',
    description: 'API request throttling to prevent abuse',
    enabled: true,
    icon: Clock,
    category: 'data',
  },
  {
    id: 'gdpr',
    name: 'GDPR Compliance',
    description: 'EU General Data Protection Regulation compliance',
    enabled: true,
    icon: Shield,
    category: 'compliance',
  },
  {
    id: 'personopplysningsloven',
    name: 'Personopplysningsloven',
    description: 'Norwegian Personal Data Act compliance',
    enabled: true,
    icon: Shield,
    category: 'compliance',
  },
  {
    id: 'data-retention',
    name: 'Data Retention Policies',
    description: 'Automated data lifecycle management',
    enabled: true,
    icon: Database,
    category: 'compliance',
  },
];

export default function SecurityPage() {
  const { sidebarOpen, language } = useAppStore();
  const [features, setFeatures] = useState(securityFeatures);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  // toggleFeature is available for future feature toggling functionality
  const _toggleFeature = (id: string) => {
    setFeatures(prev =>
      prev.map(f => (f.id === id ? { ...f, enabled: !f.enabled } : f))
    );
  };
  void _toggleFeature; // Prevent unused warning

  const handlePasswordChange = () => {
    setPasswordError('');
    setPasswordSuccess(false);

    if (!passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
      setPasswordError('All fields are required');
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError('New passwords do not match');
      return;
    }

    if (passwordForm.newPassword.length < 8) {
      setPasswordError('Password must be at least 8 characters');
      return;
    }

    // Simulate password change
    setPasswordSuccess(true);
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const authFeatures = features.filter(f => f.category === 'auth');
  const dataFeatures = features.filter(f => f.category === 'data');
  const complianceFeatures = features.filter(f => f.category === 'compliance');

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar />
      <Header />

      <main
        className={cn(
          'min-h-screen pt-16 transition-all duration-300',
          sidebarOpen ? 'ml-64' : 'ml-20'
        )}
      >
        <div className="p-6">
          <div className="mb-8">
            <h1 className="flex items-center gap-2 text-2xl font-bold text-slate-900">
              <Shield className="text-green-600" />
              {t('nav.security', language)}
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Comprehensive security audit and configuration
            </p>
          </div>

          {/* Security Score */}
          <div className="mb-8 rounded-xl border border-green-200 bg-green-50 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-green-900">Security Score</h2>
                <p className="text-sm text-green-700">All security measures are active</p>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={24} className="text-green-600" />
                <span className="text-3xl font-bold text-green-600">100%</span>
              </div>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Change Password */}
            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-900">
                <Key size={20} className="text-blue-600" />
                {t('security.passwordChange', language)}
              </h2>
              
              <div className="space-y-4">
                {passwordError && (
                  <div className="flex items-center gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-700">
                    <AlertTriangle size={16} />
                    {passwordError}
                  </div>
                )}
                {passwordSuccess && (
                  <div className="flex items-center gap-2 rounded-lg bg-green-50 p-3 text-sm text-green-700">
                    <CheckCircle size={16} />
                    Password changed successfully!
                  </div>
                )}
                
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">Current Password</label>
                  <input
                    type="password"
                    value={passwordForm.currentPassword}
                    onChange={(e) => setPasswordForm(prev => ({ ...prev, currentPassword: e.target.value }))}
                    className="w-full rounded-lg border border-slate-200 p-2 text-sm focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">New Password</label>
                  <input
                    type="password"
                    value={passwordForm.newPassword}
                    onChange={(e) => setPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
                    className="w-full rounded-lg border border-slate-200 p-2 text-sm focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">Confirm New Password</label>
                  <input
                    type="password"
                    value={passwordForm.confirmPassword}
                    onChange={(e) => setPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    className="w-full rounded-lg border border-slate-200 p-2 text-sm focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <button
                  onClick={handlePasswordChange}
                  className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                >
                  Change Password
                </button>
              </div>
            </div>

            {/* 2FA Setup */}
            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-900">
                <Smartphone size={20} className="text-purple-600" />
                {t('security.twoFactor', language)}
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between rounded-lg bg-green-50 p-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle size={20} className="text-green-600" />
                    <span className="font-medium text-green-700">2FA is enabled</span>
                  </div>
                </div>
                
                <p className="text-sm text-slate-600">
                  Two-factor authentication adds an extra layer of security to your account.
                  Use an authenticator app like Google Authenticator or Authy.
                </p>

                <button className="w-full rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50">
                  Regenerate Recovery Codes
                </button>
              </div>
            </div>

            {/* Authentication & Authorization */}
            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <h2 className="mb-4 text-lg font-semibold text-slate-900">Authentication & Authorization</h2>
              <div className="space-y-3">
                {authFeatures.map((feature) => {
                  const Icon = feature.icon;
                  return (
                    <div
                      key={feature.id}
                      className="flex items-center justify-between rounded-lg border border-slate-100 p-3"
                    >
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          'rounded-lg p-2',
                          feature.enabled ? 'bg-green-100' : 'bg-slate-100'
                        )}>
                          <Icon size={18} className={feature.enabled ? 'text-green-600' : 'text-slate-400'} />
                        </div>
                        <div>
                          <p className="font-medium text-slate-900">{feature.name}</p>
                          <p className="text-xs text-slate-500">{feature.description}</p>
                        </div>
                      </div>
                      <div className={cn(
                        'rounded-full px-2 py-0.5 text-xs font-medium',
                        feature.enabled ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'
                      )}>
                        {feature.enabled ? 'Active' : 'Inactive'}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Data Security */}
            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <h2 className="mb-4 text-lg font-semibold text-slate-900">Data Security</h2>
              <div className="space-y-3">
                {dataFeatures.map((feature) => {
                  const Icon = feature.icon;
                  return (
                    <div
                      key={feature.id}
                      className="flex items-center justify-between rounded-lg border border-slate-100 p-3"
                    >
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          'rounded-lg p-2',
                          feature.enabled ? 'bg-green-100' : 'bg-slate-100'
                        )}>
                          <Icon size={18} className={feature.enabled ? 'text-green-600' : 'text-slate-400'} />
                        </div>
                        <div>
                          <p className="font-medium text-slate-900">{feature.name}</p>
                          <p className="text-xs text-slate-500">{feature.description}</p>
                        </div>
                      </div>
                      <div className={cn(
                        'rounded-full px-2 py-0.5 text-xs font-medium',
                        feature.enabled ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'
                      )}>
                        {feature.enabled ? 'Active' : 'Inactive'}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Norwegian Compliance */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 lg:col-span-2">
              <h2 className="mb-4 text-lg font-semibold text-slate-900">Norwegian & EU Compliance</h2>
              <div className="grid gap-3 md:grid-cols-3">
                {complianceFeatures.map((feature) => {
                  const Icon = feature.icon;
                  return (
                    <div
                      key={feature.id}
                      className="flex items-center gap-3 rounded-lg border border-slate-100 p-4"
                    >
                      <div className="rounded-lg bg-green-100 p-2">
                        <Icon size={20} className="text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-900">{feature.name}</p>
                        <p className="text-xs text-slate-500">{feature.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <footer className="mt-12 border-t border-slate-200 pt-6 text-center text-sm text-slate-500">
            <p>© 2025 NORNEX AS - All rights reserved</p>
          </footer>
        </div>
      </main>
    </div>
  );
}
