

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { addCabin } from "../../services/apiCabins";
import FormRow from "../../ui/FormRow";

function CreateCabinForm() {
  const { register, handleSubmit, reset, getValues, formState } = useForm();
  const { errors } = formState;

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (newCabin) => addCabin(newCabin),
    onSuccess: () => {
      toast.success("cabin is succesfully Added");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      reset();
    },
    onError: (err) => toast.error(err.message),
  });

  function handleSubmitForm(data) {
    mutate(data);
  }

  function handleFormError(errors) {
    console.log(errors);
  }
  return (
    <Form onSubmit={handleSubmit(handleSubmitForm, handleFormError)}>
      <FormRow label="Name" errorMessage={errors?.name?.message}>
      <Input
          type="text"
          id="name"
          {...register("name", {
            required: "Please enter a cabin name",
          })}
        />
      </FormRow>

      <FormRow label="Max Capacity" errorMessage={errors?.name?.message}>
        <Input
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "Please enter a maxCapacity name",
            min: {
              value: 1,
              message: "Maximum capacity should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular Price" errorMessage={errors?.name?.message}>
        <Input
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "Please enter a regularPrice name",
          })}
        />
      </FormRow>

      <FormRow label="Discount" errorMessage={errors?.name?.message}>
        <Input
          type="number"
          id="discount"
          placeholder={0}
          {...register("discount", {
            required: "Please enter a discount name",
            validate: (value) =>
              value <= getValues.regularPrice ||
              "discount must be less than regular price",
          })}
        />
      </FormRow>

      <FormRow label="Description" errorMessage={errors?.name?.message}>
        <Textarea
          type="text"
          id="description"
          defaultValue=""
          {...register("description", {
            required: "Please enter a description name",
          })}
        />
      </FormRow>

      <FormRow label="Image" errorMessage={errors?.name?.message}>
        <FileInput id="image" accept="image/*" />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isPending}>Add cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
