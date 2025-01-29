import styled from "styled-components";
import { useRecentBookings } from "./useRecentBookings";
import { useRecentStays } from "./useRecentStays";
import Spinner from "../../ui/Spinner";
import Stats from "./Stats";
import useCabins from "../cabins/useCabins";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { isPending: isPendingBooking, recentBookings } = useRecentBookings();
  const { isPending: isPendingStay, getDate, confirmedStay } = useRecentStays();
  const { isLoading, cabins } = useCabins();

  if (isPendingBooking || isPendingStay || isLoading) return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats bookings={recentBookings} confirmedStays={confirmedStay} countCabins={cabins.length} numDays={getDate} />
      <TodayActivity/>
      <DurationChart confirmedStays={confirmedStay}/>
      <SalesChart bookings={recentBookings} numDays={getDate}/>
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
