"use client";

import React, { useMemo } from "react";
import { Check, X, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface PasswordStrengthIndicatorProps {
  password: string;
  minLength?: number;
  className?: string;
}

interface PasswordRequirement {
  label: string;
  met: boolean;
}

export function PasswordStrengthIndicator({
  password,
  minLength = 12,
  className,
}: PasswordStrengthIndicatorProps) {
  const requirements: PasswordRequirement[] = useMemo(() => {
    return [
      { label: `Minst ${minLength} tegn`, met: password.length >= minLength },
      { label: "Minst én stor bokstav", met: /[A-Z]/.test(password) },
      { label: "Minst én liten bokstav", met: /[a-z]/.test(password) },
      { label: "Minst ett tall", met: /[0-9]/.test(password) },
      { label: "Minst ett spesialtegn (!@#$%^&*)", met: /[!@#$%^&*(),.?":{}|<>]/.test(password) },
    ];
  }, [password, minLength]);

  const metCount = requirements.filter((r) => r.met).length;
  const strength = metCount / requirements.length;

  const getStrengthLabel = () => {
    if (password.length === 0) return { label: "", color: "text-gray-400" };
    if (strength < 0.4) return { label: "Svakt", color: "text-red-500" };
    if (strength < 0.7) return { label: "Moderat", color: "text-yellow-500" };
    if (strength < 1) return { label: "Sterkt", color: "text-green-500" };
    return { label: "Utmerket", color: "text-green-600" };
  };

  const strengthInfo = getStrengthLabel();

  const getBarColor = (index: number) => {
    if (password.length === 0) return "bg-gray-200";
    const threshold = (index + 1) / 4;
    if (strength >= threshold) {
      if (strength < 0.4) return "bg-red-500";
      if (strength < 0.7) return "bg-yellow-500";
      return "bg-green-500";
    }
    return "bg-gray-200";
  };

  return (
    <div className={cn("space-y-3", className)}>
      {/* Strength Bar */}
      {password.length > 0 && (
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">Passordstyrke</span>
            <span className={cn("text-xs font-medium", strengthInfo.color)}>
              {strengthInfo.label}
            </span>
          </div>
          <div className="flex gap-1">
            {[0, 1, 2, 3].map((index) => (
              <div
                key={index}
                className={cn(
                  "h-1.5 flex-1 rounded-full transition-colors",
                  getBarColor(index)
                )}
              />
            ))}
          </div>
        </div>
      )}

      {/* Requirements List */}
      <div className="bg-gray-50 rounded-lg p-3">
        <p className="text-xs text-gray-600 font-medium mb-2 flex items-center gap-1">
          <AlertTriangle className="w-3 h-3" />
          Passordkrav
        </p>
        <ul className="space-y-1.5">
          {requirements.map((req, index) => (
            <li
              key={index}
              className={cn(
                "flex items-center gap-2 text-xs transition-colors",
                req.met ? "text-green-600" : "text-gray-500"
              )}
            >
              {req.met ? (
                <Check className="w-3.5 h-3.5" />
              ) : (
                <X className="w-3.5 h-3.5 text-gray-300" />
              )}
              {req.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
