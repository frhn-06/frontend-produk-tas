import useDebaunce from "@/hooks/debaunce";
import ProductService from "@/services/product.service";
import { LIMIT_DEFAULT, PAGE_DEFAULT } from "@/utils/interface";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router"
import { ChangeEvent } from "react";

const useProductDeleted = () => {

    const router = useRouter();

    const {debaunce} = useDebaunce();

    const currentPage = router.query.page;
    const currentLimit = router.query.limit;
    const currentSearch = router.query.search;

    const setUrl = () => {
        router.replace({
            query: {
                page: currentPage || PAGE_DEFAULT,
                limit: currentLimit || LIMIT_DEFAULT,
                search: currentSearch || ""
            }
        })
    }

    const getProductDeleted = async () => {
        let params = `page=${router.query.page}&limit=${router.query.limit}`;
        if(currentSearch) {
            params += `&search=${router.query.search}`;
        }
        const {data} = await ProductService.findDeleted(`${params}`);
        return data;
    }

    const {data: dataProductDeleted, isLoading: isLoadingProductDeleted, refetch: refetchProductDeleted, isRefetching: isRefetchingProductDeleted, isSuccess: isSuccessProductDeleted} = useQuery({
        queryKey: ["ProductDeleted", currentPage, currentLimit, currentSearch],
        queryFn: getProductDeleted,
        enabled: router.isReady && !!currentPage && !!currentLimit
    })



    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
            debaunce(() => {
                router.push({
                    query: {
                        ...router.query,
                        search: e.target.value,
                        page: PAGE_DEFAULT
                    }
                })
            }, 800)
        }
    
        const handleClearSearch = () => {
            router.push({
                query: {
                    ...router.query,
                    search: "",
                    page: PAGE_DEFAULT
                }
            })
        }
    
        const handleLimit = (e: ChangeEvent<HTMLSelectElement>) => {
            router.push({
                query: {
                    ...router.query,
                    limit: e.target.value,
                    page: PAGE_DEFAULT
                }
            })
        }
    
        const handlePagination = (e: number) => {
            router.push({
                query: {
                    ...router.query,
                    page: e
                }
            })
        }
    

    return {
        currentPage,
        currentLimit,
        currentSearch,

        setUrl,

        dataProductDeleted,
        isLoadingProductDeleted,
        refetchProductDeleted,
        isRefetchingProductDeleted,
        isSuccessProductDeleted,

        handleSearch,
        handleClearSearch,
        handleLimit,
        handlePagination
    }
}

export default useProductDeleted;