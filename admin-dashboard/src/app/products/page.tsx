/**
 * NORNEX AS - Products Management Page
 * @author NORNEX Development Team
 * @version 2.0.0
 * @copyright 2025 NORNEX AS
 */

'use client';

import { useState } from 'react';
import {
  Package,
  Plus,
  Search,
  Edit,
  Trash2,
  Save,
  X,
  ImagePlus,
} from 'lucide-react';
import { Sidebar, Header } from '@/components/layout';
import { useAppStore } from '@/lib/store';
import { cn, formatCurrency, generateId } from '@/lib/utils';
import { t } from '@/lib/translations';

interface Product {
  id: string;
  name: string;
  nameNo: string;
  description: string;
  descriptionNo: string;
  price: number;
  category: string;
  stock: number;
  sku: string;
  status: 'active' | 'draft' | 'out_of_stock';
  imageUrl?: string;
  createdAt: Date;
}

const initialProducts: Product[] = [
  {
    id: '1',
    name: 'IT Support Package - Basic',
    nameNo: 'IT Support Pakke - Basis',
    description: 'Basic IT support for small businesses',
    descriptionNo: 'Grunnleggende IT-støtte for små bedrifter',
    price: 2500,
    category: 'Services',
    stock: 999,
    sku: 'IT-SUP-BAS',
    status: 'active',
    createdAt: new Date(),
  },
  {
    id: '2',
    name: 'Computer Repair Service',
    nameNo: 'PC Reparasjonstjeneste',
    description: 'Professional computer repair and diagnostics',
    descriptionNo: 'Profesjonell datamaskin reparasjon og diagnostikk',
    price: 850,
    category: 'Repairs',
    stock: 999,
    sku: 'REP-COMP',
    status: 'active',
    createdAt: new Date(),
  },
];

const categories = ['Services', 'Repairs', 'Hardware', 'Software', 'Accessories'];

