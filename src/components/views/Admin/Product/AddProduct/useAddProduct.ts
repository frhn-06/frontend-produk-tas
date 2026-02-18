import { toasterContext } from "@/context/toasterContext"
import useMediaHandler from "@/hooks/mediaHandler"
import ActivityService from "@/services/activity.service"
import CategoryService from "@/services/category.service"
import ProductService from "@/services/product.service"
import { IProduct } from "@/types/product"
import { yupResolver } from "@hookform/resolvers/yup"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useRouter } from "next/router"
import { useContext } from "react"
import { useForm } from "react-hook-form"
import * as yup from 'yup'

const schemaProduct = yup.object({
    name: yup.string().required('please input name category'),
    categoryId: yup.string().required('please select category'),
    description: yup.string().required('please input description category'),
    price: yup.string().required('please select price'),
    quantity: yup.string().required('please select quantity'),
    image: yup.mixed<string | FileList>().required('please select icon'),
    activities: yup.array().required('please select minimal one of activity'),
    target: yup.string().required('please select product target')
})

const useAddProduct = () => {

    const router = useRouter();

    const {mutateUploadImage, isPendingUploadImage, mutateDeleteImage, isPendingDeleteImage} = useMediaHandler();

    const {setToaster} = useContext(toasterContext)



    const {control: controlAddProduct, handleSubmit: handleSubmitAddProduct, formState: {errors: errorsAddProduct}, setValue: setValueAddProduct, watch: watchAddProduct, reset: resetAddProduct, getValues: getValuesProduct} = useForm({
        resolver: yupResolver(schemaProduct)
    })


    const handleUpoloadImage = (files:FileList, onChange: (e: FileList) => void) => {
        if(files) {
            onChange(files);
            const file = files[0];
            mutateUploadImage({
                file,
                callback: (url: string) => {
                    setValueAddProduct("image", url);
                }
            })
        }
    }

    
    const inputIcon = watchAddProduct("image"); 


    const handleDeleteImage = (onChange: (files: FileList | undefined) => void) => {
        const fileUrl = getValuesProduct("image")
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
        resetAddProduct();
        onClose();
    }

    const addProduct = async (payload: IProduct) => {
        const {data} = await ProductService.create(payload);
        return data;
    }

    const {mutate: mutateAddProduct, isPending: isPendingAddProduct, isSuccess: isSuccessAddProduct} = useMutation({
        mutationFn: (payload: IProduct) => addProduct(payload),
        onError(error) {
            setToaster({
                type: "error",
                message: error.message
            })
        },
        onSuccess() {
            setToaster({
                type: "success",
                message: "success to create product"
            });
            resetAddProduct();
        }
    })

    const onAddProduct = (payload: IProduct) => {
        const load = {
            ...payload,
            price: Number(payload.price),
            quantity: Number(payload.quantity),
        }
        return mutateAddProduct(load);
        // console.log(load);
    }



    const getCategory = async () => {
        const {data} = await CategoryService.findAll();
        return data;
    }

    const {data: dataCategorySelect, isLoading: isLoadingCategorySelect} = useQuery({
        queryKey: ["SelectCategory"],
        queryFn: getCategory,
        enabled: router.isReady
    })



    const getActivity = async () => {
        const {data} = await ActivityService.findAll();
        return data;
    }

    const {data: dataActivitySelect, isLoading: isLoadingActivitySelect} = useQuery({
        queryKey: ["SelectActivity"],
        queryFn: getActivity,
        enabled: router.isReady
    })


    return {
        controlAddProduct,
        handleSubmitAddProduct,
        errorsAddProduct,
        inputIcon,

        handleUpoloadImage,
        isPendingUploadImage,
        handleDeleteImage,
        isPendingDeleteImage,

        handleCloseModal,

        onAddProduct,
        isPendingAddProduct,
        isSuccessAddProduct,

        dataCategorySelect,
        isLoadingCategorySelect,

        dataActivitySelect,
        isLoadingActivitySelect
    }
}

export default useAddProduct