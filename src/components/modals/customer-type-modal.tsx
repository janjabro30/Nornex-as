"use client";

import React, { useState, useEffect } from "react";
import { User, Building2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/store";

export function CustomerTypeModal() {
  const [isVisible, setIsVisible] = useState(false);
  const { language, setCustomerType, customerType } = useAppStore();

  useEffect(() => {
    // Check if user has already selected customer type
    const storedType = localStorage.getItem("nornex-customer-type");
    if (storedType) {
      // Sync localStorage value with Zustand store
      if (storedType === "private" || storedType === "business") {
        setCustomerType(storedType);
      }
    } else {
      // Small delay to prevent flash on page load
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [setCustomerType]);

  const selectType = (type: "private" | "business") => {
    localStorage.setItem("nornex-customer-type", type);
    setCustomerType(type);
    setIsVisible(false);
  };

  const handleClose = () => {
    // Default to private if user closes without selecting
    selectType("private");
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-2">
            {language === "no" ? "Velkommen til Nornex" : "Welcome to Nornex"}
          </h2>
          <p className="text-green-100">
            {language === "no"
              ? "Velg kundetype for å se riktige priser"
              : "Select customer type to see the right prices"}
          </p>
        </div>

        {/* Options */}
        <div className="p-6">
          <p className="text-sm text-gray-600 text-center mb-6">
            {language === "no"
              ? "Dette valget påvirker hvordan priser vises på nettstedet. Du kan endre dette når som helst."
              : "This choice affects how prices are displayed on the website. You can change this at any time."}
          </p>

          <div className="grid grid-cols-2 gap-4">
            {/* Private Customer */}
            <button
              onClick={() => selectType("private")}
              className="flex flex-col items-center p-6 border-2 border-gray-200 rounded-xl hover:border-green-500 hover:bg-green-50 transition-all group"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                <User className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">
                {language === "no" ? "Privatkunde" : "Private Customer"}
              </h3>
              <p className="text-sm text-gray-500 text-center">
                {language === "no" ? "Priser inkl. MVA" : "Prices incl. VAT"}
              </p>
              <span className="mt-3 text-xs text-gray-400">
                {language === "no" ? "(+25% mva)" : "(+25% VAT)"}
              </span>
            </button>

            {/* Business Customer */}
            <button
              onClick={() => selectType("business")}
              className="flex flex-col items-center p-6 border-2 border-gray-200 rounded-xl hover:border-green-500 hover:bg-green-50 transition-all group"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
                <Building2 className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">
                {language === "no" ? "Bedriftskunde" : "Business Customer"}
              </h3>
              <p className="text-sm text-gray-500 text-center">
                {language === "no" ? "Priser eks. MVA" : "Prices excl. VAT"}
              </p>
              <span className="mt-3 text-xs text-gray-400">
                {language === "no" ? "(faktura)" : "(invoice)"}
              </span>
            </button>
          </div>

          <p className="text-xs text-gray-400 text-center mt-6">
            {language === "no"
              ? "Du kan endre kundetype senere via innstillinger i menyen."
              : "You can change customer type later via settings in the menu."}
          </p>
        </div>
      </div>
    </div>
  );
}
