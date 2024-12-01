import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

function useCreateCabin(){
    const queryClient = useQueryClient();

  const { mutate: addCabin, isPending: isAdding } = useMutation({
    mutationFn: (newCabin) => addEditCabin(newCabin),
    onSuccess: () => {
      toast.success("cabin is succesfully Added");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    //   reset();
    },
    onError: (err) => toast.error(err.message),
  });

  return { addCabin, isAdding };    
}
export default useCreateCabin