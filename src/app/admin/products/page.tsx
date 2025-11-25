'use client'

import { useState } from 'react'
import { Plus, Search, Edit, Trash2, Eye } from 'lucide-react'
import { Button, Input } from '@/components/ui'

const mockProducts = [
  { id: '1', name: 'Dell XPS 15 Laptop', sku: 'LAP-001', price: 12999, salePrice: 9999, stock: 15, category: 'Laptops', status: 'active' },
  { id: '2', name: 'iPhone 15 Pro Max', sku: 'PH-001', price: 14999, salePrice: null, stock: 25, category: 'Smartphones', status: 'active' },
  { id: '3', name: 'NVIDIA RTX 4090', sku: 'GPU-001', price: 18999, salePrice: 16999, stock: 8, category: 'Components', status: 'active' },
  { id: '4', name: 'Logitech G Pro Keyboard', sku: 'KB-001', price: 1499, salePrice: null, stock: 50, category: 'Peripherals', status: 'active' },
  { id: '5', name: 'Samsung Odyssey G7', sku: 'MON-001', price: 5999, salePrice: 4999, stock: 12, category: 'Peripherals', status: 'active' },
  { id: '6', name: 'MacBook Pro 16"', sku: 'LAP-002', price: 24999, salePrice: null, stock: 5, category: 'Laptops', status: 'active' },
  { id: '7', name: 'AMD Ryzen 9 7950X', sku: 'CPU-001', price: 6999, salePrice: 5999, stock: 20, category: 'Components', status: 'active' },
  { id: '8', name: 'HP EliteBook 840 G6', sku: 'REF-001', price: 4999, salePrice: 3499, stock: 8, category: 'Laptops', status: 'inactive' },
]

export default function AdminProductsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)

  const filteredProducts = mockProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-600">Manage your product catalog</p>
        </div>
        <Button onClick={() => setShowAddModal(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Product
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="search"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <select className="border border-gray-300 rounded-lg px-4 py-2 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">All Categories</option>
            <option value="laptops">Laptops</option>
            <option value="smartphones">Smartphones</option>
            <option value="components">Components</option>
            <option value="peripherals">Peripherals</option>
          </select>
          <select className="border border-gray-300 rounded-lg px-4 py-2 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SKU</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                        <span className="text-gray-400 text-xs">IMG</span>
                      </div>
                      <span className="font-medium text-gray-900">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{product.sku}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{product.category}</td>
                  <td className="px-6 py-4">
                    <div>
                      <span className="text-sm font-medium text-gray-900">
                        kr {(product.salePrice || product.price).toLocaleString('no-NO')}
                      </span>
                      {product.salePrice && (
                        <span className="text-xs text-gray-500 line-through ml-2">
                          kr {product.price.toLocaleString('no-NO')}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-sm ${product.stock > 10 ? 'text-green-600' : product.stock > 0 ? 'text-yellow-600' : 'text-red-600'}`}>
                      {product.stock}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      product.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-1 text-gray-500 hover:text-blue-600 transition-colors" title="View">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-500 hover:text-blue-600 transition-colors" title="Edit">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-500 hover:text-red-600 transition-colors" title="Delete">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Showing {filteredProducts.length} of {mockProducts.length} products
          </p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>Previous</Button>
            <Button variant="outline" size="sm">Next</Button>
          </div>
        </div>
      </div>

      {/* Add Product Modal Placeholder */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <h2 className="text-lg font-semibold">Add New Product</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4">
                <Input label="Product Name" placeholder="Enter product name" className="col-span-2" />
                <Input label="SKU" placeholder="Enter SKU" />
                <Input label="Brand" placeholder="Enter brand" />
                <Input label="Price" type="number" placeholder="0.00" />
                <Input label="Sale Price" type="number" placeholder="0.00" />
                <Input label="Stock" type="number" placeholder="0" />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Laptops</option>
                    <option>Smartphones</option>
                    <option>Components</option>
                    <option>Peripherals</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    rows={4}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter product description"
                  />
                </div>
              </div>
            </div>
            <div className="p-6 border-t flex justify-end gap-3">
              <Button variant="outline" onClick={() => setShowAddModal(false)}>Cancel</Button>
              <Button onClick={() => setShowAddModal(false)}>Save Product</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
