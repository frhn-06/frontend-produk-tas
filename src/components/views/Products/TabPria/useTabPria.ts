import ProductService from "@/services/product.service";
import { PAGE_DEFAULT } from "@/utils/interface";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useTabPria = () => {
    const router = useRouter();

    const currentPage = router.query.page;
    const currentCategory = router.query.category;
    

    const setUrl = () => {
        router.replace({
            query: {
                page: currentPage || PAGE_DEFAULT,
                target: "pria"
            }
        });
        if(currentCategory) {
            router.replace({
                
            })
        }
    }

    const getProductsByPria = async () => {
        const params = `page=${router.query.page}&limit=20&target=${router.query.target}`;
        const {data} = await ProductService.findAll(`${params}`);
        return data;
    }

    const {data: dataProductsByPria, isLoading: isLoadingProductsByPria} = useQuery({
        queryKey: ["ProductPria", router.query.page, router.query.target],
        queryFn: getProductsByPria,
        enabled: router.isReady && !!currentPage
    })

    const handlePage = (e:number) => {
        router.push({
            query: {
                page: e
            }
        });
    }

    return {
        dataProductsByPria,
        isLoadingProductsByPria,

        setUrl,
        currentPage,
        handlePage
    }
}

export default useTabPria;