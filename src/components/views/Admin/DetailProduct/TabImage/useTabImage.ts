import useMediaHandler from '@/hooks/mediaHandler';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const schemaProduct = yup.object({
   image: yup.mixed<string | FileList>(),
   images: yup.mixed<string[] | FileList>()
});

const useTabImage = () => {

    const {
        mutateUploadImage, 
        isPendingUploadImage, 
        mutateDeleteImage, 
        isPendingDeleteImage,
        mutateUploadImages,
        isPendingUploadImages,
        isPendingDeleteImages
    } = useMediaHandler();


    const {handleSubmit:handleSubmitImageProduct, control: controlImageProduct, formState:{errors}, setValue: setValueImageProduct, getValues, watch, reset} = useForm({
        resolver: yupResolver(schemaProduct)
    })


    const handleUpoloadImage = (files:FileList, onChange: (e: FileList) => void) => {
        if(files) {
            onChange(files);
            const file = files[0];
            mutateUploadImage({
                file,
                callback: (url: string) => {
                    setValueImageProduct("image", url);
                }
            })
        }
    }

    const inputIcon = watch("image"); 


    const handleDeleteImage = (onChange: (files: FileList | undefined) => void) => {
        const fileUrl = getValues("image")
        if(typeof fileUrl === "string") {
           mutateDeleteImage({
                fileUrl: {
                    fileUrl
                },
                callback() {
                    onChange(undefined);
                }
           })
        }
    }




    const handleUploadImages = (files: FileList, onChange: (files: FileList) => void) => {
        if(files && files.length > 0) {
            onChange(files);
            mutateUploadImages({
                files,
                callback: (arrayUrl: string[]) => {
                    const newArr: string[] = [];
                    arrayUrl.map((arr) => {
                        newArr.push(arr[0]);
                    })   
                    setValueImageProduct("images", newArr)

                }
            })
        }
    }

    // console.log(getValues("images"));

    const handleDeleteImages = (onChange: (files: FileList | undefined | string[]) => void, index: number) => {
        const fileUrl = getValues("images") as string[];
       
        const file= fileUrl[index];
        const imageSisa = fileUrl.filter((_: string, i:number) => i !== index);
        if(typeof file === "string") {
            mutateDeleteImage({
                fileUrl: {
                    fileUrl: file
                },
                callback: () => {
                    if(imageSisa.length < 1) {
                        onChange(undefined);
                    } else {
                        onChange(imageSisa);
                    }
                }
            })
        }
    }

    const urlImages = watch("images");

    return {
        controlImageProduct,
        errors,
        setValueImageProduct,
        handleSubmitImageProduct,
        reset,

        isPendingUploadImage,
        isPendingDeleteImage,

        handleUpoloadImage,
        handleDeleteImage,

        inputIcon,
        watch,

        handleUploadImages,
        handleDeleteImages,

        isPendingUploadImages,
        isPendingDeleteImages,

        urlImages,
    }
}

export default useTabImage;