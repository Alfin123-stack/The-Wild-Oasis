import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

function useEditCabin(){
    const queryClient = useQueryClient();
    const { mutate: editCabin, isPending: isEditing } = useMutation({
        mutationFn: ({newCabin,id}) => addEditCabin(newCabin, id),
        onSuccess: () => {
          toast.success("cabin is succesfully Edited");
          queryClient.invalidateQueries({
            queryKey: ["cabins"],
          });
        //   reset();
        },
        onError: (err) => toast.error(err.message),
      });

      return { editCabin, isEditing };
}

export default useEditCabin;