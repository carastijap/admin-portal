"use client";

import { ManualBookingFieldEditability, ManualBookingFormValues } from "../../types";
import { useFormContext } from "react-hook-form";
import { AvailableCarsSection } from "./AvailableCarsSection";
import { CarConfigurationSection } from "./CarConfigurationSection";
import { CarDetailsSection } from "./CarDetailsSection";
import { CarSpecsSection } from "./CarSpecsSection";

export function CarStep({
  fieldEditability,
}: {
  fieldEditability: ManualBookingFieldEditability;
}) {
  const { formState } = useFormContext<ManualBookingFormValues>();
  const defaultValues = formState.defaultValues;
  const isCarPriceReadOnly =
    defaultValues?.carPrice !== undefined && defaultValues?.carPrice !== null;
  const isCarSupplierPriceReadOnly =
    defaultValues?.carSupplierPrice !== undefined &&
    defaultValues?.carSupplierPrice !== null;
  const isCarDiscountAmountReadOnly =
    defaultValues?.carDiscountAmount !== undefined &&
    defaultValues?.carDiscountAmount !== null;
    
  return (
    <div className="space-y-8">
      <CarDetailsSection />
      <AvailableCarsSection />
      <CarSpecsSection />
      <CarConfigurationSection
        fieldEditability={fieldEditability}
        isCarPriceReadOnly={isCarPriceReadOnly}
        isCarSupplierPriceReadOnly={isCarSupplierPriceReadOnly}
        isCarDiscountAmountReadOnly={isCarDiscountAmountReadOnly}
      />
    </div>
  );
}
