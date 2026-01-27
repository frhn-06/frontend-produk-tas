import { toasterContext } from "@/context/toasterContext";
import AuthService from "@/services/auth.service";
import { IRegister } from "@/types/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from 'yup';

const schemaRegister = yup.object({
    fullName: yup.string().required('please input full name'),
    userName: yup.string().required('please input user name'),
    email: yup.string().email().required('please input email'),
    password: yup.string().required('please input password'),
    confirmPassword: yup.string().oneOf([yup.ref("password"), ''], 'confirm password must same with password').required()
})

const useRegister = () => {

    const router = useRouter();

    const {setToaster} = useContext(toasterContext);

    const [merem, setMerem] = useState({
        password: true,
        confirmPassword: true
    })


    const handleMerem = (kunci : "password" | "confirmPassword") => {
        setMerem({
            ...merem,
            [kunci]: !merem[kunci]
        })
    }
    
    const createUser = async(payload: IRegister) => {
        const {data} = await AuthService.register(payload);
        return {data};
    }

    const {handleSubmit: handleSubmitRegister, control, formState: {errors: errorsRegister}, reset: resetRegister} = useForm({
        resolver: yupResolver(schemaRegister)
    })

    const {mutate: mutateCreateUser, isPending: isPendingCreateUser, isSuccess: isSuccessCreateUser} = useMutation({
        mutationFn: (payload: IRegister) => createUser(payload),
        onError(error) {
            setToaster({
                type: "error",
                message: error.message
            });
        },
        onSuccess() {
            setToaster({
                type: "success",
                message: "success register"
            });
            router.push('/auth/register/success');
            resetRegister();
        }
    })


    const onCreateUser = (payload: IRegister) => {
        mutateCreateUser(payload);
    }

    
    
    
    return {
        handleSubmitRegister,
        control,
        errorsRegister,
        
        isPendingCreateUser,
        isSuccessCreateUser,

        onCreateUser,

        merem,
        setMerem,
        handleMerem
    }
}

export default useRegister;