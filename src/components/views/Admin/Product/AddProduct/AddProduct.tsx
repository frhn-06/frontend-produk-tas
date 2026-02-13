import InputFile from "@/components/ui/InputFile";
import { Autocomplete, AutocompleteItem, Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Skeleton, Spinner, Textarea } from "@heroui/react";
import { Controller } from "react-hook-form";
import { useEffect } from "react";
import { ICategory } from "@/types/category";
import useAddProduct from "./useAddProduct";

interface TypeProps {
  isOpen: boolean;
  onClose: () => void;
  refetch: () => void;
  isRefetching: boolean;
}

const AddProduct = (props: TypeProps) => {
    const {
      onClose,
      isOpen,
      refetch,
      isRefetching
    } = props;

    const {
      controlAddProduct,
      handleSubmitAddProduct,
      errorsAddProduct,
      inputIcon,
      handleUpoloadImage,
      isPendingUploadImage,
      handleCloseModal,
      onAddProduct,
      isPendingAddProduct,
      handleDeleteImage,
      isPendingDeleteImage,
      isSuccessAddProduct,
      dataCategorySelect,
      isLoadingCategorySelect
    } = useAddProduct();

    useEffect(() => {
      if(isSuccessAddProduct) {
        handleCloseModal(onClose);
        refetch();
      }
    },[isSuccessAddProduct])

    return (
      <Modal isOpen={isOpen} onClose={() => handleCloseModal(onClose)} placement="center" scrollBehavior="outside">
        <ModalContent>
          <ModalHeader>
            Add Category
          </ModalHeader>

          <form encType="multipart/form-data" onSubmit={handleSubmitAddProduct(onAddProduct)}>
            <ModalBody>
              <Controller control={controlAddProduct} name="name" render={({field}) => (
                <Input {...field} type="text" variant="bordered" label="Name" placeholder="Product Name" isInvalid={!!errorsAddProduct?.name} errorMessage={errorsAddProduct?.name?.message} />
              )} />

              <Skeleton isLoaded={!isLoadingCategorySelect} className="rounded-2xl">
                <Controller control={controlAddProduct} name="categoryId" render={({field}) => (
                  <Autocomplete {...field} label="Select an Category" variant="bordered" isInvalid={!!errorsAddProduct?.categoryId} errorMessage={errorsAddProduct?.categoryId?.message} selectedKey={field.value || null} onSelectionChange={(key) => field.onChange(key)}>
                    {dataCategorySelect?.data?.map((c: ICategory) => (
                      <AutocompleteItem key={c._id}>
                        {c.name}
                      </AutocompleteItem>
                    ))}
                  </Autocomplete>
                )} />
              </Skeleton>

              <Controller control={controlAddProduct} name="quantity" render={({field}) => (
                <Input {...field} type="number" variant="bordered" label="Quantity" placeholder="Quantity Product" isInvalid={!!errorsAddProduct?.quantity} errorMessage={errorsAddProduct?.quantity?.message} />
              )} />
              
              <Controller control={controlAddProduct} name="price" render={({field}) => (
                <Input {...field} type="number" variant="bordered" label="Price" placeholder="Price Product" isInvalid={!!errorsAddProduct?.price} errorMessage={errorsAddProduct?.price?.message} />
              )} />

              <Controller control={controlAddProduct} name="description" render={({field}) => (
                <Textarea {...field} label="Description" variant="bordered" placeholder="Product Description" isInvalid={!!errorsAddProduct?.description} errorMessage={errorsAddProduct?.description?.message} />
              )} />
              
              <Controller control={controlAddProduct} name="image" render={({field}) => (
                <InputFile 
                  {...field}
                  name={field.name}
                  inputIcon={typeof inputIcon === "string" ? inputIcon : ""}
                  onChange={field.onChange}
                  onUpload={handleUpoloadImage}
                  isPendingUpload={isPendingUploadImage}
                  isInvalid={!!errorsAddProduct?.image}
                  errorMessage={errorsAddProduct?.image?.message}
                  isPendingSave={isPendingAddProduct}
                  onDelete={handleDeleteImage}
                  isPendingDelete={isPendingDeleteImage}
                  textInCell="Add image for product"
                />
              )} />
            </ModalBody>

            <ModalFooter>
              <Button color="danger" variant="flat" onPress={() => handleCloseModal(onClose)} disabled={isPendingAddProduct || isPendingUploadImage}>
                Cancel
              </Button>
              <Button type="submit" color="primary" variant="solid" disabled={isPendingAddProduct || isPendingUploadImage || isPendingDeleteImage}>
                {isPendingAddProduct ? <Spinner color="default" size="sm" /> : "Create"}
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    )
}

export default AddProduct;