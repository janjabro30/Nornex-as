"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Cookie, X, Settings, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/store";

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true, // Always required
    analytics: false,
    marketing: false,
  });
  const { language } = useAppStore();

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem("nornex-cookie-consent");
    if (!consent) {
      // Small delay to prevent flash on page load
      const timer = setTimeout(() => setIsVisible(true), 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem("nornex-cookie-consent", JSON.stringify(allAccepted));
    setIsVisible(false);
  };

  const acceptSelected = () => {
    const selected = {
      ...preferences,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem("nornex-cookie-consent", JSON.stringify(selected));
    setIsVisible(false);
  };

  const rejectAll = () => {
    const onlyNecessary = {
      necessary: true,
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem("nornex-cookie-consent", JSON.stringify(onlyNecessary));
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden">
        {!showSettings ? (
          // Main Banner
          <div className="p-6">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Cookie className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {language === "no" ? "Vi bruker informasjonskapsler" : "We use cookies"}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {language === "no"
                    ? "Vi bruker informasjonskapsler for å forbedre din opplevelse på nettstedet vårt, analysere trafikk og vise relevante annonser. Du kan velge hvilke typer informasjonskapsler du godtar."
                    : "We use cookies to improve your experience on our website, analyze traffic and show relevant ads. You can choose which types of cookies you accept."}
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button onClick={acceptAll} className="bg-green-600 hover:bg-green-700">
                    <Check className="w-4 h-4 mr-2" />
                    {language === "no" ? "Godta alle" : "Accept all"}
                  </Button>
                  <Button variant="outline" onClick={() => setShowSettings(true)}>
                    <Settings className="w-4 h-4 mr-2" />
                    {language === "no" ? "Tilpass valg" : "Customize"}
                  </Button>
                  <Button variant="ghost" onClick={rejectAll}>
                    {language === "no" ? "Kun nødvendige" : "Only necessary"}
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-4">
                  {language === "no" ? "Les mer i vår " : "Read more in our "}
                  <Link href="/privacy-policy" className="text-green-600 hover:underline">
                    {language === "no" ? "personvernerklæring" : "privacy policy"}
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        ) : (
          // Settings Panel
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {language === "no" ? "Informasjonskapselinnstillinger" : "Cookie Settings"}
              </h3>
              <button
                onClick={() => setShowSettings(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 mb-6">
              {/* Necessary Cookies */}
              <div className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">
                    {language === "no" ? "Nødvendige" : "Necessary"}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {language === "no"
                      ? "Kreves for at nettsiden skal fungere (handlekurv, innlogging)"
                      : "Required for the website to function (cart, login)"}
                  </p>
                </div>
                <div className="flex items-center">
                  <span className="text-sm text-gray-500 mr-2">
                    {language === "no" ? "Alltid på" : "Always on"}
                  </span>
                  <div className="w-10 h-6 bg-green-600 rounded-full flex items-center justify-end px-1">
                    <div className="w-4 h-4 bg-white rounded-full" />
                  </div>
                </div>
              </div>

              {/* Analytics Cookies */}
              <div className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">
                    {language === "no" ? "Analytiske" : "Analytics"}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {language === "no"
                      ? "Hjelper oss å forstå hvordan besøkende bruker nettsiden"
                      : "Helps us understand how visitors use the website"}
                  </p>
                </div>
                <button
                  onClick={() =>
                    setPreferences((prev) => ({ ...prev, analytics: !prev.analytics }))
                  }
                  className={`w-10 h-6 rounded-full flex items-center px-1 transition-colors ${
                    preferences.analytics ? "bg-green-600 justify-end" : "bg-gray-300 justify-start"
                  }`}
                >
                  <div className="w-4 h-4 bg-white rounded-full" />
                </button>
              </div>

              {/* Marketing Cookies */}
              <div className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">
                    {language === "no" ? "Markedsføring" : "Marketing"}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {language === "no"
                      ? "Brukes til å vise relevante annonser basert på dine interesser"
                      : "Used to show relevant ads based on your interests"}
                  </p>
                </div>
                <button
                  onClick={() =>
                    setPreferences((prev) => ({ ...prev, marketing: !prev.marketing }))
                  }
                  className={`w-10 h-6 rounded-full flex items-center px-1 transition-colors ${
                    preferences.marketing ? "bg-green-600 justify-end" : "bg-gray-300 justify-start"
                  }`}
                >
                  <div className="w-4 h-4 bg-white rounded-full" />
                </button>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setShowSettings(false)}>
                {language === "no" ? "Avbryt" : "Cancel"}
              </Button>
              <Button onClick={acceptSelected} className="bg-green-600 hover:bg-green-700">
                {language === "no" ? "Lagre valg" : "Save preferences"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
