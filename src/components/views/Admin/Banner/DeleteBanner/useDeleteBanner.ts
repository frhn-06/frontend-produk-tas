import { toasterContext } from "@/context/toasterContext";
import useMediaHandler from "@/hooks/mediaHandler";
import BannerService from "@/services/banner.service";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";

const useDeleteBanner = (BannerId: string) => {

    const {setToaster} = useContext(toasterContext);
    const {mutateDeleteImage} = useMediaHandler();

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
        onSuccess(data) {
            const banner = data.data.image;
            mutateDeleteImage({
                fileUrl: {
                    fileUrl: banner
                },
                callback: () => {
                    setToaster({
                        type: "success",
                        message: "success to delete banner"
                    })
                }
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