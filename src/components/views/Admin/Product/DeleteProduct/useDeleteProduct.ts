import { toasterContext } from "@/context/toasterContext";
import ProductService from "@/services/product.service";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";

const useDeleteProduct = (productId: string) => {

    const {setToaster} = useContext(toasterContext);

    const deleteProduct = async () => {
        const res = await ProductService.delete(productId);
        return res.data;
    }

    const {mutate: mutateDeleteProduct, isPending: isPendingDeleteProduct, isSuccess: isSuccessDeleteProduct} = useMutation({
        mutationFn: deleteProduct,
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

    const handleDeleteProduct = () => {
        return mutateDeleteProduct();
    }

    return {
        handleDeleteProduct,
        isPendingDeleteProduct,
        isSuccessDeleteProduct
    }
}

export default useDeleteProduct;