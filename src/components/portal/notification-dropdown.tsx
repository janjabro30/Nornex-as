"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Bell,
  Package,
  Truck,
  Wrench,
  FileText,
  Calendar,
  MessageSquare,
  Check,
  X,
  Filter,
} from "lucide-react";
import { useAuthStore } from "@/store";
import type { NotificationType, PortalNotification } from "@/types/portal";
import { cn } from "@/lib/utils";

const notificationIcons: Record<NotificationType, React.ComponentType<{ className?: string }>> = {
  ORDER: Package,
  SHIPPING: Truck,
  REPAIR: Wrench,
  INVOICE: FileText,
  CONTRACT: Calendar,
  SUPPORT: MessageSquare,
  SYSTEM: Bell,
};

const notificationColors: Record<NotificationType, string> = {
  ORDER: "bg-blue-100 text-blue-600",
  SHIPPING: "bg-purple-100 text-purple-600",
  REPAIR: "bg-orange-100 text-orange-600",
  INVOICE: "bg-green-100 text-green-600",
  CONTRACT: "bg-yellow-100 text-yellow-600",
  SUPPORT: "bg-pink-100 text-pink-600",
  SYSTEM: "bg-gray-100 text-gray-600",
};

interface NotificationDropdownProps {
  className?: string;
}

export function NotificationDropdown({ className }: NotificationDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState<NotificationType | "ALL">("ALL");
  
  const {
    notifications,
    unreadCount,
    markNotificationRead,
    markAllNotificationsRead,
    removeNotification,
  } = useAuthStore();

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "Akkurat nå";
    if (minutes < 60) return `${minutes} min siden`;
    if (hours < 24) return `${hours} time${hours > 1 ? "r" : ""} siden`;
    return `${days} dag${days > 1 ? "er" : ""} siden`;
  };

  const filteredNotifications = filter === "ALL"
    ? notifications
    : notifications.filter((n) => n.type === filter);

  const filterOptions: { value: NotificationType | "ALL"; label: string }[] = [
    { value: "ALL", label: "Alle" },
    { value: "ORDER", label: "Ordrer" },
    { value: "SHIPPING", label: "Levering" },
    { value: "REPAIR", label: "Reparasjon" },
    { value: "INVOICE", label: "Faktura" },
    { value: "CONTRACT", label: "Kontrakt" },
    { value: "SUPPORT", label: "Støtte" },
  ];

  return (
    <div className={cn("relative", className)}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 hover:bg-gray-100 rounded-full transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
        aria-label={`Varsler${unreadCount > 0 ? ` (${unreadCount} ulest)` : ""}`}
      >
        <Bell className="w-5 h-5 text-gray-600" />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-xs rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full mt-2 w-96 max-w-[calc(100vw-2rem)] bg-white rounded-xl shadow-xl border border-gray-200 z-50 overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900">Varsler</h3>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllNotificationsRead}
                    className="text-sm text-green-600 hover:text-green-700"
                  >
                    Merk alle som lest
                  </button>
                )}
              </div>

              {/* Filter */}
              <div className="flex gap-2 overflow-x-auto pb-1 -mb-1">
                <Filter className="w-4 h-4 text-gray-400 flex-shrink-0 mt-1" />
                {filterOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setFilter(option.value)}
                    className={cn(
                      "px-2 py-1 text-xs rounded-full whitespace-nowrap transition-colors",
                      filter === option.value
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    )}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Notifications List */}
            <div className="max-h-96 overflow-y-auto">
              {filteredNotifications.length === 0 ? (
                <div className="p-8 text-center">
                  <Bell className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">Ingen varsler</p>
                </div>
              ) : (
                <ul>
                  {filteredNotifications.map((notification) => (
                    <NotificationItem
                      key={notification.id}
                      notification={notification}
                      onMarkRead={() => markNotificationRead(notification.id)}
                      onRemove={() => removeNotification(notification.id)}
                      formatTimeAgo={formatTimeAgo}
                      onClick={() => setIsOpen(false)}
                    />
                  ))}
                </ul>
              )}
            </div>

            {/* Footer */}
            <div className="p-3 border-t border-gray-100 bg-gray-50">
              <Link
                href="/my-portal/notifications"
                onClick={() => setIsOpen(false)}
                className="block text-center text-sm text-green-600 hover:text-green-700"
              >
                Se alle varsler
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

interface NotificationItemProps {
  notification: PortalNotification;
  onMarkRead: () => void;
  onRemove: () => void;
  formatTimeAgo: (date: Date) => string;
  onClick: () => void;
}

function NotificationItem({
  notification,
  onMarkRead,
  onRemove,
  formatTimeAgo,
  onClick,
}: NotificationItemProps) {
  const Icon = notificationIcons[notification.type];
  const colorClass = notificationColors[notification.type];

  return (
    <li
      className={cn(
        "relative border-b border-gray-50 last:border-0",
        !notification.isRead && "bg-blue-50/50"
      )}
    >
      <Link
        href={notification.link || "#"}
        onClick={() => {
          onMarkRead();
          onClick();
        }}
        className="flex gap-3 p-4 hover:bg-gray-50 transition-colors"
      >
        <div className={cn("w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0", colorClass)}>
          <Icon className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <p className={cn("text-sm", !notification.isRead && "font-medium")}>
            {notification.title}
          </p>
          <p className="text-sm text-gray-500 line-clamp-2">
            {notification.message}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            {formatTimeAgo(notification.createdAt)}
          </p>
        </div>
        {!notification.isRead && (
          <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2" />
        )}
      </Link>
      <div className="absolute top-2 right-2 flex gap-1">
        {!notification.isRead && (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onMarkRead();
            }}
            className="p-1 hover:bg-gray-200 rounded"
            title="Merk som lest"
          >
            <Check className="w-4 h-4 text-gray-400" />
          </button>
        )}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onRemove();
          }}
          className="p-1 hover:bg-gray-200 rounded"
          title="Fjern"
        >
          <X className="w-4 h-4 text-gray-400" />
        </button>
      </div>
    </li>
  );
}