export default function ProductsPage() {
  const { sidebarOpen, language } = useAppStore();
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    nameNo: '',
    description: '',
    descriptionNo: '',
    price: 0,
    category: 'Services',
    stock: 0,
    sku: '',
    status: 'draft',
  });

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = () => {
    if (!formData.name || !formData.price) return;

    if (editingProduct) {
      setProducts(
        products.map((p) =>
          p.id === editingProduct.id ? { ...p, ...formData } as Product : p
        )
      );
    } else {
      const newProduct: Product = {
        id: generateId(),
        name: formData.name || '',
        nameNo: formData.nameNo || '',
        description: formData.description || '',
        descriptionNo: formData.descriptionNo || '',
        price: formData.price || 0,
        category: formData.category || 'Services',
        stock: formData.stock || 0,
        sku: formData.sku || `SKU-${Date.now()}`,
        status: formData.status || 'draft',
        createdAt: new Date(),
      };
      setProducts([...products, newProduct]);
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      nameNo: '',
      description: '',
      descriptionNo: '',
      price: 0,
      category: 'Services',
      stock: 0,
      sku: '',
      status: 'draft',
    });
    setEditingProduct(null);
    setShowForm(false);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData(product);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700';
      case 'draft':
        return 'bg-yellow-100 text-yellow-700';
      case 'out_of_stock':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
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
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="flex items-center gap-2 text-2xl font-bold text-slate-900">
                <Package className="text-blue-600" />
                Products & Webshop
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                Manage your webshop products and inventory
              </p>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
            >
              <Plus size={18} />
              Add Product
            </button>
          </div>

          {/* Search */}
          <div className="mb-6">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search products by name or SKU..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-lg border border-slate-200 py-2 pl-10 pr-4 text-sm focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Product Form Modal */}
          {showForm && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
              <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white p-6 shadow-xl">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-slate-900">
                    {editingProduct ? 'Edit Product' : 'Add New Product'}
                  </h2>
                  <button
                    onClick={resetForm}
                    className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-sm font-medium text-slate-700">
                        Product Name (English)
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full rounded-lg border border-slate-200 p-2 text-sm focus:border-blue-500 focus:outline-none"
                        placeholder="Enter product name"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-slate-700">
                        Product Name (Norwegian)
                      </label>
                      <input
                        type="text"
                        value={formData.nameNo}
                        onChange={(e) =>
                          setFormData({ ...formData, nameNo: e.target.value })
                        }
                        className="w-full rounded-lg border border-slate-200 p-2 text-sm focus:border-blue-500 focus:outline-none"
                        placeholder="Skriv inn produktnavn"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-sm font-medium text-slate-700">
                        Description (English)
                      </label>
                      <textarea
                        value={formData.description}
                        onChange={(e) =>
                          setFormData({ ...formData, description: e.target.value })
                        }
                        className="w-full rounded-lg border border-slate-200 p-2 text-sm focus:border-blue-500 focus:outline-none"
                        rows={3}
                        placeholder="Enter product description"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-slate-700">
                        Description (Norwegian)
                      </label>
                      <textarea
                        value={formData.descriptionNo}
                        onChange={(e) =>
                          setFormData({ ...formData, descriptionNo: e.target.value })
                        }
                        className="w-full rounded-lg border border-slate-200 p-2 text-sm focus:border-blue-500 focus:outline-none"
                        rows={3}
                        placeholder="Skriv inn produktbeskrivelse"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-3">
                    <div>
                      <label className="mb-1 block text-sm font-medium text-slate-700">
                        Price (NOK)
                      </label>
                      <input
                        type="number"
                        value={formData.price}
                        onChange={(e) =>
                          setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })
                        }
                        className="w-full rounded-lg border border-slate-200 p-2 text-sm focus:border-blue-500 focus:outline-none"
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-slate-700">
                        Stock
                      </label>
                      <input
                        type="number"
                        value={formData.stock}
                        onChange={(e) =>
                          setFormData({ ...formData, stock: parseInt(e.target.value) || 0 })
                        }
                        className="w-full rounded-lg border border-slate-200 p-2 text-sm focus:border-blue-500 focus:outline-none"
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-slate-700">
                        SKU
                      </label>
                      <input
                        type="text"
                        value={formData.sku}
                        onChange={(e) =>
                          setFormData({ ...formData, sku: e.target.value })
                        }
                        className="w-full rounded-lg border border-slate-200 p-2 text-sm focus:border-blue-500 focus:outline-none"
                        placeholder="SKU-001"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-sm font-medium text-slate-700">
                        Category
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) =>
                          setFormData({ ...formData, category: e.target.value })
                        }
                        className="w-full rounded-lg border border-slate-200 p-2 text-sm focus:border-blue-500 focus:outline-none"
                      >
                        {categories.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-slate-700">
                        Status
                      </label>
                      <select
                        value={formData.status}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            status: e.target.value as 'active' | 'draft' | 'out_of_stock',
                          })
                        }
                        className="w-full rounded-lg border border-slate-200 p-2 text-sm focus:border-blue-500 focus:outline-none"
                      >
                        <option value="draft">Draft</option>
                        <option value="active">Active</option>
                        <option value="out_of_stock">Out of Stock</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700">
                      Product Image
                    </label>
                    <div className="flex items-center justify-center rounded-lg border-2 border-dashed border-slate-200 p-8">
                      <div className="text-center">
                        <ImagePlus size={40} className="mx-auto text-slate-400" />
                        <p className="mt-2 text-sm text-slate-500">
                          Click to upload or drag and drop
                        </p>
                        <p className="text-xs text-slate-400">PNG, JPG up to 5MB</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-4">
                    <button
                      onClick={resetForm}
                      className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSubmit}
                      className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                    >
                      <Save size={16} />
                      {editingProduct ? 'Update Product' : 'Save Product'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Products Table */}
          <div className="rounded-xl border border-slate-200 bg-white">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-slate-200 bg-slate-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase text-slate-500">
                      Product
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase text-slate-500">
                      SKU
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase text-slate-500">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase text-slate-500">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase text-slate-500">
                      Stock
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase text-slate-500">
                      Status
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium uppercase text-slate-500">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {filteredProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-slate-900">{product.name}</p>
                          <p className="text-sm text-slate-500">{product.nameNo}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-mono text-sm text-slate-600">
                        {product.sku}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {product.category}
                      </td>
                      <td className="px-6 py-4 font-medium text-slate-900">
                        {formatCurrency(product.price)}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">{product.stock}</td>
                      <td className="px-6 py-4">
                        <span
                          className={cn(
                            'rounded-full px-2 py-1 text-xs font-medium',
                            getStatusColor(product.status)
                          )}
                        >
                          {product.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleEdit(product)}
                            className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-blue-600"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-red-600"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredProducts.length === 0 && (
              <div className="p-8 text-center">
                <Package size={40} className="mx-auto text-slate-300" />
                <p className="mt-2 text-slate-500">No products found</p>
                <button
                  onClick={() => setShowForm(true)}
                  className="mt-4 text-sm font-medium text-blue-600 hover:text-blue-700"
                >
                  Add your first product
                </button>
              </div>
            )}
          </div>

          <footer className="mt-12 border-t border-slate-200 pt-6 text-center text-sm text-slate-500">
            <p>© 2025 NORNEX AS - All rights reserved</p>
          </footer>
        </div>
      </main>
    </div>
  );
}
