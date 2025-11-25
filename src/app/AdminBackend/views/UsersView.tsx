"use client";

import React, { useState } from "react";
import {
  Plus,
  Edit,
  Trash2,
  Search,
  X,
  Check,
  Users,
  Shield,
  Mail,
  Phone,
  Key,
  Activity,
  Eye,
  EyeOff,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import type { UserRole } from "@/types";

interface AdminUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  isActive: boolean;
  lastLoginAt?: Date;
  createdAt: Date;
}

const roleOptions: { value: UserRole; label: string; description: string }[] = [
  { value: "SUPER_ADMIN", label: "Super Admin", description: "Full tilgang til alt" },
  { value: "ADMIN", label: "Admin", description: "Full tilgang unntatt brukeradministrasjon" },
  { value: "MANAGER", label: "Leder", description: "Kan administrere ordrer, reparasjoner og personell" },
  { value: "STAFF", label: "Ansatt", description: "Kan se og oppdatere ordrer og reparasjoner" },
  { value: "TECHNICIAN", label: "Tekniker", description: "Kan håndtere reparasjoner og innkjøp" },
  { value: "ACCOUNTANT", label: "Regnskapsfører", description: "Tilgang til økonomiske rapporter" },
];

const mockUsers: AdminUser[] = [
  {
    id: "1",
    name: "Nornex Admin",
    email: "admin@nornex.no",
    phone: "+47 22 33 44 55",
    role: "SUPER_ADMIN",
    isActive: true,
    lastLoginAt: new Date("2024-01-15T10:30:00"),
    createdAt: new Date("2023-01-01"),
  },
  {
    id: "2",
    name: "Ole Tekniker",
    email: "ole.tekniker@nornex.no",
    phone: "+47 91 23 45 67",
    role: "TECHNICIAN",
    isActive: true,
    lastLoginAt: new Date("2024-01-15T09:00:00"),
    createdAt: new Date("2023-06-15"),
  },
  {
    id: "3",
    name: "Kari Leder",
    email: "kari.leder@nornex.no",
    phone: "+47 92 34 56 78",
    role: "MANAGER",
    isActive: true,
    lastLoginAt: new Date("2024-01-14T16:00:00"),
    createdAt: new Date("2023-03-20"),
  },
  {
    id: "4",
    name: "Per Ansatt",
    email: "per.ansatt@nornex.no",
    phone: "+47 93 45 67 89",
    role: "STAFF",
    isActive: false,
    lastLoginAt: new Date("2023-12-01T12:00:00"),
    createdAt: new Date("2023-08-10"),
  },
];

