"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SelectField } from "./select-field";

export function DeliveryPaymentStep() {
  return (
    <div className="space-y-8">
      {/* Delivery Details */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Delivery Details</h2>
        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <SelectField
                label="Delivery Method"
                placeholder="Select method"
                options={["Delivery", "Pickup"]}
                defaultValue="delivery"
              />
              <div className="flex flex-col gap-1.5">
                <Label className="text-sm text-muted-foreground">Address</Label>
                <Input
                  defaultValue="Dubai Mall - Dubai - United Arab Emirates"
                  className="h-10"
                />
              </div>
              <SelectField
                label="Timeslot"
                placeholder="Select timeslot"
                options={["Morning", "Afternoon", "Evening"]}
                defaultValue="afternoon"
              />
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Payment Details */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Payment Details</h2>
        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left – options */}
              <div className="space-y-6">
                {/* Wallet */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">
                    Wallet is used:{" "}
                    <span className="text-muted-foreground font-normal">
                      (available amount: 0 AED)
                    </span>
                  </Label>
                  <RadioGroup defaultValue="no" className="flex gap-6">
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="yes" id="wallet-yes" />
                      <Label htmlFor="wallet-yes" className="font-normal">
                        Yes
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="no" id="wallet-no" />
                      <Label htmlFor="wallet-no" className="font-normal">
                        No
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Free Delivery */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Free Delivery</Label>
                  <RadioGroup defaultValue="no" className="flex gap-6">
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="yes" id="delivery-yes" />
                      <Label htmlFor="delivery-yes" className="font-normal">
                        Yes
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="no" id="delivery-no" />
                      <Label htmlFor="delivery-no" className="font-normal">
                        No
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Charge Deposit */}
                <SelectField
                  label="Charge Deposit"
                  placeholder="Select"
                  options={["Yes", "No"]}
                  defaultValue="no"
                />

                {/* Payment Method */}
                <SelectField
                  label="Payment Method"
                  placeholder="Select"
                  options={[
                    "Credit Card",
                    "Debit Card",
                    "Cash",
                    "Bank Transfer",
                  ]}
                />
              </div>

              {/* Right – price summary */}
              <div className="space-y-4">
                <div className="rounded-lg border p-5 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      Original Price
                    </span>
                    <span className="font-medium">10,999</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Deposit</span>
                    <span className="font-medium">0</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Start Fees</span>
                    <span className="font-medium">399</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Extra KM</span>
                    <span className="font-medium">350</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Delivery Fees</span>
                    <span className="font-medium">150</span>
                  </div>
                </div>

                {/* Voucher */}
                <div className="flex items-end gap-3">
                  <div className="flex-1 space-y-1.5">
                    <Label className="text-sm text-muted-foreground">
                      Voucher
                    </Label>
                    <Input placeholder="Apply Voucher" className="h-10" />
                  </div>
                  <button
                    type="button"
                    className="text-sm text-primary font-medium hover:underline pb-2.5"
                  >
                    apply voucher
                  </button>
                </div>

                {/* Total */}
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-base font-semibold">Total:</span>
                  <span className="text-lg font-bold">AED 11,898</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
