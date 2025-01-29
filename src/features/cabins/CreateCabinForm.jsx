/* eslint-disable react/prop-types */

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import FormRow from "../../ui/FormRow";
import useCreateCabin from "./useCreateCabin";
import useEditCabin from "./useEditCabin";

function CreateCabinForm({cabinToEdit= {}, onClose}) {
  const {id: editId, ...editValues} = cabinToEdit;
  const isEditSession = editId ? true : false;
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues : isEditSession ? editValues : {}
  });
  const { errors } = formState;

  // custom hook addcabin
  const {addCabin, isAdding } = useCreateCabin()

 //custom hook editcabin
 const { editCabin, isEditing } = useEditCabin()

  function handleSubmitForm(data) {
    const image =  typeof data.image === 'string' ? data.image : data.image[0]
    if(isEditSession){
      editCabin({newCabin : {...data, image}, id:editId}, {onSuccess: ()=> {
        reset()
        onClose?.()
      }});
    } else {
      addCabin({...data, image}, {onSuccess: ()=> {
        reset()
        onClose?.()
      }});
    }
    // console.log({...data, image: data.image[0]})
  }

  function handleFormError(errors) {
    console.log(errors);
  }
  return (
    <Form onSubmit={handleSubmit(handleSubmitForm, handleFormError)} type={onClose ? 'modal' : 'reguler'}>
      <FormRow label="Name" error={errors?.name?.message}>
      <Input
      disabled={isAdding || isEditing}
          type="text"
          id="name"
          {...register("name", {
            required: "Please enter a cabin name",
          })}
        />
      </FormRow>

      <FormRow label="Max Capacity" error={errors?.maxCapacity?.message}>
        <Input
        disabled={isAdding || isEditing}
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

      <FormRow label="Regular Price" error={errors?.regularPrice?.message}>
        <Input
        disabled={isAdding || isEditing}
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "Please enter a regularPrice name",
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
        disabled={isAdding || isEditing}
          type="number"
          id="discount"
          placeholder={0}
          {...register("discount", {
            required: "Please enter a discount name",
            validate: (value) =>
              value <= getValues().regularPrice ||
              "discount must be less than regular price",
          })}
        />
      </FormRow>

      <FormRow label="Description" error={errors?.description?.message}>
        <Textarea
        disabled={isAdding || isEditing}
          type="text"
          id="description"
          defaultValue=""
          {...register("description", {
            required: "Please enter a description name",
          })}
        />
      </FormRow>

      <FormRow label="Image" error={errors?.image?.message}>
        <FileInput disabled={isAdding || isEditing} id="image" type="file" accept="image/*" {...register("image", {
            required: isEditSession ? false : "Please insert a file image",
          })} />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" onClick={()=> onClose?.()}>
          Cancel
        </Button>
        <Button disabled={isAdding || isEditing                                                                        }>{isEditSession ? "Edit Cabin" : "Add cabin"}</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
