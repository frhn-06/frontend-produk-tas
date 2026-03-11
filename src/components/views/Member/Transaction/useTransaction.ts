import useDebaunce from "@/hooks/debaunce";
import OrderService from "@/services/order.sercive";
import { LIMIT_DEFAULT, PAGE_DEFAULT } from "@/utils/interface";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { ChangeEvent } from "react";

const useTransaction = () => {
    const router = useRouter();

    const {debaunce} = useDebaunce();

    const currentPage = router.query.page;
    const currentLimit = router.query.limit;
    const currentStatusOrder = router.query.status;

    const setUrl = () => {
        router.replace({
            query: {
                page: currentPage || PAGE_DEFAULT,
                limit: currentLimit || LIMIT_DEFAULT,
                status: currentStatusOrder || ""
            }
        });
    }

    const getOrdersByUser = async () => {
        let params = `page=${router.query.page}&limit=${router.query.limit}`;
        if(currentStatusOrder) {
            params += `&status=${router.query.status}`;
        }
        const {data} = await OrderService.findByUser(params);
        return data;
    }

    const {data: dataOrdersByUser, isLoading: isLoadingOrdersByUser, refetch: refetchOrdersByUser, isRefetching: isRefetchingOrdersByUser, isSuccess: isSuccessOrdersByUser} = useQuery({
        queryKey: ["OrderByUser", currentPage, currentLimit, currentStatusOrder],
        queryFn: getOrdersByUser,
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

    const handleStatus = (e: ChangeEvent<HTMLSelectElement>) => {
        let payload = e.target.value;
        if(payload === "allstatus") {
            payload = ""
        }
        router.push({
            query: {
                ...router.query,
                status: payload,
                page: PAGE_DEFAULT
            }
        })
    }

    return {
        currentPage,
        currentLimit,
        currentStatusOrder,

        setUrl,

        dataOrdersByUser,
        isLoadingOrdersByUser,
        refetchOrdersByUser,
        isRefetchingOrdersByUser,
        isSuccessOrdersByUser,

        handleLimit,
        handlePagination,
        handleStatus
    }
}

export default useTransaction;