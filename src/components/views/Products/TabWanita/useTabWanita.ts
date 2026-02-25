import ProductService from "@/services/product.service";
import { PAGE_DEFAULT } from "@/utils/interface";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useTabWanita = () => {
    const router = useRouter();

    const currentPage = router.query.page;
    const setUrl = () => {
        router.replace({
            query: {
                page: currentPage || PAGE_DEFAULT,
                target: "wanita"
            }
        })
    }

    const getProductsByWanita = async () => {
        const params = `page=${router.query.page}&limit=20&target=${router.query.target}`;
        const {data} = await ProductService.findAll(`${params}`);
        return data;
    }

    const {data: dataProductsByWanita, isLoading: isLoadingProductsByWanita} = useQuery({
        queryKey: ["ProductWanita", router.query.page, router.query.target],
        queryFn: getProductsByWanita,
        enabled: router.isReady && !!currentPage
    });

    const handlePage = (e:number) => {
        router.push({
            query: {
                page: e
            }
        });
    } 

    return {
        dataProductsByWanita,
        isLoadingProductsByWanita,

        setUrl,
        currentPage,
        handlePage
    }
}

export default useTabWanita;