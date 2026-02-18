"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { SelectField } from "./SelectField";
import {
  WalletIcon,
  TicketPercentIcon,
  BadgeCheckIcon,
  AlertTriangleIcon,
  SendIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";


export function BookingSubmission() {
  const router = useRouter();
  const handleSubmit = () => {
    console.log("Submit Booking");
    router.push("/booking-list");
  };
  return (
    <div className="space-y-8">
      {/* ── Wallet Credit ── */}
      <section className="space-y-3">
        <div>
          <h2 className="text-lg font-semibold">Wallet &amp; Voucher</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Apply wallet credit or a voucher code to reduce the total charge.
          </p>
        </div>

        <Card>
          <CardContent className="pt-6 space-y-6">
            {/* Wallet toggle */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-primary/10 p-2 shrink-0">
                  <WalletIcon className="size-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Use Wallet Credit</p>
                  <p className="text-xs text-muted-foreground">
                    Available balance:{" "}
                    <span className="font-medium text-foreground">
                      1,200 AED
                    </span>
                  </p>
                </div>
              </div>
              <Switch defaultChecked />
            </div>

            <Separator />

            {/* Voucher */}
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 p-2 shrink-0 mt-0.5">
                <TicketPercentIcon className="size-5 text-primary" />
              </div>
              <div className="flex-1 space-y-1.5">
                <p className="text-sm font-medium">Voucher Code</p>
                <p className="text-xs text-muted-foreground">
                  Enter a voucher code. The system will auto-validate and apply
                  the discount.
                </p>
                <div className="flex items-center gap-3 pt-1">
                  <Input
                    placeholder="Enter voucher code"
                    defaultValue="WELCOME2026"
                    className="max-w-xs"
                  />
                  <Button variant="outline" size="sm">
                    Apply
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

      {/* ── Payment Method ── */}
      <section className="space-y-3">
        <div>
          <h2 className="text-lg font-semibold">Payment Method</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Select how the customer will pay. At least one active card is
            required for card-based options.
          </p>
        </div>

        <Card>
          <CardContent className="pt-6 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <SelectField
                label="Payment Method"
                placeholder="Select payment method"
                options={[
                  "Pay Later",
                  "Card Charge",
                  "Cash Deposit",
                  "Bank Transfer",
                  "Payment Link",
                  "Paid by Card",
                ]}
                defaultValue="card-charge"
              />

              {/* Card Charge – saved card selector */}
              <SelectField
                label="Select Saved Card"
                placeholder="Choose a card"
                options={[
                  "Visa •••• 4242",
                  "Mastercard •••• 8310",
                  "Visa •••• 1234",
                ]}
                defaultValue="visa-••••-4242"
              />
            </div>

            <Separator />

            {/* Conditional fields for each payment method */}
            {/* <div className="space-y-4">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Additional fields per payment method
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                
                <div className="flex flex-col gap-1.5">
                  <Label className="text-sm text-muted-foreground">
                    Deposit Reference
                  </Label>
                  <Input placeholder="Enter deposit reference" />
                  <p className="text-xs text-muted-foreground">
                    Required for Cash Deposit
                  </p>
                </div>

                
                <div className="flex flex-col gap-1.5">
                  <Label className="text-sm text-muted-foreground">
                    Bank Transfer Reference
                  </Label>
                  <Input placeholder="Enter transfer reference" />
                  <p className="text-xs text-muted-foreground">
                    Required for Bank Transfer
                  </p>
                </div>

                
                <div className="flex flex-col gap-1.5">
                  <Label className="text-sm text-muted-foreground">
                    Checkout Payment ID
                  </Label>
                  <Input
                    placeholder="Enter payment_id"
                    defaultValue="pay_abc123xyz456"
                  />
                  <p className="text-xs text-muted-foreground">
                    Required for Paid by Card
                  </p>
                </div>
              </div>
            </div> */}

            {/* Amount mismatch alert (shown for "Paid by Card" if amounts differ)
            <div className="flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4">
              <AlertTriangleIcon className="size-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-amber-800">
                  Payment Amount Mismatch
                </p>
                <p className="text-xs text-amber-700 mt-0.5">
                  The payment amount from Checkout (11,398 AED) does not match
                  the booking total (11,898 AED). Please verify the payment
                  before proceeding.
                </p>
              </div>
            </div> */}
          </CardContent>
        </Card>
      </section>

      <Separator />

      {/* ── Order Summary ──
      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Order Summary</h2>

        <Card>
          <CardContent className="pt-6">
            <div className="rounded-lg border p-5 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Monthly Rate</span>
                <span className="font-medium">5,999 AED</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Insurance</span>
                <span className="font-medium">450 AED</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Extra KM Package</span>
                <span className="font-medium">450 AED</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  Additional Drivers (2)
                </span>
                <span className="font-medium">300 AED</span>
              </div>
              <Separator />
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Start Fees</span>
                <span className="font-medium">399 AED</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Delivery Fee</span>
                <span className="font-medium">150 AED</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Deposit</span>
                <span className="font-medium">5,999 AED</span>
              </div>
              <Separator />
              <div className="flex justify-between text-sm text-emerald-700">
                <span>Wallet Credit Applied</span>
                <span className="font-medium">-1,200 AED</span>
              </div>
              <div className="flex justify-between text-sm text-emerald-700">
                <span>Voucher Discount</span>
                <span className="font-medium">-500 AED</span>
              </div>
              <Separator />
              <div className="flex justify-between items-center pt-1">
                <span className="text-base font-semibold">Total Due</span>
                <span className="text-lg font-bold">12,047 AED</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </section> */}

      {/* ── Submit ── */}
      <div className="flex items-center justify-between gap-4 rounded-lg border border-primary/20 bg-primary/5 p-5">
        <div className="flex items-center gap-3">
          <BadgeCheckIcon className="size-6 text-primary" />
          <div>
            <p className="text-sm font-semibold">Ready to Submit</p>
            <p className="text-xs text-muted-foreground">
              All booking details have been reviewed and configured.
            </p>
          </div>
        </div>
        <Button onClick={handleSubmit} size="lg" className="gap-2 px-8">
          <SendIcon className="size-4" />
          Submit Booking
        </Button>
      </div>
    </div>
  );
}
