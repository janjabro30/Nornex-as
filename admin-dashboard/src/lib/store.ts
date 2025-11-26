/**
 * NORNEX AS - State Management
 * @author NORNEX Development Team
 * @version 2.0.0
 * @copyright 2025 NORNEX AS
 */

import { create } from 'zustand';
import type { User, AIConfig, DashboardMetrics, AIMetrics, Language } from '@/types';
import { METRICS_DEFAULTS } from './constants';

interface AppState {
  language: Language;
  setLanguage: (lang: Language) => void;
  
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  
  user: User | null;
  setUser: (user: User | null) => void;
  
  aiConfig: AIConfig;
  setAIConfig: (config: Partial<AIConfig>) => void;
  
  metrics: DashboardMetrics;
  setMetrics: (metrics: Partial<DashboardMetrics>) => void;
  
  aiMetrics: AIMetrics | null;
  setAIMetrics: (metrics: AIMetrics | null) => void;
  
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
  
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  removeNotification: (id: string) => void;
}

interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration?: number;
}

export const useAppStore = create<AppState>((set) => ({
  language: 'en',
  setLanguage: (language) => set({ language }),
  
  sidebarOpen: true,
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  
  user: null,
  setUser: (user) => set({ user }),
  
  aiConfig: {
    provider: 'free',
    model: 'microsoft/DialoGPT-large',
    language: 'no',
  },
  setAIConfig: (config) => set((state) => ({ 
    aiConfig: { ...state.aiConfig, ...config } 
  })),
  
  metrics: METRICS_DEFAULTS,
  setMetrics: (metrics) => set((state) => ({ 
    metrics: { ...state.metrics, ...metrics } 
  })),
  
  aiMetrics: null,
  setAIMetrics: (aiMetrics) => set({ aiMetrics }),
  
  isLoading: false,
  setLoading: (isLoading) => set({ isLoading }),
  
  notifications: [],
  addNotification: (notification) => set((state) => ({
    notifications: [
      ...state.notifications,
      { ...notification, id: `${Date.now()}-${Math.random()}` },
    ],
  })),
  removeNotification: (id) => set((state) => ({
    notifications: state.notifications.filter((n) => n.id !== id),
  })),
}));
