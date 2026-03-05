"use client";

export const customerSearchItems = [
  { id: "user-1", displayName: "Japeth Naval", value: "japeth-naval" },
  { id: "user-2", displayName: "Maria Santos", value: "maria-santos" },
  { id: "user-3", displayName: "Ahmed Al Mansoori", value: "ahmed-al-mansoori" },
  { id: "user-4", displayName: "Sofia Rahman", value: "sofia-rahman" },
] as const;

export const verificationDocuments = [
  {
    title: "Passport",
    placeholder: "Passport placeholder",
    href: "#passport-check",
  },
  {
    title: "Driver's License",
    placeholder: "Driver's License placeholder",
    href: "#drivers-license-check",
  },
  {
    title: "Bank Statements",
    placeholder: "Bank Statements placeholder",
    href: "#bank-statements-check",
  },
] as const;
