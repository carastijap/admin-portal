"use client";

type ManualBookingErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ManualBookingError({ reset }: ManualBookingErrorProps) {
  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold">Something went wrong</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        We could not load manual booking data.
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-4 rounded-md border px-3 py-2 text-sm"
      >
        Try again
      </button>
    </div>
  );
}
