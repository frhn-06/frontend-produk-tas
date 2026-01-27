import instance from "@/libs/axios";
import { ILogin, IRegister } from "@/types/auth";
import endpoint from "./endpoint,constant"; 

const AuthService = {
    register: (payload: IRegister) => instance.post(`${endpoint.AUTH}/register`, payload),

    activation: (payload: {code: string}) => instance.post(`${endpoint.AUTH}/activation`, payload),

    login: (payload: ILogin) => instance.post(`${endpoint.AUTH}/login`, payload),

    me: (token: string) => instance.get(`${endpoint.AUTH}/me`, {
        headers: {
            Authorization: 'Bearer ' + token
        }
    })
}

export default AuthService;