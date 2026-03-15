import { toasterContext } from "@/context/toasterContext";
import AuthService from "@/services/auth.service";
import { IPassword, IUser } from "@/types/auth";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useContext } from "react";

const useProfile = () => {
    const {setToaster} = useContext(toasterContext);

    const getMe = async() => {
        const {data} = await AuthService.me();
        return data;
    }

    const {data:dataMe, isLoading:isLoadingDataMe, refetch: refetchDataMe, isRefetching: isRefetchingDataMe} = useQuery({
        queryKey: ["UserProfile"],
        queryFn: getMe,
        enabled: true
    });


    const updateProfile = async (payload: IUser) => {
        const {data} = await AuthService.updateProfile(payload);
        return data;
    }


    const {mutate: mutateUpdateProfile, isPending:isPendingUpdateProfile, isSuccess: isSuccessUpdateProfile} = useMutation({
        mutationFn: (payload: IUser) => updateProfile(payload),
        onError(error) {
            setToaster({
                type: "error",
                message: error.message
            })
        },
        onSuccess() {
            setToaster({
                type: "success",
                message: "success to update profile"
            });
        }
    })

    const handleUpdateProfile = (payload: IUser) => {
        return mutateUpdateProfile(payload);
    }

    const updatePassword = async (payload: IPassword) => {
        const {data} = await AuthService.updatePassword(payload);
        return data;
    }

    const {mutate: mutateUpdatePassword, isPending:isPendingUpdatePassword, isSuccess: isSuccessUpdatePassword} = useMutation({
        mutationFn: (payload: IPassword) => updatePassword(payload),
        onError(error) {
            setToaster({
                type: "error",
                message: error.message
            })
        },
        onSuccess() {
            setToaster({
                type: "success",
                message: "success to update password"
            });
        }
    })

    const handleUpdatePassword = (payload: IPassword) => {
        return mutateUpdatePassword(payload);
    }

    return {
        dataMe,
        isLoadingDataMe,
        refetchDataMe,
        isRefetchingDataMe,

        handleUpdateProfile,
        isPendingUpdateProfile,
        isSuccessUpdateProfile,

        handleUpdatePassword,
        isPendingUpdatePassword,
        isSuccessUpdatePassword
    }
}

export default useProfile;


