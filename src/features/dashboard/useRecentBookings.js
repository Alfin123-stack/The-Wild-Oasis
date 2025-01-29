import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getBookingsAfterDate } from "../../services/apiBookings";

export function useRecentBookings() {
  const [searchParams] = useSearchParams();

  const getDate = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));

  const queryDate = subDays(new Date(), getDate).toISOString();

  const { isPending, data: recentBookings } = useQuery({
    queryFn: () => getBookingsAfterDate(queryDate),
    queryKey: ["Bookings", `last-${getDate}`],
  });

  return { isPending, recentBookings };
}
