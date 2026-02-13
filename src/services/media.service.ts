import instance from "@/libs/axios";
import endpoint from "./endpoint,constant";
import { IFileUrl } from "@/types/media";


const MediaServices = {
    upload: (payload: FormData) => instance.post(`${endpoint.MEDIA}/upload-single`, payload, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    }),

    uploadBuanyak: (payload: FormData) => instance.post(`${endpoint.MEDIA}/upload-multiple`, payload, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    }),

    delete: (payload: IFileUrl) => instance.delete(`${endpoint.MEDIA}/remove`, {data: payload})
}

export {MediaServices};