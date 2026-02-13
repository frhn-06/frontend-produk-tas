import CategoryService from "@/services/category.service";
import useDebaunce from "@/hooks/debaunce";
import { LIMIT_DEFAULT, PAGE_DEFAULT } from "@/utils/interface";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { ChangeEvent } from "react";
import ProductService from "@/services/product.service";

const useProduct = () => {
    const router = useRouter();

    const {debaunce} = useDebaunce();

    const currentPage = router.query.page;
    const currentLimit = router.query.limit;
    const currentSearch = router.query.search;
    const currentPublish = router.query.publish;
    const currentFeatured = router.query.featured;
    const currentDiscount = router.query.discount;
    const currentCategory = router.query.category;

    const setUrl = () => {
        router.replace({
            query: {
                page: currentPage || PAGE_DEFAULT,
                limit: currentLimit || LIMIT_DEFAULT,
                search: currentSearch || "",
                publish: currentPublish || "",
                featured: currentFeatured || "",
                discount: currentDiscount || "",
                category: currentCategory || ""
            }
        });
    }

    const getProducts = async () => {
        let params = `page=${router.query.page}&limit=${router.query.limit}`;
        if(currentSearch) {
            params += `&search=${router.query.search}`;
        }
        if(currentPublish) {
            params += `&search=${router.query.publish}`;
        }
        if(currentFeatured) {
            params += `&search=${router.query.featured}`;
        }
        if(currentDiscount) {
            params += `&search=${router.query.discount}`;
        }
        if(currentCategory) {
            params += `&search=${router.query.category}`;
        }
        const {data} = await ProductService.findAll(params);
        return data;
    }

    const {data: dataProducts, isLoading: isLoadingProducts, refetch: refetchProducts, isRefetching: isRefetchingProducts, isSuccess: isSuccessProducts} = useQuery({
        queryKey: ["Product", currentPage, currentLimit, currentSearch, currentPublish, currentFeatured, currentDiscount, currentCategory],
        queryFn: getProducts,
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

        dataProducts,
        isLoadingProducts,
        refetchProducts,
        isRefetchingProducts,
        isSuccessProducts,

        handleSearch,
        handleClearSearch,
        handleLimit,
        handlePagination,
    }
}

export default useProduct;