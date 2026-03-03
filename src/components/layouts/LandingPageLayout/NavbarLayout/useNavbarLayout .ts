import ActivityService from "@/services/activity.service";
import CartService from "@/services/cart.service";
import { ICart } from "@/types/cart";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const useNavbarLayout = () => {
     const router = useRouter();

    const session = useSession();


    const getActivities = async() => {
    
        const {data} = await ActivityService.findAll();
        return data;
    }
    
    const {data:dataActivities, isLoading:isLoadingActivities } = useQuery({
        queryKey: ["ActivityNav"],
        queryFn: getActivities,
        enabled: router.isReady
    });





    return {
        dataActivities,
        isLoadingActivities,
    
    }
    
}

export default useNavbarLayout;