"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { FormSelect } from "@/components/form";

export function PaymentMethodSection() {
  return (
    <section className="space-y-3">
      <div>
        <h2 className="text-lg font-semibold">Payment Method</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Select how the customer will pay. At least one active card is required
          for card-based options.
        </p>
      </div>

      <Card>
        <CardContent className="pt-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <FormSelect
              name="paymentMethod"
              triggerClassName="w-full"
              label="Payment Method"
              placeholder="Select payment method"
              options={[
                "Pay Later",
                "Card Charge",
                "Cash Deposit",
                "Bank Transfer",
                "Payment Link",
                "Paid by Card",
              ].map((option) => ({
                label: option,
                value: option.toLowerCase().replace(/\s+/g, "-"),
              }))}
            />

            <FormSelect
              name="savedCard"
              triggerClassName="w-full"
              label="Select Saved Card"
              placeholder="Choose a card"
              options={[
                "Visa •••• 4242",
                "Mastercard •••• 8310",
                "Visa •••• 1234",
              ].map((option) => ({
                label: option,
                value: option.toLowerCase().replace(/\s+/g, "-"),
              }))}
            />
          </div>

          <Separator />
        </CardContent>
      </Card>
    </section>
  );
}
