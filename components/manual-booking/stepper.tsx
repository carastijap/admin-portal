import * as React from "react";
import { Separator } from "@/components/ui/separator";

const steps = [
  { number: 1, label: "Booking" },
  { number: 2, label: "Car" },
  { number: 3, label: "Delivery & Payment" },
  { number: 4, label: "Review" },
];

export function Stepper({ currentStep }: { currentStep: number }) {
  return (
    <div className="flex items-center justify-center gap-0 w-full max-w-3xl mx-auto">
      {steps.map((step, i) => (
        <React.Fragment key={step.number}>
          <div className="flex items-center gap-2">
            <div
              className={`flex items-center justify-center size-8 rounded-full text-sm font-semibold shrink-0 ${
                step.number <= currentStep
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {step.number}
            </div>
            <span
              className={`text-sm whitespace-nowrap ${
                step.number <= currentStep
                  ? "font-medium text-foreground"
                  : "text-muted-foreground"
              }`}
            >
              {step.label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <Separator
              className={`mx-3 flex-1 min-w-8 ${
                step.number < currentStep ? "bg-primary" : "bg-border"
              }`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
