import toasterContext from "@/context/toasterContext";
import CartService from "@/services/cart.service";
import { ICartForm } from "@/types/cart";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useContext } from "react";

const useCart = () => {
    const router = useRouter();
    const session = useSession();

    const getCarts = async() => {
        const {data} = await CartService.findAll();
        return data;
    }
    
    const {data:dataCarts, isLoading:isLoadingCarts, refetch: refetchCarts, isRefetching: isRefetchingCarts } = useQuery({
        queryKey: ["Carts"],
        queryFn: getCarts,
        enabled: router.isReady && session.status === "authenticated"
    });

    const addToCart = async (payload: ICartForm) => {
        const {data} = await CartService.create(payload);
        return data
    }

    const {mutate: mutateAddToCart, isPending: isPendingAddToCart, isSuccess: isSuccessAddtoCart} = useMutation({
        mutationFn: (payload: ICartForm) => addToCart(payload),
        onError(error) {
           
        },
        onSuccess() {
            
        }
    });

    const handleAddToCart = (productId: string) => {
        const payload = {
            productId: productId
        };
        return mutateAddToCart(payload)
    }

    return {
        dataCarts,
        isLoadingCarts,
        refetchCarts,
        isRefetchingCarts,

        handleAddToCart,
        isPendingAddToCart,
        isSuccessAddtoCart
    }
}

export default useCart;