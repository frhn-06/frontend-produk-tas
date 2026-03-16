import DashboardService from "@/services/dashboard.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useDashboard = () => {
    const router = useRouter();
    
    const getDashboard = async() => {
        const {data} = await DashboardService.getMember();
        return data;
    }

    const {data: dataDashboardMember, isLoading: isLoadingDashboardMember} = useQuery({
        queryKey: ["DashboardMember"],
        queryFn: getDashboard,
        enabled: router.isReady
    })

    
    
    return {
        dataDashboardMember,
        isLoadingDashboardMember
    }
}

export default useDashboard;