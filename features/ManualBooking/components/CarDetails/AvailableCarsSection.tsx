"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { FormRadioGroup } from "@/components/form";
import { CalendarIcon } from "lucide-react";
import { availableCars } from "./data";

export function AvailableCarsSection() {
  return (
    <section className="space-y-3">
      <div>
        <h2 className="text-lg font-semibold">Available Cars</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Select one of the listed cars for this variant to continue.
        </p>
      </div>

      <FormRadioGroup
        name="availableCarId"
        defaultValue="car-1"
        groupClassName="flex gap-4 overflow-x-auto pb-2"
        options={availableCars.map((car) => ({
          label: car.color,
          value: car.id,
        }))}
        renderOption={({ option, itemId }) => {
          const car = availableCars.find((entry) => entry.id === option.value);
          if (!car) return null;

          return (
            <label htmlFor={itemId} className="cursor-pointer shrink-0 w-72">
              <Card className="relative py-0 h-full overflow-hidden has-checked:border-primary has-checked:ring-2 has-checked:ring-primary/20 transition-all flex flex-col">
                <div className="absolute top-4 right-4 z-10">
                  <RadioGroupItem value={car.id} id={itemId} />
                </div>

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

                  <div className="space-y-1">
                    {car.rates.map((rate) => (
                      <div
                        key={rate.term}
                        className="flex items-center justify-between text-sm"
                      >
                        <span className="text-muted-foreground">{rate.term}</span>
                        <span className="font-medium">{rate.price}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </label>
          );
        }}
      />
    </section>
  );
}
