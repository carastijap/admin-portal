"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Row } from "./Row";

export function VehicleSection() {
  return (
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
        <span className="text-sm text-muted-foreground">Full Damage Cover</span>
        <Badge variant="secondary" className="text-xs">
          Active
        </Badge>
      </div>
      <div className="flex justify-between py-1.5">
        <span className="text-sm text-muted-foreground">Extra Damage Cover</span>
        <Badge variant="outline" className="text-xs">
          Inactive
        </Badge>
      </div>
    </div>
  );
}
