import useMediaHandler from '@/hooks/mediaHandler';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const schemaCategory = yup.object({
   icon: yup.mixed<string | FileList>().required('please select image')
});

const useTabIcon = () => {

    const {
        mutateUploadImage, isPendingUploadImage, mutateDeleteImage, isPendingDeleteImage
    } = useMediaHandler();


    const {handleSubmit:handleSubmitIconCategory, control: controlIconCategory, formState:{errors}, setValue: setValueIconCategory, getValues, watch} = useForm({
        resolver: yupResolver(schemaCategory)
    })


    const handleUpoloadImage = (files:FileList, onChange: (e: FileList) => void) => {
        if(files) {
            onChange(files);
            const file = files[0];
            mutateUploadImage({
                file,
                callback: (url: string) => {
                    setValueIconCategory("icon", url);
                }
            })
        }
    }

    const inputIcon = watch("icon"); 


    const handleDeleteImage = (onChange: (files: FileList | undefined) => void) => {
        const fileUrl = getValues("icon")
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
        controlIconCategory,
        errors,
        setValueIconCategory,
        handleSubmitIconCategory,

        isPendingUploadImage,
        isPendingDeleteImage,

        handleUpoloadImage,
        handleDeleteImage,

        inputIcon,
        watch
    }
}

export default useTabIcon;