import BannerService from "@/services/banner.service";
import CategoryService from "@/services/category.service";
import ProductService from "@/services/product.service";
import { useQuery } from "@tanstack/react-query";
import { param } from "framer-motion/client";
import { useRouter } from "next/router";

const useHome = () => {
    const router = useRouter();

    const getBanners = async () => {
        const {data} = await BannerService.findAll();
        return data;   
    }

    const {data:dataBanners, isLoading:isLoadingBanners} = useQuery({
        queryKey: ["Banner"],
        queryFn: getBanners,
        enabled: true
    })


    const getCategories = async () => {
        const {data} = await CategoryService.findAll();
        return data;   
    }

    const {data:dataCategories, isLoading:isLoadingCategories} = useQuery({
        queryKey: ["Category"],
        queryFn: getCategories,
        enabled: true
    })

    const getNewProducts = async () => {
        const params = 'limit=4';
        const {data} = await ProductService.findAll(params);
        return data;   
    }

    const {data:dataNewProducts, isLoading:isLoadingNewProducts} = useQuery({
        queryKey: ["NewProducts"],
        queryFn: getNewProducts,
        enabled: true
    })


    

    return {
        dataBanners,
        isLoadingBanners,

        dataCategories,
        isLoadingCategories,

        dataNewProducts,
        isLoadingNewProducts
    }
}

export default useHome;