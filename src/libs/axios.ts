import { environment } from "@/utils/environment";
import axios from "axios";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";


interface CustomSession extends Session {
    accessToken?: string
}

const headers = {
    "Content-Type": "application/json"
}

const instance = axios.create({
    baseURL: environment.API_URL,
    headers: headers,
    timeout: 60 * 1000
});



instance.interceptors.request.use(
    async (request) => {
        const session: CustomSession | null = await getSession();
        if(session && session.accessToken) {
            request.headers.Authorization = `Bearer ${session.accessToken}`;
        }
        return request;
    },
    (error) => Promise.reject(error)
);

instance.interceptors.response.use(
    (response) => response,
    (error) => {
        const errorResponse = error?.response;
        if(errorResponse?.data) {
            const customError = {
                message: errorResponse?.data?.meta?.message || "terjadi kesalahan di server",
                data: errorResponse?.data?.data || null,
                status: errorResponse?.status
            }
            
            return Promise.reject(customError);
        }

        return Promise.reject(error);
    }
);

export default instance;