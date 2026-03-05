"use client";

import { Row } from "./Row";

export function DeliverySection() {
  return (
    <div className="py-4">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
        Delivery
      </p>
      <Row label="Method" value="Delivery" />
      <Row label="Address" value="Dubai Mall, Dubai" />
      <Row label="Timeslot" value="Afternoon" />
    </div>
  );
}
