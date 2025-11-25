// Product Types
export type ProductGrade = "A" | "B" | "C" | "NEW";

export type ProductCategory =
  | "LAPTOPS"
  | "DESKTOPS"
  | "MONITORS"
  | "PHONES"
  | "TABLETS"
  | "ACCESSORIES"
  | "NETWORKING"
  | "STORAGE"
  | "PRINTERS"
  | "OTHER";

export interface Product {
  id: string;
  sku: string;
  name: string;
  nameNo: string;
  description: string;
  descriptionNo: string;
  category: ProductCategory;
  brand: string;
  model?: string;
  price: number;
  originalPrice?: number;
  stock: number;
  grade: ProductGrade;
  sustainabilityScore: number;
  co2Saved: number;
  images: string[];
  specifications?: Record<string, string>;
  isActive: boolean;
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Order Types
export type OrderStatus =
  | "PENDING"
  | "CONFIRMED"
  | "PROCESSING"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED"
  | "REFUNDED";

export interface OrderItem {
  id: string;
  productId: string;
  quantity: number;
  price: number;
  product?: Product;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  status: OrderStatus;
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  notes?: string;
  trackingNumber?: string;
  items: OrderItem[];
  createdAt: Date;
  updatedAt: Date;
}

// Buyback Types
export type DeviceCondition =
  | "EXCELLENT"
  | "GOOD"
  | "FAIR"
  | "POOR"
  | "BROKEN";

export type BuybackStatus =
  | "QUOTE_REQUESTED"
  | "QUOTE_SENT"
  | "ACCEPTED"
  | "DEVICE_RECEIVED"
  | "INSPECTED"
  | "PAYMENT_SENT"
  | "COMPLETED"
  | "REJECTED"
  | "CANCELLED";

export interface BuybackRequest {
  id: string;
  userId?: string;
  status: BuybackStatus;
  deviceType: string;
  brand: string;
  model: string;
  condition: DeviceCondition;
  conditionNotes?: string;
  serialNumber?: string;
  contactName: string;
  contactEmail: string;
  contactPhone?: string;
  estimatedPrice?: number;
  finalPrice?: number;
  inspectionNotes?: string;
  createdAt: Date;
  updatedAt: Date;
}

// User Types
export type UserRole =
  | "CUSTOMER"
  | "STAFF"
  | "TECHNICIAN"
  | "MANAGER"
  | "ACCOUNTANT"
  | "ADMIN"
  | "SUPER_ADMIN"
  | "VIEW_ONLY"
  | "SUPPORT";

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role: UserRole;
  isActive: boolean;
  mfaEnabled: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Social Media Types
export type SocialPlatform =
  | "FACEBOOK"
  | "INSTAGRAM"
  | "LINKEDIN"
  | "TWITTER"
  | "YOUTUBE";

export type PostStatus = "DRAFT" | "SCHEDULED" | "PUBLISHED" | "FAILED";

export interface SocialAccount {
  id: string;
  userId: string;
  platform: SocialPlatform;
  accountName: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ScheduledPost {
  id: string;
  userId: string;
  accountId: string;
  content: string;
  mediaUrls: string[];
  scheduledFor: Date;
  publishedAt?: Date;
  status: PostStatus;
  errorMessage?: string;
  analytics?: Record<string, number>;
  createdAt: Date;
  updatedAt: Date;
}

// Environmental Types
export interface EnvironmentalMetric {
  id: string;
  year: number;
  month: number;
  devicesRecycled: number;
  co2SavedKg: number;
  eWasteKg: number;
  treesEquivalent: number;
}

export interface Certification {
  id: string;
  name: string;
  nameNo: string;
  description: string;
  descriptionNo: string;
  issuer: string;
  validFrom: Date;
  validUntil?: Date;
  imageUrl?: string;
  isActive: boolean;
}

// Filter Types
export interface ProductFilters {
  category?: ProductCategory;
  grade?: ProductGrade;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  inStock?: boolean;
}

// API Response Types
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
