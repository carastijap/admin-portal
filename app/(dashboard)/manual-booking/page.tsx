import { ManualBookingView } from "@/features/ManualBooking/ManualBookingView";
import { ManualBookingApiResponse } from "@/features/ManualBooking/types";
import { endpoints } from "@/lib/api";
import { queryKeys } from "@/lib/react-query/queryKeys";
import { serverFetch } from "@/utils/server/serverFetch";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

async function getManualBookingApiData() {
  return serverFetch<ManualBookingApiResponse>(endpoints.carDetails, {
    method: "GET",
  });
}

export default async function ManualBookingPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: queryKeys.manualBookingApiData,
    queryFn: getManualBookingApiData,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ManualBookingView />
    </HydrationBoundary>
  );
}
