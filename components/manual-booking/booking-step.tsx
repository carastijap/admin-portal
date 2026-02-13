"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SearchIcon } from "lucide-react";
import { DatePickerField } from "./date-picker-field";
import { SelectField } from "./select-field";

export function BookingStep() {
  return (
    <div className="space-y-8">
      {/* User information */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold">User information</h2>
        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
              <div className="relative">
                <Input placeholder="Search" className="pr-10" />
                <SearchIcon className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
              </div>
              <div className="flex flex-col gap-1">
                <Label className="text-sm text-muted-foreground">Name:</Label>
                <span className="text-sm font-medium">-</span>
              </div>
              <div className="flex flex-col gap-1">
                <Label className="text-sm text-muted-foreground">Email:</Label>
                <span className="text-sm font-medium">-</span>
              </div>
              <div className="flex flex-col gap-1">
                <Label className="text-sm text-muted-foreground">Phone:</Label>
                <span className="text-sm font-medium">-</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Booking details */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Booking details</h2>
        <Card>
          <CardContent className="pt-6 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <DatePickerField label="Start date:" />
              <SelectField
                label="Partner:"
                placeholder="Select Partner"
                options={["Partner A", "Partner B", "Partner C"]}
              />
              <SelectField
                label="Upsell:"
                placeholder="No"
                options={["No", "Yes"]}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <SelectField
                label="Pre Booking:"
                placeholder="No"
                options={["No", "Yes"]}
              />
              <SelectField
                label="Deposit Insurance (Cardoo):"
                placeholder="No"
                options={["No", "Yes"]}
              />
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
