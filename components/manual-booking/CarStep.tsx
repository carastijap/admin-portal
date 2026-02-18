"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SelectField } from "./SelectField";
import {
  GaugeIcon,
  CogIcon,
  ArmchairIcon,
  WrenchIcon,
  CarIcon,
  FuelIcon,
  CalendarIcon,
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

const availableCars = [
  {
    id: "car-1",
    image:
      "https://carasti-staging.s3.ap-south-1.amazonaws.com/user-documents/1760953815Tahoe_1.png",
    color: "Pearl White",
    numberPlate: "A 12345 Dubai",
    defleetDate: "2026-08-15",
    rates: [
      { term: "12 months", price: "5,999 AED" },
      { term: "24 months", price: "5,499 AED" },
      { term: "36 months", price: "4,999 AED" },
    ],
  },
  {
    id: "car-1a",
    image:
      "https://carasti-staging.s3.ap-south-1.amazonaws.com/user-documents/1760953815Tahoe_1.png",
    color: "Black",
    numberPlate: "A 12345 Dubai",
    defleetDate: "2026-08-29",
    rates: [
      { term: "12 months", price: "5,999 AED" },
      { term: "24 months", price: "5,499 AED" },
      { term: "36 months", price: "4,999 AED" },
    ],
  },
  {
    id: "car-2",
    image:
      "https://carasti-staging.s3.ap-south-1.amazonaws.com/user-documents/1760953815Tahoe_1.png",
    color: "Shadow Grey",
    numberPlate: "B 67890 Dubai",
    defleetDate: "2026-11-20",
    rates: [
      { term: "12 months", price: "5,899 AED" },
      { term: "24 months", price: "5,399 AED" },
    ],
  },
  {
    id: "car-3",
    image:
      "https://carasti-staging.s3.ap-south-1.amazonaws.com/user-documents/1760953815Tahoe_1.png",
    color: "Midnight Black",
    numberPlate: "C 11223 Abu Dhabi",
    defleetDate: "2027-02-10",
    rates: [
      { term: "12 months", price: "6,199 AED" },
      { term: "24 months", price: "5,699 AED" },
      { term: "36 months", price: "5,199 AED" },
    ],
  },
];

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
      {/* <section className="space-y-3">
        <h2 className="text-lg font-semibold">Car Rates</h2>
        <Card>
          <CardContent className="pt-6 space-y-4">
          
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

            
            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              <span className="text-sm text-muted-foreground italic">
                No discount found for this car.
              </span>
              <Button variant="outline">Load Car Details</Button>
            </div>
          </CardContent>
        </Card>
      </section> */}

      {/* Available Cars (radio selection) */}
      <section className="space-y-3">
        <div>
          <h2 className="text-lg font-semibold">Available Cars</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Select one of the listed cars for this variant to continue.
          </p>
        </div>

        <RadioGroup defaultValue="car-1" className="flex gap-4 overflow-x-auto pb-2">
          {availableCars.map((car) => (
            <label key={car.id} htmlFor={car.id} className="cursor-pointer shrink-0 w-72">
              <Card className="relative py-0 h-full overflow-hidden has-checked:border-primary has-checked:ring-2 has-checked:ring-primary/20 transition-all flex flex-col">
                {/* Radio positioned top-right */}
                <div className="absolute top-4 right-4 z-10">
                  <RadioGroupItem value={car.id} id={car.id} />
                </div>

                {/* Car image */}
                <div className="flex items-center justify-center bg-muted/40 p-4">
                  <Image
                    src={car.image}
                    alt={`${car.color} Tahoe`}
                    width={240}
                    height={140}
                    className="object-contain"
                  />
                </div>

                <CardContent className="p-4 space-y-3 flex-1">
                  {/* Color & plate */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold">{car.color}</span>
                      <Badge variant="outline" className="text-xs font-mono">
                        {car.numberPlate}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <CalendarIcon className="size-3" />
                      Defleet: {car.defleetDate}
                    </div>
                  </div>

                  <Separator />

                  {/* Rates */}
                  <div className="space-y-1">
                    {car.rates.map((r) => (
                      <div
                        key={r.term}
                        className="flex items-center justify-between text-sm"
                      >
                        <span className="text-muted-foreground">{r.term}</span>
                        <span className="font-medium">{r.price}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </label>
          ))}
        </RadioGroup>
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

      {/* Car Configuration (shown after selection) */}
      <section className="space-y-3">
        <div>
          <h2 className="text-lg font-semibold">Car Configuration</h2>
          <p className="text-sm text-muted-foreground mt-1">
            All fields are mandatory to proceed.
          </p>
        </div>
        <Card>
          <CardContent className="pt-6 space-y-6">
            {/* Row 1 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <SelectField
                label="Duration *"
                placeholder="Select Duration"
                options={[
                  "Weekly",
                  "1 Month",
                  "FLEX",
                  "3 Months",
                  "6 Months",
                  "9 Months",
                  "12 Months",
                  "24 Months",
                  "36 Months",
                ]}
                defaultValue="12-months"
              />
              <div className="flex flex-col gap-1.5">
                <Label className="text-sm text-muted-foreground">Price *</Label>
                <Input defaultValue="5999" placeholder="Enter price" />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label className="text-sm text-muted-foreground">
                  Supplier Price *
                </Label>
                <Input defaultValue="4500" placeholder="Enter supplier price" />
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="flex flex-col gap-1.5">
                <Label className="text-sm text-muted-foreground">
                  Discount Amount *
                </Label>
                <Input defaultValue="0" placeholder="Enter discount" />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label className="text-sm text-muted-foreground">Color *</Label>
                <Input defaultValue="Pearl White" placeholder="Enter color" />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label className="text-sm text-muted-foreground">
                  Number Plate *
                </Label>
                <Input
                  defaultValue="A 12345 Dubai"
                  placeholder="Enter number plate"
                />
              </div>
            </div>

            {/* Row 3 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="flex flex-col gap-1.5">
                <Label className="text-sm text-muted-foreground">
                  Chassis Number *
                </Label>
                <Input
                  defaultValue="1GNSKCKD4RR123456"
                  placeholder="Enter chassis number"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label className="text-sm text-muted-foreground">
                  Defleet Date *
                </Label>
                <Input
                  type="date"
                  defaultValue="2026-08-15"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label className="text-sm text-muted-foreground">Owner *</Label>
                <Input
                  defaultValue="Carasti Fleet Co."
                  placeholder="Enter owner"
                />
              </div>
            </div>

            {/* Row 4 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="flex flex-col gap-1.5">
                <Label className="text-sm text-muted-foreground">
                  Basic Mileage Allowance *
                </Label>
                <Input
                  defaultValue="4000"
                  placeholder="Enter mileage allowance (km)"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
