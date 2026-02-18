import { LIMIT_DEFAULT, PAGE_DEFAULT } from "@/utils/interface";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { ChangeEvent } from "react";
import ActivityService from "@/services/activity.service";

const useActivity = () => {
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

    const getActivity = async () => {
        const params = `page=${router.query.page}&limit=${router.query.limit}`;
        const {data} = await ActivityService.findAll(params);
        return data;
    }

    const {data: dataActivities, isLoading: isLoadingActivities, refetch: refetchActivities, isRefetching: isRefetchingActivities, isSuccess: isSuccessActivities} = useQuery({
        queryKey: ["Activity", currentPage, currentLimit],
        queryFn: getActivity,
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

        dataActivities,
        isLoadingActivities,
        refetchActivities,
        isRefetchingActivities,
        isSuccessActivities,

        handleLimit,
        handlePagination,
    }
}

export default useActivity;