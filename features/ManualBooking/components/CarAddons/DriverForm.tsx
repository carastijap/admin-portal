"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { FormInput } from "@/components/form";
import { PlusIcon, UserPlusIcon } from "lucide-react";
import type { Path } from "react-hook-form";
import { ManualBookingFormValues } from "../../types";

export function DriverForm({ driverNumber }: { driverNumber: number }) {
  const fieldName = (key: string) =>
    `additionalDrivers.${driverNumber - 1}.${key}` as Path<ManualBookingFormValues>;

  return (
    <Card className="py-0 overflow-hidden">
      <div className="bg-muted/40 px-4 py-3 border-b">
        <p className="text-sm font-semibold flex items-center gap-2">
          <UserPlusIcon className="size-4" />
          Additional Driver {driverNumber}
        </p>
      </div>
      <CardContent className="p-4 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormInput
            name={fieldName("firstName")}
            label="First Name"
            placeholder="Enter first name"
            containerClassName="gap-1.5"
          />
          <FormInput
            name={fieldName("lastName")}
            label="Last Name"
            placeholder="Enter last name"
            containerClassName="gap-1.5"
          />
          <FormInput
            name={fieldName("email")}
            type="email"
            label="Email"
            placeholder="Enter email"
            containerClassName="gap-1.5"
          />
          <FormInput
            name={fieldName("phone")}
            type="tel"
            label="Phone"
            placeholder="Enter phone number"
            containerClassName="gap-1.5"
          />
        </div>

        <Separator />

        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          Documents
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {["ID Front", "ID Back", "License Front", "License Back"].map((doc) => (
            <div
              key={doc}
              className="aspect-4/3 rounded-md border border-dashed border-border bg-muted/30 flex flex-col items-center justify-center gap-1 cursor-pointer hover:bg-muted/50 transition-colors"
            >
              <PlusIcon className="size-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">{doc}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
