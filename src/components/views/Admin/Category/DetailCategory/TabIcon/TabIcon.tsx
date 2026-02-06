import { ICategory } from "@/types/category";
import useTabIcon from "./useTabIcon";
import { useEffect } from "react";
import { Button, Card, CardBody, CardFooter, CardHeader, Spinner } from "@heroui/react";
import InputFile from "@/components/ui/InputFile";
import { Controller } from "react-hook-form";

interface TypeProps {
  data: string,
  isLoading: boolean;
  isRefetching: boolean;
  onUpdate: (payload: ICategory) => void;
  isPendingUpdate: boolean;
}

const TabIcon = (props: TypeProps) => {
    const {
      data,
      isLoading,
      isRefetching,
      onUpdate,
      isPendingUpdate
    } = props;
  
    const {
        controlIconCategory,
        errors,
        setValueIconCategory,
        handleSubmitIconCategory,

        isPendingUploadImage,
        isPendingDeleteImage,

        handleUpoloadImage,
        handleDeleteImage,

        inputIcon,
    } = useTabIcon();
  
    useEffect(() => {
      if(data) {
        setValueIconCategory("icon", `${data}`);
      }
    }, [data])
  
    return (
      <Card className="text-default-700">
        <form onSubmit={handleSubmitIconCategory(onUpdate)}>
          <CardHeader>
            <h1 className="text-lg font-bold">
              Category Icon
            </h1>
          </CardHeader>
          <CardBody className="gap-4">
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
                isPendingUploadCategory={isPendingUpdate}
                
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