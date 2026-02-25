import ActivityService from "@/services/activity.service";
import BannerService from "@/services/banner.service";
import CategoryService from "@/services/category.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import Product from "../Admin/Product";
import ProductService from "@/services/product.service";
import { LIMIT_DEFAULT, PAGE_DEFAULT } from "@/utils/interface";

const useProducts = () => {

    const router = useRouter();

    const currentPage = router.query.page;
    const currentCategory = router.query.category;

    const setUrl = () => {
        router.replace({
            query: {
                page: currentPage || PAGE_DEFAULT,
            }
        })
    }

   

    const getBanners = async () => {
        const {data} = await BannerService.findAll();
        return data;
    }

    const {data: dataBanners, isLoading: isLoadingBanners} = useQuery({
        queryKey: ["BannersInProduct"],
        queryFn: getBanners,
        enabled: true
    })
    
    const getProductsByPria = async () => {
        const params = `page=${router.query.page}&limit=20&target=pria`;
        const {data} = await ProductService.findAll(`${params}`);
        return data;
    }

    const {data: dataProductsByPria, isLoading: isLoadingProductsBypria} = useQuery({
        queryKey: ["ProductPria"],
        queryFn: getProductsByPria,
        enabled: true
    })




    return {
        dataBanners,
        isLoadingBanners,

        dataProductsByPria,
        isLoadingProductsBypria
    }
}

export default useProducts;