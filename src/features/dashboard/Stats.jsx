/* eslint-disable react/prop-types */
import { HiOutlineBriefcase, HiOutlineChartBar } from "react-icons/hi";
import Stat from "./Stat";
import { HiOutlineBanknotes, HiOutlineCalendarDays } from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";
function Stats({ bookings, confirmedStays, countCabins, numDays }) {
  // length of bookings
  const numBookings = bookings.length;
  // Total price of bookings
  const sales = bookings.reduce(
    (sum, bookings) => sum + bookings.totalPrice,
    0
  );
  // length of confirmed stays (checked in or checked out)
  const numConfirmedStays = confirmedStays.length;
  // Percentage of occounpacy rate (confirmed stays)
  const occupancyRate =
    confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) /
    (numDays * countCabins);
  return (
    <>
      <Stat
        color="blue"
        title="Bookings"
        value={numBookings}
        icon={<HiOutlineBriefcase />}
      />
      <Stat
        color="green"
        title="Sales"
        value={formatCurrency(sales)}
        icon={<HiOutlineBanknotes />}
      />
      <Stat
        color="indigo"
        title="Check ins"
        value={numConfirmedStays}
        icon={<HiOutlineCalendarDays />}
      />
      <Stat
        color="yellow"
        title="occounpancy rate"
        value={Math.round(occupancyRate * 100) + "%"}
        icon={<HiOutlineChartBar />}
      />
    </>
  );
}

export default Stats;
