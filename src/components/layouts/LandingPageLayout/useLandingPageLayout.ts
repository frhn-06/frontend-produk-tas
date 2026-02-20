import AuthService from "@/services/auth.service";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";


const useLandingPageLayout = () => {
    const router = useRouter();
    const session = useSession();

    const getProfil = async() => {
        const {data} = await AuthService.me();
        return data;
    }
    const {data: dataUser, isLoading: isLoadingUser} = useQuery({
        queryKey: ["me"],
        queryFn: getProfil,
        enabled: router.isReady && session.status === "authenticated"
    })

    return {
        dataUser,
        isLoadingUser
    }
}

export default useLandingPageLayout;