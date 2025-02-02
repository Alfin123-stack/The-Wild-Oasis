import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: updateCheckin, isPending: isCheckin } = useMutation({
    mutationFn: ({ bookingId, breakfast }) =>
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
        ...breakfast,
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} is successfully Check-In `);
      queryClient.invalidateQueries({ active: true });
      navigate("/");
      //   reset();
    },
    onError: (err) => toast.error(err.message),
  });

  return { updateCheckin, isCheckin };
}

export default useCheckin;
