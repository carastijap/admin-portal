"use client";

import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2Icon } from "lucide-react";

function Row({
  label,
  value,
  bold,
}: {
  label: string;
  value: string;
  bold?: boolean;
}) {
  return (
    <div className="flex justify-between py-1.5">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className={`text-sm ${bold ? "font-semibold" : "font-medium"}`}>
        {value}
      </span>
    </div>
  );
}

export function ReviewStep() {
  return (
    <div className="mx-auto max-w-2xl">
      {/* Receipt wrapper */}
      <div className="rounded-xl border bg-background shadow-sm overflow-hidden">
        {/* Header */}
        <div className="bg-primary/5 px-8 py-6 text-center space-y-1">
          <h2 className="text-xl font-bold tracking-tight">Booking Summary</h2>
          <p className="text-sm text-muted-foreground">
            Please review the details before confirming
          </p>
        </div>

        <div className="px-8 py-6 space-y-0">
          {/* Customer */}
          <div className="pb-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              Customer
            </p>
            <Row label="Name" value="Ahmed Mahmoud" />
            <Row label="Email" value="ahmed@example.com" />
            <Row label="Phone" value="+971 50 123 4567" />
          </div>

          <Separator />

          {/* Booking */}
          <div className="py-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              Booking
            </p>
            <Row label="Start Date" value="2026-03-01" />
            <Row label="Duration" value="12 Months" />
            <Row label="Partner" value="Carasti" />
            <Row label="Pre-Booking" value="No" />
            <Row label="Deposit Insurance" value="Yes (Cardoo)" />
          </div>

          <Separator />

          {/* Vehicle */}
          <div className="py-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              Vehicle
            </p>
            <div className="flex items-center gap-4 mb-3">
              <div className="rounded-lg border p-2 bg-muted/30 shrink-0">
                <Image
                  src="https://carasti-staging.s3.ap-south-1.amazonaws.com/user-documents/1760953815Tahoe_1.png"
                  alt="Chevrolet Tahoe"
                  width={120}
                  height={75}
                  className="object-contain"
                />
              </div>
              <div>
                <p className="font-semibold">Chevrolet Tahoe Z71</p>
                <p className="text-sm text-muted-foreground">2024 &middot; SUV &middot; New</p>
              </div>
            </div>
            <Row label="Extra KM" value="500 KM" />
            <div className="flex justify-between py-1.5">
              <span className="text-sm text-muted-foreground">
                Full Damage Cover
              </span>
              <Badge variant="secondary" className="text-xs">
                Active
              </Badge>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-sm text-muted-foreground">
                Extra Damage Cover
              </span>
              <Badge variant="outline" className="text-xs">
                Inactive
              </Badge>
            </div>
          </div>

          <Separator />

          {/* Delivery */}
          <div className="py-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              Delivery
            </p>
            <Row label="Method" value="Delivery" />
            <Row label="Address" value="Dubai Mall, Dubai" />
            <Row label="Timeslot" value="Afternoon" />
          </div>

          <Separator />

          {/* Pricing */}
          <div className="py-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              Pricing
            </p>
            <Row label="Monthly Rate" value="AED 10,999" />
            <Row label="Deposit" value="AED 0" />
            <Row label="Start Fees" value="AED 399" />
            <Row label="Extra KM" value="AED 350" />
            <Row label="Delivery Fees" value="AED 150" />
            <Row label="Full Damage Cover" value="AED 399" />
            <Row label="Voucher" value="—" />
          </div>

          {/* Dashed divider before total */}
          <div className="border-t-2 border-dashed" />

          {/* Total */}
          <div className="flex justify-between items-center pt-4 pb-2">
            <span className="text-base font-bold">Total</span>
            <span className="text-xl font-bold">AED 11,898</span>
          </div>

          <div className="flex justify-between items-center pb-4">
            <span className="text-sm text-muted-foreground">Payment Method</span>
            <span className="text-sm font-medium">Credit Card</span>
          </div>
        </div>

        {/* Footer */}
        {/* <div className="bg-muted/30 px-8 py-5 flex justify-center">
          <Button size="lg" className="gap-2">
            <CheckCircle2Icon className="size-4" />
            Confirm Booking
          </Button>
        </div> */}
      </div>
    </div>
  );
}
