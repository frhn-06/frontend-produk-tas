import { toasterContext } from "@/context/toasterContext";
import CategoryService from "@/services/category.service";
import { ICategory } from "@/types/category";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useContext } from "react";

const useDetailCategory = () => {
    const router = useRouter();

    const {setToaster} = useContext(toasterContext);

    const getCategoryById = async () => {
        const params = router.query.id;
        const {data} = await CategoryService.findById(`${params}`);
        return data;
    }

    const {data:dataCategory, isLoading: isLoadingCategory, refetch: refetchCategory, isRefetching: isRefetchingCategory} = useQuery({
        queryKey: ["DetailCategory"],
        queryFn: getCategoryById,
        enabled: router.isReady
    });

    const updateCategory = async (payload: ICategory) => {
        const params = router.query.id;        
        const {data} = await CategoryService.update(`${params}`, payload)
        return data;
    }


    const {mutate: mutateUpdateCategory, isPending: isPendingUpdateCategory, isSuccess: isSuccessUpdateCategory} = useMutation({
        mutationFn: (payload: ICategory) => updateCategory(payload),
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
        }
    })
    
    const handleUpdateCategory = (payload: ICategory) => {
        return mutateUpdateCategory(payload);
    }

    return {
        dataCategory,
        isLoadingCategory,
        refetchCategory,
        isRefetchingCategory,

        handleUpdateCategory,
        isPendingUpdateCategory,
        isSuccessUpdateCategory
    }
}

export default useDetailCategory;