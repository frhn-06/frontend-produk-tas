import { toasterContext } from "@/context/toasterContext";
import CategoryService from "@/services/category.service";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";

const useDeleteCategory = (categoryId: string) => {

    const {setToaster} = useContext(toasterContext);

    const deleteCategory = async () => {
        const res = await CategoryService.delete(categoryId);
        return res.data;
    }

    const {mutate: mutateDeleteCategory, isPending: isPendingDeleteCategory, isSuccess: isSuccessDeleteCategory} = useMutation({
        mutationFn: deleteCategory,
        onError(error) {
            setToaster({
                type: "error",
                message: error.message
            })
        },
        onSuccess() {
            setToaster({
                type: "success",
                message: "success to delete category"
            })
        }
    })

    const handleDeleteCategory = () => {
        return mutateDeleteCategory();
    }

    return {
        handleDeleteCategory,
        isPendingDeleteCategory,
        isSuccessDeleteCategory
    }
}

export default useDeleteCategory;