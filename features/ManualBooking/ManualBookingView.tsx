"use client";

import { getCarDetails } from "@/lib/api";
import { MultiStepFormProvider } from "@/lib/providers/MultiStepForm.provider";
import { HookFormProvider } from "@/lib/providers/Form.provider";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { SubmitHandler } from "react-hook-form";
import { ManualBookingContent } from "./components/ManualBookingContent";
import { ManualBookingFormHydrator } from "./components/ManualBookingFormHydrator";
import {
  getManualBookingFieldEditability,
  getManualBookingInitialValues,
  ManualBookingApiResponse,
  ManualBookingFieldEditability,
  ManualBookingFormValues,
} from "./types";
import { queryKeys } from "@/lib/react-query/queryKeys";

const TOTAL_STEPS = 6;
const EMPTY_FIELD_EDITABILITY: ManualBookingFieldEditability = {
  carNumberPlateEditable: false,
  carChassisNumberEditable: false,
  carDefleetDateEditable: false,
  carOwnerEditable: false,
};



export function ManualBookingView() {
  const { data: apiData } = useQuery<ManualBookingApiResponse | null>({
    queryKey: queryKeys.manualBookingApiData,
    queryFn: getCarDetails,
    staleTime: 1000 * 60 * 60, // 1 hr stale time
  });

  const hydratedApiData = apiData ?? null;

  const fieldEditability = useMemo(
    () =>
      hydratedApiData
        ? getManualBookingFieldEditability(hydratedApiData)
        : EMPTY_FIELD_EDITABILITY,
    [hydratedApiData]
  );

  const handleSubmit: SubmitHandler<ManualBookingFormValues> = (values) => {
    console.log("all form values", values);
    // call API here
  };

  return (
    <>
      <div className="mb-6 px-10">
        <h1 className="text-2xl font-semibold tracking-tight">Manual Booking</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Create and submit a manual booking request by completing the required steps.
        </p>
      </div>
      <HookFormProvider<ManualBookingFormValues>
        defaultValues={getManualBookingInitialValues()}
        onSubmit={handleSubmit}
      >
        <ManualBookingFormHydrator apiData={hydratedApiData} />
        <MultiStepFormProvider totalSteps={TOTAL_STEPS}>
          <ManualBookingContent fieldEditability={fieldEditability} />
        </MultiStepFormProvider>
      </HookFormProvider>
    </>
  );
}
