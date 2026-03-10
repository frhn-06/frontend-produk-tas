import AuthService from "@/services/auth.service";
import OrderService from "@/services/order.sercive";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useDetailTransaction = () => {
    const router = useRouter()
    
    const getOrderById = async() => {
        const {data} = await OrderService.findById(`${router.query.id}`);
        return data;
    }

    const {data: dataOrder, isLoading: isLoadingOrder, } = useQuery({
        queryKey: ["OrderById"],
        queryFn: getOrderById,
        enabled: router.isReady
    })

    const getUser = async() => {
        const {data} = await AuthService.getUserById(dataOrder?.data?.userId);
        return data;
    }

    const {data: dataUser, isLoading: isLoadingUser, } = useQuery({
        queryKey: ["UserById"],
        queryFn: getUser,
        enabled: router.isReady && !!dataOrder?.data?.userId
    })

    return {
        dataUser,
        isLoadingUser,

        dataOrder,
        isLoadingOrder
    }
}   

export default useDetailTransaction;