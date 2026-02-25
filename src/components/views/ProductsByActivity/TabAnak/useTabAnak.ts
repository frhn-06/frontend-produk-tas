import ProductService from "@/services/product.service";
import { PAGE_DEFAULT } from "@/utils/interface";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useTabAnak = () => {
    const router = useRouter();

    const currentPage = router.query.page;

    const setUrl = () => {
        router.replace({
            pathname: '/products/activity/[id]',
            query: {
                id: router.query.id,
                page: currentPage || PAGE_DEFAULT,
                target: "anak"
            }
        })
    }

    const getProductsByAnakByActivity = async () => {
        const params = `activity=${router.query.id}&page=${router.query.page}&limit=20&target=${router.query.target}`;
        const {data} = await ProductService.findAll(`${params}`);
        return data;
    }

    const {data: dataProductsByAnakByActivity, isLoading: isLoadingProductsByAnakByActivity} = useQuery({
        queryKey: ["ProductAnakByActivity", currentPage, router.query.target, router.query.id],
        queryFn: getProductsByAnakByActivity,
        enabled: router.isReady && !!currentPage && !!router.query.id
    })

    const handlePage = (e:number) => {
        router.push({
            pathname: "/products/activity/[id]",
            query: {
                id: router.query.id,
                page: e,
                target: "anak"
            }
        });
    }

    return {
        dataProductsByAnakByActivity,
        isLoadingProductsByAnakByActivity,

        setUrl,
        currentPage,
        handlePage
    }
}

export default useTabAnak;