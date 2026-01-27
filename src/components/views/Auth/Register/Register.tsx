import { Button, Input, Link, Spinner } from "@heroui/react"
import useRegister from "./useRegister"
import { Controller} from "react-hook-form";
import { FaEyeSlash } from "react-icons/fa6";
import { FaEye } from "react-icons/fa6";
import { useEffect } from "react";
import { useRouter } from "next/router";


const Register = () => {
    const {
        handleSubmitRegister,
        control,
        errorsRegister,
        
        isPendingCreateUser,
        isSuccessCreateUser,

        onCreateUser,

        merem,
        setMerem,
        handleMerem
    } = useRegister();

    const router = useRouter();


  
    return(
        <div className="p-6 rounded-xl shadow-xl shadow-default w-full lg:w-1/2 border-default-300 flex flex-col gap-4 bg-white">
          <h1 className="font-bold text-3xl text-primary">
            Register
          </h1>
          <form className="flex flex-col gap-4" onSubmit={handleSubmitRegister(onCreateUser)}>
            <Controller name="email" control={control} render={({field}) => (
              <Input {...field} type="email" id="fullname" variant="bordered" label="Email" size="sm" isInvalid={!!errorsRegister?.email} errorMessage={errorsRegister?.email?.message} />
            )} />
            <Controller name="fullName" control={control} render={({field}) => (
              <Input {...field} variant="bordered" label="Full Name" size="sm" isInvalid={!!errorsRegister?.fullName} errorMessage={errorsRegister?.fullName?.message} />
            )} />
            <Controller name="userName" control={control} render={({field}) => (
              <Input {...field} variant="bordered" label="User Name" size="sm" isInvalid={!!errorsRegister?.userName} errorMessage={errorsRegister?.userName?.message} />
            )} />
            <Controller name="password" control={control} render={({field}) => (
              <Input {...field} type={merem.password ? "password" : "text"} variant="bordered" label="Password" size="sm" isInvalid={!!errorsRegister?.password} errorMessage={errorsRegister?.password?.message} endContent={(
                <div className="flex items-center justify-center m-auto cursor-pointer" onClick={() => handleMerem(field.name)}>
                  {merem.password ? <FaEyeSlash /> : <FaEye />}
                </div>
              )} />
            )} />
            <Controller name="confirmPassword" control={control} render={({field}) => (
              <Input {...field} type={merem.confirmPassword ? "password" : "text"} variant="bordered" label="Confirm Password" size="sm" isInvalid={!!errorsRegister?.confirmPassword} errorMessage={errorsRegister?.confirmPassword?.message} endContent={(
                <div className="flex items-center justify-center m-auto cursor-pointer" onClick={() => handleMerem(field.name)} >
                  {merem.confirmPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              )} />
            )} />
            <Button type="submit" color="primary" variant="solid" disabled={isPendingCreateUser}>
              {isPendingCreateUser ? <Spinner color="default" size="sm" /> : "Register"}
            </Button>
          </form>
          <p>
            Do you have an account ? please <Link href="/auth/login" className="text-primary font-bold">SignIn here</Link>
          </p>
        </div>
        
    )
}

export default Register