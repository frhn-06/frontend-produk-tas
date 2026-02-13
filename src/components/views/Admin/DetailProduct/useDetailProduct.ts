import { toasterContext } from "@/context/toasterContext";
import ProductService from "@/services/product.service";
import { IProduct } from "@/types/product";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useContext } from "react";

const useDetailProduct = () => {
    const router = useRouter();

    const {setToaster} = useContext(toasterContext);

    const getProductById = async () => {
        const params = router.query.id;
        const {data} = await ProductService.findOneById(`${params}`);
        return data;
    }

    const {data:dataProduct, isLoading: isLoadingProduct, refetch: refetchProduct, isRefetching: isRefetchingProduct} = useQuery({
        queryKey: ["DetailProduct"],
        queryFn: getProductById,
        enabled: router.isReady
    });

    const updateProduct = async (payload: IProduct) => {
        const params = router.query.id;        
        const {data} = await ProductService.update(`${params}`, payload)
        return data;
    }


    const {mutate: mutateUpdateProduct, isPending: isPendingUpdateProduct, isSuccess: isSuccessUpdateProduct} = useMutation({
        mutationFn: (payload: IProduct) => updateProduct(payload),
        onError(error) {
            setToaster({
                type: "error",
                message: error.message
            })
        },
        onSuccess() {
            setToaster({
                type: "success",
                message: "success to update product"
        });
        }
    })
    
    const handleUpdateProduct = (payload: IProduct) => {
        return mutateUpdateProduct(payload);
    }

    return {
        dataProduct,
        isLoadingProduct,
        refetchProduct,
        isRefetchingProduct,

        handleUpdateProduct,
        isPendingUpdateProduct,
        isSuccessUpdateProduct
    }
}

export default useDetailProduct;