import useMediaHandler from '@/hooks/mediaHandler';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const schemaActivity = yup.object({
    name: yup.string().required('please input name'),
    image: yup.mixed<string | FileList>(),
});

const useUpdateActivity = () => {

    const {
        mutateUploadImage, isPendingUploadImage, mutateDeleteImage, isPendingDeleteImage
    } = useMediaHandler();


    const {handleSubmit:handleSubmitUpdateActivity, control: controlUpdateActivity, formState:{errors}, setValue: setValueUpdateActivity, getValues, watch, reset} = useForm({
        resolver: yupResolver(schemaActivity)
    })


    const handleUpoloadImage = (files:FileList, onChange: (e: FileList) => void) => {
        if(files) {
            onChange(files);
            const file = files[0];
            mutateUploadImage({
                file,
                callback: (url: string) => {
                    setValueUpdateActivity("image", url);
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
        watch
    }
}

export default useUpdateActivity;