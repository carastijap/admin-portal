"use client";

import * as React from "react";
import { BookingSubmission } from "@/features/ManualBooking/components/Submission";
import { CarAddons } from "@/features/ManualBooking/components/CarAddons";
import { CarStep } from "@/features/ManualBooking/components/CarDetails";
import { DeliveryStep } from "@/features/ManualBooking/components/Delivery";
import { ReviewStep } from "@/features/ManualBooking/components/Review";
import { Stepper } from "@/features/ManualBooking/components/Stepper";
import { UserInformationStep } from "@/features/ManualBooking/components/CustomerDetails";
import { useMultiStepForm } from "@/lib/providers/MultiStepForm.provider";
import { Button } from "@/components/ui/button";
import { ManualBookingFieldEditability } from "../types";

export function ManualBookingContent({
  fieldEditability,
}: {
  fieldEditability: ManualBookingFieldEditability;
}) {
  const { currentStep, nextStep, previousStep, isLastStep, isFirstStep } =
    useMultiStepForm();
  const topRef = React.useRef<HTMLDivElement>(null);

  const stepComponents: Record<number, React.ReactNode> = {
    1: <UserInformationStep />,
    2: <CarStep fieldEditability={fieldEditability} />,
    3: <CarAddons />,
    4: <DeliveryStep />,
    5: <ReviewStep />,
    6: <BookingSubmission />,
  };

  const scrollToTop = () => {
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleNext = () => {
    nextStep();
    scrollToTop();
  };

  const handleBack = () => {
    previousStep();
    scrollToTop();
  };

  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-start gap-8 py-12">
      <div ref={topRef} />
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="rounded-xl border border-border/60 bg-card p-6 ring-1 ring-border/40">
          {stepComponents[currentStep]}
        </div>

        <div className="flex justify-between pt-8">
          <div className="w-1/3">
            {!isFirstStep && (
              <Button
                variant="outline"
                size="lg"
                type="button"
                onClick={handleBack}
                className="w-full bg-orange-400 text-white"
              >
                Back
              </Button>
            )}
          </div>
          <Button
            className="w-1/3"
            size="lg"
            type="button"
            onClick={handleNext}
            disabled={isLastStep}
          >
            Next
          </Button>
        </div>
      </div>

      <aside className="hidden w-80 shrink-0 self-stretch lg:block">
        <div className="sticky top-6 rounded-xl border border-border/60 bg-card p-6 ring-1 ring-border/40">
          <Stepper currentStep={currentStep} />
        </div>
      </aside>
    </div>
  );
}
