"use client";

import { Card, CardContent } from "@/components/ui/card";
import { FormSelect } from "@/components/form";

export function CarDetailsSection() {
  return (
    <section className="space-y-3">
      <h2 className="text-lg font-semibold">Car Details</h2>
      <Card>
        <CardContent className="pt-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <FormSelect
              triggerClassName="w-full"
              name="carMake"
              label="Make"
              placeholder="Select Make"
              options={["Chevrolet", "Toyota", "Ford", "BMW", "Honda"].map((option) => ({
                label: option,
                value: option.toLowerCase().replace(/\s+/g, "-"),
              }))}
            />
            <FormSelect
              triggerClassName="w-full"
              name="carModel"
              label="Model"
              placeholder="Select Model"
              options={["Tahoe", "Suburban", "Silverado", "Camaro"].map((option) => ({
                label: option,
                value: option.toLowerCase().replace(/\s+/g, "-"),
              }))}
            />
            <FormSelect
              triggerClassName="w-full"
              name="carTrim"
              label="Trim"
              placeholder="Select Trim"
              options={["Z71", "LT", "RST", "High Country"].map((option) => ({
                label: option,
                value: option.toLowerCase().replace(/\s+/g, "-"),
              }))}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <FormSelect
              triggerClassName="w-full"
              name="carYear"
              label="Year"
              placeholder="Select Year"
              options={["2024", "2023", "2022", "2021"].map((option) => ({
                label: option,
                value: option.toLowerCase().replace(/\s+/g, "-"),
              }))}
            />
            <FormSelect
              triggerClassName="w-full"
              name="carCategory"
              label="Category"
              placeholder="Select Category"
              options={["SUV", "Sedan", "Truck", "Coupe"].map((option) => ({
                label: option,
                value: option.toLowerCase().replace(/\s+/g, "-"),
              }))}
            />
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
