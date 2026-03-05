"use client";

import { Card, CardContent } from "@/components/ui/card";
import { FormInput, FormSelect } from "@/components/form";
import { ManualBookingFieldEditability } from "../../types";

type CarConfigurationSectionProps = {
  fieldEditability: ManualBookingFieldEditability;
  isCarPriceReadOnly: boolean;
  isCarSupplierPriceReadOnly: boolean;
  isCarDiscountAmountReadOnly: boolean;
};

export function CarConfigurationSection({
  fieldEditability,
  isCarPriceReadOnly,
  isCarSupplierPriceReadOnly,
  isCarDiscountAmountReadOnly,
}: CarConfigurationSectionProps) {
  return (
    <section className="space-y-3">
      <div>
        <h2 className="text-lg font-semibold">Car Configuration</h2>
        <p className="text-sm text-muted-foreground mt-1">
          All fields are mandatory to proceed.
        </p>
      </div>
      <Card>
        <CardContent className="pt-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <FormSelect
              triggerClassName="w-full"
              name="carDuration"
              label="Duration *"
              placeholder="Select Duration"
              options={[
                "Weekly",
                "1 Month",
                "FLEX",
                "3 Months",
                "6 Months",
                "9 Months",
                "12 Months",
                "24 Months",
                "36 Months",
              ].map((option) => ({
                label: option,
                value: option.toLowerCase().replace(/\s+/g, "-"),
              }))}
            />
            <div className="flex flex-col gap-1.5">
              <FormInput
                name="carPrice"
                label="Price *"
                placeholder="Enter price"
                readOnly={isCarPriceReadOnly}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <FormInput
                name="carSupplierPrice"
                label="Supplier Price *"
                placeholder="Enter supplier price"
                readOnly={isCarSupplierPriceReadOnly}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex flex-col gap-1.5">
              <FormInput
                name="carDiscountAmount"
                label="Discount Amount *"
                placeholder="Enter discount"
                readOnly={isCarDiscountAmountReadOnly}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <FormInput
                name="carColor"
                label="Color *"
                placeholder="Enter color"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <FormInput
                name="carNumberPlate"
                label="Number Plate"
                placeholder="Enter number plate"
                readOnly={!fieldEditability.carNumberPlateEditable}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex flex-col gap-1.5">
              <FormInput
                name="carChassisNumber"
                label="Chassis Number"
                placeholder="Enter chassis number"
                readOnly={!fieldEditability.carChassisNumberEditable}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <FormInput
                name="carDefleetDate"
                type="date"
                readOnly={!fieldEditability.carDefleetDateEditable}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <FormInput
                name="carOwner"
                readOnly={!fieldEditability.carOwnerEditable}
                placeholder="Enter owner"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex flex-col gap-1.5">
              <FormInput
                name="carMileageAllowance"
                label="Basic Mileage Allowance *"
                placeholder="Enter mileage allowance (km)"
                readOnly
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
