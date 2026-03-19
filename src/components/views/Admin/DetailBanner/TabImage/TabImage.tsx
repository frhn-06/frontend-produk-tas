import { ICategory } from "@/types/category";
import useTabImage from "./useTabImage";
import { useEffect } from "react";
import { Button, Card, CardBody, CardFooter, CardHeader, Skeleton, Spinner, Image } from "@heroui/react";
import InputFile from "@/components/ui/InputFile";
import { Controller } from "react-hook-form";
import { IBanner } from "@/types/banner";
import useMediaHandler from "@/hooks/mediaHandler";

interface TypeProps {
  data: string,
  isLoading: boolean;
  isRefetching: boolean;
  onUpdate: (payload: IBanner) => void;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean;
}

const TabImage = (props: TypeProps) => {
    const {
      data,
      isLoading,
      isRefetching,
      onUpdate,
      isPendingUpdate,
      isSuccessUpdate
    } = props;
  
    const {
        controlImageBanner,
        errors,
        setValueImageBanner,
        handleSubmitImageBanner,
        reset,

        isPendingUploadImage,
        isPendingDeleteImage,

        handleUpoloadImage,
        handleDeleteImage,

        inputImage,
    } = useTabImage();

    const {mutateDeleteImage} = useMediaHandler();

  
    useEffect(() => {
      if(isSuccessUpdate) {
        mutateDeleteImage({
            fileUrl: {
                fileUrl: data
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
        <form onSubmit={handleSubmitImageBanner(onUpdate)}>
          <CardHeader>
            <h1 className="text-lg font-bold">
              Banner Image
            </h1>
          </CardHeader>
          <CardBody className="gap-4">
            <p className="text-default-700 font-semibold">
              Image
            </p>
            <div className="flex justify-center items-center flex-col gap-2">
                <Skeleton isLoaded={!!data} className="min-h-20 rounded-2xl">
                  <div className="w-30 lg:w-60">
                    <Image src={data} alt="image" className="w-full" />
                  </div>
                </Skeleton>
             
            </div>
            <Controller control={controlImageBanner} name="image" render={({field}) => (
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
                isPendingSave={isPendingUpdate}
                textInCell="Add image for banner"
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

export default TabImage;