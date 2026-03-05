"use client";

import { Row } from "./Row";

export function CustomerSection() {
  return (
    <div className="pb-4">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
        Customer
      </p>
      <Row label="Name" value="Ahmed Mahmoud" />
      <Row label="Email" value="ahmed@example.com" />
      <Row label="Phone" value="+971 50 123 4567" />
    </div>
  );
}