export default function UsersView() {
  const [users, setUsers] = useState<AdminUser[]>(mockUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("");
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState<AdminUser | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "STAFF" as UserRole,
    isActive: true,
    password: "",
    confirmPassword: "",
  });

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = !roleFilter || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const showNotification = (type: "success" | "error", message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  const getRoleBadge = (role: UserRole) => {
    const colors: Record<UserRole, string> = {
      SUPER_ADMIN: "bg-red-100 text-red-800",
      ADMIN: "bg-orange-100 text-orange-800",
      MANAGER: "bg-purple-100 text-purple-800",
      ACCOUNTANT: "bg-blue-100 text-blue-800",
      TECHNICIAN: "bg-green-100 text-green-800",
      STAFF: "bg-gray-100 text-gray-800",
      CUSTOMER: "bg-gray-100 text-gray-800",
    };
    const label = roleOptions.find((r) => r.value === role)?.label || role;
    return <Badge className={colors[role]}>{label}</Badge>;
  };

  const handleAddNew = () => {
    setEditingUser(null);
    setFormData({
      name: "",
      email: "",
      phone: "",
      role: "STAFF",
      isActive: true,
      password: "",
      confirmPassword: "",
    });
    setShowModal(true);
  };

  const handleEdit = (user: AdminUser) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      isActive: user.isActive,
      password: "",
      confirmPassword: "",
    });
    setShowModal(true);
  };

  const handleSave = () => {
    if (!formData.name || !formData.email) {
      showNotification("error", "Vennligst fyll inn navn og e-post");
      return;
    }

    if (!editingUser && (!formData.password || formData.password !== formData.confirmPassword)) {
      showNotification("error", "Passordene må være like og fylt ut");
      return;
    }

    if (editingUser) {
      setUsers(
        users.map((u) =>
          u.id === editingUser.id
            ? { ...u, name: formData.name, email: formData.email, phone: formData.phone, role: formData.role, isActive: formData.isActive }
            : u
        )
      );
      showNotification("success", "Bruker oppdatert");
    } else {
      const newUser: AdminUser = {
        id: Date.now().toString(),
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        role: formData.role,
        isActive: formData.isActive,
        createdAt: new Date(),
      };
      setUsers([...users, newUser]);
      showNotification("success", "Ny bruker opprettet");
    }

    setShowModal(false);
  };

  const handleDelete = (id: string) => {
    setUsers(users.filter((u) => u.id !== id));
    setShowDeleteConfirm(null);
    showNotification("success", "Bruker slettet");
  };

  const handleToggleActive = (id: string) => {
    setUsers(users.map((u) => (u.id === id ? { ...u, isActive: !u.isActive } : u)));
  };

  const handleResetPassword = (userId: string) => {
    showNotification("success", "E-post for tilbakestilling av passord er sendt");
  };

  return (
    <div className="space-y-6">
      {/* Notification Toast */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg flex items-center space-x-2 ${notification.type === "success" ? "bg-green-600 text-white" : "bg-red-600 text-white"}`}>
          {notification.type === "success" ? <Check className="w-5 h-5" /> : <X className="w-5 h-5" />}
          <span>{notification.message}</span>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Brukere</h1>
          <p className="text-gray-500">Administrer admin-brukere og tilganger</p>
        </div>
        <Button onClick={handleAddNew}>
          <Plus className="w-4 h-4 mr-2" />
          Ny bruker
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-500">Totalt</p>
            <p className="text-2xl font-bold">{users.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-500">Aktive</p>
            <p className="text-2xl font-bold text-green-600">{users.filter((u) => u.isActive).length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-500">Inaktive</p>
            <p className="text-2xl font-bold text-gray-400">{users.filter((u) => !u.isActive).length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-500">Admins</p>
            <p className="text-2xl font-bold">{users.filter((u) => u.role === "SUPER_ADMIN" || u.role === "ADMIN").length}</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input placeholder="Søk etter navn eller e-post..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
            </div>
            <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)} className="w-48 h-10 px-3 border border-gray-300 rounded-md bg-white text-sm">
              <option value="">Alle roller</option>
              {roleOptions.map((r) => <option key={r.value} value={r.value}>{r.label}</option>)}
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Bruker</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rolle</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Siste innlogging</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Handlinger</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className={`hover:bg-gray-50 ${!user.isActive ? "opacity-60" : ""}`}>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-medium">{user.name.split(" ").map((n) => n[0]).join("")}</span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{user.name}</p>
                          <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">{getRoleBadge(user.role)}</td>
                    <td className="px-6 py-4">
                      <button onClick={() => handleToggleActive(user.id)} className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${user.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}>
                        {user.isActive ? "Aktiv" : "Inaktiv"}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {user.lastLoginAt ? user.lastLoginAt.toLocaleString("nb-NO") : "Aldri"}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end space-x-2">
                        <Button variant="ghost" size="sm" onClick={() => handleResetPassword(user.id)} title="Tilbakestill passord">
                          <Key className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleEdit(user)} title="Rediger">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => setShowDeleteConfirm(user.id)} className="text-red-600" title="Slett">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Ingen brukere funnet</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Role Descriptions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center"><Shield className="w-5 h-5 mr-2" />Rollebeskrivelser</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {roleOptions.map((role) => (
              <div key={role.value} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-2 mb-1">{getRoleBadge(role.value)}</div>
                <p className="text-sm text-gray-500">{role.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <CardTitle>{editingUser ? "Rediger bruker" : "Ny bruker"}</CardTitle>
                <Button variant="ghost" size="sm" onClick={() => setShowModal(false)}><X className="w-5 h-5" /></Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Navn *</label>
                <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">E-post *</label>
                <Input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Telefon</label>
                <Input value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rolle</label>
                <select value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value as UserRole })} className="w-full h-10 px-3 border border-gray-300 rounded-md bg-white text-sm">
                  {roleOptions.map((r) => <option key={r.value} value={r.value}>{r.label}</option>)}
                </select>
              </div>

              {!editingUser && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Passord *</label>
                    <div className="relative">
                      <Input type={showPassword ? "text" : "password"} value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        {showPassword ? <EyeOff className="w-4 h-4 text-gray-400" /> : <Eye className="w-4 h-4 text-gray-400" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bekreft passord *</label>
                    <Input type="password" value={formData.confirmPassword} onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })} />
                  </div>
                </>
              )}

              <div className="flex items-center space-x-2">
                <input type="checkbox" id="isActive" checked={formData.isActive} onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })} className="rounded border-gray-300" />
                <label htmlFor="isActive" className="text-sm text-gray-700">Aktiv bruker</label>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <Button variant="outline" onClick={() => setShowModal(false)}>Avbryt</Button>
                <Button onClick={handleSave}>{editingUser ? "Lagre endringer" : "Opprett bruker"}</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Delete Confirmation */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader className="border-b"><CardTitle className="text-red-600">Bekreft sletting</CardTitle></CardHeader>
            <CardContent className="pt-6 space-y-4">
              <p className="text-gray-600">Er du sikker på at du vil slette denne brukeren?</p>
              <div className="flex justify-end space-x-3">
                <Button variant="outline" onClick={() => setShowDeleteConfirm(null)}>Avbryt</Button>
                <Button variant="destructive" onClick={() => handleDelete(showDeleteConfirm)}>Slett</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
