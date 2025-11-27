/**
 * NORNEX AS - Services Management Page
 * @author NORNEX Development Team
 * @version 2.0.0
 * @copyright 2025 NORNEX AS
 */

'use client';

import { useState } from 'react';
import {
  Briefcase,
  Plus,
  Search,
  Edit,
  Trash2,
  Save,
  X,
  Clock,
  DollarSign,
} from 'lucide-react';
import { Sidebar, Header } from '@/components/layout';
import { useAppStore } from '@/lib/store';
import { cn, formatCurrency, generateId } from '@/lib/utils';

interface Service {
  id: string;
  name: string;
  nameNo: string;
  description: string;
  descriptionNo: string;
  price: number;
  priceType: 'fixed' | 'hourly' | 'starting_from';
  duration: string;
  category: string;
  status: 'active' | 'inactive';
  createdAt: Date;
}

const initialServices: Service[] = [
  {
    id: '1',
    name: 'IT Support - Monthly',
    nameNo: 'IT Support - Månedlig',
    description: 'Monthly IT support subscription for businesses',
    descriptionNo: 'Månedlig IT-støtte abonnement for bedrifter',
    price: 4500,
    priceType: 'fixed',
    duration: 'per month',
    category: 'Support',
    status: 'active',
    createdAt: new Date(),
  },
  {
    id: '2',
    name: 'Computer Diagnostics',
    nameNo: 'Datamaskin Diagnostikk',
    description: 'Full diagnostic service for computers',
    descriptionNo: 'Full diagnostikk tjeneste for datamaskiner',
    price: 350,
    priceType: 'fixed',
    duration: '30 min',
    category: 'Repairs',
    status: 'active',
    createdAt: new Date(),
  },
  {
    id: '3',
    name: 'On-Site Support',
    nameNo: 'Støtte på Stedet',
    description: 'Technician visit to your location',
    descriptionNo: 'Teknikerbesøk på din lokasjon',
    price: 950,
    priceType: 'hourly',
    duration: 'per hour',
    category: 'Support',
    status: 'active',
    createdAt: new Date(),
  },
  {
    id: '4',
    name: 'Network Setup',
    nameNo: 'Nettverk Oppsett',
    description: 'Complete network installation and configuration',
    descriptionNo: 'Komplett nettverksinstallasjon og konfigurasjon',
    price: 2500,
    priceType: 'starting_from',
    duration: '2-4 hours',
    category: 'Installation',
    status: 'active',
    createdAt: new Date(),
  },
];

const serviceCategories = ['Support', 'Repairs', 'Installation', 'Maintenance', 'Consulting'];

