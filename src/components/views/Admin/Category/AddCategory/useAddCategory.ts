import { toasterContext } from "@/context/toasterContext"
import useMediaHandler from "@/hooks/mediaHandler"
import CategoryService from "@/services/category.service"
import { ICategory } from "@/types/category"
import { yupResolver } from "@hookform/resolvers/yup"
import { useMutation } from "@tanstack/react-query"
import { useContext } from "react"
import { useForm } from "react-hook-form"
import * as yup from 'yup'

const schemaCategory = yup.object({
    name: yup.string().required('please input name category'),
    description: yup.string().required('please input description category'),
    icon: yup.mixed<string | FileList>().required('please select icon')
})

const useAddCategory = () => {


    const {mutateUploadImage, isPendingUploadImage, mutateDeleteImage, isPendingDeleteImage} = useMediaHandler();

    const {setToaster} = useContext(toasterContext)



    const {control: controlAddCategory, handleSubmit: handleSubmitAddCategory, formState: {errors: errorsAddCategory}, setValue: setValueAddCategory, watch: watchAddCategory, reset: resetAddCategory, getValues: getValuesCategory} = useForm({
        resolver: yupResolver(schemaCategory)
    })


    const handleUpoloadImage = (files:FileList, onChange: (e: FileList) => void) => {
        if(files) {
            onChange(files);
            const file = files[0];
            mutateUploadImage({
                file,
                callback: (url: string) => {
                    setValueAddCategory("icon", url);
                }
            })
        }
    }

    
    const inputIcon = watchAddCategory("icon"); 


    const handleDeleteImage = (onChange: (files: FileList | undefined) => void) => {
        const fileUrl = getValuesCategory("icon")
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
        resetAddCategory();
        onClose();
    }

    const addCategory = async (payload: ICategory) => {
        const {data} = await CategoryService.create(payload);
        return data;
    }

    const {mutate: mutateAddCategory, isPending: isPendingAddCategory, isSuccess: isSuccessAddCategory} = useMutation({
        mutationFn: (payload: ICategory) => addCategory(payload),
        onError(error) {
            setToaster({
                type: "error",
                message: error.message
            })
        },
        onSuccess() {
            setToaster({
                type: "success",
                message: "success to create category"
            });
            resetAddCategory();
        }
    })

    const onAddCategory = (payload: ICategory) => {
        return mutateAddCategory(payload);
    }


    return {
        controlAddCategory,
        handleSubmitAddCategory,
        errorsAddCategory,
        inputIcon,

        handleUpoloadImage,
        isPendingUploadImage,
        handleDeleteImage,
        isPendingDeleteImage,

        handleCloseModal,

        onAddCategory,
        isPendingAddCategory,
        isSuccessAddCategory
    }
}

export default useAddCategory