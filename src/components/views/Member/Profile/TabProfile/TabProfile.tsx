import { IUser } from "@/types/auth";
import useTabProfile from "./useTabProfile";
import { useEffect, useState } from "react";
import {Image, Button, Card, CardBody, CardFooter, CardHeader, Input, Skeleton, Spinner, Avatar, Textarea, Alert } from "@heroui/react";
import { Controller } from "react-hook-form";
import InputFile from "@/components/ui/InputFile";
import { useRouter } from "next/router";
// import MapPicker from "@/components/ui/MapPicker";

interface TypeProps {
    data: IUser;
    isLoading: boolean;
    isRefetching: boolean;
    refetch: () => void;

    onUpdate: (e: IUser) => void;
    isSuccess: boolean;
    isPending: boolean;
}

const TabProfile = (props: TypeProps) => {
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
      handleSubmitProfile,
      setValueProfile,
      errors,
      getValuesProfile,

      handleUpoloadImage,
      isPendingUploadImage,
      handleDeleteImage,
      isPendingDeleteImage,

      srcProfile
    } = useTabProfile();

    const router = useRouter();


    useEffect(() => {
      if(data) {
        // setValueProfile("profilePicture", `${data?.profilePicture}`);
        setValueProfile("fullName", `${data?.fullName}`);
        setValueProfile("userName", `${data?.userName}`);
        setValueProfile("phone", `${data?.phone}`);
        setValueProfile("address", `${data?.address}`);
        setValueProfile("email", `${data?.email}`)
        // setValueProfile("fullName", `${data?.fullName}`);s
      }
    },[data])

    useEffect(() => {
      if(isSuccess) {
        refetch();
      }
    },[isSuccess]);

    return (
        <Card className="text-default-700">
          <form onSubmit={handleSubmitProfile(onUpdate)}>
            <CardHeader>
              <h1 className="text-lg font-bold">
                Profile Information
              </h1>
            </CardHeader>
            <CardBody className="gap-4">
              <div className="w-30 h-30 m-auto rounded-full overflow-hidden">
                <Skeleton isLoaded={!isLoading && !isRefetching} className="rounded-full">
                  <Avatar showFallback src={`${data?.profilePicture}`} className="w-30 h-30" />
                </Skeleton>
              </div>
              

              <Controller control={control} name="profilePicture" render={({field}) => (
                <InputFile
                 {...field}
                 name="Foto Profile"
                 inputIcon={typeof srcProfile === "string" ? srcProfile : ""}
                 onChange={field.onChange}
                 onUpload={handleUpoloadImage}
                 isPendingUpload={isPendingUploadImage}
                 isInvalid={!!errors.profilePicture}
                 errorMessage={errors?.profilePicture?.message}
                 isPendingSave={isPending}
                 onDelete={handleDeleteImage}
                 isPendingDelete={isPendingDeleteImage}
                 textInCell="Select photo"
               />
              )} />
              
              <Skeleton isLoaded={!isLoading && !isRefetching} className="rounded-2xl">
                <Controller control={control} name="fullName" render={({field}) => (
                  <Input {...field} label="Full Name" variant="bordered" placeholder="Full Name" defaultValue={data?.fullName} isInvalid={!!errors?.fullName} errorMessage={errors?.fullName?.message} />            
                )} />
              </Skeleton>
              <Skeleton isLoaded={!isLoading && !isRefetching} className="rounded-2xl">
                <Controller control={control} name="userName" render={({field}) => (
                  <Input {...field} label="User Name" variant="bordered" placeholder="User Name" defaultValue={data?.userName} isInvalid={!!errors?.userName} errorMessage={errors?.userName?.message} />
                )} />
              </Skeleton>
              <Skeleton isLoaded={!isLoading && !isRefetching} className="rounded-2xl">
                <Controller control={control} name="email" render={({field}) => (
                  <Input {...field} label="Email" placeholder="Email" defaultValue={data?.email} isInvalid={!!errors?.userName} errorMessage={errors?.userName?.message} disabled />
                )} />
              </Skeleton>
              <Skeleton isLoaded={!isLoading && !isRefetching} className="rounded-2xl">
                <Controller control={control} name="phone" render={({field}) => (
                  <Input {...field} label="Phone" variant="bordered" placeholder="Phone" defaultValue={data?.phone} isInvalid={!!errors?.phone} errorMessage={errors?.phone?.message} />
                )} />
              </Skeleton>
              <Skeleton isLoaded={!isLoading && !isRefetching} className="rounded-2xl">
                <Controller control={control} name="address" render={({field}) => (
                  <Textarea {...field} label="Address" variant="bordered" placeholder="Address" defaultValue={data?.address} isInvalid={!!errors?.address} errorMessage={errors?.address?.message} />
                )} />
              </Skeleton>

              {/* <Skeleton isLoaded={!isLoading && !isRefetching} className="rounded-2xl">
                <Controller control={control} name="coordinate" render={({field}) => (
                  <MapPicker {...field} />
                )} />
              </Skeleton> */}
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

export default TabProfile;