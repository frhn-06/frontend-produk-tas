import { Controller } from "react-hook-form";
import useLogin from "./useLogin";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { Button, Input, Link, Spinner } from "@heroui/react";

const Login = () => {
    const {
        handleSubmitLogin,
        control,
        errorsLogin,
        
        isPendingMutateLogin,

        onLogin,

        merem,
        handleMerem
    } = useLogin()

    return (
        <div className="p-6 rounded-xl shadow-xl shadow-default w-full md:max-w-2/3 lg:w-1/2 border-default-300 flex flex-col gap-4 bg-white">
          <h1 className="font-bold text-3xl text-primary">
            Login
          </h1>
          <form className="flex flex-col gap-4" onSubmit={handleSubmitLogin(onLogin)}>
            <Controller name="identifier" control={control} render={({field}) => (
              <Input {...field} id="identifier" variant="bordered" label="Email" size="sm" isInvalid={!!errorsLogin?.identifier} errorMessage={errorsLogin?.identifier?.message} />
            )} />
            
            <Controller name="password" control={control} render={({field}) => (
              <Input {...field} type={merem ? "password" : "text"} variant="bordered" label="Password" size="sm" isInvalid={!!errorsLogin?.password} errorMessage={errorsLogin?.password?.message} endContent={(
                <div className="flex items-center justify-center m-auto cursor-pointer" onClick={() => handleMerem()}>
                  {merem ? <FaEyeSlash /> : <FaEye />}
                </div>
              )} />
            )} />
            
            <Button type="submit" color="primary" variant="solid" disabled={isPendingMutateLogin}>
              {isPendingMutateLogin ? <Spinner color="default" size="sm" /> : "Login"}
            </Button>
          </form>
          <p>
            Do you dont have account ? please <Link href="/auth/register" className="font-semibold text-shadow-primary">Register here</Link>
          </p>
        </div>
    )
}

export default Login;