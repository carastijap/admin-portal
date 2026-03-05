"use client";

import { Separator } from "@/components/ui/separator";
import { CustomerSearchSection } from "./CustomerSearchSection";
import { CustomerProfileSection } from "./CustomerProfileSection";
import { DocumentVerificationSection } from "./DocumentVerificationSection";

export function UserInformationStep() {
  return (
    <div className="space-y-6">
      <CustomerSearchSection />

      <Separator />

      <CustomerProfileSection />

      <Separator />
      <Separator />
      <DocumentVerificationSection />
    </div>
  );
}
