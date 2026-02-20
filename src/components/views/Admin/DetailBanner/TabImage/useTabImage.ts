import useMediaHandler from '@/hooks/mediaHandler';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const schemaBanner = yup.object({
   image: yup.mixed<string | FileList>().required('please select image')
});

const useTabImage = () => {

    const {
        mutateUploadImage, isPendingUploadImage, mutateDeleteImage, isPendingDeleteImage
    } = useMediaHandler();


    const {handleSubmit:handleSubmitImageBanner, control: controlImageBanner, formState:{errors}, setValue: setValueImageBanner, getValues, watch, reset} = useForm({
        resolver: yupResolver(schemaBanner)
    })


    const handleUpoloadImage = (files:FileList, onChange: (e: FileList) => void) => {
        if(files) {
            onChange(files);
            const file = files[0];
            mutateUploadImage({
                file,
                callback: (url: string) => {
                    setValueImageBanner("image", url);
                }
            })
        }
    }

    const inputImage = watch("image"); 


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

    return {
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
        watch
    }
}

export default useTabImage;