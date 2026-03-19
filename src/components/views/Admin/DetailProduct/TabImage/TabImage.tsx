import { ICategory } from "@/types/category";
import useTabImage from "./useTabImage";
import { useEffect } from "react";
import { Button, Card, CardBody, CardFooter, CardHeader, Skeleton, Spinner , Image} from "@heroui/react";
import InputFile from "@/components/ui/InputFile";
import { Controller } from "react-hook-form";
import { IProduct } from "@/types/product";
import InputFiles from "@/components/ui/InputFiles/InputFiles";
import useMediaHandler from "@/hooks/mediaHandler";

interface TypeProps {
  dataImage: string,
  dataImages: string[],
  isLoading: boolean;
  isRefetching: boolean;
  onUpdate: (payload: IProduct) => void;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean;
}

const TabImage = (props: TypeProps) => {
    const {
      dataImage,
      dataImages,
      isLoading,
      isRefetching,
      onUpdate,
      isPendingUpdate,
      isSuccessUpdate
    } = props;
  
    const {
        controlImageProduct,
        errors,
        setValueImageProduct,
        handleSubmitImageProduct,
        reset,
        watch,

        isPendingUploadImage,
        isPendingDeleteImage,

        handleUpoloadImage,
        handleDeleteImage,

        inputIcon,

        handleUploadImages,
        handleDeleteImages,

        isPendingUploadImages,
        isPendingDeleteImages,

        urlImages,
        
    } = useTabImage();

    const {mutateDeleteImage} = useMediaHandler();

  
    useEffect(() => {
      if(isSuccessUpdate) {
        const oldImage = dataImage;
        mutateDeleteImage({
          fileUrl: {
            fileUrl: oldImage
          },
          callback: () => {
            true
          }
        });
        reset();
      }
    }, [isSuccessUpdate])
   
    
  
    return (
      <Card className="text-default-700 p-4">
        <form onSubmit={handleSubmitImageProduct(onUpdate)}>
          <CardHeader>
            <h1 className="text-lg font-bold">
              Product Image
            </h1>
          </CardHeader>
          <CardBody className="gap-8">
            <div className="flex flex-col gap-4">
              <p className="text-default-700 font-semibold">
                Main Image
              </p>
              <div className="flex justify-center gap-2">
                <Skeleton isLoaded={!!dataImage} className="min-h-20 rounded-2xl">
                  <div className="w-30 lg:w-60">
                    <Image src={dataImage} alt="image" className="w-full" />
                  </div>
                </Skeleton>
              </div>
              <Controller control={controlImageProduct} name="image" render={({field}) => (
                <InputFile 
                  {...field}
                  name="image"
                  inputIcon={typeof inputIcon === "string" ? inputIcon : ""}
                  onUpload={handleUpoloadImage}
                  onDelete={handleDeleteImage}
                  onChange={field.onChange}
                  isInvalid={!!errors?.image}
                  isPendingUpload={isPendingUploadImage}
                  isPendingDelete={isPendingDeleteImage}
                  errorMessage={errors?.image?.message}
                  isPendingSave={isPendingUpdate}
                  textInCell="Add image for product"
                />
              )} />
            </div>
            <div className="flex flex-col gap-4">
              <p className="text-default-700 font-semibold">
                Images
              </p>
              <div className="flex justify-center  gap-2">
                {dataImages && dataImages.length > 0 ? dataImages.map((image, i) => (
                  <Skeleton key={i} isLoaded={!!dataImages} className="min-h-20 rounded-2xl">
                    <div className="w-30 lg:w-60">
                      <Image src={image} alt="image" className="w-full" />
                    </div>
                  </Skeleton>
                )) : (
                  <p className="text-default-400">
                    images is empty
                  </p>
                )}
              </div>
            </div>
            <Controller control={controlImageProduct} name="images" render={({field}) => (
              <InputFiles 
                {...field}
                name="images"
                onUpload={handleUploadImages}
                onChange={field.onChange}
                urlArray={Array.isArray(urlImages) ? urlImages : ""}
                isInvalid={!!errors?.images}
                errorMessage={errors?.images?.message}
                isPendingUploadImages={isPendingUploadImages}
                onDelete={handleDeleteImages}
                isPendingDelete={isPendingDeleteImages}
                isPendingSave={isPendingUpdate}
                textInCell="Add images for product"
              />
            )} />
           
          </CardBody>
          <CardFooter>
            <Button type="submit" color="primary" className="ml-auto" disabled={!dataImage || isPendingUpdate}>
              {isPendingUpdate ? <Spinner color="default" size="sm" /> : "Change"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    )
}

export default TabImage;