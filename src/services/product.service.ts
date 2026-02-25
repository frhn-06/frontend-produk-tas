import instance from "@/libs/axios";
import { IProduct } from "@/types/product";
import endpoint from "./endpoint,constant";

const ProductService = {
    create: (payload: IProduct) => instance.post(`${endpoint.PRODUCT}`, payload),

    findAll: (query: string) => instance.get(`${endpoint.PRODUCT}?${query}`),

    findOneById: (id: string) => instance.get(`${endpoint.PRODUCT}/${id}`),

    findOneByٍSlug: (slug: string) => instance.get(`${endpoint.PRODUCT}/${slug}/slug`),

    update: (id:string, payload: IProduct) => instance.put(`${endpoint.PRODUCT}/${id}`, payload),

    delete: (id: string) => instance.put(`${endpoint.PRODUCT}/${id}/delete`),

    restore: (id: string) => instance.put(`${endpoint.PRODUCT}/${id}/restore`),

    deletePermanent: (id: string) => instance.delete(`${endpoint.PRODUCT}/${id}/delete-permanent`),

    findDeleted: (query: string) => instance.get(`/product-deleted?${query}`),
}

export default ProductService;