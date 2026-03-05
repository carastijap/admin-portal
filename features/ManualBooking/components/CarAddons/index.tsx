"use client";

import * as React from "react";
import { Separator } from "@/components/ui/separator";
import { useFormContext, useWatch } from "react-hook-form";
import type { Path } from "react-hook-form";
import { ManualBookingFormValues } from "../../types";
import { AdditionalDriversSection } from "./AdditionalDriversSection";
import { DepositOptionsSection } from "./DepositOptionsSection";
import { ExtraKmPackagesSection } from "./ExtraKmPackagesSection";
import { InsuranceSection } from "./InsuranceSection";

export function CarAddons() {
  const { control, setValue } = useFormContext<ManualBookingFormValues>();
  const rawDriverCount = useWatch({
    control,
    name: "driverCount",
    defaultValue: 0,
  });
  const depositOption = useWatch({
    control,
    name: "depositOption",
    defaultValue: "refundable",
  });
  const depositFeeWaived = useWatch({
    control,
    name: "depositFeeWaived",
    defaultValue: false,
  });
  const depositFees = useWatch({
    control,
    name: "depositFees",
    defaultValue: { refundable: "5999", "no-deposit": "450" },
  }) as { refundable?: string; "no-deposit"?: string };
  const insurancePackage = useWatch({
    control,
    name: "insurancePackage",
    defaultValue: "comprehensive",
  });
  const insuranceWaived = useWatch({
    control,
    name: "insuranceWaived",
    defaultValue: false,
  });
  const insurancePackagePrices = useWatch({
    control,
    name: "insurancePackagePrices",
    defaultValue: { comprehensive: "450", standard: "300", basic: "0" },
  }) as { comprehensive?: string; standard?: string; basic?: string };
  const driverFeeWaived = useWatch({
    control,
    name: "driverFeeWaived",
    defaultValue: false,
  });
  const additionalDriverFeePerDriver = useWatch({
    control,
    name: "additionalDriverFeePerDriver",
    defaultValue: "150",
  });
  const extraKmPackage = useWatch({
    control,
    name: "extraKmPackage",
    defaultValue: "km-1000",
  });
  const extraKmWaived = useWatch({
    control,
    name: "extraKmWaived",
    defaultValue: false,
  });
  const extraKmPackagePrices = useWatch({
    control,
    name: "extraKmPackagePrices",
    defaultValue: {
      "km-500": "250",
      "km-1000": "450",
      "km-2000": "800",
      "km-unlimited": "1500",
    },
  }) as {
    "km-500"?: string;
    "km-1000"?: string;
    "km-2000"?: string;
    "km-unlimited"?: string;
  };

  const driverCount = Math.min(2, Math.max(0, Number(rawDriverCount) || 0));

  const updateDriverCount = (delta: number) => {
    const nextDriverCount = Math.min(2, Math.max(0, driverCount + delta));
    setValue("driverCount", nextDriverCount, {
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const insurancePriceFieldName = (id: string) =>
    `insurancePackagePrices.${id}` as Path<ManualBookingFormValues>;
  const extraKmPriceFieldName = (id: string) =>
    `extraKmPackagePrices.${id}` as Path<ManualBookingFormValues>;

  React.useEffect(() => {
    const option = depositOption === "no-deposit" ? "no-deposit" : "refundable";
    const selectedFee = String(depositFees[option] ?? "0");
    setValue("depositFeeAmount", depositFeeWaived ? "0" : selectedFee, {
      shouldDirty: true,
    });
  }, [depositFeeWaived, depositFees, depositOption, setValue]);

  React.useEffect(() => {
    const selectedPackage =
      insurancePackage === "standard" || insurancePackage === "basic"
        ? insurancePackage
        : "comprehensive";
    const selectedPrice = String(insurancePackagePrices[selectedPackage] ?? "0");
    setValue("insuranceAppliedPrice", insuranceWaived ? "0" : selectedPrice, {
      shouldDirty: true,
    });
  }, [insurancePackage, insurancePackagePrices, insuranceWaived, setValue]);

  React.useEffect(() => {
    const feePerDriver = Number(additionalDriverFeePerDriver) || 0;
    const applied = driverFeeWaived ? 0 : feePerDriver * driverCount;
    setValue("additionalDriversAppliedFee", String(applied), {
      shouldDirty: true,
    });
  }, [additionalDriverFeePerDriver, driverCount, driverFeeWaived, setValue]);

  React.useEffect(() => {
    const selectedPackage =
      extraKmPackage === "km-500" ||
      extraKmPackage === "km-2000" ||
      extraKmPackage === "km-unlimited"
        ? extraKmPackage
        : "km-1000";
    const selectedPrice = String(extraKmPackagePrices[selectedPackage] ?? "0");
    setValue("extraKmAppliedPrice", extraKmWaived ? "0" : selectedPrice, {
      shouldDirty: true,
    });
  }, [extraKmPackage, extraKmPackagePrices, extraKmWaived, setValue]);

  return (
    <div className="space-y-8">
      <DepositOptionsSection
        depositFeeWaived={depositFeeWaived}
        depositFees={depositFees}
      />

      <Separator />

      <InsuranceSection
        insuranceWaived={insuranceWaived}
        insurancePriceFieldName={insurancePriceFieldName}
      />

      <Separator />

      <AdditionalDriversSection
        driverCount={driverCount}
        driverFeeWaived={driverFeeWaived}
        additionalDriverFeePerDriver={String(additionalDriverFeePerDriver ?? "0")}
        updateDriverCount={updateDriverCount}
      />

      <Separator />

      <ExtraKmPackagesSection
        extraKmWaived={extraKmWaived}
        extraKmPriceFieldName={extraKmPriceFieldName}
      />
    </div>
  );
}
