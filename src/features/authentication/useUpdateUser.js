import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurrentUser as updateCurrentUserApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

function useUpdateUser() {
  const queryClient = useQueryClient();
  const { isPending, mutate: updateUser } = useMutation({
    mutationFn: ({ fullName, avatar, password }) =>
      updateCurrentUserApi({ fullName, avatar, password }),
    onSuccess: () => {
      toast.success(`Successfully updated your profile`);
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isPending, updateUser };
}

export default useUpdateUser;
