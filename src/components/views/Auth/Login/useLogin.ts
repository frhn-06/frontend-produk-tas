import { toasterContext } from "@/context/toasterContext";
import { ILogin } from "@/types/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from 'yup';

const schemaLogin = yup.object({
    identifier: yup.string().required('please input youremail / username'),
    password: yup.string().required('please input password'),
})

const useLogin = () => {

    const router = useRouter();

    const {setToaster} = useContext(toasterContext);

    const [merem, setMerem] = useState(true)

    const handleMerem = () => {
        setMerem(!merem)
    }

    const callbackUrl : string = (router.query.callbackUrl as string) || "/"
    
    const Login = async(payload: ILogin) => {
        const result = await signIn("credentials", {
            ...payload,
            redirect: false,
            callbackUrl: callbackUrl
        });

        if(result?.error && result.status === 401) {
            throw new Error("email or user name not match your password");
        }
    }

    const {handleSubmit: handleSubmitLogin, control, formState: {errors: errorsLogin}, reset: resetLogin, setError} = useForm({
        resolver: yupResolver(schemaLogin)
    })

    const {mutate: mutateLogin, isPending: isPendingMutateLogin} = useMutation({
        mutationFn: (payload: ILogin) => Login(payload),
        onError(error) {
            setError("root", {
                type: "server",
                message: error.message
            })
            setToaster({
                type: "error",
                message: error.message
            });
        },
        onSuccess() {
            setToaster({
                type: "success",
                message: "success login"
            });
            router.push(callbackUrl);
            resetLogin();
        }
    })


    const onLogin = (payload: ILogin) => {
        mutateLogin(payload);
    }

    
    
    
    return {
        handleSubmitLogin,
        control,
        errorsLogin,
        
        isPendingMutateLogin,

        onLogin,

        merem,
        handleMerem
    }
}

export default useLogin;