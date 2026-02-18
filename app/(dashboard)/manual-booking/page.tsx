"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Stepper } from "@/components/manual-booking/Stepper";
import { UserInformationStep } from "@/components/manual-booking/UserInformationStep";
import { CarStep } from "@/components/manual-booking/CarStep";
import { DeliveryStep } from "@/components/manual-booking/DeliveryStep";
import { ReviewStep } from "@/components/manual-booking/ReviewStep";
import { CarAddons } from "@/components/manual-booking/CarAddons";
import { BookingSubmission } from "@/components/manual-booking/BookingSubmission";

const TOTAL_STEPS = 6;

export default function ManualBookingPage() {
  const [currentStep, setCurrentStep] = React.useState(1);

  const topRef = React.useRef<HTMLDivElement>(null);
  const scrollToTop = () =>
    topRef.current?.scrollIntoView({ behavior: "smooth" });

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, TOTAL_STEPS));
    scrollToTop();
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    scrollToTop();
  };

  return (
    <div className="flex gap-8 min-h-[calc(100vh-8rem)] items-start py-12">
      <div ref={topRef} />
      {/* Main content area */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Step content */}
        <div className="rounded-xl border border-border/60 ring-1 ring-border/40 bg-card p-6">
          {currentStep === 1 && <UserInformationStep />}
          {currentStep === 2 && <CarStep />}
          {currentStep === 3 && <CarAddons />}
          {currentStep === 4 && <DeliveryStep />}
          {currentStep === 5 && <ReviewStep />}
          {currentStep === 6 && <BookingSubmission />}
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-between pt-8">
          <div className="w-1/3">
            {currentStep > 1 && (
              <Button variant="outline" size="lg" onClick={handleBack} className="w-full bg-orange-400 text-white">
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

      {/* Right-side stepper – sticky, height fits content */}
      <aside className="hidden lg:block w-80 shrink-0 self-stretch">
        <div className="sticky top-6 rounded-xl border border-border/60 ring-1 ring-border/40 bg-card p-6">
          <Stepper currentStep={currentStep} />
        </div>
      </aside>
    </div>
  );
}
