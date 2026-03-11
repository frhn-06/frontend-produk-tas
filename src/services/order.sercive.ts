import instance from "@/libs/axios";
import { IOrder } from "@/types/order";
import endpoint from "./endpoint,constant";

const OrderService = {
    create: (payload: IOrder) => instance.post(`${endpoint.ORDERS}`, payload),

    findAll: (params: string) => instance.get(`${endpoint.ORDERS}?${params}`),

    findByUser: (params: string) => instance.get(`/my-orders?${params}`),

    findById: (id: string) => instance.get(`${endpoint.ORDERS}/${id}`),
}

export default OrderService;