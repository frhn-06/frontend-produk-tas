import useMediaHandler from '@/hooks/mediaHandler';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const schemaProfile = yup.object({
    profilePicture: yup.string(),
    fullName: yup.string().required('please input your fullName'),
    userName: yup.string().required('please input your userName'),
    email: yup.string().required(),
    phone: yup.string(),
    address: yup.string(),
    coordinate: yup.array().of(yup.number())
})


const useTabProfile = () => {

    const {
        mutateUploadImage, isPendingUploadImage, mutateDeleteImage, isPendingDeleteImage
    } = useMediaHandler();


    const {control, handleSubmit: handleSubmitProfile, formState: {errors}, setValue: setValueProfile, watch, getValues: getValuesProfile} = useForm({
        resolver: yupResolver(schemaProfile)
    })


    const handleUpoloadImage = (files:FileList, onChange: (e: FileList) => void) => {
        if(files) {
            onChange(files);
            const file = files[0];
            mutateUploadImage({
                file,
                callback: (url: string) => {
                    setValueProfile("profilePicture", url);
                }
            })
        }
    }

    const srcProfile = watch("profilePicture"); 


    const handleDeleteImage = (onChange: (files: FileList | undefined) => void) => {
        const fileUrl = getValuesProfile("profilePicture")
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
        control,
        handleSubmitProfile,
        errors,
        setValueProfile,
        getValuesProfile,

        handleUpoloadImage,
        isPendingUploadImage,
        handleDeleteImage,
        isPendingDeleteImage,

        srcProfile
    }
}

export default useTabProfile;