import ProductService from "@/services/product.service";
import { PAGE_DEFAULT } from "@/utils/interface";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useTabUnisex = () => {
    const router = useRouter();

    const currentPage = router.query.page;
    const setUrl = () => {
        router.replace({
            query: {
                page: currentPage || PAGE_DEFAULT,
                target: "unisex"
            }
        })
    }

    const getProductsByUnisex = async () => {
        const params = `page=${router.query.page}&limit=20&target=${router.query.target}`;
        const {data} = await ProductService.findAll(`${params}`);
        return data;
    }

    const {data: dataProductsByUnisex, isLoading: isLoadingProductsByUnisex} = useQuery({
        queryKey: ["ProductUnisex", router.query.page, router.query.target],
        queryFn: getProductsByUnisex,
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
        dataProductsByUnisex,
        isLoadingProductsByUnisex,

        setUrl,
        currentPage,
        handlePage
    }
}

export default useTabUnisex;