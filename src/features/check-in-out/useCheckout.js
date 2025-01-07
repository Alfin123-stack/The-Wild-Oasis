import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

function useCheckout() {
  const queryClient = useQueryClient();
  const { mutate: updateCheckout, isPending: isCheckout } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} is successfully Check-out `);
      queryClient.invalidateQueries({ active: true });
      //   navigate("/");
      //   reset();
    },
    onError: (err) => toast.error(err.message),
  });

  return { updateCheckout, isCheckout };
}

export default useCheckout;
