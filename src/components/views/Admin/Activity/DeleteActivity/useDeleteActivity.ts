import { toasterContext } from "@/context/toasterContext";
import ActivityService from "@/services/activity.service";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";

const useDeleteActivity = (ActivityId: string) => {

    const {setToaster} = useContext(toasterContext);

    const deleteActivity = async () => {
        const res = await ActivityService.delete(ActivityId);
        return res.data;
    }

    const {mutate: mutateDeleteActivity, isPending: isPendingDeleteActivity, isSuccess: isSuccessDeleteActivity} = useMutation({
        mutationFn: deleteActivity,
        onError(error) {
            setToaster({
                type: "error",
                message: error.message
            })
        },
        onSuccess() {
            setToaster({
                type: "success",
                message: "success to delete activity"
            })
        }
    })

    const handleDeleteActivity = () => {
        return mutateDeleteActivity();
    }

    return {
        handleDeleteActivity,
        isPendingDeleteActivity,
        isSuccessDeleteActivity
    }
}

export default useDeleteActivity;