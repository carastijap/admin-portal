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
    <HookFormProvider<ManualBookingFormValues>
      defaultValues={getManualBookingInitialValues()}
      onSubmit={handleSubmit}
    >
      <ManualBookingFormHydrator apiData={hydratedApiData} />
      <MultiStepFormProvider totalSteps={TOTAL_STEPS}>
        <ManualBookingContent fieldEditability={fieldEditability} />
      </MultiStepFormProvider>
    </HookFormProvider>
  );
}
