import styled from "styled-components";
import Heading from "../../ui/Heading";

import { useTodayActivity } from "./useTodayActivity";
import Spinner from "../../ui/Spinner";
import TodayItem from "./TodayItem";

const StyledTodayActivity = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 3.2rem;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  grid-column: 1 / span 2;
  padding-top: 2.4rem;
`;

const TodayActivityList = styled.ul`
  overflow: scroll;
  overflow-x: hidden;

  /* Removing scrollbars for webkit, firefox, and ms, respectively */
  &::-webkit-scrollbar {
    width: 0 !important;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

const NoActivity = styled.p`
  text-align: center;
  font-size: 1.8rem;
  font-weight: 500;
  margin-top: 0.8rem;
`;

function TodayActivity() {
  const { isPending, activities } = useTodayActivity();
  return (
    <StyledTodayActivity>
      <Heading as="h2">TodayActivity</Heading>

      {!isPending ? (
        activities?.length > 0 ? (
          <TodayActivityList>
            {activities.map((activity) => (
              <TodayItem key={activity.id} activity={activity} />
            ))}
          </TodayActivityList>
        ) : (
          <NoActivity>No activity today......</NoActivity>
        )
      ) : (
        <Spinner />
      )}
    </StyledTodayActivity>
  );
}

export default TodayActivity;