export default function ServicesPage() {
  const { sidebarOpen } = useAppStore();
  const [services, setServices] = useState<Service[]>(initialServices);
  const [showForm, setShowForm] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState<Partial<Service>>({
    name: '',
    nameNo: '',
    description: '',
    descriptionNo: '',
    price: 0,
    priceType: 'fixed',
    duration: '',
    category: 'Support',
    status: 'active',
  });

  const filteredServices = services.filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = () => {
    if (!formData.name || !formData.price) return;

    if (editingService) {
      setServices(
        services.map((s) =>
          s.id === editingService.id ? { ...s, ...formData } as Service : s
        )
      );
    } else {
      const newService: Service = {
        id: generateId(),
        name: formData.name || '',
        nameNo: formData.nameNo || '',
        description: formData.description || '',
        descriptionNo: formData.descriptionNo || '',
        price: formData.price || 0,
        priceType: formData.priceType || 'fixed',
        duration: formData.duration || '',
        category: formData.category || 'Support',
        status: formData.status || 'active',
        createdAt: new Date(),
      };
      setServices([...services, newService]);
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
      priceType: 'fixed',
      duration: '',
      category: 'Support',
      status: 'active',
    });
    setEditingService(null);
    setShowForm(false);
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setFormData(service);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    setServices(services.filter((s) => s.id !== id));
  };

  const formatPrice = (service: Service) => {
    const price = formatCurrency(service.price);
    switch (service.priceType) {
      case 'hourly':
        return `${price}/hr`;
      case 'starting_from':
        return `from ${price}`;
      default:
        return price;
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
                <Briefcase className="text-green-600" />
                Services
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                Manage your service offerings and pricing
              </p>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-green-700"
            >
              <Plus size={18} />
              Add Service
            </button>
          </div>

          {/* Search */}
          <div className="mb-6">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-lg border border-slate-200 py-2 pl-10 pr-4 text-sm focus:border-green-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Service Form Modal */}
          {showForm && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
              <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white p-6 shadow-xl">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-slate-900">
                    {editingService ? 'Edit Service' : 'Add New Service'}
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
                        Service Name (English)
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full rounded-lg border border-slate-200 p-2 text-sm focus:border-green-500 focus:outline-none"
                        placeholder="Enter service name"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-slate-700">
                        Service Name (Norwegian)
                      </label>
                      <input
                        type="text"
                        value={formData.nameNo}
                        onChange={(e) =>
                          setFormData({ ...formData, nameNo: e.target.value })
                        }
                        className="w-full rounded-lg border border-slate-200 p-2 text-sm focus:border-green-500 focus:outline-none"
                        placeholder="Skriv inn tjenestenavn"
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
                        className="w-full rounded-lg border border-slate-200 p-2 text-sm focus:border-green-500 focus:outline-none"
                        rows={3}
                        placeholder="Enter service description"
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
                        className="w-full rounded-lg border border-slate-200 p-2 text-sm focus:border-green-500 focus:outline-none"
                        rows={3}
                        placeholder="Skriv inn tjenestesbeskrivelse"
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
                        className="w-full rounded-lg border border-slate-200 p-2 text-sm focus:border-green-500 focus:outline-none"
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-slate-700">
                        Price Type
                      </label>
                      <select
                        value={formData.priceType}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            priceType: e.target.value as 'fixed' | 'hourly' | 'starting_from',
                          })
                        }
                        className="w-full rounded-lg border border-slate-200 p-2 text-sm focus:border-green-500 focus:outline-none"
                      >
                        <option value="fixed">Fixed Price</option>
                        <option value="hourly">Per Hour</option>
                        <option value="starting_from">Starting From</option>
                      </select>
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-slate-700">
                        Duration
                      </label>
                      <input
                        type="text"
                        value={formData.duration}
                        onChange={(e) =>
                          setFormData({ ...formData, duration: e.target.value })
                        }
                        className="w-full rounded-lg border border-slate-200 p-2 text-sm focus:border-green-500 focus:outline-none"
                        placeholder="e.g., 1-2 hours"
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
                        className="w-full rounded-lg border border-slate-200 p-2 text-sm focus:border-green-500 focus:outline-none"
                      >
                        {serviceCategories.map((cat) => (
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
                            status: e.target.value as 'active' | 'inactive',
                          })
                        }
                        className="w-full rounded-lg border border-slate-200 p-2 text-sm focus:border-green-500 focus:outline-none"
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
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
                      className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
                    >
                      <Save size={16} />
                      {editingService ? 'Update Service' : 'Save Service'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Services Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                className="rounded-xl border border-slate-200 bg-white p-5 transition-shadow hover:shadow-md"
              >
                <div className="mb-3 flex items-start justify-between">
                  <div>
                    <span
                      className={cn(
                        'inline-block rounded-full px-2 py-0.5 text-xs font-medium',
                        service.status === 'active'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-slate-100 text-slate-600'
                      )}
                    >
                      {service.status}
                    </span>
                    <span className="ml-2 text-xs text-slate-500">{service.category}</span>
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => handleEdit(service)}
                      className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-green-600"
                    >
                      <Edit size={14} />
                    </button>
                    <button
                      onClick={() => handleDelete(service.id)}
                      className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-red-600"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                <h3 className="font-semibold text-slate-900">{service.name}</h3>
                <p className="text-sm text-slate-500">{service.nameNo}</p>
                <p className="mt-2 line-clamp-2 text-sm text-slate-600">
                  {service.description}
                </p>

                <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
                  <div className="flex items-center gap-1 text-green-600">
                    <DollarSign size={16} />
                    <span className="font-semibold">{formatPrice(service)}</span>
                  </div>
                  {service.duration && (
                    <div className="flex items-center gap-1 text-sm text-slate-500">
                      <Clock size={14} />
                      <span>{service.duration}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {filteredServices.length === 0 && (
            <div className="rounded-xl border border-slate-200 bg-white p-8 text-center">
              <Briefcase size={40} className="mx-auto text-slate-300" />
              <p className="mt-2 text-slate-500">No services found</p>
              <button
                onClick={() => setShowForm(true)}
                className="mt-4 text-sm font-medium text-green-600 hover:text-green-700"
              >
                Add your first service
              </button>
            </div>
          )}

          <footer className="mt-12 border-t border-slate-200 pt-6 text-center text-sm text-slate-500">
            <p>© 2025 NORNEX AS - All rights reserved</p>
          </footer>
        </div>
      </main>
    </div>
  );
}
