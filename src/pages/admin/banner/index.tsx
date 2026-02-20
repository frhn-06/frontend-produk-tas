"use client"

import DashboardLayout from "@/components/layouts/DashboardLayout"
import Banner from "@/components/views/Admin/Banner";

const PageAdminBanner = () => {
    return (
        <DashboardLayout type="admin" title="Admin | Banner" titleHead="Banner">
            <Banner />
        </DashboardLayout>
    )
}


export default PageAdminBanner;