"use client";

export function TotalsSection() {
  return (
    <>
      <div className="border-t-2 border-dashed" />

      <div className="flex justify-between items-center pt-4 pb-2">
        <span className="text-base font-bold">Total</span>
        <span className="text-xl font-bold">AED 11,898</span>
      </div>

      <div className="flex justify-between items-center pb-4">
        <span className="text-sm text-muted-foreground">Payment Method</span>
        <span className="text-sm font-medium">Credit Card</span>
      </div>
    </>
  );
}
