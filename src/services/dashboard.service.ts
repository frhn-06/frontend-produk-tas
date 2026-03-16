import instance from "@/libs/axios";
import endpoint from "./endpoint,constant";

const DashboardService = {
    getAdmin: () => instance.get(`/dashboard-admin`),

    getMember: () => instance.get(`/dashboard-member`)
}

export default DashboardService;