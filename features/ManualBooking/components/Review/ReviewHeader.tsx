"use client";

export function ReviewHeader() {
  return (
    <div className="bg-primary/5 px-8 py-6 text-center space-y-1">
      <h2 className="text-xl font-bold tracking-tight">Booking Summary</h2>
      <p className="text-sm text-muted-foreground">
        Please review the details before confirming
      </p>
    </div>
  );
}
