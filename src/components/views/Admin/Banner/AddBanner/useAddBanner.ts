import { toasterContext } from "@/context/toasterContext"
import useMediaHandler from "@/hooks/mediaHandler"
import BannerService from "@/services/banner.service"
import { IBanner } from "@/types/banner"
import { yupResolver } from "@hookform/resolvers/yup"
import { useMutation } from "@tanstack/react-query"
import { useContext } from "react"
import { useForm } from "react-hook-form"
import * as yup from 'yup'

const schemaBanner = yup.object({
    name: yup.string().required('please input name activity'),
    image: yup.mixed<string | FileList>().required('please select image'),
    description: yup.string().required('please input description')
})

const useAddBanner = () => {


    const {mutateUploadImage, isPendingUploadImage, mutateDeleteImage, isPendingDeleteImage} = useMediaHandler();

    const {setToaster} = useContext(toasterContext)



    const {control: controlAddBanner, handleSubmit: handleSubmitAddBanner, formState: {errors: errorsAddBanner}, setValue: setValueAddBanner, watch: watchAddBanner, reset: resetAddBanner, getValues: getValuesActivity} = useForm({
        resolver: yupResolver(schemaBanner)
    })


    const handleUpoloadImage = (files:FileList, onChange: (e: FileList) => void) => {
        if(files) {
            onChange(files);
            const file = files[0];
            mutateUploadImage({
                file,
                callback: (url: string) => {
                    setValueAddBanner("image", url);
                }
            })
        }
    }

    
    const inputIcon = watchAddBanner("image"); 


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
        resetAddBanner();
        onClose();
    }

    const addBanner = async (payload: IBanner) => {
        const {data} = await BannerService.create(payload);
        return data;
    }

    const {mutate: mutateAddBanner, isPending: isPendingAddBanner, isSuccess: isSuccessAddBanner} = useMutation({
        mutationFn: (payload: IBanner) => addBanner(payload),
        onError(error) {
            setToaster({
                type: "error",
                message: error.message
            })
        },
        onSuccess() {
            setToaster({
                type: "success",
                message: "success to create banner"
            });
            resetAddBanner();
        }
    })

    const onAddBanner = (payload: IBanner) => {
        return mutateAddBanner(payload);
    }


    return {
        controlAddBanner,
        handleSubmitAddBanner,
        errorsAddBanner,
        inputIcon,

        handleUpoloadImage,
        isPendingUploadImage,
        handleDeleteImage,
        isPendingDeleteImage,

        handleCloseModal,

        onAddBanner,
        isPendingAddBanner,
        isSuccessAddBanner
    }
}

export default useAddBanner