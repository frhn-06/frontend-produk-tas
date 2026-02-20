import { Button, Card, CardBody, CardFooter, CardHeader, Input, Skeleton, Spinner, Textarea } from "@heroui/react";
import { useEffect } from "react";
import { Controller } from "react-hook-form";
import useTabInfo from "./useTabInfo";
import { IBanner } from "@/types/banner";


interface TypeProps {
  data: IBanner,
  isLoading: boolean;
  isRefetching: boolean;
  onUpdate: (payload: IBanner) => void;
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
    handleSubmitInfoBanner,
    controlInfoBanner,
    errors,
    setValueInfoBanner,
    reset
  } = useTabInfo();

  useEffect(() => {
    if(data) {
      setValueInfoBanner("name", `${data?.name}`);
      setValueInfoBanner("description", `${data?.description}`)
    }
  }, [data])

  useEffect(() => {
    if(isSuccessUpdate) {
      reset();
    }
  },[isSuccessUpdate])

  return (
    <Card className="text-default-700">
      <form onSubmit={handleSubmitInfoBanner(onUpdate)}>
        <CardHeader>
          <h1 className="text-lg font-bold">
            Banner Information
          </h1>
        </CardHeader>
        <CardBody className="gap-4">
          <Skeleton isLoaded={!isLoading && !isRefetching} className="rounded-2xl">
            <Controller control={controlInfoBanner} name="name" render={({field}) => (
              <Input {...field} label="Name" variant="bordered" placeholder="Banner Name" defaultValue={data?.name} isInvalid={!!errors?.name} errorMessage={errors?.name?.message} />              
            )} />
          </Skeleton>
          <Skeleton isLoaded={!isLoading && !isRefetching} className="rounded-2xl">
            <Controller control={controlInfoBanner} name="description" render={({field}) => (
              <Skeleton {...field} isLoaded={!isLoading && !isRefetching} className="rounded-2xl">
                <Textarea className="" label="Description" variant="bordered" placeholder="Banner Description" defaultValue={data?.description} isInvalid={!!errors?.description} errorMessage={errors?.description?.message} />
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