"use client";

import * as React from "react";
import { useFormContext } from "react-hook-form";
import {
  ManualBookingApiResponse,
  ManualBookingFormValues,
  mapApiResponseToManualBookingForm,
} from "../types";

export function ManualBookingFormHydrator({
  apiData,
}: {
  apiData: ManualBookingApiResponse | null;
}) {
  const { reset } = useFormContext<ManualBookingFormValues>();

  React.useEffect(() => {
    if (!apiData) return;
    reset(mapApiResponseToManualBookingForm(apiData));
  }, [apiData, reset]);

  return null;
}
