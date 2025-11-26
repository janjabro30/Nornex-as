// Portal Types for Customer Dashboards

export type AccountType = 'private' | 'company';

export interface Address {
  id: string;
  type: 'shipping' | 'billing';
  label: string;
  street: string;
  city: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
}

export interface Department {
  id: string;
  name: string;
  manager?: string;
  budget?: number;
  employeeCount: number;
}

export interface CompanyInfo {
  companyName: string;
  orgNumber: string;
  vatNumber?: string;
  industry?: string;
  address: Address;
  contactPerson: string;
  departments: Department[];
}

export interface CustomerUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  accountType: AccountType;
  isAuthenticated: boolean;
  addresses: Address[];
  companyInfo?: CompanyInfo;
  mfaEnabled: boolean;
  createdAt: Date;
  lastLoginAt?: Date;
}

// Order Related Types
export interface PortalOrder {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
  items: PortalOrderItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  trackingNumber?: string;
  estimatedDelivery?: Date;
  department?: string;
}

export type OrderStatus =
  | 'PENDING'
  | 'CONFIRMED'
  | 'PROCESSING'
  | 'SHIPPED'
  | 'DELIVERED'
  | 'CANCELLED'
  | 'REFUNDED';

export interface PortalOrderItem {
  id: string;
  productName: string;
  quantity: number;
  price: number;
  image?: string;
}

// Repair Related Types
export interface PortalRepair {
  id: string;
  ticketNumber: string;
  deviceType: string;
  deviceBrand: string;
  deviceModel: string;
  status: RepairStatus;
  createdAt: Date;
  updatedAt: Date;
  estimatedCost?: number;
  finalCost?: number;
  description: string;
  technicianNotes?: string;
  parts?: RepairPart[];
  laborHours?: number;
  photos?: string[];
  completedAt?: Date;
  department?: string;
}

export type RepairStatus =
  | 'RECEIVED'
  | 'DIAGNOSING'
  | 'AWAITING_APPROVAL'
  | 'AWAITING_PARTS'
  | 'IN_PROGRESS'
  | 'TESTING'
  | 'COMPLETED'
  | 'READY_FOR_PICKUP'
  | 'DELIVERED'
  | 'CANCELLED';

export interface RepairPart {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

// Trade-in Related Types
export interface PortalTradeIn {
  id: string;
  requestNumber: string;
  deviceType: string;
  brand: string;
  model: string;
  condition: DeviceCondition;
  status: TradeInStatus;
  estimatedValue?: number;
  finalValue?: number;
  createdAt: Date;
  updatedAt: Date;
}

export type DeviceCondition =
  | 'EXCELLENT'
  | 'GOOD'
  | 'FAIR'
  | 'POOR'
  | 'BROKEN';

export type TradeInStatus =
  | 'QUOTE_REQUESTED'
  | 'QUOTE_SENT'
  | 'ACCEPTED'
  | 'DEVICE_RECEIVED'
  | 'INSPECTED'
  | 'PAYMENT_SENT'
  | 'COMPLETED'
  | 'REJECTED'
  | 'CANCELLED';

// Invoice Types
export interface PortalInvoice {
  id: string;
  invoiceNumber: string;
  orderId?: string;
  repairId?: string;
  amount: number;
  tax: number;
  total: number;
  status: InvoiceStatus;
  dueDate: Date;
  paidAt?: Date;
  createdAt: Date;
  downloadUrl?: string;
}

export type InvoiceStatus = 'PENDING' | 'PAID' | 'OVERDUE' | 'CANCELLED';

// Support Ticket Types
export interface PortalTicket {
  id: string;
  ticketNumber: string;
  subject: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  category: string;
  createdAt: Date;
  updatedAt: Date;
  messages: TicketMessage[];
}

export type TicketStatus = 'OPEN' | 'IN_PROGRESS' | 'AWAITING_RESPONSE' | 'RESOLVED' | 'CLOSED';
export type TicketPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';

export interface TicketMessage {
  id: string;
  content: string;
  isStaff: boolean;
  createdAt: Date;
  attachments?: string[];
}

// Contract Types (Company only)
export interface PortalContract {
  id: string;
  contractNumber: string;
  title: string;
  type: ContractType;
  status: ContractStatus;
  startDate: Date;
  endDate: Date;
  value: number;
  autoRenew: boolean;
  documents?: ContractDocument[];
  daysUntilExpiry: number;
}

export type ContractType = 'SERVICE' | 'MAINTENANCE' | 'SUPPORT' | 'LEASE' | 'SLA';
export type ContractStatus = 'ACTIVE' | 'EXPIRING_SOON' | 'EXPIRED' | 'CANCELLED' | 'PENDING';

export interface ContractDocument {
  id: string;
  name: string;
  type: string;
  url: string;
  uploadedAt: Date;
}

// Fleet Device Types (Company only)
export interface FleetDevice {
  id: string;
  assetTag: string;
  deviceType: string;
  brand: string;
  model: string;
  serialNumber?: string;
  assignedTo?: string;
  department?: string;
  status: FleetDeviceStatus;
  purchaseDate?: Date;
  warrantyExpiry?: Date;
  lastMaintenanceDate?: Date;
}

export type FleetDeviceStatus = 'ACTIVE' | 'IN_REPAIR' | 'RETIRED' | 'LOST' | 'AVAILABLE';

// Team Member Types (Company only)
export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: TeamRole;
  department?: string;
  isActive: boolean;
  lastLogin?: Date;
  permissions: string[];
}

export type TeamRole = 'OWNER' | 'ADMIN' | 'MANAGER' | 'MEMBER' | 'VIEWER';

// Notification Types
export interface PortalNotification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
  link?: string;
  metadata?: Record<string, unknown>;
}

export type NotificationType =
  | 'ORDER'
  | 'SHIPPING'
  | 'REPAIR'
  | 'INVOICE'
  | 'CONTRACT'
  | 'SUPPORT'
  | 'SYSTEM';

// Session Types
export interface PortalSession {
  id: string;
  deviceInfo: string;
  location?: string;
  ipAddress: string;
  lastActive: Date;
  createdAt: Date;
  isCurrent: boolean;
}

// Analytics Types (Company only)
export interface PortalAnalytics {
  totalOrders: number;
  totalSpent: number;
  activeDevices: number;
  pendingRepairs: number;
  expiringContracts: number;
  openTickets: number;
  monthlySpending: MonthlyData[];
  departmentSpending: DepartmentData[];
}

export interface MonthlyData {
  month: string;
  amount: number;
}

export interface DepartmentData {
  department: string;
  amount: number;
  orderCount: number;
}

// Brønnøysund API Response
export interface BronnysundCompanyData {
  organisasjonsnummer: string;
  navn: string;
  organisasjonsform: {
    kode: string;
    beskrivelse: string;
  };
  hjemmeside?: string;
  postadresse?: {
    adresse?: string[];
    postnummer?: string;
    poststed?: string;
    land?: string;
  };
  forretningsadresse?: {
    adresse?: string[];
    postnummer?: string;
    poststed?: string;
    land?: string;
  };
  naeringskode1?: {
    kode: string;
    beskrivelse: string;
  };
}
