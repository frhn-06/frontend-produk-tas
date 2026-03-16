import DashboardService from "@/services/dashboard.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useDashboard = () => {
    const router = useRouter();

    const getDashboardAdmin = async () => {
        const {data} = await DashboardService.getAdmin();
        return data;
    }

    const {data: dataDashboardAdmin, isLoading: isLoadingDashboardAdmin} = useQuery({
        queryKey: ["Dashboardadmin"],
        queryFn: getDashboardAdmin,
        enabled: router.isReady
    })

    return {
        dataDashboardAdmin,
        isLoadingDashboardAdmin
    }
} 

export default useDashboard;