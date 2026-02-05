import AuthService from "@/services/auth.service"
import { useQuery } from "@tanstack/react-query"
import { useSession } from "next-auth/react"

const useDashboard = () => {
    const session = useSession();

    const getMe = async () => {
        const {data} = await AuthService.me();
        return data;
    }

    const {data: dataUser, isLoading} = useQuery({
        queryKey: ["User"],
        queryFn: getMe,
        enabled: session.status === "authenticated"
    });

    return {
        dataUser,
        isLoading
    }

}
export default useDashboard