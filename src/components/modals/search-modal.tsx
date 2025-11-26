"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { Search, X, ArrowRight, Loader2, Server, Globe, Smartphone, Wrench, Package, FileText } from "lucide-react";
import { useAppStore } from "@/store";

interface SearchResult {
  type: "service" | "product" | "page" | "faq";
  title: string;
  description: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Mock search data - in production this would come from API
const mockSearchData: SearchResult[] = [
  // Services
  { type: "service", title: "Webutvikling", description: "Profesjonelle nettsider og webapplikasjoner", href: "/tjenester#web", icon: Globe },
  { type: "service", title: "App-utvikling", description: "Native og cross-platform mobilapper", href: "/tjenester#app", icon: Smartphone },
  { type: "service", title: "Managed IT", description: "Komplett IT-drift og support", href: "/tjenester#managed-it", icon: Server },
  { type: "service", title: "IT-sikkerhet", description: "Beskyttelse mot digitale trusler", href: "/tjenester#sikkerhet", icon: Server },
  { type: "service", title: "Skyløsninger", description: "Fleksible og skalerbare løsninger", href: "/tjenester#sky", icon: Server },
  { type: "service", title: "Reparasjon", description: "Profesjonell reparasjon av IT-utstyr", href: "/reparasjon", icon: Wrench },
  // Products
  { type: "product", title: "Laptop", description: "Business laptops og refurbished", href: "/nettbutikk?category=laptops", icon: Package },
  { type: "product", title: "Desktop PC", description: "Stasjonære datamaskiner", href: "/nettbutikk?category=desktops", icon: Package },
  { type: "product", title: "Monitorer", description: "Skjermer for kontor og hjemme", href: "/nettbutikk?category=monitors", icon: Package },
  // Pages
  { type: "page", title: "Om oss", description: "Lær mer om NORNEX AS", href: "/om-oss", icon: FileText },
  { type: "page", title: "Kontakt", description: "Ta kontakt med oss", href: "/kontakt", icon: FileText },
  { type: "page", title: "Priser", description: "Se våre priser", href: "/pricing", icon: FileText },
  { type: "page", title: "Personvern", description: "Personvernerklæring", href: "/personvern", icon: FileText },
  { type: "page", title: "Vilkår", description: "Kjøpsvilkår og betingelser", href: "/vilkar", icon: FileText },
  // FAQ
  { type: "faq", title: "Leveringstid", description: "Hvor lang tid tar levering?", href: "/frakt", icon: FileText },
  { type: "faq", title: "Returrett", description: "Hvordan returnerer jeg varer?", href: "/retur", icon: FileText },
  { type: "faq", title: "Garanti", description: "Hva dekker garantien?", href: "/garanti", icon: FileText },
];

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const { language } = useAppStore();

  // Group results by type
  const groupedResults = results.reduce((acc, result) => {
    if (!acc[result.type]) {
      acc[result.type] = [];
    }
    acc[result.type].push(result);
    return acc;
  }, {} as Record<string, SearchResult[]>);

  const typeLabels: Record<string, string> = {
    service: language === "no" ? "Tjenester" : "Services",
    product: language === "no" ? "Produkter" : "Products",
    page: language === "no" ? "Sider" : "Pages",
    faq: "FAQ",
  };

  // Debounced search
  const performSearch = useCallback((searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    
    // Simulate API call with debounce
    setTimeout(() => {
      const filteredResults = mockSearchData.filter(
        (item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setResults(filteredResults);
      setIsLoading(false);
      setSelectedIndex(0);
    }, 300);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      performSearch(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query, performSearch]);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
    if (!isOpen) {
      setQuery("");
      setResults([]);
    }
  }, [isOpen]);

  // Keyboard navigation
  const flatResults = Object.values(groupedResults).flat();
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.min(prev + 1, flatResults.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter" && flatResults[selectedIndex]) {
      window.location.href = flatResults[selectedIndex].href;
      onClose();
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center pt-20 sm:pt-32">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-2xl mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden animate-search-modal">
        {/* Search Input */}
        <div className="flex items-center gap-4 p-4 border-b border-gray-200">
          <Search className="w-6 h-6 text-gray-400 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={language === "no" ? "Søk etter tjenester, produkter, sider..." : "Search for services, products, pages..."}
            className="flex-1 text-lg outline-none placeholder:text-gray-400"
            aria-label={language === "no" ? "Søk" : "Search"}
          />
          {isLoading && <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />}
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label={language === "no" ? "Lukk" : "Close"}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto">
          {query && results.length === 0 && !isLoading && (
            <div className="p-8 text-center text-gray-500">
              <p className="text-lg font-medium">
                {language === "no" ? "Ingen resultater funnet" : "No results found"}
              </p>
              <p className="text-sm mt-1">
                {language === "no" ? "Prøv et annet søkeord" : "Try a different search term"}
              </p>
            </div>
          )}

          {Object.entries(groupedResults).map(([type, items]) => (
            <div key={type} className="border-b border-gray-100 last:border-0">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide px-4 pt-4 pb-2">
                {typeLabels[type] || type}
              </h3>
              <ul>
                {items.map((result, idx) => {
                  const globalIndex = flatResults.indexOf(result);
                  const isSelected = globalIndex === selectedIndex;
                  
                  return (
                    <li key={result.href + idx}>
                      <Link
                        href={result.href}
                        onClick={onClose}
                        className={`flex items-center gap-4 px-4 py-3 hover:bg-blue-50 transition-colors ${
                          isSelected ? "bg-blue-50" : ""
                        }`}
                      >
                        {result.icon && (
                          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <result.icon className="w-5 h-5 text-gray-500" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 truncate">{result.title}</p>
                          <p className="text-sm text-gray-500 truncate">{result.description}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-4 py-3 bg-gray-50 text-xs text-gray-500 border-t border-gray-200">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-white border border-gray-300 rounded text-[10px] font-mono">↑</kbd>
              <kbd className="px-1.5 py-0.5 bg-white border border-gray-300 rounded text-[10px] font-mono">↓</kbd>
              <span className="ml-1">{language === "no" ? "naviger" : "navigate"}</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-white border border-gray-300 rounded text-[10px] font-mono">↵</kbd>
              <span className="ml-1">{language === "no" ? "velg" : "select"}</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-2 py-0.5 bg-white border border-gray-300 rounded text-[10px] font-mono">esc</kbd>
              <span className="ml-1">{language === "no" ? "lukk" : "close"}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
