/**
 * NORNEX AS - Metric Card Component
 * @author NORNEX Development Team
 * @version 2.0.0
 * @copyright 2025 NORNEX AS
 */

'use client';

import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: number;
  trendLabel?: string;
  color?: 'blue' | 'green' | 'yellow' | 'red' | 'purple' | 'indigo';
  isAI?: boolean;
}

const colorClasses = {
  blue: 'bg-blue-50 text-blue-600',
  green: 'bg-green-50 text-green-600',
  yellow: 'bg-yellow-50 text-yellow-600',
  red: 'bg-red-50 text-red-600',
  purple: 'bg-purple-50 text-purple-600',
  indigo: 'bg-indigo-50 text-indigo-600',
};

export function MetricCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendLabel,
  color = 'blue',
  isAI = false,
}: MetricCardProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium text-slate-500">{title}</p>
            {isAI && (
              <span className="rounded-full bg-purple-100 px-2 py-0.5 text-xs font-medium text-purple-600">
                AI
              </span>
            )}
          </div>
          <p className="mt-2 text-3xl font-bold text-slate-900">{value}</p>
          {subtitle && (
            <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
          )}
          {typeof trend === 'number' && (
            <div className="mt-2 flex items-center">
              <span
                className={cn(
                  'text-sm font-medium',
                  trend >= 0 ? 'text-green-600' : 'text-red-600'
                )}
              >
                {trend >= 0 ? '+' : ''}{trend}%
              </span>
              {trendLabel && (
                <span className="ml-1 text-sm text-slate-500">{trendLabel}</span>
              )}
            </div>
          )}
        </div>
        <div className={cn('rounded-lg p-3', colorClasses[color])}>
          <Icon size={24} />
        </div>
      </div>
    </div>
  );
}
