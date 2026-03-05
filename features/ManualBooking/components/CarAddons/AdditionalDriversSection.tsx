"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FormInput, FormSwitch } from "@/components/form";
import { MinusIcon, PlusIcon } from "lucide-react";
import { DriverForm } from "./DriverForm";

type AdditionalDriversSectionProps = {
  driverCount: number;
  driverFeeWaived: boolean;
  additionalDriverFeePerDriver: string;
  updateDriverCount: (delta: number) => void;
};

export function AdditionalDriversSection({
  driverCount,
  driverFeeWaived,
  additionalDriverFeePerDriver,
  updateDriverCount,
}: AdditionalDriversSectionProps) {
  return (
    <section className="space-y-3">
      <div>
        <h2 className="text-lg font-semibold">Additional Drivers</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Add up to 2 additional drivers. Fee: 150 AED per driver.
        </p>
      </div>

      <Card className="py-0">
        <CardContent className="p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <p className="text-sm font-medium">Driver Fee</p>
              <p className="text-xs text-muted-foreground">
                {driverFeeWaived
                  ? "Waived (0 AED per additional driver)"
                  : `${additionalDriverFeePerDriver} AED per additional driver`}
              </p>
            </div>
            <FormSwitch
              name="driverFeeWaived"
              label="Waive Fee"
              containerClassName="min-w-28"
            />
          </div>
          <FormInput
            name="additionalDriverFeePerDriver"
            label="Price per Driver (AED)"
            readOnly
            containerClassName="max-w-xs gap-1.5"
          />

          <Separator />

          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">Number of Drivers</p>
            <div className="flex items-center gap-3">
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="size-8"
                disabled={driverCount === 0}
                onClick={() => updateDriverCount(-1)}
              >
                <MinusIcon className="size-4" />
              </Button>
              <span className="text-sm font-semibold w-6 text-center">{driverCount}</span>
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="size-8"
                disabled={driverCount === 2}
                onClick={() => updateDriverCount(1)}
              >
                <PlusIcon className="size-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {driverCount > 0 ? (
        <div className="space-y-4">
          {Array.from({ length: driverCount }, (_, index) => (
            <DriverForm key={index + 1} driverNumber={index + 1} />
          ))}
        </div>
      ) : null}
    </section>
  );
}
