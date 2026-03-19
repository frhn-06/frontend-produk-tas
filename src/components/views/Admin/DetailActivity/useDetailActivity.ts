import { toasterContext } from "@/context/toasterContext";
import ActivityService from "@/services/activity.service";
import { IActivity } from "@/types/activity";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useContext } from "react";

const useDetailActivity = () => {
    const router = useRouter();

    const {setToaster} = useContext(toasterContext);

    const getActivityById = async () => {
        const params = router.query.id;
        const {data} = await ActivityService.findById(`${params}`);
        return data;
    }

    const {data:dataActivity, isLoading: isLoadingActivity, refetch: refetchActivity, isRefetching: isRefetchingActivity} = useQuery({
        queryKey: ["DetailActivity"],
        queryFn: getActivityById,
        enabled: router.isReady
    });

    const updateActivity = async (payload: IActivity) => {
        const params = router.query.id;        
        const {data} = await ActivityService.update(`${params}`, payload)
        return data;
    }


    const {mutate: mutateUpdateActivity, isPending: isPendingUpdateActivity, isSuccess: isSuccessUpdateActivity} = useMutation({
        mutationFn: (payload: IActivity) => updateActivity(payload),
        onError(error) {
            setToaster({
                type: "error",
                message: error.message
            })
        },
        onSuccess() {
            setToaster({
                type: "success",
                message: "success to update activity"
            });
        }
    })
    
    const handleUpdateActivity = (payload: IActivity) => {
        return mutateUpdateActivity(payload);
    }

    return {
        dataActivity,
        isLoadingActivity,
        refetchActivity,
        isRefetchingActivity,

        handleUpdateActivity,
        isPendingUpdateActivity,
        isSuccessUpdateActivity
    }
}

export default useDetailActivity;