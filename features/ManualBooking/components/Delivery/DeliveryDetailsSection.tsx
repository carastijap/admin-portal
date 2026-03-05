"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { RadioGroupItem } from "@/components/ui/radio-group";
import {
  FormDatePicker,
  FormInput,
  FormRadioGroup,
  FormSelect,
  FormSwitch,
} from "@/components/form";
import { MapPinIcon, TruckIcon } from "lucide-react";

type DeliveryDetailsSectionProps = {
  deliveryMethod: string;
};

export function DeliveryDetailsSection({
  deliveryMethod,
}: DeliveryDetailsSectionProps) {
  return (
    <section className="space-y-3">
      <div>
        <h2 className="text-lg font-semibold">Delivery Details</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Configure how and when the car will be handed over to the customer.
        </p>
      </div>

      <Card>
        <CardContent className="pt-6 space-y-6">
          <FormRadioGroup
            name="deliveryMethod"
            label="Delivery Method"
            defaultValue="delivery"
            groupClassName="grid grid-cols-1 gap-4 sm:grid-cols-2"
            options={[
              { label: "Delivery", value: "delivery" },
              { label: "Pickup", value: "pickup" },
            ]}
            renderOption={({ option, itemId }) => (
              <label htmlFor={itemId} className="cursor-pointer">
                <Card className="relative h-full py-0 has-checked:border-primary has-checked:ring-2 has-checked:ring-primary/20 transition-all">
                  <div className="absolute right-4 top-4">
                    <RadioGroupItem value={option.value} id={itemId} />
                  </div>
                  <CardContent className="flex items-start gap-3 p-4 pr-10">
                    <div className="shrink-0 rounded-lg bg-primary/10 p-2">
                      {option.value === "delivery" ? (
                        <TruckIcon className="size-5 text-primary" />
                      ) : (
                        <MapPinIcon className="size-5 text-primary" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{option.label}</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {option.value === "delivery"
                          ? "Deliver to the customer's address."
                          : "Customer picks up from supplier location."}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </label>
            )}
          />

          <Separator />

          {deliveryMethod === "delivery" ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <FormDatePicker
                  name="deliveryDate"
                  label="Date of Delivery"
                  placeholder="Date of Delivery"
                />
                <FormSelect
                  triggerClassName="w-full"
                  name="deliveryCity"
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
                  ].map((option) => ({
                    label: option,
                    value: option.toLowerCase().replace(/\s+/g, "-"),
                  }))}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <FormInput
                  name="deliveryAddress"
                  label="Delivery Address"
                  placeholder="Enter delivery address"
                  className="h-10"
                />
              </div>
            </>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <FormSelect
                triggerClassName="w-full"
                name="deliveryTimeSlot"
                label="Time Slot"
                placeholder="Select time slot"
                options={[
                  "09:00 AM - 12:00 PM",
                  "12:00 PM - 03:00 PM",
                  "03:00 PM - 06:00 PM",
                  "06:00 PM - 09:00 PM",
                ].map((option) => ({
                  label: option,
                  value: option.toLowerCase().replace(/\s+/g, "-"),
                }))}
              />
              <FormSelect
                triggerClassName="w-full"
                name="pickupLocation"
                label="Pickup Location"
                placeholder="Select supplier location"
                options={[
                  "Main Showroom - Al Quoz",
                  "Branch - Business Bay",
                  "Branch - JLT",
                  "Branch - Abu Dhabi Corniche",
                ].map((option) => ({
                  label: option,
                  value: option.toLowerCase().replace(/\s+/g, "-"),
                }))}
              />
            </div>
          )}

          {deliveryMethod === "delivery" ? (
            <>
              <Separator />

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
                <FormSwitch
                  name="deliveryFeeWaived"
                  label="Waive Fee"
                  containerClassName="min-w-32"
                />
              </div>
            </>
          ) : null}
        </CardContent>
      </Card>
    </section>
  );
}
