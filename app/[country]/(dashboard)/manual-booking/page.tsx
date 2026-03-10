import { ManualBookingView } from "@/features/ManualBooking/ManualBookingView";
import { getManualBookingData } from "@/features/ManualBooking/services/getManualBookingData";
import { queryKeys } from "@/lib/react-query/queryKeys";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

export default async function ManualBookingPage() {
  const queryClient = new QueryClient();

  await queryClient.fetchQuery({
    queryKey: queryKeys.manualBookingApiData,
    queryFn: async () => {
      const data = await getManualBookingData();
      // if (!data) {
      //   throw new Error("Failed to load manual booking data.");
      // }
      return data;
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ManualBookingView />
    </HydrationBoundary>
  );
}
