import * as React from "react";
import { CheckIcon } from "lucide-react";

const steps = [
  { number: 1, label: "Look up and Confirmation", description: " Identify and verify the customer before creating a booking." },
  {
    number: 2,
    label: "Car Details",
    description: "Select and configure the car details for the booking.",
  },
  { number: 3, label: "Deposit, Insurance & Add-ons", description: "Configure Deposit items and add-ons." },
  { number: 4, label: "Delivery & One-Time Fees", description: "Define delivery details and one-time charges" },
  { number: 5, label: "Overview", description: "Display a summary of all details entered in previous steps." },
  { number: 6, label: "Payment & Submission", description: "Finalize the booking details and proceed." },
];

export function Stepper({ currentStep }: { currentStep: number }) {
  return (
    <nav aria-label="Booking steps" className="w-full space-y-4">
      <h3 className="text-sm font-semibold">Booking Journey</h3>
      <ol className="relative flex flex-col gap-0">
        {steps.map((step, i) => {
          const isCompleted = step.number < currentStep;
          const isCurrent = step.number === currentStep;
          const isUpcoming = step.number > currentStep;

          return (
            <li key={step.number} className="relative flex gap-4">
              {/* Vertical connector line */}
              <div className="flex flex-col items-center">
                {/* Step circle */}
                <div
                  className={`relative z-10 flex items-center justify-center size-9 rounded-full border-2 shrink-0 transition-colors ${
                    isCompleted
                      ? "border-primary bg-primary text-primary-foreground"
                      : isCurrent
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-muted-foreground/30 bg-muted text-muted-foreground"
                  }`}
                >
                  {isCompleted ? (
                    <CheckIcon className="size-4 stroke-3" />
                  ) : (
                    <span className="text-sm font-semibold">
                      {step.number}
                    </span>
                  )}
                </div>

                {/* Connector line (not on the last step) */}
                {i < steps.length - 1 && (
                  <div
                    className={`w-0.5 flex-1 min-h-8 transition-colors ${
                      isCompleted ? "bg-primary" : "bg-muted-foreground/20"
                    }`}
                  />
                )}
              </div>

              {/* Step label & description */}
              <div className={`pb-8 ${i === steps.length - 1 ? "pb-0" : ""}`}>
                <p
                  className={`text-sm font-semibold leading-tight ${
                    isCompleted || isCurrent
                      ? "text-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  {step.label}
                </p>
                <p
                  className={`mt-0.5 text-xs leading-snug ${
                    isCurrent
                      ? "text-muted-foreground"
                      : "text-muted-foreground/70"
                  }`}
                >
                  {step.description}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
