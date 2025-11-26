"use client";

import React, { useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Plus,
  Edit2,
  Trash2,
  Check,
  X,
  Home,
  Building,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/store";
import { cn } from "@/lib/utils";

export default function ProfilePage() {
  const { user, updateUser, addAddress, updateAddress, removeAddress, setDefaultAddress } = useAuthStore();

  const [isEditingInfo, setIsEditingInfo] = useState(false);
  const [editedInfo, setEditedInfo] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });

  const [showAddAddress, setShowAddAddress] = useState(false);
  const [newAddress, setNewAddress] = useState({
    type: "shipping" as "shipping" | "billing",
    label: "",
    street: "",
    city: "",
    postalCode: "",
    country: "Norge",
  });

  const handleSaveInfo = () => {
    updateUser({
      firstName: editedInfo.firstName,
      lastName: editedInfo.lastName,
      phone: editedInfo.phone,
    });
    setIsEditingInfo(false);
  };

  const handleAddAddress = () => {
    if (!newAddress.street || !newAddress.city || !newAddress.postalCode) return;

    addAddress({
      id: `addr-${Date.now()}`,
      ...newAddress,
      isDefault: (user?.addresses?.filter((a) => a.type === newAddress.type).length || 0) === 0,
    });

    setNewAddress({
      type: "shipping",
      label: "",
      street: "",
      city: "",
      postalCode: "",
      country: "Norge",
    });
    setShowAddAddress(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Min profil</h1>
        <p className="text-gray-500 mt-1">Administrer din personlige informasjon</p>
      </div>

      {/* Personal Information */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                <User className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <CardTitle className="text-lg">Personlig informasjon</CardTitle>
                <CardDescription>Din kontoinformasjon</CardDescription>
              </div>
            </div>
            {!isEditingInfo && (
              <Button variant="outline" size="sm" onClick={() => setIsEditingInfo(true)}>
                <Edit2 className="w-4 h-4 mr-2" />
                Rediger
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {isEditingInfo ? (
            <div className="space-y-4 max-w-md">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fornavn</label>
                  <Input
                    value={editedInfo.firstName}
                    onChange={(e) => setEditedInfo({ ...editedInfo, firstName: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Etternavn</label>
                  <Input
                    value={editedInfo.lastName}
                    onChange={(e) => setEditedInfo({ ...editedInfo, lastName: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">E-post</label>
                <Input value={editedInfo.email} disabled className="bg-gray-50" />
                <p className="text-xs text-gray-500 mt-1">Kontakt support for å endre e-post</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Telefon</label>
                <Input
                  value={editedInfo.phone}
                  onChange={(e) => setEditedInfo({ ...editedInfo, phone: e.target.value })}
                  placeholder="+47 123 45 678"
                />
              </div>
              <div className="flex gap-3">
                <Button onClick={handleSaveInfo}>
                  <Check className="w-4 h-4 mr-2" />
                  Lagre
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsEditingInfo(false);
                    setEditedInfo({
                      firstName: user?.firstName || "",
                      lastName: user?.lastName || "",
                      email: user?.email || "",
                      phone: user?.phone || "",
                    });
                  }}
                >
                  <X className="w-4 h-4 mr-2" />
                  Avbryt
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                  <span className="text-2xl font-bold text-green-600">
                    {user?.firstName?.[0]}{user?.lastName?.[0]}
                  </span>
                </div>
                <div>
                  <p className="text-xl font-semibold text-gray-900">
                    {user?.firstName} {user?.lastName}
                  </p>
                  <p className="text-gray-500">Privatkunde</p>
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">E-post</p>
                    <p className="text-sm font-medium">{user?.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Telefon</p>
                    <p className="text-sm font-medium">{user?.phone || "Ikke oppgitt"}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Addresses */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <CardTitle className="text-lg">Adresser</CardTitle>
                <CardDescription>Leverings- og fakturaadresser</CardDescription>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={() => setShowAddAddress(!showAddAddress)}>
              <Plus className="w-4 h-4 mr-2" />
              Legg til
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Add Address Form */}
          {showAddAddress && (
            <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
              <h4 className="font-medium text-gray-900 mb-4">Ny adresse</h4>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <button
                    onClick={() => setNewAddress({ ...newAddress, type: "shipping" })}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors",
                      newAddress.type === "shipping"
                        ? "border-green-500 bg-green-50 text-green-700"
                        : "border-gray-200 hover:bg-gray-100"
                    )}
                  >
                    <Home className="w-4 h-4" />
                    Levering
                  </button>
                  <button
                    onClick={() => setNewAddress({ ...newAddress, type: "billing" })}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors",
                      newAddress.type === "billing"
                        ? "border-green-500 bg-green-50 text-green-700"
                        : "border-gray-200 hover:bg-gray-100"
                    )}
                  >
                    <Building className="w-4 h-4" />
                    Faktura
                  </button>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Navn på adresse (valgfritt)
                  </label>
                  <Input
                    value={newAddress.label}
                    onChange={(e) => setNewAddress({ ...newAddress, label: e.target.value })}
                    placeholder="F.eks. Hjemme, Jobb"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Gateadresse *</label>
                  <Input
                    value={newAddress.street}
                    onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
                    placeholder="Storgata 1"
                  />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Postnr. *</label>
                    <Input
                      value={newAddress.postalCode}
                      onChange={(e) => setNewAddress({ ...newAddress, postalCode: e.target.value })}
                      placeholder="0001"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Sted *</label>
                    <Input
                      value={newAddress.city}
                      onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                      placeholder="Oslo"
                    />
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button onClick={handleAddAddress}>
                    <Plus className="w-4 h-4 mr-2" />
                    Legg til adresse
                  </Button>
                  <Button variant="outline" onClick={() => setShowAddAddress(false)}>
                    Avbryt
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Address List */}
          {(!user?.addresses || user.addresses.length === 0) && !showAddAddress ? (
            <div className="text-center py-8">
              <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">Ingen adresser lagt til</p>
              <Button variant="link" onClick={() => setShowAddAddress(true)}>
                Legg til din første adresse
              </Button>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {user?.addresses?.map((address) => (
                <div
                  key={address.id}
                  className={cn(
                    "p-4 rounded-lg border-2 transition-colors relative",
                    address.isDefault ? "border-green-500 bg-green-50" : "border-gray-200"
                  )}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {address.type === "shipping" ? (
                        <Home className="w-4 h-4 text-gray-500" />
                      ) : (
                        <Building className="w-4 h-4 text-gray-500" />
                      )}
                      <span className="text-xs font-medium text-gray-500 uppercase">
                        {address.type === "shipping" ? "Levering" : "Faktura"}
                      </span>
                      {address.isDefault && (
                        <span className="text-xs bg-green-200 text-green-800 px-2 py-0.5 rounded-full">
                          Standard
                        </span>
                      )}
                    </div>
                    <div className="flex gap-1">
                      {!address.isDefault && (
                        <button
                          onClick={() => setDefaultAddress(address.id, address.type)}
                          className="p-1 text-gray-400 hover:text-green-600"
                          title="Sett som standard"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => removeAddress(address.id)}
                        className="p-1 text-gray-400 hover:text-red-600"
                        title="Fjern"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  {address.label && (
                    <p className="font-medium text-gray-900 mb-1">{address.label}</p>
                  )}
                  <p className="text-sm text-gray-600">{address.street}</p>
                  <p className="text-sm text-gray-600">
                    {address.postalCode} {address.city}
                  </p>
                  <p className="text-sm text-gray-500">{address.country}</p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Communication Preferences */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
              <Mail className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <CardTitle className="text-lg">Kommunikasjonspreferanser</CardTitle>
              <CardDescription>Velg hvordan du ønsker å motta varsler</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { id: "email_orders", label: "Ordrebekreftelser", description: "Motta e-post når du legger inn ordrer", checked: true },
              { id: "email_shipping", label: "Fraktvarsler", description: "Motta varsler når ordrer sendes", checked: true },
              { id: "email_promotions", label: "Tilbud og nyheter", description: "Motta informasjon om kampanjer", checked: false },
              { id: "sms_notifications", label: "SMS-varsler", description: "Motta viktige varsler på SMS", checked: false },
            ].map((pref) => (
              <label
                key={pref.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50"
              >
                <div>
                  <p className="font-medium text-gray-900">{pref.label}</p>
                  <p className="text-sm text-gray-500">{pref.description}</p>
                </div>
                <input
                  type="checkbox"
                  defaultChecked={pref.checked}
                  className="w-5 h-5 rounded border-gray-300 text-green-600 focus:ring-green-500"
                />
              </label>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
