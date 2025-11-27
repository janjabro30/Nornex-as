/**
 * NORNEX AS - Revenue Forecast Component
 * @author NORNEX Development Team
 * @version 2.0.0
 * @copyright 2025 NORNEX AS
 */

'use client';

import { TrendingUp } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

interface RevenueForecastProps {
  forecast30: number;
  forecast60: number;
  forecast90: number;
}

export function RevenueForecast({ forecast30, forecast60, forecast90 }: RevenueForecastProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <TrendingUp className="text-green-500" size={20} />
          <h3 className="text-lg font-semibold text-slate-900">Revenue Forecast</h3>
          <span className="rounded-full bg-purple-100 px-2 py-0.5 text-xs font-medium text-purple-600">
            AI
          </span>
        </div>
      </div>
      
      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="rounded-lg bg-blue-50 p-4 text-center">
          <p className="text-sm font-medium text-blue-600">30 Days</p>
          <p className="mt-2 text-2xl font-bold text-blue-700">
            {formatCurrency(forecast30)}
          </p>
        </div>
        <div className="rounded-lg bg-green-50 p-4 text-center">
          <p className="text-sm font-medium text-green-600">60 Days</p>
          <p className="mt-2 text-2xl font-bold text-green-700">
            {formatCurrency(forecast60)}
          </p>
        </div>
        <div className="rounded-lg bg-purple-50 p-4 text-center">
          <p className="text-sm font-medium text-purple-600">90 Days</p>
          <p className="mt-2 text-2xl font-bold text-purple-700">
            {formatCurrency(forecast90)}
          </p>
        </div>
      </div>
      
      <p className="mt-4 text-center text-xs text-slate-500">
        Projections based on ML models analyzing historical data
      </p>
    </div>
  );
}
