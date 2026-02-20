import { LIMIT_DEFAULT, PAGE_DEFAULT } from "@/utils/interface";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { ChangeEvent } from "react";
import BannerService from "@/services/banner.service";

const useBanner = () => {
    const router = useRouter();

    const currentPage = router.query.page;
    const currentLimit = router.query.limit;

    const setUrl = () => {
        router.replace({
            query: {
                page: currentPage || PAGE_DEFAULT,
                limit: currentLimit || LIMIT_DEFAULT,
            }
        });
    }

    const getBanners = async () => {
        const params = `page=${router.query.page}&limit=${router.query.limit}`;
        const {data} = await BannerService.findAll(params);
        return data;
    }

    const {data: dataBanners, isLoading: isLoadingBanners, refetch: refetchBanners, isRefetching: isRefetchingBanners, isSuccess: isSuccessBanners} = useQuery({
        queryKey: ["Banner", currentPage, currentLimit],
        queryFn: getBanners,
        enabled: router.isReady && !!currentPage && !!currentLimit
    })


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

        setUrl,

        dataBanners,
        isLoadingBanners,
        refetchBanners,
        isRefetchingBanners,
        isSuccessBanners,

        handleLimit,
        handlePagination,
    }
}

export default useBanner;