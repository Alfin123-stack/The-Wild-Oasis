import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getStaysAfterDate } from "../../services/apiBookings";

export function useRecentStays() {
  const [searchParams] = useSearchParams();

  const getDate = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));

  const queryDate = subDays(new Date(), getDate).toISOString();

  const { isPending, data: recentStays } = useQuery({
    queryFn: () => getStaysAfterDate(queryDate),
    queryKey: ["stays", `last-${getDate}`],
  });

  const confirmedStay = recentStays?.filter((stay) => {
    return stay.status === "checked-in" || stay.status === "checked-out";
  });

  return { isPending, recentStays, confirmedStay, getDate };
}
