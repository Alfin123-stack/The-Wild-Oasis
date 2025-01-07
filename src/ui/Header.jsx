import styled from "styled-components";
import HeaderMenu from "../ui/HeaderMenu";
import UserAvatar from "../features/authentication/UserAvatar";

const StyledHeader = styled.header`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 4rem;
  background-color: var(--color-grey-0);
  border-bottom: 1px solid var(--color-grey-500);
  padding: 4rem;
`;

function Header() {
  return (
    <StyledHeader>
      <UserAvatar />
      <HeaderMenu />
    </StyledHeader>
  );
}

export default Header;
