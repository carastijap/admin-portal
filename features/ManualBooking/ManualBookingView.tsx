"use client";

import { MultiStepFormProvider } from "@/lib/providers/MultiStepForm.provider";
import { HookFormProvider } from "@/lib/providers/Form.provider";
import { SubmitHandler } from "react-hook-form";
import { ManualBookingContent } from "./components/ManualBookingContent";
import { ManualBookingFormHydrator } from "./components/ManualBookingFormHydrator";
import { useManualBookingApiData } from "./hooks/useManualBookingApiData";
import {
  getManualBookingInitialValues,
  ManualBookingFormValues,
} from "./types";

const TOTAL_STEPS = 6;

export function ManualBookingView() {
  const { apiData, fieldEditability } = useManualBookingApiData();

  const handleSubmit: SubmitHandler<ManualBookingFormValues> = (values) => {
    console.log("all form values", values);
    // call API here
  };

  return (
    <HookFormProvider<ManualBookingFormValues>
      defaultValues={getManualBookingInitialValues()}
      onSubmit={handleSubmit}
    >
      <ManualBookingFormHydrator apiData={apiData} />
      <MultiStepFormProvider totalSteps={TOTAL_STEPS}>
        <ManualBookingContent fieldEditability={fieldEditability} />
      </MultiStepFormProvider>
    </HookFormProvider>
  );
}
