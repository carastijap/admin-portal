"use client";

import * as React from "react";
import { Separator } from "@/components/ui/separator";
import { useFormContext, useWatch } from "react-hook-form";
import { ManualBookingFormValues } from "../../types";
import { PaymentMethodSection } from "./PaymentMethodSection";
import { SubmitSection } from "./SubmitSection";
import { WalletVoucherSection } from "./WalletVoucherSection";

export function BookingSubmission() {
  const { control } = useFormContext<ManualBookingFormValues>();
  const voucherCode = useWatch({
    control,
    name: "voucherCode",
    defaultValue: "",
  });
  const [isApplyingVoucher, setIsApplyingVoucher] = React.useState(false);

  const handleApplyVoucher = async () => {
    const trimmedVoucherCode =
      typeof voucherCode === "string" ? voucherCode.trim() : "";
    if (!trimmedVoucherCode) return;

    try {
      setIsApplyingVoucher(true);
      // TODO: Replace with actual voucher validation endpoint.
      await new Promise((resolve) => setTimeout(resolve, 400));
      console.log("apply voucher payload", { voucherCode: trimmedVoucherCode });
    } finally {
      setIsApplyingVoucher(false);
    }
  };

  return (
    <div className="space-y-8">
      <WalletVoucherSection
        voucherCode={voucherCode}
        isApplyingVoucher={isApplyingVoucher}
        onApplyVoucher={handleApplyVoucher}
      />
      <PaymentMethodSection />

      <Separator />

      <SubmitSection />
    </div>
  );
}
