import { toasterContext } from "@/context/toasterContext";
import useMediaHandler from "@/hooks/mediaHandler";
import ProductService from "@/services/product.service";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";

const useDeleteProduct = (productId: string) => {

    const {setToaster} = useContext(toasterContext);
    const {mutateDeleteImage} = useMediaHandler();

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
        onSuccess(data) {
            const image = data.data.image;
            const images = data.data.images;
            mutateDeleteImage({
                fileUrl: {
                    fileUrl: image
                },
                callback: () => {
                    setToaster({
                        type: "success",
                        message: "success to delete category"
                    });
                }
            })
            if(images.length > 0) {
                for(const image of images) {
                    mutateDeleteImage({
                        fileUrl: {
                            fileUrl: image
                        },
                        callback:() => {
                            
                        }
                    })
                } 
            }
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