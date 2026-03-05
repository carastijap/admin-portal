"use client";

export const insurancePackages = [
  {
    id: "comprehensive",
    name: "Comprehensive Cover",
    provider: "AXA Insurance",
    price: "450",
    description: "Full coverage including theft, accident, and natural disasters.",
  },
  {
    id: "standard",
    name: "Standard Cover",
    provider: "RSA Insurance",
    price: "300",
    description: "Covers accident damage and third-party liability.",
  },
  {
    id: "basic",
    name: "Basic Package",
    provider: "Included",
    price: "0",
    description: "Third-party liability only. Free of charge.",
    isFree: true,
  },
] as const;

export const extraKmPackages = [
  { id: "km-500", label: "500 KM", price: "250" },
  { id: "km-1000", label: "1,000 KM", price: "450" },
  { id: "km-2000", label: "2,000 KM", price: "800" },
  { id: "km-unlimited", label: "Unlimited KM", price: "1,500" },
] as const;
