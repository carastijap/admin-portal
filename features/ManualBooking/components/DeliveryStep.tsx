"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SelectField } from "./SelectField";
import { DatePickerField } from "./DatePickerField";
import { TruckIcon, MapPinIcon } from "lucide-react";

export function DeliveryStep() {
  return (
    <div className="space-y-8">
      {/* ── 5.1 Delivery Details ── */}
      <section className="space-y-3">
        <div>
          <h2 className="text-lg font-semibold">Delivery Details</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Configure how and when the car will be handed over to the customer.
          </p>
        </div>

        <Card>
          <CardContent className="pt-6 space-y-6">
            {/* Delivery Method */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Delivery Method</Label>
              <RadioGroup defaultValue="delivery" className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label htmlFor="method-delivery" className="cursor-pointer">
                  <Card className="relative py-0 h-full has-checked:border-primary has-checked:ring-2 has-checked:ring-primary/20 transition-all">
                    <div className="absolute top-4 right-4">
                      <RadioGroupItem value="delivery" id="method-delivery" />
                    </div>
                    <CardContent className="p-4 flex items-start gap-3 pr-10">
                      <div className="rounded-lg bg-primary/10 p-2 shrink-0">
                        <TruckIcon className="size-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold">Delivery</p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Deliver to the customer&apos;s address.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </label>

                <label htmlFor="method-pickup" className="cursor-pointer">
                  <Card className="relative py-0 h-full has-checked:border-primary has-checked:ring-2 has-checked:ring-primary/20 transition-all">
                    <div className="absolute top-4 right-4">
                      <RadioGroupItem value="pickup" id="method-pickup" />
                    </div>
                    <CardContent className="p-4 flex items-start gap-3 pr-10">
                      <div className="rounded-lg bg-primary/10 p-2 shrink-0">
                        <MapPinIcon className="size-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold">Pickup</p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Customer picks up from supplier location.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </label>
              </RadioGroup>
            </div>

            <Separator />

            {/* Date + Time + City */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <DatePickerField label="Date of Delivery" />
              <SelectField
                label="Time Slot"
                placeholder="Select time slot"
                options={[
                  "09:00 AM – 12:00 PM",
                  "12:00 PM – 03:00 PM",
                  "03:00 PM – 06:00 PM",
                  "06:00 PM – 09:00 PM",
                ]}
                defaultValue="12:00-pm-–-03:00-pm"
              />
              <SelectField
                label="Delivery City"
                placeholder="Select city"
                options={[
                  "Dubai",
                  "Abu Dhabi",
                  "Sharjah",
                  "Ajman",
                  "Al Ain",
                  "Ras Al Khaimah",
                  "Fujairah",
                ]}
                defaultValue="dubai"
              />
            </div>

            {/* Address / Pickup Location */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col gap-1.5">
                <Label className="text-sm text-muted-foreground">
                  Delivery Address
                </Label>
                <Input
                  defaultValue="Dubai Mall, Financial Center Rd, Downtown Dubai"
                  placeholder="Enter delivery address"
                  className="h-10"
                />
              </div>
              <SelectField
                label="Pickup Location"
                placeholder="Select supplier location"
                options={[
                  "Main Showroom – Al Quoz",
                  "Branch – Business Bay",
                  "Branch – JLT",
                  "Branch – Abu Dhabi Corniche",
                ]}
              />
            </div>

            <Separator />

            {/* Delivery Fee */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div>
                  <p className="text-sm font-medium">Delivery Fee</p>
                  <p className="text-xs text-muted-foreground">
                    Calculated by the system based on city and distance.
                  </p>
                </div>
                <Badge variant="secondary" className="text-xs font-medium">
                  150 AED
                </Badge>
              </div>
              <div className="flex items-center gap-3">
                <Label className="text-sm text-muted-foreground">Waive Fee</Label>
                <Switch />
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* ── 5.2 One-Time Fees ── */}
      <section className="space-y-3">
        <div>
          <h2 className="text-lg font-semibold">One-Time Fees</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Configure one-time charges applied at the start of the subscription.
          </p>
        </div>

        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="flex flex-col gap-1.5">
                <Label className="text-sm text-muted-foreground">
                  Start Fees (AED)
                </Label>
                <Input defaultValue="399" placeholder="Enter start fees" />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label className="text-sm text-muted-foreground">
                  Tinting Fees (AED)
                </Label>
                <Input defaultValue="0" placeholder="Enter tinting fees" />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label className="text-sm text-muted-foreground">
                  Upfront Fees (AED)
                </Label>
                <Input defaultValue="0" placeholder="Enter upfront fees" />
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
