import instance from "@/libs/axios";
import { IBanner } from "@/types/banner";
import endpoint from "./endpoint,constant";

const BannerService = {
    create: (payload: IBanner) => instance.post(`${endpoint.BANNER}`, payload),

    findAll: (params?: string) => instance.get(`${endpoint.BANNER}?${params}`),
    
    findById: (id: string) => instance.get(`${endpoint.BANNER}/${id}`),

    update: (id:string, payload: IBanner) => instance.put(`${endpoint.BANNER}/${id}`, payload),

    delete: (id: string) => instance.delete(`${endpoint.BANNER}/${id}`)
}

export default BannerService;