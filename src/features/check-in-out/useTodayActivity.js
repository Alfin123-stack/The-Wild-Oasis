import { useQuery } from "@tanstack/react-query";
import { getStaysTodayActivity } from "../../services/apiBookings";

export function useTodayActivity() {
  const { isPending, data: activities } = useQuery({
    queryKey: ["today-activities"],
    queryFn: getStaysTodayActivity,
  });

  return { isPending, activities };
}
