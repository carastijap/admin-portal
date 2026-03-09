import { ManualBookingView } from "@/features/ManualBooking/ManualBookingView";
import { getManualBookingData } from "@/features/ManualBooking/services/getManualBookingData";
import { queryKeys } from "@/lib/react-query/queryKeys";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

export default async function ManualBookingPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: queryKeys.manualBookingApiData,
    queryFn: getManualBookingData,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ManualBookingView />
    </HydrationBoundary>
  );
}
