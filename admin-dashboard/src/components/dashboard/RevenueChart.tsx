/**
 * NORNEX AS - Revenue Chart Component
 * @author NORNEX Development Team
 * @version 2.0.0
 * @copyright 2025 NORNEX AS
 */

'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { formatCurrency } from '@/lib/utils';

interface RevenueChartProps {
  data: { month: string; revenue?: number; forecast?: number }[];
  showForecast?: boolean;
}

export function RevenueChart({ data, showForecast = false }: RevenueChartProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-900">
          Revenue Trend (Last 6 Months)
        </h3>
        {showForecast && (
          <span className="rounded-full bg-purple-100 px-2 py-0.5 text-xs font-medium text-purple-600">
            AI Forecast
          </span>
        )}
      </div>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis
              dataKey="month"
              stroke="#64748b"
              fontSize={12}
              tickLine={false}
            />
            <YAxis
              stroke="#64748b"
              fontSize={12}
              tickLine={false}
              tickFormatter={(value) => `${value / 1000}k`}
            />
            <Tooltip
              formatter={(value: number) => [formatCurrency(value), 'Revenue']}
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#2563eb"
              strokeWidth={2}
              dot={{ fill: '#2563eb', strokeWidth: 2 }}
              activeDot={{ r: 6 }}
              name="Actual Revenue"
            />
            {showForecast && (
              <Line
                type="monotone"
                dataKey="forecast"
                stroke="#9333ea"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ fill: '#9333ea', strokeWidth: 2 }}
                name="AI Forecast"
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
