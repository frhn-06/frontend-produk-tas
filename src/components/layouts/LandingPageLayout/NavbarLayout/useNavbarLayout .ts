import ActivityService from "@/services/activity.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useNavbarLayout = () => {
     const router = useRouter();
    
        const getActivities = async() => {
    
            const {data} = await ActivityService.findAll();
            return data;
        }
    
        const {data:dataActivities, isLoading:isLoadingActivities } = useQuery({
            queryKey: ["ActivityNav"],
            queryFn: getActivities,
            enabled: router.isReady
        })
    
    
        return {
            dataActivities,
            isLoadingActivities
        }
    
}

export default useNavbarLayout;