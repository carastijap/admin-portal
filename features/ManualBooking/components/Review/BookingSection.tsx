"use client";

import { Row } from "./Row";

export function BookingSection() {
  return (
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
  );
}
