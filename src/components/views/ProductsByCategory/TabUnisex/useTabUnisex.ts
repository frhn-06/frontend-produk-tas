import ProductService from "@/services/product.service";
import { PAGE_DEFAULT } from "@/utils/interface";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useTabUnisex = () => {
    const router = useRouter();

    const currentPage = router.query.page;
    const currentCategory = router.query.category;
    const setUrl = () => {
        router.replace({
            pathname: '/products/category/[id]',
            query: {
                id: router.query.id,
                page: currentPage || PAGE_DEFAULT,
                target: "unisex"
            }
        })
    }

    const getProductsByUnisexByCategory = async () => {
        const params = `category=${router.query.id}&page=${router.query.page}&limit=20&target=${router.query.target}`;
        const {data} = await ProductService.findAll(`${params}`);
        return data;
    }

    const {data: dataProductsByUnisexByCategory, isLoading: isLoadingProductsByUnisexByCategory} = useQuery({
        queryKey: ["ProductUnisexByCategory", router.query.page, router.query.target, router.query.id],
        queryFn: getProductsByUnisexByCategory,
        enabled: router.isReady && !!currentPage && !!router.query.id
    })


    const handlePage = (e:number) => {
        router.push({
            query: {
                page: e
            }
        });
    }

    return {
        dataProductsByUnisexByCategory,
        isLoadingProductsByUnisexByCategory,

        setUrl,
        currentPage,
        handlePage
    }
}

export default useTabUnisex;