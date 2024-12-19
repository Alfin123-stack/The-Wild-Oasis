import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting as updateSettingApi } from "../../services/apiSettings";
import toast from "react-hot-toast";

function useUpdateSetting(){
    const queryClient = useQueryClient();
    const { mutate: updateSetting, isPending: isEditing } = useMutation({
        mutationFn: updateSettingApi,
        onSuccess: () => {
          toast.success("setting is succesfully Updated");
          queryClient.invalidateQueries({
            queryKey: ["settings"],
          });
        //   reset();
        },
        onError: (err) => toast.error(err.message),
      });

      return { updateSetting, isEditing };
}

export default useUpdateSetting;