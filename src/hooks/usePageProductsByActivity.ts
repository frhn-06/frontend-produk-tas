import ActivityService from "@/services/activity.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router"

const usePageProductsByActivity = () => {
    const router = useRouter();
    const getActivity = async () => {
        const {data} = await ActivityService.findById(`${router.query.id}`);
        return data;
    }

    const {data: dataActivity} = useQuery({
        queryKey: ["PageActivity"],
        queryFn: getActivity,
        enabled: !!router.query.id && router.isReady
    })

    return {
        dataActivity
    }
}

export default usePageProductsByActivity;