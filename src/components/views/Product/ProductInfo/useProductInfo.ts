import { toasterContext } from "@/context/toasterContext"
import OrderService from "@/services/order.sercive"
import { IOrder } from "@/types/order"
import { useMutation } from "@tanstack/react-query"
import { useContext } from "react"

const useProductInfo = () => {
    const {setToaster} = useContext(toasterContext);


    const createOrder = async (payload: IOrder) => {
        const {data} = await OrderService.create(payload);
        return data.data;
    }

    const {mutate: mutateCreateOrder, isPending: isPendingCreateOrder} = useMutation({
        mutationFn: (payload: IOrder) => createOrder(payload),
        onError(error) {
            setToaster({
                type: "error",
                message: error.message
            })
        },
        onSuccess(result) {
            const transactionToken = result.payment.token;
            window.snap.pay(transactionToken);
        }
    })

    const onCreateOrder = (payload: IOrder) => {
        return mutateCreateOrder(payload);
    }

    return {
        onCreateOrder,
        isPendingCreateOrder
    }
}

export default useProductInfo;