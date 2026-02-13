import { ICategory } from "@/types/category";
import { Button, Card, CardBody, CardFooter, CardHeader, Input, Skeleton, Spinner, Textarea } from "@heroui/react";
import { useEffect } from "react";
import { Controller } from "react-hook-form";
import useTabInfo from "./useTabInfo";

interface TypeProps {
  data: ICategory,
  isLoading: boolean;
  isRefetching: boolean;
  onUpdate: (payload: ICategory) => void;
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
    handleSubmitInfoCategory,
    controlInfoCategory,
    errors,
    setValueInfoCategory,
    reset
  } = useTabInfo();

  useEffect(() => {
    if(data) {
      setValueInfoCategory("name", `${data?.name}`);
      setValueInfoCategory("description", `${data?.description}`)
    }
  }, [data])

  useEffect(() => {
    if(isSuccessUpdate) {
      reset();
    }
  },[isSuccessUpdate])

  return (
    <Card className="text-default-700">
      <form onSubmit={handleSubmitInfoCategory(onUpdate)}>
        <CardHeader>
          <h1 className="text-lg font-bold">
            Category Information
          </h1>
        </CardHeader>
        <CardBody className="gap-4">
          <Skeleton isLoaded={!isLoading && !isRefetching} className="rounded-2xl">
            <Controller control={controlInfoCategory} name="name" render={({field}) => (
              <Input {...field} label="Category Name" variant="bordered" placeholder="Category Name" defaultValue={data?.name} isInvalid={!!errors?.name} errorMessage={errors?.name?.message} />              
            )} />
          </Skeleton>
          <Skeleton isLoaded={!isLoading && !isRefetching} className="rounded-2xl">
            <Controller control={controlInfoCategory} name="description" render={({field}) => (
              <Skeleton {...field} isLoaded={!isLoading && !isRefetching} className="rounded-2xl">
                <Textarea className="" label="Category Description" variant="bordered" placeholder="Category Description" defaultValue={data?.description} isInvalid={!!errors?.description} errorMessage={errors?.description?.message} />
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