"use client";

import React from "react";
import { cn } from "@/lib/utils";
import type { OrderStatus, RepairStatus, InvoiceStatus, TicketStatus, ContractStatus, FleetDeviceStatus, TradeInStatus } from "@/types/portal";

// Order Status Badge
const orderStatusConfig: Record<OrderStatus, { label: string; className: string }> = {
  PENDING: { label: "Venter", className: "bg-yellow-100 text-yellow-700" },
  CONFIRMED: { label: "Bekreftet", className: "bg-blue-100 text-blue-700" },
  PROCESSING: { label: "Behandles", className: "bg-indigo-100 text-indigo-700" },
  SHIPPED: { label: "Sendt", className: "bg-purple-100 text-purple-700" },
  DELIVERED: { label: "Levert", className: "bg-green-100 text-green-700" },
  CANCELLED: { label: "Kansellert", className: "bg-gray-100 text-gray-700" },
  REFUNDED: { label: "Refundert", className: "bg-red-100 text-red-700" },
};

// Repair Status Badge
const repairStatusConfig: Record<RepairStatus, { label: string; className: string }> = {
  RECEIVED: { label: "Mottatt", className: "bg-blue-100 text-blue-700" },
  DIAGNOSING: { label: "Diagnostisering", className: "bg-yellow-100 text-yellow-700" },
  AWAITING_APPROVAL: { label: "Venter godkjenning", className: "bg-orange-100 text-orange-700" },
  AWAITING_PARTS: { label: "Venter på deler", className: "bg-purple-100 text-purple-700" },
  IN_PROGRESS: { label: "Under arbeid", className: "bg-indigo-100 text-indigo-700" },
  TESTING: { label: "Testing", className: "bg-cyan-100 text-cyan-700" },
  COMPLETED: { label: "Fullført", className: "bg-green-100 text-green-700" },
  READY_FOR_PICKUP: { label: "Klar for henting", className: "bg-emerald-100 text-emerald-700" },
  DELIVERED: { label: "Levert", className: "bg-green-100 text-green-700" },
  CANCELLED: { label: "Kansellert", className: "bg-gray-100 text-gray-700" },
};

// Invoice Status Badge
const invoiceStatusConfig: Record<InvoiceStatus, { label: string; className: string }> = {
  PENDING: { label: "Ubetalt", className: "bg-yellow-100 text-yellow-700" },
  PAID: { label: "Betalt", className: "bg-green-100 text-green-700" },
  OVERDUE: { label: "Forfalt", className: "bg-red-100 text-red-700" },
  CANCELLED: { label: "Kansellert", className: "bg-gray-100 text-gray-700" },
};

// Ticket Status Badge
const ticketStatusConfig: Record<TicketStatus, { label: string; className: string }> = {
  OPEN: { label: "Åpen", className: "bg-blue-100 text-blue-700" },
  IN_PROGRESS: { label: "Under behandling", className: "bg-yellow-100 text-yellow-700" },
  AWAITING_RESPONSE: { label: "Venter svar", className: "bg-orange-100 text-orange-700" },
  RESOLVED: { label: "Løst", className: "bg-green-100 text-green-700" },
  CLOSED: { label: "Lukket", className: "bg-gray-100 text-gray-700" },
};

// Contract Status Badge
const contractStatusConfig: Record<ContractStatus, { label: string; className: string }> = {
  ACTIVE: { label: "Aktiv", className: "bg-green-100 text-green-700" },
  EXPIRING_SOON: { label: "Utløper snart", className: "bg-yellow-100 text-yellow-700" },
  EXPIRED: { label: "Utløpt", className: "bg-red-100 text-red-700" },
  CANCELLED: { label: "Kansellert", className: "bg-gray-100 text-gray-700" },
  PENDING: { label: "Venter", className: "bg-blue-100 text-blue-700" },
};

