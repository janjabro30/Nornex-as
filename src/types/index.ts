// Type definitions for the Nornex AS platform

export interface Product {
  id: string
  sku: string
  categoryId: string
  brand: string | null
  price: number
  salePrice: number | null
  cost: number | null
  stock: number
  condition: 'new' | 'refurbished' | 'used'
  featured: boolean
  active: boolean
  rating: number
  reviewCount: number
  specs: Record<string, string | number | boolean> | null
  createdAt: Date
  updatedAt: Date
  translations: ProductTranslation[]
  images: ProductImage[]
  category?: Category
}

export interface ProductTranslation {
  id: string
  productId: string
  language: string
  name: string
  description: string | null
  shortDescription: string | null
  metaTitle: string | null
  metaDescription: string | null
}

export interface ProductImage {
  id: string
  productId: string
  url: string
  alt: string | null
  sortOrder: number
}

export interface Category {
  id: string
  slug: string
  parentId: string | null
  image: string | null
  sortOrder: number
  translations: CategoryTranslation[]
  filters?: CategoryFilter[]
  children?: Category[]
  parent?: Category
}

export interface CategoryTranslation {
  id: string
  categoryId: string
  language: string
  name: string
  description: string | null
}

export interface CategoryFilter {
  id: string
  categoryId: string
  filterKey: string
  filterType: 'range' | 'select' | 'multiselect'
  sortOrder: number
  translations: FilterTranslation[]
}

export interface FilterTranslation {
  id: string
  filterId: string
  language: string
  label: string
  options: string | null // JSON array
}

export interface CartItem {
  id: string
  cartId: string
  productId: string
  quantity: number
  product: Product
}

export interface Cart {
  id: string
  userId: string | null
  sessionId: string | null
  items: CartItem[]
}

export interface Order {
  id: string
  orderNumber: string
  userId: string | null
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  subtotal: number
  shipping: number
  tax: number
  total: number
  paymentMethod: 'vipps' | 'card' | 'invoice'
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded'
  shippingAddress: ShippingAddress
  billingAddress: ShippingAddress | null
  notes: string | null
  createdAt: Date
  items: OrderItem[]
}

export interface OrderItem {
  id: string
  orderId: string
  productId: string
  name: string
  sku: string
  price: number
  quantity: number
  total: number
  product?: Product
}

export interface ShippingAddress {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  address2?: string
  city: string
  state?: string
  postalCode: string
  country: string
}

export interface SocialMediaAccount {
  id: string
  platform: 'facebook' | 'instagram' | 'linkedin' | 'tiktok'
  accountName: string | null
  profileUrl: string | null
  accessToken: string | null
  refreshToken: string | null
  appId: string | null
  appSecret: string | null
  pageId: string | null
  clientId: string | null
  clientSecret: string | null
  isConnected: boolean
  isActive: boolean
  lastSync: Date | null
}

export interface SocialPost {
  id: string
  content: string
  mediaUrls: string[] | null
  platforms: string[]
  status: 'draft' | 'scheduled' | 'published' | 'failed'
  scheduledFor: Date | null
  publishedAt: Date | null
  results?: SocialPostResult[]
}

export interface SocialPostResult {
  id: string
  postId: string
  platform: string
  postUrl: string | null
  platformId: string | null
  status: 'success' | 'failed'
  error: string | null
  likes: number
  shares: number
  comments: number
  reach: number
}

export interface SiteSetting {
  id: string
  key: string
  value: string
  type: 'text' | 'image' | 'json'
}

// Filter types for product listing
export interface ProductFilters {
  category?: string
  minPrice?: number
  maxPrice?: number
  brand?: string[]
  condition?: string[]
  inStock?: boolean
  rating?: number
  specs?: Record<string, string[]>
  search?: string
}

export interface ProductSort {
  field: 'price' | 'createdAt' | 'rating' | 'name' | 'popularity'
  order: 'asc' | 'desc'
}

// Cart store types
export interface CartStore {
  items: CartItem[]
  isOpen: boolean
  isLoading: boolean
  addItem: (product: Product, quantity?: number) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  toggleCart: () => void
  openCart: () => void
  closeCart: () => void
  loadCart: () => void
  getTotal: () => number
  getItemCount: () => number
}
