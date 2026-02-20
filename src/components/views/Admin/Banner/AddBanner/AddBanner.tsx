import InputFile from "@/components/ui/InputFile";
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Spinner, Textarea } from "@heroui/react";
import { Controller } from "react-hook-form";
import { useEffect } from "react";
import useAddBanner from "./useAddBanner";

interface TypeProps {
  isOpen: boolean;
  onClose: () => void;
  refetch: () => void;
  isRefetching: boolean;
}

const AddBanner = (props: TypeProps) => {
    const {
      onClose,
      isOpen,
      refetch,
      isRefetching
    } = props;

    const {
      controlAddBanner,
      handleSubmitAddBanner,
      errorsAddBanner,
      inputIcon,
      handleUpoloadImage,
      isPendingUploadImage,
      handleCloseModal,
      onAddBanner,
      isPendingAddBanner,
      handleDeleteImage,
      isPendingDeleteImage,
      isSuccessAddBanner
    } = useAddBanner();

    useEffect(() => {
      if(isSuccessAddBanner) {
        handleCloseModal(onClose);
        refetch();
      }
    },[isSuccessAddBanner])

    return (
      <Modal isOpen={isOpen} onClose={() => handleCloseModal(onClose)} className="my-auto" scrollBehavior="inside">
        <ModalContent>
          <ModalHeader>
            Add Activity
          </ModalHeader>

          <form encType="multipart/form-data" onSubmit={handleSubmitAddBanner(onAddBanner)}>
            <ModalBody>
              <Controller control={controlAddBanner} name="name" render={({field}) => (
                <Input {...field} type="text" variant="bordered" label="Name" placeholder="Banner Name" isInvalid={!!errorsAddBanner?.name} errorMessage={errorsAddBanner?.name?.message} />
              )} />

              <Controller control={controlAddBanner} name="description" render={({field}) => (
                <Textarea {...field} variant="bordered" label="Description" placeholder="Banner Description" isInvalid={!!errorsAddBanner?.description} errorMessage={errorsAddBanner?.description?.message} />
              )} />
              
              <Controller control={controlAddBanner} name="image" render={({field}) => (
                <InputFile 
                  {...field}
                  name={field.name}
                  inputIcon={typeof inputIcon === "string" ? inputIcon : ""}
                  onChange={field.onChange}
                  onUpload={handleUpoloadImage}
                  isPendingUpload={isPendingUploadImage}
                  isInvalid={!!errorsAddBanner?.image}
                  errorMessage={errorsAddBanner?.image?.message}
                  isPendingSave={isPendingAddBanner}
                  onDelete={handleDeleteImage}
                  isPendingDelete={isPendingDeleteImage}
                  textInCell="Add icon for banner"
                />
              )} />
            </ModalBody>

            <ModalFooter>
              <Button color="danger" variant="flat" onPress={() => handleCloseModal(onClose)} disabled={isPendingAddBanner || isPendingUploadImage}>
                Cancel
              </Button>
              <Button type="submit" color="primary" variant="solid" disabled={isPendingAddBanner || isPendingUploadImage || isPendingDeleteImage}>
                {isPendingAddBanner ? <Spinner color="default" size="sm" /> : "Create"}
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    )
}

export default AddBanner;