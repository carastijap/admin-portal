"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { SelectField } from "./select-field";
import {
  GaugeIcon,
  CogIcon,
  ArmchairIcon,
  WrenchIcon,
  CarIcon,
  FuelIcon,
} from "lucide-react";

const durations = [
  "1 Months",
  "3 Months",
  "6 Months",
  "9 Months",
  "12 Months",
  "24 Months",
  "36 Months",
  "48 Months",
  "60 Months",
];

const ratesNew = ["0", "0", "0", "0", "10999", "9999", "0", "0", "0"];
const ratesUsed = ["0", "0", "0", "0", "0", "0", "0", "0", "0"];

export function CarStep() {
  return (
    <div className="space-y-8">
      {/* Car Details */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Car Details</h2>
        <Card>
          <CardContent className="pt-6 space-y-6">
            {/* Row 1: Make, Model, Trim */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <SelectField
                label="Make"
                placeholder="Select Make"
                options={["Chevrolet", "Toyota", "Ford", "BMW", "Honda"]}
                defaultValue="chevrolet"
              />
              <SelectField
                label="Model"
                placeholder="Select Model"
                options={["Tahoe", "Suburban", "Silverado", "Camaro"]}
                defaultValue="tahoe"
              />
              <SelectField
                label="Trim"
                placeholder="Select Trim"
                options={["Z71", "LT", "RST", "High Country"]}
                defaultValue="z71"
              />
            </div>

            {/* Row 2: Year, Category */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <SelectField
                label="Year"
                placeholder="Select Year"
                options={["2024", "2023", "2022", "2021"]}
                defaultValue="2024"
              />
              <SelectField
                label="Category"
                placeholder="Select Category"
                options={["SUV", "Sedan", "Truck", "Coupe"]}
                defaultValue="suv"
              />
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Car Rates */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Car Rates</h2>
        <Card>
          <CardContent className="pt-6 space-y-4">
            {/* Rate table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr>
                    <th className="text-left font-normal text-muted-foreground pb-3 pr-4 min-w-[60px]" />
                    {durations.map((d) => (
                      <th
                        key={d}
                        className="text-center font-normal text-muted-foreground pb-3 px-1.5 min-w-[90px]"
                      >
                        {d}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="pr-4 py-2">
                      <Label className="text-sm text-primary font-medium">
                        New
                      </Label>
                    </td>
                    {ratesNew.map((rate, i) => (
                      <td key={i} className="px-1.5 py-2">
                        <Input
                          defaultValue={rate}
                          className="text-center h-9"
                        />
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="pr-4 py-2">
                      <Label className="text-sm text-primary font-medium">
                        Used
                      </Label>
                    </td>
                    {ratesUsed.map((rate, i) => (
                      <td key={i} className="px-1.5 py-2">
                        <Input
                          defaultValue={rate}
                          className="text-center h-9"
                        />
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Discount note + Load button */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              <span className="text-sm text-muted-foreground italic">
                No discount found for this car.
              </span>
              <Button variant="outline">Load Car Details</Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Car Specs */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Car Specs</h2>
        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Car image */}
              <div className="flex items-center justify-center rounded-lg border p-4">
                <Image
                  src="https://carasti-staging.s3.ap-south-1.amazonaws.com/user-documents/1760953815Tahoe_1.png"
                  alt="Chevrolet Tahoe"
                  width={400}
                  height={250}
                  className="object-contain"
                />
              </div>

              {/* Spec badges */}
              <div className="flex flex-wrap content-start gap-3">
                {[
                  { icon: GaugeIcon, label: "4" },
                  { icon: CogIcon, label: "6.2" },
                  { icon: ArmchairIcon, label: "8" },
                  { icon: WrenchIcon, label: "Auto" },
                  { icon: CarIcon, label: "SUV" },
                  { icon: FuelIcon, label: "Petrol" },
                ].map((spec) => (
                  <div
                    key={spec.label}
                    className="flex items-center gap-2 rounded-lg border px-4 py-2.5"
                  >
                    <spec.icon className="size-5 text-muted-foreground" />
                    <span className="text-sm font-medium">{spec.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Car Addons */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Car Addons</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Extra KM */}
          <Card>
            <CardContent className="pt-6 space-y-4">
              <Label className="text-sm font-semibold text-primary">
                Extra KM:
              </Label>
              <SelectField
                label=""
                placeholder="select extra km"
                options={["500 KM", "1000 KM", "1500 KM", "2000 KM"]}
              />
            </CardContent>
          </Card>

          {/* Full Damage Cover */}
          <Card>
            <CardContent className="pt-6 space-y-4">
              <Label className="text-sm font-semibold text-primary">
                Full Damage Cover:
              </Label>
              <Switch />
              <p className="text-sm font-semibold">Cost: AED 399</p>
            </CardContent>
          </Card>

          {/* Extra Damage Cover */}
          <Card>
            <CardContent className="pt-6 space-y-4">
              <Label className="text-sm font-semibold text-primary">
                Extra Damage Cover:
              </Label>
              <Switch />
              <p className="text-sm font-semibold">Cost: AED 299</p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
