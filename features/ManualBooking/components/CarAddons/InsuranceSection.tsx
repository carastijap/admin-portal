"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { FormInput, FormRadioGroup, FormSwitch } from "@/components/form";
import { ShieldCheckIcon } from "lucide-react";
import type { Path } from "react-hook-form";
import { insurancePackages } from "./data";
import { ManualBookingFormValues } from "../../types";

type InsuranceSectionProps = {
  insuranceWaived: boolean;
  insurancePriceFieldName: (id: string) => Path<ManualBookingFormValues>;
};

export function InsuranceSection({
  insuranceWaived,
  insurancePriceFieldName,
}: InsuranceSectionProps) {
  return (
    <section className="space-y-3">
      <div>
        <h2 className="text-lg font-semibold">Insurance Packages</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Select one insurance package. Price is read-only and can be waived.
        </p>
      </div>
      <div className="flex justify-end">
        <FormSwitch
          name="insuranceWaived"
          label="Waive Insurance Fee"
          containerClassName="min-w-44"
        />
      </div>

      <FormRadioGroup
        name="insurancePackage"
        defaultValue="comprehensive"
        groupClassName="space-y-3"
        options={insurancePackages.map((pkg) => ({
          label: pkg.name,
          value: pkg.id,
        }))}
        renderOption={({ option, itemId }) => {
          const pkg = insurancePackages.find((entry) => entry.id === option.value);
          if (!pkg) return null;

          return (
            <label htmlFor={itemId} className="block cursor-pointer">
              <Card className="relative py-0 has-checked:border-primary has-checked:ring-2 has-checked:ring-primary/20 transition-all">
                <div className="absolute right-4 top-4">
                  <RadioGroupItem value={pkg.id} id={itemId} />
                </div>
                <CardContent className="p-5">
                  <div className="flex flex-col gap-3 pr-6 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <ShieldCheckIcon className="size-4 text-primary" />
                        <p className="text-sm font-semibold">{pkg.name}</p>
                        {pkg.isFree && (
                          <Badge className="border-0 bg-emerald-50 text-xs text-emerald-700">
                            Free
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">{pkg.provider}</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {pkg.description}
                      </p>
                    </div>

                    {!pkg.isFree && (
                      <div className="flex shrink-0 items-center gap-2">
                        <FormInput
                          name={insurancePriceFieldName(pkg.id)}
                          className="h-9 w-24 text-center text-sm"
                          containerClassName="gap-0"
                          readOnly
                        />
                        <span className="whitespace-nowrap text-xs text-muted-foreground">
                          {insuranceWaived ? "AED/mo (waived)" : "AED/mo"}
                        </span>
                      </div>
                    )}
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
