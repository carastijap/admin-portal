"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  ShieldCheckIcon,
  PlusIcon,
  MinusIcon,
  UserPlusIcon,
  CarIcon,
  PencilIcon,
} from "lucide-react";

const insurancePackages = [
  {
    id: "comprehensive",
    name: "Comprehensive Cover",
    provider: "AXA Insurance",
    price: "450",
    description: "Full coverage including theft, accident, and natural disasters.",
  },
  {
    id: "standard",
    name: "Standard Cover",
    provider: "RSA Insurance",
    price: "300",
    description: "Covers accident damage and third-party liability.",
  },
  {
    id: "basic",
    name: "Basic Package",
    provider: "Included",
    price: "0",
    description: "Third-party liability only. Free of charge.",
    isFree: true,
  },
];

const extraKmPackages = [
  { id: "km-500", label: "500 KM", price: "250" },
  { id: "km-1000", label: "1,000 KM", price: "450" },
  { id: "km-2000", label: "2,000 KM", price: "800" },
  { id: "km-unlimited", label: "Unlimited KM", price: "1,500" },
];

function DriverForm({ driverNumber }: { driverNumber: number }) {
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
          <div className="flex flex-col gap-1.5">
            <Label className="text-sm text-muted-foreground">First Name</Label>
            <Input placeholder="Enter first name" />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label className="text-sm text-muted-foreground">Last Name</Label>
            <Input placeholder="Enter last name" />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label className="text-sm text-muted-foreground">Email</Label>
            <Input type="email" placeholder="Enter email" />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label className="text-sm text-muted-foreground">Phone</Label>
            <Input type="tel" placeholder="Enter phone number" />
          </div>
        </div>

        <Separator />

        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          Documents
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {["ID Front", "ID Back", "License Front", "License Back"].map(
            (doc) => (
              <div
                key={doc}
                className="aspect-4/3 rounded-md border border-dashed border-border bg-muted/30 flex flex-col items-center justify-center gap-1 cursor-pointer hover:bg-muted/50 transition-colors"
              >
                <PlusIcon className="size-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{doc}</span>
              </div>
            )
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export function CarAddons() {
  return (
    <div className="space-y-8">
      {/* ── Deposit Options ── */}
      <section className="space-y-3">
        <div>
          <h2 className="text-lg font-semibold">Deposit Options</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Select one deposit option for this booking.
          </p>
        </div>

        <RadioGroup defaultValue="refundable" className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Refundable Deposit */}
          <label htmlFor="refundable" className="cursor-pointer">
            <Card className="relative py-0 h-full has-checked:border-primary has-checked:ring-2 has-checked:ring-primary/20 transition-all">
              <div className="absolute top-4 right-4">
                <RadioGroupItem value="refundable" id="refundable" />
              </div>
              <CardContent className="p-5 space-y-2">
                <p className="text-sm font-semibold pr-6">Refundable Deposit</p>
                <p className="text-xs text-muted-foreground">
                  One month of car price, fully refundable at the end of the
                  contract.
                </p>
                <div className="pt-2">
                  <Badge variant="secondary" className="text-xs font-medium">
                    5,999 AED
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </label>

          {/* No Deposit Fee */}
          <label htmlFor="no-deposit" className="cursor-pointer">
            <Card className="relative py-0 h-full has-checked:border-primary has-checked:ring-2 has-checked:ring-primary/20 transition-all">
              <div className="absolute top-4 right-4">
                <RadioGroupItem value="no-deposit" id="no-deposit" />
              </div>
              <CardContent className="p-5 space-y-2">
                <p className="text-sm font-semibold pr-6">No Deposit Fee</p>
                <p className="text-xs text-muted-foreground">
                  Non-refundable fee between 7.5%–10% of the car price instead
                  of a deposit.
                </p>
                <div className="pt-2">
                  <Badge variant="secondary" className="text-xs font-medium">
                    450 – 600 AED
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </label>
        </RadioGroup>
      </section>

      <Separator />

      {/* ── Insurance Packages ── */}
      <section className="space-y-3">
        <div>
          <h2 className="text-lg font-semibold">Insurance Packages</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Select one insurance package. You can edit the price for paid
            packages.
          </p>
        </div>

        <RadioGroup defaultValue="comprehensive" className="space-y-3">
          {insurancePackages.map((pkg) => (
            <label key={pkg.id} htmlFor={pkg.id} className="cursor-pointer block">
              <Card className="relative py-0 has-checked:border-primary has-checked:ring-2 has-checked:ring-primary/20 transition-all">
                <div className="absolute top-4 right-4">
                  <RadioGroupItem value={pkg.id} id={pkg.id} />
                </div>
                <CardContent className="p-5">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 pr-6">
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2">
                        <ShieldCheckIcon className="size-4 text-primary" />
                        <p className="text-sm font-semibold">{pkg.name}</p>
                        {pkg.isFree && (
                          <Badge className="text-xs bg-emerald-50 text-emerald-700 border-0">
                            Free
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {pkg.provider}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {pkg.description}
                      </p>
                    </div>

                    {!pkg.isFree && (
                      <div className="flex items-center gap-2 shrink-0">
                        <Input
                          defaultValue={pkg.price}
                          className="w-24 h-9 text-center text-sm"
                        />
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          AED/mo
                        </span>
                        {/* <PencilIcon className="size-3.5 text-muted-foreground" /> */}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </label>
          ))}
        </RadioGroup>
      </section>

      <Separator />

      {/* ── Additional Drivers ── */}
      <section className="space-y-3">
        <div>
          <h2 className="text-lg font-semibold">Additional Drivers</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Add up to 2 additional drivers. Fee: 150 AED per driver.
          </p>
        </div>

        <Card className="py-0">
          <CardContent className="p-5 space-y-4">
            {/* Fee + waive toggle */}
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <p className="text-sm font-medium">Driver Fee</p>
                <p className="text-xs text-muted-foreground">
                  150 AED per additional driver
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Label className="text-sm text-muted-foreground">Waive Fee</Label>
                <Switch />
              </div>
            </div>

            <Separator />

            {/* Counter */}
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Number of Drivers</p>
              <div className="flex items-center gap-3">
                <Button variant="outline" size="icon" className="size-8">
                  <MinusIcon className="size-4" />
                </Button>
                <span className="text-sm font-semibold w-6 text-center">2</span>
                <Button variant="outline" size="icon" className="size-8">
                  <PlusIcon className="size-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Driver forms */}
        <div className="space-y-4">
          <DriverForm driverNumber={1} />
          <DriverForm driverNumber={2} />
        </div>
      </section>

      <Separator />

      {/* ── Extra KM Packages ── */}
      <section className="space-y-3">
        <div>
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <CarIcon className="size-5" />
            Extra KM Packages
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Select an extra mileage package. You can adjust the price.
          </p>
        </div>

        <RadioGroup defaultValue="km-1000" className="space-y-3">
          {extraKmPackages.map((pkg) => (
            <label key={pkg.id} htmlFor={pkg.id} className="cursor-pointer block">
              <Card className="relative py-0 has-checked:border-primary has-checked:ring-2 has-checked:ring-primary/20 transition-all">
                <div className="absolute top-4 right-4">
                  <RadioGroupItem value={pkg.id} id={pkg.id} />
                </div>
                <CardContent className="p-5">
                  <div className="flex items-center justify-between pr-6">
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="text-xs font-mono">
                        {pkg.label}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        extra per month
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Input
                        defaultValue={pkg.price}
                        className="w-24 h-9 text-center text-sm"
                      />
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        AED/mo
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </label>
          ))}
        </RadioGroup>
      </section>
    </div>
  );
}
