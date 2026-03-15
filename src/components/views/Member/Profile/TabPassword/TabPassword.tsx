import { IPassword, IUser } from "@/types/auth";
import { useEffect, useState } from "react";
import { Button, Card, CardBody, CardFooter, CardHeader, Input, Skeleton, Spinner } from "@heroui/react";
import { Controller } from "react-hook-form";
import { useRouter } from "next/router";
import useTabPassword from "./useTabPassword";
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";

interface TypeProps {
    data: IUser;
    isLoading: boolean;
    isRefetching: boolean;
    refetch: () => void;

    onUpdate: (e: IPassword) => void;
    isSuccess: boolean;
    isPending: boolean;
}

const TabPassword = (props: TypeProps) => {
    const {
      data,
      isLoading,
      isRefetching,

      onUpdate,
      isPending,
      isSuccess,

      refetch
    } = props;

    const {
      control,
      handleSubmitPassword,
      errors,

      hidePassword,
      handleHidePassword
    } = useTabPassword();



    useEffect(() => {
      if(isSuccess) {
        refetch();
      }
    },[isSuccess]);

    return (
        <Card className="text-default-700">
          <form onSubmit={handleSubmitPassword(onUpdate)}>
            <CardHeader>
              <h1 className="text-lg font-bold">
                Profile Security
              </h1>
            </CardHeader>
            <CardBody className="gap-4">
              
              <Skeleton isLoaded={!isLoading && !isRefetching} className="rounded-2xl">
                <Controller control={control} name="oldPassword" render={({field}) => (
                  <Input {...field} type={!hidePassword.oldPassword ? "password" : "text"} label="Password Now" variant="bordered" placeholder="Password" isInvalid={!!errors?.oldPassword} errorMessage={errors?.oldPassword?.message} endContent={(
                    <div className="h-full flex items-center " onClick={() => handleHidePassword("oldPassword")}>
                      {hidePassword.oldPassword ? <IoMdEyeOff /> : <IoEye />}
                    </div>
                  )} />            
                )} />
              </Skeleton>
              <Skeleton isLoaded={!isLoading && !isRefetching} className="rounded-2xl">
                <Controller control={control} name="password" render={({field}) => (
                  <Input {...field} type={!hidePassword.password ? "password" : "text"} label="New Password" variant="bordered" placeholder="New Password" isInvalid={!!errors?.password} errorMessage={errors?.password?.message} endContent={(
                    <div className="h-full flex items-center " onClick={() => handleHidePassword("password")}>
                      {hidePassword.password ? <IoMdEyeOff /> : <IoEye />}
                    </div>
                  )} />
                )} />
              </Skeleton>
              <Skeleton isLoaded={!isLoading && !isRefetching} className="rounded-2xl">
                <Controller control={control} name="confirmPassword" render={({field}) => (
                  <Input {...field} type={!hidePassword.confirmPassword ? "password" : "text"} label="Confirm Password" variant="bordered" placeholder="Confiirm Password" isInvalid={!!errors?.confirmPassword} errorMessage={errors?.confirmPassword?.message} endContent={(
                    <div className="h-full flex items-center " onClick={() => handleHidePassword("confirmPassword")}>
                      {hidePassword.confirmPassword ? <IoMdEyeOff /> : <IoEye />}
                    </div>
                  )} />
                )} />
              </Skeleton>
            </CardBody>
            <CardFooter>
              <Button type="submit" color="primary" className="ml-auto" disabled={!data || isPending}>
                {isPending ? <Spinner color="default" size="sm" /> : "Update"}
              </Button>
            </CardFooter>
          </form>
        </Card>
    )
}

export default TabPassword;