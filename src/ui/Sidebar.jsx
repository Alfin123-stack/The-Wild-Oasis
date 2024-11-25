import styled from "styled-components";
import Logo from "./Logo";
import MainNav from "./MainNav";

const StyledSidebar = styled.aside`
  padding: 4rem 1.2rem;
  background-color: var(--color-grey-0);
  border-right: 1px solid var(--color-grey-500);
  grid-row: 1/-1;
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;
function Sidebar() {
  return (
    <StyledSidebar>
      <Logo />
      <MainNav />
    </StyledSidebar>
  );
}

export default Sidebar;
