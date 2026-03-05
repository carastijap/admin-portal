"use client";

import { Separator } from "@/components/ui/separator";
import { BookingSection } from "./BookingSection";
import { CustomerSection } from "./CustomerSection";
import { DeliverySection } from "./DeliverySection";
import { PricingSection } from "./PricingSection";
import { ReviewHeader } from "./ReviewHeader";
import { TotalsSection } from "./TotalsSection";
import { VehicleSection } from "./VehicleSection";

export function ReviewStep() {
  return (
    <div className="mx-auto max-w-2xl">
      <div className="rounded-xl border bg-background shadow-sm overflow-hidden">
        <ReviewHeader />

        <div className="px-8 py-6 space-y-0">
          <CustomerSection />

          <Separator />

          <BookingSection />

          <Separator />

          <VehicleSection />

          <Separator />

          <DeliverySection />

          <Separator />

          <PricingSection />
          <TotalsSection />
        </div>
      </div>
    </div>
  );
}
