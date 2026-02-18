import { toasterContext } from "@/context/toasterContext"
import useMediaHandler from "@/hooks/mediaHandler"
import ActivityService from "@/services/activity.service"
import { IActivity } from "@/types/activity"
import { ICategory } from "@/types/category"
import { yupResolver } from "@hookform/resolvers/yup"
import { useMutation } from "@tanstack/react-query"
import { useContext } from "react"
import { useForm } from "react-hook-form"
import * as yup from 'yup'

const schemaActivity = yup.object({
    name: yup.string().required('please input name activity'),
    image: yup.mixed<string | FileList>().required('please select image')
})

const useAddActivity = () => {


    const {mutateUploadImage, isPendingUploadImage, mutateDeleteImage, isPendingDeleteImage} = useMediaHandler();

    const {setToaster} = useContext(toasterContext)



    const {control: controlAddActivity, handleSubmit: handleSubmitAddActivity, formState: {errors: errorsAddActivity}, setValue: setValueAddActivity, watch: watchAddActivity, reset: resetAddActivity, getValues: getValuesActivity} = useForm({
        resolver: yupResolver(schemaActivity)
    })


    const handleUpoloadImage = (files:FileList, onChange: (e: FileList) => void) => {
        if(files) {
            onChange(files);
            const file = files[0];
            mutateUploadImage({
                file,
                callback: (url: string) => {
                    setValueAddActivity("image", url);
                }
            })
        }
    }

    
    const inputIcon = watchAddActivity("image"); 


    const handleDeleteImage = (onChange: (files: FileList | undefined) => void) => {
        const fileUrl = getValuesActivity("image")
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


    const handleCloseModal = (onClose: () => void) => {
        resetAddActivity();
        onClose();
    }

    const addActivity = async (payload: IActivity) => {
        const {data} = await ActivityService.create(payload);
        return data;
    }

    const {mutate: mutateAddActivity, isPending: isPendingAddActivity, isSuccess: isSuccessAddActivity} = useMutation({
        mutationFn: (payload: IActivity) => addActivity(payload),
        onError(error) {
            setToaster({
                type: "error",
                message: error.message
            })
        },
        onSuccess() {
            setToaster({
                type: "success",
                message: "success to create activity"
            });
            resetAddActivity();
        }
    })

    const onAddActivity = (payload: IActivity) => {
        return mutateAddActivity(payload);
    }


    return {
        controlAddActivity,
        handleSubmitAddActivity,
        errorsAddActivity,
        inputIcon,

        handleUpoloadImage,
        isPendingUploadImage,
        handleDeleteImage,
        isPendingDeleteImage,

        handleCloseModal,

        onAddActivity,
        isPendingAddActivity,
        isSuccessAddActivity
    }
}

export default useAddActivity