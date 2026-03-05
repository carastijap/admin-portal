"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { FormRadioGroup, FormSwitch } from "@/components/form";

type DepositOptionsSectionProps = {
  depositFeeWaived: boolean;
  depositFees: { refundable?: string; "no-deposit"?: string };
};

export function DepositOptionsSection({
  depositFeeWaived,
  depositFees,
}: DepositOptionsSectionProps) {
  return (
    <section className="space-y-3">
      <div>
        <h2 className="text-lg font-semibold">Deposit Options</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Select one deposit option for this booking.
        </p>
      </div>

      <FormRadioGroup
        name="depositOption"
        defaultValue="refundable"
        groupClassName="grid grid-cols-1 gap-4 sm:grid-cols-2"
        options={[
          { label: "Refundable Deposit", value: "refundable" },
          { label: "No Deposit Fee", value: "no-deposit" },
        ]}
        renderOption={({ option, itemId }) => {
          const optionKey = option.value === "no-deposit" ? "no-deposit" : "refundable";
          const optionFee = String(depositFees[optionKey] ?? "0");

          return (
            <label htmlFor={itemId} className="cursor-pointer">
              <Card className="relative h-full py-0 has-checked:border-primary has-checked:ring-2 has-checked:ring-primary/20 transition-all">
                <div className="absolute right-4 top-4">
                  <RadioGroupItem value={option.value} id={itemId} />
                </div>
                <CardContent className="space-y-2 p-5">
                  <p className="pr-6 text-sm font-semibold">{option.label}</p>
                  <p className="text-xs text-muted-foreground">
                    {option.value === "refundable"
                      ? "One month of car price, fully refundable at the end of the contract."
                      : "Non-refundable fee between 7.5%-10% of the car price instead of a deposit."}
                  </p>
                  <div className="pt-2">
                    <Badge
                      variant={depositFeeWaived ? "outline" : "secondary"}
                      className="text-xs font-medium"
                    >
                      {depositFeeWaived ? "Waived · 0 AED" : `${optionFee} AED`}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </label>
          );
        }}
      />
      <div className="flex justify-end">
        <FormSwitch
          name="depositFeeWaived"
          label="Waive Deposit Fee"
          containerClassName="min-w-40"
        />
      </div>
    </section>
  );
}
