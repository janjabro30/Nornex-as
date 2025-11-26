import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  CustomerUser,
  AccountType,
  Address,
  PortalNotification,
  PortalSession,
} from '@/types/portal';

interface AuthState {
  // User state
  user: CustomerUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  // Actions
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (userData: RegisterData) => Promise<boolean>;
  setUser: (user: CustomerUser | null) => void;
  updateUser: (updates: Partial<CustomerUser>) => void;

  // Address management
  addAddress: (address: Address) => void;
  updateAddress: (id: string, updates: Partial<Address>) => void;
  removeAddress: (id: string) => void;
  setDefaultAddress: (id: string, type: 'shipping' | 'billing') => void;

  // Notifications
  notifications: PortalNotification[];
  unreadCount: number;
  addNotification: (notification: PortalNotification) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  removeNotification: (id: string) => void;

  // Sessions
  sessions: PortalSession[];
  setSessions: (sessions: PortalSession[]) => void;
  terminateSession: (id: string) => void;

  // Security
  mfaEnabled: boolean;
  setMfaEnabled: (enabled: boolean) => void;
  pendingPasswordChange: boolean;
  setPendingPasswordChange: (pending: boolean) => void;
  passwordChangePIN: string | null;
  setPasswordChangePIN: (pin: string | null) => void;
}

interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  accountType: AccountType;
  companyName?: string;
  orgNumber?: string;
  vatNumber?: string;
  industry?: string;
}

// Mock user data for demo
const mockPrivateUser: CustomerUser = {
  id: 'user-1',
  email: 'privat@eksempel.no',
  firstName: 'Ola',
  lastName: 'Nordmann',
  phone: '+47 912 34 567',
  accountType: 'private',
  isAuthenticated: true,
  addresses: [
    {
      id: 'addr-1',
      type: 'shipping',
      label: 'Hjemmeadresse',
      street: 'Storgata 1',
      city: 'Oslo',
      postalCode: '0001',
      country: 'Norge',
      isDefault: true,
    },
  ],
  mfaEnabled: false,
  createdAt: new Date('2024-01-15'),
  lastLoginAt: new Date(),
};

const mockCompanyUser: CustomerUser = {
  id: 'user-2',
  email: 'kontakt@bedrift.no',
  firstName: 'Kari',
  lastName: 'Bedriftsen',
  phone: '+47 987 65 432',
  accountType: 'company',
  isAuthenticated: true,
  addresses: [
    {
      id: 'addr-2',
      type: 'billing',
      label: 'Fakturaadresse',
      street: 'Næringsveien 10',
      city: 'Bergen',
      postalCode: '5020',
      country: 'Norge',
      isDefault: true,
    },
    {
      id: 'addr-3',
      type: 'shipping',
      label: 'Lageradresse',
      street: 'Industriveien 5',
      city: 'Bergen',
      postalCode: '5021',
      country: 'Norge',
      isDefault: true,
    },
  ],
  companyInfo: {
    companyName: 'Bedrift AS',
    orgNumber: '123456789',
    vatNumber: 'NO123456789MVA',
    industry: 'IT-tjenester',
    address: {
      id: 'addr-4',
      type: 'billing',
      label: 'Hovedkontor',
      street: 'Næringsveien 10',
      city: 'Bergen',
      postalCode: '5020',
      country: 'Norge',
      isDefault: true,
    },
    contactPerson: 'Kari Bedriftsen',
    departments: [
      { id: 'dept-1', name: 'IT-avdeling', employeeCount: 15, budget: 500000 },
      { id: 'dept-2', name: 'Salg', employeeCount: 8, budget: 200000 },
      { id: 'dept-3', name: 'Administrasjon', employeeCount: 5, budget: 100000 },
    ],
  },
  mfaEnabled: true,
  createdAt: new Date('2023-06-01'),
  lastLoginAt: new Date(),
};

// Mock notifications
const mockNotifications: PortalNotification[] = [
  {
    id: 'notif-1',
    type: 'ORDER',
    title: 'Ordre sendt',
    message: 'Din ordre #NOR-ABC123 er sendt og forventes å ankomme innen 2-3 dager.',
    isRead: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 30), // 30 min ago
    link: '/my-portal/orders/NOR-ABC123',
  },
  {
    id: 'notif-2',
    type: 'REPAIR',
    title: 'Reparasjon fullført',
    message: 'Reparasjonen av din Dell Latitude er fullført og klar for henting.',
    isRead: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    link: '/my-portal/repairs/REP-001',
  },
  {
    id: 'notif-3',
    type: 'INVOICE',
    title: 'Ny faktura',
    message: 'Faktura #2024-0089 på kr 5,499 er tilgjengelig for nedlasting.',
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    link: '/my-portal/invoices',
  },
];

