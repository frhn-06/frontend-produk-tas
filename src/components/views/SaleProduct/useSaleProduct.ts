import ProductService from "@/services/product.service";
import { LIMIT_DEFAULT, PAGE_DEFAULT } from "@/utils/interface";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useSaleProduct = () => {

    const router = useRouter();

    const currentPage =  router.query.page;
    const currentLimit = router.query.limit;

    const url = () => {
        router.replace({
            query: {
                page: currentPage || PAGE_DEFAULT,
                limit: currentLimit || LIMIT_DEFAULT
            }
        })
    }


    const getProducts = async () => {
        const params = `page=${currentPage}&limit=${currentLimit}&discount=true`;
        const {data} = await ProductService.findAll(params);
        return data;
    }

    const {data: dataSaleProducts, isLoading: isLoadingSaleProducts} = useQuery({
        queryKey: ["SaleProduct", currentPage, currentLimit],
        queryFn: getProducts,
        enabled: true
    })
    
    return {
        url, 
        currentLimit,
        currentPage,

        dataSaleProducts,
        isLoadingSaleProducts
    }
}

export default useSaleProduct;