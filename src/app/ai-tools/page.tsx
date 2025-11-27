/**
 * NORNEX AS - AI Tools Page
 * @author NORNEX Development Team
 * @version 2.0.0
 * @copyright 2025 NORNEX AS
 */

'use client';

import { useState } from 'react';
import {
  Bot,
  FileText,
  Users,
  Wrench,
  Mail,
  Sparkles,
  Loader2,
} from 'lucide-react';
import { Sidebar, Header } from '@/components/layout';
import { useAppStore } from '@/lib/store';
import { cn } from '@/lib/utils';
import { t } from '@/lib/translations';

interface AITool {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  endpoint: string;
}

const aiTools: AITool[] = [
  {
    id: 'categorize-order',
    name: 'Categorize Order',
    description: 'Auto-categorize incoming orders based on content',
    icon: FileText,
    endpoint: '/api/ai/categorize-order',
  },
  {
    id: 'assign-task',
    name: 'Smart Task Assignment',
    description: 'Assign tasks to the best team member using AI',
    icon: Users,
    endpoint: '/api/ai/assign-task',
  },
  {
    id: 'schedule-repair',
    name: 'Schedule Repair',
    description: 'Predictive repair scheduling optimization',
    icon: Wrench,
    endpoint: '/api/ai/schedule-repair',
  },
  {
    id: 'generate-invoice',
    name: 'Generate Invoice',
    description: 'Automated invoice generation with terms',
    icon: FileText,
    endpoint: '/api/ai/generate-invoice',
  },
  {
    id: 'suggest-response',
    name: 'Email Response',
    description: 'Smart email response suggestions',
    icon: Mail,
    endpoint: '/api/ai/suggest-response',
  },
];

export default function AIToolsPage() {
  const { sidebarOpen, language } = useAppStore();
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [input, setInput] = useState('');
  const [result, setResult] = useState<object | null>(null);
  const [loading, setLoading] = useState(false);

  const handleToolRun = async (tool: AITool) => {
    if (!input.trim()) return;
    
    setLoading(true);
    setSelectedTool(tool.id);
    
    try {
      const body: Record<string, unknown> = {};
      
      switch (tool.id) {
        case 'categorize-order':
          body.orderContent = input;
          break;
        case 'assign-task':
          body.taskDescription = input;
          body.teamMembers = ['John', 'Jane', 'Bob', 'Alice'];
          break;
        case 'schedule-repair':
          body.repairDetails = input;
          break;
        case 'generate-invoice':
          body.orderDetails = {
            items: input.split(',').map(s => s.trim()),
            customerId: 'CUST-001',
          };
          break;
        case 'suggest-response':
          body.incomingEmail = input;
          body.context = 'Customer support inquiry';
          break;
      }

      const response = await fetch(tool.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('AI tool error:', error);
      setResult({ error: 'Failed to run AI tool' });
    } finally {
      setLoading(false);
    }
  };

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
              <Bot className="text-purple-600" />
              {t('nav.aiTools', language)}
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              AI-powered automation tools for workflow optimization
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* AI Tools List */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-slate-900">Available Tools</h2>
              {aiTools.map((tool) => {
                const Icon = tool.icon;
                return (
                  <div
                    key={tool.id}
                    className={cn(
                      'cursor-pointer rounded-xl border bg-white p-4 transition-all hover:border-purple-500 hover:shadow-md',
                      selectedTool === tool.id ? 'border-purple-500 ring-2 ring-purple-200' : 'border-slate-200'
                    )}
                    onClick={() => setSelectedTool(tool.id)}
                  >
                    <div className="flex items-start gap-4">
                      <div className="rounded-lg bg-purple-100 p-2">
                        <Icon size={24} className="text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-slate-900">{tool.name}</h3>
                        <p className="text-sm text-slate-500">{tool.description}</p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToolRun(tool);
                        }}
                        disabled={loading || !input.trim()}
                        className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-purple-700 disabled:opacity-50"
                      >
                        {loading && selectedTool === tool.id ? (
                          <Loader2 size={16} className="animate-spin" />
                        ) : (
                          'Run'
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Input & Output */}
            <div className="space-y-4">
              <div className="rounded-xl border border-slate-200 bg-white p-6">
                <h2 className="mb-4 text-lg font-semibold text-slate-900">Input</h2>
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Enter your input here... For invoice generation, separate items with commas."
                  className="h-32 w-full rounded-lg border border-slate-200 p-3 text-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                />
              </div>

              {result && (
                <div className="rounded-xl border border-slate-200 bg-white p-6">
                  <div className="mb-4 flex items-center gap-2">
                    <Sparkles className="text-purple-600" size={20} />
                    <h2 className="text-lg font-semibold text-slate-900">AI Result</h2>
                  </div>
                  <pre className="overflow-auto rounded-lg bg-slate-50 p-4 text-sm text-slate-700">
                    {JSON.stringify(result, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          </div>

          {/* AI Configuration */}
          <div className="mt-8 rounded-xl border border-slate-200 bg-white p-6">
            <h2 className="mb-4 text-lg font-semibold text-slate-900">AI Configuration</h2>
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Provider</label>
                <select className="w-full rounded-lg border border-slate-200 p-2 text-sm focus:border-purple-500 focus:outline-none">
                  <option value="free">Free (HuggingFace)</option>
                  <option value="openai">OpenAI (GPT-4)</option>
                  <option value="google">Google Gemini</option>
                  <option value="anthropic">Anthropic Claude</option>
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Language</label>
                <select className="w-full rounded-lg border border-slate-200 p-2 text-sm focus:border-purple-500 focus:outline-none">
                  <option value="no">Norwegian</option>
                  <option value="en">English</option>
                  <option value="both">Both</option>
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">API Key (Optional)</label>
                <input
                  type="password"
                  placeholder="Enter API key for premium providers"
                  className="w-full rounded-lg border border-slate-200 p-2 text-sm focus:border-purple-500 focus:outline-none"
                />
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
