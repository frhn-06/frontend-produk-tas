"use client"

import DashboardLayout from "@/components/layouts/DashboardLayout"
import Activity from "@/components/views/Admin/Activity";

const PageAdminActivity = () => {
    return (
        <DashboardLayout type="admin" title="admin | activity" titleHead="Activity">
            <Activity />
        </DashboardLayout>
    )
}


export default PageAdminActivity;