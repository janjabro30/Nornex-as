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
  | "SUPER_ADMIN";

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

// Extended Filter Types for Phase 5
export type ProcessorType = 
  | "intel-i3" | "intel-i5" | "intel-i7" | "intel-i9"
  | "amd-ryzen-3" | "amd-ryzen-5" | "amd-ryzen-7" | "amd-ryzen-9"
  | "apple-m1" | "apple-m2" | "apple-m3";

export type RamSize = "4" | "8" | "16" | "32" | "64" | "128";

export type StorageSize = "128" | "256" | "512" | "1024" | "2048" | "4096";

export type ScreenSize = "under-13" | "13-14" | "15-16" | "17-plus";

export type ScreenResolution = "fhd" | "2k" | "4k" | "5k";

export type GraphicsType = "integrated" | "nvidia-gtx" | "nvidia-rtx" | "amd-radeon" | "apple-gpu";

export type OperatingSystem = "windows-11" | "windows-10" | "macos" | "linux" | "chromeos" | "no-os";

export type ConditionType = "new" | "refurbished-a" | "refurbished-b" | "used";

export type SortOption = 
  | "newest" | "price-low" | "price-high" 
  | "name-asc" | "name-desc" | "popular" | "rating";

export type ViewMode = "grid" | "list";

// Filter Types
export interface ProductFilters {
  category?: ProductCategory;
  grade?: ProductGrade;
  brand?: string;
  brands?: string[];
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  inStock?: boolean;
  processors?: ProcessorType[];
  ramSizes?: RamSize[];
  storageSizes?: StorageSize[];
  screenSizes?: ScreenSize[];
  screenResolutions?: ScreenResolution[];
  graphics?: GraphicsType[];
  operatingSystems?: OperatingSystem[];
  conditions?: ConditionType[];
  sortBy?: SortOption;
  viewMode?: ViewMode;
  page?: number;
  perPage?: number;
}

// Discount Code Types
export type DiscountType = "percentage" | "fixed";

export interface DiscountCode {
  id: string;
  code: string;
  type: DiscountType;
  value: number;
  minOrderAmount?: number;
  maxUses?: number;
  currentUses: number;
  validFrom: Date;
  validUntil: Date;
  isActive: boolean;
  createdAt: Date;
}

// Checkout Types
export type DeliveryMethod = "home" | "pickup" | "express" | "free";
export type PaymentMethod = "vipps" | "credit-card" | "invoice" | "klarna" | "paypal";

export interface DeliveryInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
  postalCode: string;
  city: string;
  useDifferentBilling: boolean;
  billingAddress?: string;
  billingPostalCode?: string;
  billingCity?: string;
  saveAddress: boolean;
}

export interface CheckoutState {
  step: 1 | 2 | 3;
  deliveryInfo: DeliveryInfo | null;
  deliveryMethod: DeliveryMethod | null;
  paymentMethod: PaymentMethod | null;
  discountCode: string | null;
  discountAmount: number;
  acceptTerms: boolean;
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
