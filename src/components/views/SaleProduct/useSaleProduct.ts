import ProductService from "@/services/product.service";
import { LIMIT_DEFAULT, PAGE_DEFAULT } from "@/utils/interface";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useSaleProduct = () => {

    const router = useRouter();

    const currentPage =  router.query.page;

    const url = () => {
        router.replace({
            query: {
                page: currentPage || PAGE_DEFAULT,
            }
        })
    }


    const getProducts = async () => {
        const params = `page=${currentPage}&discount=true`;
        const {data} = await ProductService.findAll(params);
        return data;
    }

    const {data: dataSaleProducts, isLoading: isLoadingSaleProducts} = useQuery({
        queryKey: ["SaleProduct", currentPage],
        queryFn: getProducts,
        enabled: true
    });


    const handlePage = (e:number) => {
        router.push({
            query: {
                ...router.query,
                page: e
            }
        })
    }
    
    return {
        url, 
        currentPage,
        handlePage,

        dataSaleProducts,
        isLoadingSaleProducts
    }
}

export default useSaleProduct;