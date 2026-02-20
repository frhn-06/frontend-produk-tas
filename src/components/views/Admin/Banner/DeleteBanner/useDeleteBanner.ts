import { toasterContext } from "@/context/toasterContext";
import BannerService from "@/services/banner.service";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";

const useDeleteBanner = (BannerId: string) => {

    const {setToaster} = useContext(toasterContext);

    const deleteBanner = async () => {
        const res = await BannerService.delete(BannerId);
        return res.data;
    }

    const {mutate: mutateDeleteBanner, isPending: isPendingDeleteBanner, isSuccess: isSuccessDeleteBanner} = useMutation({
        mutationFn: deleteBanner,
        onError(error) {
            setToaster({
                type: "error",
                message: error.message
            })
        },
        onSuccess() {
            setToaster({
                type: "success",
                message: "success to delete banner"
            })
        }
    })

    const handleDeleteBanner = () => {
        return mutateDeleteBanner();
    }

    return {
        handleDeleteBanner,
        isPendingDeleteBanner,
        isSuccessDeleteBanner
    }
}

export default useDeleteBanner;