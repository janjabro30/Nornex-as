/**
 * NORNEX AS - AI Insights Panel Component
 * @author NORNEX Development Team
 * @version 2.0.0
 * @copyright 2025 NORNEX AS
 */

'use client';

import { AlertTriangle, Lightbulb, Wrench } from 'lucide-react';
import { cn, getRiskColor } from '@/lib/utils';
import type { AnomalyAlert, BusinessInsight, PredictiveAlert } from '@/types';

interface AIInsightsPanelProps {
  churnRiskScore: number;
  anomalyAlerts: AnomalyAlert[];
  businessInsights: BusinessInsight[];
  predictiveAlerts: PredictiveAlert[];
}

export function AIInsightsPanel({
  churnRiskScore,
  anomalyAlerts,
  businessInsights,
  predictiveAlerts,
}: AIInsightsPanelProps) {
  return (
    <div className="space-y-6">
      {/* Churn Risk Score */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-lg font-semibold text-slate-900">Churn Risk Score</h3>
              <span className="rounded-full bg-purple-100 px-2 py-0.5 text-xs font-medium text-purple-600">
                AI
              </span>
            </div>
            <p className="mt-1 text-sm text-slate-500">AI-predicted customer churn probability</p>
          </div>
          <div className={cn('rounded-full px-4 py-2 text-2xl font-bold', getRiskColor(churnRiskScore))}>
            {churnRiskScore}
          </div>
        </div>
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
          <div
            className={cn(
              'h-full transition-all',
              churnRiskScore >= 70 ? 'bg-red-500' : churnRiskScore >= 40 ? 'bg-yellow-500' : 'bg-green-500'
            )}
            style={{ width: `${churnRiskScore}%` }}
          />
        </div>
      </div>

      {/* Anomaly Alerts */}
      {anomalyAlerts.length > 0 && (
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="text-yellow-500" size={20} />
            <h3 className="text-lg font-semibold text-slate-900">Anomaly Detection</h3>
            <span className="rounded-full bg-purple-100 px-2 py-0.5 text-xs font-medium text-purple-600">
              AI
            </span>
          </div>
          <div className="mt-4 space-y-3">
            {anomalyAlerts.map((alert) => (
              <div
                key={alert.id}
                className={cn(
                  'rounded-lg p-3',
                  alert.type === 'critical' ? 'bg-red-50' : alert.type === 'warning' ? 'bg-yellow-50' : 'bg-blue-50'
                )}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium text-slate-900">{alert.metric}</p>
                    <p className="text-sm text-slate-600">{alert.message}</p>
                  </div>
                  <span className={cn(
                    'rounded-full px-2 py-0.5 text-xs font-medium',
                    alert.deviation >= 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  )}>
                    {alert.deviation >= 0 ? '+' : ''}{alert.deviation}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Business Insights */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center space-x-2">
          <Lightbulb className="text-yellow-500" size={20} />
          <h3 className="text-lg font-semibold text-slate-900">Business Insights</h3>
          <span className="rounded-full bg-purple-100 px-2 py-0.5 text-xs font-medium text-purple-600">
            AI
          </span>
        </div>
        <div className="mt-4 space-y-3">
          {businessInsights.map((insight) => (
            <div key={insight.id} className="rounded-lg border border-slate-100 p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium text-slate-900">{insight.title}</p>
                  <p className="mt-1 text-sm text-slate-600">{insight.description}</p>
                </div>
                <span className={cn(
                  'rounded-full px-2 py-0.5 text-xs font-medium',
                  insight.impact === 'high' ? 'bg-red-100 text-red-700' :
                  insight.impact === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-green-100 text-green-700'
                )}>
                  {insight.impact.toUpperCase()}
                </span>
              </div>
              {insight.actionable && insight.suggestedAction && (
                <p className="mt-2 text-sm font-medium text-blue-600">
                  → {insight.suggestedAction}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Predictive Alerts */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center space-x-2">
          <Wrench className="text-blue-500" size={20} />
          <h3 className="text-lg font-semibold text-slate-900">Predictive Maintenance</h3>
          <span className="rounded-full bg-purple-100 px-2 py-0.5 text-xs font-medium text-purple-600">
            AI
          </span>
        </div>
        <div className="mt-4 space-y-3">
          {predictiveAlerts.map((alert) => (
            <div key={alert.id} className="rounded-lg border border-slate-100 p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium text-slate-900">{alert.title}</p>
                  <p className="mt-1 text-sm text-slate-600">{alert.recommendation}</p>
                  <p className="mt-1 text-xs text-slate-500">Timeframe: {alert.timeframe}</p>
                </div>
                <div className="text-right">
                  <span className="text-lg font-bold text-blue-600">
                    {Math.round(alert.probability * 100)}%
                  </span>
                  <p className="text-xs text-slate-500">probability</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
