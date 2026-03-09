import instance from "@/libs/axios";
import { ICartForm } from "@/types/cart";
import endpoint from "./endpoint,constant";

const CartService = {
    create: (payload: ICartForm) => instance.post(`${endpoint.CART}`, payload),

    findAll: () => instance.get(`${endpoint.CART}`),

    findById: (id: string) => instance.get(`${endpoint.CART}/${id}`),

    plus: (id: string) => instance.put(`${endpoint.CART}/${id}/plus`),

    min: (id: string) => instance.put(`${endpoint.CART}/${id}/min`),

    delete: (id: string) => instance.delete(`${endpoint.CART}/${id}`),

    deleteAll: () => instance.delete(`/delete-all-carts`)
}

export default CartService;