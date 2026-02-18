import { Card, CardBody, CardHeader, Skeleton, Tab, Tabs, Image, CardFooter, Button, Spinner, Input } from "@heroui/react";
import { useEffect } from "react";
import useDetailActivity from "./useDetailActivity";
import useUpdateActivity from "./useUpdateActivity";
import { Controller } from "react-hook-form";
import InputFile from "@/components/ui/InputFile";

const DetailActivity = () => {
    const {
        dataActivity,
        isLoadingActivity,
        refetchActivity,
        isRefetchingActivity,

        handleUpdateActivity,
        isPendingUpdateActivity,
        isSuccessUpdateActivity
    } = useDetailActivity();

    const {
        controlUpdateActivity,
        errors,
        setValueUpdateActivity,
        handleSubmitUpdateActivity,
        reset,

        isPendingUploadImage,
        isPendingDeleteImage,

        handleUpoloadImage,
        handleDeleteImage,

        inputImage,
    } = useUpdateActivity()

    useEffect(() => {
      if(dataActivity) {
        setValueUpdateActivity("name", `${dataActivity?.data?.name}`);
      }
    }, [dataActivity])

    useEffect(() => {
      if(isSuccessUpdateActivity) {
        refetchActivity();
        reset();
      }
    }, [isSuccessUpdateActivity])

    return (
      <div className="flex w-full flex-col lg:w-3xl">
        <Tabs color="primary" aria-label="Options">
          <Tab key="activity" title="activity" >

            <Card className="text-default-700">
              <form onSubmit={handleSubmitUpdateActivity(handleUpdateActivity)}>
                <CardHeader>
                  <h1 className="text-lg font-bold">
                    Detail Activity
                  </h1>
                </CardHeader>
                <CardBody className="gap-4">
                  <p className="text-default-700 font-semibold">
                    info
                  </p>
                  <Skeleton isLoaded={!isLoadingActivity && !isRefetchingActivity} className="rounded-2xl">
                    <Controller control={controlUpdateActivity} name="name" render={({field}) => (
                      <Input {...field} label="Activity Name" variant="bordered" placeholder="Activity Name" defaultValue={dataActivity?.data?.name} isInvalid={!!errors?.name} errorMessage={errors?.name?.message} />              
                    )} />
                  </Skeleton>
                  <p className="text-default-700 font-semibold">
                    image
                  </p>
                  <div className="flex justify-center items-center flex-col gap-2">
                    <Skeleton isLoaded={!isLoadingActivity && !isRefetchingActivity} className="min-h-20 rounded-2xl">
                      <div className="w-30 lg:w-60">
                        <Image src={`${dataActivity?.data?.image}`} alt="image" className="w-full" />
                      </div>
                    </Skeleton>
                  </div>
                  
                  <Controller control={controlUpdateActivity} name="image" render={({field}) => (
                    <InputFile 
                      {...field}
                      name="icon"
                      inputIcon={typeof inputImage === "string" ? inputImage : ""}
                      onUpload={handleUpoloadImage}
                      onDelete={handleDeleteImage}
                      onChange={field.onChange}
                      isInvalid={!!errors?.image}
                      isPendingUpload={isPendingUploadImage}
                      isPendingDelete={isPendingDeleteImage}
                      errorMessage={errors?.image?.message}
                      isPendingSave={isPendingUpdateActivity}
                      textInCell="Add image for activity"
                    />
                  )} />
                </CardBody>
                <CardFooter>
                  <Button type="submit" color="primary" className="ml-auto" disabled={!dataActivity || isPendingUpdateActivity}>
                    {isPendingUpdateActivity ? <Spinner color="default" size="sm" /> : "Change"}
                  </Button>
                </CardFooter>
              </form>
            </Card>

          </Tab>
        </Tabs>
      </div>
    )
}

export default DetailActivity;