import InputFile from "@/components/ui/InputFile";
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Spinner, Textarea } from "@heroui/react";
import useAddCategory from "./useAddCategory";
import { Controller } from "react-hook-form";
import { useEffect } from "react";

interface TypeProps {
  isOpen: boolean;
  onClose: () => void;
  refetch: () => void;
  isRefetching: boolean;
}

const AddCategory = (props: TypeProps) => {
    const {
      onClose,
      isOpen,
      refetch,
      isRefetching
    } = props;

    const {
      controlAddCategory,
      handleSubmitAddCategory,
      errorsAddCategory,
      inputIcon,
      handleUpoloadImage,
      isPendingUploadImage,
      handleCloseModal,
      onAddCategory,
      isPendingAddCategory,
      handleDeleteImage,
      isPendingDeleteImage,
      isSuccessAddCategory
    } = useAddCategory();

    useEffect(() => {
      if(isSuccessAddCategory) {
        handleCloseModal(onClose);
        refetch();
      }
    },[isSuccessAddCategory])

    return (
      <Modal isOpen={isOpen} onClose={() => handleCloseModal(onClose)} className="my-auto" scrollBehavior="inside">
        <ModalContent>
          <ModalHeader>
            Add Category
          </ModalHeader>

          <form encType="multipart/form-data" onSubmit={handleSubmitAddCategory(onAddCategory)}>
            <ModalBody>
              <Controller control={controlAddCategory} name="name" render={({field}) => (
                <Input {...field} type="text" variant="bordered" label="Name" placeholder="Category Name" isInvalid={!!errorsAddCategory?.name} errorMessage={errorsAddCategory?.name?.message} />
              )} />

              <Controller control={controlAddCategory} name="description" render={({field}) => (
                <Textarea {...field} label="Description" variant="bordered" placeholder="Category Description" isInvalid={!!errorsAddCategory?.description} errorMessage={errorsAddCategory?.description?.message} />
              )} />
              
              <Controller control={controlAddCategory} name="icon" render={({field}) => (
                <InputFile 
                  {...field}
                  name={field.name}
                  inputIcon={typeof inputIcon === "string" ? inputIcon : ""}
                  onChange={field.onChange}
                  onUpload={handleUpoloadImage}
                  isPendingUpload={isPendingUploadImage}
                  isInvalid={!!errorsAddCategory?.icon}
                  errorMessage={errorsAddCategory?.icon?.message}
                  isPendingUploadCategory={isPendingAddCategory}
                  onDelete={handleDeleteImage}
                  isPendingDelete={isPendingDeleteImage}
                />
              )} />
            </ModalBody>

            <ModalFooter>
              <Button color="danger" variant="flat" onPress={() => handleCloseModal(onClose)} disabled={isPendingAddCategory || isPendingUploadImage}>
                Cancel
              </Button>
              <Button type="submit" color="primary" variant="solid" disabled={isPendingAddCategory || isPendingUploadImage || isPendingDeleteImage}>
                {isPendingAddCategory ? <Spinner color="default"  /> : "Create"}
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    )
}

export default AddCategory;