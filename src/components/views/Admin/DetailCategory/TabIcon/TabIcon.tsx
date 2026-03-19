import { ICategory } from "@/types/category";
import useTabIcon from "./useTabIcon";
import { useEffect } from "react";
import { Button, Card, CardBody, CardFooter, CardHeader, Skeleton, Spinner, Image } from "@heroui/react";
import InputFile from "@/components/ui/InputFile";
import { Controller } from "react-hook-form";
import useMediaHandler from "@/hooks/mediaHandler";

interface TypeProps {
  data: string,
  isLoading: boolean;
  isRefetching: boolean;
  onUpdate: (payload: ICategory) => void;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean;
}

const TabIcon = (props: TypeProps) => {
    const {
      data,
      isLoading,
      isRefetching,
      onUpdate,
      isPendingUpdate,
      isSuccessUpdate
    } = props;
  
    const {
        controlIconCategory,
        errors,
        setValueIconCategory,
        handleSubmitIconCategory,
        reset,

        isPendingUploadImage,
        isPendingDeleteImage,

        handleUpoloadImage,
        handleDeleteImage,

        inputIcon,
    } = useTabIcon();

    const {mutateDeleteImage} = useMediaHandler();
  
    useEffect(() => {
      if(isSuccessUpdate) {
        const icon = data;
        mutateDeleteImage({
          fileUrl: {
            fileUrl: icon
          },
          callback: () => {
            true
          }
        })
        reset();
      }
    }, [isSuccessUpdate])
    
  
    return (
      <Card className="text-default-700">
        <form onSubmit={handleSubmitIconCategory(onUpdate)}>
          <CardHeader>
            <h1 className="text-lg font-bold">
              Category Icon
            </h1>
          </CardHeader>
          <CardBody className="gap-4">
            <p className="text-default-700 font-semibold">
              Icon
            </p>
            <div className="flex justify-center items-center flex-col gap-2">
              <Skeleton isLoaded={!!data} className="min-h-20 rounded-2xl">
                <div className="w-30 lg:w-60">
                  <Image src={data} alt="image" className="w-full" />
                </div>
              </Skeleton>
            </div>
            <Controller control={controlIconCategory} name="icon" render={({field}) => (
              <InputFile 
                {...field}
                name="icon"
                inputIcon={typeof inputIcon === "string" ? inputIcon : ""}
                onUpload={handleUpoloadImage}
                onDelete={handleDeleteImage}
                onChange={field.onChange}
                isInvalid={!!errors?.icon}
                isPendingUpload={isPendingUploadImage}
                isPendingDelete={isPendingDeleteImage}
                errorMessage={errors?.icon?.message}
                isPendingSave={isPendingUpdate}
                textInCell="Add icon for category"
              />
            )} />
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

export default TabIcon;