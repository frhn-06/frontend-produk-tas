import instance from "@/libs/axios";
import { ILogin, IPassword, IRegister, IUser } from "@/types/auth";
import endpoint from "./endpoint,constant"; 

const AuthService = {
    register: (payload: IRegister) => instance.post(`${endpoint.AUTH}/register`, payload),

    activation: (payload: {code: string}) => instance.post(`${endpoint.AUTH}/activation`, payload),

    login: (payload: ILogin) => instance.post(`${endpoint.AUTH}/login`, payload),

    getProfileWithToken: (token: string) => instance.get(`${endpoint.AUTH}/me`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }),

    me: () => instance.get(`${endpoint.AUTH}/me`),

    getUserById: (id: string) => instance.get(`${endpoint.AUTH}/${id}/user`),

    updateProfile: (payload: IUser) => instance.put(`${endpoint.AUTH}/update-profile`, payload),

    updatePassword: (payload: IPassword) => instance.put(`${endpoint.AUTH}/update-password`, payload)
}

export default AuthService;