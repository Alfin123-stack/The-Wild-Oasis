/* eslint-disable react/prop-types */
import styled from "styled-components";
import useUser from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const FullPage = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-grey-50);
`;

function ProtectRoute({ children }) {
  const navigate = useNavigate();
  // 1) Load authenticated user
  const { isPending, isAuthenticated } = useUser();

  // 2) check if user isAuthenticated
  useEffect(
    function () {
      if (!isAuthenticated && !isPending) {
        navigate("/login");
      }
    },
    [isAuthenticated, isPending, navigate]
  );

  // 3) whilte loading use a spinner
  if (isPending) {
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  }
  
  if (isAuthenticated) return children;
}

export default ProtectRoute;
