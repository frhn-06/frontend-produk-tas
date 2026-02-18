import InputFile from "@/components/ui/InputFile";
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Spinner, Textarea } from "@heroui/react";
import { Controller } from "react-hook-form";
import { useEffect } from "react";
import useAddActivity from "./useAddActivity";

interface TypeProps {
  isOpen: boolean;
  onClose: () => void;
  refetch: () => void;
  isRefetching: boolean;
}

const AddActivity = (props: TypeProps) => {
    const {
      onClose,
      isOpen,
      refetch,
      isRefetching
    } = props;

    const {
      controlAddActivity,
      handleSubmitAddActivity,
      errorsAddActivity,
      inputIcon,
      handleUpoloadImage,
      isPendingUploadImage,
      handleCloseModal,
      onAddActivity,
      isPendingAddActivity,
      handleDeleteImage,
      isPendingDeleteImage,
      isSuccessAddActivity
    } = useAddActivity();

    useEffect(() => {
      if(isSuccessAddActivity) {
        handleCloseModal(onClose);
        refetch();
      }
    },[isSuccessAddActivity])

    return (
      <Modal isOpen={isOpen} onClose={() => handleCloseModal(onClose)} className="my-auto" scrollBehavior="inside">
        <ModalContent>
          <ModalHeader>
            Add Activity
          </ModalHeader>

          <form encType="multipart/form-data" onSubmit={handleSubmitAddActivity(onAddActivity)}>
            <ModalBody>
              <Controller control={controlAddActivity} name="name" render={({field}) => (
                <Input {...field} type="text" variant="bordered" label="Name" placeholder="Category Name" isInvalid={!!errorsAddActivity?.name} errorMessage={errorsAddActivity?.name?.message} />
              )} />
              
              <Controller control={controlAddActivity} name="image" render={({field}) => (
                <InputFile 
                  {...field}
                  name={field.name}
                  inputIcon={typeof inputIcon === "string" ? inputIcon : ""}
                  onChange={field.onChange}
                  onUpload={handleUpoloadImage}
                  isPendingUpload={isPendingUploadImage}
                  isInvalid={!!errorsAddActivity?.image}
                  errorMessage={errorsAddActivity?.image?.message}
                  isPendingSave={isPendingAddActivity}
                  onDelete={handleDeleteImage}
                  isPendingDelete={isPendingDeleteImage}
                  textInCell="Add icon for category"
                />
              )} />
            </ModalBody>

            <ModalFooter>
              <Button color="danger" variant="flat" onPress={() => handleCloseModal(onClose)} disabled={isPendingAddActivity || isPendingUploadImage}>
                Cancel
              </Button>
              <Button type="submit" color="primary" variant="solid" disabled={isPendingAddActivity || isPendingUploadImage || isPendingDeleteImage}>
                {isPendingAddActivity ? <Spinner color="default" size="sm" /> : "Create"}
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    )
}

export default AddActivity;