"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";
import { useAppStore } from "@/store";

// Map of path segments to Norwegian labels
const pathLabels: Record<string, { no: string; en: string }> = {
  "tjenester": { no: "Tjenester", en: "Services" },
  "nettbutikk": { no: "Nettbutikk", en: "Webshop" },
  "handlekurv": { no: "Handlekurv", en: "Shopping Cart" },
  "reparasjon": { no: "Reparasjon", en: "Repair" },
  "om-oss": { no: "Om oss", en: "About Us" },
  "kontakt": { no: "Kontakt", en: "Contact" },
  "personvern": { no: "Personvern", en: "Privacy Policy" },
  "privacy-policy": { no: "Personvern", en: "Privacy Policy" },
  "vilkar": { no: "Vilkår", en: "Terms" },
  "cookie-policy": { no: "Cookie-policy", en: "Cookie Policy" },
  "tilgjengelighet": { no: "Tilgjengelighet", en: "Accessibility" },
  "garanti": { no: "Garanti", en: "Warranty" },
  "frakt": { no: "Frakt og levering", en: "Shipping & Delivery" },
  "retur": { no: "Retur og reklamasjon", en: "Returns & Claims" },
  "miljo": { no: "Miljø", en: "Environment" },
  "pricing": { no: "Priser", en: "Pricing" },
  "selg-til-oss": { no: "Selg til oss", en: "Sell to Us" },
  "faq": { no: "FAQ", en: "FAQ" },
  "services": { no: "Tjenester", en: "Services" },
};

interface BreadcrumbItem {
  label: string;
  href: string;
  isCurrentPage: boolean;
}

export function Breadcrumbs() {
  const pathname = usePathname();
  const { language } = useAppStore();

  // Don't show breadcrumbs on homepage
  if (pathname === "/") {
    return null;
  }

  // Build breadcrumb items from path
  const pathSegments = pathname.split("/").filter((segment) => segment !== "");
  
  const breadcrumbs: BreadcrumbItem[] = [
    {
      label: language === "no" ? "Hjem" : "Home",
      href: "/",
      isCurrentPage: false,
    },
  ];

  let currentPath = "";
  pathSegments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    const isLast = index === pathSegments.length - 1;
    
    // Get label from mapping or capitalize the segment
    const labelMap = pathLabels[segment];
    const label = labelMap 
      ? (language === "no" ? labelMap.no : labelMap.en)
      : segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ");

    breadcrumbs.push({
      label,
      href: currentPath,
      isCurrentPage: isLast,
    });
  });

  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label,
      "item": `https://nornex.no${item.href}`,
    })),
  };

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center text-sm">
        <ol className="flex items-center space-x-1 sm:space-x-2">
          {breadcrumbs.map((item, index) => (
            <li key={item.href} className="flex items-center">
              {index > 0 && (
                <ChevronRight className="w-4 h-4 text-gray-400 mx-1 sm:mx-2 flex-shrink-0" aria-hidden="true" />
              )}
              
              {item.isCurrentPage ? (
                <span 
                  className="text-gray-600 font-medium truncate max-w-[150px] sm:max-w-none"
                  aria-current="page"
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1 truncate max-w-[100px] sm:max-w-none"
                >
                  {index === 0 && <Home className="w-4 h-4 flex-shrink-0" aria-hidden="true" />}
                  <span className={index === 0 ? "sr-only sm:not-sr-only" : ""}>
                    {item.label}
                  </span>
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
