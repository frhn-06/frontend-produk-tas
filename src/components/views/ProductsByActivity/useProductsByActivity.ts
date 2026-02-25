import ActivityService from "@/services/activity.service";
import BannerService from "@/services/banner.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";


const useProductsByActivity = () => {

    const router = useRouter();
   

    const getBanners = async () => {
        const {data} = await BannerService.findAll();
        return data;
    }

    const {data: dataBanners, isLoading: isLoadingBanners} = useQuery({
        queryKey: ["BannersInProduct"],
        queryFn: getBanners,
        enabled: true
    })
    

    const getActivityById = async () => {
        const {data} = await ActivityService.findById(`${router.query.id}`);
        return data;
    }

    const {data: dataActivity, isLoading: isLoadingActivity} = useQuery({
        queryKey: ["Activity"],
        queryFn: getActivityById,
        enabled: router.isReady
    })




    return {
        dataBanners,
        isLoadingBanners,

      
        dataActivity,
    }
}

export default useProductsByActivity;