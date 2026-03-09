import { toasterContext } from "@/context/toasterContext";
import CartService from "@/services/cart.service";
import OrderService from "@/services/order.sercive";
import { IOrder } from "@/types/order";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useContext } from "react";

const useCartPage = () => {
    const router = useRouter();
    const session = useSession();

    const {setToaster} = useContext(toasterContext);


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


    const deleteOneCart = async (id: string) => {
        const {data} = await CartService.delete(id);
        return data;
    }

    const {mutate: mutateDeleteOneCart, isPending: isPendingDeleteOneCart, isSuccess: isSuccessDeleteOneCart} = useMutation({
        mutationFn: (id:string) => deleteOneCart(id),
        onError(error) {
            setToaster({
                type: "error",
                message: error.message
            })
        },
        onSuccess() {
            setToaster({
                type: "success",
                message: "success to delete cart"
            })
        }
    })

    const onDeleteOneCart = (id: string) => {
        return mutateDeleteOneCart(id);
    }

    const deleteAllCart = async () => {
        const {data} = await CartService.deleteAll();
        return data;
    }

    const {mutate: mutateDeleteAllCart, isPending: isPendingDeleteAllCart, isSuccess: isSuccessDeleteAllCart} = useMutation({
        mutationFn: deleteAllCart,
        onError(error) {
            setToaster({
                type: "error",
                message: error.message
            })
        },
        onSuccess() {
            setToaster({
                type: "success",
                message: "success to clear all cart"
            })
        }
    })

    const onDeleteAllCart = () => {
        return mutateDeleteAllCart();
    }


    const deleteall = async() => {
        const {data} = await CartService.deleteAll();
        return data;
    }

    const {mutate: mutateDeleteAll , isPending: isPendingDeleteAll, isSuccess: isSuccessDeleteAll} = useMutation({
        mutationFn: deleteall,
        onError(error) {
            setToaster({
                type: "error",
                message: error.message
            })
        },
    })

    const createOrder = async(payload: IOrder) => {
        const {data} = await OrderService.create(payload);
        return data.data;
    }

    const {mutate: mutateCreateOrder, isPending: isPendingCreateOrder} = useMutation({
        mutationFn: (p: IOrder) => createOrder(p),
        onError(error) {
            setToaster({
                type: "error",
                message: error.message
            })
        },
        onSuccess(result) {
            const token = result.payment.token;
            window.snap.pay(token);
            mutateDeleteAll();
        }
    })


    const onCreateOrder = (arr: IOrder) => {
        return mutateCreateOrder(arr)
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
        isSuccessMinCart,

        onDeleteOneCart,
        isPendingDeleteOneCart,
        isSuccessDeleteOneCart,

        onDeleteAllCart,
        isPendingDeleteAllCart,
        isSuccessDeleteAllCart,

        onCreateOrder,
        isPendingCreateOrder,

        isPendingDeleteAll,
        isSuccessDeleteAll
    }
    
}

export default useCartPage;