"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { FormInput, FormRadioGroup, FormSwitch } from "@/components/form";
import { CarIcon } from "lucide-react";
import type { Path } from "react-hook-form";
import { ManualBookingFormValues } from "../../types";
import { extraKmPackages } from "./data";

type ExtraKmPackagesSectionProps = {
  extraKmWaived: boolean;
  extraKmPriceFieldName: (id: string) => Path<ManualBookingFormValues>;
};

export function ExtraKmPackagesSection({
  extraKmWaived,
  extraKmPriceFieldName,
}: ExtraKmPackagesSectionProps) {
  return (
    <section className="space-y-3">
      <div>
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <CarIcon className="size-5" />
          Extra KM Packages
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Select an extra mileage package. Price is read-only and can be waived.
        </p>
      </div>
      <div className="flex justify-end">
        <FormSwitch
          name="extraKmWaived"
          label="Waive Extra KM Fee"
          containerClassName="min-w-44"
        />
      </div>

      <FormRadioGroup
        name="extraKmPackage"
        defaultValue="km-1000"
        groupClassName="space-y-3"
        options={extraKmPackages.map((pkg) => ({
          label: pkg.label,
          value: pkg.id,
        }))}
        renderOption={({ option, itemId }) => {
          const pkg = extraKmPackages.find((entry) => entry.id === option.value);
          if (!pkg) return null;

          return (
            <label htmlFor={itemId} className="block cursor-pointer">
              <Card className="relative py-0 has-checked:border-primary has-checked:ring-2 has-checked:ring-primary/20 transition-all">
                <div className="absolute right-4 top-4">
                  <RadioGroupItem value={pkg.id} id={itemId} />
                </div>
                <CardContent className="p-5">
                  <div className="flex items-center justify-between pr-6">
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="text-xs font-mono">
                        {pkg.label}
                      </Badge>
                      <span className="text-sm text-muted-foreground">extra per month</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FormInput
                        name={extraKmPriceFieldName(pkg.id)}
                        className="h-9 w-24 text-center text-sm"
                        containerClassName="gap-0"
                        readOnly
                      />
                      <span className="whitespace-nowrap text-xs text-muted-foreground">
                        {extraKmWaived ? "AED/mo (waived)" : "AED/mo"}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </label>
          );
        }}
      />
    </section>
  );
}
