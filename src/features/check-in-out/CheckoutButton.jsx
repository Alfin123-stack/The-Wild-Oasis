/* eslint-disable react/prop-types */
import Button from "../../ui/Button";
import useCheckout from "./useCheckout";

function CheckoutButton({ bookingId }) {
  const { updateCheckout, isCheckout } = useCheckout()
  return (
    <Button variation="primary" size="small" onClick={()=> updateCheckout(bookingId)} disabled={isCheckout}>
      Check out
    </Button>
  );
}

export default CheckoutButton;
