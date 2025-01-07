import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { isPending, mutate: logout } = useMutation({
    mutationFn: () => logoutApi(),
    onSuccess: () => {
      queryClient.removeQueries();
      toast.success(`You are Successfully logged out`);
      navigate("/login", { replace: true });
    },
    onError: (err) => {
      console.log(err.message);
      toast.error("Cannot Logged Out");
    },
  });

  return { isPending, logout };
}

export default useLogout;
