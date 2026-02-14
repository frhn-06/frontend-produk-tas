import { toasterContext } from "@/context/toasterContext";
import ProductService from "@/services/product.service";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useContext } from "react";

const useRestoreProduct = (id: string) => {
    const router = useRouter();

    const {setToaster} = useContext(toasterContext);

    // const id = router.query.id;s

    const restore = async () => {
        const {data} = await ProductService.restore(`${id}`);
        return data;
    }

    const {mutate:mutateRestore, isPending:isPendingRestore, isSuccess: isSuccessRestore} = useMutation({
        mutationFn: restore,
        onError(error) {
            setToaster({
                type: "error",
                message: error.message
            })
        },
        onSuccess() {
            setToaster({
                type: "success",
                message: "success on restore product"
            })
        }
    })

    const handleRestore = () => {
        return mutateRestore();
    }

    return {
        mutateRestore,
        isPendingRestore,
        isSuccessRestore,
        handleRestore
    }
}

export default useRestoreProduct;