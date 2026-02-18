import instance from "@/libs/axios";
import { IActivity } from "@/types/activity";
import endpoint from "./endpoint,constant";

const ActivityService = {
    create: (payload: IActivity) => instance.post(`${endpoint.ACTIVITY}`, payload),

    findAll: (params?: string) => instance.get(`${endpoint.ACTIVITY}?${params}`),
    
    findById: (id: string) => instance.get(`${endpoint.ACTIVITY}/${id}`),

    update: (id:string, payload: IActivity) => instance.put(`${endpoint.ACTIVITY}/${id}`, payload),

    delete: (id: string) => instance.delete(`${endpoint.ACTIVITY}/${id}`)
}

export default ActivityService;