import { ICategory } from "@/types/category";
import { Autocomplete, AutocompleteItem, Button, Card, CardBody, CardFooter, CardHeader, Checkbox, CheckboxGroup, Input, Select, SelectItem, Skeleton, Spinner, Textarea } from "@heroui/react";
import { useEffect } from "react";
import { Controller } from "react-hook-form";
import useTabInfo from "./useTabInfo";
import { IProduct } from "@/types/product";
import { IActivity } from "@/types/activity";


interface TypeProps {
  data: IProduct;
  isLoading: boolean;
  isRefetching: boolean;
  onUpdate: (payload: IProduct) => void;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean;
}

const TabInfo = (props: TypeProps) => {
  const {
    data,
    isLoading,
    isRefetching,
    onUpdate,
    isPendingUpdate,
    isSuccessUpdate
  } = props;

  const {
    handleSubmitInfoProduct,
    controlInfoProduct,
    errors,
    setValueInfoProduct,
    reset,

    dataCategories,
    isLoadingCategories,

    dataActivitySelect,
    isLoadingActivitySelect
  } = useTabInfo();

  useEffect(() => {
    if(data) {
      setValueInfoProduct("name", `${data?.name}`);
      setValueInfoProduct("categoryId", `${data?.categoryId}`);
      setValueInfoProduct("isPublish", `${data?.isPublish}`);
      setValueInfoProduct("isFeatured", `${data?.isFeatured}`);
      setValueInfoProduct("price", `${data?.price}`);
      setValueInfoProduct("quantity", `${data?.quantity}`);
      setValueInfoProduct("discount", `${data?.discount}`);
      setValueInfoProduct("description", `${data?.description}`);
      setValueInfoProduct("target", `${data?.target}`);
      setValueInfoProduct("activities", data?.activities);
    }
  }, [data])

  useEffect(() => {
    if(isSuccessUpdate) {
      reset();
    }
  }, [isSuccessUpdate])

  return (
    <Card className="text-default-700 p-4">
      <form onSubmit={handleSubmitInfoProduct(onUpdate)}>
        <CardHeader>
          <h1 className="text-lg font-bold">
            Category Information
          </h1>
        </CardHeader>
        <CardBody className="gap-4">
          <Skeleton isLoaded={!isLoading && !isRefetching} className="rounded-2xl">
            <Controller control={controlInfoProduct} name="name" render={({field}) => (
              <Input {...field} label="Product Name" variant="bordered" placeholder="Product Name" defaultValue={data?.name} isInvalid={!!errors?.name} errorMessage={errors?.name?.message} />              
            )} />
          </Skeleton>
          <Skeleton isLoaded={!isLoading && !isRefetching && !isLoadingCategories} className="rounded-2xl">
            <Controller control={controlInfoProduct} name="categoryId" render={({field}) => (
              <Autocomplete {...field} label="Select an Category" variant="bordered" isInvalid={!!errors?.categoryId} errorMessage={errors?.categoryId?.message} selectedKey={field.value} onSelectionChange={(key) => field.onChange(key)} defaultItems={dataCategories?.data || []}>
                {(c: ICategory) => (
                  <AutocompleteItem key={c._id}>
                    {c.name}
                  </AutocompleteItem>
                )}
              </Autocomplete>         
            )} />
          </Skeleton>
          <Skeleton isLoaded={!isLoading && !isRefetching && !!data?.target} className="rounded-2xl">
            <Controller control={controlInfoProduct} name="target" render={({field}) => (
              <Select {...field} label="Select Target" variant="bordered" errorMessage={errors?.target?.message} selectedKeys={data?.target ? [data.target] : []}>
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
          </Skeleton>
          <Skeleton isLoaded={!isLoading && !isRefetching} className="rounded-2xl">
            <Controller control={controlInfoProduct} name="activities" render={({field}) => (
              <CheckboxGroup {...field} label={(<span className="text-default-500">Activity</span>)} value={data?.activities ?? []} onChange={field.onChange} isInvalid={!!errors?.activities} errorMessage={errors?.activities?.message}>
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
          <Skeleton isLoaded={!isLoading && !isRefetching} className="rounded-2xl">
            <Controller control={controlInfoProduct} name="isPublish" render={({field}) => (
              <Select {...field} label="Product Status" variant="bordered" disallowEmptySelection defaultSelectedKeys={data?.isPublish ? ["true"] : ["false"]} className="w-full" isInvalid={!!errors?.isPublish} errorMessage={errors?.isPublish?.message}>
                <SelectItem key="true">
                  Publish
                </SelectItem>
                <SelectItem key="false">
                  Hide
                </SelectItem>
              </Select>
            )} />
          </Skeleton>
          <Skeleton isLoaded={!isLoading && !isRefetching} className="rounded-2xl">
            <Controller control={controlInfoProduct} name="isFeatured" render={({field}) => (
              <Select {...field} label="Product Featured" variant="bordered" disallowEmptySelection defaultSelectedKeys={data?.isFeatured ? ["true"] : ["false"]} className="w-full">
                <SelectItem key="true">
                  Yes
                </SelectItem>
                <SelectItem key="false">
                  No
                </SelectItem>
              </Select>
            )} />
          </Skeleton>
          <Skeleton isLoaded={!isLoading && !isRefetching} className="rounded-2xl">
            <Controller control={controlInfoProduct} name="price" render={({field}) => (
              <Input {...field} type="number" label="Product Price" variant="bordered" placeholder="Product Price" defaultValue={`${data?.price}`} isInvalid={!!errors?.price} errorMessage={errors?.price?.message} />              
            )} />
          </Skeleton>
          <Skeleton isLoaded={!isLoading && !isRefetching} className="rounded-2xl">
            <Controller control={controlInfoProduct} name="quantity" render={({field}) => (
              <Input {...field} type="number" label="Product Quantity" variant="bordered" placeholder="Product Quantity" defaultValue={`${data?.quantity}`} isInvalid={!!errors?.quantity} errorMessage={errors?.quantity?.message} />              
            )} />
          </Skeleton>
          <Skeleton isLoaded={!isLoading && !isRefetching} className="rounded-2xl">
            <Controller control={controlInfoProduct} name="discount" render={({field}) => (
              <Input {...field} type="number" label="Product Discount" variant="bordered" placeholder="Product Discount" defaultValue={`${data?.discount}`} isInvalid={!!errors?.discount} errorMessage={errors?.discount?.message} />              
            )} />
          </Skeleton>
          <Skeleton isLoaded={!isLoading && !isRefetching} className="rounded-2xl">
            <Controller control={controlInfoProduct} name="description" render={({field}) => (
              <Skeleton {...field} isLoaded={!isLoading && !isRefetching} className="rounded-2xl">
                <Textarea className="" label="Product Description" variant="bordered" placeholder="Product Description" defaultValue={data?.description} isInvalid={!!errors?.description} errorMessage={errors?.description?.message} />
              </Skeleton>
            )} />
          </Skeleton>
        </CardBody>
        <CardFooter>
          <Button type="submit" color="primary" className="ml-auto" disabled={!data || isPendingUpdate}>
            {isPendingUpdate ? <Spinner color="default" size="sm" /> : "Change"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

export default TabInfo;