import ProductService from "@/services/product.service";
import { PAGE_DEFAULT } from "@/utils/interface";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useTabPria = () => {
    const router = useRouter();

    const currentPage = router.query.page;
    const currentCategory = router.query.id;

    const setUrl = () => {
        router.replace({
            pathname: '/products/category/[id]',
            query: {
                id: router.query.id,
                page: currentPage || PAGE_DEFAULT,
                target: "pria"
            }
        })
    }

    const getProductsByPriaByCategory = async () => {
        const params = `category=${router.query.id}&page=${router.query.page}&limit=20&target=${router.query.target}`;
        const {data} = await ProductService.findAll(`${params}`);
        return data;
    }

    const {data: dataProductsByPriaByCategory, isLoading: isLoadingProductsByPriaByCategory} = useQuery({
        queryKey: ["ProductPriaByCategory", currentPage, router.query.target, router.query.id],
        queryFn: getProductsByPriaByCategory,
        enabled: router.isReady && !!currentPage && !!router.query.id
    })

    const handlePage = (e:number) => {
        router.push({
            pathname: "/products/category/[id]",
            query: {
                id: router.query.id,
                page: e,
                target: "pria"
            }
        });
    }

    return {
        dataProductsByPriaByCategory,
        isLoadingProductsByPriaByCategory,

        setUrl,
        currentPage,
        handlePage
    }
}

export default useTabPria;