import BannerService from "@/services/banner.service";
import CategoryService from "@/services/category.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";


const useProductsByCategory = () => {

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
    

    const getCategoryById = async () => {
        const {data} = await CategoryService.findById(`${router.query.id}`);
        return data;
    }

    const {data: dataCategory, isLoading: isLoadingCategory} = useQuery({
        queryKey: ["Category"],
        queryFn: getCategoryById,
        enabled: router.isReady
    })




    return {
        dataBanners,
        isLoadingBanners,

      
        dataCategory,
    }
}

export default useProductsByCategory;