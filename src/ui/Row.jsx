import styled, { css } from "styled-components";

const Row = styled.div`
  display: flex;
  gap: 1.2rem;
  background-color: var(--color-grey-0);
  border-radius: 1rem;
  padding: 4rem;
  ${(props) =>
    props.type === "horizontal" &&
    css`
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    `}

  ${(props) =>
    props.type === "vertical" &&
    css`
      flex-direction: column;
    `}
`;

Row.defaultProps = {
  type: "horizontal",
};

export default Row;
