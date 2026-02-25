import ProductService from "@/services/product.service";
import { PAGE_DEFAULT } from "@/utils/interface";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useTabAnak = () => {
    const router = useRouter();

    const currentPage = router.query.page;
    const currentCategory = router.query.category;
    const setUrl = () => {
        router.replace({
            pathname: '/products/category/[id]',
            query: {
                id: router.query.id,
                page: currentPage || PAGE_DEFAULT,
                target: "anak"
            }
        })
    }

    const getProductsByAnakByCategory = async () => {
        const params = `category=${router.query.id}&page=${router.query.page}&limit=20&target=${router.query.target}`;
        const {data} = await ProductService.findAll(`${params}`);
        return data;
    }

    const {data: dataProductsByAnakByCategory, isLoading: isLoadingProductsByAnakByCategory} = useQuery({
        queryKey: ["ProductAnakByCategory", router.query.page, router.query.target, router.query.id],
        queryFn: getProductsByAnakByCategory,
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
        dataProductsByAnakByCategory,
        isLoadingProductsByAnakByCategory,

        setUrl,
        currentPage,
        handlePage
    }
}

export default useTabAnak;