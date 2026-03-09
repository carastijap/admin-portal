import "server-only";

import { endpoints } from "@/lib/constants/endpoints";
import { serverFetch } from "@/utils/server/serverFetch";
import type { ManualBookingApiResponse } from "../types";

export async function getManualBookingData() {
  return serverFetch<ManualBookingApiResponse>(endpoints.carDetails, {
    method: "GET",
  });
}
