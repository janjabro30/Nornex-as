/**
 * NORNEX AS - Admin Dashboard Home Page
 * @author NORNEX Development Team
 * @version 2.0.0
 * @copyright 2025 NORNEX AS
 */

'use client';

import { useEffect, useState } from 'react';
import {
  Users,
  FileCheck,
  DollarSign,
  ShoppingCart,
  Wrench,
  FileText,
  Calendar,
  TrendingUp,
  Heart,
} from 'lucide-react';
import { Sidebar, Header } from '@/components/layout';
import {
  MetricCard,
  RevenueChart,
  OrdersChart,
  AIInsightsPanel,
  RevenueForecast,
} from '@/components/dashboard';
import { useAppStore } from '@/lib/store';
import { t } from '@/lib/translations';
import { calculateAIMetrics } from '@/lib/ai-service';
import { cn, formatCurrency } from '@/lib/utils';
import type { AIMetrics } from '@/types';

const revenueData = [
  { month: 'Jul', revenue: 45000, forecast: 46000 },
  { month: 'Aug', revenue: 52000, forecast: 51000 },
  { month: 'Sep', revenue: 48000, forecast: 50000 },
  { month: 'Oct', revenue: 61000, forecast: 58000 },
  { month: 'Nov', revenue: 55000, forecast: 57000 },
  { month: 'Dec', revenue: 67000, forecast: 65000 },
  { month: 'Jan', revenue: undefined, forecast: 72000 },
  { month: 'Feb', revenue: undefined, forecast: 78000 },
];

const ordersData = [
  { day: 'Mon', orders: 12 },
  { day: 'Tue', orders: 19 },
  { day: 'Wed', orders: 15 },
  { day: 'Thu', orders: 22 },
  { day: 'Fri', orders: 18 },
  { day: 'Sat', orders: 8 },
  { day: 'Sun', orders: 5 },
];

export default function Dashboard() {
  const { sidebarOpen, language, metrics } = useAppStore();
  const [aiMetrics, setAiMetrics] = useState<AIMetrics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAIMetrics = async () => {
      try {
        const result = await calculateAIMetrics({
          revenue: revenueData.filter(d => d.revenue).map(d => d.revenue as number),
          orders: ordersData.map(d => d.orders),
          customers: [9],
        });
        setAiMetrics(result);
      } catch (error) {
        console.error('Failed to calculate AI metrics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAIMetrics();
  }, []);

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
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-slate-900">
              {t('nav.dashboard', language)}
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Welcome to NORNEX AS Admin Dashboard - AI-Powered Business Intelligence
            </p>
          </div>

          {/* Original Metrics Grid */}
          <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <MetricCard
              title={t('metrics.totalCustomers', language)}
              value={metrics.totalCustomers}
              icon={Users}
              color="blue"
            />
            <MetricCard
              title={t('metrics.activeContracts', language)}
              value={metrics.activeContracts}
              icon={FileCheck}
              color="green"
            />
            <MetricCard
              title={t('metrics.monthlyRevenue', language)}
              value={`${metrics.monthlyRevenue}k kr`}
              icon={DollarSign}
              color="indigo"
            />
            <MetricCard
              title={t('metrics.newOrders', language)}
              value={metrics.newOrders}
              icon={ShoppingCart}
              color="purple"
            />
          </div>

          <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <MetricCard
              title={t('metrics.pendingRepairs', language)}
              value={metrics.pendingRepairs}
              icon={Wrench}
              color="yellow"
            />
            <MetricCard
              title={t('metrics.pendingInvoices', language)}
              value={metrics.pendingInvoices}
              icon={FileText}
              color="red"
            />
            <MetricCard
              title={t('metrics.pendingBookings', language)}
              value={metrics.pendingBookings}
              icon={Calendar}
              color="blue"
            />
            <MetricCard
              title={t('metrics.growthAds', language)}
              value={`+${metrics.growthAds}%`}
              icon={TrendingUp}
              trend={metrics.growthAds}
              trendLabel="vs last month"
              color="green"
            />
          </div>

          {/* AI-Powered Metrics */}
          {aiMetrics && !loading && (
            <>
              <div className="mb-6">
                <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-900">
                  <span className="rounded-full bg-purple-100 p-1">
                    <Heart className="h-4 w-4 text-purple-600" />
                  </span>
                  AI-Powered Insights
                </h2>
              </div>

              <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
                <MetricCard
                  title={t('ai.customerLifetimeValue', language)}
                  value={formatCurrency(aiMetrics.customerLifetimeValue)}
                  subtitle="AI calculated"
                  icon={Users}
                  color="purple"
                  isAI
                />
                <div className="lg:col-span-2">
                  <RevenueForecast
                    forecast30={aiMetrics.revenueForecast30}
                    forecast60={aiMetrics.revenueForecast60}
                    forecast90={aiMetrics.revenueForecast90}
                  />
                </div>
              </div>
            </>
          )}

          {/* Charts */}
          <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <RevenueChart data={revenueData} showForecast />
            <OrdersChart data={ordersData} />
          </div>

          {/* AI Insights Panel */}
          {aiMetrics && !loading && (
            <AIInsightsPanel
              churnRiskScore={aiMetrics.churnRiskScore}
              anomalyAlerts={aiMetrics.anomalyAlerts}
              businessInsights={aiMetrics.businessInsights}
              predictiveAlerts={aiMetrics.predictiveAlerts}
            />
          )}

          {/* Footer */}
          <footer className="mt-12 border-t border-slate-200 pt-6 text-center text-sm text-slate-500">
            <p>© 2025 NORNEX AS - All rights reserved</p>
            <p className="mt-1">v2.0.0 | Admin Dashboard</p>
          </footer>
        </div>
      </main>
    </div>
  );
}
