"use client";

import React from "react";
import { Check, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Benefit {
  title: string;
  description?: string;
  icon?: LucideIcon;
}

export interface BenefitsSectionProps {
  title?: string;
  benefits: Benefit[];
  variant?: "default" | "checkmark" | "icon";
  backgroundColor?: "light-blue" | "white" | "gray" | "green";
  columns?: 1 | 2 | 3;
  className?: string;
}

export function BenefitsSection({
  title = "Fordeler",
  benefits,
  variant = "checkmark",
  backgroundColor = "light-blue",
  columns = 2,
  className,
}: BenefitsSectionProps) {
  const bgColors = {
    "light-blue": "bg-blue-50",
    white: "bg-white",
    gray: "bg-gray-50",
    green: "bg-green-50",
  };

  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  };

  return (
    <div className={cn("rounded-2xl p-6 md:p-8", bgColors[backgroundColor], className)}>
      {title && (
        <h3 className="text-lg font-semibold text-gray-900 mb-6">{title}</h3>
      )}
      
      <div className={cn("grid gap-4", gridCols[columns])}>
        {benefits.map((benefit, index) => (
          <BenefitItem key={index} benefit={benefit} variant={variant} />
        ))}
      </div>
    </div>
  );
}

interface BenefitItemProps {
  benefit: Benefit;
  variant: "default" | "checkmark" | "icon";
}

function BenefitItem({ benefit, variant }: BenefitItemProps) {
  const Icon = benefit.icon;

  if (variant === "icon" && Icon) {
    return (
      <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm">
        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
          <Icon className="w-5 h-5 text-green-600" />
        </div>
        <div>
          <h4 className="font-medium text-gray-900 mb-1">{benefit.title}</h4>
          {benefit.description && (
            <p className="text-sm text-gray-600">{benefit.description}</p>
          )}
        </div>
      </div>
    );
  }

  if (variant === "checkmark") {
    return (
      <div className="flex items-start gap-3">
        <div className="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
          <Check className="w-3 h-3 text-white" />
        </div>
        <div>
          <span className="text-gray-800 font-medium">{benefit.title}</span>
          {benefit.description && (
            <p className="text-sm text-gray-600 mt-0.5">{benefit.description}</p>
          )}
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <div className="flex items-start gap-3">
      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
      <div>
        <span className="text-gray-800">{benefit.title}</span>
        {benefit.description && (
          <p className="text-sm text-gray-500 mt-0.5">{benefit.description}</p>
        )}
      </div>
    </div>
  );
}

// Sidebar benefit panel for forms
export interface SidebarBenefitsProps {
  title: string;
  benefits: {
    icon: LucideIcon;
    title: string;
    description: string;
  }[];
  className?: string;
}

export function SidebarBenefits({ title, benefits, className }: SidebarBenefitsProps) {
  return (
    <div className={cn("bg-gray-50 rounded-xl p-6", className)}>
      <h4 className="font-semibold text-gray-900 mb-4">{title}</h4>
      <div className="space-y-4">
        {benefits.map((benefit, index) => {
          const Icon = benefit.icon;
          return (
            <div key={index} className="flex items-start gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h5 className="font-medium text-gray-900 text-sm">{benefit.title}</h5>
                <p className="text-xs text-gray-600 mt-0.5">{benefit.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Summary panel for forms
export interface SummarySectionProps {
  title: string;
  items: { label: string; value: string | number }[];
  className?: string;
}

export function SummarySection({ title, items, className }: SummarySectionProps) {
  return (
    <div className={cn("bg-white border border-gray-200 rounded-xl p-6", className)}>
      <h4 className="font-semibold text-gray-900 mb-4">{title}</h4>
      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={index} className="flex justify-between text-sm">
            <span className="text-gray-600">{item.label}</span>
            <span className="font-medium text-gray-900">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Warranty info panel
export interface WarrantyInfoProps {
  title: string;
  items: {
    icon: LucideIcon;
    title: string;
    description: string;
  }[];
  linkText?: string;
  linkHref?: string;
  className?: string;
}

export function WarrantyInfo({
  title,
  items,
  linkText,
  linkHref,
  className,
}: WarrantyInfoProps) {
  return (
    <div className={cn("bg-green-50 rounded-xl p-6", className)}>
      <h4 className="font-semibold text-gray-900 mb-4">{title}</h4>
      <div className="space-y-4">
        {items.map((item, index) => {
          const Icon = item.icon;
          return (
            <div key={index} className="flex items-start gap-3">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon className="w-4 h-4 text-white" />
              </div>
              <div>
                <h5 className="font-medium text-gray-900 text-sm">{item.title}</h5>
                <p className="text-xs text-gray-600 mt-0.5">{item.description}</p>
              </div>
            </div>
          );
        })}
      </div>
      {linkText && linkHref && (
        <a
          href={linkHref}
          className="inline-block mt-4 text-sm text-green-600 hover:text-green-700 hover:underline"
        >
          {linkText} →
        </a>
      )}
    </div>
  );
}
