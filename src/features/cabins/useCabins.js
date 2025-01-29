import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constant";

function useCabins() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));
  const {
    isLoading,
    data: { cabins, count } = {},
    error,
  } = useQuery({
    queryKey: ["cabins", page],
    queryFn: () => getCabins({ page }),
  });

  // PRE-FETCHING
    const pageCount = Math.ceil(count / PAGE_SIZE);
  
    if (page < pageCount) {
      queryClient.prefetchQuery({
        queryKey: ["cabins",page + 1],
        queryFn: () => getCabins({ page: page+1 }),
      });
    }
  
    if (page !== 1) {
      queryClient.prefetchQuery({
        queryKey: ["cabins",page - 1],
        queryFn: () => getCabins({ page: page-1 }),
      });
    }

  return { isLoading, error, cabins, count };
}

export default useCabins;
