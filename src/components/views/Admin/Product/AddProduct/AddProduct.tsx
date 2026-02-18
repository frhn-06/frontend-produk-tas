import InputFile from "@/components/ui/InputFile";
import { Autocomplete, AutocompleteItem, Button, Checkbox, CheckboxGroup, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, Skeleton, Spinner, Textarea } from "@heroui/react";
import { Controller } from "react-hook-form";
import { useEffect, useState } from "react";
import { ICategory } from "@/types/category";
import useAddProduct from "./useAddProduct";
import { IActivity } from "@/types/activity";

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
      isLoadingCategorySelect,
      dataActivitySelect,
      isLoadingActivitySelect
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
                <Input {...field} type="text" variant="bordered" label={(<span className="text-default-500">Name</span>)} placeholder="Product Name" isInvalid={!!errorsAddProduct?.name} errorMessage={errorsAddProduct?.name?.message} labelPlacement="outside" />
              )} />

              <Skeleton isLoaded={!isLoadingCategorySelect} className="rounded-2xl">
                <Controller control={controlAddProduct} name="categoryId" render={({field}) => (
                  <Autocomplete {...field} label={(<span className="text-default-500">Category</span>)} variant="bordered" isInvalid={!!errorsAddProduct?.categoryId} errorMessage={errorsAddProduct?.categoryId?.message} labelPlacement="outside" selectedKey={field.value || null} onSelectionChange={(key) => field.onChange(key)}>
                    {dataCategorySelect?.data?.map((c: ICategory) => (
                      <AutocompleteItem key={c._id}>
                        {c.name}
                      </AutocompleteItem>
                    ))}
                  </Autocomplete>
                )} />
              </Skeleton>

              <Controller control={controlAddProduct} name="quantity" render={({field}) => (
                <Input {...field} type="number" variant="bordered" label={(<span className="text-default-500">Stock</span>)} placeholder="Quantity Product" isInvalid={!!errorsAddProduct?.quantity} errorMessage={errorsAddProduct?.quantity?.message} labelPlacement="outside" />
              )} />
              
              <Controller control={controlAddProduct} name="price" render={({field}) => (
                <Input {...field} type="number" variant="bordered" label={(<span className="text-default-500">Price</span>)} placeholder="Price Product" isInvalid={!!errorsAddProduct?.price} errorMessage={errorsAddProduct?.price?.message} labelPlacement="outside" />
              )} />

              <Skeleton isLoaded={!isLoadingActivitySelect} className="rounded-2xl">
                <Controller control={controlAddProduct} name="activities" defaultValue={[]} render={({field}) => (
                  <CheckboxGroup {...field} label={(<span className="text-default-500">Activity</span>)} value={field.value ?? []} onChange={field.onChange} isInvalid={!!errorsAddProduct?.activities} errorMessage={errorsAddProduct?.activities?.message}>
                    {dataActivitySelect?.data?.map((a: IActivity) => (
                      <Checkbox key={`${a._id}`} value={`${a._id}`} >
                        <span className="text-default-800">
                          {a.name}
                        </span>
                      </Checkbox>
                    ))}
                  </CheckboxGroup>
                )} />
              </Skeleton>

              <Controller control={controlAddProduct} name="target" render={({field}) => (
                <Select {...field} label={(<span className="text-default-500">Target</span>)} labelPlacement="outside"  isInvalid={!!errorsAddProduct?.target} errorMessage={errorsAddProduct?.target?.message}>
                  <SelectItem key="unisex">
                    Unisex
                  </SelectItem>
                  <SelectItem key="pria">
                    Pria
                  </SelectItem>
                  <SelectItem key="wanita">
                    Wanita
                  </SelectItem>
                  <SelectItem key="anak">
                    Anak-anak
                  </SelectItem>
                </Select>
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