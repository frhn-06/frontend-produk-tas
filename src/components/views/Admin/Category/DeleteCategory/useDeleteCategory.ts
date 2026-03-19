import { toasterContext } from "@/context/toasterContext";
import useMediaHandler from "@/hooks/mediaHandler";
import CategoryService from "@/services/category.service";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";

const useDeleteCategory = (categoryId: string) => {

    const {setToaster} = useContext(toasterContext);
    const {mutateDeleteImage} = useMediaHandler()

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
        onSuccess(data) {
            const icon = data.data.icon;
            mutateDeleteImage({
                fileUrl: {
                    fileUrl: `${icon}`
                },
                callback: () => {
                    setToaster({
                    type: "success",
                    message: "success to delete category"
                });
                }
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