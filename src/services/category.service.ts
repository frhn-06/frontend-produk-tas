import instance from "@/libs/axios"
import endpoint from "./endpoint,constant"
import { ICategory } from "@/types/category";

const CategoryService = {
    create: (payload: ICategory) => instance.post(`${endpoint.CATEGORY}`, payload),
    
    findAll: (query: string) => instance.get(`${endpoint.CATEGORY}?${query}`)
}

export default CategoryService;