// Fleet Device Status Badge
const fleetStatusConfig: Record<FleetDeviceStatus, { label: string; className: string }> = {
  ACTIVE: { label: "Aktiv", className: "bg-green-100 text-green-700" },
  IN_REPAIR: { label: "Under reparasjon", className: "bg-yellow-100 text-yellow-700" },
  RETIRED: { label: "Utfaset", className: "bg-gray-100 text-gray-700" },
  LOST: { label: "Tapt", className: "bg-red-100 text-red-700" },
  AVAILABLE: { label: "Tilgjengelig", className: "bg-blue-100 text-blue-700" },
};

// Trade-in Status Badge
const tradeInStatusConfig: Record<TradeInStatus, { label: string; className: string }> = {
  QUOTE_REQUESTED: { label: "Tilbud forespurt", className: "bg-blue-100 text-blue-700" },
  QUOTE_SENT: { label: "Tilbud sendt", className: "bg-indigo-100 text-indigo-700" },
  ACCEPTED: { label: "Akseptert", className: "bg-green-100 text-green-700" },
  DEVICE_RECEIVED: { label: "Enhet mottatt", className: "bg-purple-100 text-purple-700" },
  INSPECTED: { label: "Inspisert", className: "bg-cyan-100 text-cyan-700" },
  PAYMENT_SENT: { label: "Betaling sendt", className: "bg-emerald-100 text-emerald-700" },
  COMPLETED: { label: "Fullført", className: "bg-green-100 text-green-700" },
  REJECTED: { label: "Avvist", className: "bg-red-100 text-red-700" },
  CANCELLED: { label: "Kansellert", className: "bg-gray-100 text-gray-700" },
};

type StatusType = 
  | { type: "order"; status: OrderStatus }
  | { type: "repair"; status: RepairStatus }
  | { type: "invoice"; status: InvoiceStatus }
  | { type: "ticket"; status: TicketStatus }
  | { type: "contract"; status: ContractStatus }
  | { type: "fleet"; status: FleetDeviceStatus }
  | { type: "tradein"; status: TradeInStatus };

interface StatusBadgeProps {
  statusType: StatusType;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function StatusBadge({ statusType, size = "md", className }: StatusBadgeProps) {
  let config: { label: string; className: string };

  switch (statusType.type) {
    case "order":
      config = orderStatusConfig[statusType.status];
      break;
    case "repair":
      config = repairStatusConfig[statusType.status];
      break;
    case "invoice":
      config = invoiceStatusConfig[statusType.status];
      break;
    case "ticket":
      config = ticketStatusConfig[statusType.status];
      break;
    case "contract":
      config = contractStatusConfig[statusType.status];
      break;
    case "fleet":
      config = fleetStatusConfig[statusType.status];
      break;
    case "tradein":
      config = tradeInStatusConfig[statusType.status];
      break;
  }

  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-2.5 py-1 text-xs",
    lg: "px-3 py-1.5 text-sm",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full font-medium",
        config.className,
        sizeClasses[size],
        className
      )}
    >
      {config.label}
    </span>
  );
}

// Contract Expiry Badge with color coding
interface ContractExpiryBadgeProps {
  daysUntilExpiry: number;
  className?: string;
}

export function ContractExpiryBadge({ daysUntilExpiry, className }: ContractExpiryBadgeProps) {
  let colorClass: string;
  let label: string;

  if (daysUntilExpiry <= 0) {
    colorClass = "bg-red-500 text-white";
    label = "Utløpt";
  } else if (daysUntilExpiry <= 30) {
    colorClass = "bg-red-500 text-white";
    label = `${daysUntilExpiry} dager`;
  } else if (daysUntilExpiry <= 60) {
    colorClass = "bg-yellow-500 text-white";
    label = `${daysUntilExpiry} dager`;
  } else if (daysUntilExpiry <= 90) {
    colorClass = "bg-green-500 text-white";
    label = `${daysUntilExpiry} dager`;
  } else {
    colorClass = "bg-gray-100 text-gray-600";
    label = `${daysUntilExpiry} dager`;
  }

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium",
        colorClass,
        className
      )}
    >
      {label}
    </span>
  );
}
