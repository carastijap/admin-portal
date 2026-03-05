"use client";

import { Row } from "./Row";

export function PricingSection() {
  return (
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
  );
}
