import { toasterContext } from "@/context/toasterContext";
import ReviewService from "@/services/review.service";
import { IReview } from "@/types/review";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import * as yup from 'yup';

const schemaReview = yup.object({
    stars: yup.number().required('please select star').min(1, "please select star"),
    comment: yup.string().required('please input your comment')
})


const useModalReview = (id: string) => {
    const {setToaster} = useContext(toasterContext);


    const {control: controleReview, handleSubmit: handleSubmitReview, setValue, reset, formState: {errors}} = useForm({
        resolver: yupResolver(schemaReview)
    })


    const createReview = async (payload: IReview) => {
        const {data} = await ReviewService.create(payload);
        return data;
    }

    const {mutate:mutateReview, isSuccess:isSuccessReview, isPending:isPendingReview} = useMutation({
        mutationFn: (payload: IReview) => createReview(payload),
        onError(error) {
            setToaster({
                type: "error",
                message: error.message
            })
        },
        onSuccess() {
            setToaster({
                type: "success",
                message: "success review"
            });
            reset()
        }
    })

    const onReview = (e: IReview) => {
        const payload = {
            ...e,
            productId: id
        }

        return mutateReview(payload);
    }
    
    return {
        handleSubmitReview,
        setValue,
        controleReview,
        errors,
        reset,

        onReview,
        mutateReview,
        isPendingReview,
        isSuccessReview
    }
}

export default useModalReview;