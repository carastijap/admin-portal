"use client";

import * as React from "react";

import { BookingSubmission } from "@/features/ManualBooking/components/BookingSubmission";
import { CarAddons } from "@/features/ManualBooking/components/CarAddons";
import { CarStep } from "@/features/ManualBooking/components/CarStep";
import { DeliveryStep } from "@/features/ManualBooking/components/DeliveryStep";
import { ReviewStep } from "@/features/ManualBooking/components/ReviewStep";
import { Stepper } from "@/features/ManualBooking/components/Stepper";
import { UserInformationStep } from "@/features/ManualBooking/components/UserInformationStep";
import { Button } from "@/components/ui/button";

const TOTAL_STEPS = 6;

export function ManualBookingView() {
  const [currentStep, setCurrentStep] = React.useState(1);
  const topRef = React.useRef<HTMLDivElement>(null);

  const scrollToTop = () => {
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleNext = () => {
    setCurrentStep((prevStep) => Math.min(prevStep + 1, TOTAL_STEPS));
    scrollToTop();
  };

  const handleBack = () => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 1));
    scrollToTop();
  };

  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-start gap-8 py-12">
      <div ref={topRef} />
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="rounded-xl border border-border/60 bg-card p-6 ring-1 ring-border/40">
          {currentStep === 1 && <UserInformationStep />}
          {currentStep === 2 && <CarStep />}
          {currentStep === 3 && <CarAddons />}
          {currentStep === 4 && <DeliveryStep />}
          {currentStep === 5 && <ReviewStep />}
          {currentStep === 6 && <BookingSubmission />}
        </div>

        <div className="flex justify-between pt-8">
          <div className="w-1/3">
            {currentStep > 1 && (
              <Button
                variant="outline"
                size="lg"
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
            onClick={handleNext}
            disabled={currentStep === TOTAL_STEPS}
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
