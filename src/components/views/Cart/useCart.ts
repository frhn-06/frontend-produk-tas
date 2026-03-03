import CartService from "@/services/cart.service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const useCart = () => {
    const router = useRouter();
    const session = useSession();


    const getCarts = async() => {
        const {data} = await CartService.findAll();
        return data;
    }
    
    const {data:dataCarts, isLoading:isLoadingCarts, refetch: refetchDataCart , isRefetching:isRefetchingDataCarts} = useQuery({
        queryKey: ["CartsColumn"],
        queryFn: getCarts,
        enabled: router.isReady && session.status === "authenticated"
    });


    const plusCart = async(id: string) => {
        const {data} = await CartService.plus(id);
        return data.data;
    }

    const {mutate: mutatePlusCart, isPending: isPendingPlusCart, isSuccess:isSuccessPlusCart} = useMutation({
        mutationFn: (id: string) => plusCart(id),
    });

    const handlePlusCart = (id: string) => {
        return mutatePlusCart(id);
    }

    const MinCart = async(id: string) => {
        const {data} = await CartService.min(id);
        return data.data;
    }

    const {mutate: mutateMinCart, isPending: isPendingMinCart, isSuccess:isSuccessMinCart} = useMutation({
        mutationFn: (id: string) => MinCart(id),
    });

    const handleMinCart = (id: string) => {
        return mutateMinCart(id);
    }

    return {
        dataCarts,
        isLoadingCarts,
        refetchDataCart,
        isRefetchingDataCarts,

        handlePlusCart,
        isPendingPlusCart,
        isSuccessPlusCart,

        handleMinCart,
        isPendingMinCart,
        isSuccessMinCart
    }
    
}

export default useCart;