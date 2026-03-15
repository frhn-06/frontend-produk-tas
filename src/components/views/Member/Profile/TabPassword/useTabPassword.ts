import useMediaHandler from '@/hooks/mediaHandler';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const schemaPassword = yup.object({
    oldPassword: yup.string().required('please input your password now'),
    password: yup.string().required('please input new password'),
    confirmPassword: yup.string().required('please input confirm password')    
})


const useTabPassword = () => {


    const {control, handleSubmit: handleSubmitPassword, formState: {errors}, setValue: setValuePassword, watch, getValues: getValuesPassword} = useForm({
        resolver: yupResolver(schemaPassword)
    })

    const [hidePassword, setHidePassword] = useState({
        oldPassword: false,
        password: false,
        confirmPassword: false
    })

    const handleHidePassword = (p: "oldPassword" | "password" | "confirmPassword") => {
        setHidePassword({
            ...hidePassword,
            [p] : !hidePassword[p] 
        })
    }


    return {
        control,
        handleSubmitPassword,
        errors,
        getValuesPassword,
        setValuePassword,

        hidePassword,
        handleHidePassword
    }
}

export default useTabPassword;