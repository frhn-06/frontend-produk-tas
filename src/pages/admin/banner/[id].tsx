"use client"

import DashboardLayout from "@/components/layouts/DashboardLayout"
import DetailBanner from "@/components/views/Admin/DetailBanner"

const PageAdminDetailBanner = () => {
    return (
        <DashboardLayout type="admin" title="detail | banner" titleHead="Detail Banner">
            <DetailBanner />
        </DashboardLayout>
    )
}

export default PageAdminDetailBanner;