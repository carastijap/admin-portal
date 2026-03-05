"use client";

import * as React from "react";
import { Separator } from "@/components/ui/separator";
import { useFormContext, useWatch } from "react-hook-form";
import { ManualBookingFormValues } from "../../types";
import { DeliveryDetailsSection } from "./DeliveryDetailsSection";
import { OneTimeFeesSection } from "./OneTimeFeesSection";

export function DeliveryStep() {
  const { control, setValue } = useFormContext<ManualBookingFormValues>();
  const deliveryMethod = useWatch({
    control,
    name: "deliveryMethod",
    defaultValue: "delivery",
  });
  const startFeesWaived = useWatch({
    control,
    name: "startFeesWaived",
    defaultValue: false,
  });
  const startFeesBase = useWatch({
    control,
    name: "startFeesBase",
    defaultValue: "399",
  });

  React.useEffect(() => {
    setValue("startFees", startFeesWaived ? "0" : String(startFeesBase ?? "0"), {
      shouldDirty: true,
    });
  }, [setValue, startFeesBase, startFeesWaived]);

  return (
    <div className="space-y-8">
      <DeliveryDetailsSection deliveryMethod={deliveryMethod} />

      <Separator />

      <OneTimeFeesSection />
    </div>
  );
}
