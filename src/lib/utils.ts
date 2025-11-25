import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number, currency: string = "NOK"): string {
  return new Intl.NumberFormat("nb-NO", {
    style: "currency",
    currency,
  }).format(price);
}

export function formatDate(date: Date | string, locale: string = "nb-NO"): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(d);
}

export function generateOrderNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `NOR-${timestamp}-${random}`;
}

export function calculateSustainabilityScore(
  originalPrice: number,
  grade: string,
  category: string
): number {
  let baseScore = 50;

  // Grade bonus
  switch (grade) {
    case "A":
      baseScore += 30;
      break;
    case "B":
      baseScore += 20;
      break;
    case "C":
      baseScore += 10;
      break;
    default:
      baseScore += 0;
  }

  // Category bonus
  if (["LAPTOPS", "DESKTOPS", "MONITORS"].includes(category)) {
    baseScore += 15;
  } else if (["PHONES", "TABLETS"].includes(category)) {
    baseScore += 10;
  }

  return Math.min(100, baseScore);
}

export function calculateCO2Saved(category: string, grade: string): number {
  // Estimated CO2 savings in kg for refurbished devices
  const baseSavings: Record<string, number> = {
    LAPTOPS: 300,
    DESKTOPS: 400,
    MONITORS: 150,
    PHONES: 50,
    TABLETS: 80,
    ACCESSORIES: 10,
    NETWORKING: 30,
    STORAGE: 20,
    PRINTERS: 100,
    OTHER: 15,
  };

  const gradeMultiplier: Record<string, number> = {
    A: 1.0,
    B: 0.85,
    C: 0.7,
    NEW: 0.3,
  };

  return (baseSavings[category] || 15) * (gradeMultiplier[grade] || 0.5);
}
