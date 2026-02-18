import { toasterContext } from "@/context/toasterContext";
import ProductService from "@/services/product.service";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useContext } from "react";

const useDeletePermanentProduct = (id: string) => {

    const {setToaster} = useContext(toasterContext);

    // const id = router.query.id;s

    const deletePermanent = async () => {
        const {data} = await ProductService.deletePermanent(`${id}`);
        return data;
    }

    const {mutate:mutateDeletePermanent, isPending:isPendingDeletePermanent, isSuccess: isSuccessDeletePermanent} = useMutation({
        mutationFn: deletePermanent,
        onError(error) {
            setToaster({
                type: "error",
                message: error.message
            })
        },
        onSuccess() {
            setToaster({
                type: "success",
                message: "success on delete permanent product"
            })
        }
    })

    const handleDeletePermanent = () => {
        return mutateDeletePermanent();
    }

    return {
        mutateDeletePermanent,
        isPendingDeletePermanent,
        isSuccessDeletePermanent,
        handleDeletePermanent
    }
}

export default useDeletePermanentProduct;