// Mock sessions
const mockSessions: PortalSession[] = [
  {
    id: 'sess-1',
    deviceInfo: 'Chrome på Windows 10',
    location: 'Oslo, Norge',
    ipAddress: '85.164.xxx.xxx',
    lastActive: new Date(),
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
    isCurrent: true,
  },
  {
    id: 'sess-2',
    deviceInfo: 'Safari på iPhone',
    location: 'Bergen, Norge',
    ipAddress: '84.212.xxx.xxx',
    lastActive: new Date(Date.now() - 1000 * 60 * 60 * 24),
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48),
    isCurrent: false,
  },
];

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      notifications: [],
      unreadCount: 0,
      sessions: [],
      mfaEnabled: false,
      pendingPasswordChange: false,
      passwordChangePIN: null,

      login: async (email: string, _password: string) => {
        set({ isLoading: true });

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Demo: Check email to determine account type
        let user: CustomerUser;
        if (email.includes('bedrift') || email.includes('company')) {
          user = { ...mockCompanyUser, email };
        } else {
          user = { ...mockPrivateUser, email };
        }

        set({
          user,
          isAuthenticated: true,
          isLoading: false,
          notifications: mockNotifications,
          unreadCount: mockNotifications.filter((n) => !n.isRead).length,
          sessions: mockSessions,
          mfaEnabled: user.mfaEnabled,
        });

        return true;
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          notifications: [],
          unreadCount: 0,
          sessions: [],
          mfaEnabled: false,
          pendingPasswordChange: false,
          passwordChangePIN: null,
        });
      },

      register: async (userData: RegisterData) => {
        set({ isLoading: true });

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500));

        const newUser: CustomerUser = {
          id: `user-${Date.now()}`,
          email: userData.email,
          firstName: userData.firstName,
          lastName: userData.lastName,
          phone: userData.phone,
          accountType: userData.accountType,
          isAuthenticated: true,
          addresses: [],
          mfaEnabled: false,
          createdAt: new Date(),
          lastLoginAt: new Date(),
          ...(userData.accountType === 'company' && userData.companyName
            ? {
                companyInfo: {
                  companyName: userData.companyName,
                  orgNumber: userData.orgNumber || '',
                  vatNumber: userData.vatNumber,
                  industry: userData.industry,
                  address: {
                    id: `addr-${Date.now()}`,
                    type: 'billing' as const,
                    label: 'Hovedkontor',
                    street: '',
                    city: '',
                    postalCode: '',
                    country: 'Norge',
                    isDefault: true,
                  },
                  contactPerson: `${userData.firstName} ${userData.lastName}`,
                  departments: [],
                },
              }
            : {}),
        };

        set({
          user: newUser,
          isAuthenticated: true,
          isLoading: false,
        });

        return true;
      },

      setUser: (user) => set({ user, isAuthenticated: !!user }),

      updateUser: (updates) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null,
        })),

      addAddress: (address) =>
        set((state) => ({
          user: state.user
            ? { ...state.user, addresses: [...state.user.addresses, address] }
            : null,
        })),

      updateAddress: (id, updates) =>
        set((state) => ({
          user: state.user
            ? {
                ...state.user,
                addresses: state.user.addresses.map((addr) =>
                  addr.id === id ? { ...addr, ...updates } : addr
                ),
              }
            : null,
        })),

      removeAddress: (id) =>
        set((state) => ({
          user: state.user
            ? {
                ...state.user,
                addresses: state.user.addresses.filter((addr) => addr.id !== id),
              }
            : null,
        })),

      setDefaultAddress: (id, type) =>
        set((state) => ({
          user: state.user
            ? {
                ...state.user,
                addresses: state.user.addresses.map((addr) => ({
                  ...addr,
                  isDefault: addr.type === type ? addr.id === id : addr.isDefault,
                })),
              }
            : null,
        })),

      addNotification: (notification) =>
        set((state) => ({
          notifications: [notification, ...state.notifications],
          unreadCount: state.unreadCount + (notification.isRead ? 0 : 1),
        })),

      markNotificationRead: (id) =>
        set((state) => {
          const notification = state.notifications.find((n) => n.id === id);
          if (!notification || notification.isRead) return state;
          return {
            notifications: state.notifications.map((n) =>
              n.id === id ? { ...n, isRead: true } : n
            ),
            unreadCount: Math.max(0, state.unreadCount - 1),
          };
        }),

      markAllNotificationsRead: () =>
        set((state) => ({
          notifications: state.notifications.map((n) => ({ ...n, isRead: true })),
          unreadCount: 0,
        })),

      removeNotification: (id) =>
        set((state) => {
          const notification = state.notifications.find((n) => n.id === id);
          return {
            notifications: state.notifications.filter((n) => n.id !== id),
            unreadCount: notification && !notification.isRead
              ? Math.max(0, state.unreadCount - 1)
              : state.unreadCount,
          };
        }),

      setSessions: (sessions) => set({ sessions }),

      terminateSession: (id) =>
        set((state) => ({
          sessions: state.sessions.filter((s) => s.id !== id),
        })),

      setMfaEnabled: (enabled) =>
        set((state) => ({
          mfaEnabled: enabled,
          user: state.user ? { ...state.user, mfaEnabled: enabled } : null,
        })),

      setPendingPasswordChange: (pending) => set({ pendingPasswordChange: pending }),

      setPasswordChangePIN: (pin) => set({ passwordChangePIN: pin }),
    }),
    {
      name: 'nornex-auth',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        mfaEnabled: state.mfaEnabled,
      }),
    }
  )
);
