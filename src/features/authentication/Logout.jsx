import { HiLogout } from "react-icons/hi";
import ButtonIcon from "../../ui/ButtonIcon";
import useLogout from "./useLogout";
import SpinnerMini from "../../ui/SpinnerMini";

function Logout() {
  const { logout, isPending } = useLogout();
  return (
    <ButtonIcon disabled={isPending} onClick={logout}>
      {isPending ? <SpinnerMini /> : <HiLogout />}
    </ButtonIcon>
  );
}

export default Logout;
