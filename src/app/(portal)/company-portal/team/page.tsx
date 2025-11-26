"use client";

import React, { useState } from "react";
import {
  Users,
  Search,
  Plus,
  Mail,
  Shield,
  Clock,
  MoreVertical,
  Edit2,
  Trash2,
  UserCheck,
  UserX,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { mockTeamMembers } from "@/lib/portal-data";
import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";
import type { TeamRole } from "@/types/portal";

const roleLabels: Record<TeamRole, { label: string; color: string }> = {
  OWNER: { label: "Eier", color: "bg-purple-100 text-purple-700" },
  ADMIN: { label: "Administrator", color: "bg-red-100 text-red-700" },
  MANAGER: { label: "Leder", color: "bg-blue-100 text-blue-700" },
  MEMBER: { label: "Medlem", color: "bg-green-100 text-green-700" },
  VIEWER: { label: "Leser", color: "bg-gray-100 text-gray-700" },
};

export default function TeamPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showInviteModal, setShowInviteModal] = useState(false);

  const filteredMembers = mockTeamMembers.filter((member) =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.department?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeCount = mockTeamMembers.filter((m) => m.isActive).length;
  const inactiveCount = mockTeamMembers.filter((m) => !m.isActive).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Team & Tilganger</h1>
          <p className="text-gray-500 mt-1">Administrer teammedlemmer og tilgangsrettigheter</p>
        </div>
        <Button onClick={() => setShowInviteModal(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Inviter medlem
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="py-4 text-center">
            <p className="text-2xl font-bold text-gray-900">{mockTeamMembers.length}</p>
            <p className="text-sm text-gray-500">Totalt</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="py-4 text-center">
            <p className="text-2xl font-bold text-green-600">{activeCount}</p>
            <p className="text-sm text-gray-500">Aktive</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="py-4 text-center">
            <p className="text-2xl font-bold text-gray-400">{inactiveCount}</p>
            <p className="text-sm text-gray-500">Inaktive</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Søk etter navn, e-post eller avdeling..."
          className="pl-10"
        />
      </div>

      {/* Team Members List */}
      <Card>
        <CardHeader className="pb-0">
          <CardTitle className="text-lg">Teammedlemmer ({filteredMembers.length})</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          {filteredMembers.length === 0 ? (
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Ingen medlemmer funnet</h3>
              <p className="text-gray-500">Prøv å endre søkeord</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredMembers.map((member) => (
                <div
                  key={member.id}
                  className={cn(
                    "flex items-center gap-4 p-4 rounded-lg border transition-colors",
                    member.isActive
                      ? "border-gray-200 hover:bg-gray-50"
                      : "border-gray-100 bg-gray-50 opacity-75"
                  )}
                >
                  {/* Avatar */}
                  <div className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center text-lg font-semibold",
                    member.isActive ? "bg-blue-100 text-blue-700" : "bg-gray-200 text-gray-500"
                  )}>
                    {member.name.split(" ").map((n) => n[0]).join("")}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-gray-900">{member.name}</p>
                      {!member.isActive && (
                        <span className="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full">
                          Inaktiv
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Mail className="w-3 h-3" />
                        {member.email}
                      </span>
                      {member.department && (
                        <span>{member.department}</span>
                      )}
                    </div>
                  </div>

                  {/* Role Badge */}
                  <div className={cn(
                    "px-3 py-1 rounded-full text-xs font-medium",
                    roleLabels[member.role].color
                  )}>
                    {roleLabels[member.role].label}
                  </div>

                  {/* Last Login */}
                  <div className="hidden sm:flex items-center gap-1 text-sm text-gray-400">
                    <Clock className="w-4 h-4" />
                    {member.lastLogin ? formatDate(member.lastLogin) : "Aldri"}
                  </div>

                  {/* Actions */}
                  <div className="relative group">
                    <button className="p-2 hover:bg-gray-100 rounded-lg">
                      <MoreVertical className="w-4 h-4 text-gray-400" />
                    </button>
                    <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-1 hidden group-hover:block z-10">
                      <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                        <Edit2 className="w-4 h-4" />
                        Rediger
                      </button>
                      <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                        <Shield className="w-4 h-4" />
                        Endre rolle
                      </button>
                      {member.isActive ? (
                        <button className="w-full px-4 py-2 text-left text-sm text-yellow-600 hover:bg-yellow-50 flex items-center gap-2">
                          <UserX className="w-4 h-4" />
                          Deaktiver
                        </button>
                      ) : (
                        <button className="w-full px-4 py-2 text-left text-sm text-green-600 hover:bg-green-50 flex items-center gap-2">
                          <UserCheck className="w-4 h-4" />
                          Aktiver
                        </button>
                      )}
                      <button className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2">
                        <Trash2 className="w-4 h-4" />
                        Fjern
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Role Legend */}
      <Card className="bg-gray-50">
        <CardContent className="py-4">
          <h4 className="font-medium text-gray-900 mb-3">Rollebeskrivelser</h4>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {Object.entries(roleLabels).map(([role, { label, color }]) => (
              <div key={role} className="flex items-center gap-2">
                <span className={cn("px-2 py-0.5 rounded-full text-xs font-medium", color)}>
                  {label}
                </span>
                <span className="text-sm text-gray-500">
                  {role === "OWNER" && "Full tilgang"}
                  {role === "ADMIN" && "Administrere brukere"}
                  {role === "MANAGER" && "Administrere avdeling"}
                  {role === "MEMBER" && "Standard tilgang"}
                  {role === "VIEWER" && "Kun lesetilgang"}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Invite Modal Placeholder */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md mx-4">
            <CardHeader>
              <CardTitle>Inviter nytt medlem</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">E-post</label>
                <Input placeholder="kollega@bedrift.no" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rolle</label>
                <select className="w-full h-10 rounded-md border border-gray-300 px-3 text-sm">
                  <option value="MEMBER">Medlem</option>
                  <option value="MANAGER">Leder</option>
                  <option value="ADMIN">Administrator</option>
                </select>
              </div>
              <div className="flex gap-3 pt-2">
                <Button variant="outline" onClick={() => setShowInviteModal(false)} className="flex-1">
                  Avbryt
                </Button>
                <Button className="flex-1">
                  Send invitasjon
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
