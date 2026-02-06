import instance from "@/libs/axios"
import endpoint from "./endpoint,constant"
import { ICategory } from "@/types/category";

const CategoryService = {
    create: (payload: ICategory) => instance.post(`${endpoint.CATEGORY}`, payload),
    
    findAll: (query: string) => instance.get(`${endpoint.CATEGORY}?${query}`),

    delete: (id: string) => instance.delete(`${endpoint.CATEGORY}/${id}/delete`),

    findById: (id: string) => instance.get(`${endpoint.CATEGORY}/${id}`),

    update: (id: string, payload: ICategory) => instance.put(`${endpoint.CATEGORY}/${id}`, payload)
}

export default CategoryService;