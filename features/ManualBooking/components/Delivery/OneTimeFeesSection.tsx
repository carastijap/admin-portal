"use client";

import { Card, CardContent } from "@/components/ui/card";
import { FormInput, FormSwitch } from "@/components/form";

export function OneTimeFeesSection() {
  return (
    <section className="space-y-3">
      <div>
        <h2 className="text-lg font-semibold">One-Time Fees</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Configure one-time charges applied at the start of the subscription.
        </p>
      </div>
      <div className="flex justify-end">
        <FormSwitch
          name="startFeesWaived"
          label="Waive Start Fees"
          containerClassName="min-w-36"
        />
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <FormInput
              name="startFees"
              label="Start Fees (AED)"
              placeholder="Enter start fees"
              readOnly
            />
            <FormInput
              name="tintingFees"
              label="Tinting Fees (AED)"
              placeholder="Enter tinting fees"
            />
            <FormInput
              name="upfrontFees"
              label="Upfront Fees (AED)"
              placeholder="Enter upfront fees"
            />
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
