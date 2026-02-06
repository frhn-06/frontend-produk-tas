import CategoryService from "@/services/category.service";
import useDebaunce from "@/hooks/debaunce";
import { LIMIT_DEFAULT, PAGE_DEFAULT } from "@/utils/interface";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { ChangeEvent } from "react";
import { param } from "framer-motion/client";

const useCategory = () => {
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
        });
    }

    const getCategories = async () => {
        let params = `page=${router.query.page}&limit=${router.query.limit}`;
        if(currentSearch) {
            params += `&search=${router.query.search}`;
        }
        const {data} = await CategoryService.findAll(params);
        return data;
    }

    const {data: dataCategories, isLoading: isLoadingCategories, refetch: refetchCategories, isRefetching: isRefetchingCategories, isSuccess: isSuccessCategories} = useQuery({
        queryKey: ["Category", currentPage, currentLimit, currentSearch],
        queryFn: getCategories,
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

        dataCategories,
        isLoadingCategories,
        refetchCategories,
        isRefetchingCategories,
        isSuccessCategories,

        handleSearch,
        handleClearSearch,
        handleLimit,
        handlePagination,
    }
}

export default useCategory;