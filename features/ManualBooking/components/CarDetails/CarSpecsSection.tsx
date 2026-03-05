"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import {
  GaugeIcon,
  CogIcon,
  ArmchairIcon,
  WrenchIcon,
  CarIcon,
  FuelIcon,
} from "lucide-react";

export function CarSpecsSection() {
  return (
    <section className="space-y-3">
      <h2 className="text-lg font-semibold">Car Specs</h2>
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="flex items-center justify-center rounded-lg border p-4">
              <Image
                src="https://carasti-staging.s3.ap-south-1.amazonaws.com/user-documents/1760953815Tahoe_1.png"
                alt="Chevrolet Tahoe"
                width={400}
                height={250}
                className="object-contain"
              />
            </div>

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
  );
}
