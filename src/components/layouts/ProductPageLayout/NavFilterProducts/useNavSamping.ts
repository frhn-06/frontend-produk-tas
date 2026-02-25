import ActivityService from "@/services/activity.service";
import CategoryService from "@/services/category.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useNavSamping = () => {
    const router = useRouter();
    
     const getCategories = async () => {
        const {data} = await CategoryService.findAll();
        return data;
    }

    const {data: dataCategories, isLoading: isLoadingCategories} = useQuery({
        queryKey: ["CategoriesNav"],
        queryFn: getCategories,
        enabled: router.isReady
    })

    const getActivities = async () => {
        const {data} = await ActivityService.findAll();
        return data;
    }

    const {data: dataActivities, isLoading: isLoadingActivities} = useQuery({
        queryKey: ["ActivitiesNav"],
        queryFn: getActivities,
        enabled: router.isReady
    })
    
    return {
        dataCategories, 
        isLoadingCategories,

        dataActivities,
        isLoadingActivities,

    }

}

export default useNavSamping;