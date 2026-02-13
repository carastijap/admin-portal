"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Stepper } from "@/components/manual-booking/stepper";
import { BookingStep } from "@/components/manual-booking/booking-step";
import { CarStep } from "@/components/manual-booking/car-step";
import { DeliveryPaymentStep } from "@/components/manual-booking/delivery-payment-step";
import { ReviewStep } from "@/components/manual-booking/review-step";

const TOTAL_STEPS = 4;

export default function ManualBookingPage() {
  const [currentStep, setCurrentStep] = React.useState(1);

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, TOTAL_STEPS));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  return (
    <div className="space-y-8">
      {/* Stepper */}
      <Stepper currentStep={currentStep} />

      {/* Step content */}
      {currentStep === 1 && <BookingStep />}
      {currentStep === 2 && <CarStep />}
      {currentStep === 3 && <DeliveryPaymentStep />}
      {currentStep === 4 && <ReviewStep />}

      {/* Navigation buttons */}
      <div className="flex justify-between">
        <div>
          {currentStep > 1 && (
            <Button variant="outline" size="lg" onClick={handleBack}>
              Back
            </Button>
          )}
        </div>
        <Button size="lg" onClick={handleNext} disabled={currentStep === TOTAL_STEPS}>
          Next
        </Button>
      </div>
    </div>
  );
}
