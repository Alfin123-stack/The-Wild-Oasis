import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient()
  const { isPending, mutate: login } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (data) => {
      queryClient.setQueryData(['user'], data.user)
      toast.success(`Successfully logged in, Welcome ${data.user.email} 👋`);
      navigate("/dashboard", { replace: true });
    },
    onError: (err) => {
      console.log(err.message);
      toast.error("provide email or password are incorect");
    },
  });

  return { isPending, login };
}

export default useLogin;
