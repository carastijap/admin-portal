"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FormInput, FormSwitch } from "@/components/form";
import { TicketPercentIcon, WalletIcon } from "lucide-react";

type WalletVoucherSectionProps = {
  voucherCode: unknown;
  isApplyingVoucher: boolean;
  onApplyVoucher: () => void;
};

export function WalletVoucherSection({
  voucherCode,
  isApplyingVoucher,
  onApplyVoucher,
}: WalletVoucherSectionProps) {
  return (
    <section className="space-y-3">
      <div>
        <h2 className="text-lg font-semibold">Wallet &amp; Voucher</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Apply wallet credit or a voucher code to reduce the total charge.
        </p>
      </div>

      <Card>
        <CardContent className="pt-6 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-primary/10 p-2 shrink-0">
                <WalletIcon className="size-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">Use Wallet Credit</p>
                <p className="text-xs text-muted-foreground">
                  Available balance:{" "}
                  <span className="font-medium text-foreground">1,200 AED</span>
                </p>
              </div>
            </div>
            <FormSwitch name="useWalletCredit" label="Use Wallet Credit" />
          </div>

          <Separator />

          <div className="flex items-start gap-3">
            <div className="rounded-lg bg-primary/10 p-2 shrink-0 mt-0.5">
              <TicketPercentIcon className="size-5 text-primary" />
            </div>
            <div className="flex-1 space-y-1.5">
              <p className="text-sm font-medium">Voucher Code</p>
              <p className="text-xs text-muted-foreground">
                Enter a voucher code. The system will auto-validate and apply the
                discount.
              </p>
              <div className="flex items-center gap-3 pt-1">
                <FormInput
                  name="voucherCode"
                  containerClassName="max-w-xs"
                  className="max-w-xs"
                  placeholder="Enter voucher code"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={
                    isApplyingVoucher ||
                    (typeof voucherCode !== "string" || voucherCode.trim() === "")
                  }
                  onClick={onApplyVoucher}
                >
                  {isApplyingVoucher ? "Applying..." : "Apply"}
                </Button>
                <Badge className="text-xs bg-emerald-50 text-emerald-700 border-0">
                  -500 AED
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
