/**
 * NORNEX AS - Admin Backend Dashboard
 * @author NORNEX Development Team
 * @version 2.0.0
 * @copyright 2025 NORNEX AS
 */

'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard,
  ShoppingCart,
  Wrench,
  RefreshCw,
  FileCheck,
  Users,
  Package,
  FileText,
  Mail,
  Share2,
  Handshake,
  Link as LinkIcon,
  Search,
  Settings,
  UserCog,
  Percent,
  BarChart3,
  Menu,
  X,
  ChevronDown,
  Bell,
  LogOut,
  Plus,
  Edit,
  Trash2,
  Eye,
  Download,
  CheckCircle,
  Clock,
  AlertCircle,
  TrendingUp,
  DollarSign,
} from 'lucide-react';
import { cn, formatCurrency } from '@/lib/utils';

type ViewType = 
  | 'dashboard' 
  | 'orders' 
  | 'repairs' 
  | 'sellback' 
  | 'contracts' 
  | 'customers'
  | 'products'
  | 'blog'
  | 'newsletter'
  | 'emails'
  | 'social'
  | 'partners'
  | 'apis'
  | 'seo'
  | 'settings'
  | 'users'
  | 'discounts'
  | 'analytics';

const sidebarItems = [
  { view: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
  { view: 'orders', name: 'Orders', icon: ShoppingCart },
  { view: 'repairs', name: 'Repairs', icon: Wrench },
  { view: 'sellback', name: 'Sellback', icon: RefreshCw },
  { view: 'contracts', name: 'Contracts', icon: FileCheck },
  { view: 'customers', name: 'Customers', icon: Users },
  { view: 'products', name: 'Products', icon: Package },
  { view: 'blog', name: 'Blog', icon: FileText },
  { view: 'newsletter', name: 'Newsletter', icon: Mail },
  { view: 'emails', name: 'Email Templates', icon: Mail },
  { view: 'social', name: 'Social Media', icon: Share2 },
  { view: 'partners', name: 'Partners', icon: Handshake },
  { view: 'apis', name: 'API Config', icon: LinkIcon },
  { view: 'seo', name: 'SEO', icon: Search },
  { view: 'settings', name: 'Settings', icon: Settings },
  { view: 'users', name: 'Users', icon: UserCog },
  { view: 'discounts', name: 'Discounts', icon: Percent },
  { view: 'analytics', name: 'Analytics', icon: BarChart3 },
];

// Demo data
const demoOrders = [
  { id: 'ORD-001', customer: 'Erik Johansen', date: '2024-11-25', status: 'pending', total: 12990 },
  { id: 'ORD-002', customer: 'Maria Hansen', date: '2024-11-24', status: 'shipped', total: 2180 },
  { id: 'ORD-003', customer: 'Thomas Berg', date: '2024-11-23', status: 'delivered', total: 18990 },
];

const demoRepairs = [
  { id: 'REP-001', device: 'MacBook Pro', customer: 'Ole Nordmann', status: 'in-progress', date: '2024-11-24' },
  { id: 'REP-002', device: 'iPhone 15', customer: 'Kari Nordmann', status: 'waiting-parts', date: '2024-11-23' },
  { id: 'REP-003', device: 'HP EliteBook', customer: 'Per Hansen', status: 'completed', date: '2024-11-22' },
];

const demoCustomers = [
  { id: 'CUS-001', name: 'Acme Norge AS', email: 'post@acme.no', type: 'business', orders: 12 },
  { id: 'CUS-002', name: 'Erik Johansen', email: 'erik@example.com', type: 'private', orders: 3 },
  { id: 'CUS-003', name: 'Nordic Tech AS', email: 'info@nordictech.no', type: 'business', orders: 8 },
];

const demoProducts = [
  { id: 'PRD-001', name: 'HP EliteBook 840 G8', price: 12990, stock: 8, status: 'active' },
  { id: 'PRD-002', name: 'Lenovo ThinkPad X1 Carbon', price: 18990, stock: 5, status: 'active' },
  { id: 'PRD-003', name: 'Dell OptiPlex 7090', price: 8990, stock: 12, status: 'active' },
];

function AdminBackendContent() {
  const searchParams = useSearchParams();
  const viewParam = searchParams?.get('view') as ViewType | null;
  const [currentView, setCurrentView] = useState<ViewType>(viewParam || 'dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    if (viewParam) {
      setCurrentView(viewParam);
    }
  }, [viewParam]);

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { bg: string; text: string; icon: typeof CheckCircle }> = {
      'pending': { bg: 'bg-yellow-100', text: 'text-yellow-700', icon: Clock },
      'shipped': { bg: 'bg-blue-100', text: 'text-blue-700', icon: Package },
      'delivered': { bg: 'bg-green-100', text: 'text-green-700', icon: CheckCircle },
      'in-progress': { bg: 'bg-blue-100', text: 'text-blue-700', icon: Clock },
      'waiting-parts': { bg: 'bg-orange-100', text: 'text-orange-700', icon: AlertCircle },
      'completed': { bg: 'bg-green-100', text: 'text-green-700', icon: CheckCircle },
      'active': { bg: 'bg-green-100', text: 'text-green-700', icon: CheckCircle },
      'draft': { bg: 'bg-slate-100', text: 'text-slate-700', icon: Clock },
    };
    const config = statusConfig[status] || { bg: 'bg-slate-100', text: 'text-slate-700', icon: Clock };
    const Icon = config.icon;
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        <Icon className="h-3 w-3" />
        {status.replace('-', ' ')}
      </span>
    );
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          { label: 'Customers', value: '127', icon: Users, color: 'blue' },
          { label: 'Orders', value: '45', icon: ShoppingCart, color: 'green' },
          { label: 'Revenue', value: '487,320 kr', icon: DollarSign, color: 'indigo' },
          { label: 'Repairs', value: '12', icon: Wrench, color: 'orange' },
          { label: 'Invoices', value: '8', icon: FileText, color: 'red' },
        ].map((metric) => {
          const Icon = metric.icon;
          return (
            <div key={metric.label} className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg bg-${metric.color}-100`}>
                  <Icon className={`h-5 w-5 text-${metric.color}-600`} />
                </div>
                <div>
                  <p className="text-sm text-slate-500">{metric.label}</p>
                  <p className="text-xl font-bold text-slate-900">{metric.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts placeholder */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="font-semibold text-slate-900 mb-4">Revenue (Last 6 Months)</h3>
          <div className="h-64 bg-slate-50 rounded-lg flex items-center justify-center text-slate-400">
            Chart placeholder
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="font-semibold text-slate-900 mb-4">Orders (Last 7 Days)</h3>
          <div className="h-64 bg-slate-50 rounded-lg flex items-center justify-center text-slate-400">
            Chart placeholder
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="font-semibold text-slate-900 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {[
            { action: 'New order received', details: 'ORD-001 from Erik Johansen', time: '5 minutes ago' },
            { action: 'Repair completed', details: 'REP-003 - HP EliteBook', time: '2 hours ago' },
            { action: 'New customer registered', details: 'Nordic Tech AS', time: '4 hours ago' },
          ].map((activity, i) => (
            <div key={i} className="flex items-center justify-between py-3 border-b last:border-0">
              <div>
                <p className="font-medium text-slate-900">{activity.action}</p>
                <p className="text-sm text-slate-500">{activity.details}</p>
              </div>
              <span className="text-sm text-slate-400">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderOrders = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-900">Orders</h2>
        <div className="flex gap-2">
          <button className="px-4 py-2 text-sm border border-slate-200 rounded-lg hover:bg-slate-50">
            <Download className="h-4 w-4 inline mr-1" /> Export CSV
          </button>
          <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Plus className="h-4 w-4 inline mr-1" /> New Order
          </button>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Order ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Total</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {demoOrders.map((order) => (
              <tr key={order.id} className="hover:bg-slate-50">
                <td className="px-6 py-4 font-mono text-sm">{order.id}</td>
                <td className="px-6 py-4">{order.customer}</td>
                <td className="px-6 py-4 text-slate-500">{order.date}</td>
                <td className="px-6 py-4">{getStatusBadge(order.status)}</td>
                <td className="px-6 py-4 font-medium">{formatCurrency(order.total)}</td>
                <td className="px-6 py-4 text-right">
                  <button className="p-1 text-slate-400 hover:text-blue-600"><Eye className="h-4 w-4" /></button>
                  <button className="p-1 text-slate-400 hover:text-blue-600"><Edit className="h-4 w-4" /></button>
                  <button className="p-1 text-slate-400 hover:text-red-600"><Trash2 className="h-4 w-4" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderRepairs = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-900">Repairs</h2>
        <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Plus className="h-4 w-4 inline mr-1" /> New Repair
        </button>
      </div>
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Repair ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Device</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {demoRepairs.map((repair) => (
              <tr key={repair.id} className="hover:bg-slate-50">
                <td className="px-6 py-4 font-mono text-sm">{repair.id}</td>
                <td className="px-6 py-4">{repair.device}</td>
                <td className="px-6 py-4">{repair.customer}</td>
                <td className="px-6 py-4 text-slate-500">{repair.date}</td>
                <td className="px-6 py-4">{getStatusBadge(repair.status)}</td>
                <td className="px-6 py-4 text-right">
                  <button className="p-1 text-slate-400 hover:text-blue-600"><Eye className="h-4 w-4" /></button>
                  <button className="p-1 text-slate-400 hover:text-blue-600"><Edit className="h-4 w-4" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderCustomers = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-900">Customers</h2>
        <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Plus className="h-4 w-4 inline mr-1" /> Add Customer
        </button>
      </div>
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Orders</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {demoCustomers.map((customer) => (
              <tr key={customer.id} className="hover:bg-slate-50">
                <td className="px-6 py-4 font-mono text-sm">{customer.id}</td>
                <td className="px-6 py-4 font-medium">{customer.name}</td>
                <td className="px-6 py-4 text-slate-500">{customer.email}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    customer.type === 'business' ? 'bg-purple-100 text-purple-700' : 'bg-slate-100 text-slate-700'
                  }`}>
                    {customer.type}
                  </span>
                </td>
                <td className="px-6 py-4">{customer.orders}</td>
                <td className="px-6 py-4 text-right">
                  <button className="p-1 text-slate-400 hover:text-blue-600"><Eye className="h-4 w-4" /></button>
                  <button className="p-1 text-slate-400 hover:text-blue-600"><Edit className="h-4 w-4" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderProducts = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-900">Products</h2>
        <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Plus className="h-4 w-4 inline mr-1" /> Add Product
        </button>
      </div>
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Product</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Stock</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {demoProducts.map((product) => (
              <tr key={product.id} className="hover:bg-slate-50">
                <td className="px-6 py-4 font-mono text-sm">{product.id}</td>
                <td className="px-6 py-4 font-medium">{product.name}</td>
                <td className="px-6 py-4">{formatCurrency(product.price)}</td>
                <td className="px-6 py-4">{product.stock}</td>
                <td className="px-6 py-4">{getStatusBadge(product.status)}</td>
                <td className="px-6 py-4 text-right">
                  <button className="p-1 text-slate-400 hover:text-blue-600"><Eye className="h-4 w-4" /></button>
                  <button className="p-1 text-slate-400 hover:text-blue-600"><Edit className="h-4 w-4" /></button>
                  <button className="p-1 text-slate-400 hover:text-red-600"><Trash2 className="h-4 w-4" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderGenericView = (title: string, description: string) => (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-slate-900">{title}</h2>
      <div className="bg-white rounded-xl p-8 shadow-sm text-center">
        <p className="text-slate-500">{description}</p>
        <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Plus className="h-4 w-4 inline mr-1" /> Add New
        </button>
      </div>
    </div>
  );

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return renderDashboard();
      case 'orders':
        return renderOrders();
      case 'repairs':
        return renderRepairs();
      case 'customers':
        return renderCustomers();
      case 'products':
        return renderProducts();
      case 'sellback':
        return renderGenericView('Sellback Submissions', 'Manage device sellback and trade-in submissions');
      case 'contracts':
        return renderGenericView('Contracts', 'Manage customer contracts and agreements');
      case 'blog':
        return renderGenericView('Blog Posts', 'Create and manage blog content');
      case 'newsletter':
        return renderGenericView('Newsletter Subscribers', 'Manage email newsletter subscriptions');
      case 'emails':
        return renderGenericView('Email Templates', 'Configure automated email templates');
      case 'social':
        return renderGenericView('Social Media', 'Manage social media links and integrations');
      case 'partners':
        return renderGenericView('Partners & Testimonials', 'Manage partner logos and customer testimonials');
      case 'apis':
        return renderGenericView('API Configuration', 'Configure external API integrations');
      case 'seo':
        return renderGenericView('SEO Settings', 'Manage meta tags and SEO configuration for all pages');
      case 'settings':
        return renderGenericView('System Settings', 'Configure company info, SMTP, and system preferences');
      case 'users':
        return renderGenericView('Admin Users', 'Manage admin user accounts and permissions');
      case 'discounts':
        return renderGenericView('Discount Codes', 'Create and manage promotional discount codes');
      case 'analytics':
        return renderGenericView('Analytics Dashboard', 'View detailed analytics and reports');
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 z-40 h-screen bg-slate-900 text-white transition-all duration-300',
          sidebarOpen ? 'w-64' : 'w-20'
        )}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center justify-between border-b border-slate-700 px-4">
            {sidebarOpen && (
              <span className="text-lg font-bold">NORNEX Admin</span>
            )}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="rounded-lg p-2 hover:bg-slate-800"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto px-3 py-4">
            <div className="space-y-1">
              {sidebarItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentView === item.view;
                return (
                  <Link
                    key={item.view}
                    href={`/AdminBackend?view=${item.view}`}
                    className={cn(
                      'flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-blue-600 text-white'
                        : 'text-slate-300 hover:bg-slate-800 hover:text-white',
                      !sidebarOpen && 'justify-center'
                    )}
                    title={!sidebarOpen ? item.name : undefined}
                  >
                    <Icon size={20} className={cn(sidebarOpen && 'mr-3')} />
                    {sidebarOpen && <span>{item.name}</span>}
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Footer */}
          <div className="border-t border-slate-700 p-3">
            <button className={cn(
              'flex w-full items-center rounded-lg px-3 py-2.5 text-sm font-medium text-slate-300 hover:bg-slate-800',
              !sidebarOpen && 'justify-center'
            )}>
              <LogOut size={20} className={cn(sidebarOpen && 'mr-3')} />
              {sidebarOpen && <span>Logout</span>}
            </button>
          </div>

          {sidebarOpen && (
            <div className="p-4 text-center text-xs text-slate-500 border-t border-slate-700">
              <p>© 2025 NORNEX AS</p>
              <p>v2.0.0</p>
            </div>
          )}
        </div>
      </aside>

      {/* Header */}
      <header
        className={cn(
          'fixed top-0 right-0 z-30 h-16 bg-white border-b border-slate-200 transition-all duration-300',
          sidebarOpen ? 'left-64' : 'left-20'
        )}
      >
        <div className="flex h-full items-center justify-between px-6">
          {/* Breadcrumb */}
          <div>
            <h1 className="text-lg font-semibold text-slate-900 capitalize">
              {currentView.replace('-', ' ')}
            </h1>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-slate-500 hover:text-slate-700">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-medium">
                A
              </div>
              {sidebarOpen && (
                <span className="text-sm text-slate-700">Admin</span>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main
        className={cn(
          'min-h-screen pt-16 transition-all duration-300',
          sidebarOpen ? 'ml-64' : 'ml-20'
        )}
      >
        <div className="p-6">
          {renderView()}
        </div>
      </main>
    </div>
  );
}

export default function AdminBackendPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="mt-4 text-slate-600">Loading admin dashboard...</p>
        </div>
      </div>
    }>
      <AdminBackendContent />
    </Suspense>
  );
}
