import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Checkbox from "../../ui/Checkbox";

import { useMoveBack } from "../../hooks/useMoveBack";
import useBooking from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import { useEffect, useState } from "react";
import useCheckin from "./useCheckin";
import { formatCurrency } from "../../utils/helpers";
import useSettings from "../settings/useSetings";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);
  const moveBack = useMoveBack();
  const { booking, isLoading } = useBooking();
  const { updateCheckin, isCheckin } = useCheckin();
  const { isLoading: isLoadingSettings, settings } = useSettings();

  useEffect(
    function () {
      setConfirmPaid(booking?.isPaid || false);
      setAddBreakfast(booking?.hasBreakfast || false);
    },
    [booking?.isPaid, booking?.hasBreakfast]
  );

  if (isLoading || isLoadingSettings) return <Spinner />;

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  const additionalAmountBreakfast =
    settings.breakFastPrice * numGuests * numNights;

  function handleCheckin() {
    if (!confirmPaid) return;
    if (addBreakfast) {
      updateCheckin({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: additionalAmountBreakfast,
          totalPrice: totalPrice + additionalAmountBreakfast,
        },
      });
    } else {
      updateCheckin({ bookingId, breakfast: {} });
    }
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />
      {!hasBreakfast && (
        <Box>
          <Checkbox
            id="breakfast"
            checked={addBreakfast}
            onChange={() => {
              setConfirmPaid((confirmed) => !confirmed);
              setAddBreakfast((breakfast) => !breakfast);
            }}>
            Want to add breakfast for{" "}
            {formatCurrency(additionalAmountBreakfast)} ?
          </Checkbox>
        </Box>
      )}
      <Box>
        <Checkbox
          id="checkin"
          checked={confirmPaid}
          onChange={() => setConfirmPaid((confirmed) => !confirmed)}
          disabled={confirmPaid}>
          I confirmed that {guests.fullName} has paid the total amount{" "}
          {!addBreakfast
            ? formatCurrency(totalPrice)
            : formatCurrency(totalPrice + additionalAmountBreakfast) +
              " " +
              `(${formatCurrency(totalPrice)} + 
                ${formatCurrency(additionalAmountBreakfast)})`}
        </Checkbox>
      </Box>
      <ButtonGroup>
        <Button disabled={!confirmPaid || isCheckin} onClick={handleCheckin}>
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
