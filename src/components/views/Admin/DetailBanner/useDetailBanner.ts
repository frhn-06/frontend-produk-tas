import { toasterContext } from "@/context/toasterContext";
import BannerService from "@/services/banner.service";
import { IBanner } from "@/types/banner";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useContext } from "react";

const useDetailBanner = () => {
    const router = useRouter();

    const {setToaster} = useContext(toasterContext);

    const getBannerById = async () => {
        const params = router.query.id;
        const {data} = await BannerService.findById(`${params}`);
        return data;
    }

    const {data:dataBanner, isLoading: isLoadingBanner, refetch: refetchBanner, isRefetching: isRefetchingBanner} = useQuery({
        queryKey: ["DetailBanner"],
        queryFn: getBannerById,
        enabled: router.isReady
    });

    const updateBanner = async (payload: IBanner) => {
        const params = router.query.id;        
        const {data} = await BannerService.update(`${params}`, payload)
        return data;
    }


    const {mutate: mutateUpdateBanner, isPending: isPendingUpdateBanner, isSuccess: isSuccessUpdateBanner} = useMutation({
        mutationFn: (payload: IBanner) => updateBanner(payload),
        onError(error) {
            setToaster({
                type: "error",
                message: error.message
            })
        },
        onSuccess() {
            setToaster({
                type: "success",
                message: "success to update banner"
            });
        }
    })
    
    const handleUpdateBanner = (payload: IBanner) => {
        return mutateUpdateBanner(payload);
    }

    return {
        dataBanner,
        isLoadingBanner,
        refetchBanner,
        isRefetchingBanner,

        handleUpdateBanner,
        isPendingUpdateBanner,
        isSuccessUpdateBanner
    }
}

export default useDetailBanner;